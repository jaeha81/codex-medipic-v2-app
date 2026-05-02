import type { CategoryId } from './categories'

export type QuestionType = 'single' | 'multi' | 'text' | 'date' | 'upload' | 'height_weight' | 'consent'

export interface QuestionOption {
  value: string
  labelEn: string
  labelJa: string
  labelKo?: string
}

export interface ContraindicationRule {
  triggerValues: string[]
  severity: 'flag' | 'block'
  messageEn: string
  messageJa: string
  messageKo?: string
}

export interface Question {
  id: string
  type: QuestionType
  textEn: string
  textJa: string
  textKo?: string
  hintEn?: string
  hintJa?: string
  hintKo?: string
  options?: QuestionOption[]
  required: boolean
  contraindicationRules?: ContraindicationRule[]
}

// ─── Common (C-01 ~ C-14) ────────────────────────────────────────────────────

const COMMON_QUESTIONS: Question[] = [
  {
    id: 'C-01',
    type: 'date',
    textEn: 'What is your date of birth?',
    textJa: '生年月日を教えてください',
    required: true,
  },
  {
    id: 'C-02',
    type: 'single',
    textEn: 'Which region do you currently live in?',
    textJa: '現在お住まいの地域を教えてください',
    required: true,
    options: [
      { value: 'hokkaido', labelEn: 'Hokkaido', labelJa: '北海道' },
      { value: 'tohoku', labelEn: 'Tohoku', labelJa: '東北' },
      { value: 'kanto', labelEn: 'Kanto (Tokyo area)', labelJa: '関東（東京周辺）' },
      { value: 'chubu', labelEn: 'Chubu', labelJa: '中部' },
      { value: 'kansai', labelEn: 'Kansai (Osaka area)', labelJa: '近畿（大阪周辺）' },
      { value: 'chugoku_shikoku', labelEn: 'Chugoku / Shikoku', labelJa: '中国・四国' },
      { value: 'kyushu', labelEn: 'Kyushu / Okinawa', labelJa: '九州・沖縄' },
      { value: 'other', labelEn: 'Other / Outside Japan', labelJa: 'その他・海外' },
    ],
  },
  {
    id: 'C-03',
    type: 'height_weight',
    textEn: 'What is your height and weight?',
    textJa: '身長と体重を教えてください',
    hintEn: 'Used to calculate your BMI',
    hintJa: 'BMI算出に使用します',
    required: true,
  },
  {
    id: 'C-04',
    type: 'single',
    textEn: 'Are you currently pregnant or breastfeeding?',
    textJa: '現在、妊娠中または授乳中ですか？',
    required: true,
    options: [
      { value: 'no', labelEn: 'No', labelJa: 'いいえ' },
      { value: 'pregnant', labelEn: 'Currently pregnant', labelJa: '妊娠中' },
      { value: 'breastfeeding', labelEn: 'Currently breastfeeding', labelJa: '授乳中' },
      { value: 'planning', labelEn: 'Planning to become pregnant', labelJa: '妊娠を希望している' },
    ],
    contraindicationRules: [
      {
        triggerValues: ['pregnant', 'breastfeeding'],
        severity: 'flag',
        messageEn: 'This will be reviewed carefully by your doctor. Some treatments may not be available.',
        messageJa: '担当医師が慎重に確認します。一部の治療が受けられない場合があります。',
      },
    ],
  },
  {
    id: 'C-05',
    type: 'text',
    textEn: 'Are you currently taking any medications? If yes, please list them.',
    textJa: '現在服用中のお薬はありますか？ある場合はお書きください。',
    hintEn: 'Include prescription and over-the-counter medications',
    hintJa: '処方薬・市販薬を含めてご記入ください',
    required: false,
  },
  {
    id: 'C-06',
    type: 'text',
    textEn: 'Do you have any known drug allergies?',
    textJa: '薬物アレルギーはありますか？',
    required: false,
  },
  {
    id: 'C-07',
    type: 'multi',
    textEn: 'Do you have any of the following conditions?',
    textJa: '以下の疾患・既往歴はありますか？（複数選択可）',
    required: true,
    options: [
      { value: 'none', labelEn: 'None of the above', labelJa: 'なし' },
      { value: 'hypertension', labelEn: 'Hypertension', labelJa: '高血圧' },
      { value: 'diabetes', labelEn: 'Diabetes', labelJa: '糖尿病' },
      { value: 'heart_disease', labelEn: 'Heart disease', labelJa: '心疾患' },
      { value: 'kidney_disease', labelEn: 'Kidney disease', labelJa: '腎臓病' },
      { value: 'liver_disease', labelEn: 'Liver disease', labelJa: '肝疾患' },
      { value: 'cancer', labelEn: 'Cancer (current or history)', labelJa: 'がん（現在または既往）' },
      { value: 'depression', labelEn: 'Depression / mental health condition', labelJa: 'うつ・精神疾患' },
      { value: 'autoimmune', labelEn: 'Autoimmune disease', labelJa: '自己免疫疾患' },
    ],
  },
  {
    id: 'C-08',
    type: 'text',
    textEn: 'Have you had any surgeries in the past 5 years? If yes, please describe.',
    textJa: '過去5年以内に手術を受けたことはありますか？',
    required: false,
  },
  {
    id: 'C-09',
    type: 'single',
    textEn: 'Do you currently smoke?',
    textJa: 'タバコを吸いますか？',
    required: true,
    options: [
      { value: 'never', labelEn: 'Never smoked', labelJa: '吸わない（経験なし）' },
      { value: 'former', labelEn: 'Former smoker', labelJa: '以前は吸っていた' },
      { value: 'occasional', labelEn: 'Occasionally', labelJa: '時々吸う' },
      { value: 'daily', labelEn: 'Daily smoker', labelJa: '毎日吸う' },
    ],
  },
  {
    id: 'C-10',
    type: 'single',
    textEn: 'How often do you drink alcohol?',
    textJa: 'お酒を飲む頻度はどのくらいですか？',
    required: true,
    options: [
      { value: 'never', labelEn: 'Never', labelJa: '飲まない' },
      { value: 'occasional', labelEn: 'Occasionally (1–2×/month)', labelJa: '時々（月1〜2回）' },
      { value: 'weekly', labelEn: 'Weekly (1–3×/week)', labelJa: '週1〜3回' },
      { value: 'daily', labelEn: 'Daily', labelJa: '毎日' },
    ],
  },
  {
    id: 'C-11',
    type: 'upload',
    textEn: 'Please upload a photo of your government-issued ID',
    textJa: '本人確認書類（免許証・マイナンバーカード等）の写真をアップロードしてください',
    hintEn: 'Accepted: Driver\'s license, My Number Card, Passport (JPG/PNG)',
    hintJa: '運転免許証・マイナンバーカード・パスポートなど（JPG・PNG）',
    required: true,
  },
  {
    id: 'C-12',
    type: 'consent',
    textEn: 'Privacy Policy Consent',
    textJa: '個人情報の取り扱いについて',
    hintEn: 'We collect and use your personal information to provide medical consultation services. Your data is encrypted and handled in accordance with applicable privacy laws.',
    hintJa: '医療相談サービス提供のため、個人情報を収集・利用します。データは暗号化され、個人情報保護法に基づき適切に管理されます。',
    required: true,
  },
  {
    id: 'C-13',
    type: 'consent',
    textEn: 'Sensitive Information Consent',
    textJa: '要配慮個人情報の取り扱いについて',
    hintEn: 'Medical and health information is classified as sensitive personal information. By proceeding, you consent to its collection and use for treatment purposes.',
    hintJa: '医療・健康情報は要配慮個人情報に該当します。続行することで、治療目的での収集・利用に同意します。',
    required: true,
  },
  {
    id: 'C-14',
    type: 'consent',
    textEn: 'Terms of Service',
    textJa: 'サービス利用規約',
    hintEn: 'This is an online consultation service. Prescriptions are issued at the doctor\'s discretion. The ¥0 consultation fee applies to first-time visits; medication costs are separate.',
    hintJa: 'オンライン診察サービスです。処方は医師の判断によります。診察料¥0は初回診察に適用され、薬代は別途かかります。',
    required: true,
  },
]

// ─── Weight (W-01 ~ W-10) ────────────────────────────────────────────────────

const WEIGHT_QUESTIONS: Question[] = [
  {
    id: 'W-01',
    type: 'single',
    textEn: 'What is your primary goal for weight management?',
    textJa: '体重管理の主な目標を教えてください',
    required: true,
    options: [
      { value: 'lose_weight', labelEn: 'Lose weight', labelJa: '体重を減らしたい' },
      { value: 'maintain', labelEn: 'Maintain current weight', labelJa: '現在の体重を維持したい' },
      { value: 'improve_health', labelEn: 'Improve overall health', labelJa: '健康全般を改善したい' },
      { value: 'control_appetite', labelEn: 'Control appetite / cravings', labelJa: '食欲・過食をコントロールしたい' },
    ],
  },
  {
    id: 'W-02',
    type: 'single',
    textEn: 'How much weight would you like to lose?',
    textJa: '目標の減量幅はどのくらいですか？',
    required: true,
    options: [
      { value: 'under5', labelEn: 'Under 5 kg', labelJa: '5kg未満' },
      { value: '5to10', labelEn: '5–10 kg', labelJa: '5〜10kg' },
      { value: '10to20', labelEn: '10–20 kg', labelJa: '10〜20kg' },
      { value: 'over20', labelEn: 'More than 20 kg', labelJa: '20kg以上' },
    ],
  },
  {
    id: 'W-03',
    type: 'single',
    textEn: 'Have you tried any weight loss methods before?',
    textJa: '過去にダイエットを試みたことはありますか？',
    required: true,
    options: [
      { value: 'never', labelEn: 'Never tried', labelJa: '試したことがない' },
      { value: 'diet', labelEn: 'Diet / calorie restriction', labelJa: '食事制限・カロリーコントロール' },
      { value: 'exercise', labelEn: 'Exercise program', labelJa: '運動プログラム' },
      { value: 'medication', labelEn: 'Prescription medication', labelJa: '処方薬' },
      { value: 'multiple', labelEn: 'Multiple methods', labelJa: '複数の方法' },
    ],
  },
  {
    id: 'W-04',
    type: 'single',
    textEn: 'How would you describe your current eating habits?',
    textJa: '現在の食習慣を教えてください',
    required: true,
    options: [
      { value: 'healthy', labelEn: 'Generally healthy', labelJa: '概ね健康的' },
      { value: 'irregular', labelEn: 'Irregular meals', labelJa: '食事が不規則' },
      { value: 'snacking', labelEn: 'Frequent snacking', labelJa: '間食が多い' },
      { value: 'overeating', labelEn: 'Tendency to overeat', labelJa: '食べ過ぎる傾向がある' },
      { value: 'emotional', labelEn: 'Emotional eating', labelJa: 'ストレス食い' },
    ],
  },
  {
    id: 'W-05',
    type: 'single',
    textEn: 'How active are you on a typical week?',
    textJa: '普段の運動頻度を教えてください',
    required: true,
    options: [
      { value: 'sedentary', labelEn: 'Sedentary (little to no exercise)', labelJa: 'ほとんど運動しない' },
      { value: 'light', labelEn: 'Light (1–2×/week)', labelJa: '軽い運動（週1〜2回）' },
      { value: 'moderate', labelEn: 'Moderate (3–4×/week)', labelJa: '適度な運動（週3〜4回）' },
      { value: 'active', labelEn: 'Very active (5+×/week)', labelJa: '活発（週5回以上）' },
    ],
  },
  {
    id: 'W-06',
    type: 'single',
    textEn: 'How many hours of sleep do you get per night on average?',
    textJa: '平均的な睡眠時間はどのくらいですか？',
    required: true,
    options: [
      { value: 'under5', labelEn: 'Less than 5 hours', labelJa: '5時間未満' },
      { value: '5to6', labelEn: '5–6 hours', labelJa: '5〜6時間' },
      { value: '7to8', labelEn: '7–8 hours', labelJa: '7〜8時間' },
      { value: 'over8', labelEn: 'More than 8 hours', labelJa: '8時間以上' },
    ],
  },
  {
    id: 'W-07',
    type: 'single',
    textEn: 'Do you have a personal or family history of thyroid cancer or MEN2 (Multiple Endocrine Neoplasia type 2)?',
    textJa: 'ご本人または家族に甲状腺がん、または多発性内分泌腺腫症2型（MEN2）の既往・家族歴はありますか？',
    required: true,
    options: [
      { value: 'no', labelEn: 'No', labelJa: 'いいえ' },
      { value: 'personal', labelEn: 'Yes, personal history', labelJa: 'はい、本人に既往あり' },
      { value: 'family', labelEn: 'Yes, family history', labelJa: 'はい、家族に既往あり' },
      { value: 'unsure', labelEn: 'Not sure', labelJa: 'わからない' },
    ],
    contraindicationRules: [
      {
        triggerValues: ['personal', 'family'],
        severity: 'block',
        messageEn: 'GLP-1 receptor agonists (e.g. semaglutide) are contraindicated with a personal or family history of thyroid cancer or MEN2. We are unable to prescribe this treatment. Please consult an endocrinologist.',
        messageJa: 'GLP-1受容体作動薬（セマグルチドなど）は、甲状腺がんやMEN2の既往・家族歴がある場合は禁忌です。この治療を処方することができません。内分泌専門医にご相談ください。',
      },
    ],
  },
  {
    id: 'W-08',
    type: 'single',
    textEn: 'Do you have a history of pancreatitis?',
    textJa: '膵炎の既往歴はありますか？',
    required: true,
    options: [
      { value: 'no', labelEn: 'No', labelJa: 'いいえ' },
      { value: 'yes', labelEn: 'Yes', labelJa: 'はい' },
      { value: 'unsure', labelEn: 'Not sure', labelJa: 'わからない' },
    ],
    contraindicationRules: [
      {
        triggerValues: ['yes'],
        severity: 'flag',
        messageEn: 'A history of pancreatitis requires careful review. Your doctor will assess suitability.',
        messageJa: '膵炎の既往がある場合は慎重な検討が必要です。担当医師が適応を確認します。',
      },
    ],
  },
  {
    id: 'W-09',
    type: 'text',
    textEn: 'Is there anything else you\'d like your doctor to know about your weight or health goals?',
    textJa: '体重・健康目標について、担当医師に伝えたいことがあればご記入ください',
    required: false,
  },
  {
    id: 'W-10',
    type: 'single',
    textEn: 'Have you previously used GLP-1 medications (e.g. Ozempic, Wegovy, Saxenda)?',
    textJa: 'GLP-1薬（オゼンピック・ウゴービ・サクセンダなど）を使用したことはありますか？',
    required: true,
    options: [
      { value: 'never', labelEn: 'Never used', labelJa: '使用したことがない' },
      { value: 'currently', labelEn: 'Currently using', labelJa: '現在使用中' },
      { value: 'past', labelEn: 'Used in the past', labelJa: '過去に使用した' },
    ],
  },
]

// ─── Hair (H-01 ~ H-08) ──────────────────────────────────────────────────────

const HAIR_QUESTIONS: Question[] = [
  {
    id: 'H-01',
    type: 'single',
    textEn: 'When did you first notice hair loss?',
    textJa: '抜け毛・薄毛に気づいたのはいつですか？',
    required: true,
    options: [
      { value: 'under1', labelEn: 'Less than 1 year ago', labelJa: '1年未満前' },
      { value: '1to3', labelEn: '1–3 years ago', labelJa: '1〜3年前' },
      { value: '3to5', labelEn: '3–5 years ago', labelJa: '3〜5年前' },
      { value: 'over5', labelEn: 'More than 5 years ago', labelJa: '5年以上前' },
    ],
  },
  {
    id: 'H-02',
    type: 'multi',
    textEn: 'Which areas are affected? (Select all that apply)',
    textJa: '薄毛・抜け毛が気になる部位を選んでください（複数可）',
    required: true,
    options: [
      { value: 'top', labelEn: 'Top of head', labelJa: '頭頂部' },
      { value: 'front', labelEn: 'Hairline / forehead', labelJa: '生え際・前頭部' },
      { value: 'crown', labelEn: 'Crown', labelJa: '頭頂部（つむじ周辺）' },
      { value: 'sides', labelEn: 'Sides', labelJa: '側頭部' },
      { value: 'overall', labelEn: 'Overall thinning', labelJa: '全体的な薄毛' },
    ],
  },
  {
    id: 'H-03',
    type: 'single',
    textEn: 'How many hairs do you lose per day approximately?',
    textJa: '1日あたりの抜け毛はおよそどのくらいですか？',
    required: true,
    options: [
      { value: 'under50', labelEn: 'Less than 50 hairs', labelJa: '50本未満' },
      { value: '50to100', labelEn: '50–100 hairs', labelJa: '50〜100本' },
      { value: '100to200', labelEn: '100–200 hairs', labelJa: '100〜200本' },
      { value: 'over200', labelEn: 'More than 200 hairs', labelJa: '200本以上' },
    ],
  },
  {
    id: 'H-04',
    type: 'single',
    textEn: 'How would you describe your scalp condition?',
    textJa: '頭皮の状態を教えてください',
    required: true,
    options: [
      { value: 'normal', labelEn: 'Normal', labelJa: '普通' },
      { value: 'oily', labelEn: 'Oily', labelJa: '脂っぽい' },
      { value: 'dry', labelEn: 'Dry / flaky', labelJa: 'かさつき・フケ' },
      { value: 'itchy', labelEn: 'Itchy', labelJa: 'かゆみがある' },
      { value: 'sensitive', labelEn: 'Sensitive', labelJa: '敏感肌' },
    ],
  },
  {
    id: 'H-05',
    type: 'upload',
    textEn: 'Please upload a photo of the affected area of your scalp',
    textJa: '気になる頭皮・抜け毛部分の写真をアップロードしてください',
    hintEn: 'Take a clear photo of the affected area in good lighting (JPG/PNG)',
    hintJa: '明るい場所で患部を撮影してください（JPG・PNG）',
    required: true,
  },
  {
    id: 'H-06',
    type: 'single',
    textEn: 'Have you received any treatment for hair loss before?',
    textJa: '過去に抜け毛・薄毛の治療を受けたことはありますか？',
    required: true,
    options: [
      { value: 'none', labelEn: 'No treatment', labelJa: '受けたことがない' },
      { value: 'minoxidil', labelEn: 'Minoxidil (topical)', labelJa: 'ミノキシジル（外用）' },
      { value: 'finasteride', labelEn: 'Finasteride / Dutasteride', labelJa: 'フィナステリド・デュタステリド' },
      { value: 'hair_clinic', labelEn: 'Hair clinic / transplant', labelJa: 'AGAクリニック・植毛' },
      { value: 'supplements', labelEn: 'Supplements only', labelJa: 'サプリメントのみ' },
    ],
  },
  {
    id: 'H-07',
    type: 'single',
    textEn: 'Have you had any abnormal blood test results recently?',
    textJa: '最近、血液検査で異常を指摘されたことはありますか？',
    required: true,
    options: [
      { value: 'no', labelEn: 'No / Not tested recently', labelJa: 'いいえ／最近検査していない' },
      { value: 'thyroid', labelEn: 'Thyroid abnormality', labelJa: '甲状腺の異常' },
      { value: 'iron', labelEn: 'Iron deficiency / anemia', labelJa: '鉄欠乏・貧血' },
      { value: 'hormone', labelEn: 'Hormone abnormality', labelJa: 'ホルモン異常' },
      { value: 'other', labelEn: 'Other abnormality', labelJa: 'その他の異常' },
    ],
    contraindicationRules: [
      {
        triggerValues: ['thyroid', 'hormone'],
        severity: 'flag',
        messageEn: 'This finding will be reviewed by your doctor before treatment is prescribed.',
        messageJa: '処方前に担当医師が確認します。',
      },
    ],
  },
  {
    id: 'H-08',
    type: 'text',
    textEn: 'Is there anything else you\'d like your doctor to know about your hair or scalp?',
    textJa: '髪・頭皮について担当医師に伝えたいことがあればご記入ください',
    required: false,
  },
]

// ─── Menopause (M-01 ~ M-07) ─────────────────────────────────────────────────

const MENOPAUSE_QUESTIONS: Question[] = [
  {
    id: 'M-01',
    type: 'single',
    textEn: 'What is your current menstrual status?',
    textJa: '現在の月経の状態を教えてください',
    required: true,
    options: [
      { value: 'regular', labelEn: 'Regular periods', labelJa: '規則的な月経がある' },
      { value: 'irregular', labelEn: 'Irregular periods', labelJa: '不規則な月経がある' },
      { value: 'perimenopause', labelEn: 'Perimenopause (changing)', labelJa: '更年期移行期（変化あり）' },
      { value: 'menopause', labelEn: 'Menopause (no period 12+ months)', labelJa: '閉経（12ヶ月以上月経なし）' },
      { value: 'surgical', labelEn: 'Surgical menopause', labelJa: '手術による閉経' },
    ],
  },
  {
    id: 'M-02',
    type: 'multi',
    textEn: 'Which symptoms are you experiencing? (Select all that apply)',
    textJa: '現在の症状を選んでください（複数可）',
    required: true,
    options: [
      { value: 'hot_flashes', labelEn: 'Hot flashes / night sweats', labelJa: 'ほてり・のぼせ・寝汗' },
      { value: 'mood', labelEn: 'Mood swings / irritability', labelJa: 'イライラ・気分の波' },
      { value: 'sleep', labelEn: 'Sleep disturbances', labelJa: '睡眠障害' },
      { value: 'fatigue', labelEn: 'Fatigue / low energy', labelJa: '疲労感・倦怠感' },
      { value: 'memory', labelEn: 'Memory / concentration issues', labelJa: '記憶力・集中力の低下' },
      { value: 'vaginal', labelEn: 'Vaginal dryness / discomfort', labelJa: '膣の乾燥・不快感' },
      { value: 'libido', labelEn: 'Decreased libido', labelJa: '性欲の低下' },
      { value: 'joint', labelEn: 'Joint / muscle pain', labelJa: '関節・筋肉の痛み' },
      { value: 'weight_gain', labelEn: 'Unexplained weight gain', labelJa: '原因不明の体重増加' },
    ],
  },
  {
    id: 'M-03',
    type: 'single',
    textEn: 'Do you have a personal or family history of breast cancer?',
    textJa: 'ご本人または家族に乳がんの既往・家族歴はありますか？',
    required: true,
    options: [
      { value: 'no', labelEn: 'No', labelJa: 'いいえ' },
      { value: 'personal', labelEn: 'Yes, personal history', labelJa: 'はい、本人に既往あり' },
      { value: 'family', labelEn: 'Yes, family history', labelJa: 'はい、家族に既往あり' },
    ],
    contraindicationRules: [
      {
        triggerValues: ['personal'],
        severity: 'block',
        messageEn: 'HRT is generally contraindicated with a personal history of breast cancer. We cannot prescribe hormone therapy. Please consult a gynecologist or oncologist.',
        messageJa: '乳がんの既往歴がある場合、HRTは一般的に禁忌です。ホルモン療法を処方することができません。婦人科または腫瘍科にご相談ください。',
      },
      {
        triggerValues: ['family'],
        severity: 'flag',
        messageEn: 'Family history of breast cancer will be carefully reviewed by your doctor.',
        messageJa: '乳がんの家族歴については担当医師が慎重に確認します。',
      },
    ],
  },
  {
    id: 'M-04',
    type: 'single',
    textEn: 'Do you have a history of blood clots (DVT, pulmonary embolism)?',
    textJa: '血栓症（深部静脈血栓症・肺塞栓症）の既往はありますか？',
    required: true,
    options: [
      { value: 'no', labelEn: 'No', labelJa: 'いいえ' },
      { value: 'yes', labelEn: 'Yes', labelJa: 'はい' },
      { value: 'family', labelEn: 'Family history only', labelJa: '家族歴のみ' },
    ],
    contraindicationRules: [
      {
        triggerValues: ['yes'],
        severity: 'block',
        messageEn: 'A history of blood clots is a contraindication for oral HRT. Please consult a specialist.',
        messageJa: '血栓症の既往は経口HRTの禁忌です。専門医にご相談ください。',
      },
    ],
  },
  {
    id: 'M-05',
    type: 'single',
    textEn: 'Have you previously used hormone replacement therapy (HRT)?',
    textJa: 'ホルモン補充療法（HRT）を受けたことはありますか？',
    required: true,
    options: [
      { value: 'never', labelEn: 'Never', labelJa: 'なし' },
      { value: 'currently', labelEn: 'Currently using', labelJa: '現在使用中' },
      { value: 'past', labelEn: 'Used in the past', labelJa: '過去に使用した' },
    ],
  },
  {
    id: 'M-06',
    type: 'single',
    textEn: 'How much are these symptoms affecting your daily life?',
    textJa: '症状による日常生活への影響はどの程度ですか？',
    required: true,
    options: [
      { value: 'mild', labelEn: 'Mild — noticeable but manageable', labelJa: '軽度 — 気になるが日常生活に支障なし' },
      { value: 'moderate', labelEn: 'Moderate — affecting daily activities', labelJa: '中程度 — 日常生活に影響がある' },
      { value: 'severe', labelEn: 'Severe — significantly impacting life', labelJa: '重度 — 生活に大きく支障がある' },
    ],
  },
  {
    id: 'M-07',
    type: 'text',
    textEn: 'Is there anything else you\'d like your doctor to know?',
    textJa: '担当医師に伝えたいことがあればご記入ください',
    required: false,
  },
]

// ─── Skincare (S-01 ~ S-07) ──────────────────────────────────────────────────

const SKINCARE_QUESTIONS: Question[] = [
  {
    id: 'S-01',
    type: 'multi',
    textEn: 'What are your main skin concerns? (Select all that apply)',
    textJa: '主な肌のお悩みを選んでください（複数可）',
    required: true,
    options: [
      { value: 'acne', labelEn: 'Acne / breakouts', labelJa: 'ニキビ・吹き出もの' },
      { value: 'aging', labelEn: 'Anti-aging / wrinkles', labelJa: 'エイジングケア・しわ' },
      { value: 'pigmentation', labelEn: 'Pigmentation / dark spots', labelJa: 'シミ・くすみ' },
      { value: 'dryness', labelEn: 'Dryness / sensitivity', labelJa: '乾燥・敏感肌' },
      { value: 'texture', labelEn: 'Uneven texture / large pores', labelJa: '毛穴・肌のキメ' },
      { value: 'redness', labelEn: 'Redness / rosacea', labelJa: '赤み・酒さ' },
    ],
  },
  {
    id: 'S-02',
    type: 'single',
    textEn: 'How would you describe your skin type?',
    textJa: '肌タイプを教えてください',
    required: true,
    options: [
      { value: 'normal', labelEn: 'Normal', labelJa: '普通肌' },
      { value: 'oily', labelEn: 'Oily', labelJa: '脂性肌' },
      { value: 'dry', labelEn: 'Dry', labelJa: '乾燥肌' },
      { value: 'combination', labelEn: 'Combination', labelJa: '混合肌' },
      { value: 'sensitive', labelEn: 'Sensitive', labelJa: '敏感肌' },
    ],
  },
  {
    id: 'S-03',
    type: 'text',
    textEn: 'Describe your current skincare routine (morning and evening)',
    textJa: '現在のスキンケアルーティンを教えてください（朝・夜）',
    required: false,
  },
  {
    id: 'S-04',
    type: 'single',
    textEn: 'Have you received any medical or clinic treatments for your skin?',
    textJa: '過去に医療機関・クリニックで肌の治療を受けたことはありますか？',
    required: true,
    options: [
      { value: 'none', labelEn: 'No', labelJa: 'いいえ' },
      { value: 'laser', labelEn: 'Laser treatment', labelJa: 'レーザー治療' },
      { value: 'peel', labelEn: 'Chemical peel', labelJa: 'ケミカルピーリング' },
      { value: 'prescription', labelEn: 'Prescription cream / medication', labelJa: '処方クリーム・内服薬' },
      { value: 'injection', labelEn: 'Injection (botox, filler, etc.)', labelJa: '注射（ボトックス・フィラーなど）' },
    ],
  },
  {
    id: 'S-05',
    type: 'single',
    textEn: 'Have you ever used retinoids (tretinoin, retinol)?',
    textJa: 'レチノイド（トレチノイン・レチノール）を使用したことはありますか？',
    required: true,
    options: [
      { value: 'never', labelEn: 'Never used', labelJa: '使用したことがない' },
      { value: 'otc', labelEn: 'Yes, over-the-counter retinol', labelJa: 'はい、市販のレチノールのみ' },
      { value: 'prescription', labelEn: 'Yes, prescription tretinoin', labelJa: 'はい、処方トレチノイン' },
    ],
  },
  {
    id: 'S-06',
    type: 'single',
    textEn: 'How much sun exposure do you get on an average day?',
    textJa: '平均的な紫外線（日光）への露出はどのくらいですか？',
    required: true,
    options: [
      { value: 'minimal', labelEn: 'Minimal (mostly indoors)', labelJa: '少ない（主に室内）' },
      { value: 'moderate', labelEn: 'Moderate (1–2 hours outdoors)', labelJa: '普通（屋外1〜2時間）' },
      { value: 'high', labelEn: 'High (outdoor work / sport)', labelJa: '多い（屋外作業・スポーツ）' },
    ],
  },
  {
    id: 'S-07',
    type: 'upload',
    textEn: 'Please upload a close-up photo of your skin concern area',
    textJa: '気になる肌の部位の写真をアップロードしてください',
    hintEn: 'Take a clear, close-up photo in natural light (JPG/PNG)',
    hintJa: '自然光で気になる部分を近距離で撮影してください（JPG・PNG）',
    required: false,
  },
]

// ─── Export ──────────────────────────────────────────────────────────────────

export const COMMON_QUESTIONS_EXPORT = COMMON_QUESTIONS

export const CATEGORY_QUESTIONS: Record<CategoryId, Question[]> = {
  weight:    WEIGHT_QUESTIONS,
  hair:      HAIR_QUESTIONS,
  menopause: MENOPAUSE_QUESTIONS,
  skincare:  SKINCARE_QUESTIONS,
}

export function getQuestionsForCategory(categoryId: string): Question[] {
  const specific = CATEGORY_QUESTIONS[categoryId as CategoryId] ?? []
  return [...COMMON_QUESTIONS, ...specific]
}
