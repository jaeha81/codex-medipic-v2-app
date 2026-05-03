export type CareProduct = {
  id: string;
  number: string;
  title: string;
  jpLabel: string;
  shortBody: string;
  detailBody: string;
  href: string;
  personImage: string;
  productImages: string[];
  productFocus: string;
  position: string;
  tone: string;
  accent: string;
};

export const careProducts: CareProduct[] = [
  {
    id: "weight",
    number: "01",
    title: "Weight care",
    jpLabel: "からだの相談",
    shortBody: "상담 전 단계에서 필요한 정보를 차분하게 정리하고, 문진으로 바로 이어지는 카테고리입니다.",
    detailBody:
      "체중 관리 상담을 시작하기 전 현재 상태와 생활 패턴을 정리하는 문진 경로입니다. 제품 이미지는 제공된 참고자료를 기반으로 한 시각 슬롯이며, 실제 처방 가능 여부와 안내 내용은 문진 이후 검토 흐름에서 다룹니다.",
    href: "/intake/weight",
    personImage: "/images/medipic/sample/people/weight-person.png",
    productImages: [
      "/images/medipic/sample/products/weight-mounjaro.png",
      "/images/medipic/sample/products/weight-rybelsus.png",
    ],
    productFocus: "object-[50%_52%]",
    position: "object-[56%_52%]",
    tone: "bg-[#e8ece0]",
    accent: "#d7f46a",
  },
  {
    id: "hair",
    number: "02",
    title: "Hair support",
    jpLabel: "髪のケア",
    shortBody: "개인적인 고민을 부담 없이 시작할 수 있도록 밝고 깨끗한 톤으로 구성했습니다.",
    detailBody:
      "헤어 관련 상담을 시작하기 전 기본 상태와 고민 범위를 정리하는 문진 경로입니다. 제품 이미지는 참고자료 기반의 보조 이미지이며, 상세 안내는 실제 검토 가능한 자료가 확정된 뒤 교체할 수 있습니다.",
    href: "/intake/hair",
    personImage: "/images/medipic/sample/people/hair-person.png",
    productImages: [
      "/images/medipic/sample/products/hair-rogaine.png",
      "/images/medipic/sample/products/hair-lumigan.png",
    ],
    productFocus: "object-[52%_50%]",
    position: "object-[52%_50%]",
    tone: "bg-[#e4eef0]",
    accent: "#b9e9ed",
  },
  {
    id: "women",
    number: "03",
    title: "Women's health",
    jpLabel: "女性の毎日",
    shortBody: "병원 같은 긴장감보다 생활 속 상담 장면을 우선해 편안한 신뢰감을 만들었습니다.",
    detailBody:
      "여성 건강 상담을 시작하기 전 컨디션과 증상 흐름을 정리하는 문진 경로입니다. 제품 이미지는 제공된 시각 자료를 작게 연결한 것이며, 가격이나 효과 문구는 확정 자료 없이 작성하지 않았습니다.",
    href: "/intake/menopause",
    personImage: "/images/medipic/sample/people/women-person.png",
    productImages: ["/images/medipic/sample/products/women-equelle.png"],
    productFocus: "object-[50%_50%]",
    position: "object-[53%_52%]",
    tone: "bg-[#e7f0ec]",
    accent: "#cce8da",
  },
  {
    id: "skin",
    number: "04",
    title: "Skin care",
    jpLabel: "肌の相談",
    shortBody: "과한 뷰티 광고처럼 보이지 않게 세로형 인물 배경과 여백을 중심으로 정리했습니다.",
    detailBody:
      "스킨케어 상담을 시작하기 전 피부 고민과 기본 정보를 정리하는 문진 경로입니다. 제품 이미지는 제공 자료를 기반으로 한 참고 슬롯이며, 실제 제품 설명은 승인된 문구가 있을 때 반영하는 구조입니다.",
    href: "/intake/skincare",
    personImage: "/images/medipic/sample/people/skin-person.png",
    productImages: [
      "/images/medipic/sample/products/skin-restore.png",
      "/images/medipic/sample/products/skin-tranexamic.png",
      "/images/medipic/sample/products/skin-cinal.png",
    ],
    productFocus: "object-[50%_50%]",
    position: "object-[50%_52%]",
    tone: "bg-[#f1e5e5]",
    accent: "#f0c8ce",
  },
];

export function getCareProduct(id: string) {
  return careProducts.find((product) => product.id === id);
}
