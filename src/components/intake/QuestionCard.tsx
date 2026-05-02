'use client'

import { useState, useRef } from 'react'
import type { Question } from '@/data/questions'
import { getActiveFlag } from '@/lib/contraindications'
import { Button } from '@/components/ui/Button'
import { ContraindicationBanner } from './ContraindicationBanner'
import type { Translations } from '@/i18n/en'
import type { Locale } from '@/i18n'

interface QuestionCardProps {
  question: Question
  value: string | string[] | undefined
  locale: Locale
  t: Translations
  onRespond: (value: string | string[]) => void
  onNext: () => void
  onBack: () => void
  isFirst: boolean
  isLast: boolean
}

export function QuestionCard({ question, value, locale, t, onRespond, onNext, onBack, isFirst, isLast }: QuestionCardProps) {
  const [heightVal, setHeightVal] = useState(() =>
    typeof value === 'string' && value.includes('|') ? value.split('|')[0] : ''
  )
  const [weightVal, setWeightVal] = useState(() =>
    typeof value === 'string' && value.includes('|') ? value.split('|')[1] : ''
  )
  const [consentChecked, setConsentChecked] = useState(value === 'agreed')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const questionText = locale === 'ja'
    ? question.textJa
    : locale === 'ko'
      ? (question.textKo ?? question.textEn)
      : question.textEn
  const questionHint = locale === 'ja'
    ? question.hintJa
    : locale === 'ko'
      ? (question.hintKo ?? question.hintEn)
      : question.hintEn

  const activeFlag = getActiveFlag(question, value)
  const isBlocked = activeFlag?.severity === 'block'

  const canProceed = (() => {
    if (isBlocked) return false
    if (!question.required) return true
    if (question.type === 'consent') return value === 'agreed'
    if (question.type === 'height_weight') {
      return parseFloat(heightVal) > 0 && parseFloat(weightVal) > 0
    }
    if (question.type === 'multi') return Array.isArray(value) && value.length > 0
    return !!value
  })()

  function handleSingleSelect(optionValue: string) {
    onRespond(optionValue)
    if (!getActiveFlag(question, optionValue)) setTimeout(onNext, 200)
  }

  function handleMultiToggle(optionValue: string) {
    const current = Array.isArray(value) ? value : []
    const next = current.includes(optionValue)
      ? current.filter(v => v !== optionValue)
      : [...current, optionValue]
    onRespond(next)
  }

  function handleHeightWeightNext() {
    const h = parseFloat(heightVal)
    const w = parseFloat(weightVal)
    if (h > 0 && w > 0) { onRespond(`${h}|${w}`); onNext() }
  }

  function handleConsentToggle() {
    const newVal = !consentChecked
    setConsentChecked(newVal)
    onRespond(newVal ? 'agreed' : '')
  }

  // ── Height / Weight ──────────────────────────────────────────────────────
  if (question.type === 'height_weight') {
    const h = parseFloat(heightVal)
    const w = parseFloat(weightVal)
    const bmi = h > 0 && w > 0 ? (w / ((h / 100) ** 2)).toFixed(1) : null
    return (
      <div className="space-y-6">
        <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">{questionText}</p>
        {questionHint && <p className="text-sm text-gray-500">{questionHint}</p>}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.intake.height}</label>
            <input type="number" value={heightVal} onChange={e => setHeightVal(e.target.value)} placeholder="165"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:border-primary focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.intake.weight}</label>
            <input type="number" value={weightVal} onChange={e => setWeightVal(e.target.value)} placeholder="60"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:border-primary focus:outline-none" />
          </div>
        </div>
        {bmi && (
          <div className="bg-bg-warm rounded-xl px-4 py-3 flex items-center gap-2">
            <span className="text-sm text-gray-600">{t.intake.bmi}:</span>
            <span className="font-bold text-primary text-lg">{bmi}</span>
          </div>
        )}
        <ActionRow onBack={onBack} onNext={handleHeightWeightNext} canProceed={canProceed} isFirst={isFirst} isLast={isLast} t={t} />
      </div>
    )
  }

  // ── Date (custom 3-select picker) ────────────────────────────────────────
  if (question.type === 'date') {
    const dateStr = typeof value === 'string' ? value : ''
    const [yyyy, mm, dd] = dateStr ? dateStr.split('-') : ['', '', '']
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i)
    const days = Array.from({ length: 31 }, (_, i) => i + 1)
    const intlLocale = locale === 'ja' ? 'ja-JP' : locale === 'ko' ? 'ko-KR' : 'en-US'
    const monthNames = Array.from({ length: 12 }, (_, i) =>
      new Intl.DateTimeFormat(intlLocale, { month: 'long' }).format(new Date(2000, i, 1))
    )
    function handleDatePart(part: 'y' | 'm' | 'd', val: string) {
      const y = part === 'y' ? val : (yyyy || '')
      const m = part === 'm' ? val : (mm || '')
      const day = part === 'd' ? val : (dd || '')
      if (y && m && day) onRespond(`${y}-${m.padStart(2, '0')}-${day.padStart(2, '0')}`)
      else onRespond(`${y}-${m}-${day}`)
    }
    const sel = 'flex-1 border-2 border-gray-200 rounded-xl px-3 py-3 text-base focus:border-primary focus:outline-none bg-white appearance-none cursor-pointer'
    return (
      <div className="space-y-6">
        <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">{questionText}</p>
        <div className="flex gap-2">
          <select value={yyyy} onChange={e => handleDatePart('y', e.target.value)} className={sel}>
            <option value="">{locale === 'ja' ? '年' : locale === 'ko' ? '년' : 'Year'}</option>
            {years.map(y => <option key={y} value={String(y)}>{locale === 'ja' ? `${y}年` : locale === 'ko' ? `${y}년` : y}</option>)}
          </select>
          <select value={mm} onChange={e => handleDatePart('m', e.target.value)} className={sel}>
            <option value="">{locale === 'ja' ? '月' : locale === 'ko' ? '월' : 'Month'}</option>
            {monthNames.map((name, i) => (
              <option key={i + 1} value={String(i + 1)}>{locale === 'ja' ? `${i + 1}月` : locale === 'ko' ? `${i + 1}월` : name}</option>
            ))}
          </select>
          <select value={dd} onChange={e => handleDatePart('d', e.target.value)} className={sel}>
            <option value="">{locale === 'ja' ? '日' : locale === 'ko' ? '일' : 'Day'}</option>
            {days.map(d => <option key={d} value={String(d)}>{locale === 'ja' ? `${d}日` : locale === 'ko' ? `${d}일` : d}</option>)}
          </select>
        </div>
        <ActionRow onBack={onBack} onNext={onNext} canProceed={canProceed} isFirst={isFirst} isLast={isLast} t={t} />
      </div>
    )
  }

  // ── Text ─────────────────────────────────────────────────────────────────
  if (question.type === 'text') {
    return (
      <div className="space-y-6">
        <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">{questionText}</p>
        <textarea value={typeof value === 'string' ? value : ''} onChange={e => onRespond(e.target.value)}
          placeholder={t.intake.typeAnswer} rows={4}
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base focus:border-primary focus:outline-none resize-none" />
        <ActionRow onBack={onBack} onNext={onNext} canProceed={canProceed} isFirst={isFirst} isLast={isLast} t={t} />
      </div>
    )
  }

  // ── Upload ───────────────────────────────────────────────────────────────
  if (question.type === 'upload') {
    const uploadedUrl = typeof value === 'string' && value ? value : null
    const displayName = uploadedUrl ? uploadedUrl.split('/').pop() ?? uploadedUrl : null

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
      const f = e.target.files?.[0]
      if (!f) return
      setUploading(true)
      setUploadError(null)
      try {
        const form = new FormData()
        form.append('file', f)
        const res = await fetch('/api/upload', { method: 'POST', body: form })
        const data = await res.json() as { success: boolean; url?: string; error?: string }
        if (!res.ok || !data.success || !data.url) {
          setUploadError(t.intake.uploadError ?? 'Upload failed')
        } else {
          onRespond(data.url)
        }
      } catch {
        setUploadError(t.intake.uploadError ?? 'Upload failed')
      } finally {
        setUploading(false)
        // reset input so same file can be re-selected after error
        if (fileInputRef.current) fileInputRef.current.value = ''
      }
    }

    return (
      <div className="space-y-6">
        <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">{questionText}</p>
        {questionHint && <p className="text-sm text-gray-500">{questionHint}</p>}
        <button
          onClick={() => !uploading && fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center gap-3 hover:border-primary hover:bg-bg-warm transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            {uploading
              ? <svg className="w-6 h-6 text-primary animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>
              : uploadedUrl
                ? <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                : <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
            }
          </div>
          <span className="text-sm font-medium text-gray-600">
            {uploading ? (t.intake.uploading ?? 'Uploading...') : displayName ? displayName : t.intake.uploadHint}
          </span>
        </button>
        {uploadError && <p className="text-sm text-red-500 text-center">{uploadError}</p>}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          className="hidden"
          onChange={handleFileChange}
        />
        <ActionRow onBack={onBack} onNext={onNext} canProceed={canProceed} isFirst={isFirst} isLast={isLast} t={t} />
      </div>
    )
  }

  // ── Consent ──────────────────────────────────────────────────────────────
  if (question.type === 'consent') {
    return (
      <div className="space-y-6">
        <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">{questionText}</p>
        {questionHint && (
          <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 leading-relaxed border border-gray-100">
            {questionHint}
          </div>
        )}
        <label className="flex items-start gap-3 cursor-pointer group">
          <input type="checkbox" checked={consentChecked} onChange={handleConsentToggle}
            className="mt-1 w-5 h-5 accent-[#1E60C8] cursor-pointer" />
          <span className="text-base font-medium text-gray-800 group-hover:text-primary transition-colors">
            {t.intake.agree}
          </span>
        </label>
        <ActionRow onBack={onBack} onNext={onNext} canProceed={canProceed} isFirst={isFirst} isLast={isLast} t={t} />
      </div>
    )
  }

  // ── Multi-select ─────────────────────────────────────────────────────────
  if (question.type === 'multi') {
    const selectedValues = Array.isArray(value) ? value : []
    return (
      <div className="space-y-6">
        <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">{questionText}</p>
        <div className="space-y-2">
          {question.options?.map(opt => {
            const label = locale === 'ja' ? opt.labelJa : locale === 'ko' ? (opt.labelKo ?? opt.labelEn) : opt.labelEn
            const isSelected = selectedValues.includes(opt.value)
            return (
              <button key={opt.value} onClick={() => handleMultiToggle(opt.value)}
                className={['w-full flex items-center gap-3 border-2 rounded-xl px-4 py-3 transition-all text-left',
                  isSelected ? 'border-primary bg-bg-warm text-primary font-semibold' : 'border-gray-200 text-gray-800 hover:border-primary hover:bg-bg-warm'].join(' ')}>
                <span className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-primary bg-primary' : 'border-gray-300'}`}>
                  {isSelected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>}
                </span>
                {label}
              </button>
            )
          })}
        </div>
        {activeFlag && <ContraindicationBanner rule={activeFlag} locale={locale} t={t} onBack={onBack} />}
        <ActionRow onBack={onBack} onNext={onNext} canProceed={canProceed} isFirst={isFirst} isLast={isLast} t={t} />
      </div>
    )
  }

  // ── Single-select (default) ───────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">{questionText}</p>
      <div className="space-y-2">
        {question.options?.map(opt => {
          const label = locale === 'ja' ? opt.labelJa : opt.labelEn
          const isSelected = value === opt.value
          const thisFlag = getActiveFlag(question, opt.value)
          return (
            <button key={opt.value} onClick={() => handleSingleSelect(opt.value)}
              className={['w-full flex items-center gap-3 border-2 rounded-xl px-4 py-3.5 transition-all text-left',
                isSelected ? 'border-primary bg-bg-warm font-semibold' : 'border-gray-200 text-gray-800 hover:border-primary hover:bg-bg-warm',
                thisFlag?.severity === 'block' && isSelected ? 'border-red-300 bg-danger' : ''].join(' ')}>
              <span className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${isSelected ? 'border-primary' : 'border-gray-300'}`}>
                {isSelected && <span className="w-2.5 h-2.5 bg-primary rounded-full" />}
              </span>
              <span className="flex-1">{label}</span>
              {thisFlag && (
                <span className="flex-shrink-0">
                  {thisFlag.severity === 'block'
                    ? <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                    : <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
                  }
                </span>
              )}
            </button>
          )
        })}
      </div>
      {activeFlag && <ContraindicationBanner rule={activeFlag} locale={locale} t={t} onBack={onBack} />}
      {!isBlocked && <ActionRow onBack={onBack} onNext={onNext} canProceed={canProceed} isFirst={isFirst} isLast={isLast} t={t} />}
    </div>
  )
}

function ActionRow({ onBack, onNext, canProceed, isFirst, isLast, t }: {
  onBack: () => void; onNext: () => void; canProceed: boolean; isFirst: boolean; isLast: boolean; t: Translations
}) {
  return (
    <div className="flex items-center gap-3 pt-2">
      {!isFirst && (
        <Button variant="ghost" size="md" onClick={onBack}>← {t.intake.back}</Button>
      )}
      <Button variant="primary" size="md" onClick={onNext} disabled={!canProceed || undefined} className="ml-auto">
        {isLast ? t.intake.complete : t.intake.next} →
      </Button>
    </div>
  )
}
