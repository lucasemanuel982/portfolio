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
  SiRailway
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

interface TechItem {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  glowColor: string;
}

const techStack: TechItem[] = [
  // Frontend
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
  { name: "Next.js", icon: SiNextdotjs, color: "#000000", glowColor: "white" },
  { name: "Nest.js", icon: SiNestjs, color: "#e0234e", glowColor: "red-500" },
  
  // Backend
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", glowColor: "green-500" },
  { name: "Python", icon: SiPython, color: "#3776ab", glowColor: "blue-600" },
  { name: "Java", icon: Coffee, color: "#ed8b00", glowColor: "orange-500" },
  { name: "PHP", icon: SiPhp, color: "#777bb4", glowColor: "purple-500" },
  { name: "Microserviços", icon: Server, color: "#8b5cf6", glowColor: "purple-500" },
  { name: "WebSockets", icon: Network, color: "#06b6d4", glowColor: "cyan-500" },
  { name: "Sockets", icon: Zap, color: "#f59e0b", glowColor: "yellow-500" },
  
  // Database
  { name: "MongoDB", icon: SiMongodb, color: "#47a248", glowColor: "green-600" },
  { name: "MySQL", icon: SiMysql, color: "#4479a1", glowColor: "blue-600" },
  { name: "Redis", icon: SiRedis, color: "#dc382d", glowColor: "red-500" },
  { name: "DynamoDB", icon: SiAmazon, color: "#3f37c9", glowColor: "blue-700" },
  
  // Cloud & AWS
  { name: "AWS", icon: SiAmazon, color: "#ff9900", glowColor: "orange-500" },
  { name: "S3", icon: SiAmazon, color: "#569a31", glowColor: "green-600" },
  { name: "EC2", icon: SiAmazon, color: "#ff9500", glowColor: "orange-600" },
  { name: "Linux", icon: SiLinux, color: "#fcc624", glowColor: "yellow-600" },
  
  // Deploy & Hosting
  { name: "Vercel", icon: SiVercel, color: "#000000", glowColor: "gray-800" },
  { name: "Render", icon: SiRender, color: "#46e3b7", glowColor: "emerald-400" },
  { name: "Railway", icon: SiRailway, color: "#0b0d0e", glowColor: "gray-900" },
  
  // DevOps & Tools
  { name: "Docker", icon: SiDocker, color: "#2496ed", glowColor: "blue-500" },
  { name: "Git", icon: SiGit, color: "#f05032", glowColor: "red-600" },
  { name: "GitHub", icon: SiGithub, color: "#181717", glowColor: "gray-800" },
  { name: "Bitbucket", icon: SiBitbucket, color: "#0052cc", glowColor: "blue-700" },
  { name: "Swagger", icon: SiSwagger, color: "#85ea2d", glowColor: "green-400" },
  { name: "Postman", icon: SiPostman, color: "#ff6c37", glowColor: "orange-500" },
  { name: "Jira", icon: SiJira, color: "#0052cc", glowColor: "blue-700" },
  { name: "Confluence", icon: SiConfluence, color: "#172b4d", glowColor: "blue-900" },
  { name: "N8N", icon: Workflow, color: "#ea4e41", glowColor: "red-500" },
  
  // Architecture & Patterns
  { name: "SOLID", icon: Building2, color: "#6366f1", glowColor: "indigo-500" },
  { name: "Clean Architecture", icon: Building, color: "#10b981", glowColor: "emerald-500" }
];

export default function TechStack() {
  
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            Minhas Skills
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-blue-500 mx-auto mb-6 origin-center"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-lg text-gray-400"
          >
            Tecnologias e ferramentas que domino
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2 justify-items-center"
        >
          {techStack.map((tech, index) => {
            const IconComponent = tech.icon;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="group relative flex flex-col items-center space-y-1 p-1"
              >
                {/* Ícone com efeito de vidro */}
                <motion.div 
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 backdrop-blur-md bg-white/10 border border-white/20 shadow-lg shadow-black/20"
                >
                  {/* Efeito de brilho */}
                  <div className="absolute inset-0 rounded-xl border-2 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                  <div className="absolute inset-0 rounded-xl border border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Ícone */}
                  <IconComponent 
                    className="w-7 h-7 relative z-10 transition-colors duration-300" 
                    style={{ color: tech.color }}
                  />
                </motion.div>
                
                {/* Nome da tecnologia */}
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
                  viewport={{ once: true }}
                  className="text-xs font-medium text-center transition-colors duration-300 text-gray-300 group-hover:text-white"
                >
                  {tech.name}
                </motion.span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
