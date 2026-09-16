import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles } from 'lucide-react';

export const InterestsCard: React.FC = () => {
  const { resume, t } = useLanguage();

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-500/5 to-indigo-500/5 dark:from-teal-950/20 dark:to-indigo-950/20 border border-teal-200/40 dark:border-teal-800/40">
      <div className="flex items-center gap-2 text-brand-700 dark:text-brand-300 font-bold text-sm mb-2">
        <Sparkles className="w-4 h-4" />
        <span>{t('edu.profile')}</span>
      </div>
      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        {t('edu.profileDesc')}
      </p>
      {resume.sections.interests?.items?.[0] && (
        <div className="mt-3 pt-3 border-t border-slate-200/50 dark:border-slate-800/50 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-semibold">{t('edu.hobbies')} </span>
          {resume.sections.interests.items[0].name}
        </div>
      )}
    </div>
  );
};

