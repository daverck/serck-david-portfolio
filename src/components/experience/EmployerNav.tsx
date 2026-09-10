import React from 'react';
import { Link } from 'react-router';
import { EmployerSlug } from '../../types/resume';
import { useLanguage } from '../../context/LanguageContext';
import { getNextEmployer, getPrevEmployer } from '../../data/employers';
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';

export const EmployerNav: React.FC<{ currentSlug: EmployerSlug }> = ({ currentSlug }) => {
  const { lang, t } = useLanguage();
  const prev = getPrevEmployer(currentSlug, lang);
  const next = getNextEmployer(currentSlug, lang);

  return (
    <nav aria-label="Navigation entre employeurs" className="pt-12 pb-6 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Previous Employer */}
        <Link
          to={`/experience/${prev.slug}`}
          className="group flex flex-col p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-brand-500/50 hover:shadow-md transition-all text-left"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>{t('detail.prevEmployer')}</span>
          </div>
          <span className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            {prev.name}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {prev.period} • {prev.projects.length} {t('detail.projectsSuffix')}
          </span>
        </Link>

        {/* Next Employer */}
        <Link
          to={`/experience/${next.slug}`}
          className="group flex flex-col items-end p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-brand-500/50 hover:shadow-md transition-all text-right"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
            <span>{t('detail.nextEmployer')}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
          <span className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            {next.name}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {next.period} • {next.projects.length} {t('detail.projectsSuffix')}
          </span>
        </Link>

      </div>

      <div className="mt-6 text-center">
        <Link
          to="/#experience-overview"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
        >
          <LayoutGrid className="w-4 h-4" />
          <span>{t('detail.backToOverview')}</span>
        </Link>
      </div>
    </nav>
  );
};
