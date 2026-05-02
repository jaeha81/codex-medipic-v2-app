import Image from "next/image";
import Link from "next/link";

type Sample = {
  number: string;
  title: string;
  jpLabel: string;
  body: string;
  tone: string;
  personImage: string;
  productImages: string[];
  position: string;
};

const samples: Sample[] = [
  {
    number: "01",
    title: "Weight care",
    jpLabel: "からだの相談",
    body: "확정 전 제품 정보는 말하지 않고, 상담 진입 전의 차분한 신뢰감을 먼저 보여주는 구성입니다.",
    tone: "bg-[#e8ece0]",
    personImage: "/images/medipic/sample/people/weight-person.png",
    productImages: [
      "/images/medipic/sample/products/weight-rybelsus.png",
      "/images/medipic/sample/products/weight-mounjaro.png",
    ],
    position: "object-[56%_52%]",
  },
  {
    number: "02",
    title: "Hair support",
    jpLabel: "髪のケア",
    body: "프라이버시가 필요한 헤어 상담을 밝고 깨끗하게 보이도록 블루 톤으로 정리했습니다.",
    tone: "bg-[#e4eef0]",
    personImage: "/images/medipic/sample/people/hair-person.png",
    productImages: ["/images/medipic/sample/products/hair-rogaine.png"],
    position: "object-[52%_50%]",
  },
  {
    number: "03",
    title: "Women's health",
    jpLabel: "女性の毎日",
    body: "여성 건강 카테고리는 병원 느낌보다 생활 속 상담 장면을 우선해 부드럽게 잡았습니다.",
    tone: "bg-[#e7f0ec]",
    personImage: "/images/medipic/sample/people/women-person.png",
    productImages: ["/images/medipic/sample/products/women-equelle.png"],
    position: "object-[53%_52%]",
  },
  {
    number: "04",
    title: "Skin care",
    jpLabel: "肌の相談",
    body: "스킨케어는 로즈 톤을 쓰되 과한 뷰티 광고처럼 보이지 않게 여백과 세로 구도를 유지했습니다.",
    tone: "bg-[#f1e5e5]",
    personImage: "/images/medipic/sample/people/skin-person.png",
    productImages: [
      "/images/medipic/sample/products/skin-restore.png",
      "/images/medipic/sample/products/skin-tranexamic.png",
    ],
    position: "object-[50%_52%]",
  },
];

function ProductStrip({ images }: { images: string[] }) {
  return (
    <div className="flex items-end gap-2">
      {images.map((image, index) => (
        <div
          key={image}
          className="relative h-16 w-16 overflow-hidden rounded-md border border-white/50 bg-white/70 shadow-[0_12px_30px_rgba(0,0,0,0.14)] backdrop-blur sm:h-20 sm:w-20"
        >
          <Image
            src={image}
            alt=""
            fill
            sizes="80px"
            className="object-cover opacity-75 blur-[0.4px]"
            style={{
              objectPosition: index === 0 ? "50% 58%" : "50% 54%",
              transform: "scale(1.22)",
            }}
          />
          <div className="absolute inset-0 bg-white/20" />
        </div>
      ))}
    </div>
  );
}

function SampleCard({ sample }: { sample: Sample }) {
  return (
    <article
      className={`group relative min-h-[680px] overflow-hidden rounded-lg ${sample.tone} shadow-[0_24px_80px_rgba(28,32,26,0.14)]`}
    >
      <Image
        src={sample.personImage}
        alt=""
        fill
        priority={sample.number === "01"}
        sizes="(max-width: 1024px) 100vw, 50vw"
        className={`object-cover ${sample.position} transition duration-700 group-hover:scale-[1.025]`}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/12 via-black/6 to-black/45" />
      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 sm:p-6">
        <div className="rounded-full bg-white/78 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-[#171717] backdrop-blur">
          {sample.number}
        </div>
        <div className="text-right text-[11px] font-semibold tracking-[0.22em] text-white drop-shadow">
          MEDIPIC SAMPLE
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <div className="max-w-[28rem]">
          <p className="text-sm font-semibold tracking-[0.22em] text-white/86 drop-shadow">
            {sample.jpLabel}
          </p>
          <h2 className="mt-2 text-4xl font-semibold leading-none text-white drop-shadow sm:text-5xl">
            {sample.title}
          </h2>
          <p className="mt-4 max-w-[24rem] text-sm leading-6 text-white/86 drop-shadow">
            {sample.body}
          </p>
        </div>
        <div className="mt-6 flex items-end justify-between gap-4">
          <ProductStrip images={sample.productImages} />
          <div className="rounded-full border border-white/45 bg-white/20 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
            확인용 시안
          </div>
        </div>
      </div>
    </article>
  );
}

export default function DesignSamplePage() {
  return (
    <main className="min-h-screen bg-[#f6f3ed] text-[#171717]">
      <header className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="text-3xl font-bold tracking-tight">
          medipic.
        </Link>
        <span className="hidden text-xs font-semibold tracking-[0.24em] text-black/42 sm:inline">
          JAPANESE EDITORIAL GRID
        </span>
      </header>

      <section className="mx-auto max-w-[1500px] px-5 pb-8 sm:px-8">
        <div className="mb-5 max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.2em] text-black/48">
            DESIGN SAMPLE
          </p>
          <h1 className="mt-2 text-4xl font-semibold leading-tight tracking-normal sm:text-6xl">
            사람 중심 배경과 제품 보조 이미지를 조합한 2x2 확인용 시안
          </h1>
          <p className="mt-4 text-sm leading-6 text-black/62">
            제품명, 가격, 의료효과, 후기, 의사 정보는 새로 작성하지 않았습니다. 제품 이미지는 참고자료 판독용으로만 작게 배치했습니다.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {samples.map((sample) => (
            <SampleCard key={sample.number} sample={sample} />
          ))}
        </div>
      </section>
    </main>
  );
}
