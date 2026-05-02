import { describe, it, expect } from 'vitest'
import { evaluateContraindications, getActiveFlag } from '@/lib/contraindications'
import type { Question } from '@/data/questions'

// ─── Fixtures ────────────────────────────────────────────────────────────────

/** W-07: 갑상선암 / MEN2 병력 — block */
const weightThyroidQuestion: Question = {
  id: 'W-07',
  type: 'single',
  textEn: 'Do you have a personal or family history of thyroid cancer or MEN2?',
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
      messageEn: 'GLP-1 receptor agonists are contraindicated with a personal or family history of thyroid cancer or MEN2.',
      messageJa: 'GLP-1受容体作動薬は、甲状腺がんやMEN2の既往・家族歴がある場合は禁忌です。',
    },
  ],
}

/** C-04: 임신 / 수유 — flag */
const pregnancyQuestion: Question = {
  id: 'C-04',
  type: 'single',
  textEn: 'Are you currently pregnant or breastfeeding?',
  textJa: '現在、妊娠中または授乳中ですか？',
  required: true,
  options: [
    { value: 'no', labelEn: 'No', labelJa: 'いいえ' },
    { value: 'pregnant', labelEn: 'Currently pregnant', labelJa: '妊娠中' },
    { value: 'breastfeeding', labelEn: 'Currently breastfeeding', labelJa: '授乳中' },
  ],
  contraindicationRules: [
    {
      triggerValues: ['pregnant', 'breastfeeding'],
      severity: 'flag',
      messageEn: 'This will be reviewed carefully by your doctor.',
      messageJa: '担当医師が慎重に確認します。',
    },
  ],
}

/** multi select 질문 — 금기값 포함 가능 */
const multiQuestion: Question = {
  id: 'H-07',
  type: 'multi',
  textEn: 'Have you had any abnormal blood test results recently?',
  textJa: '最近、血液検査で異常を指摘されたことはありますか？',
  required: true,
  options: [
    { value: 'no', labelEn: 'No', labelJa: 'いいえ' },
    { value: 'thyroid', labelEn: 'Thyroid abnormality', labelJa: '甲状腺の異常' },
    { value: 'iron', labelEn: 'Iron deficiency', labelJa: '鉄欠乏' },
    { value: 'hormone', labelEn: 'Hormone abnormality', labelJa: 'ホルモン異常' },
  ],
  contraindicationRules: [
    {
      triggerValues: ['thyroid', 'hormone'],
      severity: 'flag',
      messageEn: 'This finding will be reviewed by your doctor before treatment is prescribed.',
      messageJa: '処方前に担当医師が確認します。',
    },
  ],
}

/** 금기 규칙 없는 일반 질문 */
const normalQuestion: Question = {
  id: 'W-01',
  type: 'single',
  textEn: 'What is your primary goal for weight management?',
  textJa: '体重管理の主な目標を教えてください',
  required: true,
  options: [
    { value: 'lose_weight', labelEn: 'Lose weight', labelJa: '体重を減らしたい' },
    { value: 'maintain', labelEn: 'Maintain', labelJa: '維持' },
  ],
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('evaluateContraindications', () => {
  it('체중관리 카테고리에서 갑상선암 병력(personal) 선택 → severity: block 반환', () => {
    const flags = evaluateContraindications(
      [weightThyroidQuestion],
      { 'W-07': 'personal' },
    )
    expect(flags).toHaveLength(1)
    expect(flags[0].severity).toBe('block')
    expect(flags[0].questionId).toBe('W-07')
  })

  it('체중관리 카테고리에서 갑상선암 가족력(family) 선택 → severity: block 반환', () => {
    const flags = evaluateContraindications(
      [weightThyroidQuestion],
      { 'W-07': 'family' },
    )
    expect(flags).toHaveLength(1)
    expect(flags[0].severity).toBe('block')
  })

  it('공통 임신 선택(pregnant) → severity: flag 반환', () => {
    const flags = evaluateContraindications(
      [pregnancyQuestion],
      { 'C-04': 'pregnant' },
    )
    expect(flags).toHaveLength(1)
    expect(flags[0].severity).toBe('flag')
    expect(flags[0].questionId).toBe('C-04')
  })

  it('공통 수유 선택(breastfeeding) → severity: flag 반환', () => {
    const flags = evaluateContraindications(
      [pregnancyQuestion],
      { 'C-04': 'breastfeeding' },
    )
    expect(flags).toHaveLength(1)
    expect(flags[0].severity).toBe('flag')
  })

  it('정상 응답(no) → riskFlags 빈 배열 반환', () => {
    const flags = evaluateContraindications(
      [weightThyroidQuestion, pregnancyQuestion],
      { 'W-07': 'no', 'C-04': 'no' },
    )
    expect(flags).toHaveLength(0)
  })

  it('응답 없음 → riskFlags 빈 배열 반환', () => {
    const flags = evaluateContraindications(
      [weightThyroidQuestion],
      {},
    )
    expect(flags).toHaveLength(0)
  })

  it('금기 규칙 없는 질문 → flag 없음', () => {
    const flags = evaluateContraindications(
      [normalQuestion],
      { 'W-01': 'lose_weight' },
    )
    expect(flags).toHaveLength(0)
  })

  it('multi select에서 금기값 포함 → flag 발생', () => {
    const flags = evaluateContraindications(
      [multiQuestion],
      { 'H-07': ['iron', 'thyroid'] }, // thyroid 가 triggerValues에 해당
    )
    expect(flags).toHaveLength(1)
    expect(flags[0].severity).toBe('flag')
    expect(flags[0].questionId).toBe('H-07')
  })

  it('multi select에서 금기값 미포함 → flag 없음', () => {
    const flags = evaluateContraindications(
      [multiQuestion],
      { 'H-07': ['iron', 'no'] },
    )
    expect(flags).toHaveLength(0)
  })
})

describe('getActiveFlag', () => {
  it('block이 있으면 getActiveFlag().severity === block 반환', () => {
    const rule = getActiveFlag(weightThyroidQuestion, 'personal')
    expect(rule).not.toBeNull()
    expect(rule?.severity).toBe('block')
  })

  it('flag가 있으면 getActiveFlag().severity === flag 반환', () => {
    const rule = getActiveFlag(pregnancyQuestion, 'pregnant')
    expect(rule).not.toBeNull()
    expect(rule?.severity).toBe('flag')
  })

  it('triggerValues에 없는 값 → null 반환', () => {
    const rule = getActiveFlag(weightThyroidQuestion, 'no')
    expect(rule).toBeNull()
  })

  it('응답 undefined → null 반환', () => {
    const rule = getActiveFlag(weightThyroidQuestion, undefined)
    expect(rule).toBeNull()
  })

  it('contraindicationRules 없는 질문 → null 반환', () => {
    const rule = getActiveFlag(normalQuestion, 'lose_weight')
    expect(rule).toBeNull()
  })

  it('multi 응답 배열에서 triggerValue 포함 시 rule 반환', () => {
    const rule = getActiveFlag(multiQuestion, ['iron', 'hormone'])
    expect(rule).not.toBeNull()
    expect(rule?.severity).toBe('flag')
  })
})
