export async function GET() {
  return Response.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version ?? '0.0.1',
    env: {
      hasLIFF: !!process.env.NEXT_PUBLIC_LIFF_ID,
      hasStripe: !!process.env.STRIPE_SECRET_KEY,
      hasLineToken: !!process.env.LINE_CHANNEL_ACCESS_TOKEN,
    },
  })
}
