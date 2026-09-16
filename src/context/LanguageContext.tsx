import React, { createContext, useContext, useState, useEffect } from 'react';
import { resumeDataFr, resumeDataEn, getEmployersList } from '../data/employers';
import { ResumeData, EmployerDetails } from '../types/resume';
import cvFr from '../data/cv-serck-david-francais.pdf';
import cvEn from '../data/cv-serck-david.pdf';

import { translations, TranslationKey } from '../locales';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  resume: ResumeData;
  employers: EmployerDetails[];
  cvUrl: string;
  cvFileName: string;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language');
      if (saved === 'fr' || saved === 'en') return saved;
      // Préférer le français par défaut ou détection navigateur
      const browserLang = navigator.language.slice(0, 2);
      return browserLang === 'en' ? 'en' : 'fr';
    }
    return 'fr';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('language', newLang);
    document.documentElement.lang = newLang;
  };

  const toggleLang = () => {
    setLang(lang === 'fr' ? 'en' : 'fr');
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const resume = lang === 'fr' ? resumeDataFr : resumeDataEn;
  const employers = getEmployersList(lang);
  const cvUrl = lang === 'fr' ? cvFr : cvEn;
  const cvFileName = lang === 'fr' ? 'cv-serck-david-francais.pdf' : 'cv-serck-david.pdf';

  const t = (key: TranslationKey): string => {
    return translations[lang][key] || translations.fr[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, resume, employers, cvUrl, cvFileName, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
