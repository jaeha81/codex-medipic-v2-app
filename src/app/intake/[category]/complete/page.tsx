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
import { getLineConnectUrl } from '@/lib/lineLink'
import type { Locale } from '@/i18n'

interface PageProps {
  params: Promise<{ category: string }>
}

const STORAGE_KEY = 'medipic_intake_session'

const COMPLETE_COPY: Record<Locale, {
  submitted: string
  submitError: string
  lineTitle: string
  lineDescription: string
  lineButton: string
  pricingTitle: string
  pricingUnit: string
  pricingDescription: string
  pricingFeatures: string[]
  pricingCta: string
  backHome: string
}> = {
  en: {
    submitted: 'Intake submitted',
    submitError: 'Could not submit your intake. Please try again.',
    lineTitle: 'Connect on LINE',
    lineDescription: 'After intake, continue booking confirmation and consult guidance on LINE.',
    lineButton: 'Open LINE',
    pricingTitle: 'Prescription Payment',
    pricingUnit: '/ prescription',
    pricingDescription: 'Consultation is free. Pay only for prescribed medication.',
    pricingFeatures: ['¥0 consultation fee', 'Pay for medication only', 'Same-day dispatch'],
    pricingCta: 'Select this plan',
    backHome: 'Back to home',
  },
  ja: {
    submitted: '問診を送信しました',
    submitError: '問診を送信できませんでした。もう一度お試しください。',
    lineTitle: 'LINEで相談を続ける',
    lineDescription: '問診完了後、LINEで予約確認と相談案内を受け取れます。',
    lineButton: 'LINEを開く',
    pricingTitle: '処方薬のお支払い',
    pricingUnit: '/ 処方',
    pricingDescription: '診察料は無料です。処方された薬代のみお支払いください。',
    pricingFeatures: ['診察料 ¥0', '薬代のみお支払い', '当日発送'],
    pricingCta: 'このプランを選択する',
    backHome: 'ホームへ戻る',
  },
  ko: {
    submitted: '문진이 전송되었습니다',
    submitError: '문진을 전송하지 못했습니다. 다시 시도해 주세요.',
    lineTitle: 'LINE으로 상담 연결',
    lineDescription: '문진 완료 후 LINE에서 예약 확인과 상담 안내를 이어 받을 수 있습니다.',
    lineButton: 'LINE 연결하기',
    pricingTitle: '처방약 결제',
    pricingUnit: '/ 처방',
    pricingDescription: '진찰료는 무료입니다. 처방된 약 비용만 결제해 주세요.',
    pricingFeatures: ['진찰료 ¥0', '약 비용만 결제', '당일 발송'],
    pricingCta: '이 플랜 선택하기',
    backHome: '홈으로 돌아가기',
  },
}

export default function IntakeCompletePage({ params }: PageProps) {
  use(params)
  const router = useRouter()
  const [locale, setLocale] = useLocale()
  const t = locale === 'ja' ? ja : locale === 'ko' ? ko : en
  const copy = COMPLETE_COPY[locale]

  const [submitted, setSubmitted] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const lineConnectUrl = getLineConnectUrl()

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
          sessionStorage.removeItem(STORAGE_KEY)
        })
        .catch(err => {
          console.error('[intake submit]', err)
          setSubmitError(copy.submitError)
        })
    } catch {
      /* ignore parse errors */
    }
  }, [copy.submitError])

  return (
    <div className="min-h-screen bg-[#F3F6F1] flex flex-col">
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-[#1E60C8] font-bold text-xl tracking-tight">
            medipic
          </Link>
          <LanguageSwitcher locale={locale} onChange={setLocale} variant="light" />
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#1E60C8]/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-[#1E60C8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.booking.title}</h1>
          <p className="text-gray-500 max-w-sm mx-auto">{t.booking.subtitle}</p>

          {submitted && sessionId && (
            <p className="mt-3 text-xs text-[#1D7A4A] font-medium">
              {copy.submitted} · ID: <code className="bg-gray-100 px-1 rounded">{sessionId.slice(-8)}</code>
            </p>
          )}
          {submitError && (
            <p className="mt-3 text-xs text-red-500">{submitError}</p>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-[#07B53B]/20 shadow-sm p-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">{copy.lineTitle}</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{copy.lineDescription}</p>
            </div>
            <a
              href={lineConnectUrl}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#07B53B] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#06A034]"
            >
              <svg className="h-4 w-4" viewBox="0 0 48 48" fill="currentColor" aria-hidden="true">
                <path d="M24 4C12.95 4 4 12.07 4 22.05c0 5.94 3.08 11.22 7.88 14.63l-1.8 6.6a.5.5 0 00.7.59l7.52-3.9A21.3 21.3 0 0024 40.1c11.05 0 20-8.07 20-18.05S35.05 4 24 4z" />
              </svg>
              {copy.lineButton}
            </a>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-2xl shadow-sm p-6">
          <BookingSlots t={t} locale={locale} sessionId={sessionId ?? 'pending'} />
        </div>

        <div className="mt-6">
          <PricingCard
            title={copy.pricingTitle}
            price={3000}
            unit={copy.pricingUnit}
            description={copy.pricingDescription}
            features={copy.pricingFeatures}
            ctaLabel={copy.pricingCta}
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

        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors inline-flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {copy.backHome}
          </Link>
        </div>
      </main>
    </div>
  )
}
