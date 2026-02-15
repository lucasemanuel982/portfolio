'use client'

import { motion } from "motion/react"

export function FloatingElements() {

  const elements = [
    { id: 1, x: 10, y: 20, size: 4, delay: 0 },
    { id: 2, x: 80, y: 40, size: 6, delay: 0.25 },
    { id: 3, x: 20, y: 60, size: 3, delay: 0.5 },
    { id: 4, x: 70, y: 80, size: 5, delay: 0.75 },
    { id: 5, x: 30, y: 10, size: 4, delay: 1 },
    { id: 6, x: 90, y: 70, size: 3, delay: 1.25 },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
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

      {/* Elementos maiores com movimento mais lento */}
      <motion.div
        initial={{ opacity: 0, scale: 0, x: "15%", y: "30%" }}
        animate={{
          opacity: [0, 0.1, 0.2, 0.1, 0],
          scale: [0, 1, 1.5, 1, 0],
          y: ["30%", "25%", "35%", "30%"],
          rotate: [0, 90, 180, 270, 360]
        }}
        transition={{
          duration: 6,
          delay: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute rounded-full bg-purple-400/10"
        style={{ width: "60px", height: "60px" }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0, x: "75%", y: "60%" }}
        animate={{
          opacity: [0, 0.15, 0.25, 0.15, 0],
          scale: [0, 1, 1.3, 1, 0],
          y: ["60%", "55%", "65%", "60%"],
          rotate: [0, -90, -180, -270, -360]
        }}
        transition={{
          duration: 5,
          delay: 0.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute rounded-full bg-cyan-400/10"
        style={{ width: "40px", height: "40px" }}
      />
    </div>
  )
}
