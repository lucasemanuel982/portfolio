'use client'

import { motion } from "motion/react"
import { useRouter } from "next/navigation"
import { HiHome } from "react-icons/hi"
import Image from "next/image"
import { AnimatedBackground } from "@/components/AnimatedBackground"
import Footer from "@/components/Footer"

export default function NotFound() {
  const router = useRouter()

  const goHome = () => {
    router.push('/')
  }

  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />
      <div className="relative z-10 min-h-screen">

        {/* Header simplificado - apenas logo */}
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10 w-full overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 w-full">
            <div className="flex items-center justify-center h-14 sm:h-16 min-w-0">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-2 sm:gap-3 min-w-0 flex-shrink-0"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden shadow-lg ring-1 sm:ring-2 ring-brand-400/30 ring-offset-1 sm:ring-offset-2 ring-offset-black/50 flex-shrink-0"
                >
                  <Image
                    src="/Perfil.png"
                    alt="Lucas Emanuel - Desenvolvedor Full Stack"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                    quality={100}
                  />
                </motion.div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="font-bold text-sm sm:text-lg bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent whitespace-nowrap truncate"
                >
                  Lucas Emanuel
                </motion.span>
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Conteúdo principal */}
        <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">

            {/* Número 404 com animação */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8"
            >
              <motion.h1
                className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: "200% 200%"
                }}
              >
                404
              </motion.h1>
            </motion.div>

            {/* Título */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Página não encontrada
            </motion.h2>

            {/* Descrição */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Ops! Parece que você se perdeu no espaço digital. A página que você está procurando não existe ou foi movida.
            </motion.p>

            {/* Botões de ação */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex justify-center items-center"
            >
              {/* Botão Home */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={goHome}
                className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-brand-500/25 cursor-pointer min-w-[200px]"
              >
                <HiHome className="w-5 h-5" />
                Voltar ao Início
              </motion.button>
            </motion.div>

            {/* Elementos decorativos */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-16 flex justify-center space-x-4"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-brand-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </motion.div>

            {/* Texto adicional */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-8 text-sm text-gray-500"
            >
              Se você acredita que isso é um erro, entre em contato comigo através da página de contato.
            </motion.p>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  )
}
