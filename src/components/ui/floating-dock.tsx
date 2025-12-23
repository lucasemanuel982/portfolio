"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface DockItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  onClick?: () => void;
}

interface FloatingDockProps {
  items: DockItem[];
  className?: string;
  mobileClassName?: string;
}

export function FloatingDock({
  items,
  className,
  mobileClassName,
}: FloatingDockProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <motion.div
        className={cn(
          "flex items-center gap-2 rounded-2xl bg-neutral-950/80 backdrop-blur-sm border border-neutral-800/50 px-4 py-3 shadow-2xl",
          mobileClassName
        )}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
      >
        {items.map((item, index) => {
          const isEmailItem = !!item.onClick;
          
          return (
            <motion.a
              key={item.title}
              href={isEmailItem ? "#" : item.href}
              target={isEmailItem ? "_self" : "_blank"}
              rel={isEmailItem ? "" : "noopener noreferrer"}
              onClick={(e) => {
                if (isEmailItem && item.onClick) {
                  e.preventDefault();
                  e.stopPropagation();
                  item.onClick();
                }
              }}
              className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl bg-neutral-900/50 p-2.5 text-neutral-500 transition-all duration-150 ease-out hover:bg-neutral-800/80 hover:text-neutral-300 hover:scale-110 hover:-translate-y-1 relative"
              whileHover={{ scale: 1.0 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.15,
                delay: index * 0.05,
                ease: "easeOut",
              }}
            >
            {/* Efeito de brilho azul - igual aos cards das skills */}
            <div className="absolute inset-0 rounded-xl border-2 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150 blur-sm" />
            <div className="absolute inset-0 rounded-xl border border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
            
              {/* Ícone */}
              <div className="relative z-10">
                {item.icon}
              </div>
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
}
