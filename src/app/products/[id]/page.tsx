import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { careProducts, getCareProduct } from "@/data/careProducts";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return careProducts.map((product) => ({ id: product.id }));
}

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

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getCareProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f6f3ed] text-[#171717]">
      <header className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="text-3xl font-bold tracking-tight">
          medipic.
        </Link>
        <Link
          href={product.href}
          className="inline-flex items-center gap-2 rounded-full bg-[#171717] px-4 py-2 text-xs font-semibold text-white hover:bg-black sm:px-5 sm:py-2.5"
        >
          문진 시작
          <ArrowIcon />
        </Link>
      </header>

      <section className="mx-auto max-w-[1400px] px-5 pb-10 sm:px-8">
        <div className="relative overflow-hidden rounded-lg bg-[#26331f] text-white shadow-[0_34px_100px_rgba(20,28,17,0.24)]">
          <Image
            src={product.personImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className={`object-cover ${product.position} opacity-42`}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/82 via-black/46 to-black/18" />
          <div
            className="absolute right-0 top-0 h-96 w-96 rounded-full blur-3xl"
            style={{ backgroundColor: `${product.accent}55` }}
          />

          <div className="relative z-10 grid min-h-[720px] items-center gap-8 px-6 py-10 lg:grid-cols-[0.48fr_0.52fr] lg:px-14">
            <div>
              <p className="text-sm font-semibold tracking-[0.24em] text-white/60">{product.jpLabel}</p>
              <h1 className="mt-3 text-5xl font-semibold leading-none sm:text-7xl">{product.title}</h1>
              <p className="mt-6 max-w-lg text-sm leading-6 text-white/78">{product.detailBody}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={product.href}
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-[#17210f] hover:brightness-105"
                  style={{ backgroundColor: product.accent }}
                >
                  문진으로 이동
                  <ArrowIcon />
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full border border-white/24 bg-white/12 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/18"
                >
                  다른 카테고리 보기
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="relative min-h-[460px] overflow-hidden rounded-lg border border-white/12 bg-white/12 p-5 backdrop-blur-md">
                <div
                  className="absolute inset-x-10 top-10 h-36 rotate-[-10deg] blur-2xl"
                  style={{ backgroundColor: `${product.accent}99` }}
                />
                {product.productImages.map((image, index) => (
                  <div
                    key={image}
                    className={`absolute animate-productFloat overflow-hidden rounded-xl bg-white/78 shadow-[0_28px_80px_rgba(0,0,0,0.26)] ${
                      index === 0
                        ? "left-1/2 top-12 h-[330px] w-[250px] -translate-x-1/2 rotate-[-8deg] sm:h-[380px] sm:w-[290px]"
                        : index === 1
                          ? "bottom-10 right-8 h-40 w-40 rotate-[12deg]"
                          : "bottom-8 left-8 h-36 w-36 rotate-[-6deg]"
                    }`}
                    style={{ "--float-rotate": index === 0 ? "-8deg" : index === 1 ? "12deg" : "-6deg" } as CSSProperties}
                  >
                    <Image src={image} alt="" fill sizes="320px" className={`object-cover ${product.productFocus}`} />
                    <div className="absolute inset-0 bg-white/8" />
                  </div>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {["상담 전 정보 정리", "카테고리 문진 연결", "검토 후 다음 단계 안내"].map((item) => (
                  <div key={item} className="rounded-lg border border-white/14 bg-white/12 p-4 text-sm font-semibold text-white/84 backdrop-blur">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs leading-5 text-black/52">
          본 상세 페이지는 제공된 이미지와 승인된 설명 범위로 구성한 구조 샘플입니다. 제품명, 가격, 의료효과, 후기, 의사 정보는 확정 자료 없이 새로 작성하지 않았습니다.
        </p>
      </section>
    </main>
  );
}
