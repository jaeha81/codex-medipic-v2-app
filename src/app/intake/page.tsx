"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/hooks/useLocale";
import { en } from "@/i18n/en";
import { ja } from "@/i18n/ja";
import { ko } from "@/i18n/ko";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { CATEGORIES } from "@/data/categories";
import { careProducts } from "@/data/careProducts";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-5-5 5 5-5 5" />
    </svg>
  );
}

export default function IntakePage() {
  const [locale, setLocale] = useLocale();
  const t = locale === "ja" ? ja : locale === "ko" ? ko : en;

  return (
    <div className="min-h-[100dvh] bg-[#fbfdf9] text-[#111111]">
      <header className="border-b border-black/8 bg-[#fbfdf9]/92 px-5 py-4 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            medipic.
          </Link>
          <LanguageSwitcher locale={locale} onChange={setLocale} variant="light" />
        </div>
      </header>

      <main className="mx-auto grid max-w-[1180px] gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.36fr_0.64fr] lg:py-14">
        <section className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/42">medipic intake</p>
          <h1 className="mt-5 text-3xl font-medium leading-[1.04] tracking-normal sm:text-4xl">
            {locale === "en" ? "Choose your care path" : t.intake.chooseCategory}
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-6 text-black/58">
            {locale === "en"
              ? "Select the area you want to start with. Each path continues into a focused medical intake."
              : t.intake.chooseCategorySubtitle}
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          {CATEGORIES.map((cat) => {
            const product = careProducts.find((item) => item.id === cat.id);
            const label = locale === "ja" ? cat.labelJa : locale === "ko" ? cat.labelKo : cat.labelEn;
            const subtitle = locale === "ja" ? cat.subtitleJa : locale === "ko" ? cat.subtitleKo : cat.subtitleEn;

            if (!product) return null;

            return (
              <Link
                key={cat.id}
                href={`/intake/${cat.id}`}
                className="group relative block min-h-[430px] overflow-hidden rounded-[6px] bg-white shadow-[0_18px_70px_rgba(17,17,17,0.10)]"
              >
                <Image
                  src={product.image}
                  alt={label}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`object-cover ${product.imagePosition} transition duration-700 group-hover:scale-[1.035]`}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/12 via-white/4 to-black/50" />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">{product.number}</span>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/82 text-black backdrop-blur transition group-hover:bg-black group-hover:text-white">
                    <ArrowIcon />
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-sm text-white/76">{subtitle}</p>
                  <h2 className="mt-1 text-3xl font-medium tracking-normal">{label}</h2>
                  <p className="mt-3 max-w-xs text-sm leading-5 text-white/78">{product.kicker}</p>
                </div>
              </Link>
            );
          })}
        </section>
      </main>
    </div>
  );
}
