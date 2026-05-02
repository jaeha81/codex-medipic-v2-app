/**
 * intake-session.test.ts
 *
 * useIntake hook은 React + browser sessionStorage에 의존하므로
 * 직접 마운트하지 않고, 세션 상태 구조·로직을 순수 함수로 검증한다.
 * 실제 evaluateContraindications 로직도 함께 연동해 검증한다.
 */
import { describe, it, expect } from 'vitest'
import { evaluateContraindications } from '@/lib/contraindications'
import type { Question } from '@/data/questions'
import type { RiskFlag } from '@/lib/contraindications'

// ─── IntakeSession 타입 (hook 내부 구조와 동일) ─────────────────────────────

interface IntakeSession {
  sessionId: string
  categoryId: string
  responses: Record<string, string | string[]>
  riskFlags: RiskFlag[]
  currentQuestionIndex: number
  isCompleted: boolean
}

function newSession(categoryId: string): IntakeSession {
  return {
    sessionId: `intake_${Date.now()}_test`,
    categoryId,
    responses: {},
    riskFlags: [],
    currentQuestionIndex: 0,
    isCompleted: false,
  }
}

// ─── Fixtures ────────────────────────────────────────────────────────────────

const questions: Question[] = [
  {
    id: 'C-04',
    type: 'single',
    textEn: 'Are you currently pregnant or breastfeeding?',
    textJa: '現在、妊娠中または授乳中ですか？',
    required: true,
    options: [
      { value: 'no', labelEn: 'No', labelJa: 'いいえ' },
      { value: 'pregnant', labelEn: 'Currently pregnant', labelJa: '妊娠中' },
    ],
    contraindicationRules: [
      {
        triggerValues: ['pregnant'],
        severity: 'flag',
        messageEn: 'This will be reviewed carefully by your doctor.',
        messageJa: '担当医師が慎重に確認します。',
      },
    ],
  },
  {
    id: 'W-07',
    type: 'single',
    textEn: 'Thyroid cancer history?',
    textJa: '甲状腺がんの既往？',
    required: true,
    options: [
      { value: 'no', labelEn: 'No', labelJa: 'いいえ' },
      { value: 'personal', labelEn: 'Personal history', labelJa: '本人に既往あり' },
    ],
    contraindicationRules: [
      {
        triggerValues: ['personal'],
        severity: 'block',
        messageEn: 'GLP-1 receptor agonists are contraindicated.',
        messageJa: 'GLP-1受容体作動薬は禁忌です。',
      },
    ],
  },
  {
    id: 'W-01',
    type: 'single',
    textEn: 'Weight goal?',
    textJa: '目標？',
    required: true,
    options: [{ value: 'lose_weight', labelEn: 'Lose weight', labelJa: '減量' }],
  },
]

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('IntakeSession 초기 생성', () => {
  it('sessionId가 생성된다', () => {
    const session = newSession('weight')
    expect(session.sessionId).toBeTruthy()
    expect(typeof session.sessionId).toBe('string')
  })

  it('categoryId가 올바르게 설정된다', () => {
    const session = newSession('weight')
    expect(session.categoryId).toBe('weight')
  })

  it('초기 responses는 빈 객체이다', () => {
    const session = newSession('weight')
    expect(session.responses).toEqual({})
  })

  it('초기 riskFlags는 빈 배열이다', () => {
    const session = newSession('weight')
    expect(session.riskFlags).toEqual([])
  })

  it('초기 currentQuestionIndex는 0이다', () => {
    const session = newSession('weight')
    expect(session.currentQuestionIndex).toBe(0)
  })

  it('초기 isCompleted는 false이다', () => {
    const session = newSession('weight')
    expect(session.isCompleted).toBe(false)
  })
})

describe('응답 추가 후 responses 업데이트', () => {
  it('단일 응답 추가 후 responses에 반영된다', () => {
    const session = newSession('weight')
    const updatedResponses = { ...session.responses, 'C-04': 'no' }
    const updatedSession: IntakeSession = { ...session, responses: updatedResponses }
    expect(updatedSession.responses['C-04']).toBe('no')
  })

  it('여러 응답 추가 후 모두 반영된다', () => {
    const session = newSession('weight')
    const responses = { 'C-04': 'no', 'W-01': 'lose_weight', 'W-07': 'no' }
    const updatedSession: IntakeSession = { ...session, responses }
    expect(Object.keys(updatedSession.responses)).toHaveLength(3)
    expect(updatedSession.responses['W-01']).toBe('lose_weight')
  })

  it('multi 응답(배열)도 responses에 저장된다', () => {
    const session = newSession('hair')
    const responses = { ...session.responses, 'H-02': ['top', 'front'] }
    const updatedSession: IntakeSession = { ...session, responses }
    expect(Array.isArray(updatedSession.responses['H-02'])).toBe(true)
    expect(updatedSession.responses['H-02']).toContain('top')
  })
})

describe('금기 규칙 평가 트리거', () => {
  it('금기값 입력 시 riskFlags가 업데이트된다', () => {
    const session = newSession('weight')
    const responses = { ...session.responses, 'C-04': 'pregnant' }
    const riskFlags = evaluateContraindications(questions, responses)
    const updatedSession: IntakeSession = { ...session, responses, riskFlags }
    expect(updatedSession.riskFlags).toHaveLength(1)
    expect(updatedSession.riskFlags[0].severity).toBe('flag')
    expect(updatedSession.riskFlags[0].questionId).toBe('C-04')
  })

  it('block 금기값 입력 시 block 플래그가 생성된다', () => {
    const session = newSession('weight')
    const responses = { ...session.responses, 'W-07': 'personal' }
    const riskFlags = evaluateContraindications(questions, responses)
    const updatedSession: IntakeSession = { ...session, responses, riskFlags }
    expect(updatedSession.riskFlags).toHaveLength(1)
    expect(updatedSession.riskFlags[0].severity).toBe('block')
  })

  it('정상 응답만 있으면 riskFlags가 빈 배열이다', () => {
    const session = newSession('weight')
    const responses = { 'C-04': 'no', 'W-07': 'no', 'W-01': 'lose_weight' }
    const riskFlags = evaluateContraindications(questions, responses)
    const updatedSession: IntakeSession = { ...session, responses, riskFlags }
    expect(updatedSession.riskFlags).toHaveLength(0)
  })

  it('복수 금기값 입력 시 여러 riskFlags가 생성된다', () => {
    const session = newSession('weight')
    const responses = { 'C-04': 'pregnant', 'W-07': 'personal' }
    const riskFlags = evaluateContraindications(questions, responses)
    const updatedSession: IntakeSession = { ...session, responses, riskFlags }
    expect(updatedSession.riskFlags.length).toBeGreaterThanOrEqual(2)
    const severities = updatedSession.riskFlags.map(f => f.severity)
    expect(severities).toContain('flag')
    expect(severities).toContain('block')
  })

  it('isCompleted는 모든 질문 응답 완료 후 true로 전환된다', () => {
    const session = newSession('weight')
    // 마지막 질문(index = totalQuestions - 1)에서 goNext 호출 시 isCompleted = true
    const totalQuestions = questions.length
    const atLast: IntakeSession = { ...session, currentQuestionIndex: totalQuestions - 1 }
    const next = atLast.currentQuestionIndex + 1
    const completed: IntakeSession =
      next >= totalQuestions
        ? { ...atLast, isCompleted: true }
        : { ...atLast, currentQuestionIndex: next }
    expect(completed.isCompleted).toBe(true)
  })
})
