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
import { useSignupProfileStatus } from '@/hooks/useSignupProfile'
import type { Locale } from '@/i18n'

interface PageProps {
  params: Promise<{ category: string }>
}

const STORAGE_KEY = 'medipic_intake_session'

const COMPLETE_COPY: Record<Locale, {
  submitted: string
  submitError: string
  eyebrow: string
  title: string
  subtitle: string
  lineTitle: string
  lineDescription: string
  lineButton: string
  pricingTitle: string
  pricingUnit: string
  pricingDescription: string
  pricingFeatures: string[]
  pricingCta: string
  backHome: string
  signupTitle: string
  signupBody: string
  signupCta: string
  lineRequired: string
}> = {
  en: {
    submitted: 'Intake submitted',
    submitError: 'Could not submit your intake. Please try again.',
    eyebrow: 'Intake complete',
    title: 'Your answers are ready for clinical review.',
    subtitle: 'Choose a consult window and continue updates on LINE. Payment is only requested after the prescription path is confirmed.',
    lineTitle: 'Continue on LINE',
    lineDescription: 'Booking confirmation and consult guidance are sent through LINE after intake.',
    lineButton: 'Open LINE',
    pricingTitle: 'Prescription payment',
    pricingUnit: '/ prescription',
    pricingDescription: 'Consultation is free. Pay only for prescribed medication after review.',
    pricingFeatures: ['JPY 0 consultation fee', 'Medication charge only', 'Dispatch guidance after approval'],
    pricingCta: 'Continue to checkout',
    backHome: 'Back to home',
    signupTitle: 'Sign up to receive your intake review.',
    signupBody: 'Your answers can be completed without login. To send them for clinical review, create Medipic access and connect on LINE for booking and follow-up guidance.',
    signupCta: 'Sign up and submit intake',
    lineRequired: 'LINE is used for booking confirmation and follow-up messages.',
  },
  ja: {
    submitted: '問診を送信しました',
    submitError: '問診を送信できませんでした。もう一度お試しください。',
    eyebrow: '問診完了',
    title: '回答内容を医師確認へ進めます。',
    subtitle: '診察時間を選び、LINEで案内を続けて受け取れます。決済は処方方針の確認後に進みます。',
    lineTitle: 'LINEで続ける',
    lineDescription: '問診後の予約確認と診察案内はLINEで受け取れます。',
    lineButton: 'LINEを開く',
    pricingTitle: '処方薬のお支払い',
    pricingUnit: '/ 処方',
    pricingDescription: '診察料は無料です。確認後、処方薬代のみお支払いください。',
    pricingFeatures: ['診察料 JPY 0', '薬代のみ決済', '承認後に発送案内'],
    pricingCta: '決済へ進む',
    backHome: 'ホームへ戻る',
    signupTitle: '問診確認には登録が必要です。',
    signupBody: 'ログインなしで問診入力はできます。医師確認へ進めるにはMedipic登録を行い、予約確認とフォロー案内をLINEで受け取ってください。',
    signupCta: '登録して問診を送信',
    lineRequired: '予約確認とフォロー案内はLINEで行います。',
  },
  ko: {
    submitted: '문진이 전송되었습니다',
    submitError: '문진을 전송하지 못했습니다. 다시 시도해 주세요.',
    eyebrow: '문진 완료',
    title: '작성한 답변을 의사 검토로 넘깁니다.',
    subtitle: '상담 가능 시간을 선택하고 LINE으로 안내를 이어서 받을 수 있습니다. 결제는 처방 가능 여부 확인 후 진행합니다.',
    lineTitle: 'LINE으로 계속하기',
    lineDescription: '문진 후 예약 확인과 상담 안내를 LINE으로 받을 수 있습니다.',
    lineButton: 'LINE 열기',
    pricingTitle: '처방약 결제',
    pricingUnit: '/ 처방',
    pricingDescription: '진찰료는 무료입니다. 검토 후 처방약 비용만 결제합니다.',
    pricingFeatures: ['진찰료 JPY 0', '약 비용만 결제', '승인 후 배송 안내'],
    pricingCta: '결제로 이동',
    backHome: '홈으로 돌아가기',
    signupTitle: '문진 검토를 받으려면 회원가입이 필요합니다.',
    signupBody: '비로그인 상태에서도 문진 작성은 가능합니다. 다만 의료진 검토로 넘기려면 Medipic 가입 후 LINE으로 예약 확인과 사후 안내를 받아야 합니다.',
    signupCta: '가입하고 문진 제출',
    lineRequired: '예약 확인과 사후 안내는 LINE으로 진행됩니다.',
  },
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}

export default function IntakeCompletePage({ params }: PageProps) {
  const { category } = use(params)
  const router = useRouter()
  const [locale, setLocale] = useLocale()
  const t = locale === 'ja' ? ja : locale === 'ko' ? ko : en
  const copy = COMPLETE_COPY[locale]

  const [submitted, setSubmitted] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const lineConnectUrl = getLineConnectUrl()
  const isSignedUp = useSignupProfileStatus()

  useEffect(() => {
    if (!isSignedUp) return
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
  }, [copy.submitError, isSignedUp])

  if (!isSignedUp) {
    return (
      <div className="min-h-[100dvh] bg-[#fbfdf9] text-[#111111]">
        <header className="border-b border-black/10 px-5 py-4 sm:px-8">
          <div className="mx-auto flex max-w-[1040px] items-center justify-between">
            <Link href="/" className="text-xl font-semibold tracking-tight">medipic.</Link>
            <LanguageSwitcher locale={locale} onChange={setLocale} variant="light" />
          </div>
        </header>

        <main className="mx-auto grid max-w-[1040px] gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.46fr_0.54fr] lg:py-16">
          <section>
            <p className="versed-label text-black/42">{copy.eyebrow}</p>
            <h1 className="mt-6 text-3xl font-medium leading-[1.04] tracking-[-0.03em] text-[#111111] sm:text-4xl">{copy.signupTitle}</h1>
            <p className="mt-5 max-w-md text-sm leading-6 text-black/58">{copy.signupBody}</p>
            <p className="mt-4 rounded-[4px] bg-[#dff0e5] px-4 py-3 text-sm font-medium leading-6 text-black/68">{copy.lineRequired}</p>
          </section>

          <section className="rounded-[4px] border border-black/10 bg-white p-5 sm:p-7">
            <div className="grid gap-3">
              <Link href={`/signup?next=/intake/${category}/complete`} className="flex items-center justify-between rounded-full bg-[#111111] px-5 py-3.5 text-sm font-semibold text-white hover:bg-[#2f2f2f]">
                {copy.signupCta}
                <span aria-hidden="true">→</span>
              </Link>
              <Link href={`/intake/${category}`} className="flex items-center justify-center rounded-full border border-black/15 bg-white px-5 py-3.5 text-sm font-semibold text-black/62 hover:bg-[#dff0e5]">
                {copy.backHome}
              </Link>
            </div>
          </section>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-[100dvh] bg-[#fbfdf9] text-[#111111]">
      <header className="border-b border-black/10 px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-[1040px] items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight">medipic.</Link>
          <LanguageSwitcher locale={locale} onChange={setLocale} variant="light" />
        </div>
      </header>

      <main className="mx-auto grid max-w-[1040px] gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.42fr_0.58fr] lg:py-14">
        <section>
          <p className="versed-label text-black/42">{copy.eyebrow}</p>
          <div className="mt-6 grid h-14 w-14 place-items-center rounded-full bg-[#dff0e5] text-[#111111]">
            <CheckIcon />
          </div>
          <h1 className="mt-6 text-3xl font-medium leading-[1.04] tracking-[-0.03em] text-[#111111] sm:text-4xl">{copy.title}</h1>
          <p className="mt-5 max-w-md text-sm leading-6 text-black/58">{copy.subtitle}</p>

          {submitted && sessionId && (
            <p className="mt-5 text-xs font-medium text-[#1D7A4A]">
              {copy.submitted} · ID <code className="rounded bg-white px-1.5 py-0.5">{sessionId.slice(-8)}</code>
            </p>
          )}
          {submitError && <p className="mt-5 text-xs text-red-500">{submitError}</p>}
        </section>

        <section className="space-y-5">
          <div className="rounded-[4px] border border-black/10 bg-white p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex-1">
                <p className="text-sm font-semibold">{copy.lineTitle}</p>
                <p className="mt-1 text-xs leading-5 text-black/50">{copy.lineDescription}</p>
              </div>
              <a href={lineConnectUrl} className="inline-flex items-center justify-center rounded-full bg-[#07B53B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#069b34] active:translate-y-px">
                {copy.lineButton}
              </a>
            </div>
          </div>

          <div className="rounded-[4px] border border-black/10 bg-white p-5">
            <BookingSlots t={t} locale={locale} sessionId={sessionId ?? 'pending'} />
          </div>

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
                if (sid) router.push(`/checkout?session=${sid}`)
              } catch (err) {
                console.error('[checkout]', err)
              }
            }}
          />

          <Link href="/" className="inline-flex text-sm font-medium text-black/42 transition hover:text-black/70">
            {copy.backHome}
          </Link>
        </section>
      </main>
    </div>
  )
}
