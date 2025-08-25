'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { Language } from '@/lib/types';

// Import all locale data statically
import es from '@/locales/es.json';
import en from '@/locales/en.json';
import fr from '@/locales/fr.json';
import ja from '@/locales/ja.json';
import pt from '@/locales/pt.json';

const translations: Record<Language, any> = { es, en, fr, ja, pt };

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('es');
  
  useEffect(() => {
    const browserLang = navigator.language.split('-')[0] as Language;
    if (['es', 'en', 'fr', 'ja', 'pt'].includes(browserLang)) {
        setLanguageState(browserLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
        document.documentElement.lang = lang;
    }
  };

  const t = useCallback((key: string): string => {
    return translations[language][key] || key;
  }, [language]);

  const value = { language, setLanguage, t };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
