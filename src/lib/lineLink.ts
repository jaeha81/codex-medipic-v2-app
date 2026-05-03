export function getLineConnectUrl() {
  const explicitUrl = process.env.NEXT_PUBLIC_LINE_CONNECT_URL?.trim()
  if (explicitUrl) return explicitUrl

  const liffId = process.env.NEXT_PUBLIC_LIFF_ID?.trim()
  if (liffId) return `https://liff.line.me/${liffId}`

  return 'https://line.me/R/'
}
