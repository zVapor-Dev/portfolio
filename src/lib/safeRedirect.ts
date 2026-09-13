/** Safe relative paths for preview redirects (no query/hash). */
const RELATIVE_PATH = /^\/[a-zA-Z0-9/_-]*$/

const DANGEROUS_SCHEME = /^(javascript|data|vbscript):/i

/**
 * Resolve a preview redirect target to a safe same-origin relative path.
 * Returns null when the path must be rejected.
 */
export function getSafeRedirectPath(path: string, origin: string): string | null {
  if (!path || path.startsWith('//') || DANGEROUS_SCHEME.test(path)) {
    return null
  }

  if (path.includes('://') || path.includes('\\') || /[\0\r\n]/.test(path)) {
    return null
  }

  if (RELATIVE_PATH.test(path)) {
    return path
  }

  try {
    const resolved = new URL(path, origin)
    const base = new URL(origin)

    if (resolved.protocol !== 'http:' && resolved.protocol !== 'https:') {
      return null
    }

    if (resolved.origin !== base.origin) {
      return null
    }

    if (RELATIVE_PATH.test(resolved.pathname)) {
      return resolved.pathname
    }
  } catch {
    return null
  }

  return null
}
