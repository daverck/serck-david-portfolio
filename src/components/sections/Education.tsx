import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { EducationCard } from '../education/EducationCard';
import { LanguagesCard } from '../education/LanguagesCard';
import { InterestsCard } from '../education/InterestsCard';

export const Education: React.FC = () => {
  const { resume, t } = useLanguage();
  const educationItems = resume.sections.education.items;

  return (
    <section id="education" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Education / Formations (Takes 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-500/10 dark:bg-brand-500/20 px-3 py-1 rounded-full">
                {t('edu.badge')}
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {t('edu.title')}
              </h2>
            </div>

            <div className="space-y-4 pt-2">
              {educationItems.map(item => (
                <EducationCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Right Column: Languages & Profile overview */}
          <div className="space-y-8">
            <LanguagesCard />
            <InterestsCard />
          </div>

        </div>

      </div>
    </section>
  );
};
