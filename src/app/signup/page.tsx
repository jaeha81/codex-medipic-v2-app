"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { careProducts } from "@/data/careProducts";
import { localizeCareProducts } from "@/data/careProductCopy";
import { useLocale } from "@/hooks/useLocale";
import { notifySignupProfileChanged, SIGNUP_PROFILE_KEY } from "@/hooks/useSignupProfile";
import type { Locale } from "@/i18n";

const signupCopy: Record<Locale, {
  login: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  careLabel: string;
  careSteps: string[];
  panelTitle: string;
  panelBody: string;
  startNow: string;
  formTitle: string;
  formBody: string;
  fullName: string;
  email: string;
  phone: string;
  careInterest: string;
  consent: string;
  submit: string;
  saving: string;
  required: string;
}> = {
  en: {
    login: "Login",
    eyebrow: "Join medipic",
    title: "Your care journey, all in one place",
    subtitle: "Choose a care category, complete a private intake, and continue with doctor-guided online support.",
    careLabel: "medipic care",
    careSteps: ["Online intake", "Doctor review", "LINE follow-up"],
    panelTitle: "Get complete care in one membership",
    panelBody: "Consultation, LINE follow-up, doctor review guidance, and ongoing care are arranged in one Medipic flow.",
    startNow: "Start now",
    formTitle: "Create your care access",
    formBody: "Save basic contact details first, then continue to the private medical intake.",
    fullName: "Full name",
    email: "Email",
    phone: "Mobile number",
    careInterest: "Care interest",
    consent: "I agree to be contacted about my Medipic intake and care guidance.",
    submit: "Continue to intake",
    saving: "Saving...",
    required: "Please complete the required fields.",
  },
  ja: {
    login: "ログイン",
    eyebrow: "medipicを始める",
    title: "相談からフォローまで、ひとつの場所で",
    subtitle: "ケアカテゴリを選び、プライベートな問診を記入し、医師の案内に沿ってオンラインで続けられます。",
    careLabel: "medipic care",
    careSteps: ["オンライン問診", "医師確認", "LINEフォロー"],
    panelTitle: "ケアをひとつの流れで",
    panelBody: "問診、LINE案内、処方サポート、継続ケアをMedipicの流れで案内します。",
    startNow: "始める",
    formTitle: "ケア用アカウントを作成",
    formBody: "基本連絡先を保存してから、非公開の問診へ進みます。",
    fullName: "お名前",
    email: "Email",
    phone: "携帯番号",
    careInterest: "関心のあるケア",
    consent: "Medipicの問診とケア案内に関する連絡に同意します。",
    submit: "問診へ進む",
    saving: "保存中...",
    required: "必須項目を入力してください。",
  },
  ko: {
    login: "로그인",
    eyebrow: "medipic 시작",
    title: "상담부터 사후관리까지 한 곳에서",
    subtitle: "케어 카테고리를 선택하고 비공개 문진을 작성한 뒤 의료진 안내에 따라 온라인 지원을 이어갑니다.",
    careLabel: "medipic care",
    careSteps: ["온라인 문진", "의사 검토", "LINE 사후관리"],
    panelTitle: "케어를 하나의 흐름으로",
    panelBody: "문진, LINE 안내, 처방 지원, 지속 관리를 Medipic 흐름 안에서 안내합니다.",
    startNow: "지금 시작",
    formTitle: "케어 계정 만들기",
    formBody: "기본 연락처를 먼저 저장한 뒤 비공개 문진으로 이어집니다.",
    fullName: "이름",
    email: "Email",
    phone: "휴대폰 번호",
    careInterest: "관심 케어",
    consent: "Medipic 문진 및 케어 안내 연락에 동의합니다.",
    submit: "문진으로 계속",
    saving: "저장 중...",
    required: "필수 항목을 입력하세요.",
  },
};

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-5-5 5 5-5 5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
    </svg>
  );
}

export default function SignupPage() {
  const [locale, setLocale] = useLocale();
  const copy = signupCopy[locale] ?? signupCopy.en;
  const localizedProducts = localizeCareProducts(careProducts, locale);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [careId, setCareId] = useState<string>(careProducts[0]?.id ?? "weight");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!fullName.trim() || !email.trim() || !phone.trim() || !careId || !agreed) {
      setError(copy.required);
      return;
    }

    setSaving(true);
    const selectedProduct = careProducts.find((product) => product.id === careId) ?? careProducts[0];

    localStorage.setItem(
      SIGNUP_PROFILE_KEY,
      JSON.stringify({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        careId: selectedProduct.id,
        createdAt: new Date().toISOString(),
      }),
    );
    notifySignupProfileChanged();

    const next = new URLSearchParams(window.location.search).get("next");
    window.location.assign(next?.startsWith("/") ? next : selectedProduct.href);
  }

  return (
    <main className="min-h-[100dvh] bg-[#fbfdf9] text-[#111111]">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="text-3xl font-semibold tracking-[-0.05em] text-[#111111]" aria-label="Medipic home">
            medipic.
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/login" className="rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-semibold text-black/70 backdrop-blur hover:bg-[#dff0e5]">
              {copy.login}
            </Link>
            <LanguageSwitcher locale={locale} onChange={setLocale} variant="light" />
          </div>
        </div>
      </header>

      <section className="mx-auto grid min-h-[100dvh] max-w-[1500px] items-center gap-8 px-5 pb-14 pt-28 sm:px-8 lg:grid-cols-[0.48fr_0.52fr]">
        <div className="rounded-[4px] border border-black/10 bg-white p-5 sm:p-8">
          <p className="versed-label text-black/42">{copy.eyebrow}</p>
          <h1 className="mt-4 max-w-xl text-3xl font-medium leading-[1.04] tracking-[-0.03em] text-[#111111] text-balance sm:text-4xl">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-black/62">{copy.subtitle}</p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <p className="text-lg font-semibold text-[#111111]">{copy.formTitle}</p>
              <p className="mt-2 text-sm leading-6 text-black/58">{copy.formBody}</p>
            </div>
            <label className="block">
              <span className="versed-label text-black/42">{copy.fullName}</span>
              <input value={fullName} onChange={(event) => setFullName(event.target.value)} className="mt-2 w-full border-b border-black/24 bg-transparent px-0 py-3 text-base outline-none focus:border-[#111111]" autoComplete="name" required />
            </label>
            <label className="block">
              <span className="versed-label text-black/42">{copy.email}</span>
              <input value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full border-b border-black/24 bg-transparent px-0 py-3 text-base outline-none focus:border-[#111111]" type="email" autoComplete="email" required />
            </label>
            <label className="block">
              <span className="versed-label text-black/42">{copy.phone}</span>
              <input value={phone} onChange={(event) => setPhone(event.target.value)} className="mt-2 w-full border-b border-black/24 bg-transparent px-0 py-3 text-base outline-none focus:border-[#111111]" type="tel" autoComplete="tel" required />
            </label>
            <label className="block">
              <span className="versed-label text-black/42">{copy.careInterest}</span>
              <select value={careId} onChange={(event) => setCareId(event.target.value)} className="mt-2 w-full border-b border-black/24 bg-transparent px-0 py-3 text-base outline-none focus:border-[#111111]">
                {localizedProducts.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-start gap-3 text-sm leading-6 text-black/62">
              <input checked={agreed} onChange={(event) => setAgreed(event.target.checked)} type="checkbox" className="mt-1 h-4 w-4 accent-[#111111]" required />
              <span>{copy.consent}</span>
            </label>
            {error ? <p className="text-sm font-semibold text-red-600">{error}</p> : null}
            <button type="submit" disabled={saving} className="flex w-full items-center justify-between rounded-full bg-[#111111] px-5 py-3.5 text-sm font-semibold text-white hover:bg-[#2f2f2f] disabled:cursor-not-allowed disabled:opacity-60">
              {saving ? copy.saving : copy.submit}
              <ArrowIcon />
            </button>
          </form>
        </div>

        <div className="relative min-h-[620px] overflow-hidden rounded-[4px] bg-[#dff0e5] p-5 sm:p-7">
          <div className="grid h-full min-h-[560px] grid-rows-[1fr_auto]">
            <div className="grid grid-cols-[0.88fr_1.12fr] gap-3">
              <div className="space-y-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-white">
                  <Image src="/images/medipic/redesign/menopause.png" alt="Medipic doctor consultation" fill priority sizes="260px" className="object-cover object-[50%_24%]" />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-white">
                  <Image src="/images/medipic/sample/products/women-equelle.png" alt="Menopause care product" fill sizes="260px" className="object-cover object-center" />
                </div>
              </div>
              <div className="space-y-3 pt-10">
                <div className="rounded-[4px] border border-black/10 bg-white/82 p-4 backdrop-blur-md">
                  <p className="versed-label text-black/40">{copy.careLabel}</p>
                  <div className="mt-5 space-y-3">
                    {copy.careSteps.map((item) => (
                      <div key={item} className="flex items-center justify-between rounded-full border border-black/10 bg-[#fbfdf9] px-4 py-3 text-sm font-medium text-black/70">
                        <span>{item}</span>
                        <span className="grid h-6 w-6 place-items-center rounded-full bg-[#dff0e5] text-[#111111]">
                          <CheckIcon />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-white">
                  <Image src="/images/medipic/redesign/weightloss.png" alt="Weight care member visual" fill sizes="300px" className="object-cover object-[52%_42%]" />
                </div>
              </div>
            </div>

            <div className="mt-5 max-w-md rounded-[4px] border border-black/10 bg-white/86 p-5 backdrop-blur-md">
              <p className="text-sm font-semibold text-[#111111]">{copy.panelTitle}</p>
              <p className="mt-2 text-xs leading-5 text-black/58">{copy.panelBody}</p>
              <Link href="/intake" className="mt-5 inline-flex items-center gap-3 rounded-full bg-[#111111] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2f2f2f]">
                {copy.startNow}
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
