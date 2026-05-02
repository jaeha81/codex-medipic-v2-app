'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

interface MockItem {
  name: string
  description: string
  priceJPY: number
  quantity: number
}

// デモ用サンプル商品リスト
const DEMO_ITEMS: MockItem[] = [
  {
    name: 'クリニック診察料',
    description: 'オンライン診察 / 処方サービス',
    priceJPY: 3000,
    quantity: 1,
  },
  {
    name: 'お薬配送料',
    description: '全国一律送料',
    priceJPY: 500,
    quantity: 1,
  },
]

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
      // Mock: 即時完了
      await new Promise((r) => setTimeout(r, 800))
      setCompleted(true)
      setLoading(false)
      setTimeout(() => router.push('/'), 1500)
      return
    }
    // TODO: 実際の Stripe Checkout へのリダイレクト
    setLoading(false)
  }

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F3F6F1] gap-4">
        <div className="bg-white rounded-2xl shadow p-10 flex flex-col items-center gap-4 max-w-sm w-full mx-4">
          <div className="text-5xl">✅</div>
          <p className="text-xl font-bold text-gray-900">お支払いが完了しました</p>
          <p className="text-sm text-gray-500">ホームページへ移動します…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F3F6F1]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-3">
        <span className="text-[#1E60C8] font-bold text-xl tracking-tight">MediPic</span>
        <span className="text-gray-400 text-sm">/ お支払い</span>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8 flex flex-col gap-6">
        {/* Mock Banner */}
        {isMock && (
          <div className="bg-amber-50 border border-amber-300 rounded-xl px-4 py-3 flex items-center gap-3">
            <span className="text-amber-500 text-lg">⚠️</span>
            <div>
              <p className="text-amber-800 font-semibold text-sm">テスト決済モード</p>
              <p className="text-amber-700 text-xs mt-0.5">
                実際の請求は発生しません。テスト環境での動作確認用です。
              </p>
            </div>
          </div>
        )}

        {/* Order Summary */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-4">
          <h2 className="text-base font-bold text-gray-900">ご注文内容</h2>
          <ul className="flex flex-col gap-3">
            {DEMO_ITEMS.map((item, i) => (
              <li key={i} className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-gray-900">
                    ¥{(item.priceJPY * item.quantity).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">×{item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
            <span className="text-sm font-bold text-gray-700">合計（税込）</span>
            <span className="text-lg font-bold text-gray-900">¥{total.toLocaleString()}</span>
          </div>
        </section>

        {/* Session ID (debug) */}
        {isMock && (
          <p className="text-xs text-gray-400 text-center">セッションID: {sessionId}</p>
        )}

        {/* CTA */}
        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full bg-[#1E60C8] hover:bg-[#1650A8] disabled:opacity-60 text-white font-bold text-base rounded-2xl py-4 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="animate-spin text-lg">⏳</span>
              処理中…
            </>
          ) : (
            '支払いを完了する'
          )}
        </button>

        <p className="text-xs text-gray-400 text-center">
          安全な決済は Stripe により保護されています
        </p>
      </main>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F3F6F1] flex items-center justify-center">
          <p className="text-gray-400 text-sm">読み込み中…</p>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  )
}
