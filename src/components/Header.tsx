'use client'

import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { useState, useEffect } from "react"
import { useLanguage, Language } from "@/contexts/LanguageContext"
import { ThemeColorPicker } from "@/components/ThemeColorPicker"

export function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isManualScroll, setIsManualScroll] = useState(false)

  const menuItems = [
    { id: 'home', label: t('header.home'), href: '#home' },
    { id: 'sobre', label: t('header.about'), href: '#sobre' },
    { id: 'skills', label: t('header.skills'), href: '#skills' },
    { id: 'projetos', label: t('header.projects'), href: '#projetos' },
    { id: 'contato', label: t('header.contact'), href: '#contato' }
  ]

  const flags = [
    {
      code: 'pt',
      label: 'Português',
      icon: (
        <svg width="24" height="16" viewBox="0 0 24 16" className="rounded-sm shadow-sm">
          <rect width="24" height="16" fill="#009c3b" />
          <polygon points="12,14 22,8 12,2 2,8" fill="#ffdf00" />
          <circle cx="12" cy="8" r="3.5" fill="#002776" />
        </svg>
      )
    },
    {
      code: 'en',
      label: 'English',
      icon: (
        <svg width="24" height="16" viewBox="0 0 24 16" className="rounded-sm shadow-sm">
          <rect width="24" height="16" fill="#B22234" />
          <path d="M0 0h24v2.5h-24zm0 5h24v2.5h-24zm0 5h24v2.5h-24z" fill="#fff" />
          <rect width="10" height="8" fill="#3C3B6E" />
        </svg>
      )
    },
    {
      code: 'es',
      label: 'Español',
      icon: (
        <svg width="24" height="16" viewBox="0 0 24 16" className="rounded-sm shadow-sm">
          <rect width="24" height="16" fill="#AA151B" />
          <rect y="4" width="24" height="8" fill="#F1BF00" />
        </svg>
      )
    }
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Função para scroll suave
  const scrollToSection = (sectionId: string) => {
    setIsManualScroll(true)
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
      setTimeout(() => {
        setIsManualScroll(false)
      }, 1000)
    }
  }

  // Detecção da seção ativa baseada no scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isManualScroll) return

      const sections = ['home', 'sobre', 'skills', 'projetos', 'contato']
      const scrollPosition = window.scrollY + 100

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isManualScroll])

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10 w-full"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-14 sm:h-16 min-w-0">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.125, delay: 0.05 }}
            className="flex items-center gap-2 sm:gap-3 min-w-0 flex-shrink-0"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.05 }}
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
              transition={{ delay: 0.1 }}
              className="font-bold text-sm sm:text-lg bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent whitespace-nowrap truncate"
            >
              Lucas Emanuel
            </motion.span>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.125, delay: 0.1 }}
            className="hidden md:flex items-center gap-8"
          >
            {menuItems.map((item, index) => (
              <motion.button
                key={`desktop-${item.id}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.125 + index * 0.025 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  scrollToSection(item.id)
                }}
                className={`
                  relative px-4 py-2 text-sm font-medium transition-all duration-150 group
                  ${activeSection === item.id
                    ? 'text-brand-400'
                    : 'text-gray-300 hover:text-white'
                  }
                `}
              >
                <span className="relative z-10">{item.label}</span>

                {/* Background hover effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-brand-500/20 to-brand-400/20 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.075 }}
                />

                {/* Active indicator */}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-brand-500/30 to-brand-400/30"
                    initial={false}
                    transition={{ type: "spring", stiffness: 800, damping: 40 }}
                  />
                )}

                {/* Bottom border */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-brand-400 to-brand-300"
                  initial={{ width: 0 }}
                  animate={{ width: activeSection === item.id ? "100%" : 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.075 }}
                />
              </motion.button>
            ))}
          </motion.nav>

          {/* Language Flags */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.125, delay: 0.2 }}
            className="flex items-center gap-3 sm:gap-4 ml-auto md:ml-0 mr-4 md:mr-0"
          >
            {flags.map((flag) => (
              <motion.button
                key={flag.code}
                onClick={() => setLanguage(flag.code as Language)}

                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative flex items-center justify-center rounded-sm overflow-hidden transition-all duration-200 outline-none
                  ${language === flag.code
                    ? 'ring-2 ring-brand-400 shadow-[0_0_12px_var(--color-brand-500)] z-10 scale-110'
                    : 'opacity-50 hover:opacity-100 grayscale hover:grayscale-0'
                  }
                `}
                title={flag.label}
              >
                {flag.icon}
                {language === flag.code && (
                  <motion.div
                    layoutId="activeFlag"
                    className="absolute inset-0 bg-brand-500/10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Theme Color Picker */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.125, delay: 0.25 }}
            className="flex items-center ml-2 sm:ml-4 mr-2"
          >
            <ThemeColorPicker />
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.125, delay: 0.15 }}
            onClick={toggleMobileMenu}
            className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center group flex-shrink-0"
          >
            <motion.span
              key="hamburger-top"
              className="block w-6 h-0.5 bg-white rounded-full transition-all duration-150"
              animate={{
                rotate: isMobileMenuOpen ? 45 : 0,
                y: isMobileMenuOpen ? 0 : -6,
              }}
            />
            <motion.span
              key="hamburger-middle"
              className="block w-6 h-0.5 bg-white rounded-full transition-all duration-150"
              animate={{
                opacity: isMobileMenuOpen ? 0 : 1,
              }}
            />
            <motion.span
              key="hamburger-bottom"
              className="block w-6 h-0.5 bg-white rounded-full transition-all duration-150"
              animate={{
                rotate: isMobileMenuOpen ? -45 : 0,
                y: isMobileMenuOpen ? 0 : 6,
              }}
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.075 }}
            className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 w-full overflow-hidden"
          >
            <div className="px-2 sm:px-4 py-4 sm:py-6 space-y-3 sm:space-y-4">
              {menuItems.map((item, index) => (
                <motion.button
                  key={`mobile-${item.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.025 }}
                  whileHover={{ x: 10 }}
                  onClick={() => {
                    scrollToSection(item.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`
                    block px-4 py-3 text-lg font-medium rounded-lg transition-all duration-150 text-left w-full
                    ${activeSection === item.id
                      ? 'text-brand-400 bg-brand-500/20 border-l-4 border-brand-400'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
