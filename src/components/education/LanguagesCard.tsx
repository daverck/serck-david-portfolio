import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Languages as LanguagesIcon } from 'lucide-react';

export const LanguagesCard: React.FC = () => {
  const { resume, lang, t } = useLanguage();
  const languages = resume.sections.languages.items;

  const getFluencyLabel = (lvl: number, fluency?: string) => {
    if (fluency) return fluency;
    if (lang === 'fr') {
      if (lvl >= 5) return 'Langue maternelle';
      if (lvl >= 4) return 'Courant / Technique';
      if (lvl >= 3) return 'Intermédiaire';
      return 'Notions de base';
    } else {
      if (lvl >= 5) return 'Native';
      if (lvl >= 4) return 'Professional / Fluent';
      if (lvl >= 3) return 'Intermediate';
      return 'Basic notions';
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="p-2 rounded-xl bg-teal-500/10 text-brand-600 dark:text-brand-400">
          <LanguagesIcon className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-slate-900 dark:text-white text-lg">
          {t('edu.languages')}
        </h3>
      </div>

      <div className="space-y-4">
        {languages.map(langItem => {
          const percentage = Math.min(100, (langItem.level / 5) * 100);

          return (
            <div key={langItem.id} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {langItem.language}
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  {getFluencyLabel(langItem.level, langItem.fluency)}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-brand-600 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

