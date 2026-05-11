'use client'

interface PricingCardProps {
  title: string
  price: number
  unit: string
  description: string
  features: string[]
  ctaLabel?: string
  onSelect?: () => void
}

export default function PricingCard({
  title,
  price,
  unit,
  description,
  features,
  ctaLabel = 'Select plan',
  onSelect,
}: PricingCardProps) {
  return (
    <div className="flex flex-col gap-5 rounded-[6px] border border-black/8 bg-white p-6 shadow-[0_18px_70px_rgba(17,17,17,0.08)] transition-shadow duration-200 hover:shadow-[0_22px_80px_rgba(17,17,17,0.12)]">
      <div>
        <h3 className="text-base font-semibold text-[#111111]">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-black/50">{description}</p>
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-semibold tracking-normal text-[#111111]">
          JPY {price.toLocaleString()}
        </span>
        <span className="text-sm text-black/50">{unit}</span>
      </div>

      <ul className="flex flex-col gap-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-black/64">
            <svg
              className="mt-0.5 h-4 w-4 shrink-0 text-[#1D7A4A]"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                clipRule="evenodd"
              />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onSelect}
        className="mt-auto w-full rounded-[6px] bg-[#111111] py-3 text-sm font-semibold text-white transition hover:bg-[#2a261f] active:translate-y-px"
      >
        {ctaLabel}
      </button>
    </div>
  )
}
