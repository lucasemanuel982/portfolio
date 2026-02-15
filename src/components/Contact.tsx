'use client'

import dynamic from 'next/dynamic';
import { motion } from "motion/react";
import { useState } from "react";
import { HiMail, HiUser, HiDocumentText } from "react-icons/hi";
import { useLanguage } from "@/contexts/LanguageContext";

// Lazy loading do componente 3D (desabilita SSR para Three.js)
const Notebook3D = dynamic(() => import("./Notebook3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 lg:h-[500px] flex items-center justify-center bg-neutral-900/30 rounded-xl">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-neutral-400 text-sm">Carregando modelo 3D...</p>
      </div>
    </div>
  )
});

interface FormData {
  email: string;
  name: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          email: '',
          name: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            {t('contact.title')}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-blue-500 mx-auto mb-6 origin-center"
          />
        </motion.div>

        {/* Div notebook and form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Notebook Column */}
            <div className="order-1 lg:order-1">
              <Notebook3D />
            </div>

            {/* Form Column */}
            <div className="order-2 lg:order-2">
              <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800/50 rounded-2xl p-8 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                      {t('contact.form.name.label')}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                        <HiUser className="h-5 w-5" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="block w-full pl-10 pr-3 py-3 border border-neutral-800 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-neutral-900/50 text-white placeholder-neutral-500 transition-colors"
                        placeholder={t('contact.form.name.placeholder')}
                      />
                    </div>
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: 0.25 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                      {t('contact.form.email.label')}
                    </label>
                    <div className="relative">
                      <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-5 h-5" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-150"
                        placeholder={t('contact.form.email.placeholder')}
                      />
                    </div>
                  </motion.div>

                  {/* Subject Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="subject" className="block text-sm font-medium text-neutral-300 mb-2">
                      {t('contact.form.subject.label')}
                    </label>
                    <div className="relative">
                      <HiDocumentText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-5 h-5" />
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-150"
                        placeholder={t('contact.form.subject.placeholder')}
                      />
                    </div>
                  </motion.div>

                  {/* Message Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: 0.35 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">
                      {t('contact.form.message.label')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none"
                      placeholder={t('contact.form.message.placeholder')}
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="pt-4"
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:from-neutral-600 disabled:to-neutral-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-150 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                    </button>
                  </motion.div>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-900/50 border border-green-500/50 rounded-lg text-green-400 text-center"
                    >
                      {t('contact.form.success')}
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-900/50 border border-red-500/50 rounded-lg text-red-400 text-center"
                    >
                      {t('contact.form.error')}
                    </motion.div>
                  )}
                </form>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
