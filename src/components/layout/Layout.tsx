import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Header } from './Header';
import { BackToTop } from '../common/BackToTop';
import { AmbientBackground } from './AmbientBackground';
import { useLanguage } from '../../context/LanguageContext';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname, hash } = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        const timer = setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <div className="relative flex flex-col min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Skip to Content accessible link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-brand-600 focus:text-white focus:font-semibold focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
      >
        {t('common.skipToContent')}
      </a>

      <AmbientBackground />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-grow relative z-10 focus:outline-none">
        {children}
      </main>
      <BackToTop />
    </div>
  );
};

