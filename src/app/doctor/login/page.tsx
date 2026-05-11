"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

export default function DoctorLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/doctor/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/doctor");
      } else {
        const data = await res.json();
        setError(data.error ?? "Login failed. Please check the password.");
      }
    } catch {
      setError("Connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[100dvh] bg-[#fbfdf9] text-[#111111]">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="text-3xl font-semibold tracking-[-0.05em] text-[#111111]" aria-label="Medipic home">
            medipic.
          </Link>
          <Link href="/login" className="rounded-full bg-white/64 px-4 py-2 text-xs font-semibold text-[#111111]/70 shadow-[0_10px_30px_rgba(17,17,17,0.08)] backdrop-blur hover:bg-white">
            Member login
          </Link>
        </div>
      </header>

      <section className="mx-auto grid min-h-[100dvh] max-w-[1500px] items-center gap-8 px-5 pb-14 pt-28 sm:px-8 lg:grid-cols-[0.52fr_0.48fr]">
        <div className="relative min-h-[560px] overflow-hidden rounded-[4px] bg-[#dff0e5] shadow-[0_16px_58px_rgba(17,17,17,0.09)]">
          <Image
            src="/images/medipic/health-review.png"
            alt="Medipic doctor review workspace"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 52vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,244,238,0.18),rgba(247,244,238,0.92))]" />
          <div className="absolute inset-x-5 top-5 grid grid-cols-3 gap-2 sm:inset-x-8 sm:top-8">
            {[
              { label: "Weight", src: "/images/medipic/sample/products/weight-mounjaro.png" },
              { label: "Hair", src: "/images/medipic/sample/products/hair-rogaine.png" },
              { label: "Skin", src: "/images/medipic/sample/products/skin-tranexamic.png" },
            ].map((item) => (
              <div key={item.label} className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-white/74 shadow-[0_14px_38px_rgba(17,17,17,0.12)] backdrop-blur">
                <Image src={item.src} alt={`${item.label} care product`} fill sizes="180px" className="object-cover object-center" />
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#111111]/52">Doctor portal</p>
            <h1 className="mt-4 max-w-xl text-3xl font-medium leading-[1.04] tracking-[-0.02em] text-[#111111] text-balance sm:text-4xl">
              Review care requests with a calm workspace
            </h1>
            <div className="mt-6 max-w-md divide-y divide-[#111111]/10 rounded-[6px] bg-white/72 px-4 shadow-[0_18px_60px_rgba(17,17,17,0.10)] backdrop-blur-md">
              {["Intake sessions", "Risk flags", "Follow-up status"].map((item) => (
                <div key={item} className="flex items-center justify-between py-3 text-sm font-medium text-[#111111]/68">
                  <span>{item}</span>
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#dff0e5] text-[#111111]">
                    <CheckIcon />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[6px] bg-white/84 p-5 shadow-[0_18px_70px_rgba(17,17,17,0.10)] backdrop-blur-md sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#111111]/42">Secure access</p>
          <h2 className="mt-4 text-3xl font-medium leading-[1.04] tracking-[-0.02em] text-[#111111]">Doctor login</h2>
          <p className="mt-3 text-sm leading-6 text-[#111111]/58">
            Enter the clinic password configured in the server environment.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="doctor-password" className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#111111]/48">
                Password
              </label>
              <input
                id="doctor-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter doctor password"
                required
                className="mt-2 w-full rounded-[6px] border border-[#111111]/12 bg-[#fbfdf9] px-4 py-3.5 text-sm text-[#111111] outline-none transition focus:border-[#111111]/44 focus:bg-white"
              />
            </div>

            {error ? (
              <p className="rounded-[6px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-between rounded-full bg-[#111111] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(17,17,17,0.20)] hover:bg-[#2f2f2f] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Checking access..." : "Login"}
              <ArrowIcon />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
