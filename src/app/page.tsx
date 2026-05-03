 "use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { careProducts, type CareProduct } from "@/data/careProducts";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLocale } from "@/hooks/useLocale";
import type { Locale } from "@/i18n";

const pageCopy: Record<
  Locale,
  {
    navCta: string;
    heroEyebrow: string;
    heroTitle: string;
    heroBody: string;
    heroPrimary: string;
    heroSecondary: string;
    railEyebrow: string;
    railTitle: string;
    railBody: string;
    gridEyebrow: string;
    gridTitle: string;
    viewProduct: string;
    footer: string;
  }
> = {
  ko: {
    navCta: "상담 시작",
    heroEyebrow: "Medipic online care",
    heroTitle: "집에서 시작하는 조용한 의료 상담 경험",
    heroBody:
      "Medipic은 4가지 카테고리의 문진 흐름을 중심으로 구성됩니다. 제품명, 가격, 의료효과, 후기, 의사 정보는 확정 자료 없이 새로 작성하지 않았습니다.",
    heroPrimary: "상담 시작",
    heroSecondary: "카테고리 보기",
    railEyebrow: "Care categories",
    railTitle: "4가지 Medipic 상담 카테고리",
    railBody: "카드는 제품 상세 페이지로 이동하고, 상세 페이지에서 문진으로 이어집니다.",
    gridEyebrow: "Medipic care grid",
    gridTitle: "사람 중심 배경 위에 제품을 더 명확하게 보여주는 구조",
    viewProduct: "제품 보기",
    footer:
      "제품 이미지는 제공된 참고자료 기반의 시각 슬롯입니다. 실제 제품명, 가격, 의료효과, 후기, 의사 정보는 확정 자료 없이 새로 작성하지 않았습니다.",
  },
  en: {
    navCta: "Start consult",
    heroEyebrow: "Medipic online care",
    heroTitle: "A calm online care experience that starts at home",
    heroBody:
      "Medipic is organized around four intake categories. Product names, prices, medical effects, reviews, and doctor information are not invented without approved source content.",
    heroPrimary: "Start consult",
    heroSecondary: "View categories",
    railEyebrow: "Care categories",
    railTitle: "Four Medipic care categories",
    railBody: "Each card opens a product detail page, then continues into the matching intake flow.",
    gridEyebrow: "Medipic care grid",
    gridTitle: "A clearer product showcase over people-centered backgrounds",
    viewProduct: "View product",
    footer:
      "Product images are visual slots based on provided references. Product names, prices, medical effects, reviews, and doctor information are not invented without approved content.",
  },
  ja: {
    navCta: "相談を始める",
    heroEyebrow: "Medipic online care",
    heroTitle: "自宅から始める、静かなオンライン相談体験",
    heroBody:
      "Medipicは4つの相談カテゴリを中心に構成しています。商品名、価格、医療効果、口コミ、医師情報は、承認済みの原稿なしに新しく作成していません。",
    heroPrimary: "相談を始める",
    heroSecondary: "カテゴリを見る",
    railEyebrow: "Care categories",
    railTitle: "4つのMedipic相談カテゴリ",
    railBody: "各カードから詳細ページへ進み、そこから該当する問診へ移動できます。",
    gridEyebrow: "Medipic care grid",
    gridTitle: "人を中心にした背景の上で、商品をより見やすく見せる構成",
    viewProduct: "詳細を見る",
    footer:
      "商品画像は提供資料をもとにしたビジュアル枠です。商品名、価格、医療効果、口コミ、医師情報は、承認済み資料なしに新規作成していません。",
  },
};

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-5-5 5 5-5 5" />
    </svg>
  );
}

function Logo() {
  return (
    <Image
      src="/images/medipic/logo-main.png"
      alt="medipic"
      width={335}
      height={105}
      priority
      className="h-auto w-[126px] mix-blend-multiply sm:w-[150px]"
    />
  );
}

function ProductObject({ product, large = false }: { product: CareProduct; large?: boolean }) {
  return (
    <div
      className={`relative ${large ? "h-[330px] w-[270px] sm:h-[430px] sm:w-[340px]" : "h-28 w-28"} transition duration-500 group-hover:scale-[1.04]`}
      aria-hidden="true"
    >
      {product.productImages.map((image, index) => (
        <div
          key={image}
          className={`absolute animate-productFloat overflow-hidden rounded-xl bg-white/72 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur ${
            large
              ? index === 0
                ? "inset-x-8 top-2 h-[245px] rotate-[-9deg] sm:h-[330px]"
                : index === 1
                  ? "bottom-6 right-2 h-36 w-36 rotate-[12deg] sm:h-44 sm:w-44"
                  : "bottom-4 left-4 h-28 w-28 rotate-[-4deg] sm:h-36 sm:w-36"
              : index === 0
                ? "inset-0"
                : index === 1
                  ? "bottom-0 right-0 h-16 w-16 translate-x-3 translate-y-2"
                  : "bottom-0 left-0 h-14 w-14 -translate-x-2 translate-y-1 rotate-[-6deg]"
          }`}
          style={{ "--float-rotate": index === 0 ? "-9deg" : index === 1 ? "12deg" : "-4deg" } as CSSProperties}
        >
          <Image
            src={image}
            alt=""
            fill
            sizes={large ? "340px" : "120px"}
            className={`object-cover ${product.productFocus}`}
          />
          <div className="absolute inset-0 bg-white/10" />
        </div>
      ))}
    </div>
  );
}
function HeroShowcase({ copy }: { copy: (typeof pageCopy)[Locale] }) {
  const featured = careProducts[0];

  return (
    <section className="mx-auto max-w-[1500px] px-5 pt-5 sm:px-8">
      <div className="relative min-h-[760px] overflow-hidden rounded-lg bg-[#26331f] text-white shadow-[0_34px_100px_rgba(20,28,17,0.24)]">
        <Image
          src={featured.personImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className={`object-cover ${featured.position} opacity-48`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_67%_10%,rgba(215,244,106,0.55),transparent_24%),linear-gradient(115deg,rgba(7,15,7,0.92),rgba(38,51,31,0.45)_48%,rgba(255,255,255,0.08))]" />
        <div className="absolute -right-24 top-14 h-72 w-72 rounded-full bg-[#d7f46a]/30 blur-3xl" />

        <div className="relative z-10 grid min-h-[760px] items-center gap-8 px-6 py-10 lg:grid-cols-[0.44fr_0.56fr] lg:px-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/62">{copy.heroEyebrow}</p>
            <h1 className="mt-4 max-w-xl text-5xl font-semibold leading-[0.92] tracking-normal sm:text-7xl">
              {copy.heroTitle}
            </h1>
            <p className="mt-6 max-w-md text-sm leading-6 text-white/76">
              {copy.heroBody}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/intake"
                className="inline-flex items-center gap-2 rounded-full bg-[#d7f46a] px-5 py-3 text-sm font-bold text-[#17210f] hover:bg-[#e5ff78]"
              >
                {copy.heroPrimary}
                <ArrowIcon />
              </Link>
              <a
                href="#care-grid"
                className="inline-flex items-center gap-2 rounded-full border border-white/24 bg-white/12 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/18"
              >
                {copy.heroSecondary}
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <Link
              href={`/products/${featured.id}`}
              className="group relative grid min-h-[470px] w-full max-w-[560px] place-items-center overflow-hidden rounded-lg border border-white/12 bg-white/10 p-6 backdrop-blur-md"
            >
              <div className="absolute inset-x-10 top-8 h-36 rotate-[-12deg] bg-[#d7f46a]/60 blur-2xl" />
              <ProductObject product={featured} large />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.18em] text-white/62">FEATURED CATEGORY</p>
                  <p className="mt-1 text-3xl font-semibold">{featured.title}</p>
                </div>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#d7f46a] text-[#17210f]">
                  <ArrowIcon />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductRail({ copy }: { copy: (typeof pageCopy)[Locale] }) {
  return (
    <section className="mx-auto max-w-[1500px] px-5 py-5 sm:px-8">
      <div className="rounded-lg bg-[#26331f] px-4 py-5 text-white sm:px-6">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{copy.railEyebrow}</p>
            <h2 className="mt-1 text-2xl font-semibold">{copy.railTitle}</h2>
          </div>
          <p className="hidden max-w-sm text-xs leading-5 text-white/58 sm:block">
            {copy.railBody}
          </p>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {careProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group min-w-[230px] overflow-hidden rounded-lg bg-white/14 p-3 backdrop-blur transition hover:-translate-y-1 hover:bg-white/20"
            >
              <div className="relative h-44 overflow-hidden rounded-md bg-white/18">
                <Image
                  src={product.personImage}
                  alt=""
                  fill
                  sizes="230px"
                  className={`object-cover ${product.position} opacity-52`}
                />
                <div className="absolute inset-0 bg-black/22" />
                <div className="absolute inset-0 grid place-items-center">
                  <ProductObject product={product} />
                </div>
              </div>
              <div className="mt-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-white/54">{product.number}</p>
                  <p className="mt-1 text-lg font-semibold">{product.title}</p>
                </div>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#d7f46a] text-[#17210f]">
                  <ArrowIcon />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ product, viewProduct }: { product: CareProduct; viewProduct: string }) {
  return (
    <article
      id={product.id}
      className={`group relative min-h-[680px] overflow-hidden rounded-lg ${product.tone} shadow-[0_24px_80px_rgba(28,32,26,0.14)]`}
    >
      <Image
        src={product.personImage}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className={`object-cover ${product.position} transition duration-700 group-hover:scale-[1.025]`}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/58" />
      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 sm:p-6">
        <div className="rounded-full bg-white/78 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-[#171717] backdrop-blur">
          {product.number}
        </div>
        <div className="text-right text-[11px] font-semibold tracking-[0.22em] text-white drop-shadow">
          MEDIPIC CARE
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <div className="mb-5 max-w-[26rem]">
          <p className="text-sm font-semibold tracking-[0.22em] text-white/88 drop-shadow">
            {product.jpLabel}
          </p>
          <h2 className="mt-2 text-4xl font-semibold leading-none text-white drop-shadow sm:text-5xl">
            {product.title}
          </h2>
          <p className="mt-4 max-w-[24rem] text-sm leading-6 text-white/88 drop-shadow">
            {product.shortBody}
          </p>
        </div>
        <div className="flex items-end justify-between gap-4">
          <Link href={`/products/${product.id}`} className="group/product">
            <ProductObject product={product} />
          </Link>
          <Link
            href={`/products/${product.id}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/45 bg-white/22 px-4 py-2 text-xs font-semibold text-white backdrop-blur hover:bg-white/30"
          >
            {viewProduct}
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function HomePage() {
  const [locale, setLocale] = useLocale();
  const copy = pageCopy[locale] ?? pageCopy.en;

  return (
    <main className="min-h-screen bg-[#f6f3ed] text-[#171717]">
      <header className="sticky top-0 z-40 border-b border-black/5 bg-[#f6f3ed]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" aria-label="Medipic home">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Care categories">
            {careProducts.map((product) => (
              <a
                key={product.id}
                href={`#${product.id}`}
                className="text-xs font-semibold uppercase tracking-[0.16em] text-black/48 hover:text-black"
              >
                {product.title}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitcher locale={locale} onChange={setLocale} variant="light" />
            <Link
              href="/intake"
              className="hidden items-center gap-2 rounded-full bg-[#171717] px-4 py-2 text-xs font-semibold text-white hover:bg-black sm:inline-flex sm:px-5 sm:py-2.5"
            >
              {copy.navCta}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </header>

      <HeroShowcase copy={copy} />
      <ProductRail copy={copy} />

      <section id="care-grid" className="mx-auto max-w-[1500px] px-5 pb-8 sm:px-8">
        <div className="mb-5 max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.2em] text-black/48">{copy.gridEyebrow}</p>
          <h2 className="mt-2 text-4xl font-semibold leading-tight tracking-normal sm:text-6xl">
            {copy.gridTitle}
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {careProducts.map((product) => (
            <CategoryCard key={product.id} product={product} viewProduct={copy.viewProduct} />
          ))}
        </div>
      </section>

      <footer className="mx-auto max-w-[1500px] px-5 pb-10 sm:px-8">
        <div className="border-t border-black/10 pt-6 text-xs leading-5 text-black/54">
          {copy.footer}
        </div>
      </footer>
    </main>
  );
}
