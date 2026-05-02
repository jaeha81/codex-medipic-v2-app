'use client'

import { useState } from 'react'
import { LineLoginButton } from '@/components/ui/LineLoginButton'
import { useLINE } from '@/hooks/useLINE'
import type { Translations } from '@/i18n/en'
import type { Locale } from '@/i18n'

interface BookingSlotsProps {
  t: Translations
  locale?: Locale
  sessionId?: string
}

export function BookingSlots({ t, locale, sessionId = 'unknown' }: BookingSlotsProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [notifyLoading, setNotifyLoading] = useState(false)
  const [notifyError, setNotifyError] = useState<string | null>(null)

  const { isLoggedIn, profile, login, isLoading: lineLoading } = useLINE()

  /** スロット確定 + LINE notify POST */
  async function handleConfirm() {
    if (selected === null) return
    const slot = t.booking.slots[selected]

    // LINE 未ログインならまずログイン
    if (!isLoggedIn) {
      await login()
      // login() 後に isLoggedIn が更新されるが、この関数内では反映されないため
      // ユーザーにもう一度ボタンを押させる（次回は isLoggedIn=true で通過）
      return
    }

    setNotifyLoading(true)
    setNotifyError(null)

    try {
      const res = await fetch('/api/line/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          slotLabel: `${slot.label} ${slot.time}`,
          userId: profile?.userId,
        }),
      })

      const data = (await res.json()) as { success: boolean; error?: string }

      if (!data.success) {
        setNotifyError(data.error ?? 'Failed to send LINE notification.')
        return
      }

      setConfirmed(true)
    } catch (err) {
      console.error('[BookingSlots] notify error:', err)
      setNotifyError('Network error. Please try again.')
    } finally {
      setNotifyLoading(false)
    }
  }

  /* ── 予約確定済み画面 ──────────────────────────────── */
  if (confirmed && selected !== null) {
    const slot = t.booking.slots[selected]
    return (
      <div className="text-center space-y-4 py-4">
        <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto">
          <svg
            className="w-7 h-7 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <div>
          <p className="text-lg font-bold text-gray-900">{slot.label}</p>
          <p className="text-[#07B53B] font-semibold">{slot.time}</p>
        </div>
        <p className="text-sm text-gray-500">{t.booking.note}</p>
        {profile && (
          <p className="text-xs text-gray-400">
            Confirmed as <span className="font-medium">{profile.displayName}</span>
          </p>
        )}
      </div>
    )
  }

  /* ── スロット選択画面 ──────────────────────────────── */
  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
        {t.booking.slotLabel}
      </p>

      <div className="space-y-3">
        {t.booking.slots.map((slot, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={[
              'w-full flex items-center gap-4 border-2 rounded-2xl p-4 transition-all text-left',
              selected === i
                ? 'border-primary bg-bg-warm shadow-sm'
                : 'border-gray-200 hover:border-primary hover:bg-bg-warm',
            ].join(' ')}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                selected === i ? 'border-primary' : 'border-gray-300'
              }`}
            >
              {selected === i && <span className="w-2.5 h-2.5 bg-primary rounded-full" />}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{slot.label}</p>
              <p className="text-sm text-gray-500">{slot.time}</p>
            </div>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5"
              />
            </svg>
          </button>
        ))}
      </div>

      {/* エラーメッセージ */}
      {notifyError && (
        <p className="text-sm text-red-500 text-center">{notifyError}</p>
      )}

      <LineLoginButton
        fullWidth
        disabled={selected === null}
        loading={lineLoading || notifyLoading}
        onClick={handleConfirm}
      >
        {t.booking.confirm}
      </LineLoginButton>

      <p className="text-xs text-center text-gray-400">{t.booking.note}</p>

      {/* 결제 안내 */}
      <p className="text-xs text-center text-gray-400 mt-1">
        {locale === 'ko'
          ? '예약 확정 후 약품 결제를 진행해주세요'
          : locale === 'ja'
          ? '予約確定後、お薬のお支払いをお進みください'
          : 'Proceed to medication payment after booking is confirmed'}
      </p>
    </div>
  )
}
