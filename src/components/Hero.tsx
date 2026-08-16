'use client'

import Image from "next/image"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { FloatingDock } from "@/components/ui/floating-dock"
import { SiGithub, SiLinkedin, SiWhatsapp } from "react-icons/si"
import { HiMail, HiDownload } from "react-icons/hi"
import { motion } from "motion/react"
import { useLanguage } from "@/contexts/LanguageContext"

export function Hero() {
  const { t } = useLanguage()

  const scrollToContact = (e?: React.MouseEvent) => {
    e?.preventDefault()
    const element = document.getElementById('contato')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const downloadCV = () => {
    const link = document.createElement('a')
    link.href = '/CurrículoLucas.pdf'
    link.download = 'Currículo_Lucas_Emanuel.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const socialLinks = [
    {
      title: "GitHub",
      icon: <SiGithub className="h-full w-full text-neutral-300" />,
      href: "https://github.com/lucasemanuel982",
    },
    {
      title: "LinkedIn",
      icon: <SiLinkedin className="h-full w-full text-neutral-300" />,
      href: "https://www.linkedin.com/in/lucasemanuell/",
    },
    {
      title: "WhatsApp",
      icon: <SiWhatsapp className="h-full w-full text-neutral-300" />,
      href: "https://wa.me/5583986436386",
    },
    {
      title: "E-mail",
      icon: <HiMail className="h-full w-full text-neutral-300" />,
      href: "#contato",
      onClick: scrollToContact,
    },
  ]

  return (
    <section className="min-h-[100dvh] flex items-center pt-[calc(3.5rem+env(safe-area-inset-top))] pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="relative order-2 lg:order-1"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.15 }}
              className="group relative w-full max-w-[min(100%,18rem)] sm:max-w-[20rem] lg:max-w-96 aspect-square rounded-full overflow-hidden shadow-2xl mx-auto"
            >
              <Image
                src="/Perfil2.webp"
                alt="Lucas Emanuel - Desenvolvedor Full Stack"
                fill
                sizes="(max-width: 640px) 70vw, (max-width: 1024px) 20rem, 384px"
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
              <div className="absolute inset-0 rounded-full border-2 border-brand-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150 blur-sm" />
              <div className="absolute inset-0 rounded-full border border-brand-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="mt-6 sm:mt-8"
            >
              <FloatingDock items={socialLinks} />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.25 }}
            className="space-y-6 sm:space-y-8 order-1 lg:order-2"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.25 }}
              className="text-base sm:text-lg md:text-xl leading-relaxed text-white"
            >
              <TextGenerateEffect
                words={t('hero.welcome')}
                duration={0.075}
                staggerDelay={0.0375}
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.55 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadCV}
              className="bg-brand-400 hover:bg-brand-500 text-white font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg transition-colors duration-150 inline-flex items-center gap-2 shadow-lg hover:shadow-brand-400/25 cursor-pointer touch-manipulation min-h-12 w-full sm:w-auto justify-center"
            >
              {t('hero.downloadCV')}
              <HiDownload className="w-5 h-5" aria-hidden="true" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
