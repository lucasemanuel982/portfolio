'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { langPT } from '@/locales/langPT';
import { langEN } from '@/locales/langEN';
import { langES } from '@/locales/langES';

type Language = 'pt' | 'en' | 'es';
type Translations = typeof langPT;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    translations: Translations;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('pt');
    const [translations, setTranslations] = useState<Translations>(langPT);

    useEffect(() => {
        const storedLang = localStorage.getItem('language') as Language;
        if (storedLang) {
            setLanguage(storedLang);
        } else {
            const browserLang = navigator.language.toLowerCase();
            if (browserLang.startsWith('pt')) {
                setLanguage('pt');
            } else if (browserLang.startsWith('es')) {
                setLanguage('es');
            } else if (browserLang.startsWith('en')) {
                setLanguage('en');
            }
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    useEffect(() => {
        switch (language) {
            case 'pt':
                setTranslations(langPT);
                break;
            case 'en':
                setTranslations(langEN);
                break;
            case 'es':
                setTranslations(langES);
                break;
            default:
                setTranslations(langPT);
        }
    }, [language]);

    const t = (key: string) => {
        const keys = key.split('.');
        let value: any = translations;
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return key; // Return the key if translation is missing
            }
        }
        return value as string;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, translations, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
