"use client";

import { useEffect } from "react";

export default function SuppressHydrationWarning() {
  useEffect(() => {
    // Suprimir avisos de hidratação para atributos adicionados por extensões do navegador
    const originalError = console.error;
    const originalWarn = console.warn;
    
    console.error = (...args) => {
      const message = args[0];
      if (
        typeof message === "string" &&
        (message.includes("Hydration failed") ||
          message.includes("hydrated") ||
          message.includes("Warning: Extra attributes from the server") ||
          message.includes("cz-shortcut-listen") ||
          message.includes("data-extension") ||
          message.includes("did not match") ||
          message.includes("SSR-ed Client Component"))
      ) {
        return;
      }
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      const message = args[0];
      if (
        typeof message === "string" &&
        (message.includes("cz-shortcut-listen") ||
          message.includes("hydration"))
      ) {
        return;
      }
      originalWarn.apply(console, args);
    };

    // Limpar atributos de extensões que podem causar problemas de hidratação
    const removeExtensionAttributes = () => {
      const body = document.body;
      if (body) {
        // Remover atributos comuns de extensões
        const extensionAttributes = [
          'cz-shortcut-listen',
          'data-extension',
          'data-gramm_editor',
          'data-gramm',
          'spellcheck'
        ];
        
        extensionAttributes.forEach(attr => {
          if (body.hasAttribute(attr)) {
            body.removeAttribute(attr);
          }
        });
      }
    };

    // Executar após a hidratação
    const timer = setTimeout(removeExtensionAttributes, 100);

    return () => {
      clearTimeout(timer);
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  return null;
}


