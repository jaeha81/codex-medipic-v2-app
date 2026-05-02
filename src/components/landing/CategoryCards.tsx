'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { CATEGORIES } from '@/data/categories'
import { PRODUCT_EXAMPLES } from '@/data/productExamples'
import type { Translations } from '@/i18n/en'
import type { Locale } from '@/i18n'

interface CategoryCardsProps {
  t: Translations
  locale: Locale
}

const CATEGORY_IMAGES: Record<string, string> = {
  weight: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=80',
  hair: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
  menopause: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80',
  skincare: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80',
}

function localizedText(locale: Locale, enText: string, jaText: string, koText: string) {
  if (locale === 'ko') return koText
  if (locale === 'ja') return jaText
  return enText
}

export function CategoryCards({ t, locale }: CategoryCardsProps) {
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return

    const headingEl = headingRef.current
    if (headingEl) {
      headingEl.style.opacity = '0'
      headingEl.style.transform = 'translateY(22px)'
      headingEl.style.transition = 'opacity 0.65s ease, transform 0.65s ease'

      const headingObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          headingEl.style.opacity = '1'
          headingEl.style.transform = 'translateY(0)'
          headingObserver.disconnect()
        }
      }, { threshold: 0.16, rootMargin: '0px 0px -40px 0px' })

      headingObserver.observe(headingEl)
    }

    const gridEl = gridRef.current
    if (gridEl) {
      const cards = Array.from(gridEl.children) as HTMLElement[]
      cards.forEach((card, index) => {
        card.style.opacity = '0'
        card.style.transform = 'translateY(26px)'
        card.style.transition = 'opacity 0.62s ease, transform 0.62s ease'
        card.style.transitionDelay = `${Math.min(index * 90, 360)}ms`
      })

      const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            target.style.opacity = '1'
            target.style.transform = 'translateY(0)'
            cardObserver.unobserve(target)
          }
        })
      }, { threshold: 0.16, rootMargin: '0px 0px -40px 0px' })

      cards.forEach((card) => cardObserver.observe(card))
    }
  }, [])

  return (
    <section className="py-20 px-6 bg-[#F2F6F1]">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-12">
          <p className="text-xs tracking-[0.2em] uppercase font-semibold text-[#1D7A4A] mb-3">Products</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#122319] mb-3">{t.categories.title}</h2>
          <p className="text-[#5A6A60]">{t.categories.subtitle}</p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {CATEGORIES.map((cat, index) => {
            const label = localizedText(locale, cat.labelEn, cat.labelJa, cat.labelKo)
            const subtitle = localizedText(locale, cat.subtitleEn, cat.subtitleJa, cat.subtitleKo)
            const keywords = locale === 'ko' ? cat.keywordsKo : locale === 'ja' ? cat.keywordsJa : cat.keywordsEn
            const productExamples = PRODUCT_EXAMPLES[cat.id]

            return (
              <Link
                key={cat.id}
                href={`/intake/${cat.id}`}
                className="feature-card group shine-card relative rounded-3xl overflow-hidden block animate-cardLift"
                style={{ animationDelay: `${index * 210}ms` }}
              >
                <div className="aspect-[5/4] min-h-[430px] sm:min-h-[460px] relative overflow-hidden">
                  <img
                    src={CATEGORY_IMAGES[cat.id]}
                    alt={label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1811]/80 via-[#0A1811]/18 to-transparent" />

                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <p className="text-sm text-white/75 mb-1">{subtitle}</p>
                    <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{label}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {keywords.slice(0, 3).map((keyword) => (
                        <span key={keyword} className="text-xs px-2.5 py-1 rounded-full bg-white/16 text-white/95 backdrop-blur-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                    <div className="mb-5 rounded-xl border border-white/15 bg-black/20 p-3 backdrop-blur-md">
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/62">
                        Example options
                      </p>
                      <div className="grid gap-2 sm:grid-cols-3">
                        {productExamples.map((product) => (
                          <div key={product.name} className="min-w-0 rounded-lg bg-white/12 px-2.5 py-2">
                            <div className="flex items-center gap-1.5">
                              <span className="rounded-full bg-[#7DE4A8]/22 px-1.5 py-0.5 text-[9px] font-bold text-[#BFF6D2]">
                                {product.badge}
                              </span>
                              <span className="truncate text-xs font-semibold text-white">{product.name}</span>
                            </div>
                            <p className="mt-1 truncate text-[11px] text-white/64">{product.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-white/90 text-base font-semibold group-hover:text-white transition-colors">
                      {t.categories.select}
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
