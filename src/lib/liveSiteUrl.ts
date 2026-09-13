export const DEFAULT_LIVE_SITE_URL = 'https://www.zvapor.xyz'

export function getLiveSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SERVER_URL?.trim()
  if (url) return url.replace(/\/$/, '')
  return DEFAULT_LIVE_SITE_URL
}
