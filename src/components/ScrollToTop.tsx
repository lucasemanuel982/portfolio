'use client'

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react"
import { useState } from "react"
import { IconChevronUp } from "@tabler/icons-react"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollY } = useScroll()
  const reduceMotion = usePrefersReducedMotion()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > 300)
  })

  const scrollToTop = () => {
    if (reduceMotion) {
      window.scrollTo(0, 0)
      return
    }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={
            reduceMotion
              ? undefined
              : {
                  scale: 1.1,
                  transition: { duration: 0.15, ease: "easeOut" },
                }
          }
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed z-50 p-3 bg-brand-500 hover:bg-brand-600 text-white rounded-full shadow-lg border border-brand-400 transition-colors duration-150 group cursor-pointer touch-manipulation bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.5rem,env(safe-area-inset-right))]"
          aria-label="Voltar ao topo"
        >
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -2, 0] }}
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: 0.75,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          >
            <IconChevronUp className="w-6 h-6" aria-hidden="true" />
          </motion.div>

          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-400 to-brand-600 opacity-0 group-hover:opacity-20 transition-opacity duration-150" />

          <div className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-100 whitespace-nowrap">
            Voltar ao topo
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
