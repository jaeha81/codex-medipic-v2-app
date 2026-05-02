'use client'

interface PricingCardProps {
  title: string
  price: number
  unit: string
  description: string
  features: string[]
  onSelect?: () => void
}

export default function PricingCard({
  title,
  price,
  unit,
  description,
  features,
  onSelect,
}: PricingCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Title */}
      <div>
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-extrabold text-gray-900">
          ¥{price.toLocaleString()}
        </span>
        <span className="text-sm text-gray-500">{unit}</span>
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
            <svg
              className="w-4 h-4 mt-0.5 shrink-0 text-[#1D7A4A]"
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

      {/* CTA */}
      <button
        onClick={onSelect}
        className="w-full bg-[#1E60C8] hover:bg-[#1650A8] text-white font-bold text-sm rounded-2xl py-3 transition-colors duration-200 mt-auto"
      >
        このプランを選択する
      </button>
    </div>
  )
}
