import type { Question, ContraindicationRule } from '@/data/questions'

export interface RiskFlag {
  questionId: string
  severity: 'flag' | 'block'
  messageEn: string
  messageJa: string
}

export function evaluateContraindications(
  questions: Question[],
  responses: Record<string, string | string[]>
): RiskFlag[] {
  const flags: RiskFlag[] = []
  for (const question of questions) {
    if (!question.contraindicationRules) continue
    const response = responses[question.id]
    if (!response) continue
    const values = Array.isArray(response) ? response : [response]
    for (const rule of question.contraindicationRules) {
      if (rule.triggerValues.some(v => values.includes(v))) {
        flags.push({ questionId: question.id, severity: rule.severity, messageEn: rule.messageEn, messageJa: rule.messageJa })
      }
    }
  }
  return flags
}

export function getActiveFlag(
  question: Question,
  response: string | string[] | undefined
): ContraindicationRule | null {
  if (!question.contraindicationRules || !response) return null
  const values = Array.isArray(response) ? response : [response]
  return question.contraindicationRules.find(r => r.triggerValues.some(v => values.includes(v))) ?? null
}
