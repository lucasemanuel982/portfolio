"use client";

import { motion } from "motion/react";
import {
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiTailwindcss,
  SiSass,
  SiJavascript,
  SiJquery,
  SiTypescript,
  SiReact,
  SiStyledcomponents,
  SiNextdotjs,
  SiNestjs,
  SiNodedotjs,
  SiPython,
  SiPhp,
  SiMongodb,
  SiMysql,
  SiRedis,
  SiAmazon,
  SiLinux,
  SiDocker,
  SiGit,
  SiGithub,
  SiBitbucket,
  SiSwagger,
  SiPostman,
  SiJira,
  SiConfluence,
  SiVercel,
  SiRender,
  SiRailway,
  SiPostgresql,
  SiExpress,
  SiFramer
} from "react-icons/si";
import {
  Coffee,
  Network,
  Server,
  Zap,
  Building2,
  Building,
  Workflow
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TechItem {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  glowColor: string;
}

export default function TechStack() {
  const { t } = useLanguage();

  const techCategories: { title: string; skills: TechItem[] }[] = [
    {
      title: t('skills.categories.frontend'),
      skills: [
        { name: "HTML", icon: SiHtml5, color: "#e34f26", glowColor: "red-500" },
        { name: "CSS", icon: SiCss3, color: "#1572b6", glowColor: "blue-500" },
        { name: "Bootstrap", icon: SiBootstrap, color: "#7952b3", glowColor: "purple-500" },
        { name: "Tailwind", icon: SiTailwindcss, color: "#06b6d4", glowColor: "cyan-400" },
        { name: "Sass", icon: SiSass, color: "#cf649a", glowColor: "pink-500" },
        { name: "JavaScript", icon: SiJavascript, color: "#f7df1e", glowColor: "yellow-500" },
        { name: "jQuery", icon: SiJquery, color: "#0769ad", glowColor: "blue-600" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178c6", glowColor: "blue-500" },
        { name: "React", icon: SiReact, color: "#61dafb", glowColor: "cyan-500" },
        { name: "Styled Components", icon: SiStyledcomponents, color: "#db7093", glowColor: "pink-600" },
        { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", glowColor: "white" },
        { name: "Framer Motion", icon: SiFramer, color: "#ffffff", glowColor: "white" },
      ]
    },
    {
      title: t('skills.categories.backend'),
      skills: [
        { name: "Node.js", icon: SiNodedotjs, color: "#339933", glowColor: "green-500" },
        { name: "Python", icon: SiPython, color: "#3776ab", glowColor: "blue-600" },
        { name: "Pandas", icon: SiPython, color: "#3776ab", glowColor: "blue-600" },
        { name: "Java", icon: Coffee, color: "#ed8b00", glowColor: "orange-500" },
        { name: "PHP", icon: SiPhp, color: "#777bb4", glowColor: "purple-500" },
        { name: "CodeIgniter", icon: SiPhp, color: "#777bb4", glowColor: "purple-500" },
        { name: "Laravel", icon: SiPhp, color: "#777bb4", glowColor: "purple-500" },
        { name: "Microserviços", icon: Server, color: "#8b5cf6", glowColor: "purple-500" },
        { name: "WebSockets", icon: Network, color: "#06b6d4", glowColor: "cyan-500" },
        { name: "Sockets", icon: Zap, color: "#f59e0b", glowColor: "yellow-500" },
        { name: "Nest.js", icon: SiNestjs, color: "#e0234e", glowColor: "red-500" },
        { name: "Express.js", icon: SiExpress, color: "#000000", glowColor: "white" },
      ]
    },
    {
      title: t('skills.categories.database'),
      skills: [
        { name: "MongoDB", icon: SiMongodb, color: "#47a248", glowColor: "green-600" },
        { name: "PostgreSQL", icon: SiPostgresql, color: "#47a248", glowColor: "green-600" },
        { name: "MySQL", icon: SiMysql, color: "#4479a1", glowColor: "blue-600" },
        { name: "Redis", icon: SiRedis, color: "#dc382d", glowColor: "red-500" },
        { name: "DynamoDB", icon: SiAmazon, color: "#3f37c9", glowColor: "blue-700" },
      ]
    },
    {
      title: t('skills.categories.cloud'),
      skills: [
        { name: "AWS", icon: SiAmazon, color: "#ff9900", glowColor: "orange-500" },
        { name: "S3", icon: SiAmazon, color: "#569a31", glowColor: "green-600" },
        { name: "EC2", icon: SiAmazon, color: "#ff9500", glowColor: "orange-600" },
        { name: "Linux", icon: SiLinux, color: "#fcc624", glowColor: "yellow-600" },
      ]
    },
    {
      title: t('skills.categories.deploy'),
      skills: [
        { name: "Vercel", icon: SiVercel, color: "#ffffff", glowColor: "white" },
        { name: "Render", icon: SiRender, color: "#46e3b7", glowColor: "emerald-400" },
        { name: "Railway", icon: SiRailway, color: "#ffffff", glowColor: "white" },
      ]
    },
    {
      title: t('skills.categories.devops'),
      skills: [
        { name: "Docker", icon: SiDocker, color: "#2496ed", glowColor: "blue-500" },
        { name: "Git", icon: SiGit, color: "#f05032", glowColor: "red-600" },
        { name: "GitHub", icon: SiGithub, color: "#ffffff", glowColor: "white" },
        { name: "Bitbucket", icon: SiBitbucket, color: "#0052cc", glowColor: "blue-700" },
        { name: "Swagger", icon: SiSwagger, color: "#85ea2d", glowColor: "green-400" },
        { name: "Postman", icon: SiPostman, color: "#ff6c37", glowColor: "orange-500" },
        { name: "Jira", icon: SiJira, color: "#0052cc", glowColor: "blue-700" },
        { name: "Confluence", icon: SiConfluence, color: "#172b4d", glowColor: "blue-900" },
        { name: "N8N", icon: Workflow, color: "#ea4e41", glowColor: "red-500" },
      ]
    },
    {
      title: t('skills.categories.architecture'),
      skills: [
        { name: "SOLID", icon: Building2, color: "#6366f1", glowColor: "indigo-500" },
        { name: "Clean Architecture", icon: Building, color: "#10b981", glowColor: "emerald-500" },
        { name: "MVC", icon: Building, color: "#10b981", glowColor: "emerald-500" },
        { name: "Factory", icon: Building, color: "#10b981", glowColor: "emerald-500" },
        { name: "Repository", icon: Building, color: "#10b981", glowColor: "emerald-500" },
        { name: "Observer", icon: Building, color: "#10b981", glowColor: "emerald-500" },
        { name: "Strategy", icon: Building, color: "#10b981", glowColor: "emerald-500" },
        { name: "Feeder-Worker", icon: Building, color: "#10b981", glowColor: "emerald-500" }
      ]
    }
  ];

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
          >
            {t('skills.title')}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-32 h-1.5 bg-blue-500 mx-auto mb-6 origin-center rounded-full"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-gray-300 font-light"
          >
            {t('skills.description')}
          </motion.p>
        </motion.div>

        <div className="space-y-8">
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <h3 className="text-2xl font-semibold text-white mb-6 pl-4 border-l-4 border-blue-500">
                {category.title}
              </h3>

              <motion.div
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 justify-items-center"
              >
                {category.skills.map((tech, index) => {
                  const IconComponent = tech.icon;
                  return (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.2,
                        delay: index * 0.05,
                        ease: "easeOut"
                      }}
                      viewport={{ once: true }}
                      whileHover={{
                        scale: 1.1,
                        y: -5,
                        transition: { duration: 0.1 }
                      }}
                      className="group relative flex flex-col items-center space-y-2 p-2 w-full"
                    >
                      {/* Ícone com efeito de vidro */}
                      <motion.div
                        whileHover={{ rotate: 5 }}
                        transition={{ duration: 0.1 }}
                        className="relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 backdrop-blur-md bg-white/5 border border-white/10 shadow-lg shadow-black/20 group-hover:bg-white/10 group-hover:border-white/30"
                      >
                        {/* Efeito de brilho */}
                        <div className={`absolute inset-0 rounded-xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm ${tech.glowColor ? `border-${tech.glowColor}` : 'border-blue-500'}`} style={{ borderColor: tech.color }} />
                        <div className={`absolute inset-0 rounded-xl border opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${tech.glowColor ? `border-${tech.glowColor}` : 'border-blue-500'}`} style={{ borderColor: tech.color }} />

                        {/* Ícone */}
                        <IconComponent
                          className="w-7 h-7 relative z-10 transition-transform duration-300 group-hover:scale-110"
                          style={{ color: tech.color }}
                        />
                      </motion.div>

                      {/* Nome da tecnologia */}
                      <motion.span
                        className="text-sm font-medium text-center transition-colors duration-300 text-gray-400 group-hover:text-white"
                      >
                        {tech.name}
                      </motion.span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
