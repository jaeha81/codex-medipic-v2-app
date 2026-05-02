'use client'

import { useEffect, useRef } from 'react'
import type { Translations } from '@/i18n/en'

interface HowItWorksProps {
  t: Translations
}

const STEP_ICONS = [
  <svg key="s1" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
  </svg>,
  <svg key="s2" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
  </svg>,
  <svg key="s3" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>,
]

const TRUST_ICONS = [
  <svg key="t1" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
  </svg>,
  <svg key="t2" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
  </svg>,
  <svg key="t3" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7.5l3 4.5m0 0l3-4.5M12 12v5.25M15 12H9m6 3H9m12-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="t4" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>,
]

// Codex-style reveal helper: observe and animate elements
function observeReveal(els: HTMLElement[], options?: IntersectionObserverInit) {
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => { el.style.opacity = '1'; el.style.transform = 'none' })
    return
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        ;(entry.target as HTMLElement).style.opacity = '1'
        ;(entry.target as HTMLElement).style.transform = 'translateY(0)'
        obs.unobserve(entry.target)
      }
    })
  }, { threshold: 0.16, rootMargin: '0px 0px -40px 0px', ...options })
  els.forEach(el => obs.observe(el))
}

export function HowItWorks({ t }: HowItWorksProps) {
  const headingRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Heading
    if (headingRef.current) {
      const el = headingRef.current
      el.style.opacity = '0'
      el.style.transform = 'translateY(20px)'
      el.style.transition = 'opacity 0.65s ease, transform 0.65s ease'
      observeReveal([el])
    }

    // journey-cards (Codex: .journey-card)
    if (stepsRef.current) {
      const cards = Array.from(stepsRef.current.children) as HTMLElement[]
      cards.forEach((card, i) => {
        card.style.opacity = '0'
        card.style.transform = 'translateY(24px)'
        card.style.transition = 'opacity 0.62s ease, transform 0.62s ease'
        card.style.transitionDelay = `${Math.min(i * 75, 320)}ms`
      })
      observeReveal(cards)
    }

    // Trust items
    if (trustRef.current) {
      const items = Array.from(trustRef.current.children) as HTMLElement[]
      items.forEach((item, i) => {
        item.style.opacity = '0'
        item.style.transform = 'translateY(20px)'
        item.style.transition = 'opacity 0.55s ease, transform 0.55s ease'
        item.style.transitionDelay = `${Math.min(i * 75, 320)}ms`
      })
      observeReveal(items)
    }
  }, [])

  return (
    <section className="bg-[#EAF2EB] py-20">
      <div className="max-w-6xl mx-auto px-6">

        <div ref={headingRef} className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#1D7A4A] mb-3">
            Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {t.howItWorks.title}
          </h2>
        </div>

        {/* journey-cards */}
        <div ref={stepsRef} className="grid sm:grid-cols-3 gap-8 relative">
          <div className="hidden sm:block absolute top-10 left-[calc(50%/3+2.5rem)] right-[calc(50%/3+2.5rem)] h-px bg-gray-200" />

          {t.howItWorks.steps.map((step, i) => (
            <div key={i} className="journey-card shine-card flex flex-col items-center text-center bg-white rounded-2xl p-6 border border-[#CFE4D5] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="relative z-10 w-20 h-20 bg-[#F4FBF6] rounded-2xl shadow-sm border border-[#D4EBDD] flex items-center justify-center mb-6 text-[#2D5742]">
                {STEP_ICONS[i]}
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#1D7A4A] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-[17px]">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[210px]">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div ref={trustRef} className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TRUST_ICONS.map((icon, i) => (
            <div
              key={i}
              className="shine-card flex items-center gap-3 bg-white rounded-xl p-4 border border-[#D2E5D7] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex-shrink-0 text-[#1D7A4A]">{icon}</div>
              <span className="text-sm font-medium text-gray-700">
                {[t.trust.licensed, t.trust.online, t.trust.pricing, t.trust.delivery][i]}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
