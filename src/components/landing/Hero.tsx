'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { useCountUp } from '@/hooks/useCountUp'
import type { Translations } from '@/i18n/en'
import type { Locale } from '@/i18n'

interface HeroProps {
  t: Translations
  locale: Locale
}

type HeroCard = {
  id: 'weight' | 'hair' | 'menopause' | 'skincare'
  img: string
  label: { en: string; ja: string; ko: string }
}

const HERO_CARDS: HeroCard[] = [
  {
    id: 'weight',
    img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80',
    label: { en: 'Weight', ja: 'Weight', ko: '체중' },
  },
  {
    id: 'hair',
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
    label: { en: 'Hair', ja: 'Hair', ko: '탈모' },
  },
  {
    id: 'menopause',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
    label: { en: 'Women Health', ja: 'Women Health', ko: '여성 건강' },
  },
  {
    id: 'skincare',
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80',
    label: { en: 'Skin', ja: 'Skin', ko: '피부' },
  },
]

function getLocalizedLabel(card: HeroCard, locale: Locale) {
  if (locale === 'ko') return card.label.ko
  if (locale === 'ja') return card.label.ja
  return card.label.en
}

export function Hero({ t, locale }: HeroProps) {
  const copyRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    const copyEl = copyRef.current
    const mediaEl = mediaRef.current
    if (!copyEl || !mediaEl) return

    const children = Array.from(copyEl.children) as HTMLElement[]
    children.forEach((child, index) => {
      child.style.opacity = '0'
      child.style.transform = 'translateY(20px)'
      child.style.transition = 'opacity 0.65s ease, transform 0.65s ease'
      child.style.transitionDelay = `${Math.min(index * 90, 360)}ms`
      requestAnimationFrame(() => {
        child.style.opacity = '1'
        child.style.transform = 'translateY(0)'
      })
    })

    mediaEl.style.opacity = '0'
    mediaEl.style.transform = 'translateY(20px)'
    mediaEl.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
    mediaEl.style.transitionDelay = '150ms'
    requestAnimationFrame(() => {
      mediaEl.style.opacity = '1'
      mediaEl.style.transform = 'translateY(0)'
    })
  }, [])

  useEffect(() => {
    const mediaEl = mediaRef.current
    const cards = cardRefs.current.filter(Boolean) as HTMLAnchorElement[]
    if (!mediaEl || cards.length === 0) return

    let frame = 0

    const updateCards = (event: MouseEvent) => {
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect()
          const dx = (event.clientX - (rect.left + rect.width / 2)) / rect.width
          const dy = (event.clientY - (rect.top + rect.height / 2)) / rect.height
          const tiltX = Math.max(-1, Math.min(1, dy)) * -5
          const tiltY = Math.max(-1, Math.min(1, dx)) * 7
          const shiftX = Math.max(-1, Math.min(1, dx)) * 6
          const shiftY = Math.max(-1, Math.min(1, dy)) * 5
          card.style.transform = `perspective(700px) translate3d(${shiftX}px, ${shiftY}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
        })
      })
    }

    const resetCards = () => {
      cards.forEach((card) => {
        card.style.transform = 'perspective(700px) translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)'
      })
    }

    mediaEl.addEventListener('mousemove', updateCards)
    mediaEl.addEventListener('mouseleave', resetCards)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      mediaEl.removeEventListener('mousemove', updateCards)
      mediaEl.removeEventListener('mouseleave', resetCards)
    }
  }, [])

  const { ref: stat1Ref, display: stat1Display } = useCountUp({ target: 500, suffix: 'K+', duration: 900 })
  const { ref: stat3Ref, display: stat3Display } = useCountUp({ target: 49, suffix: '', duration: 900 })

  return (
    <section className="relative overflow-hidden bg-[#0E2418]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(84,189,131,0.30),transparent_44%),radial-gradient(circle_at_8%_95%,rgba(44,136,95,0.24),transparent_48%)] pointer-events-none" />
      <div className="absolute top-28 left-[42%] w-56 h-56 rounded-full bg-[#77D19A]/20 blur-[95px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-6 lg:pt-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div ref={copyRef} className="flex-1 text-center lg:text-left flex flex-col gap-0">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1D7A4A]/20 text-[#96D8B6] text-sm font-semibold mb-6 border border-[#54B881]/30 self-center lg:self-start pulse-ring">
              {t.hero.badge}
            </span>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
              {t.hero.title.split('\n').map((line, index) => (
                <span key={index} className="block">
                  {index === 1 ? <span className="text-[#7DE4A8]">{line}</span> : line}
                </span>
              ))}
            </h1>

            <p className="text-lg text-white/70 mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-12">
              <Link
                href="/intake"
                className="flex items-center justify-center gap-2.5 px-8 py-4 bg-[#1D7A4A] hover:bg-[#145F39] text-white font-semibold rounded-2xl transition-all duration-200 shadow-lg shadow-[#1D7A4A]/35 hover:shadow-[#1D7A4A]/55 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.03 2 11.02c0 2.97 1.54 5.61 3.94 7.31L4.9 22l3.76-1.95C9.68 20.64 10.82 21 12 21c5.52 0 10-4.03 10-8.98S17.52 2 12 2z" />
                </svg>
                {t.hero.cta_line}
              </Link>
              <Link
                href="/intake"
                className="flex items-center justify-center gap-2 px-8 py-4 border border-white/25 text-white font-semibold rounded-2xl hover:bg-white/12 transition-all duration-200"
              >
                {t.hero.cta_web}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-8 pb-12 lg:pb-0">
              <div className="text-center lg:text-left">
                <p className="text-2xl font-bold text-white">
                  <span ref={stat1Ref}>{stat1Display}</span>
                </p>
                <p className="text-xs text-white/50 mt-0.5">Patients</p>
              </div>
              <div className="w-px h-8 bg-white/15" />
              <div className="text-center lg:text-left">
                <p className="text-2xl font-bold text-white">0</p>
                <p className="text-xs text-white/50 mt-0.5">Consult fee</p>
              </div>
              <div className="w-px h-8 bg-white/15" />
              <div className="text-center lg:text-left">
                <p className="text-2xl font-bold text-white">
                  <span ref={stat3Ref}>{stat3Display === '49' ? '4.9' : (parseInt(stat3Display, 10) / 10).toFixed(1)}</span>
                </p>
                <p className="text-xs text-white/50 mt-0.5">Rating</p>
              </div>
            </div>
          </div>

          <div ref={mediaRef} className="flex-1 w-full max-w-sm lg:max-w-none">
            <div className="grid grid-cols-2 gap-4">
              {HERO_CARDS.map((card, index) => (
                <Link
                  key={card.id}
                  href={`/intake/${card.id}`}
                  ref={(el) => {
                    cardRefs.current[index] = el
                  }}
                  className="group shine-card relative rounded-2xl overflow-hidden aspect-square block transition-transform duration-300 will-change-transform"
                >
                  <img
                    src={card.img}
                    alt={getLocalizedLabel(card, locale)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07140D]/76 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-white text-sm font-semibold tracking-wide">
                    {getLocalizedLabel(card, locale)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-16 bg-gradient-to-b from-transparent to-[#F2F6F1]" />
    </section>
  )
}
