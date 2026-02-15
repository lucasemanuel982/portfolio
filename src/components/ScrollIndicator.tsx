'use client'

import { motion, useScroll, useTransform } from "motion/react"
import { useEffect, useState } from "react"

export function ScrollIndicator() {
  const { scrollYProgress } = useScroll()
  const [isVisible, setIsVisible] = useState(false)

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-brand-400 via-brand-500 to-brand-400 origin-left"
      style={{ scaleX, opacity }}
    />
  )
}
