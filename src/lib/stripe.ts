export const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''
export const IS_MOCK = !STRIPE_PK

export interface CheckoutItem {
  name: string
  description: string
  priceJPY: number // 엔화
  quantity: number
}

/**
 * Checkout session を生成する。
 * STRIPE_PK が未設定の場合は mock URL を返す。
 */
export async function createCheckoutSession(
  items: CheckoutItem[],
  successUrl: string,
  cancelUrl: string,
): Promise<{ url: string }> {
  if (IS_MOCK) {
    const sessionId = `mock_${Date.now()}`
    const params = new URLSearchParams({ session: sessionId })
    return { url: `/checkout?${params.toString()}` }
  }

  // TODO: 実際の Stripe 連携
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' })
  // const lineItems = items.map((item) => ({
  //   price_data: {
  //     currency: 'jpy',
  //     product_data: { name: item.name, description: item.description },
  //     unit_amount: item.priceJPY,
  //   },
  //   quantity: item.quantity,
  // }))
  // const session = await stripe.checkout.sessions.create({
  //   mode: 'payment',
  //   line_items: lineItems,
  //   success_url: successUrl,
  //   cancel_url: cancelUrl,
  // })
  // return { url: session.url! }

  throw new Error('Stripe is not configured. Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.')
}
