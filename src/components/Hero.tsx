'use client'

import Image from "next/image"
import {TextGenerateEffect} from "@/components/ui/text-generate-effect"
import { FloatingDock } from "@/components/ui/floating-dock"
import { SiGithub, SiLinkedin, SiWhatsapp } from "react-icons/si"
import { HiMail, HiDownload } from "react-icons/hi"
import { motion } from "motion/react"

export function Hero() {
  // Função para scroll suave para a seção de contatos
  const scrollToContact = (e?: React.MouseEvent) => {
    e?.preventDefault()
    
    const element = document.getElementById('contato')
    if (element) {
      const headerHeight = 80 // altura do header fixo
      const elementPosition = element.offsetTop - headerHeight
      
      // Scroll suave customizado
      const startPosition = window.pageYOffset
      const distance = elementPosition - startPosition
      const duration = 400 // duração em ms
      let start: number | null = null

      function animation(currentTime: number) {
        if (start === null) start = currentTime
        const timeElapsed = currentTime - start
        const progress = Math.min(timeElapsed / duration, 1)
        
        // Função de easing para suavidade
        const ease = progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2

        window.scrollTo(0, startPosition + distance * ease)
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation)
        }
      }

      requestAnimationFrame(animation)
    }
  }

  // Função para download do currículo
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
      icon: (
        <SiGithub className="h-full w-full text-neutral-300" />
      ),
      href: "https://github.com/lucasemanuel982",
    },
    {
      title: "LinkedIn",
      icon: (
        <SiLinkedin className="h-full w-full text-neutral-300" />
      ),
      href: "https://www.linkedin.com/in/lucasemanuell/",
    },
    {
      title: "WhatsApp",
      icon: (
        <SiWhatsapp className="h-full w-full text-neutral-300" />
      ),
      href: "https://wa.me/5583986436386",
    },
    {
      title: "E-mail",
      icon: (
        <HiMail className="h-full w-full text-neutral-300" />
      ),
      href: "#contato",
      onClick: scrollToContact,
    },
  ];
  
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-4">

        {/* Foto e Conteúdo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Foto */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="relative order-2 lg:order-1"
          >
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.15 }}
              className="group relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl mx-auto"
            >
              <Image
                src="/Perfil2.png"
                alt="Lucas Emanuel - Desenvolvedor Full Stack"
                fill
                className="object-cover object-center"
                priority
              />
              {/* Conteúdo */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
              
              <div className="absolute inset-0 rounded-full border-2 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150 blur-sm" />
              <div className="absolute inset-0 rounded-full border border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
            </motion.div>
            
            {/* Ícones de redes sociais */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="mt-8"
            >
              <FloatingDock items={socialLinks} />
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.25 }}
            className="space-y-8 order-1 lg:order-2"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.25 }}
              className="text-lg md:text-xl leading-relaxed text-white"
            >
              <TextGenerateEffect 
                words="Bem vindo ao meu portfólio! Eu sou Lucas Emanuel, um desenvolvedor full stack. Desenvolvo aplicações tanto back-end quanto front-end e possuo conhecimento em infraestrutura. Tenho mais de 2 anos de experiência em desenvolvimento de software."
                duration={0.075}
                staggerDelay={0.0375}
              />
            </motion.div>
            
            {/* Botão de Download CV */}
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.55 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadCV}
              className="bg-blue-400 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-150 inline-flex items-center gap-2 shadow-lg hover:shadow-blue-400/25 cursor-pointer"
            >
              Download CV
              <HiDownload className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
