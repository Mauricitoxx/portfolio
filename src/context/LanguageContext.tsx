'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/utils/translations';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.es;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    // Try to get the language from localStorage on mount
    const savedLang = localStorage.getItem('portfolio-lang') as Language;
    if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
      // eslint-disable-next-line
      setLanguageState(savedLang);
    } else {
      // Check browser preference
      const browserLang = navigator.language.startsWith('en') ? 'en' : 'es';
      // eslint-disable-next-line
      setLanguageState(browserLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('portfolio-lang', lang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
