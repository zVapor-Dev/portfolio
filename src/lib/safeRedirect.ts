/**
 * Allow only same-origin relative paths for preview redirects.
 * Rejects absolute URLs, protocol-relative paths, and header/control injection.
 */
export function isSafeRedirectPath(path: string): boolean {
  if (!path.startsWith('/')) return false
  if (path.startsWith('//')) return false
  if (path.includes('://')) return false
  if (path.includes('\\')) return false
  if (/[\0\r\n]/.test(path)) return false
  return true
}
