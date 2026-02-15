'use client'

import { motion, AnimatePresence } from "motion/react"
import { useState, useEffect } from "react"
import { IconChevronUp } from "@tabler/icons-react"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Mostra o botão quando o usuário rolar mais de 300px para baixo
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    const startTime = Date.now()
    const duration = 400 // 400ms de duração
    const startPosition = window.scrollY

    // Função de easing suave (ease-out)
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    const animateScroll = () => {
      const currentTime = Date.now()
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      const easedProgress = easeOutCubic(progress)
      const currentPosition = startPosition * (1 - easedProgress)

      window.scrollTo(0, currentPosition)

      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      }
    }

    requestAnimationFrame(animateScroll)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.15, ease: "easeOut" }
          }}
          whileTap={{
            scale: 0.95,
            transition: { duration: 0.05 }
          }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-brand-500 hover:bg-brand-600 text-white rounded-full shadow-lg border border-brand-400 transition-all duration-150 group cursor-pointer"
          aria-label="Voltar ao topo"
        >
          {/* Ícone com animação de subida */}
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{
              duration: 0.75,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <IconChevronUp className="w-6 h-6" />
          </motion.div>

          {/* Efeito de brilho no hover */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-400 to-brand-600 opacity-0 group-hover:opacity-20 transition-opacity duration-150" />

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-100 whitespace-nowrap">
            Voltar ao topo
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
