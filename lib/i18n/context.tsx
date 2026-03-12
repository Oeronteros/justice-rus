'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { ru, type Translations } from './translations/ru';
import { en } from './translations/en';
import { zh } from './translations/zh';
import { defaultLanguage, isLanguage, type Language } from './shared';

export type { Language } from './shared';

const translations: Record<Language, Translations> = { ru, en, zh };

interface I18nContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = 'guild_portal_lang';

function getStoredLanguage(): Language | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  return isLanguage(stored) ? stored : null;
}

interface I18nProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export function I18nProvider({ children, defaultLanguage: initialLanguage = defaultLanguage }: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => getStoredLanguage() ?? initialLanguage);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const value: I18nContextValue = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider');
  }
  return context;
}

export function useLanguage() {
  const { language, setLanguage } = useTranslation();
  return { language, setLanguage };
}
