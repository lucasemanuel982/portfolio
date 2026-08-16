'use client'

import Image from "next/image"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react"
import { useState, useRef, useEffect } from "react"
import { useLanguage, Language } from "@/contexts/LanguageContext"
import { ThemeColorPicker } from "@/components/ThemeColorPicker"
import { trackSectionNav } from "@/lib/analytics"

export function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const isManualScrollRef = useRef(false)
  const { scrollY } = useScroll()

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
        <svg width="24" height="16" viewBox="0 0 24 16" className="rounded-sm shadow-sm" aria-hidden="true">
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
        <svg width="24" height="16" viewBox="0 0 24 16" className="rounded-sm shadow-sm" aria-hidden="true">
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
        <svg width="24" height="16" viewBox="0 0 24 16" className="rounded-sm shadow-sm" aria-hidden="true">
          <rect width="24" height="16" fill="#AA151B" />
          <rect y="4" width="24" height="8" fill="#F1BF00" />
        </svg>
      )
    }
  ]

  useEffect(() => {
    if (!isMobileMenuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const scrollToSection = (sectionId: string) => {
    isManualScrollRef.current = true
    setActiveSection(sectionId)
    trackSectionNav(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
      setTimeout(() => {
        isManualScrollRef.current = false
      }, 1000)
    }
  }

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (isManualScrollRef.current) return

    const sections = ['home', 'sobre', 'skills', 'projetos', 'contato']
    const scrollPosition = latest + 100

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId)
      if (element) {
        const { offsetTop, offsetHeight } = element
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection((prev) => (prev === sectionId ? prev : sectionId))
          break
        }
      }
    }
  })

  const FlagButtons = ({ compact = false }: { compact?: boolean }) => (
    <div className={`flex items-center ${compact ? 'gap-4 justify-center' : 'gap-3'}`}>
      {flags.map((flag) => (
        <button
          key={flag.code}
          type="button"
          onClick={() => setLanguage(flag.code as Language)}
          className={`
            relative flex items-center justify-center rounded-sm overflow-hidden transition-all duration-200
            touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400
            min-h-11 min-w-11
            ${language === flag.code
              ? 'ring-2 ring-brand-400 shadow-[0_0_12px_var(--color-brand-500)] z-10 scale-110'
              : 'opacity-50 hover:opacity-100 grayscale hover:grayscale-0'
            }
          `}
          title={flag.label}
          aria-label={flag.label}
          aria-pressed={language === flag.code}
        >
          {flag.icon}
        </button>
      ))}
    </div>
  )

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10 w-full pt-[env(safe-area-inset-top)]"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 min-w-0 gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden shadow-lg ring-1 sm:ring-2 ring-brand-400/30 ring-offset-1 sm:ring-offset-2 ring-offset-black/50 flex-shrink-0">
              <Image
                src="/Perfil.webp"
                alt="Lucas Emanuel - Desenvolvedor Full Stack"
                width={40}
                height={40}
                className="w-full h-full object-cover"
                quality={75}
              />
            </div>
            <span className="font-bold text-sm sm:text-lg bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent whitespace-nowrap truncate">
              Lucas Emanuel
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-2 lg:gap-6" aria-label="Principal">
            {menuItems.map((item) => (
              <button
                key={`desktop-${item.id}`}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`
                  relative px-3 lg:px-4 py-2 text-sm font-medium transition-colors duration-150 touch-manipulation
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded-lg
                  ${activeSection === item.id
                    ? 'text-brand-400'
                    : 'text-gray-300 hover:text-white'
                  }
                `}
              >
                <span className="relative z-10">{item.label}</span>
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-brand-500/30 to-brand-400/30"
                    initial={false}
                    transition={{ type: "spring", stiffness: 800, damping: 40 }}
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <FlagButtons />
            <ThemeColorPicker />
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="md:hidden relative w-11 h-11 flex flex-col justify-center items-center flex-shrink-0 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded-lg"
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className="block w-6 h-0.5 bg-white rounded-full transition-transform duration-150"
              style={{
                transform: isMobileMenuOpen ? 'translateY(0) rotate(45deg)' : 'translateY(-6px)',
              }}
            />
            <span
              className="block w-6 h-0.5 bg-white rounded-full transition-opacity duration-150 absolute"
              style={{ opacity: isMobileMenuOpen ? 0 : 1 }}
            />
            <span
              className="block w-6 h-0.5 bg-white rounded-full transition-transform duration-150"
              style={{
                transform: isMobileMenuOpen ? 'translateY(0) rotate(-45deg)' : 'translateY(6px)',
              }}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 w-full overflow-hidden max-h-[min(100dvh-3.5rem,32rem)] overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)]"
          >
            <div className="px-4 py-4 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={`mobile-${item.id}`}
                  type="button"
                  onClick={() => {
                    scrollToSection(item.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`
                    block px-4 py-3.5 text-base font-medium rounded-lg transition-colors duration-150 text-left w-full
                    touch-manipulation min-h-12
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400
                    ${activeSection === item.id
                      ? 'text-brand-400 bg-brand-500/20 border-l-4 border-brand-400'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-4 mt-2 border-t border-white/10 space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-neutral-500 mb-3 px-1">
                    {t('header.themeColor')}
                  </p>
                  <div className="flex justify-center">
                    <ThemeColorPicker />
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-neutral-500 mb-3 px-1 text-center">
                    Idioma / Language
                  </p>
                  <FlagButtons compact />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
