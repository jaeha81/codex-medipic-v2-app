'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import type { StoredIntakeSession } from '@/lib/storage'
import { COMMON_QUESTIONS_EXPORT as COMMON_QUESTIONS, CATEGORY_QUESTIONS } from '@/data/questions'

interface PageProps {
  params: Promise<{ sessionId: string }>
}

const STATUS_OPTIONS = [
  { value: 'pending',    label: '未確認',  color: 'text-yellow-600' },
  { value: 'reviewed',   label: '確認済',  color: 'text-blue-600' },
  { value: 'prescribed', label: '処方済',  color: 'text-green-600' },
  { value: 'rejected',   label: '却下',    color: 'text-red-600' },
]

const CATEGORY_LABELS: Record<string, string> = {
  weight: '体重管理', hair: '抜け毛・薄毛', menopause: '更年期', skincare: '医療スキンケア',
}

export default function DoctorDetailPage({ params }: PageProps) {
  const { sessionId } = use(params)
  const [session, setSession] = useState<StoredIntakeSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [note, setNote] = useState('')
  const [status, setStatus] = useState<string>('pending')
  const [saved, setSaved] = useState(false)
  const [lineToast, setLineToast] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/intake/${sessionId}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) {
          setSession(data)
          setStatus(data.status)
          setNote(data.doctorNote ?? '')
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [sessionId])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch(`/api/intake/${sessionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, doctorNote: note }),
      })
      if (res.ok) {
        const updated = await res.json()
        setSession(updated)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)

        // 処方済に変更された場合 → LINE通知を自動送信
        if (status === 'prescribed' && session) {
          try {
            const lineRes = await fetch('/api/line/notify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                type: 'prescription',
                sessionId,
                categoryId: session.categoryId,
                doctorNote: note,
              }),
            })
            if (lineRes.ok) {
              setLineToast('✓ LINE通知を送信しました')
              setTimeout(() => setLineToast(null), 2000)
            }
          } catch (err) {
            console.error('[LINE notify] failed', err)
          }
        }
      }
    } finally {
      setSaving(false)
    }
  }

  // Build Q&A pairs from session responses
  const allQuestions = session
    ? [
        ...COMMON_QUESTIONS,
        ...(CATEGORY_QUESTIONS[session.categoryId as keyof typeof CATEGORY_QUESTIONS] ?? []),
      ]
    : []

  const answeredPairs = allQuestions
    .map(q => {
      const answer = session?.responses[q.id]
      if (answer === undefined || answer === '') return null
      const displayAnswer = Array.isArray(answer)
        ? answer.join(', ')
        : String(answer)
      return { id: q.id, question: q.textJa || q.textEn, answer: displayAnswer }
    })
    .filter(Boolean) as { id: string; question: string; answer: string }[]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400">
        <svg className="w-5 h-5 animate-spin mr-2" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
        </svg>
        読み込み中...
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">問診データが見つかりません</p>
          <Link href="/doctor" className="text-[#1E60C8] text-sm hover:underline">← 一覧に戻る</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href="/doctor" className="hover:text-gray-600 transition-colors">問診一覧</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium">{sessionId.slice(-12)}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left: Q&A */}
          <div className="lg:col-span-2 space-y-4">
            {/* Header card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl">
                  {{ weight: '⚖️', hair: '💆', menopause: '🌸', skincare: '✨' }[session.categoryId] ?? '💊'}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{CATEGORY_LABELS[session.categoryId] ?? session.categoryId}</h1>
                  <p className="text-sm text-gray-400">
                    {new Date(session.submittedAt).toLocaleString('ja-JP')} · ID: {session.sessionId.slice(-12)}
                  </p>
                </div>
              </div>

              {/* Risk flags */}
              {session.riskFlags.length > 0 && (
                <div className="mt-4 space-y-2">
                  {session.riskFlags.map((flag, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 px-4 py-3 rounded-xl text-sm ${
                        flag.severity === 'block'
                          ? 'bg-red-50 border border-red-200 text-red-700'
                          : 'bg-orange-50 border border-orange-200 text-orange-700'
                      }`}
                    >
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                      <div>
                        <p className="font-semibold">{flag.severity === 'block' ? '⛔ 禁忌' : '⚠️ 要確認'} — Q.{flag.questionId}</p>
                        <p className="mt-0.5">{flag.messageJa || flag.messageEn}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Q&A list */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-700 mb-4 text-sm uppercase tracking-wide">回答内容</h2>
              {answeredPairs.length === 0 ? (
                <p className="text-gray-400 text-sm">回答データなし</p>
              ) : (
                <div className="divide-y divide-gray-50">
                  {answeredPairs.map(({ id, question, answer }) => (
                    <div key={id} className="py-3">
                      <p className="text-xs text-gray-400 mb-0.5">{id}</p>
                      <p className="text-sm text-gray-600 mb-1">{question}</p>
                      <p className="text-sm font-semibold text-gray-900">{answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Doctor actions */}
          <div className="space-y-4">
            {/* Status selector */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="font-semibold text-gray-700 text-sm mb-3">ステータス</h2>
              <div className="space-y-2">
                {STATUS_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setStatus(opt.value)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm transition-all ${
                      status === opt.value
                        ? 'border-[#1E60C8] bg-[#1E60C8]/5 font-semibold text-[#1E60C8]'
                        : 'border-gray-100 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${
                      { pending: 'bg-yellow-400', reviewed: 'bg-blue-400', prescribed: 'bg-green-400', rejected: 'bg-red-400' }[opt.value]
                    }`} />
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Doctor note */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="font-semibold text-gray-700 text-sm mb-3">医師メモ</h2>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                rows={5}
                placeholder="処方内容・判断理由・注意事項など..."
                className="w-full text-sm text-gray-700 placeholder-gray-300 border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1E60C8]/30 focus:border-[#1E60C8] resize-none"
              />
            </div>

            {/* Save button */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#1E60C8] hover:bg-[#1650A8] text-white font-semibold rounded-xl transition-all disabled:opacity-60"
            >
              {saving ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  保存中...
                </>
              ) : saved ? (
                <>✓ 保存しました</>
              ) : (
                <>保存する</>
              )}
            </button>

            {lineToast && (
              <p className="text-center text-sm text-green-600 font-medium">{lineToast}</p>
            )}

            <Link href="/doctor" className="block text-center text-sm text-gray-400 hover:text-gray-600 transition-colors">
              ← 一覧に戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
