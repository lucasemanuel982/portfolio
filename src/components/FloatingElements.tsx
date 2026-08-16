'use client'

import { motion } from "motion/react"
import { useIsMobile } from "@/hooks/useIsMobile"
import { useHasMounted, usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

export function FloatingElements() {
  const mounted = useHasMounted()
  const isMobile = useIsMobile()
  const reduceMotion = usePrefersReducedMotion()

  // Same tree on server and first client paint — avoids hydration mismatch
  if (!mounted || isMobile || reduceMotion) {
    return null
  }

  const elements = [
    { id: 1, x: 10, y: 20, size: 4, delay: 0 },
    { id: 2, x: 80, y: 40, size: 6, delay: 0.25 },
    { id: 3, x: 20, y: 60, size: 3, delay: 0.5 },
    { id: 4, x: 70, y: 80, size: 5, delay: 0.75 },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          initial={{
            opacity: 0,
            scale: 0,
            x: `${element.x}%`,
            y: `${element.y}%`
          }}
          animate={{
            opacity: [0, 0.3, 0.6, 0.3, 0],
            scale: [0, 1, 1.2, 1, 0],
            y: [`${element.y}%`, `${element.y - 10}%`, `${element.y}%`],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 4,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute rounded-full bg-brand-400/20"
          style={{
            width: `${element.size * 4}px`,
            height: `${element.size * 4}px`,
          }}
        />
      ))}
    </div>
  )
}
