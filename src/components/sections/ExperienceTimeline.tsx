import React from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../../context/LanguageContext';
import { Briefcase, Calendar, MapPin, ArrowRight, Layers } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  const { employers, t } = useLanguage();

  return (
    <section id="experience-overview" className="py-16 md:py-24 border-t border-slate-200/70 dark:border-slate-800/70 bg-slate-100/40 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
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
            <div
              key={emp.slug}
              className="relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              {/* Subtle top border accent */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-300"
                style={{ backgroundColor: emp.accentColor }}
              />

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                
                {/* Left block: Info & overview */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${emp.badgeBg}`}>
                      <Briefcase className="w-3.5 h-3.5" />
                      {emp.badgeText}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {emp.period}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                      <MapPin className="w-3.5 h-3.5" />
                      {emp.location}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {emp.position} — <span className="font-extrabold">{emp.name}</span>
                    </h3>
                    <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                      {emp.fullName}
                    </p>
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                    {emp.tagline}
                  </p>

                  {/* Key achievements preview bullets */}
                  <div className="pt-2">
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                      {t('exp.highlights')}
                    </span>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                      {emp.keyHighlights.slice(0, 4).map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right block: Action card with project count */}
                <div className="lg:w-72 shrink-0 flex flex-col justify-between p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                      <Layers className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0" />
                      <span>{emp.projects.length}</span>
                      <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{t('exp.keyProjects')}</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {t('exp.desc')}
                    </p>
                  </div>

                  <Link
                    to={`/experience/${emp.slug}`}
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs uppercase tracking-wider hover:bg-brand-600 dark:hover:bg-brand-400 dark:hover:text-slate-950 transition-colors shadow-sm group-hover:scale-[1.02]"
                  >
                    <span>{t('exp.viewPage')} {emp.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
