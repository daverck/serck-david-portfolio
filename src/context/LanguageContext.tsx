import React, { createContext, useContext, useEffect, useCallback } from 'react';
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

export const LanguageProvider: React.FC<{
  children: React.ReactNode;
  initialLanguage: Language;
}> = ({ children, initialLanguage }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const lang = initialLanguage;

  useEffect(() => {
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback(
    (newLang: Language) => {
      const currentParams = new URLSearchParams(location.search);
      currentParams.delete('lang');
      const currentPath = location.pathname.replace(/^\/(?:fr|en)(?=\/|$)/, '');
      const nextPath = currentPath
        ? `/${newLang}${currentPath.endsWith('/') ? currentPath : `${currentPath}/`}`
        : `/${newLang}/`;

      navigate(
        {
          pathname: nextPath,
          search: currentParams.toString() ? `?${currentParams.toString()}` : '',
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
