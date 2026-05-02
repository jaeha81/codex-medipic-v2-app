'use client'

import { useRef, useState, useEffect } from 'react'

interface UseCountUpOptions {
  target: number
  suffix?: string
  duration?: number
  threshold?: number
}

export function useCountUp({ target, suffix = '', duration = 900, threshold = 0.6 }: UseCountUpOptions) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState('0' + suffix)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const run = () => {
      const startTime = performance.now()
      const step = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1)
        // ease-out cubic: 1 - (1 - progress)^3
        const eased = 1 - Math.pow(1 - progress, 3)
        const value = Math.round(target * eased)
        setDisplay(value + suffix)
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    if (!('IntersectionObserver' in window)) {
      run()
      return
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run()
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, suffix, duration, threshold])

  return { ref, display }
}
