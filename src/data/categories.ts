export type CategoryId = 'weight' | 'hair' | 'menopause' | 'skincare'

export interface ServiceCategory {
  id: CategoryId
  labelEn: string
  labelJa: string
  labelKo: string
  subtitleEn: string
  subtitleJa: string
  subtitleKo: string
  keywordsEn: string[]
  keywordsJa: string[]
  keywordsKo: string[]
  accentColor: string
  bgColor: string
}

export const CATEGORIES: ServiceCategory[] = [
  {
    id: 'weight',
    labelEn: 'Weight Management',
    labelJa: '体重管理',
    labelKo: '체중 관리',
    subtitleEn: 'GLP-1 & Metabolic Care',
    subtitleJa: 'GLP-1・代謝ケア',
    subtitleKo: 'GLP-1 · 대사 케어',
    keywordsEn: ['Weight loss', 'GLP-1', 'Metabolism'],
    keywordsJa: ['体重が気になる', 'GLP-1治療', '代謝改善'],
    keywordsKo: ['체중 감량', 'GLP-1 치료', '대사 개선'],
    accentColor: 'text-emerald-600',
    bgColor: 'bg-accent-teal',
  },
  {
    id: 'hair',
    labelEn: 'Hair Loss',
    labelJa: '抜け毛・薄毛',
    labelKo: '탈모',
    subtitleEn: 'Scalp & Hair Restoration',
    subtitleJa: 'スカルプケア',
    subtitleKo: '두피 & 모발 케어',
    keywordsEn: ['Hair thinning', 'Scalp care', 'Minoxidil'],
    keywordsJa: ['抜け毛が増えた', '薄毛が気になる', 'ミノキシジル'],
    keywordsKo: ['탈모 심해짐', '두피 관리', '미녹시딜'],
    accentColor: 'text-purple-600',
    bgColor: 'bg-accent-purple',
  },
  {
    id: 'menopause',
    labelEn: 'Menopause',
    labelJa: '更年期',
    labelKo: '갱년기',
    subtitleEn: 'Hormone Balance & Relief',
    subtitleJa: 'ホルモンバランスケア',
    subtitleKo: '호르몬 밸런스 케어',
    keywordsEn: ['Hot flashes', 'HRT', 'Hormone balance'],
    keywordsJa: ['ほてり・のぼせ', 'ホルモン補充', '更年期症状'],
    keywordsKo: ['안면홍조', '호르몬 보충', '갱년기 증상'],
    accentColor: 'text-pink-600',
    bgColor: 'bg-bg-warm',
  },
  {
    id: 'skincare',
    labelEn: 'Medical Skincare',
    labelJa: '医療スキンケア',
    labelKo: '의료 스킨케어',
    subtitleEn: 'Prescription-grade Skin',
    subtitleJa: '処方スキンケア',
    subtitleKo: '처방 스킨케어',
    keywordsEn: ['Acne', 'Brightening', 'Anti-aging'],
    keywordsJa: ['ニキビ・シミ', 'トレチノイン', 'アンチエイジング'],
    keywordsKo: ['여드름·잡티', '트레티노인', '안티에이징'],
    accentColor: 'text-blue-600',
    bgColor: 'bg-accent-blue',
  },
]

export function getCategoryById(id: string): ServiceCategory | undefined {
  return CATEGORIES.find(c => c.id === id)
}
