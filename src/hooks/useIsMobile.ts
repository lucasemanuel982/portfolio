'use client'

import { useEffect, useState } from 'react'

const MOBILE_MQ = '(max-width: 767px)'

/**
 * Always false during SSR and the first client render to avoid hydration mismatch.
 * Updates after mount via matchMedia.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const mql = window.matchMedia(MOBILE_MQ)
    const update = () => setIsMobile(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])

  return mounted ? isMobile : false
}
