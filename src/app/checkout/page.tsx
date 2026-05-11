'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

interface MockItem {
  name: string
  description: string
  priceJPY: number
  quantity: number
}

const DEMO_ITEMS: MockItem[] = [
  {
    name: 'Prescription review',
    description: 'Doctor-reviewed medication order',
    priceJPY: 3000,
    quantity: 1,
  },
  {
    name: 'Dispensing support',
    description: 'Clinic coordination and dispatch guidance',
    priceJPY: 500,
    quantity: 1,
  },
]

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session') ?? ''
  const isMock = sessionId.startsWith('mock_')

  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(false)

  const total = DEMO_ITEMS.reduce((sum, item) => sum + item.priceJPY * item.quantity, 0)

  async function handlePay() {
    setLoading(true)
    if (isMock) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setCompleted(true)
      setLoading(false)
      setTimeout(() => router.push('/'), 1500)
      return
    }
    setLoading(false)
  }

  if (completed) {
    return (
      <div className="min-h-[100dvh] bg-[#fbfdf9] px-5 py-8 text-[#111111]">
        <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-md flex-col justify-center">
          <div className="rounded-[6px] border border-black/8 bg-white p-8 shadow-[0_18px_70px_rgba(17,17,17,0.10)]">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-[#1d7a4a]/10 text-[#1d7a4a]">
              <CheckIcon />
            </div>
            <h1 className="mt-6 text-2xl font-medium tracking-normal">Payment recorded</h1>
            <p className="mt-3 text-sm leading-6 text-black/58">
              This demo payment is complete. You will return to the home page shortly.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[100dvh] bg-[#fbfdf9] text-[#111111]">
      <header className="border-b border-black/8 px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-[1040px] items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            medipic.
          </Link>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/42">checkout</span>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1040px] gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.42fr_0.58fr] lg:py-14">
        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/42">Prescription payment</p>
          <h1 className="mt-5 text-3xl font-medium leading-[1.04] tracking-normal sm:text-4xl">
            Confirm the medication charge after doctor review.
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-6 text-black/58">
            Consultation remains free. Medication payment is shown here as a demo flow until the real payment provider is connected.
          </p>
          {isMock && (
            <div className="mt-8 rounded-[6px] border border-[#c79a2f]/25 bg-[#fff8e6] px-4 py-3 text-sm leading-6 text-[#7a5a12]">
              Demo session active. No real payment will be sent.
            </div>
          )}
        </section>

        <section className="rounded-[6px] border border-black/8 bg-white p-5 shadow-[0_18px_70px_rgba(17,17,17,0.10)] sm:p-6">
          <div className="flex items-center justify-between border-b border-black/8 pb-4">
            <h2 className="text-base font-semibold">Order summary</h2>
            <span className="text-xs text-black/42">{sessionId || 'pending session'}</span>
          </div>

          <ul className="divide-y divide-black/8">
            {DEMO_ITEMS.map((item) => (
              <li key={item.name} className="flex items-start justify-between gap-5 py-4">
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="mt-1 text-xs leading-5 text-black/50">{item.description}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold">JPY {(item.priceJPY * item.quantity).toLocaleString()}</p>
                  <p className="mt-1 text-xs text-black/38">x{item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between border-t border-black/8 pt-5">
            <span className="text-sm font-medium text-black/58">Total</span>
            <span className="text-2xl font-semibold tracking-normal">JPY {total.toLocaleString()}</span>
          </div>

          <button
            onClick={handlePay}
            disabled={loading}
            className="mt-6 inline-flex w-full items-center justify-center rounded-[6px] bg-[#111111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2a261f] active:translate-y-px disabled:opacity-60"
          >
            {loading ? 'Processing...' : isMock ? 'Complete demo payment' : 'Payment provider pending'}
          </button>

          <p className="mt-4 text-center text-xs leading-5 text-black/42">
            Real checkout should be connected through Stripe or another approved payment provider before production use.
          </p>
        </section>
      </main>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-[100dvh] place-items-center bg-[#fbfdf9] text-sm text-black/42">
          Loading checkout...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  )
}
