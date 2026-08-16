'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'

/** Matches SSR (false) until after mount, then reflects prefers-reduced-motion. */
export function usePrefersReducedMotion() {
  const reduceMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted ? !!reduceMotion : false
}

export function useHasMounted() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}
