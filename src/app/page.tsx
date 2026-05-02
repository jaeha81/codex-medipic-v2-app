'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { useLocale } from '@/hooks/useLocale'
import type { Locale } from '@/i18n'

type VisualKey = 'weight' | 'hair' | 'women' | 'skin'
type Tone = 'olive' | 'aqua' | 'teal' | 'rose'

interface NavItem {
  id: VisualKey
  label: string
}

interface ProductCard {
  label: string
  sublabel: string
}

interface StorefrontSection {
  id: VisualKey
  tone: Tone
  eyebrow: string
  title: string
  body: string
  primaryCta: string
  secondaryCta: string
  shelfTitle: string
  cards: ProductCard[]
}

interface Copy {
  navItems: NavItem[]
  heroEyebrow: string
  heroTitle: string
  heroBody: string
  heroPrimary: string
  heroSecondary: string
  categoryPrompt: string
  sections: StorefrontSection[]
  detailTitle: string
  detailBody: string
  disclaimer: string
  footer: string
}

const INTAKE_PATH: Record<VisualKey, string> = {
  weight: '/intake/weight',
  hair: '/intake/hair',
  women: '/intake/menopause',
  skin: '/intake/skin',
}

const IMAGE: Record<VisualKey, string> = {
  weight: '/images/medipic/weight-care.png',
  hair: '/images/medipic/hair-care.png',
  women: '/images/medipic/health-review.png',
  skin: '/images/medipic/skincare.png',
}

const TONE: Record<Tone, string> = {
  olive: 'from-[#11190d] via-[#22331b] to-[#0b1008]',
  aqua: 'from-[#d7e4e5] via-[#8fb5af] to-[#5d8c85]',
  teal: 'from-[#041213] via-[#07504f] to-[#207d75]',
  rose: 'from-[#25151d] via-[#6c4051] to-[#a8878d]',
}

const COPY: Record<Locale, Copy> = {
  en: {
    navItems: [
      { id: 'weight', label: 'Weight' },
      { id: 'hair', label: 'Hair' },
      { id: 'women', label: "Women's health" },
      { id: 'skin', label: 'Skincare' },
    ],
    heroEyebrow: 'Medipic care storefront',
    heroTitle: 'Choose the right care path before the questionnaire starts.',
    heroBody:
      'A premium storefront-style landing for category browsing, visual trust, and direct intake entry. Final products and clinical copy can be replaced later.',
    heroPrimary: 'Start with LINE',
    heroSecondary: 'Browse care',
    categoryPrompt: 'Select a care area',
    detailTitle: 'Questionnaire-ready',
    detailBody: 'Every product card and CTA is connected to the matching intake path.',
    disclaimer:
      'Concept images only. Product names, prices, effects, reviews, and doctor profiles are not finalized.',
    footer: 'Medipic storefront concept with replaceable image and product slots.',
    sections: [
      {
        id: 'weight',
        tone: 'olive',
        eyebrow: 'Weight care',
        title: 'Your weight care starting point.',
        body: 'A deep green category stage prepared for future product photography, delivery guidance, and eligibility review.',
        primaryCta: 'Start weight intake',
        secondaryCta: 'View flow',
        shelfTitle: 'Access weight care lineup',
        cards: [
          { label: 'Injectable format slot', sublabel: 'For approved product photo' },
          { label: 'Daily plan slot', sublabel: 'For guidance or plan copy' },
          { label: 'Review path slot', sublabel: 'Doctor review boundary' },
          { label: 'Delivery guide slot', sublabel: 'Post-review guidance' },
        ],
      },
      {
        id: 'hair',
        tone: 'aqua',
        eyebrow: 'Hair support',
        title: 'Hair care that feels private from the first screen.',
        body: 'A clean aqua section for lifestyle imagery, scalp-care product visuals, and direct questionnaire entry.',
        primaryCta: 'Start hair intake',
        secondaryCta: 'Check category',
        shelfTitle: 'Browse hair support slots',
        cards: [
          { label: 'Topical product slot', sublabel: 'For bottle or foam image' },
          { label: 'Scalp care slot', sublabel: 'For close-up image' },
          { label: 'Progress context slot', sublabel: 'No fake before-after' },
          { label: 'Review guide slot', sublabel: 'Doctor-led next step' },
        ],
      },
      {
        id: 'women',
        tone: 'teal',
        eyebrow: "Women's health",
        title: 'A calmer route into guided health review.',
        body: 'A darker teal section for app-screen visuals, self-check flow, and medically bounded next steps.',
        primaryCta: 'Start health intake',
        secondaryCta: 'See review path',
        shelfTitle: 'Plan the review path',
        cards: [
          { label: 'Baseline check slot', sublabel: 'Questionnaire entry' },
          { label: 'Symptom path slot', sublabel: 'Structured questions' },
          { label: 'Plan preview slot', sublabel: 'After review only' },
          { label: 'Follow-up slot', sublabel: 'Care continuity' },
        ],
      },
      {
        id: 'skin',
        tone: 'rose',
        eyebrow: 'Medical skincare',
        title: 'A richer product stage for skincare.',
        body: 'A warm rose section prepared for cream, serum, routine, and concern-led product imagery.',
        primaryCta: 'Start skincare intake',
        secondaryCta: 'Browse structure',
        shelfTitle: 'Build the skincare shelf',
        cards: [
          { label: 'Cream slot', sublabel: 'For final product image' },
          { label: 'Serum slot', sublabel: 'For final product image' },
          { label: 'Concern slot', sublabel: 'Acne, tone, texture' },
          { label: 'Routine slot', sublabel: 'Guidance after review' },
        ],
      },
    ],
  },
  ja: {
    navItems: [
      { id: 'weight', label: '体重' },
      { id: 'hair', label: '毛髪' },
      { id: 'women', label: '女性の健康' },
      { id: 'skin', label: 'スキンケア' },
    ],
    heroEyebrow: 'Medipic care storefront',
    heroTitle: '問診の前に、ケアカテゴリを見て選べる構造。',
    heroBody:
      'カテゴリ閲覧、視覚的な信頼感、問診への直接導線を重視したプレミアムなストアフロント型ランディングです。',
    heroPrimary: 'LINEで始める',
    heroSecondary: 'カテゴリを見る',
    categoryPrompt: 'ケア領域を選択',
    detailTitle: '問診導線に接続',
    detailBody: 'すべてのカードと CTA は対応する問診経路に接続されています。',
    disclaimer: 'コンセプト画像です。商品名、価格、効果、レビュー、医師情報は未確定です。',
    footer: '画像と商品スロットを差し替えられる Medipic storefront concept.',
    sections: [],
  },
  ko: {
    navItems: [
      { id: 'weight', label: '체중' },
      { id: 'hair', label: '탈모' },
      { id: 'women', label: '여성 건강' },
      { id: 'skin', label: '스킨케어' },
    ],
    heroEyebrow: 'Medipic care storefront',
    heroTitle: '문진을 시작하기 전에 케어 카테고리를 먼저 고르는 구조.',
    heroBody:
      '카테고리 탐색, 시각적 신뢰감, 문진 진입을 한 화면 안에서 연결하는 프리미엄 storefront형 랜딩입니다.',
    heroPrimary: 'LINE으로 시작하기',
    heroSecondary: '케어 보기',
    categoryPrompt: '케어 영역 선택',
    detailTitle: '문진 연결 준비',
    detailBody: '각 상품 카드와 CTA는 해당 카테고리 문진 경로로 연결됩니다.',
    disclaimer: '컨셉 이미지입니다. 제품명, 가격, 효과, 후기, 의사 정보는 아직 확정하지 않았습니다.',
    footer: '이미지와 상품 슬롯을 교체할 수 있는 Medipic storefront concept.',
    sections: [
      {
        id: 'weight',
        tone: 'olive',
        eyebrow: '체중 관리',
        title: '체중 관리의 시작점을 먼저 보여줍니다.',
        body: '향후 제품 사진, 배송 안내, 적합성 검토 문구를 넣을 수 있는 딥그린 카테고리 스테이지입니다.',
        primaryCta: '체중 문진 시작',
        secondaryCta: '흐름 보기',
        shelfTitle: '체중 관리 라인업',
        cards: [
          { label: '주사형 제품 슬롯', sublabel: '승인된 제품 사진용' },
          { label: '일일 관리 슬롯', sublabel: '가이드 또는 플랜 카피용' },
          { label: '검토 경로 슬롯', sublabel: '의사 검토 경계 표시' },
          { label: '배송 안내 슬롯', sublabel: '검토 이후 안내' },
        ],
      },
      {
        id: 'hair',
        tone: 'aqua',
        eyebrow: '탈모 상담',
        title: '첫 화면부터 개인적인 탈모 케어처럼 보이게.',
        body: '라이프스타일 이미지, 두피 케어 제품 비주얼, 문진 진입을 연결하는 아쿠아 톤 섹션입니다.',
        primaryCta: '탈모 문진 시작',
        secondaryCta: '카테고리 확인',
        shelfTitle: '탈모 케어 슬롯',
        cards: [
          { label: '도포형 제품 슬롯', sublabel: '병 또는 폼 이미지용' },
          { label: '두피 케어 슬롯', sublabel: '클로즈업 이미지용' },
          { label: '진행 문맥 슬롯', sublabel: '가짜 전후 비교 금지' },
          { label: '검토 안내 슬롯', sublabel: '의사 검토 다음 단계' },
        ],
      },
      {
        id: 'women',
        tone: 'teal',
        eyebrow: '여성 건강',
        title: '차분한 건강 검토 진입 경로.',
        body: '앱 화면, 셀프 체크 흐름, 의료적 경계를 함께 보여줄 수 있는 다크 틸 섹션입니다.',
        primaryCta: '건강 문진 시작',
        secondaryCta: '검토 경로 보기',
        shelfTitle: '검토 경로 설계',
        cards: [
          { label: '기초 체크 슬롯', sublabel: '문진 진입' },
          { label: '증상 경로 슬롯', sublabel: '구조화된 질문' },
          { label: '플랜 미리보기 슬롯', sublabel: '검토 이후만' },
          { label: '후속 안내 슬롯', sublabel: '케어 지속성' },
        ],
      },
      {
        id: 'skin',
        tone: 'rose',
        eyebrow: '메디컬 스킨케어',
        title: '스킨케어를 위한 더 풍부한 제품 스테이지.',
        body: '크림, 세럼, 루틴, 피부 고민 중심 이미지를 넣을 수 있는 로즈 톤 섹션입니다.',
        primaryCta: '스킨케어 문진 시작',
        secondaryCta: '구조 보기',
        shelfTitle: '스킨케어 진열 구조',
        cards: [
          { label: '크림 슬롯', sublabel: '최종 제품 이미지용' },
          { label: '세럼 슬롯', sublabel: '최종 제품 이미지용' },
          { label: '고민 카드 슬롯', sublabel: '여드름, 톤, 피부결' },
          { label: '루틴 슬롯', sublabel: '검토 이후 안내' },
        ],
      },
    ],
  },
}

COPY.ja.sections = COPY.en.sections

function Arrow() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-5-5 5 5-5 5" />
    </svg>
  )
}

function MotionStage({
  image,
  tone,
  children,
  className = '',
}: {
  image: string
  tone: Tone
  children: ReactNode
  className?: string
}) {
  const [pointer, setPointer] = useState({ x: 50, y: 34 })

  return (
    <div
      className={`group relative overflow-hidden rounded-lg bg-gradient-to-br ${TONE[tone]} ${className}`}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        setPointer({
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100,
        })
      }}
      onMouseLeave={() => setPointer({ x: 50, y: 34 })}
    >
      <div
        className="absolute -inset-8 bg-cover bg-center bg-no-repeat opacity-70 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-black/38" />
      <div
        className="absolute inset-0 transition duration-300"
        style={{
          background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(255,255,218,0.48), transparent 22%), radial-gradient(circle at 50% 16%, rgba(255,255,255,0.12), transparent 38%)`,
        }}
      />
      <div className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/24 to-transparent opacity-0 group-hover:animate-[flashSweep_1.55s_ease-out] group-hover:opacity-100" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

function ProductMock({ visual }: { visual: VisualKey }) {
  if (visual === 'hair') {
    return (
      <div className="relative h-52 w-44">
        <div className="absolute left-6 top-12 h-28 w-20 rotate-[-22deg] rounded-full bg-[#d69b72] shadow-2xl" />
        <div className="absolute left-18 top-0 h-52 w-20 rotate-[12deg] rounded-full bg-[#f5efe5] shadow-2xl" />
        <div className="absolute left-24 top-28 h-4 w-14 rotate-[12deg] rounded-full bg-[#829987]" />
      </div>
    )
  }

  if (visual === 'women') {
    return (
      <div className="relative h-56 w-48">
        <div className="absolute left-12 top-0 h-56 w-28 rounded-[30px] border border-white/24 bg-[#0b2f2f]/92 shadow-2xl">
          <div className="mx-auto mt-3 h-2 w-10 rounded-full bg-white/35" />
          <div className="mx-4 mt-8 space-y-3">
            <div className="h-3 rounded-full bg-[#ed6ca5]" />
            <div className="h-3 w-16 rounded-full bg-white/50" />
            <div className="h-20 rounded-2xl bg-white/12" />
          </div>
        </div>
        <div className="absolute left-0 top-24 h-20 w-20 rounded-full border border-white/22 bg-white/12 backdrop-blur" />
      </div>
    )
  }

  if (visual === 'skin') {
    return (
      <div className="relative h-52 w-52">
        <div className="absolute left-3 top-20 h-24 w-24 rounded-full bg-[#e8baad] shadow-2xl" />
        <div className="absolute right-2 top-4 h-40 w-20 rounded-[32px] bg-[#f6e7dd] shadow-2xl" />
        <div className="absolute bottom-3 left-24 h-24 w-24 rounded-[28px] bg-[#c8939c] shadow-2xl" />
      </div>
    )
  }

  return (
    <div className="relative h-60 w-56">
      <div className="absolute left-4 top-28 h-24 w-24 rounded-full bg-[#d69b72] shadow-2xl" />
      <div className="absolute left-20 top-8 h-52 w-16 rotate-[-12deg] rounded-[28px] bg-[#f7f3eb] shadow-2xl" />
      <div className="absolute left-28 top-2 h-56 w-16 rotate-[13deg] rounded-[28px] bg-[#e8eadc] shadow-2xl" />
      <div className="absolute right-0 top-16 h-20 w-20 rounded-full bg-[#f6f2e8] shadow-2xl" />
      <div className="absolute left-28 top-40 h-4 w-20 rotate-[13deg] rounded-full bg-[#d7ed8b]" />
    </div>
  )
}

function ProductTile({ section, card }: { section: StorefrontSection; card: ProductCard }) {
  return (
    <Link
      href={INTAKE_PATH[section.id]}
      className="group/tile relative min-w-[180px] overflow-hidden rounded-lg border border-white/18 bg-white/18 p-3 text-white shadow-[0_22px_48px_rgba(0,0,0,0.18)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/24 md:min-w-[218px]"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.12), rgba(0,0,0,0.25)), url(${IMAGE[section.id]})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className="absolute inset-0 bg-black/22 transition group-hover/tile:bg-black/10" />
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <span className="rounded-full bg-[#d7ed8b] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#18230f]">
            Medipic
          </span>
          <span className="grid h-7 w-7 place-items-center rounded-full border border-white/32 text-white">
            <Arrow />
          </span>
        </div>
        <div className="mt-5 flex h-28 items-center justify-center motion-safe:animate-cardLift">
          <ProductMock visual={section.id} />
        </div>
        <p className="mt-5 text-sm font-semibold leading-tight">{card.label}</p>
        <p className="mt-1 text-[11px] leading-4 text-white/74">{card.sublabel}</p>
      </div>
    </Link>
  )
}

function DetailPanel({ copy, section }: { copy: Copy; section: StorefrontSection }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Link
        href={INTAKE_PATH[section.id]}
        className="group rounded-lg border border-white/14 bg-black/24 p-5 text-white backdrop-blur transition hover:bg-black/18"
      >
        <p className="max-w-[12rem] text-2xl font-semibold leading-none">{copy.detailTitle}</p>
        <p className="mt-3 max-w-[16rem] text-xs leading-5 text-white/72">{copy.detailBody}</p>
        <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-black">
          {section.primaryCta}
          <Arrow />
        </span>
      </Link>
      <div className="rounded-lg border border-white/14 bg-black/24 p-5 text-white backdrop-blur">
        <p className="text-2xl font-semibold leading-none">Replaceable visual system</p>
        <p className="mt-3 text-xs leading-5 text-white/72">
          Current images are AI-generated concept assets. Final products and backgrounds can replace these paths without changing the layout.
        </p>
        <div className="mt-6 h-24 overflow-hidden rounded-lg border border-white/14">
          <div className="h-full bg-cover bg-center transition duration-500 hover:scale-105" style={{ backgroundImage: `url(${IMAGE[section.id]})` }} />
        </div>
      </div>
    </div>
  )
}

function StorefrontSectionView({ section, copy }: { section: StorefrontSection; copy: Copy }) {
  return (
    <section id={section.id} className="bg-[#f4f1eb] p-2 sm:p-4">
      <MotionStage
        image={IMAGE[section.id]}
        tone={section.tone}
        className="mx-auto min-h-[94svh] max-w-[1440px] px-5 py-8 text-white shadow-[0_30px_90px_rgba(0,0,0,0.2)] sm:px-8 lg:px-12"
      >
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/76">{section.eyebrow}</p>
          <h2 className="mt-2 max-w-[20rem] text-4xl font-semibold leading-[0.9] tracking-tight sm:max-w-2xl sm:text-6xl">
            {section.title}
          </h2>
          <div className="relative mt-5 flex min-h-[260px] w-full items-center justify-center sm:min-h-[330px]">
            <div className="absolute h-64 w-64 rounded-full bg-white/14 blur-3xl" />
            <div className="motion-safe:animate-cardLift">
              <ProductMock visual={section.id} />
            </div>
          </div>
          <p className="max-w-md text-sm leading-6 text-white/82">{section.body}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Link
              href={INTAKE_PATH[section.id]}
              className="inline-flex items-center gap-2 rounded-full bg-[#d7ed8b] px-5 py-2.5 text-sm font-bold text-[#16220f] hover:bg-[#e4f5a9]"
            >
              {section.primaryCta}
              <Arrow />
            </Link>
            <Link
              href={INTAKE_PATH[section.id]}
              className="inline-flex items-center rounded-full border border-white/28 bg-white/12 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/18"
            >
              {section.secondaryCta}
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-6xl">
          <p className="mb-3 text-sm font-semibold text-white/90">{section.shelfTitle}</p>
          <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-3 sm:mx-0 sm:px-0">
            {section.cards.map((card) => (
              <ProductTile key={card.label} section={section} card={card} />
            ))}
          </div>
        </div>

        <div className="mx-auto mt-7 max-w-4xl">
          <DetailPanel copy={copy} section={section} />
        </div>
        <p className="mx-auto mt-5 max-w-xl text-center text-[10px] leading-4 text-white/62">{copy.disclaimer}</p>
      </MotionStage>
    </section>
  )
}

export default function HomePage() {
  const [locale, setLocale] = useLocale()
  const copy = COPY[locale] ?? COPY.en

  return (
    <div className="min-h-screen bg-[#f4f1eb] text-[#111111]">
      <nav className="sticky top-0 z-40 border-b border-black/8 bg-[#f4f1eb]/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4">
          <Link href="/" className="text-2xl font-semibold tracking-tight">
            medipic
          </Link>
          <div className="hidden items-center gap-7 lg:flex">
            {copy.navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="text-sm font-semibold text-black/58 hover:text-black">
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} onChange={setLocale} variant="light" />
            <Link href="/intake" className="hidden rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white sm:inline-flex">
              {copy.heroPrimary}
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="bg-[#f4f1eb] p-2 sm:p-4">
          <div className="mx-auto grid min-h-[calc(100svh-76px)] max-w-[1440px] overflow-hidden rounded-lg bg-[#11190d] text-white lg:grid-cols-[0.44fr_0.56fr]">
            <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-14">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/62">{copy.heroEyebrow}</p>
              <h1 className="mt-4 max-w-xl text-5xl font-semibold leading-[0.92] tracking-tight sm:text-6xl lg:text-7xl">
                {copy.heroTitle}
              </h1>
              <p className="mt-5 max-w-md text-base leading-7 text-white/72">{copy.heroBody}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/intake"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d7ed8b] px-6 py-3.5 text-base font-bold text-[#16220f] hover:bg-[#e4f5a9]"
                >
                  {copy.heroPrimary}
                  <Arrow />
                </Link>
                <a
                  href="#weight"
                  className="inline-flex items-center justify-center rounded-full border border-white/24 bg-white/10 px-6 py-3.5 text-base font-semibold text-white backdrop-blur hover:bg-white/16"
                >
                  {copy.heroSecondary}
                </a>
              </div>
              <div className="mt-10">
                <p className="text-sm font-semibold text-white/72">{copy.categoryPrompt}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {copy.navItems.map((item) => (
                    <a key={item.id} href={`#${item.id}`} className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/18">
                      {item.label}
                      <Arrow />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <MotionStage image={IMAGE.weight} tone="olive" className="flex min-h-[560px] items-center justify-center px-6 py-10">
              <div className="flex flex-col items-center text-center">
                <p className="max-w-xs text-3xl font-semibold leading-[0.95]">Visual care stage</p>
                <div className="mt-8 motion-safe:animate-cardLift">
                  <ProductMock visual="weight" />
                </div>
                <p className="mt-6 max-w-xs text-sm leading-6 text-white/74">{copy.disclaimer}</p>
              </div>
            </MotionStage>
          </div>
        </section>

        {copy.sections.map((section) => (
          <StorefrontSectionView key={section.id} section={section} copy={copy} />
        ))}
      </main>

      <footer className="bg-[#f4f1eb] px-6 py-10">
        <div className="mx-auto max-w-[1440px] border-t border-black/10 pt-6">
          <p className="text-sm text-black/58">{copy.footer}</p>
        </div>
      </footer>
    </div>
  )
}
