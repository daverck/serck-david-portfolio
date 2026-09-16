import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SkillCategoryCard } from '../skills/SkillCategoryCard';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { resume, t } = useLanguage();
  const skillsList = resume.sections.skills.items;

  const filteredSkills = activeCategory === 'all'
    ? skillsList
    : skillsList.filter(s => s.name.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section id="skills" className="py-16 md:py-24 border-t border-slate-200/70 dark:border-slate-800/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-500/10 dark:bg-brand-500/20 px-3 py-1 rounded-full">
            {t('skills.badge')}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('skills.title')}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-base">
            {t('skills.subtitle')}
          </p>

          {/* Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === 'all'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {t('skills.all')} ({skillsList.reduce((acc, cat) => acc + cat.keywords.length, 0)})
            </button>
            {skillsList.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.name)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat.name
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat.name.split('&')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map(category => (
            <SkillCategoryCard key={category.id} category={category} />
          ))}
        </div>

      </div>
    </section>
  );
};
