'use client'

import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconAward,
  IconBuildingSkyscraper,
  IconCards,
  IconRobot,
  IconSchool,
  IconUsers,
  IconTrophy,
} from "@tabler/icons-react";
import { motion } from "motion/react";

export default function FeaturesSectionDemo() {
  const features = [
    {
      title: "Implementações",
      description:
        "Mais de 1100 cards entregues( análise, implementações, correções ) contendo prazos e SLA de entrega.",
        icon: <IconCards />,
      },
      {
        title: "Prêmio de destaque",
        description:
        "Fui premiado em 2024 com o prêmio de excelência pela equipe de desenvolvimento por minha contribuição. Código limpo e poucas reprovações em reviews.",
        icon: <IconTrophy />,
      },
      {
        title: "Arquiteturas diversas",
        description:
        "Atuação em mais de 10 projetos, com diferentes equipes e arquiteturas.",
        icon: <IconBuildingSkyscraper />,
      },
      {
        title: "Colaboração ágil",
        description:
        "Participação ativa em sprints, definição de requisitos com POs e entregas dentro do prazo. Realizando todo o processo: planning, daily, review...",
      icon: <IconUsers />,
    },
    {
      title: "Liderança técnica",
      description: "Team Leader de 4 projetos - realizando acompanhamento de todos os projetos, definição de requisitos, mentoria à equipe de desenvolvimento, revisando código e orientando boas práticas.",
      icon: <IconAward />,
    },
    {
      title: "Automação de processos",
      description:
        "Criação de scripts e soluções que reduziram retrabalho e aumentaram a produtividade.",
      icon: <IconRobot />,
    },
    {
      title: "Otimização de performance",
      description:
        "Melhoria de sistemas existentes, reduzindo tempo de resposta e aumentando a eficiência.",
      icon: <IconAdjustmentsBolt />,
    },
    {
      title: "Aprendizado constante",
      description: "Buscando sempre melhorar minhas habilidades e conhecimentos através de cursos, workshops, eventos e projetos pessoais.",
      icon: <IconSchool />,
    },
  ];
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </motion.div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.25, 
        delay: index * 0.05,
        ease: "easeOut"
      }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.1 }
      }}
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l border-neutral-800",
        index < 4 && "lg:border-b border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-100 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-100 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-800 to-transparent pointer-events-none" />
      )}
      
      {/* Linhas azuis animadas no hover */}
      <div className="absolute inset-0 opacity-0 group-hover/feature:opacity-100 transition-opacity duration-150 overflow-hidden">
        {/* Linha superior */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent transform -translate-x-full group-hover/feature:translate-x-full transition-transform duration-250 delay-50" />
        {/* Linha inferior */}
        <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent via-blue-400 to-transparent transform translate-x-full group-hover/feature:-translate-x-full transition-transform duration-250 delay-100" />
        {/* Linha direita */}
        <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-transparent via-blue-400 to-transparent transform -translate-y-full group-hover/feature:translate-y-full transition-transform duration-250 delay-150" />
        {/* Linha esquerda */}
        <div className="absolute bottom-0 left-0 h-full w-[2px] bg-gradient-to-t from-transparent via-blue-400 to-transparent transform translate-y-full group-hover/feature:-translate-y-full transition-transform duration-250 delay-200" />
      </div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, delay: index * 0.05 + 0.1 }}
        viewport={{ once: true }}
        className="mb-4 relative z-10 px-4 sm:px-10 text-neutral-400"
      >
        {icon}
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, delay: index * 0.05 + 0.15 }}
        viewport={{ once: true }}
        className="text-lg font-bold mb-2 relative z-10 px-4 sm:px-10"
      >
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-100 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-100 inline-block text-neutral-100">
          {title}
        </span>
      </motion.div>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: index * 0.05 + 0.2 }}
        viewport={{ once: true }}
        className="text-sm text-neutral-300 max-w-xs relative z-10 px-4 sm:px-10"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};
