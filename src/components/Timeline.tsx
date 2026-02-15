'use client'

import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import {
  IconCalendar,
  IconMapPin,
  IconTrophy,
  IconCode,
  IconInfoCircle,
} from "@tabler/icons-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TimelineEvent {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  detailedDescription?: string;
  image?: string;
  achievements: string[];
  type: 'job' | 'achievement' | 'project';
  icon: React.ReactNode;
}

export default function Timeline() {
  const { t, translations } = useLanguage();

  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      title: t('timeline.jobs.devJunior.title'),
      company: 'Empresa Atual',
      location: t('timeline.jobs.devJunior.location'),
      period: '2023 - 2024',
      description: t('timeline.jobs.devJunior.description'),
      detailedDescription: t('timeline.jobs.devJunior.detailedDescription'),
      achievements: translations.timeline?.jobs?.devJunior?.achievements || [],
      type: 'job',
      icon: <IconCode />
    },
    {
      id: '2',
      title: t('timeline.jobs.teamLeadJunior.title'),
      company: 'Empresa Atual',
      location: t('timeline.jobs.teamLeadJunior.location'),
      period: '2024',
      description: t('timeline.jobs.teamLeadJunior.description'),
      achievements: translations.timeline?.jobs?.teamLeadJunior?.achievements || [],
      type: 'job',
      icon: <IconCode />
    },
    {
      id: '3',
      title: t('timeline.jobs.award.title'),
      company: 'Empresa Atual',
      location: t('timeline.jobs.award.location'),
      period: '2024',
      description: t('timeline.jobs.award.description'),
      image: '/premio.jpg',
      achievements: translations.timeline?.jobs?.award?.achievements || [],
      type: 'achievement',
      icon: <IconTrophy />
    },
    {
      id: '4',
      title: t('timeline.jobs.teamLeadPleno.title'),
      company: 'Empresa Atual',
      location: t('timeline.jobs.teamLeadPleno.location'),
      period: '2024 - Atual',
      description: t('timeline.jobs.teamLeadPleno.description'),
      detailedDescription: t('timeline.jobs.teamLeadPleno.detailedDescription'),
      achievements: translations.timeline?.jobs?.teamLeadPleno?.achievements || [],
      type: 'job',
      icon: <IconCode />
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="relative py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Título da seção */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-4">
            {t('timeline.title')}
          </h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-blue-500 mx-auto origin-center"
          />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Linha central da timeline */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-500 transform md:-translate-x-0.5" />

          {timelineEvents.map((event, index) => (
            <TimelineItem
              key={event.id}
              event={event}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

interface TimelineItemProps {
  event: TimelineEvent;
  index: number;
  isLeft: boolean;
}

const TimelineItem = ({ event, index, isLeft }: TimelineItemProps) => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      viewport={{ once: true }}
      className={cn(
        "relative flex items-center mb-12",
        "md:flex-row md:justify-between",
        isLeft ? "md:flex-row-reverse" : "md:flex-row"
      )}
    >
      {/* Conteúdo do card */}
      <motion.div
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.1 }
        }}
        className={cn(
          "w-full md:w-5/12 relative group",
          isLeft ? "md:mr-9" : "md:ml-9"
        )}
      >
        {/* Card principal */}
        <div className="bg-neutral-800 rounded-xl p-6 shadow-lg border border-neutral-700 relative overflow-hidden">
          {/* Efeito de hover com gradiente */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-gradient-to-br from-blue-900/20 to-transparent pointer-events-none" />

          {/* Linhas animadas no hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-250 delay-50" />
            <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent via-blue-400 to-transparent transform translate-x-full group-hover:-translate-x-full transition-transform duration-250 delay-100" />
          </div>

          {/* Header do card */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className={cn(
                "p-2 rounded-lg text-white",
                event.type === 'job' && "bg-blue-500",
                event.type === 'achievement' && "bg-yellow-500",
                event.type === 'project' && "bg-green-500"
              )}>
                {event.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-100">
                  {event.title}
                </h3>
                <p className="text-sm text-blue-400 font-medium">
                  {event.company}
                </p>
              </div>
            </div>

            {/* Informações adicionais */}
            <div className="flex flex-wrap gap-4 mb-4 text-sm text-neutral-400">
              <div className="flex items-center gap-1">
                <IconCalendar className="w-4 h-4" />
                <span>{event.period}</span>
              </div>
              <div className="flex items-center gap-1">
                <IconMapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
            </div>

            {/* Descrição */}
            <p className="text-neutral-300 mb-4 leading-relaxed">
              {event.description}
            </p>

            {/* Achievements */}
            <div className="space-y-2 mb-4">
              <h4 className="text-sm font-semibold text-neutral-100">
                {t('timeline.labels.activities')}
              </h4>
              <ul className="space-y-1">
                {event.achievements.map((achievement, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.1 + idx * 0.05 + 0.15 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-2 text-sm text-neutral-400"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span>{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Botão Mais Informações */}
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="outline"
              size="sm"
              className="w-full md:w-auto"
            >
              <IconInfoCircle className="w-4 h-4" />
              {t('timeline.labels.moreInfo')}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={event.title}
      >
        <div>
          {/* Informações da empresa */}
          <div className="flex flex-wrap gap-4 mb-4 text-sm text-neutral-400">
            <div className="flex items-center gap-1">
              <IconCalendar className="w-4 h-4" />
              <span>{event.period}</span>
            </div>
            <div className="flex items-center gap-1">
              <IconMapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
          </div>

          {/* Imagem */}
          {event.image && (
            <div className="mb-6">
              <motion.img
                src={event.image}
                alt={event.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="w-full rounded-lg shadow-lg border border-neutral-700 object-cover"
              />
            </div>
          )}

          {/* Descrição */}
          <p className="text-neutral-300 mb-4 leading-relaxed">
            {event.detailedDescription || event.description}
          </p>

          {/* Principais atividades */}
          <div className="space-y-2 mb-4">
            <h4 className="text-sm font-semibold text-neutral-100">
              {t('timeline.labels.activities')}
            </h4>
            <ul className="space-y-1">
              {event.achievements.map((achievement, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-neutral-400"
                >
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Modal>

      {/* Ponto central da timeline */}
      <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-neutral-900 transform -translate-x-2 md:-translate-x-2 z-10" />

      {/* Ponto animado no hover */}
      <motion.div
        className="absolute left-8 md:left-1/2 w-4 h-4 bg-blue-400 rounded-full transform -translate-x-2 md:-translate-x-2 z-5"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.5, opacity: 0.3 }}
        transition={{ duration: 0.1 }}
      />
    </motion.div>
  );
};
