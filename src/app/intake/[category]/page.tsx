'use client'

import { use, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLocale } from '@/hooks/useLocale'
import { useIntake } from '@/hooks/useIntake'
import { en } from '@/i18n/en'
import { ja } from '@/i18n/ja'
import { ko } from '@/i18n/ko'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Badge } from '@/components/ui/Badge'
import { QuestionCard } from '@/components/intake/QuestionCard'
import { ContraindicationBanner } from '@/components/intake/ContraindicationBanner'
import { getQuestionsForCategory } from '@/data/questions'
import { CATEGORIES } from '@/data/categories'
import type { CategoryId } from '@/data/categories'
import { getActiveFlag } from '@/lib/contraindications'

interface PageProps {
  params: Promise<{ category: string }>
}

export default function IntakeCategoryPage({ params }: PageProps) {
  const { category } = use(params)
  const router = useRouter()
  const [locale, setLocale] = useLocale()
  const t = locale === 'ja' ? ja : locale === 'ko' ? ko : en

  const categoryId = category as CategoryId
  const questions = getQuestionsForCategory(categoryId)
  const categoryData = CATEGORIES.find(c => c.id === categoryId)

  const {
    session,
    currentQuestion,
    totalQuestions,
    progress,
    respond,
    goNext,
    goBack,
    getCurrentResponse,
  } = useIntake(categoryId, questions)

  useEffect(() => {
    if (session.isCompleted) {
      router.push(`/intake/${categoryId}/complete`)
    }
  }, [session.isCompleted, categoryId, router])

  if (!categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Category not found.</p>
      </div>
    )
  }

  if (!currentQuestion) return null

  const currentResponse = getCurrentResponse()
  const activeFlag = getActiveFlag(currentQuestion, currentResponse)
  const hasBlock = session.riskFlags.some(f => f.severity === 'block')

  const categoryLabel = locale === 'ja'
    ? categoryData.labelJa
    : locale === 'ko'
      ? categoryData.labelKo
      : categoryData.labelEn

  return (
    <div className="min-h-screen bg-[#F3F6F1] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-3 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto">
          {/* Top row: back + category + language */}
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <button
                onClick={goBack}
                disabled={session.currentQuestionIndex === 0}
                className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Go back"
              >
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </button>
              <Badge variant="primary">{categoryLabel}</Badge>
            </div>
            <LanguageSwitcher locale={locale} onChange={setLocale} variant="light" />
          </div>
          {/* Progress bar */}
          <ProgressBar
            progress={progress}
            current={session.currentQuestionIndex}
            total={totalQuestions}
            locale={locale}
          />
        </div>
      </header>

      {/* Question */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-10">
        {hasBlock ? (
          <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-red-800 text-lg mb-2">{t.intake.contraindication_block_title}</h2>
                <p className="text-red-700 leading-relaxed text-sm">
                  {(() => {
                    const flag = session.riskFlags.find(f => f.severity === 'block')
                    if (!flag) return null
                    return locale === 'ja' ? flag.messageJa : flag.messageEn
                  })()}
                </p>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={goBack}
                className="flex items-center gap-2 px-4 py-2.5 border-2 border-red-300 text-red-700 font-semibold rounded-xl hover:bg-red-100 transition-colors text-sm"
              >
                {t.intake.contraindication_block_back}
              </button>
              <button className="px-4 py-2.5 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition-colors text-sm">
                {t.intake.contraindication_block_contact}
              </button>
            </div>
          </div>
        ) : (
          <>
            <QuestionCard
              question={currentQuestion}
              locale={locale}
              t={t}
              value={currentResponse}
              onRespond={respond}
              onNext={goNext}
              onBack={goBack}
              isFirst={session.currentQuestionIndex === 0}
              isLast={session.currentQuestionIndex === totalQuestions - 1}
            />
            {activeFlag && (
              <ContraindicationBanner
                rule={activeFlag}
                locale={locale}
                t={t}
                onBack={goBack}
              />
            )}
          </>
        )}
      </main>
    </div>
  )
}
