import { describe, it, expect } from 'vitest'
import {
  COMMON_QUESTIONS_EXPORT,
  CATEGORY_QUESTIONS,
  getQuestionsForCategory,
} from '@/data/questions'
import type { Question } from '@/data/questions'

// ─── COMMON_QUESTIONS 검증 ────────────────────────────────────────────────────

describe('COMMON_QUESTIONS', () => {
  it('14개 존재한다', () => {
    expect(COMMON_QUESTIONS_EXPORT).toHaveLength(14)
  })

  it('C-01 ~ C-14 ID가 순서대로 존재한다', () => {
    const ids = COMMON_QUESTIONS_EXPORT.map(q => q.id)
    for (let i = 1; i <= 14; i++) {
      const expected = `C-${i.toString().padStart(2, '0')}`
      expect(ids).toContain(expected)
    }
  })

  it('모든 질문에 id 필드가 있다', () => {
    COMMON_QUESTIONS_EXPORT.forEach(q => {
      expect(q.id).toBeTruthy()
    })
  })

  it('모든 질문에 type 필드가 있다', () => {
    COMMON_QUESTIONS_EXPORT.forEach(q => {
      expect(q.type).toBeTruthy()
    })
  })

  it('모든 질문에 textJa 필드가 있다', () => {
    COMMON_QUESTIONS_EXPORT.forEach(q => {
      expect(q.textJa).toBeTruthy()
    })
  })

  it('모든 질문에 textEn 필드가 있다', () => {
    COMMON_QUESTIONS_EXPORT.forEach(q => {
      expect(q.textEn).toBeTruthy()
    })
  })

  it('required 필드가 boolean 타입이다', () => {
    COMMON_QUESTIONS_EXPORT.forEach(q => {
      expect(typeof q.required).toBe('boolean')
    })
  })
})

// ─── 카테고리별 질문 수 검증 ──────────────────────────────────────────────────

describe('CATEGORY_QUESTIONS 개수', () => {
  it('weight 카테고리 질문이 10개 이상이다', () => {
    expect(CATEGORY_QUESTIONS.weight.length).toBeGreaterThanOrEqual(10)
  })

  it('hair 카테고리 질문이 8개 이상이다', () => {
    expect(CATEGORY_QUESTIONS.hair.length).toBeGreaterThanOrEqual(8)
  })

  it('menopause 카테고리 질문이 6개 이상이다', () => {
    expect(CATEGORY_QUESTIONS.menopause.length).toBeGreaterThanOrEqual(6)
  })

  it('skincare 카테고리 질문이 5개 이상이다', () => {
    expect(CATEGORY_QUESTIONS.skincare.length).toBeGreaterThanOrEqual(5)
  })
})

// ─── 카테고리별 필수 필드 검증 ───────────────────────────────────────────────

function validateQuestions(questions: Question[], label: string) {
  describe(`${label} 질문 필드 유효성`, () => {
    it('모든 질문에 id 필드가 있다', () => {
      questions.forEach(q => {
        expect(q.id).toBeTruthy()
      })
    })

    it('모든 질문에 type 필드가 있다', () => {
      questions.forEach(q => {
        expect(q.type).toBeTruthy()
      })
    })

    it('모든 질문에 textJa 필드가 있다', () => {
      questions.forEach(q => {
        expect(q.textJa).toBeTruthy()
      })
    })

    it('모든 질문에 textEn 필드가 있다', () => {
      questions.forEach(q => {
        expect(q.textEn).toBeTruthy()
      })
    })

    it('required 필드가 boolean 타입이다', () => {
      questions.forEach(q => {
        expect(typeof q.required).toBe('boolean')
      })
    })
  })
}

validateQuestions(CATEGORY_QUESTIONS.weight, 'weight')
validateQuestions(CATEGORY_QUESTIONS.hair, 'hair')
validateQuestions(CATEGORY_QUESTIONS.menopause, 'menopause')
validateQuestions(CATEGORY_QUESTIONS.skincare, 'skincare')

// ─── getQuestionsForCategory 검증 ────────────────────────────────────────────

describe('getQuestionsForCategory', () => {
  it('weight 카테고리 → COMMON(14) + WEIGHT(10) = 24개 반환', () => {
    const qs = getQuestionsForCategory('weight')
    expect(qs.length).toBe(14 + CATEGORY_QUESTIONS.weight.length)
  })

  it('hair 카테고리 → COMMON(14) + HAIR(8) = 22개 반환', () => {
    const qs = getQuestionsForCategory('hair')
    expect(qs.length).toBe(14 + CATEGORY_QUESTIONS.hair.length)
  })

  it('menopause 카테고리 → COMMON(14) + MENOPAUSE 개수 반환', () => {
    const qs = getQuestionsForCategory('menopause')
    expect(qs.length).toBe(14 + CATEGORY_QUESTIONS.menopause.length)
  })

  it('skincare 카테고리 → COMMON(14) + SKINCARE 개수 반환', () => {
    const qs = getQuestionsForCategory('skincare')
    expect(qs.length).toBe(14 + CATEGORY_QUESTIONS.skincare.length)
  })

  it('존재하지 않는 카테고리 → COMMON 14개만 반환', () => {
    const qs = getQuestionsForCategory('unknown_category')
    expect(qs.length).toBe(14)
  })

  it('반환된 질문 배열에서 모든 id는 고유하다 (weight)', () => {
    const qs = getQuestionsForCategory('weight')
    const ids = qs.map(q => q.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })
})

// ─── contraindicationRules 구조 검증 ─────────────────────────────────────────

describe('contraindicationRules 구조', () => {
  it('rules가 있는 경우 triggerValues 배열이 비어있지 않다', () => {
    const allQuestions = [
      ...COMMON_QUESTIONS_EXPORT,
      ...CATEGORY_QUESTIONS.weight,
      ...CATEGORY_QUESTIONS.hair,
      ...CATEGORY_QUESTIONS.menopause,
      ...CATEGORY_QUESTIONS.skincare,
    ]
    allQuestions
      .filter(q => q.contraindicationRules && q.contraindicationRules.length > 0)
      .forEach(q => {
        q.contraindicationRules!.forEach(rule => {
          expect(rule.triggerValues.length).toBeGreaterThan(0)
          expect(['flag', 'block']).toContain(rule.severity)
          expect(rule.messageEn).toBeTruthy()
          expect(rule.messageJa).toBeTruthy()
        })
      })
  })

  it('weight W-07 (갑상선암)은 block 규칙을 가진다', () => {
    const w07 = CATEGORY_QUESTIONS.weight.find(q => q.id === 'W-07')
    expect(w07).toBeDefined()
    const blockRule = w07?.contraindicationRules?.find(r => r.severity === 'block')
    expect(blockRule).toBeDefined()
    expect(blockRule?.triggerValues).toContain('personal')
    expect(blockRule?.triggerValues).toContain('family')
  })

  it('C-04 (임신/수유)은 flag 규칙을 가진다', () => {
    const c04 = COMMON_QUESTIONS_EXPORT.find(q => q.id === 'C-04')
    expect(c04).toBeDefined()
    const flagRule = c04?.contraindicationRules?.find(r => r.severity === 'flag')
    expect(flagRule).toBeDefined()
    expect(flagRule?.triggerValues).toContain('pregnant')
    expect(flagRule?.triggerValues).toContain('breastfeeding')
  })
})
