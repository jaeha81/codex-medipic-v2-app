import type { Locale } from '@/i18n'

interface ProgressBarProps {
  progress: number
  current: number
  total: number
  locale?: Locale
}

export function ProgressBar({ progress, current, total, locale = 'en' }: ProgressBarProps) {
  const pct = Math.round(progress * 100)
  const label = locale === 'ja'
    ? `${current} / ${total} 完了`
    : locale === 'ko'
      ? `${current} / ${total} 완료`
      : `${current} / ${total} completed`
  return (
    <div className="w-full space-y-1.5">
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{label}</span>
        <span className="font-medium text-primary">{pct}%</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}
