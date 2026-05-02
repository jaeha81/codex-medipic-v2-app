import { NextRequest, NextResponse } from 'next/server'
import type { CheckoutItem } from '@/lib/stripe'

interface RequestBody {
  items: CheckoutItem[]
  sessionId: string
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as RequestBody
  const { items, sessionId } = body

  const secretKey = process.env.STRIPE_SECRET_KEY

  if (!secretKey) {
    // Mock モード: Stripe キー未設定の場合は擬似 URL を返す
    const mockId = `mock_${Date.now()}`
    return NextResponse.json({
      checkoutUrl: `/checkout?session=${mockId}`,
      sessionId,
    })
  }

  // TODO: 実際の Stripe Checkout Session 作成
  // const stripe = new Stripe(secretKey, { apiVersion: '2024-06-20' })
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
  //   success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
  //   cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,
  // })
  // return NextResponse.json({ checkoutUrl: session.url, sessionId: session.id })

  // 実際の Stripe 連携が未実装のため、mock を返す
  const mockId = `mock_${Date.now()}`
  return NextResponse.json({
    checkoutUrl: `/checkout?session=${mockId}`,
    sessionId,
  })
}
