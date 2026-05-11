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

  async function handleConfirm() {
    if (selected === null) return
    const slot = t.booking.slots[selected]

    if (!isLoggedIn) {
      await login()
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

  if (confirmed && selected !== null) {
    const slot = t.booking.slots[selected]
    return (
      <div className="py-4 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#dff0e5] text-[#111111]">
          <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <p className="mt-4 text-lg font-semibold text-[#111111]">{slot.label}</p>
        <p className="mt-1 font-semibold text-[#07B53B]">{slot.time}</p>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-black/50">{t.booking.note}</p>
        {profile && (
          <p className="mt-2 text-xs text-black/38">
            Confirmed as <span className="font-medium">{profile.displayName}</span>
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="versed-label text-black/38">{t.booking.slotLabel}</p>

      <div className="space-y-2">
        {t.booking.slots.map((slot, i) => (
          <button
            key={`${slot.label}-${slot.time}`}
            onClick={() => setSelected(i)}
            className={[
              'flex w-full items-center gap-4 rounded-[4px] border p-4 text-left transition active:translate-y-px',
              selected === i
                ? 'border-[#7eb892]/45 bg-[#dff0e5]'
                : 'border-black/10 hover:border-black/20 hover:bg-[#fbfdf9]',
            ].join(' ')}
          >
            <span
              className={[
                'grid h-5 w-5 shrink-0 place-items-center rounded-full border',
                selected === i ? 'border-[#111111]' : 'border-black/20',
              ].join(' ')}
            >
              {selected === i && <span className="h-2.5 w-2.5 rounded-full bg-[#111111]" />}
            </span>
            <span className="flex-1">
              <span className="block text-sm font-semibold text-[#111111]">{slot.label}</span>
              <span className="mt-1 block text-sm text-black/50">{slot.time}</span>
            </span>
          </button>
        ))}
      </div>

      {notifyError && <p className="text-center text-sm text-red-500">{notifyError}</p>}

      <LineLoginButton
        fullWidth
        disabled={selected === null}
        loading={lineLoading || notifyLoading}
        onClick={handleConfirm}
      >
        {t.booking.confirm}
      </LineLoginButton>

      <p className="text-center text-xs leading-5 text-black/42">{t.booking.note}</p>
      <p className="text-center text-xs leading-5 text-black/42">
        {locale === 'ko'
          ? '예약 확정 후 처방약 결제로 이동합니다.'
          : locale === 'ja'
            ? '予約確定後、処方薬のお支払いに進みます。'
            : 'Proceed to medication payment after booking is confirmed.'}
      </p>
    </div>
  )
}
