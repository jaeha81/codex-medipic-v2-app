'use client'

import Link from 'next/link'
import { useLocale } from '@/hooks/useLocale'
import { en } from '@/i18n/en'
import { ja } from '@/i18n/ja'
import { ko } from '@/i18n/ko'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { CATEGORIES } from '@/data/categories'

const CATEGORY_IMAGES: Record<string, string> = {
  weight:    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=400&q=80',
  hair:      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80',
  menopause: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=400&q=80',
  skincare:  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80',
}

export default function IntakePage() {
  const [locale, setLocale] = useLocale()
  const t = locale === 'ja' ? ja : locale === 'ko' ? ko : en

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

      {/* Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-12">
        <div className="text-center mb-10 animate-fadeInUp">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
            {t.intake.chooseCategory}
          </h1>
          <p className="text-gray-500">{t.intake.chooseCategorySubtitle}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {CATEGORIES.map((cat, i) => {
            const label = locale === 'ja' ? cat.labelJa : locale === 'ko' ? cat.labelKo : cat.labelEn
            const subtitle = locale === 'ja' ? cat.subtitleJa : locale === 'ko' ? cat.subtitleKo : cat.subtitleEn

            return (
              <Link
                key={cat.id}
                href={`/intake/${cat.id}`}
                className="group relative rounded-2xl overflow-hidden block will-animate animate-scaleIn"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={CATEGORY_IMAGES[cat.id]}
                    alt={label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <p className="text-xs text-white/60 mb-0.5">{subtitle}</p>
                    <p className="text-base font-bold text-white">{label}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
