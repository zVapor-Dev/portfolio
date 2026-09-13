/** Strict relative paths for preview redirects (no query, hash, or encoding). */
const RELATIVE_PATH = /^\/[a-zA-Z0-9/_-]*$/

const DANGEROUS_SCHEME = /^(javascript|data|vbscript):/i

/**
 * Allow only strict same-site relative paths for preview redirects.
 * Rejects percent-encoding (e.g. /%2f%2fevil.com) and protocol-relative paths.
 */
export function isSafeRedirectPath(path: string): boolean {
  if (!path || path.includes('%')) {
    return false
  }

  if (path.startsWith('//')) return false
  if (path.includes('://') || path.includes('\\') || /[\0\r\n]/.test(path)) {
    return false
  }
  if (DANGEROUS_SCHEME.test(path)) return false

  if (!RELATIVE_PATH.test(path)) {
    return false
  }

  // Belt-and-suspenders: decoded form must match (catches encoded bypass attempts).
  try {
    return decodeURIComponent(path) === path
  } catch {
    return false
  }
}
