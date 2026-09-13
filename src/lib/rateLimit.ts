/**
 * In-memory, per-IP rate limiter for serverless handlers.
 *
 * Caveats on Vercel/serverless:
 * - Each warm instance keeps its own map; limits are approximate across instances.
 * - Cold starts reset counters for that instance.
 * - Suitable as a lightweight abuse brake, not a strict global quota.
 * For stronger guarantees, use a shared store (e.g. Upstash Redis).
 */

type RateLimitEntry = {
  count: number
  resetAt: number
}

const buckets = new Map<string, RateLimitEntry>()

export type RateLimitResult =
  | { allowed: true; remaining: number; resetAt: number }
  | { allowed: false; remaining: 0; resetAt: number }

export function checkRateLimit(
  key: string,
  options?: { max?: number; windowMs?: number },
): RateLimitResult {
  const max = options?.max ?? Number(process.env.CONTACT_RATE_LIMIT_MAX ?? 5)
  const windowMs =
    options?.windowMs ??
    Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS ?? 15 * 60 * 1000)

  const now = Date.now()
  const existing = buckets.get(key)

  if (!existing || now >= existing.resetAt) {
    const resetAt = now + windowMs
    buckets.set(key, { count: 1, resetAt })
    return { allowed: true, remaining: max - 1, resetAt }
  }

  if (existing.count >= max) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt }
  }

  existing.count += 1
  buckets.set(key, existing)
  return { allowed: true, remaining: max - existing.count, resetAt: existing.resetAt }
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown'
  }

  return req.headers.get('x-real-ip') || 'unknown'
}
