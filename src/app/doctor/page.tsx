'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { StoredIntakeSession } from '@/lib/storage'

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending:    { label: '未確認', color: 'bg-yellow-100 text-yellow-700' },
  reviewed:   { label: '確認済', color: 'bg-blue-100 text-blue-700' },
  prescribed: { label: '処方済', color: 'bg-green-100 text-green-700' },
  rejected:   { label: '却下', color: 'bg-red-100 text-red-600' },
}

const CATEGORY_LABELS: Record<string, string> = {
  weight:    '体重管理',
  hair:      '抜け毛・薄毛',
  menopause: '更年期',
  skincare:  '医療スキンケア',
}

export default function DoctorPortalPage() {
  const router = useRouter()
  const [sessions, setSessions] = useState<StoredIntakeSession[]>([])
  const [allSessions, setAllSessions] = useState<StoredIntakeSession[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [catFilter, setCatFilter] = useState<string>('all')

  // Fetch all sessions once for stats
  useEffect(() => {
    fetch('/api/intake')
      .then(r => r.json())
      .then(data => setAllSessions(data))
      .catch(() => {})
  }, [])

  useEffect(() => {
    const params = new URLSearchParams()
    if (filter !== 'all') params.set('status', filter)
    if (catFilter !== 'all') params.set('category', catFilter)

    fetch(`/api/intake?${params}`)
      .then(r => r.json())
      .then(data => { setSessions(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [filter, catFilter])

  async function handleLogout() {
    await fetch('/api/doctor/auth', { method: 'DELETE' })
    router.push('/doctor/login')
  }

  const counts = sessions.reduce((acc, s) => {
    acc[s.status] = (acc[s.status] ?? 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Stats based on all sessions (unfiltered)
  const todayStr = new Date().toDateString()
  const stats = {
    total: allSessions.length,
    pending: allSessions.filter(s => s.status === 'pending').length,
    prescribed: allSessions.filter(s => s.status === 'prescribed').length,
    today: allSessions.filter(s => new Date(s.submittedAt).toDateString() === todayStr).length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar + main layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-60 min-h-screen bg-[#0C1A29] text-white flex flex-col">
          <div className="px-6 py-6 border-b border-white/10">
            <p className="text-xs text-white/40 font-semibold tracking-widest uppercase mb-1">medipic</p>
            <p className="font-bold text-lg">Doctor Portal</p>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1">
            {/* Status filters */}
            <p className="text-xs text-white/40 font-semibold tracking-wider uppercase px-2 mb-2">Status</p>
            {[
              { key: 'all', label: 'すべて', count: sessions.length },
              { key: 'pending',    label: '未確認',  count: counts.pending    ?? 0 },
              { key: 'reviewed',   label: '確認済',  count: counts.reviewed   ?? 0 },
              { key: 'prescribed', label: '処方済',  count: counts.prescribed ?? 0 },
              { key: 'rejected',   label: '却下',    count: counts.rejected   ?? 0 },
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  filter === key
                    ? 'bg-[#1E60C8] text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/8'
                }`}
              >
                <span>{label}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${filter === key ? 'bg-white/20' : 'bg-white/10'}`}>
                  {count}
                </span>
              </button>
            ))}

            <div className="pt-4">
              <p className="text-xs text-white/40 font-semibold tracking-wider uppercase px-2 mb-2">Category</p>
              {[
                { key: 'all', label: 'すべて' },
                { key: 'weight',    label: '体重管理' },
                { key: 'hair',      label: '抜け毛' },
                { key: 'menopause', label: '更年期' },
                { key: 'skincare',  label: 'スキン' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setCatFilter(key)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    catFilter === key
                      ? 'bg-[#1D7A4A] text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/8'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </nav>

          <div className="px-6 py-4 border-t border-white/10 space-y-2">
            <Link href="/" className="block text-xs text-white/40 hover:text-white/70 transition-colors">
              ← Patient Site
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left text-xs text-red-400/70 hover:text-red-400 transition-colors"
            >
              ログアウト
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-2xl border border-gray-100 p-4">
                <p className="text-xs text-gray-400 font-medium mb-1">全問診数</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-4">
                <p className="text-xs text-yellow-600 font-medium mb-1">未確認</p>
                <p className="text-2xl font-bold text-yellow-500">{stats.pending}</p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-4">
                <p className="text-xs text-green-600 font-medium mb-1">処方済</p>
                <p className="text-2xl font-bold text-green-500">{stats.prescribed}</p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-4">
                <p className="text-xs text-gray-400 font-medium mb-1">本日の受付</p>
                <p className="text-2xl font-bold text-gray-900">{stats.today}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">問診一覧</h1>
                <p className="text-gray-400 text-sm mt-1">患者から送信された問診票を確認・処方してください</p>
              </div>
              <div className="flex gap-2">
                {/* Summary stat chips */}
                {counts.pending > 0 && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm rounded-full font-medium">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                    {counts.pending}件 未確認
                  </span>
                )}
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-24 text-gray-400">
                <svg className="w-5 h-5 animate-spin mr-2" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                読み込み中...
              </div>
            ) : sessions.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                  </svg>
                </div>
                <p className="text-gray-400">問診データがありません</p>
                <p className="text-gray-300 text-sm mt-1">患者が問診を完了すると、ここに表示されます</p>
              </div>
            ) : (
              <div className="space-y-3">
                {sessions.map(s => (
                  <Link
                    key={s.sessionId}
                    href={`/doctor/${s.sessionId}`}
                    className="group block bg-white rounded-2xl border border-gray-100 px-6 py-5 hover:border-[#1E60C8]/30 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Category icon */}
                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-lg">
                          {{ weight: '⚖️', hair: '💆', menopause: '🌸', skincare: '✨' }[s.categoryId] ?? '💊'}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 group-hover:text-[#1E60C8] transition-colors">
                            {CATEGORY_LABELS[s.categoryId] ?? s.categoryId}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            ID: {s.sessionId.slice(-12)} · {new Date(s.submittedAt).toLocaleString('ja-JP', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {/* Risk flags */}
                        {s.riskFlags.length > 0 && (
                          <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-200">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                            {s.riskFlags.length}件 フラグ
                          </span>
                        )}
                        {/* Status badge */}
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${STATUS_LABELS[s.status]?.color ?? 'bg-gray-100 text-gray-500'}`}>
                          {STATUS_LABELS[s.status]?.label ?? s.status}
                        </span>
                        <svg className="w-4 h-4 text-gray-300 group-hover:text-[#1E60C8] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
