import type { ContraindicationRule } from '@/data/questions'
import { Button } from '@/components/ui/Button'
import type { Translations } from '@/i18n/en'
import type { Locale } from '@/i18n'

interface ContraindicationBannerProps {
  rule: ContraindicationRule
  locale: Locale
  t: Translations
  onBack?: () => void
}

export function ContraindicationBanner({ rule, locale, t, onBack }: ContraindicationBannerProps) {
  const message = locale === 'ja'
    ? rule.messageJa
    : locale === 'ko'
      ? (rule.messageKo ?? rule.messageEn)
      : rule.messageEn

  if (rule.severity === 'block') {
    return (
      <div className="mt-4 rounded-2xl border-2 border-red-200 bg-danger p-5 space-y-3">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mt-0.5">
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-red-800 mb-1">{t.intake.contraindication_block_title}</p>
            <p className="text-sm text-red-700 leading-relaxed">{message}</p>
          </div>
        </div>
        <div className="flex gap-3">
          {onBack && (
            <Button variant="outline" size="sm" onClick={onBack}>
              {t.intake.contraindication_block_back}
            </Button>
          )}
          <Button variant="ghost" size="sm">
            {t.intake.contraindication_block_contact}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-4 flex items-start gap-3 rounded-xl border border-warning-border bg-warning px-4 py-3">
      <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
      <p className="text-sm text-amber-900 leading-relaxed">{message}</p>
    </div>
  )
}
