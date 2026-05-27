'use client'

import type { Locale } from '@/i18n'

interface LanguageSwitcherProps {
  locale: Locale
  onChange: (l: Locale) => void
  variant?: 'dark' | 'light' | 'text'
}

export function LanguageSwitcher({ locale, onChange, variant = 'dark' }: LanguageSwitcherProps) {
  const containerCls = variant === 'text'
    ? 'flex items-center gap-3'
    : variant === 'light'
      ? 'flex items-center gap-0.5 bg-gray-100 rounded-full p-0.5'
      : 'flex items-center gap-1 bg-white/10 rounded-full p-1'

  const activeCls = variant === 'text'
    ? 'text-[#111111]'
    : variant === 'light'
      ? 'bg-white text-gray-900 shadow-sm'
      : 'bg-white text-gray-900'

  const inactiveCls = variant === 'text'
    ? 'text-black/44 hover:text-black/70'
    : variant === 'light'
      ? 'text-gray-400 hover:text-gray-700'
      : 'text-white/70 hover:text-white'

  return (
    <div className={containerCls}>
      {(['en', 'ja', 'ko'] as Locale[]).map(l => (
        <button
          key={l}
          onClick={() => onChange(l)}
          className={[
            variant === 'text'
              ? 'appearance-none border-0 bg-transparent py-1 text-xs font-semibold shadow-none transition-colors'
              : 'px-2.5 py-1 rounded-full text-xs font-semibold transition-all',
            locale === l ? activeCls : inactiveCls,
          ].join(' ')}
        >
          {l === 'en' ? 'EN' : l === 'ja' ? 'JP' : 'KR'}
        </button>
      ))}
    </div>
  )
}
