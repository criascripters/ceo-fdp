/**
 * Get a cookie by key.
 */
export function getCookieKey(key: string) {
  const b = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]*)')
  return b ? b.pop() : ''
}
