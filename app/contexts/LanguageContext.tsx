'use client';

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { t } from '@/app/lib/i18n/translations';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<string>('en');

  // Function to set language and save to localStorage
  const setLanguage = (lang: string) => {
    // Ensure we only use supported languages (for now, just 'en' and 'vi')
    const supportedLang = ['en', 'vi'].includes(lang) ? lang : 'en';
    setLanguageState(supportedLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', supportedLang);
    }
  };

  // Translation function that uses the current language
  const translate = (key: string, params?: Record<string, string | number>) => {
    return t(key, language, params);
  };

  // Load language preference from localStorage on initial render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage) {
        setLanguageState(savedLanguage);
      } else {
        // Try to detect browser language
        const browserLang = navigator.language.split('-')[0];
        setLanguage(['en', 'vi'].includes(browserLang) ? browserLang : 'en');
      }
    }
  }, []);

  const value = {
    language,
    setLanguage,
    t: translate,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};