import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-xl p-1 border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-xs font-bold shadow-sm ${className}`}
      role="group"
      aria-label="Sélection de la langue / Language selection"
    >
      <div className="pl-1.5 pr-0.5 text-slate-400">
        <Globe className="w-3.5 h-3.5" />
      </div>

      <button
        type="button"
        onClick={() => setLang('fr')}
        className={`px-2 py-1 rounded-lg transition-all duration-200 ${
          lang === 'fr'
            ? 'bg-teal-600 text-white shadow-xs'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
        aria-pressed={lang === 'fr'}
      >
        FR
      </button>

      <button
        type="button"
        onClick={() => setLang('en')}
        className={`px-2 py-1 rounded-lg transition-all duration-200 ${
          lang === 'en'
            ? 'bg-teal-600 text-white shadow-xs'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
    </div>
  );
};
