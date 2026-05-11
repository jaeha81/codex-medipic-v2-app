'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { StoredIntakeSession } from '@/lib/storage'

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  pending: { label: 'Pending', className: 'border-[#c79a2f]/25 bg-[#fff8e6] text-[#7a5a12]' },
  reviewed: { label: 'Reviewed', className: 'border-[#1e60c8]/20 bg-[#eef4ff] text-[#1e60c8]' },
  prescribed: { label: 'Prescribed', className: 'border-[#1d7a4a]/20 bg-[#ecf8f1] text-[#1d7a4a]' },
  rejected: { label: 'Rejected', className: 'border-red-200 bg-red-50 text-red-600' },
}

const CATEGORY_LABELS: Record<string, string> = {
  weight: 'Weight Care',
  hair: 'Hair Care',
  menopause: 'Menopause Care',
  skincare: 'Medical Skincare',
}

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'reviewed', label: 'Reviewed' },
  { key: 'prescribed', label: 'Prescribed' },
  { key: 'rejected', label: 'Rejected' },
]

const CATEGORIES = [
  { key: 'all', label: 'All categories' },
  { key: 'weight', label: 'Weight' },
  { key: 'hair', label: 'Hair' },
  { key: 'menopause', label: 'Menopause' },
  { key: 'skincare', label: 'Skincare' },
]

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5 15.75 12l-7.5 7.5" />
    </svg>
  )
}

export default function DoctorPortalPage() {
  const router = useRouter()
  const [sessions, setSessions] = useState<StoredIntakeSession[]>([])
  const [allSessions, setAllSessions] = useState<StoredIntakeSession[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [catFilter, setCatFilter] = useState<string>('all')

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
      .then(data => {
        setSessions(data)
        setLoading(false)
      })
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

  const todayStr = new Date().toDateString()
  const stats = {
    total: allSessions.length,
    pending: allSessions.filter(s => s.status === 'pending').length,
    prescribed: allSessions.filter(s => s.status === 'prescribed').length,
    today: allSessions.filter(s => new Date(s.submittedAt).toDateString() === todayStr).length,
  }

  return (
    <div className="min-h-[100dvh] bg-[#fbfdf9] text-[#111111]">
      <header className="border-b border-black/8 px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between">
          <div>
            <Link href="/" className="text-xl font-semibold tracking-tight">
              medipic.
            </Link>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-black/38">doctor portal</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-[6px] border border-black/10 px-4 py-2 text-sm font-medium text-black/58 transition hover:bg-white hover:text-black"
          >
            Log out
          </button>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1240px] gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[260px_1fr] lg:py-10">
        <aside className="space-y-6">
          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/38">Status</p>
            <div className="mt-3 space-y-1">
              {FILTERS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={[
                    'flex w-full items-center justify-between rounded-[6px] px-3 py-2 text-sm transition',
                    filter === key ? 'bg-[#111111] text-white' : 'text-black/58 hover:bg-white hover:text-black',
                  ].join(' ')}
                >
                  <span>{label}</span>
                  <span className="text-xs opacity-70">{key === 'all' ? sessions.length : counts[key] ?? 0}</span>
                </button>
              ))}
            </div>
          </section>

          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/38">Category</p>
            <div className="mt-3 space-y-1">
              {CATEGORIES.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setCatFilter(key)}
                  className={[
                    'w-full rounded-[6px] px-3 py-2 text-left text-sm transition',
                    catFilter === key ? 'bg-[#1d7a4a] text-white' : 'text-black/58 hover:bg-white hover:text-black',
                  ].join(' ')}
                >
                  {label}
                </button>
              ))}
            </div>
          </section>
        </aside>

        <section>
          <div className="grid gap-3 sm:grid-cols-4">
            {[
              { label: 'Total intakes', value: stats.total },
              { label: 'Pending review', value: stats.pending },
              { label: 'Prescribed', value: stats.prescribed },
              { label: 'Today', value: stats.today },
            ].map((item) => (
              <div key={item.label} className="border-t border-black/10 pt-3">
                <p className="text-xs font-medium text-black/42">{item.label}</p>
                <p className="mt-1 text-2xl font-semibold tracking-normal">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/42">Clinical queue</p>
              <h1 className="mt-3 text-3xl font-medium tracking-normal">Review submitted intakes</h1>
            </div>
            <p className="max-w-sm text-sm leading-6 text-black/50">
              Filter by status or category, then open a case to review answers, risk flags, and prescription notes.
            </p>
          </div>

          <div className="mt-6">
            {loading ? (
              <div className="rounded-[6px] border border-black/8 bg-white p-10 text-center text-sm text-black/42">
                Loading intake queue...
              </div>
            ) : sessions.length === 0 ? (
              <div className="rounded-[6px] border border-black/8 bg-white p-10 text-center">
                <p className="text-base font-medium">No intakes found</p>
                <p className="mt-2 text-sm text-black/42">Try another status or category filter.</p>
              </div>
            ) : (
              <div className="divide-y divide-black/8 rounded-[6px] border border-black/8 bg-white shadow-[0_18px_70px_rgba(17,17,17,0.08)]">
                {sessions.map(s => (
                  <Link
                    key={s.sessionId}
                    href={`/doctor/${s.sessionId}`}
                    className="group grid gap-4 px-5 py-4 transition hover:bg-[#fbfaf7] sm:grid-cols-[1fr_auto] sm:items-center"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium">{CATEGORY_LABELS[s.categoryId] ?? s.categoryId}</p>
                        <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${STATUS_LABELS[s.status]?.className ?? 'border-black/10 bg-gray-50 text-black/50'}`}>
                          {STATUS_LABELS[s.status]?.label ?? s.status}
                        </span>
                        {s.riskFlags.length > 0 && (
                          <span className="rounded-full border border-[#c79a2f]/25 bg-[#fff8e6] px-2.5 py-1 text-xs font-semibold text-[#7a5a12]">
                            {s.riskFlags.length} risk flag{s.riskFlags.length > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-xs text-black/42">
                        ID {s.sessionId.slice(-12)} · {new Date(s.submittedAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-black/42 transition group-hover:text-black">
                      Open case <ArrowIcon />
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
