export type CareProductId = "weight" | "hair" | "menopause" | "skincare";

export type CareProduct = {
  id: CareProductId;
  legacyIds?: string[];
  number: string;
  title: string;
  navLabel: string;
  kicker: string;
  tagline: string;
  shortBody: string;
  detailBody: string;
  href: string;
  image: string;
  imagePosition: string;
  accent: string;
  softAccent: string;
  benefits: string[];
  gallery: ProductGalleryItem[];
};

export type ProductGalleryItem = {
  name: string;
  caption: string;
  image: string;
};

export const careProducts: CareProduct[] = [
  {
    id: "weight",
    number: "01",
    title: "Weight Loss",
    navLabel: "Weight",
    kicker: "Trouble controlling your appetite?",
    tagline: "Start with weight care that fits your body.",
    shortBody: "A simple online path for weight care, from intake to follow-up.",
    detailBody:
      "Doctor-guided weight care designed to help women take the next step with confidence. Start with a focused intake, continue through online support, and keep the next action clear.",
    href: "/intake/weight",
    image: "/images/medipic/redesign/weightloss.png",
    imagePosition: "object-[52%_42%]",
    accent: "#111111",
    softAccent: "#f3efe8",
    benefits: ["Personalized care plan", "Women's health doctors online", "Easy refills for ongoing care"],
    gallery: [
      {
        name: "Mounjaro",
        caption: "Doctor-reviewed weight care option",
        image: "/images/medipic/sample/products/weight-mounjaro.png",
      },
      {
        name: "Rybelsus",
        caption: "Oral GLP-1 care discussion",
        image: "/images/medipic/sample/products/weight-rybelsus.png",
      },
    ],
  },
  {
    id: "hair",
    number: "02",
    title: "Hair",
    navLabel: "Hair",
    kicker: "If hair shedding has increased,",
    tagline:
      "Personalized hair support for women, combining doctor-guided care with a clear plan for fuller, stronger-looking hair.",
    shortBody: "A calm, guided path for hair and scalp concerns.",
    detailBody:
      "Personalized hair support for women, combining doctor-guided care with a clear plan for fuller, stronger-looking hair. The experience keeps the image, message, and action centered.",
    href: "/intake/hair",
    image: "/images/medipic/redesign/hair.png",
    imagePosition: "object-[50%_45%]",
    accent: "#111111",
    softAccent: "#f2eee8",
    benefits: ["Hair thinning intake", "Doctor-guided care", "Follow-up support online"],
    gallery: [
      {
        name: "Rogaine",
        caption: "Hair density support",
        image: "/images/medipic/sample/products/hair-rogaine.png",
      },
      {
        name: "Lumigan",
        caption: "Targeted growth support",
        image: "/images/medipic/sample/products/hair-lumigan.png",
      },
    ],
  },
  {
    id: "menopause",
    legacyIds: ["women"],
    number: "03",
    title: "Menopause",
    navLabel: "Menopause",
    kicker: "If your body feels different,",
    tagline: "understanding it comes first.",
    shortBody: "A discreet online flow for hormonal changes, PMS, and menopause concerns.",
    detailBody:
      "Pill, PMS, menopause, and HRT support designed for long-term women's health guidance. The page keeps the tone soft, readable, and centered on trust.",
    href: "/intake/menopause",
    image: "/images/medipic/redesign/menopause.png",
    imagePosition: "object-[50%_44%]",
    accent: "#111111",
    softAccent: "#f2eee8",
    benefits: ["PMS and menopause support", "Pill and HRT review path", "Long-term follow-up guidance"],
    gallery: [
      {
        name: "Equelle",
        caption: "Menopause and hormonal balance support",
        image: "/images/medipic/sample/products/women-equelle.png",
      },
    ],
  },
  {
    id: "skincare",
    legacyIds: ["skin"],
    number: "04",
    title: "Medical Skincare",
    navLabel: "Skincare",
    kicker: "Skin feeling more sensitive?",
    tagline: "Your skin may need a more personalized approach.",
    shortBody: "Clinical skincare guidance without a noisy beauty-commerce feel.",
    detailBody:
      "Medical skincare support for spots, dullness, acne, and skin concerns, guided by doctors and tailored to your skin. The page emphasizes clean photography, short copy, and a direct start action.",
    href: "/intake/skincare",
    image: "/images/medipic/redesign/medicalskincare.png",
    imagePosition: "object-[50%_44%]",
    accent: "#111111",
    softAccent: "#f5efeb",
    benefits: ["Acne and spots", "Brightening concerns", "Doctor-guided skin plan"],
    gallery: [
      {
        name: "Cinal",
        caption: "Tone and clarity support",
        image: "/images/medipic/sample/products/skin-cinal.png",
      },
      {
        name: "Restore",
        caption: "Barrier-focused skincare",
        image: "/images/medipic/sample/products/skin-restore.png",
      },
      {
        name: "Tranexamic",
        caption: "Spot and dullness care",
        image: "/images/medipic/sample/products/skin-tranexamic.png",
      },
    ],
  },
];

export function getCareProduct(id: string) {
  return careProducts.find((product) => product.id === id || product.legacyIds?.includes(id));
}
