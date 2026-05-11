"use client";

import Image from "next/image";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useLocale } from "@/hooks/useLocale";
import type { Locale } from "@/i18n";

const loginCopy: Record<Locale, {
  join: string;
  visualEyebrow: string;
  visualTitle: string;
  visualBody: string;
  formEyebrow: string;
  formTitle: string;
  formBody: string;
  intake: string;
  doctor: string;
  create: string;
}> = {
  en: {
    join: "Join",
    visualEyebrow: "Member access",
    visualTitle: "Continue your care online",
    visualBody: "Medipic account login is prepared as a front door for care history, refills, and follow-up support.",
    formEyebrow: "Login",
    formTitle: "Sign in to medipic",
    formBody: "Patient account authentication is not connected yet. Start with intake or use the doctor portal if you are clinic staff.",
    intake: "Start intake",
    doctor: "Doctor portal login",
    create: "Create access",
  },
  ja: {
    join: "登録",
    visualEyebrow: "Member access",
    visualTitle: "オンラインでケアを続ける",
    visualBody: "ケア履歴、再相談、フォローアップの入口として準備しているログイン画面です。",
    formEyebrow: "Login",
    formTitle: "medipicにログイン",
    formBody: "患者アカウント認証はまだ接続していません。まずは問診、または医師ポータルをご利用ください。",
    intake: "問診を始める",
    doctor: "医師ポータル",
    create: "登録する",
  },
  ko: {
    join: "가입",
    visualEyebrow: "Member access",
    visualTitle: "온라인으로 케어를 이어가기",
    visualBody: "케어 이력, 리필, 사후관리 지원으로 이어지는 계정 로그인 입구입니다.",
    formEyebrow: "Login",
    formTitle: "medipic 로그인",
    formBody: "환자 계정 인증은 아직 연결 전입니다. 먼저 문진을 시작하거나 의료진은 의사 포털을 사용하세요.",
    intake: "문진 시작",
    doctor: "의사 포털 로그인",
    create: "가입하기",
  },
};

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-5-5 5 5-5 5" />
    </svg>
  );
}

export default function LoginPage() {
  const [locale, setLocale] = useLocale();
  const copy = loginCopy[locale] ?? loginCopy.en;

  return (
    <main className="min-h-[100dvh] bg-[#fbfdf9] text-[#111111]">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="text-3xl font-semibold tracking-[-0.05em] text-[#111111]" aria-label="Medipic home">
            medipic.
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/signup" className="rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-semibold text-black/70 backdrop-blur hover:bg-[#dff0e5]">
              {copy.join}
            </Link>
            <LanguageSwitcher locale={locale} onChange={setLocale} variant="light" />
          </div>
        </div>
      </header>

      <section className="mx-auto grid min-h-[100dvh] max-w-[1500px] items-center gap-8 px-5 pb-14 pt-28 sm:px-8 lg:grid-cols-[0.52fr_0.48fr]">
        <div className="relative order-2 min-h-[520px] overflow-hidden rounded-[4px] bg-[#dff0e5] lg:order-1">
          <Image src="/images/medipic/redesign/menopause.png" alt="Medipic care consultation" fill priority sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover object-[50%_30%]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(223,240,229,0.02),rgba(223,240,229,0.78))]" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <p className="versed-label text-black/52">{copy.visualEyebrow}</p>
            <h1 className="mt-4 max-w-xl text-3xl font-medium leading-[1.02] tracking-[-0.03em] text-[#111111] text-balance sm:text-4xl">
              {copy.visualTitle}
            </h1>
            <p className="mt-5 max-w-md text-sm leading-6 text-black/64">{copy.visualBody}</p>
          </div>
        </div>

        <div className="order-1 rounded-[4px] border border-black/10 bg-white p-5 sm:p-8 lg:order-2">
          <p className="versed-label text-black/42">{copy.formEyebrow}</p>
          <h2 className="mt-4 text-3xl font-medium leading-[1.04] tracking-[-0.03em] text-[#111111]">{copy.formTitle}</h2>
          <p className="mt-3 text-sm leading-6 text-black/58">{copy.formBody}</p>

          <div className="mt-8 space-y-4">
            <Link href="/intake" className="flex items-center justify-between rounded-full bg-[#111111] px-5 py-3.5 text-sm font-semibold text-white hover:bg-[#2f2f2f]">
              {copy.intake}
              <ArrowIcon />
            </Link>
            <Link href="/doctor/login" className="flex items-center justify-between rounded-full border border-black/15 bg-white px-5 py-3.5 text-sm font-semibold text-black/72 hover:bg-[#dff0e5]">
              {copy.doctor}
              <ArrowIcon />
            </Link>
            <Link href="/signup" className="flex items-center justify-between rounded-full border border-black/15 bg-white px-5 py-3.5 text-sm font-semibold text-black/72 hover:bg-[#dff0e5]">
              {copy.create}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
