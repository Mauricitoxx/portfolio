'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { dictionary, type Dictionary } from '@/i18n/dictionary';
import type { Lang, Localized } from '@/lib/site';

interface LanguageContextType {
  language: Lang;
  setLanguage: (lang: Lang) => void;
  t: Dictionary;
  /** helper: elige el string del idioma activo de un campo Localized */
  tr: <T>(value: Localized<T>) => T;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio-lang';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Lang>('es');

  useEffect(() => {
    // Segundo render en cliente: sincronizamos el idioma con la preferencia
    // guardada / del navegador. No se puede hacer en el initializer de useState
    // porque rompería la hidratación (el SSR siempre renderiza "es").
    let next: Lang | null = null;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'es' || saved === 'en') next = saved;
    } catch {
      /* storage no disponible: seguimos con el default */
    }
    if (!next && typeof navigator !== 'undefined') {
      next = navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'es';
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync desde localStorage tras montar
    if (next && next !== 'es') setLanguageState(next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: Lang) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* noop */
    }
  }, []);

  const tr = useCallback(
    <T,>(value: Localized<T>): T => value[language],
    [language],
  );

  const t: Dictionary = dictionary[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tr }}>
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
