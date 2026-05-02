'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLocale } from '@/hooks/useLocale'
import { en } from '@/i18n/en'
import { ja } from '@/i18n/ja'
import { ko } from '@/i18n/ko'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { BookingSlots } from '@/components/intake/BookingSlots'
import PricingCard from '@/components/intake/PricingCard'

interface PageProps {
  params: Promise<{ category: string }>
}

const STORAGE_KEY = 'medipic_intake_session'

export default function IntakeCompletePage({ params }: PageProps) {
  use(params)
  const router = useRouter()
  const [locale, setLocale] = useLocale()
  const t = locale === 'ja' ? ja : locale === 'ko' ? ko : en

  const [submitted, setSubmitted] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // On mount: submit session data to API once
  useEffect(() => {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return

    try {
      const session = JSON.parse(raw)
      if (!session?.sessionId || !session?.categoryId) return

      fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: session.sessionId,
          categoryId: session.categoryId,
          responses: session.responses ?? {},
          riskFlags: session.riskFlags ?? [],
        }),
      })
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          return res.json()
        })
        .then(data => {
          setSessionId(data.sessionId)
          setSubmitted(true)
          // clear session storage after successful submit
          sessionStorage.removeItem(STORAGE_KEY)
        })
        .catch(err => {
          console.error('[intake submit]', err)
          setSubmitError('送信に失敗しました。もう一度お試しください。')
        })
    } catch {
      /* ignore parse errors */
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#F3F6F1] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-[#1E60C8] font-bold text-xl tracking-tight">
            medipic
          </Link>
          <LanguageSwitcher locale={locale} onChange={setLocale} />
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-10">
        {/* Completion badge */}
        <div className="text-center mb-10 animate-fadeInUp">
          <div className="w-16 h-16 bg-[#1E60C8]/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-[#1E60C8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.booking.title}</h1>
          <p className="text-gray-500 max-w-sm mx-auto">{t.booking.subtitle}</p>

          {/* Submission status */}
          {submitted && sessionId && (
            <p className="mt-3 text-xs text-[#1D7A4A] font-medium">
              ✓ {locale === 'ja' ? '問診が送信されました' : locale === 'ko' ? '문진이 전송되었습니다' : 'Intake submitted'} — ID: <code className="bg-gray-100 px-1 rounded">{sessionId.slice(-8)}</code>
            </p>
          )}
          {submitError && (
            <p className="mt-3 text-xs text-red-500">{submitError}</p>
          )}
        </div>

        {/* Booking slots */}
        <div className="bg-white rounded-2xl shadow-sm p-6 animate-scaleIn delay-100">
          <BookingSlots t={t} />
        </div>

        {/* Pricing card */}
        <div className="mt-6 animate-scaleIn delay-200">
          <PricingCard
            title={
              locale === 'ko'
                ? '처방약 결제'
                : locale === 'ja'
                ? '処方薬のお支払い'
                : 'Prescription Payment'
            }
            price={3000}
            unit={
              locale === 'ko'
                ? '/ 처방당'
                : locale === 'ja'
                ? '/ 処方ごと'
                : '/ prescription'
            }
            description={
              locale === 'ko'
                ? '진찰료는 무료입니다. 처방약 비용만 결제하세요.'
                : locale === 'ja'
                ? '診察料は無料です。処方薬の費用のみお支払いください。'
                : 'Consultation is free. Pay only for prescribed medication.'
            }
            features={
              locale === 'ko'
                ? ['진찰료 ¥0', '처방약만 결제', '당일 발송']
                : locale === 'ja'
                ? ['診察料 ¥0', '処方薬のみお支払い', '当日発送']
                : ['¥0 consultation fee', 'Pay for medication only', 'Same-day dispatch']
            }
            onSelect={async () => {
              try {
                const res = await fetch('/api/checkout/session', { method: 'POST' })
                const data = (await res.json()) as { sessionId?: string; id?: string }
                const sid = data.sessionId ?? data.id
                if (sid) {
                  router.push(`/checkout?session=${sid}`)
                }
              } catch (err) {
                console.error('[checkout]', err)
              }
            }}
          />
        </div>

        {/* Back to home */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors inline-flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {locale === 'ko' ? '홈으로 돌아가기' : locale === 'ja' ? 'トップに戻る' : 'Back to home'}
          </Link>
        </div>
      </main>
    </div>
  )
}
