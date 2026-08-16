'use client'

import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react"
import { useState } from "react"
import { useHasMounted, usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

export function ScrollIndicator() {
  const { scrollYProgress, scrollY } = useScroll()
  const [isVisible, setIsVisible] = useState(false)
  const reduceMotion = usePrefersReducedMotion()
  const mounted = useHasMounted()

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > 100)
  })

  if (!mounted || reduceMotion) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-brand-400 via-brand-500 to-brand-400 origin-left pointer-events-none"
      style={{ scaleX, opacity }}
      aria-hidden="true"
    />
  )
}
