'use client'

import { useState, useCallback, useEffect } from 'react'
import type { CategoryId } from '@/data/categories'
import type { Question } from '@/data/questions'
import { evaluateContraindications, type RiskFlag } from '@/lib/contraindications'

export interface IntakeSession {
  sessionId: string
  categoryId: CategoryId
  responses: Record<string, string | string[]>
  riskFlags: RiskFlag[]
  currentQuestionIndex: number
  isCompleted: boolean
}

function newSession(categoryId: CategoryId): IntakeSession {
  return {
    sessionId: `intake_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    categoryId,
    responses: {},
    riskFlags: [],
    currentQuestionIndex: 0,
    isCompleted: false,
  }
}

const STORAGE_KEY = 'medipic_intake_session'

export function useIntake(categoryId: CategoryId, questions: Question[]) {
  const [session, setSession] = useState<IntakeSession>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsed: IntakeSession = JSON.parse(stored)
          if (parsed.categoryId === categoryId) return parsed
        }
      } catch { /* ignore */ }
    }
    return newSession(categoryId)
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    }
  }, [session])

  const currentQuestion = questions[session.currentQuestionIndex] ?? null
  const totalQuestions = questions.length
  const progress = totalQuestions > 0 ? session.currentQuestionIndex / totalQuestions : 0

  const respond = useCallback((value: string | string[]) => {
    setSession(prev => {
      const question = questions[prev.currentQuestionIndex]
      if (!question) return prev
      const responses = { ...prev.responses, [question.id]: value }
      return { ...prev, responses, riskFlags: evaluateContraindications(questions, responses) }
    })
  }, [questions])

  const goNext = useCallback(() => {
    setSession(prev => {
      const next = prev.currentQuestionIndex + 1
      if (next >= questions.length) return { ...prev, isCompleted: true }
      return { ...prev, currentQuestionIndex: next }
    })
  }, [questions.length])

  const goBack = useCallback(() => {
    setSession(prev => {
      if (prev.currentQuestionIndex <= 0) return prev
      return { ...prev, currentQuestionIndex: prev.currentQuestionIndex - 1 }
    })
  }, [])

  const getCurrentResponse = useCallback((): string | string[] | undefined => {
    if (!currentQuestion) return undefined
    return session.responses[currentQuestion.id]
  }, [currentQuestion, session.responses])

  return { session, currentQuestion, totalQuestions, progress, respond, goNext, goBack, getCurrentResponse }
}
