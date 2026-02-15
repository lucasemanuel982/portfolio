'use client'

import dynamic from 'next/dynamic';
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ScrollToTop } from "@/components/ScrollToTop";
import { motion } from "motion/react";
import { usePageTracking } from "@/hooks/usePageTracking";
import { useLanguage } from "@/contexts/LanguageContext";

// Lazy loading de componentes pesados
const FeaturesSectionAboutMe = dynamic(() => import("@/components/AboutMe"), {
  loading: () => <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>
});

const Timeline = dynamic(() => import("@/components/Timeline"), {
  loading: () => <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>
});

const TechStack = dynamic(() => import("@/components/TechStack"), {
  loading: () => <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>
});

const Projects = dynamic(() => import("@/components/Projects"), {
  loading: () => <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>
});

const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>
});

export default function Home() {
  // Rastrear visualizações de página
  usePageTracking();
  const { t } = useLanguage();

  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />
      <div className="relative z-10 min-h-screen">
        <Header />
        <section id="home">
          <Hero />
        </section>
        <section id="sobre" className="pt-16">
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="pb-8 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-7xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-center mb-4 text-neutral-100"
              >
                {t('home.aboutTitle')}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                viewport={{ once: true }}
                className="w-24 h-1 bg-blue-500 mx-auto mb-12 origin-center"
              ></motion.div>
            </div>
          </motion.section>
          <FeaturesSectionAboutMe />
          <Timeline />
        </section>
        <section id="skills" className="pt-16">
          <TechStack />
        </section>
        <section id="projetos" className="pt-16">
          <Projects />
        </section>
        <section id="contato" className="pt-16">
          <Contact />
        </section>
        <Footer />
      </div>
      <ScrollToTop />
    </main>
  );
}
