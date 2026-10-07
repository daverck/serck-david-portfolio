import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t('common.backToTop')}
      title={t('common.backToTop')}
      className={`fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800/80 shadow-lg hover:shadow-xl hover:border-brand-500/50 hover:text-brand-600 dark:hover:text-brand-400 hover:-translate-y-1 active:translate-y-0 backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
    </button>
  );
};
