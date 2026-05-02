'use client'

import { useState, useCallback } from 'react'
import { initLIFF, getLINEProfile, IS_MOCK } from '@/lib/line'

export interface LINEProfile {
  userId: string
  displayName: string
  pictureUrl?: string
}

export interface UseLINEReturn {
  isLoggedIn: boolean
  profile: LINEProfile | null
  isLoading: boolean
  login: () => Promise<void>
  logout: () => void
}

export function useLINE(): UseLINEReturn {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [profile, setProfile] = useState<LINEProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = useCallback(async () => {
    setIsLoading(true)
    try {
      await initLIFF()
      const p = await getLINEProfile()
      if (p) {
        setProfile(p)
        setIsLoggedIn(true)
        if (IS_MOCK) {
          console.log('[LINE mock] Logged in as:', p.displayName)
        }
      }
    } catch (err) {
      console.error('[LINE] login error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    setProfile(null)
    if (IS_MOCK) {
      console.log('[LINE mock] Logged out')
    }
    // TODO: 実際連携時 — liff.logout() を呼ぶ
  }, [])

  return { isLoggedIn, profile, isLoading, login, logout }
}
