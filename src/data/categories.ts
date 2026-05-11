export type CategoryId = "weight" | "hair" | "menopause" | "skincare";

export interface ServiceCategory {
  id: CategoryId;
  labelEn: string;
  labelJa: string;
  labelKo: string;
  subtitleEn: string;
  subtitleJa: string;
  subtitleKo: string;
  keywordsEn: string[];
  keywordsJa: string[];
  keywordsKo: string[];
  accentColor: string;
  bgColor: string;
}

export const CATEGORIES: ServiceCategory[] = [
  {
    id: "weight",
    labelEn: "Weight Loss",
    labelJa: "ウェイトロス",
    labelKo: "체중 관리",
    subtitleEn: "GLP-1 based medical weight care",
    subtitleJa: "GLP-1薬を中心とした医療ウェイトケア",
    subtitleKo: "GLP-1 기반 메디컬 체중 관리",
    keywordsEn: ["GLP-1", "Mounjaro", "Rybelsus", "Medical weight care"],
    keywordsJa: ["GLP-1", "マンジャロ", "リベルサス", "医療ウェイトケア"],
    keywordsKo: ["GLP-1", "마운자로", "리벨서스", "메디컬 체중 관리"],
    accentColor: "text-neutral-900",
    bgColor: "bg-[#f3efe8]",
  },
  {
    id: "hair",
    labelEn: "Hair",
    labelJa: "ヘアケア",
    labelKo: "헤어 케어",
    subtitleEn: "Female hair loss and eyelash support",
    subtitleJa: "女性の薄毛とまつ毛の医療サポート",
    subtitleKo: "여성 탈모와 속눈썹 성장 케어",
    keywordsEn: ["Minoxidil", "Lumigan", "Hair thinning", "Eyelash growth"],
    keywordsJa: ["ミノキシジル", "ルミガン", "薄毛", "まつ毛育成"],
    keywordsKo: ["미녹시딜", "루미간", "여성 탈모", "속눈썹 성장"],
    accentColor: "text-neutral-900",
    bgColor: "bg-[#f2eee8]",
  },
  {
    id: "menopause",
    labelEn: "Menopause",
    labelJa: "更年期ケア",
    labelKo: "갱년기 케어",
    subtitleEn: "Pill, PMS, menopause, and HRT support",
    subtitleJa: "ピル・PMS・更年期・HRTの相談",
    subtitleKo: "피임약, PMS, 갱년기, HRT 상담",
    keywordsEn: ["Pill", "PMS", "Menopause", "HRT"],
    keywordsJa: ["ピル", "PMS", "更年期", "HRT"],
    keywordsKo: ["피임약", "PMS", "갱년기", "HRT"],
    accentColor: "text-neutral-900",
    bgColor: "bg-[#f2eee8]",
  },
  {
    id: "skincare",
    labelEn: "Medical Skincare",
    labelJa: "メディカルスキンケア",
    labelKo: "메디컬 스킨케어",
    subtitleEn: "Prescription-grade skin and brightening care",
    subtitleJa: "処方薬レベルの肌・美白ケア",
    subtitleKo: "처방 기반 피부와 브라이트닝 케어",
    keywordsEn: ["Tretinoin", "Tranexamic acid", "Vitamin C", "Doctor review"],
    keywordsJa: ["トレチノイン", "トラネキサム酸", "ビタミンC", "医師確認"],
    keywordsKo: ["트레티노인", "트라넥사믹산", "비타민 C", "의사 검토"],
    accentColor: "text-neutral-900",
    bgColor: "bg-[#f5efeb]",
  },
];

export function getCategoryById(id: string): ServiceCategory | undefined {
  return CATEGORIES.find((category) => category.id === id);
}
