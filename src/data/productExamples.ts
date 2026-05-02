import type { CategoryId } from './categories'

export interface ProductExample {
  name: string
  detail: string
  badge: 'Rx' | 'OTC' | 'Plan'
}

export const PRODUCT_EXAMPLES: Record<CategoryId, ProductExample[]> = {
  weight: [
    { name: 'Semaglutide', detail: 'GLP-1 option', badge: 'Rx' },
    { name: 'Tirzepatide', detail: 'GIP/GLP-1 option', badge: 'Rx' },
    { name: 'Metabolic review', detail: 'Lab-informed plan', badge: 'Plan' },
  ],
  hair: [
    { name: 'Finasteride', detail: 'DHT blocker', badge: 'Rx' },
    { name: 'Topical minoxidil', detail: 'Scalp application', badge: 'OTC' },
    { name: 'Combination care', detail: 'Doctor-guided plan', badge: 'Plan' },
  ],
  menopause: [
    { name: 'Estradiol HRT', detail: 'Hormone support', badge: 'Rx' },
    { name: 'Progesterone add-on', detail: 'Cycle support', badge: 'Rx' },
    { name: 'Vaginal estrogen', detail: 'Dryness support', badge: 'Rx' },
  ],
  skincare: [
    { name: 'Tretinoin', detail: 'Retinoid care', badge: 'Rx' },
    { name: 'Azelaic acid', detail: 'Tone and acne', badge: 'Rx' },
    { name: 'Benzoyl peroxide', detail: 'Acne control', badge: 'OTC' },
  ],
}
