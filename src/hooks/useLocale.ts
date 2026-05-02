'use client'

import { useState, useEffect } from 'react'
import type { Locale } from '@/i18n'

const STORAGE_KEY = 'medipic_locale'

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'en'
  }

  const saved = localStorage.getItem(STORAGE_KEY)
  return saved === 'en' || saved === 'ja' ? saved : 'en'
}

export function useLocale(): [Locale, (l: Locale) => void] {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)

  useEffect(() => {
    document.documentElement.lang = locale
    localStorage.setItem(STORAGE_KEY, locale)
  }, [locale])

  function setLocale(l: Locale) {
    setLocaleState(l)
  }

  return [locale, setLocale]
}
