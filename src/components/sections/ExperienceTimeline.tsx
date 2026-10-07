import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { EmployerCard } from '../experience/EmployerCard';
import { SlantedSectionBackground } from '../common/SlantedSectionBackground';

export const ExperienceTimeline: React.FC = () => {
  const { employers, t } = useLanguage();

  return (
    <section id="experience-overview" className="relative py-20 md:py-28 overflow-hidden">
      <SlantedSectionBackground direction="down" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-500/10 dark:bg-brand-500/20 px-3 py-1 rounded-full">
            {t('exp.badge')}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('exp.title')}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-base">
            {t('exp.subtitle')}
          </p>
        </div>

        {/* 3 Employers Cards Grid */}
        <div className="space-y-8">
          {employers.map(emp => (
            <EmployerCard key={emp.slug} employer={emp} />
          ))}
        </div>

      </div>
    </section>
  );
};
