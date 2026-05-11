"use client";

import Image from "next/image";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { localizeCareProduct } from "@/data/careProductCopy";
import type { CareProduct, ProductGalleryItem } from "@/data/careProducts";
import { useLocale } from "@/hooks/useLocale";
import { useSignupProfileStatus } from "@/hooks/useSignupProfile";
import type { Locale } from "@/i18n";

type ProductDetailCopy = {
  home: string;
  startIntake: string;
  connectLine: string;
  availableImages: string;
  uncropped: string;
  option: string;
  productView: string;
  productViewTitle: string;
  productViewBody: string;
  features: string[];
  requestOption: string;
  purchasePath: string;
  purchaseTitle: string;
  purchaseBody: string;
  askLine: string;
  stepLabel: string;
  steps: { title: string; body: string }[];
};

const detailCopy: Record<Locale, ProductDetailCopy> = {
  en: {
    home: "Home",
    startIntake: "Start intake",
    connectLine: "Connect on LINE",
    availableImages: "Available product images",
    uncropped: "Images are shown uncropped for product review.",
    option: "Option",
    productView: "Product view",
    productViewTitle: "Products and care functions shown before intake",
    productViewBody:
      "Review available product images and the care role before starting intake. Medical claims stay conservative, and the next action remains clear.",
    features: ["Doctor review", "Online intake", "Follow-up support"],
    requestOption: "Request this option",
    purchasePath: "Purchase path",
    purchaseTitle: "A review-first flow before payment or delivery",
    purchaseBody:
      "Start with intake for the selected category. LINE guidance, payment, and delivery are shown only after clinical review confirms the appropriate next step.",
    askLine: "Ask on LINE",
    stepLabel: "Step",
    steps: [
      { title: "Choose a product", body: "Review the product image and select the option you want to discuss." },
      { title: "Complete intake", body: "Answer the medical questions so the clinic can check suitability." },
      { title: "Doctor review", body: "A clinician reviews the request before any treatment or delivery guidance." },
      { title: "Reviewed payment", body: "Payment and delivery guidance open only after the care team confirms the next step." },
    ],
  },
  ja: {
    home: "ホーム",
    startIntake: "問診を始める",
    connectLine: "LINEで相談",
    availableImages: "商品画像",
    uncropped: "商品確認のため、画像は切り抜かずに表示します。",
    option: "Option",
    productView: "商品確認",
    productViewTitle: "問診前に商品とケアの流れを確認",
    productViewBody:
      "商品画像とケア上の役割を確認してから問診へ進みます。医療表現は控えめにし、次の行動を分かりやすくしています。",
    features: ["医師確認", "オンライン問診", "フォローアップ"],
    requestOption: "この商品で相談",
    purchasePath: "購入までの流れ",
    purchaseTitle: "処方周辺ケアに合わせた分かりやすい購入導線",
    purchaseBody:
      "商品を見た後に迷わないよう、選択したカテゴリの問診へつなぎ、医療チーム確認後にLINE案内または決済へ進みます。",
    askLine: "LINEで質問",
    stepLabel: "Step",
    steps: [
      { title: "商品を選ぶ", body: "画像と説明を確認し、相談したい商品を選びます。" },
      { title: "問診を記入", body: "健康状態や症状を入力し、確認に必要な情報を送ります。" },
      { title: "医師確認", body: "処方や配送案内の前に医療チームが内容を確認します。" },
      { title: "承認後に決済", body: "確認後、必要な場合のみ決済と配送案内へ進みます。" },
    ],
  },
  ko: {
    home: "홈",
    startIntake: "문진 시작",
    connectLine: "LINE 상담",
    availableImages: "상품 이미지",
    uncropped: "상품 확인을 위해 이미지는 잘리지 않게 표시합니다.",
    option: "옵션",
    productView: "상품 확인",
    productViewTitle: "문진 전에 상품과 케어 흐름을 확인",
    productViewBody:
      "상품 이미지와 케어 역할을 먼저 확인한 뒤 문진으로 이동합니다. 의료 표현은 과장하지 않고 다음 행동이 명확하게 보이도록 구성했습니다.",
    features: ["의사 검토", "온라인 문진", "사후관리 지원"],
    requestOption: "이 상품으로 상담",
    purchasePath: "구매 진행 흐름",
    purchaseTitle: "처방 인접 케어에 맞춘 명확한 구매 흐름",
    purchaseBody:
      "고객이 상품을 본 뒤 멈추지 않도록 선택한 카테고리 문진으로 연결하고, 의료진 검토 후 LINE 안내 또는 결제로 이어지게 했습니다.",
    askLine: "LINE 문의",
    stepLabel: "단계",
    steps: [
      { title: "상품 선택", body: "상품 이미지와 설명을 확인하고 상담할 옵션을 선택합니다." },
      { title: "문진 작성", body: "건강 상태와 증상을 입력해 적합성 검토에 필요한 정보를 전달합니다." },
      { title: "의료진 검토", body: "처방 또는 배송 안내 전 의료진이 요청 내용을 확인합니다." },
      { title: "승인 후 결제", body: "케어 가능 여부 확인 후 필요한 경우 결제와 배송 안내로 진행합니다." },
    ],
  },
};

const productLockCopy: Record<Locale, {
  eyebrow: string;
  title: string;
  body: string;
  join: string;
  line: string;
  home: string;
}> = {
  en: {
    eyebrow: "Member access",
    title: "Sign up to view product details.",
    body: "You can browse care categories first. Product detail, selected-option requests, and review guidance open after creating your Medipic access.",
    join: "Join to view details",
    line: "LINE after sign up",
    home: "Back to products",
  },
  ja: {
    eyebrow: "Member access",
    title: "詳細を見るには登録が必要です。",
    body: "ケアカテゴリは確認できます。商品詳細、選択商品の相談、確認案内はMedipic登録後に進めます。",
    join: "登録して詳細を見る",
    line: "登録後にLINEへ",
    home: "商品一覧へ戻る",
  },
  ko: {
    eyebrow: "회원 전용",
    title: "제품 상세는 회원가입 후 볼 수 있습니다.",
    body: "비로그인 상태에서는 케어 카테고리와 제품 목록까지만 확인할 수 있습니다. 상세 정보, 선택 상품 상담, 검토 안내는 가입 후 진행됩니다.",
    join: "가입하고 상세 보기",
    line: "가입 후 LINE 연결",
    home: "제품 목록으로",
  },
};

const productLegalCopy: Record<Locale, { title: string; items: string[] }> = {
  en: {
    title: "Medical notice",
    items: [
      "This page is product information and intake guidance. It is not a diagnosis, prescription, or guarantee that treatment will be provided.",
      "A licensed physician decides treatment eligibility after reviewing your answers. In-person care may be recommended when online care is not suitable.",
      "Effects, side effects, risks, costs, and alternatives must be confirmed before treatment proceeds.",
    ],
  },
  ja: {
    title: "医療に関する注意",
    items: [
      "このページは商品情報と問診案内であり、診断・処方・治療提供の保証ではありません。",
      "治療可否は問診内容を医師が確認したうえで判断します。オンライン対応が適切でない場合は対面診療をご案内することがあります。",
      "効果、副作用、リスク、費用、代替手段は治療前に確認が必要です。",
    ],
  },
  ko: {
    title: "의료 안내",
    items: [
      "이 페이지는 상품 정보와 문진 안내이며, 진단·처방·치료 제공을 보장하지 않습니다.",
      "치료 가능 여부는 의사가 문진 내용을 검토한 뒤 결정합니다. 온라인 상담이 적합하지 않으면 대면 진료를 안내할 수 있습니다.",
      "효과, 부작용, 위험, 비용, 대체 방법은 치료 전 확인되어야 합니다.",
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

function CheckMark() {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
    </svg>
  );
}

function productIntakeHref(product: CareProduct, item?: ProductGalleryItem) {
  if (!item) return product.href;
  return `${product.href}?product=${encodeURIComponent(item.name)}`;
}

function ProductImageCard({ item, index, copy }: { item: ProductGalleryItem; index: number; copy: ProductDetailCopy }) {
  return (
    <article className="relative w-[280px] shrink-0 overflow-hidden rounded-[4px] border border-black/10 bg-white p-4 sm:w-[340px]">
      <div className="relative aspect-square overflow-hidden rounded-[3px] bg-[#f6fbf7]">
        <Image src={item.image} alt={`${item.name} product`} fill priority={index < 2} sizes="(max-width: 768px) 280px, 340px" className="object-contain object-center p-3" />
      </div>
      <div className="px-1 pb-1 pt-4">
        <p className="versed-label text-black/40">{copy.option} {String(index + 1).padStart(2, "0")}</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#111111]">{item.name}</h3>
        <p className="mt-2 text-sm leading-6 text-black/58">{item.caption}</p>
      </div>
    </article>
  );
}

function ProductCarousel({ product, copy }: { product: CareProduct; copy: ProductDetailCopy }) {
  if (product.gallery.length === 1) {
    return (
      <div className="rounded-[4px] border border-black/10 bg-[#dff0e5] px-5 py-5">
        <div className="mx-auto flex w-full max-w-[420px] justify-center">
          <ProductImageCard item={product.gallery[0]} index={0} copy={copy} />
        </div>
      </div>
    );
  }

  const carouselItems = [...product.gallery, ...product.gallery];

  return (
    <div className="relative overflow-hidden rounded-[4px] border border-black/10 bg-[#dff0e5] py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-[linear-gradient(90deg,#dff0e5,rgba(223,240,229,0))]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-[linear-gradient(270deg,#dff0e5,rgba(223,240,229,0))]" />
      <div className="flex w-max gap-4 px-5 animate-productCarousel hover:[animation-play-state:paused]">
        {carouselItems.map((item, index) => (
          <ProductImageCard key={`${item.name}-${index}`} item={item} index={index % product.gallery.length} copy={copy} />
        ))}
      </div>
    </div>
  );
}

function ProductDetailList({ product, copy }: { product: CareProduct; copy: ProductDetailCopy }) {
  return (
    <section className="mx-auto max-w-[1480px] px-5 py-14 sm:px-8 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-[0.36fr_0.64fr]">
        <div>
          <p className="versed-label text-black/42">{copy.productView}</p>
          <h2 className="mt-5 text-3xl font-medium leading-[1] tracking-[-0.035em] text-[#111111] text-balance sm:text-4xl">{copy.productViewTitle}</h2>
          <p className="mt-6 max-w-md text-sm leading-6 text-black/60">{copy.productViewBody}</p>
        </div>

        <div className="divide-y divide-black/10 rounded-[4px] border border-black/10 bg-white px-5 sm:px-7">
          {product.gallery.map((item) => (
            <article key={item.name} className="grid gap-5 py-6 sm:grid-cols-[120px_1fr] sm:items-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] bg-[#f6fbf7]">
                <Image src={item.image} alt={`${item.name} product thumbnail`} fill sizes="120px" className="object-contain object-center p-2" />
              </div>
              <div>
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-[#111111]">{item.name}</h3>
                <p className="mt-2 text-sm leading-6 text-black/60">{item.caption}</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  {copy.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 rounded-full border border-black/10 bg-[#f6fbf7] px-3 py-2 text-xs font-semibold text-black/62">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-[#dff0e5] text-[#111111]">
                        <CheckMark />
                      </span>
                      {feature}
                    </div>
                  ))}
                </div>
                <Link href={productIntakeHref(product, item)} className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#111111] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#2f2f2f]">
                  {copy.requestOption}
                  <ArrowIcon />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PurchasePath({ product, lineUrl, copy, locale }: { product: CareProduct; lineUrl: string; copy: ProductDetailCopy; locale: Locale }) {
  const legal = productLegalCopy[locale] ?? productLegalCopy.en;

  return (
    <section className="mx-auto max-w-[1480px] px-5 pb-16 sm:px-8 lg:pb-24">
      <div className="grid gap-8 rounded-[4px] bg-[#dff0e5] p-5 sm:p-7 lg:grid-cols-[0.44fr_0.56fr]">
        <div>
          <p className="versed-label text-black/42">{copy.purchasePath}</p>
          <h2 className="mt-5 max-w-lg text-3xl font-medium leading-[1] tracking-[-0.035em] text-[#111111] text-balance sm:text-4xl">{copy.purchaseTitle}</h2>
          <p className="mt-5 max-w-md text-sm leading-6 text-black/60">{copy.purchaseBody}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={product.href} className="inline-flex items-center gap-3 rounded-full bg-[#111111] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2f2f2f]">
              {copy.startIntake}
              <ArrowIcon />
            </Link>
            <a href={lineUrl} className="inline-flex items-center gap-3 rounded-full border border-black/15 bg-white/80 px-5 py-3 text-sm font-semibold text-black/72 hover:bg-white">
              {copy.askLine}
            </a>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {copy.steps.map((step, index) => (
            <div key={step.title} className="rounded-[4px] border border-black/10 bg-white p-4">
              <p className="versed-label text-black/36">{copy.stepLabel} {index + 1}</p>
              <h3 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-[#111111]">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-black/58">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 rounded-[4px] border border-black/10 bg-white/70 p-4">
        <p className="versed-label text-black/42">{legal.title}</p>
        <ul className="mt-3 grid gap-2 text-xs leading-5 text-black/58">
          {legal.items.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ProductDetailClient({ product: baseProduct, lineUrl }: { product: CareProduct; lineUrl: string }) {
  const [locale, setLocale] = useLocale();
  const copy = detailCopy[locale] ?? detailCopy.en;
  const lockCopy = productLockCopy[locale] ?? productLockCopy.en;
  const product = localizeCareProduct(baseProduct, locale);
  const isSignedUp = useSignupProfileStatus();

  if (!isSignedUp) {
    return (
      <main className="min-h-[100dvh] bg-[#dff0e5] text-[#111111]">
        <header className="absolute inset-x-0 top-0 z-20">
          <div className="mx-auto flex max-w-[1480px] items-center justify-between px-5 py-5 sm:px-8">
            <Link href="/" className="text-xl font-semibold tracking-[-0.03em] text-[#111111]">
              medipic.
            </Link>
            <LanguageSwitcher locale={locale} onChange={setLocale} variant="light" />
          </div>
        </header>
        <section className="mx-auto grid min-h-[100dvh] max-w-[1480px] items-center gap-8 px-5 pb-14 pt-28 sm:px-8 lg:grid-cols-[0.48fr_0.52fr]">
          <div className="max-w-xl">
            <p className="versed-label text-black/45">{lockCopy.eyebrow}</p>
            <h1 className="mt-5 text-4xl font-medium leading-[0.98] tracking-[-0.03em] text-[#111111] text-balance sm:text-5xl">{lockCopy.title}</h1>
            <p className="mt-6 text-sm leading-7 text-black/62">{lockCopy.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/signup?next=/products/${product.id}`} className="inline-flex items-center gap-3 rounded-full bg-[#111111] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#2f2f2f]">
                {lockCopy.join}
                <ArrowIcon />
              </Link>
              <Link href={`/signup?next=/products/${product.id}`} className="inline-flex items-center gap-3 rounded-full border border-black/15 bg-white/80 px-6 py-3.5 text-sm font-semibold text-black/72 hover:bg-white">
                {lockCopy.line}
              </Link>
              <Link href="/" className="inline-flex items-center gap-3 rounded-full border border-black/15 bg-white/40 px-6 py-3.5 text-sm font-semibold text-black/64 hover:bg-white">
                {lockCopy.home}
              </Link>
            </div>
          </div>
          <div className="relative min-h-[520px] overflow-hidden rounded-[4px] border border-black/10 bg-white/38">
            <Image src={product.image} alt={`${product.title} care visual`} fill priority sizes="(max-width: 1024px) 100vw, 52vw" className="object-contain object-center p-8 opacity-80 blur-[1px]" />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-[100dvh] bg-[#fbfdf9] text-[#111111]">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-[1480px] items-center justify-between px-5 py-5 sm:px-8">
          <Link href="/" className="text-xl font-semibold tracking-[-0.03em] text-[#111111]">
            medipic.
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="hidden versed-label text-black/54 hover:text-[#111111] sm:inline-flex">
              {copy.home}
            </Link>
            <Link href={product.href} className="hidden rounded-full bg-[#111111] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#2f2f2f] sm:inline-flex">
              {copy.startIntake}
            </Link>
            <LanguageSwitcher locale={locale} onChange={setLocale} variant="light" />
          </div>
        </div>
      </header>

      <section className="relative min-h-[100dvh] overflow-hidden bg-[#dff0e5]">
        <Image src={product.image} alt={`${product.title} care visual`} fill priority sizes="100vw" className="object-contain object-right-bottom p-6 opacity-95 sm:p-10 lg:p-14" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(223,240,229,1),rgba(223,240,229,0.92)_38%,rgba(223,240,229,0.45)_72%,rgba(223,240,229,0.16))]" />

        <div className="relative z-10 mx-auto grid min-h-[100dvh] max-w-[1480px] items-center gap-10 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[0.46fr_0.54fr]">
          <div className="max-w-2xl">
            <p className="versed-label text-black/45">{product.number} / {product.title}</p>
            <h1 className="mt-5 text-4xl font-medium leading-[0.98] tracking-[-0.03em] text-[#111111] text-balance sm:text-5xl lg:text-[3.1rem]">{product.kicker}</h1>
            <p className="mt-6 max-w-lg text-sm leading-7 text-black/64 sm:text-[15px]">{product.detailBody}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href={product.href} className="inline-flex items-center gap-3 rounded-full bg-[#111111] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#2f2f2f]">
                {copy.startIntake}
                <ArrowIcon />
              </Link>
              <a href={lineUrl} className="inline-flex items-center gap-3 rounded-full border border-black/15 bg-white/80 px-6 py-3.5 text-sm font-semibold text-black/72 backdrop-blur hover:bg-white">
                {copy.connectLine}
              </a>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {product.benefits.map((benefit) => (
                <div key={benefit} className="rounded-[4px] border border-black/10 bg-white/82 px-4 py-3 text-sm font-medium leading-5 text-black/66">
                  {benefit}
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <p className="versed-label text-black/42">{copy.availableImages}</p>
              <p className="text-xs font-medium text-black/52">{copy.uncropped}</p>
            </div>
            <ProductCarousel product={product} copy={copy} />
          </div>
        </div>
      </section>

      <ProductDetailList product={product} copy={copy} />
      <PurchasePath product={product} lineUrl={lineUrl} copy={copy} locale={locale} />
    </main>
  );
}
