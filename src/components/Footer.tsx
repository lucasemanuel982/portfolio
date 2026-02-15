'use client'

import { motion } from "motion/react";
import Link from 'next/link';
import { SiGithub, SiLinkedin, SiWhatsapp } from "react-icons/si";
import { HiMail } from 'react-icons/hi';
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-black/50 backdrop-blur-sm border-t border-neutral-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Informações do desenvolvedor */}
          <div className="text-center md:text-left">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-neutral-400 text-sm"
            >
              {t('footer.developedBy')}{' '}
              <span className="text-blue-500 font-medium">Lucas Emanuel</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-neutral-500 text-xs mt-1"
            >
              {t('footer.rights')}
            </motion.p>
          </div>

          {/* Links sociais */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <motion.a
              href="https://github.com/lucasemanuel982"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="group relative p-3 rounded-full bg-neutral-800/50 hover:bg-neutral-700/50 transition-all duration-150 border border-neutral-700/50 hover:border-blue-500/50"
            >
              <SiGithub
                className="w-5 h-5 text-neutral-400 group-hover:text-blue-500 transition-colors duration-150"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-neutral-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap"
              >
                GitHub
              </motion.div>
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/lucasemanuell/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="group relative p-3 rounded-full bg-neutral-800/50 hover:bg-neutral-700/50 transition-all duration-150 border border-neutral-700/50 hover:border-blue-500/50"
            >
              <SiLinkedin
                className="w-5 h-5 text-neutral-400 group-hover:text-blue-500 transition-colors duration-150"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-neutral-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap"
              >
                LinkedIn
              </motion.div>
            </motion.a>

            <motion.a
              href="https://wa.me/5583986436386"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="group relative p-3 rounded-full bg-neutral-800/50 hover:bg-neutral-700/50 transition-all duration-150 border border-neutral-700/50 hover:border-blue-500/50"
            >
              <SiWhatsapp
                className="w-5 h-5 text-neutral-400 group-hover:text-blue-500 transition-colors duration-150"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-neutral-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap"
              >
                WhatsApp
              </motion.div>
            </motion.a>

          </div>
        </div>

        {/* Linha decorativa */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent mt-6"
        />
      </div>
    </footer>
  );
}
