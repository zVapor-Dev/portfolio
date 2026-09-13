import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

/**
 * Contact form rate limiting.
 *
 * When UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN are set, uses
 * @upstash/ratelimit with a sliding window (accurate across Vercel instances).
 *
 * Otherwise falls back to an in-memory sliding window per warm serverless
 * instance (approximate; documented limitation).
 */

export type RateLimitResult = {
  allowed: boolean
  limit: number
  remaining: number
  resetAt: number
}

const DEFAULT_MAX = Number(process.env.CONTACT_RATE_LIMIT_MAX ?? 5)
const DEFAULT_WINDOW_MS = Number(
  process.env.CONTACT_RATE_LIMIT_WINDOW_MS ?? 60 * 60 * 1000,
)

let upstashRatelimit: Ratelimit | null | undefined

function getUpstashRatelimit(): Ratelimit | null {
  if (upstashRatelimit !== undefined) return upstashRatelimit

  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    upstashRatelimit = null
    return null
  }

  const windowSec = Math.max(1, Math.round(DEFAULT_WINDOW_MS / 1000))

  upstashRatelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(DEFAULT_MAX, `${windowSec} s`),
    prefix: 'portfolio-contact',
    analytics: false,
  })

  return upstashRatelimit
}

const slidingBuckets = new Map<string, number[]>()

function checkInMemorySlidingWindow(key: string): RateLimitResult {
  const max = DEFAULT_MAX
  const windowMs = DEFAULT_WINDOW_MS
  const now = Date.now()
  const windowStart = now - windowMs

  const timestamps = (slidingBuckets.get(key) ?? []).filter((t) => t > windowStart)

  if (timestamps.length >= max) {
    const resetAt = timestamps[0]! + windowMs
    return { allowed: false, limit: max, remaining: 0, resetAt }
  }

  timestamps.push(now)
  slidingBuckets.set(key, timestamps)

  return {
    allowed: true,
    limit: max,
    remaining: max - timestamps.length,
    resetAt: now + windowMs,
  }
}

async function checkSingleKey(key: string): Promise<RateLimitResult> {
  const upstash = getUpstashRatelimit()

  if (upstash) {
    const result = await upstash.limit(key)
    return {
      allowed: result.success,
      limit: result.limit,
      remaining: result.remaining,
      resetAt: result.reset,
    }
  }

  return checkInMemorySlidingWindow(key)
}

/** All keys must pass (e.g. per-IP and per-email). */
export async function checkContactRateLimit(
  keys: string[],
): Promise<RateLimitResult> {
  let strictest: RateLimitResult | null = null

  for (const key of keys) {
    const result = await checkSingleKey(key)

    if (!result.allowed) {
      return result
    }

    if (
      !strictest ||
      result.remaining < strictest.remaining ||
      result.resetAt > strictest.resetAt
    ) {
      strictest = result
    }
  }

  return (
    strictest ?? {
      allowed: true,
      limit: DEFAULT_MAX,
      remaining: DEFAULT_MAX,
      resetAt: Date.now() + DEFAULT_WINDOW_MS,
    }
  )
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown'
  }

  return req.headers.get('x-real-ip') || 'unknown'
}

export function rateLimitResponseHeaders(
  result: RateLimitResult,
): Record<string, string> {
  const headers: Record<string, string> = {
    'X-RateLimit-Limit': String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(Math.ceil(result.resetAt / 1000)),
  }

  if (!result.allowed) {
    headers['Retry-After'] = String(
      Math.max(1, Math.ceil((result.resetAt - Date.now()) / 1000)),
    )
  }

  return headers
}
