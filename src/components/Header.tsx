'use client'

import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { useState, useEffect } from "react"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const menuItems = [
    { id: 'home', label: 'HOME', href: '#home' },
    { id: 'sobre', label: 'SOBRE', href: '#sobre' },
    { id: 'skills', label: 'SKILLS', href: '#skills' },
    { id: 'projetos', label: 'PROJETOS', href: '#projetos' },
    { id: 'contato', label: 'CONTATO', href: '#contato' }
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Função para scroll suave
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  // Detecção da seção ativa baseada no scroll
  useEffect(() => {
    const handleScroll = () => {
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
  }, [])

  return (
    <motion.header 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
              className="w-10 h-10 rounded-full overflow-hidden shadow-lg ring-2 ring-blue-400/30 ring-offset-2 ring-offset-black/50"
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
              className="font-bold text-lg bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent"
            >
              Lucas Emanuel
            </motion.span>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden md:flex items-center gap-8"
          >
            {menuItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  scrollToSection(item.id)
                  setActiveSection(item.id)
                }}
                className={`
                  relative px-4 py-2 text-sm font-medium transition-all duration-300 group
                  ${activeSection === item.id 
                    ? 'text-blue-400' 
                    : 'text-gray-300 hover:text-white'
                  }
                `}
              >
                <span className="relative z-10">{item.label}</span>
                
                {/* Background hover effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-blue-400/20 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                
                {/* Active indicator */}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/30 to-blue-400/30"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                
                {/* Bottom border */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-300"
                  initial={{ width: 0 }}
                  animate={{ width: activeSection === item.id ? "100%" : 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </motion.nav>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            onClick={toggleMobileMenu}
            className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center group"
          >
            <motion.span
              className="block w-6 h-0.5 bg-white rounded-full transition-all duration-300"
              animate={{
                rotate: isMobileMenuOpen ? 45 : 0,
                y: isMobileMenuOpen ? 0 : -6,
              }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-white rounded-full transition-all duration-300"
              animate={{
                opacity: isMobileMenuOpen ? 0 : 1,
              }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-white rounded-full transition-all duration-300"
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
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  onClick={() => {
                    scrollToSection(item.id)
                    setActiveSection(item.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`
                    block px-4 py-3 text-lg font-medium rounded-lg transition-all duration-300 text-left w-full
                    ${activeSection === item.id 
                      ? 'text-blue-400 bg-blue-500/20 border-l-4 border-blue-400' 
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
