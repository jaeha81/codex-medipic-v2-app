import type { Locale } from "@/i18n";
import type { CareProduct, CareProductId } from "@/data/careProducts";

type LocalizedProductCopy = {
  title: string;
  navLabel: string;
  kicker: string;
  tagline: string;
  shortBody: string;
  detailBody: string;
  benefits: string[];
  galleryCaptions: Record<string, string>;
};

export const productCopy: Record<Locale, Record<CareProductId, LocalizedProductCopy>> = {
  en: {
    weight: {
      title: "Weight Loss",
      navLabel: "Weight",
      kicker: "A lighter way forward.",
      tagline: "Doctor-guided GLP-1 weight care for a clear, private next step.",
      shortBody: "A simple online path for medical weight care, from intake to follow-up.",
      detailBody:
        "Start with a focused intake, review GLP-1 options clearly, and continue with doctor-guided follow-up. The flow checks medical history before treatment is considered.",
      benefits: ["GLP-1 treatment review", "Contraindication screening", "Refill and follow-up support"],
      galleryCaptions: {
        Mounjaro: "Weekly injectable GLP-1 option for doctor review",
        Rybelsus: "Daily oral GLP-1 option for medical review",
      },
    },
    hair: {
      title: "Hair",
      navLabel: "Hair",
      kicker: "Thicker. Stronger. Yours.",
      tagline: "Female hair loss and eyelash support with a clear doctor-guided plan.",
      shortBody: "A calm, guided path for hair, scalp, and eyelash concerns.",
      detailBody:
        "Tell us about shedding, scalp condition, treatment history, and eye-related concerns when relevant. A clinician can review whether minoxidil, eyelash care, or another option is appropriate.",
      benefits: ["Female hair loss intake", "Minoxidil and eyelash care review", "Long-term follow-up guidance"],
      galleryCaptions: {
        Rogaine: "Minoxidil hair density support for doctor-guided care",
        Lumigan: "Eyelash growth support for clinical discussion",
      },
    },
    menopause: {
      title: "Menopause",
      navLabel: "Menopause",
      kicker: "Care through every change.",
      tagline: "Pill, PMS, menopause, and HRT support designed for long-term women's health guidance.",
      shortBody: "A discreet online flow for hormonal changes, PMS, and menopause concerns.",
      detailBody:
        "Share symptoms, cycle changes, medical history, smoking status, blood pressure concerns, and current medication use. The care flow helps clarify whether pill, PMS, menopause, HRT, or lifestyle support should be reviewed.",
      benefits: ["PMS and menopause support", "Pill and HRT review path", "Long-term follow-up guidance"],
      galleryCaptions: {
        Equelle: "Menopause and hormonal balance support option",
      },
    },
    skincare: {
      title: "Medical Skincare",
      navLabel: "Skincare",
      kicker: "Clearer skin, clinically guided.",
      tagline: "Medical skincare support for acne, spots, dullness, and brightening concerns.",
      shortBody: "Clinical skincare guidance without a noisy beauty-commerce feel.",
      detailBody:
        "Upload a clear skin photo, describe your routine, and share treatment history. Tretinoin, hydroquinone, tranexamic acid, and vitamin support can be reviewed after intake and LINE registration.",
      benefits: ["Acne and spots", "Brightening and melasma care", "Doctor-reviewed skin plan"],
      galleryCaptions: {
        Cinal: "Vitamin C based tone and clarity support",
        Restore: "Barrier-focused skincare support",
        Tranexamic: "Spot and dullness care discussion",
      },
    },
  },
  ja: {
    weight: {
      title: "ウェイトロス",
      navLabel: "ウェイト",
      kicker: "軽やかに、次の一歩へ。",
      tagline: "GLP-1を中心とした医療ウェイトケアを、医師の確認のもとで進めます。",
      shortBody: "問診からフォローアップまで、オンラインで進める医療ウェイトケアです。",
      detailBody:
        "体重、既往歴、服薬状況を確認し、GLP-1治療の適性を医師が確認します。治療前に禁忌や注意事項を整理します。",
      benefits: ["GLP-1治療の確認", "禁忌チェック", "継続フォロー"],
      galleryCaptions: {
        Mounjaro: "週1回注射タイプのGLP-1選択肢",
        Rybelsus: "毎日服用する経口GLP-1選択肢",
      },
    },
    hair: {
      title: "ヘアケア",
      navLabel: "ヘア",
      kicker: "髪とまつ毛を、丁寧に。",
      tagline: "女性の薄毛、頭皮、まつ毛の悩みを医師確認の流れでサポートします。",
      shortBody: "髪・頭皮・まつ毛の悩みを落ち着いて相談できるオンライン導線です。",
      detailBody:
        "抜け毛の時期、頭皮状態、治療歴、必要に応じて目の状態を確認します。ミノキシジルやまつ毛ケアが適切か医師が確認します。",
      benefits: ["女性の薄毛問診", "ミノキシジル・まつ毛ケア確認", "長期フォロー"],
      galleryCaptions: {
        Rogaine: "ミノキシジルによる毛髪密度サポート",
        Lumigan: "まつ毛育成の相談選択肢",
      },
    },
    menopause: {
      title: "更年期ケア",
      navLabel: "更年期",
      kicker: "変化の時期を、穏やかに。",
      tagline: "ピル、PMS、更年期、HRTまで、女性の体調変化を長期的に支えます。",
      shortBody: "ホルモン変化、PMS、更年期の悩みを相談できるオンライン導線です。",
      detailBody:
        "症状、月経変化、既往歴、喫煙、血圧、服薬状況を確認します。ピル、PMS、更年期、HRT、生活サポートのどれを検討すべきか整理します。",
      benefits: ["PMS・更年期サポート", "ピル・HRT相談導線", "継続的なフォロー"],
      galleryCaptions: {
        Equelle: "更年期とホルモンバランスのサポート",
      },
    },
    skincare: {
      title: "メディカルスキンケア",
      navLabel: "スキンケア",
      kicker: "肌悩みを、医療の視点で。",
      tagline: "ニキビ、しみ、くすみ、美白の悩みを医師確認の流れでサポートします。",
      shortBody: "美容ECではなく、問診と医師確認につながるスキンケア導線です。",
      detailBody:
        "肌写真、現在のケア、治療歴を確認します。トレチノイン、ハイドロキノン、トラネキサム酸、ビタミンC系の選択肢は問診とLINE登録後に確認します。",
      benefits: ["ニキビ・しみ相談", "美白・肝斑ケア", "医師確認のスキンプラン"],
      galleryCaptions: {
        Cinal: "ビタミンC系の透明感サポート",
        Restore: "バリア機能を意識したスキンケア",
        Tranexamic: "しみ・くすみ相談の選択肢",
      },
    },
  },
  ko: {
    weight: {
      title: "체중 관리",
      navLabel: "체중",
      kicker: "가볍게, 다음 단계로.",
      tagline: "GLP-1 기반 메디컬 체중 관리를 의사 검토 흐름으로 안내합니다.",
      shortBody: "문진부터 후속 관리까지 온라인으로 이어지는 메디컬 체중 관리입니다.",
      detailBody:
        "현재 체중, 병력, 복용 약을 확인하고 GLP-1 치료 적합성을 의사가 검토합니다. 치료 전 금기와 주의 항목을 먼저 정리합니다.",
      benefits: ["GLP-1 치료 검토", "금기 항목 사전 확인", "리필과 후속 관리"],
      galleryCaptions: {
        Mounjaro: "주 1회 주사형 GLP-1 검토 옵션",
        Rybelsus: "매일 복용하는 경구 GLP-1 검토 옵션",
      },
    },
    hair: {
      title: "헤어 케어",
      navLabel: "헤어",
      kicker: "머리카락과 속눈썹까지.",
      tagline: "여성 탈모, 두피, 속눈썹 고민을 의사 검토 흐름으로 안내합니다.",
      shortBody: "모발, 두피, 속눈썹 고민을 차분하게 확인하는 온라인 케어입니다.",
      detailBody:
        "탈모 시작 시점, 두피 상태, 치료 경험, 필요 시 눈 관련 상태를 확인합니다. 미녹시딜이나 속눈썹 케어가 적절한지 의사가 검토합니다.",
      benefits: ["여성 탈모 문진", "미녹시딜과 속눈썹 케어 검토", "장기 후속 관리"],
      galleryCaptions: {
        Rogaine: "미녹시딜 기반 모발 밀도 지원",
        Lumigan: "속눈썹 성장 상담 옵션",
      },
    },
    menopause: {
      title: "갱년기 케어",
      navLabel: "갱년기",
      kicker: "몸의 변화를 부드럽게.",
      tagline: "피임약, PMS, 갱년기, HRT까지 여성 건강을 장기적으로 안내합니다.",
      shortBody: "호르몬 변화, PMS, 갱년기 고민을 상담하는 온라인 흐름입니다.",
      detailBody:
        "증상, 생리 변화, 병력, 흡연, 혈압, 복용 약을 확인합니다. 피임약, PMS, 갱년기, HRT, 생활 관리 중 어떤 방향을 검토할지 정리합니다.",
      benefits: ["PMS와 갱년기 지원", "피임약과 HRT 상담 흐름", "지속적인 후속 관리"],
      galleryCaptions: {
        Equelle: "갱년기와 호르몬 균형 지원 옵션",
      },
    },
    skincare: {
      title: "메디컬 스킨케어",
      navLabel: "스킨케어",
      kicker: "피부 고민을 의료적으로.",
      tagline: "여드름, 기미, 칙칙함, 브라이트닝 고민을 의사 검토 흐름으로 안내합니다.",
      shortBody: "단순 뷰티 커머스가 아니라 문진과 의사 검토로 이어지는 스킨케어입니다.",
      detailBody:
        "피부 사진, 현재 루틴, 치료 경험을 확인합니다. 트레티노인, 하이드로퀴논, 트라넥사믹산, 비타민 C 계열 선택지는 문진과 LINE 등록 후 검토합니다.",
      benefits: ["여드름과 기미 상담", "브라이트닝과 간반 케어", "의사 검토 스킨 플랜"],
      galleryCaptions: {
        Cinal: "비타민 C 기반 톤과 맑기 지원",
        Restore: "피부 장벽 중심 스킨케어",
        Tranexamic: "기미와 칙칙함 상담 옵션",
      },
    },
  },
};

export function localizeCareProduct(product: CareProduct, locale: Locale): CareProduct {
  const copy = productCopy[locale]?.[product.id] ?? productCopy.en[product.id];

  return {
    ...product,
    title: copy.title,
    navLabel: copy.navLabel,
    kicker: copy.kicker,
    tagline: copy.tagline,
    shortBody: copy.shortBody,
    detailBody: copy.detailBody,
    benefits: copy.benefits,
    gallery: product.gallery.map((item) => ({
      ...item,
      caption: copy.galleryCaptions[item.name] ?? item.caption,
    })),
  };
}

export function localizeCareProducts(products: CareProduct[], locale: Locale): CareProduct[] {
  return products.map((product) => localizeCareProduct(product, locale));
}
