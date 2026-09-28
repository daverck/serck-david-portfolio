import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { resumeDataFr, resumeDataEn, getEmployersList } from '../data/employers';
import { ResumeData, EmployerDetails } from '../types/resume';

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

function getInitialLanguage(): Language {
  if (typeof window !== 'undefined') {
    // 1. Priorité absolue au query param 'lang' dans l'URL
    const params = new URLSearchParams(window.location.search);
    const paramLang = params.get('lang');
    if (paramLang === 'fr' || paramLang === 'en') {
      return paramLang;
    }

    // 2. Préférence sauvegardée en localStorage
    const saved = localStorage.getItem('language');
    if (saved === 'fr' || saved === 'en') {
      return saved;
    }

    // 3. Langue préférée du navigateur
    const browserLang = navigator.language.slice(0, 2);
    return browserLang === 'en' ? 'en' : 'fr';
  }
  return 'fr';
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(getInitialLanguage);
  const location = useLocation();
  const navigate = useNavigate();

  // Synchronisation bidirectionnelle avec l'URL (liens partagés, boutons précédent/suivant)
  useEffect(() => {
    const currentParams = new URLSearchParams(location.search);
    const urlLang = currentParams.get('lang');

    if (urlLang === 'fr' || urlLang === 'en') {
      if (urlLang !== lang) {
        setLangState(urlLang);
        localStorage.setItem('language', urlLang);
        document.documentElement.lang = urlLang;
      }
    } else {
      // Si le paramètre ?lang est absent ou non reconnu, l'ajouter à l'URL sans recharger la page
      currentParams.set('lang', lang);
      navigate(
        {
          pathname: location.pathname,
          search: `?${currentParams.toString()}`,
          hash: location.hash,
        },
        { replace: true }
      );
    }
  }, [location.search, location.pathname, location.hash, lang, navigate]);

  const setLang = useCallback(
    (newLang: Language) => {
      setLangState(newLang);
      localStorage.setItem('language', newLang);
      document.documentElement.lang = newLang;

      const currentParams = new URLSearchParams(location.search);
      currentParams.set('lang', newLang);
      navigate(
        {
          pathname: location.pathname,
          search: `?${currentParams.toString()}`,
          hash: location.hash,
        },
        { replace: true }
      );
    },
    [location.pathname, location.search, location.hash, navigate]
  );

  const toggleLang = useCallback(() => {
    setLang(lang === 'fr' ? 'en' : 'fr');
  }, [lang, setLang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const resume = lang === 'fr' ? resumeDataFr : resumeDataEn;
  const employers = getEmployersList(lang);
  const cvFileName = lang === 'fr' ? 'cv-portfolio-serck-david-francais.pdf' : 'cv-portfolio-serck-david.pdf';
  const cvUrl = `${import.meta.env.BASE_URL}${cvFileName}`;

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
