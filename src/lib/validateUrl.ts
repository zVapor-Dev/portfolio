const URL_FIELD_MESSAGE =
  'Must be a valid http(s) URL or a site-relative path starting with /'

export function isAllowedUrl(value: string | null | undefined): boolean {
  if (!value) return true

  if (value.startsWith('/')) {
    return !value.startsWith('//') && !/[\0\r\n]/.test(value)
  }

  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

export function validateAllowedUrl(
  value: string | null | undefined,
): true | string {
  return isAllowedUrl(value) ? true : URL_FIELD_MESSAGE
}
