"use client";

import React from "react";
import Image from "next/image";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { motion } from "motion/react";

interface ProjectUrl {
  label: string;
  url: string;
  icon?: React.ReactNode;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  urls?: ProjectUrl[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Editor de documentos online",
    description: "Editor de documentos online, contendo permissões para editar, visualizar e deletar documentos.",
    image: "/docsWeb.png",
    tags: ["React", "Node.js","MongoDB", "Express.js", "TypeScript","Socket.io", "Render"],
    urls: [
      {
        label: "Frontend",
        url: "https://github.com/lucasemanuel982/docs-web-frontend",
        icon: <SiGithub className="w-4 h-4" />
      },
      {
        label: "Backend",
        url: "https://github.com/lucasemanuel982/docs-web-backend",
        icon: <SiGithub className="w-4 h-4" />
      },
      
      {
        label: "Login",
        url: "https://docsweb.onrender.com/login",
        icon: <ExternalLink className="w-4 h-4" />
      },
      {
        label: "Página Inicial",
        url: "https://docsweb.onrender.com/",
        icon: <ExternalLink className="w-4 h-4" />
      }
    ],
  },
  {
    id: 2,
    title: "Leads App",
    description: "Aplicativo de Leads, contendo permissões para editar, visualizar e deletar leads.",
    image: "/leadsProject.png",
    tags: ["Next.js", "Node.js", "MongoDB", "Express.js", "TypeScript", "Vercel", "Shadcn/UI","SSG"],
        urls: [
      {
        label: "Frontend",
        url: "https://github.com/lucasemanuel982/leads-front",
        icon: <SiGithub className="w-4 h-4" />
      },
      {
        label: "Backend",
        url: "https://github.com/lucasemanuel982/leads-back",
        icon: <SiGithub className="w-4 h-4" />
      },
      {
        label: "Formulário",
        url: "https://leads-front.vercel.app/",
        icon: <ExternalLink className="w-4 h-4" />
      },
      {
        label: "Login",
        url: "https://leads-front.vercel.app/admin/login",
        icon: <ExternalLink className="w-4 h-4" />
      }
    ]
  },
  {
    id: 3,
    title: "Gerenciamento de Tarefas",
    description: "Gerenciamento de tarefas (Criar, Editar, Excluir e Visualizar) com PHP e Lumen, documentação com Swagger, banco de dados MySQL/MongoDB e Docker para containerização.",
    image: "/PHPLumen.png",
    tags: ["PHP", "Lumen", "MongoDB", "Docker", "Git", "swagger", "MySQL", "Next.js", "Node.js", "Express.js", "TypeScript", "Vercel", "Railway", "N8N"],
    urls: [
      {
        label: "Projeto completo",
        url: "https://github.com/lucasemanuel982/PHP-Lumen",
        icon: <SiGithub className="w-3 h-3" />
      }
      
    ]
  },
  {
    id: 4,
    title: "Dashboard Usuários",
    description: "Dashboard de Usuários com React, Node.js e N8N para automatizar tarefas. Onde é pego os dados criptografados e exibido de forma legível para o usuário, realizando a decriptografia dos dados.",
    image: "/dashboardPHP.jpg",
    tags: ["React", "Node.js", "Express.js", "TypeScript", "Vercel", "Railway", "N8N", "AES-256", "PostgreSQL", "Neon", "Docker"],
    urls: [
      {
        label: "Frontend",
        url: "https://github.com/lucasemanuel982/Full-stack-test-front",
        icon: <SiGithub className="w-4 h-4" />
      },
      {
        label: "Backend",
        url: "https://github.com/lucasemanuel982/Full-stack-test-back",
        icon: <SiGithub className="w-4 h-4" />
      },
      {
        label: "N8N",
        url: "https://github.com/lucasemanuel982/Full-stack-test-N8N",
        icon: <SiGithub className="w-4 h-4" />
      }
      
    ]
  },
  {
    id: 5,
    title: "Gestão de Ativos",
    description: "Projeto Profissional, onde desenvolvi um sistema de gestão de ativos para uma empresa de tecnologia. Onde o sistema é responsável por gerenciar os ativos(Veículos), podendo monitorar via GPS.",
    image: "/gestaoDeAtivos.jpg",
    tags: ["Node.js", "Express.js", "Redis", "TypeScript", "MySQL", "Docker", "API Rest", "HTML", "CSS", "JavaScript"],
  },
];

export default function Projects() {

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
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
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            Meus Projetos
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
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-400"
          >
            Uma mostra do meu trabalho recente em Desenvolvimento Full Stack.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.2 }
              }}
            >
              <CardContainer className="inter-var">
                <CardBody className="relative group/card hover:shadow-2xl hover:shadow-blue-500/[0.1] w-full sm:w-[24rem] min-h-[600px] flex flex-col items-center text-center rounded-xl p-4 border backdrop-blur-md transition-all duration-300 bg-white/10 border-white/20 shadow-lg shadow-black/20">
                  {/* Efeito de brilho azul - borda com blur */}
                  <div className="absolute inset-0 rounded-xl border-2 border-blue-500 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 blur-sm" />
                  {/* Efeito de brilho azul - borda sem blur */}
                  <div className="absolute inset-0 rounded-xl border border-blue-500 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-white text-center w-full"
                >
                  {project.title}
                </CardItem>
                
                <CardItem
                  as="div"
                  translateZ="60"
                  className="w-full mt-6"
                >
                  <div className="relative w-full h-36 rounded-lg overflow-hidden mb-4">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      loading="lazy"
                      className="object-cover group-hover/card:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardItem>
                
                <CardItem
                  translateZ="70"
                  className="flex flex-wrap gap-2 mb-4 justify-center"
                >
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-4 py-2 rounded-full text-sm font-medium bg-gray-800/80 text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </CardItem>
                
                <CardItem
                  translateZ="80"
                  className="text-sm leading-relaxed mb-6 text-gray-300 flex-1 text-center w-full"
                >
                  {project.description}
                </CardItem>
                
                <CardItem
                  translateZ="90"
                  className="flex flex-wrap gap-2 mt-auto justify-center w-full"
                >
                  {/* URLs customizadas */}
                  {project.urls?.map((urlItem, urlIndex) => {
                    // Verifica se é um link externo baseado no label ou se usa ícone ExternalLink
                    const isExternalLink = urlItem.label === "Formulário" || urlItem.label === "Login" || urlItem.label === "Live Demo" || 
                                         (React.isValidElement(urlItem.icon) && urlItem.icon.type === ExternalLink);
                    return (
                      <a
                        key={urlIndex}
                        href={urlItem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1 px-1.5 py-1 rounded-md text-xs font-medium transition-all duration-200 backdrop-blur-sm border flex-shrink-0 ${
                          isExternalLink 
                            ? "bg-blue-500/90 text-white hover:bg-blue-600/90 border-blue-400/30" 
                            : "bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 border-gray-700/50"
                        }`}
                      >
                        {urlItem.icon || <ExternalLink className="w-3 h-3" />}
                        {urlItem.label}
                      </a>
                    );
                  })}
                  
                  {/* URLs padrão (mantidas para compatibilidade) */}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-1.5 py-1 rounded-md text-xs font-medium transition-all duration-200 backdrop-blur-sm bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 border border-gray-700/50 flex-shrink-0"
                    >
                      <SiGithub className="w-3 h-3" />
                      GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-1.5 py-1 rounded-md text-xs font-medium bg-blue-500/90 text-white hover:bg-blue-600/90 transition-all duration-200 backdrop-blur-sm border border-blue-400/30 flex-shrink-0"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Live Demo
                    </a>
                  )}
                </CardItem>
              </CardBody>
            </CardContainer>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
