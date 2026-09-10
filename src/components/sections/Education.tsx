import React from 'react';
import { resumeData } from '../../data/employers';
import { RichHtml } from '../common/RichHtml';
import { GraduationCap, Calendar, Languages, Sparkles } from 'lucide-react';

export const Education: React.FC = () => {
  const educationItems = resumeData.sections.education.items;
  const languages = resumeData.sections.languages.items;

  return (
    <section id="education" className="py-16 md:py-24 border-t border-slate-200/70 dark:border-slate-800/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Education / Formations (Takes 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-500/10 dark:bg-brand-500/20 px-3 py-1 rounded-full">
                Parcours Académique
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Diplômes & Formations
              </h2>
            </div>

            <div className="space-y-4 pt-2">
              {educationItems.map(item => (
                <div
                  key={item.id}
                  className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-brand-500/40 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
                      <span>{item.school}</span>
                    </h3>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md w-fit">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.period}
                    </span>
                  </div>

                  {item.degree && (
                    <p className="text-sm font-semibold text-brand-700 dark:text-brand-300">
                      {item.degree} {item.grade && <span className="font-normal text-emerald-600 dark:text-emerald-400 font-medium"> — {item.grade}</span>}
                    </p>
                  )}

                  {item.description && (
                    <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                      <RichHtml html={item.description} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Languages & Profile overview */}
          <div className="space-y-8">
            {/* Languages */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="p-2 rounded-xl bg-teal-500/10 text-brand-600 dark:text-brand-400">
                  <Languages className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                  Langues
                </h3>
              </div>

              <div className="space-y-4">
                {languages.map(lang => {
                  const percentage = Math.min(100, (lang.level / 5) * 100);
                  const getFluencyLabel = (lvl: number) => {
                    if (lvl >= 5) return 'Langue maternelle';
                    if (lvl >= 4) return 'Courant / Technique';
                    if (lvl >= 3) return 'Intermédiaire';
                    return 'Notions de base';
                  };

                  return (
                    <div key={lang.id} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {lang.language}
                        </span>
                        <span className="text-slate-500 dark:text-slate-400">
                          {getFluencyLabel(lang.level)}
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

            {/* Interests & Values */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-500/5 to-indigo-500/5 dark:from-teal-950/20 dark:to-indigo-950/20 border border-teal-200/40 dark:border-teal-800/40">
              <div className="flex items-center gap-2 text-brand-700 dark:text-brand-300 font-bold text-sm mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Profil & Démarche</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Passionné par le code propre, l'architecture logicielle pérenne, et l'apprentissage continu (IA générative, architectures distribuées, UI moderne).
              </p>
              {resumeData.sections.interests?.items?.[0] && (
                <div className="mt-3 pt-3 border-t border-slate-200/50 dark:border-slate-800/50 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold">Loisirs : </span>
                  {resumeData.sections.interests.items[0].name}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

