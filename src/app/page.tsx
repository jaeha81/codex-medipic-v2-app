"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { careProducts, type CareProduct, type ProductGalleryItem } from "@/data/careProducts";
import { localizeCareProducts } from "@/data/careProductCopy";
import { useLocale } from "@/hooks/useLocale";
import { getLineConnectUrl } from "@/lib/lineLink";
import type { Locale } from "@/i18n";

type HomeCopy = {
  login: string;
  join: string;
  signUp: string;
  email: string;
  categories: string;
  line: string;
  lineBlockEyebrow: string;
  lineBlockTitle: string;
  lineBlockSubtitle: string;
  lineBlockButton: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  treatmentOptions: string;
  productHint: (title: string) => string;
  getStarted: string;
  intake: string;
  membershipTitle: string;
  membershipSubtitle: string;
  membershipBenefits: string[];
  joinEyebrow: string;
  footerAbout: string;
  footerCore: string;
  footerHelp: string;
  footerIntro: string;
  footerSupport: string;
  footerPrivacy: string;
  footerContact: string;
};

const uiCopy: Record<Locale, HomeCopy> = {
  en: {
    login: "Login",
    join: "Join medipic",
    signUp: "Sign up",
    email: "Email",
    categories: "Care menu",
    line: "Connect on LINE",
    lineBlockEyebrow: "Start on LINE",
    lineBlockTitle: "Start on LINE, stay supported beyond the consultation",
    lineBlockSubtitle: "Easy, fast online consultations with women's health doctors\nIntake, booking, care, and follow-up in one flow\nNo app download needed, receive care from home",
    lineBlockButton: "LINE",
    heroEyebrow: "medipic app",
    heroTitle: "Care designed for women, guided by women’s health doctors",
    heroSubtitle: "Connect with women’s health doctors through convenient online consultations\nFrom intake to booking, consultation, prescription, and delivery — everything flows simply\nStart without downloading an app, and receive your care from home",
    treatmentOptions: "Treatment options",
    productHint: (title) => `Tap a product image to open the ${title} detail page.`,
    getStarted: "Get started",
    intake: "Intake",
    membershipTitle: "your care journey, all in one place",
    membershipSubtitle: "Care designed for women, guided by women’s health doctors\nConnect with women’s health doctors through convenient online consultations\nFrom intake to booking, consultation, prescription, and delivery — everything flows simply\nStart without downloading an app, and receive your care from home",
    membershipBenefits: [
      "Personalized care plan",
      "Women's health doctors online",
      "LINE-based follow-up support",
      "Post-review payment and delivery guidance",
      "Follow-up review when needed",
      "Easy refills for ongoing care",
    ],
    joinEyebrow: "Join medipic",
    footerAbout: "About",
    footerCore: "Core care",
    footerHelp: "Help",
    footerIntro: "How medipic works",
    footerSupport: "Support",
    footerPrivacy: "Privacy",
    footerContact: "Contact",
  },
  ja: {
    login: "ログイン",
    join: "medipicを始める",
    signUp: "登録",
    email: "Email",
    categories: "ケアメニュー",
    line: "LINEで相談",
    lineBlockEyebrow: "Start on LINE",
    lineBlockTitle: "気になることを、かんたんな問診から始められます。",
    lineBlockSubtitle: "プライベートな問診から始め、治療オプションを確認し、医師の案内に沿ってオンラインでケアを続けられます。",
    lineBlockButton: "LINE",
    heroEyebrow: "medipic app",
    heroTitle: "相談からフォローまで、ひとつの場所で",
    heroSubtitle: "プライベートな問診から始め、治療オプションを確認し、医師の案内に沿ってオンラインでケアを続けられます。",
    treatmentOptions: "ケアオプション",
    productHint: (title) => `${title}の詳細ページを見るには、商品画像を選択してください。`,
    getStarted: "詳しく見る",
    intake: "問診を始める",
    membershipTitle: "相談、商品確認、フォローまでまとめて",
    membershipSubtitle: "女性の健康相談に合わせて、問診、商品確認、LINEでの案内が続くように設計しています。",
    membershipBenefits: [
      "一人ひとりに合わせたケアプラン",
      "女性の健康に詳しい医師のオンライン確認",
      "LINEでのフォローアップ",
      "処方と配送案内",
      "必要に応じた調整",
      "継続ケアの相談",
    ],
    joinEyebrow: "Join medipic",
    footerAbout: "About",
    footerCore: "Core care",
    footerHelp: "Help",
    footerIntro: "medipicの流れ",
    footerSupport: "サポート",
    footerPrivacy: "プライバシー",
    footerContact: "お問い合わせ",
  },
  ko: {
    login: "로그인",
    join: "medipic 시작하기",
    signUp: "가입",
    email: "Email",
    categories: "케어 메뉴",
    line: "LINE 상담",
    lineBlockEyebrow: "Start on LINE",
    lineBlockTitle: "고민에 맞춘 간단한 안내 문진으로 시작하세요.",
    lineBlockSubtitle: "비공개 문진으로 시작하고, 상품 정보를 확인한 뒤 의료진 검토를 거쳐 온라인 케어를 이어갑니다.",
    lineBlockButton: "LINE",
    heroEyebrow: "medipic app",
    heroTitle: "상담부터 사후관리까지 한 곳에서",
    heroSubtitle: "비공개 문진으로 시작하고, 상품 정보를 확인한 뒤 의료진 검토를 거쳐 온라인 케어를 이어갑니다.",
    treatmentOptions: "케어 옵션",
    productHint: (title) => `${title} 상세페이지를 보려면 상품 이미지를 선택하세요.`,
    getStarted: "상세 보기",
    intake: "문진 시작",
    membershipTitle: "상담, 상품 확인, 사후관리까지 한 번에",
    membershipSubtitle: "여성 건강 고민에 맞춰 문진, 상품 검토, LINE 상담 안내가 이어지도록 구성했습니다.",
    membershipBenefits: [
      "개인 맞춤 케어 플랜",
      "여성 건강 중심 온라인 의사 검토",
      "LINE 기반 사후관리 지원",
      "처방 및 비공개 배송 안내",
      "필요 시 용량과 방향 조정",
      "지속 관리를 위한 리필 상담",
    ],
    joinEyebrow: "medipic 시작",
    footerAbout: "소개",
    footerCore: "주요 케어",
    footerHelp: "도움말",
    footerIntro: "medipic 이용 흐름",
    footerSupport: "지원",
    footerPrivacy: "개인정보",
    footerContact: "문의",
  },
};

const socialLinks = [
  { name: "LINE", href: getLineConnectUrl() },
  { name: "Instagram", href: "https://www.instagram.com/" },
  { name: "Facebook", href: "https://www.facebook.com/" },
  { name: "X", href: "https://x.com/" },
] as const;

const complianceCopy: Record<Locale, { title: string; items: string[] }> = {
  en: {
    title: "Medical and legal notice",
    items: [
      "Medipic provides intake and care coordination information only. Diagnosis, prescription, treatment eligibility, and delivery guidance are decided by a licensed physician after review.",
      "Online care may not be appropriate for every condition. If a physician determines that online consultation is unsuitable, in-person care or another medical institution may be recommended.",
      "This site does not guarantee treatment effects, prescription availability, weight change, skin improvement, hair growth, or any specific outcome.",
      "Emergency symptoms are not handled here. Use local emergency services or visit a medical institution immediately.",
    ],
  },
  ja: {
    title: "医療・法令に関する注意",
    items: [
      "Medipicは問診と案内情報を提供するサービスです。診断、処方、治療可否、配送案内は、医師の確認後に判断されます。",
      "オンライン診療が適切でない場合があります。医師が不適切と判断した場合は、対面診療または他の医療機関の受診をご案内することがあります。",
      "治療効果、処方可否、体重変化、肌改善、発毛、その他特定の結果を保証するものではありません。",
      "緊急症状には対応していません。緊急時は救急窓口または医療機関を受診してください。",
    ],
  },
  ko: {
    title: "의료 및 법적 안내",
    items: [
      "Medipic은 문진과 케어 연결 정보를 제공하는 서비스입니다. 진단, 처방, 치료 가능 여부, 배송 안내는 의사 검토 후 결정됩니다.",
      "온라인 상담이 모든 상태에 적합한 것은 아닙니다. 의사가 온라인 상담이 부적절하다고 판단하면 대면 진료 또는 다른 의료기관 방문을 안내할 수 있습니다.",
      "치료 효과, 처방 가능 여부, 체중 변화, 피부 개선, 발모, 기타 특정 결과를 보장하지 않습니다.",
      "응급 증상은 이 서비스에서 처리하지 않습니다. 응급 상황에서는 현지 응급 서비스 또는 의료기관을 즉시 이용해야 합니다.",
    ],
  },
};

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-5-5 5 5-5 5" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <span className="flex flex-col gap-1" aria-hidden="true">
      <span className="block h-px w-4 bg-current" />
      <span className="block h-px w-4 bg-current" />
      <span className="block h-px w-4 bg-current" />
    </span>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" d="M12 5v14M5 12h14" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.9">
      <rect width="17" height="17" x="3.5" y="3.5" rx="4.5" />
      <circle cx="12" cy="12" r="3.7" />
      <path strokeLinecap="round" d="M17.5 6.7h.01" />
    </svg>
  );
}

function LineSocialIcon() {
  return (
    <svg aria-hidden="true" className="h-8 w-8" viewBox="0 0 32 32" fill="none">
      <rect x="4.5" y="4.5" width="23" height="23" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <text x="16" y="18.9" fill="currentColor" fontFamily="Arial, Helvetica, sans-serif" fontSize="7" fontWeight="700" textAnchor="middle">
        LINE
      </text>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg aria-hidden="true" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M13.6 21v-7.9h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.4v3.1h2.8V21h3.4Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg aria-hidden="true" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.7 10.55 21.4 3h-1.6l-5.82 6.56L9.33 3H4l7.03 9.93L4 20.86h1.6l6.14-6.93 4.9 6.93H22l-7.3-10.31Zm-2.17 2.45-.71-.99-5.67-7.78h2.42l4.57 6.27.71.99 5.95 8.17h-2.42L12.53 13Z" />
    </svg>
  );
}

function SocialIcon({ name }: { name: (typeof socialLinks)[number]["name"] }) {
  if (name === "LINE") return <LineSocialIcon />;
  if (name === "Instagram") return <InstagramIcon />;
  if (name === "Facebook") return <FacebookIcon />;
  return <XIcon />;
}

function TopNav({ locale, setLocale, copy, products }: { locale: Locale; setLocale: (locale: Locale) => void; copy: HomeCopy; products: CareProduct[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = products.map((product) => ({ number: product.number, label: product.navLabel, href: `#${product.id}` }));

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-[1440px] items-center justify-center px-5 py-5 sm:px-8">
          <Link href="/" aria-label="Medipic home" className="text-3xl font-semibold tracking-[-0.05em] text-[#111111]">
            medipic.
          </Link>
        </div>
      </header>
      <div className="fixed inset-x-0 top-0 z-50 pointer-events-none">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8">
        <a
          href="#care-menu"
          onClick={(event) => {
            event.preventDefault();
            setIsOpen(true);
          }}
          className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center border-0 bg-transparent text-[#111111] shadow-none transition hover:text-black/55"
          aria-label="Open care menu"
        >
          <MenuIcon />
        </a>
        <div className="pointer-events-auto flex items-center gap-2">
          <Link href="/login" className="inline-flex border-0 bg-transparent py-2 text-xs font-semibold text-black/70 shadow-none transition hover:text-[#111111]">
            {copy.login}
          </Link>
          <div>
            <LanguageSwitcher locale={locale} onChange={setLocale} variant="text" />
          </div>
        </div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-[#dff0e5]/92 px-5 py-5 backdrop-blur-xl sm:px-8">
          <div className="mx-auto flex max-w-[720px] items-center justify-between">
            <span className="text-3xl font-semibold tracking-[-0.05em] text-[#111111]">medipic.</span>
            <button type="button" onClick={() => setIsOpen(false)} className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/88 text-[#111111]" aria-label="Close care menu">
              <span aria-hidden="true" className="text-2xl leading-none">×</span>
            </button>
          </div>
          <nav className="mx-auto mt-10 max-w-[720px]" aria-label={copy.categories}>
            <p className="versed-label mb-3 text-center text-black/44">{copy.categories}</p>
            <div className="overflow-hidden rounded-[4px] border border-black/12 bg-white/90">
              {menuItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="group flex items-center justify-between border-b border-black/10 px-5 py-5 text-left transition last:border-b-0 hover:bg-[#dff0e5]">
                  <span>
                    <span className="versed-label block text-black/38">{item.number}</span>
                    <span className="block text-xl font-medium text-[#111111]">{item.label}</span>
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-black/14 text-[#111111] transition group-hover:bg-[#111111] group-hover:text-white">
                    <PlusIcon />
                  </span>
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

function CategoryMenu({ products, copy }: { products: CareProduct[]; copy: HomeCopy }) {
  return (
    <nav id="care-menu" className="w-full max-w-lg scroll-mt-24" aria-label="Care categories">
      <div className="grid gap-2.5">
        {products.map((product) => (
          <Link key={product.id} href={`#${product.id}`} className="group flex items-center justify-between border border-black/16 px-5 py-4 text-left transition hover:border-black/28 hover:bg-white/25 hover:text-black/58">
            <span>
              <span className="block text-lg font-medium text-[#111111]">{product.navLabel}</span>
            </span>
            <span className="grid h-8 w-8 place-items-center text-[#111111] transition group-hover:text-black/58">
              <PlusIcon />
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-7 text-center">
        <h2 className="mx-auto max-w-[32ch] text-[20px] font-medium leading-[1.14] tracking-normal text-[#111111] text-balance">
          {copy.lineBlockTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-[34ch] whitespace-pre-line text-sm leading-7 text-black/64 sm:max-w-xl sm:text-[15px]">{copy.lineBlockSubtitle}</p>
      </div>
      <div className="mt-5 flex justify-center">
        <a href={getLineConnectUrl()} aria-label="Connect on LINE" className="inline-flex items-center justify-center bg-[#07B53B] px-7 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(7,181,59,0.24)] transition hover:bg-[#069b34]">
          <span>{copy.lineBlockButton}</span>
        </a>
      </div>
    </nav>
  );
}

function HeroVisual() {
  const visuals = [
    { src: "/images/medipic/redesign/menopause.png", alt: "Doctor consultation visual", pos: "object-[50%_28%]" },
    { src: "/images/medipic/redesign/weightloss.png", alt: "Weight care visual", pos: "object-[52%_42%]" },
    { src: "/images/medipic/sample/products/skin-tranexamic.png", alt: "Skincare product visual", pos: "object-center" },
  ];

  return (
    <div className="mx-auto mt-9 grid w-full max-w-3xl grid-cols-[0.92fr_1.12fr_0.96fr] gap-2 sm:gap-3">
      {visuals.map((item) => (
        <div key={item.src} className="relative aspect-[4/5] overflow-hidden rounded-[4px] border border-black/10 bg-white">
          <Image src={item.src} alt={item.alt} fill sizes="33vw" className={`object-cover ${item.pos}`} />
        </div>
      ))}
    </div>
  );
}

function HeroSection({ products, copy }: { products: CareProduct[]; copy: HomeCopy }) {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-[#dff0e5]">
      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1440px] flex-col items-center justify-center px-5 pb-12 pt-28 text-center sm:px-8">
        <h1 className="max-w-3xl text-[20px] font-medium leading-[1.14] tracking-normal text-[#111111] text-balance">
          {copy.heroTitle}
        </h1>
        <p className="mt-5 max-w-[34ch] whitespace-pre-line text-center text-sm leading-7 text-black/64 sm:max-w-xl sm:text-[15px]">{copy.heroSubtitle}</p>
        <div className="mt-7 w-full max-w-3xl text-left">
          <Link href="/signup" className="inline-flex items-center gap-3 rounded-none bg-[#111111] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#2f2f2f]">
            {copy.join}
            <ArrowIcon />
          </Link>
        </div>
        <div className="hidden w-full md:block">
          <HeroVisual />
        </div>
        <div className="mt-8 flex w-full justify-center md:mt-10">
          <CategoryMenu products={products} copy={copy} />
        </div>
      </div>
    </section>
  );
}

function ProductSlideCard({ product, item, index, copy }: { product: CareProduct; item: ProductGalleryItem; index: number; copy: HomeCopy }) {
  return (
    <Link href={`/products/${product.id}`} style={{ animationDelay: `${index * 160}ms` }} className="group relative w-[172px] shrink-0 overflow-hidden transition duration-300 hover:-translate-y-1 sm:w-[188px]" aria-label={`${item.name} detail`}>
      <div className="relative aspect-[385/372] overflow-hidden bg-transparent">
        <Image src={item.image} alt={`${item.name} product image`} fill sizes="(max-width: 768px) 72vw, 28vw" className="object-contain object-center transition duration-500 group-hover:scale-[1.03]" />
        <span className="absolute inset-x-0 bottom-[31%] z-10 flex justify-center px-3">
          <span className="inline-flex items-center justify-center bg-[#111111] px-3 py-1.5 text-[10px] font-semibold text-white transition group-hover:bg-[#2f2f2f]">
            {copy.getStarted}
          </span>
        </span>
      </div>
    </Link>
  );
}

function ProductSlider({ product, copy }: { product: CareProduct; copy: HomeCopy }) {
  const trackMode = product.gallery.length > 2 ? "product-marquee-track-wide" : "product-marquee-track-compact mx-auto";

  return (
    <div className="mx-auto mt-28 w-full max-w-4xl lg:mt-36">
      <div className="mb-5 text-center">
        <p className="versed-label text-black/44">{copy.treatmentOptions}</p>
        <p className="mt-2 text-sm leading-6 text-black/58">{copy.productHint(product.navLabel)}</p>
      </div>
      <div className="product-marquee -mx-5 overflow-hidden bg-transparent px-5 pb-6 sm:-mx-8 sm:px-8" aria-label={copy.treatmentOptions}>
        <div className={`product-marquee-track ${trackMode} flex w-max gap-4 bg-transparent`}>
        {product.gallery.map((item, index) => (
          <ProductSlideCard key={item.name} product={product} item={item} index={index} copy={copy} />
        ))}
        </div>
      </div>
    </div>
  );
}

function CareSection({ product, copy }: { product: CareProduct; copy: HomeCopy }) {
  return (
    <section id={product.id} className="relative mx-3 min-h-[100dvh] scroll-mt-20 overflow-hidden rounded-[4px] bg-[#fbfdf9] sm:mx-6 lg:min-h-[100dvh]">
      <Image src={product.image} alt={`${product.title} care visual`} fill sizes="100vw" className={`object-cover ${product.imagePosition}`} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,253,249,0.78),rgba(251,253,249,0.18)_34%,rgba(251,253,249,0.82)_72%,rgba(251,253,249,0.96))]" />
      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1440px] flex-col items-center px-5 pb-10 pt-[10dvh] text-center sm:px-8 lg:min-h-[100dvh] lg:pb-12 lg:pt-[12dvh]">
        {product.id !== "weight" && product.id !== "hair" && product.id !== "menopause" && product.id !== "skincare" && <p className="versed-label text-black/46">{product.title}</p>}
        <h2 className={`${product.id === "weight" ? "mt-0" : "mt-5"} max-w-2xl text-[20px] font-medium leading-[1.14] tracking-normal text-[#111111] text-balance`}>
          {product.kicker}
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-7 text-black/66 sm:text-[15px]">{product.tagline}</p>
        <div className="mt-8 flex justify-center">
          <Link href={`/products/${product.id}`} className="inline-flex items-center gap-3 rounded-none bg-[#111111] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#2f2f2f]">
            {copy.getStarted}
            <ArrowIcon />
          </Link>
        </div>
        <ProductSlider product={product} copy={copy} />
      </div>
    </section>
  );
}

function MembershipPanel({ copy }: { copy: HomeCopy }) {
  return (
    <div className="rounded-[4px] border border-black/10 bg-white p-5 sm:p-7">
      <div className="grid grid-cols-3 gap-3">
        {[
          { src: "/images/medipic/redesign/menopause.png", alt: "Doctor visual", pos: "object-[50%_24%]" },
          { src: "/images/medipic/redesign/weightloss.png", alt: "Weight care visual", pos: "object-[52%_42%]" },
          { src: "/images/medipic/sample/products/women-equelle.png", alt: "Care product visual", pos: "object-center" },
        ].map((item) => (
          <div key={item.src} className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-[#f6fbf7]">
            <Image src={item.src} alt={item.alt} fill sizes="220px" className={`object-cover ${item.pos}`} />
          </div>
        ))}
      </div>
      <div className="mt-7 text-center">
        <h3 className="text-2xl font-medium leading-[1.05] tracking-[-0.02em] text-[#111111] text-balance sm:text-3xl">{copy.membershipTitle}</h3>
        <p className="mt-3 whitespace-pre-line text-sm leading-6 text-black/58">{copy.membershipSubtitle}</p>
      </div>
      <div className="mt-6 divide-y divide-black/10">
        {copy.membershipBenefits.map((benefit) => (
          <div key={benefit} className="flex items-center justify-between py-3 text-sm text-black/72">
            <span>{benefit}</span>
            <span className="grid h-6 w-6 place-items-center rounded-full bg-[#dff0e5] text-[#111111]">
              <CheckIcon />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FooterAccordion({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <details className="group border-b border-[#111111] py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-semibold text-[#111111] [&::-webkit-details-marker]:hidden">
        <span>{title}</span>
        <span className="transition group-open:rotate-45">
          <PlusIcon />
        </span>
      </summary>
      <div className="grid gap-3 pb-2 pt-4 text-sm font-medium text-black/58">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="w-fit hover:text-[#111111]">
            {link.label}
          </Link>
        ))}
      </div>
    </details>
  );
}

function FooterBlock({ copy, products, locale }: { copy: HomeCopy; products: CareProduct[]; locale: Locale }) {
  const legal = complianceCopy[locale] ?? complianceCopy.en;
  const accordions = [
    {
      title: copy.footerAbout,
      links: [
        { label: copy.footerIntro, href: "/" },
        { label: copy.join, href: "/signup" },
      ],
    },
    {
      title: copy.footerCore,
      links: products.map((product) => ({ label: product.navLabel, href: `#${product.id}` })),
    },
    {
      title: copy.footerHelp,
      links: [
        { label: copy.footerSupport, href: "/intake" },
        { label: copy.footerPrivacy, href: "/signup" },
        { label: copy.footerContact, href: "/intake/weight/complete" },
      ],
    },
  ];

  return (
    <footer id="footer" className="mt-10 max-w-xl scroll-mt-8 border-t border-[#111111] pt-10 text-left">
      <Link href="/" className="text-3xl font-semibold tracking-[-0.05em] text-[#111111]" aria-label="Medipic home">
        medipic
      </Link>
      <p className="mt-9 border-b border-[#111111] pb-3 text-sm font-medium leading-6 text-black/68">
        Care. Made for woman by woman’s doctor
      </p>
      <div className="mt-5 flex items-center gap-4">
        {socialLinks.map((social) => (
          <a key={social.name} href={social.href} target="_blank" rel="noreferrer" aria-label={social.name} className={`${social.name === "LINE" ? "text-[#06C755]" : "text-[#111111]"} hover:opacity-62`}>
            <SocialIcon name={social.name} />
          </a>
        ))}
      </div>
      <div className="mt-14 border-t border-[#111111]">
        {accordions.map((item) => (
          <FooterAccordion key={item.title} title={item.title} links={item.links} />
        ))}
      </div>
      <section className="mt-10 border-t border-black/18 pt-5">
        <h3 className="versed-label text-black/52">{legal.title}</h3>
        <ul className="mt-4 grid gap-2 text-xs leading-5 text-black/56">
          {legal.items.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </section>
    </footer>
  );
}

function JoinSection({ copy, products, locale }: { copy: HomeCopy; products: CareProduct[]; locale: Locale }) {
  return (
    <section className="relative min-h-[100dvh] bg-[#fbfdf9]">
      <div className="mx-auto grid min-h-[100dvh] max-w-[1440px] items-center gap-8 px-5 py-24 sm:px-8 lg:grid-cols-[0.5fr_0.5fr]">
        <MembershipPanel copy={copy} />
        <div className="text-center lg:text-left">
          <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link href="/signup" className="inline-flex items-center gap-3 rounded-none bg-[#111111] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#2f2f2f]">
              {copy.join}
              <ArrowIcon />
            </Link>
          </div>
          <FooterBlock copy={copy} products={products} locale={locale} />
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [locale, setLocale] = useLocale();
  const t = uiCopy[locale] ?? uiCopy.en;
  const localizedProducts = localizeCareProducts(careProducts, locale);

  return (
    <main className="bg-[#fbfdf9] text-[#111111]">
      <TopNav locale={locale} setLocale={setLocale} copy={t} products={localizedProducts} />
      <HeroSection products={localizedProducts} copy={t} />
      <div className="space-y-8 bg-[#fbfdf9] py-8 sm:space-y-12 sm:py-12">
        {localizedProducts.map((product) => (
          <CareSection key={product.id} product={product} copy={t} />
        ))}
      </div>
      <JoinSection copy={t} products={localizedProducts} locale={locale} />
    </main>
  );
}
