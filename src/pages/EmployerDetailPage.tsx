import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { getEmployerBySlug } from '../data/employers';
import { EmployerHero } from '../components/experience/EmployerHero';
import { ProjectCard } from '../components/experience/ProjectCard';
import { EmployerNav } from '../components/experience/EmployerNav';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Layers, Search, Filter, AlertCircle, ArrowLeft } from 'lucide-react';

export const EmployerDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState<string>('all');

  const employer = useMemo(() => {
    return slug ? getEmployerBySlug(slug, lang) : undefined;
  }, [slug, lang]);

  // Obtenir toutes les technologies uniques de cet employeur
  const allTechs = useMemo(() => {
    if (!employer) return [];
    const set = new Set<string>();
    employer.projects.forEach(p => {
      p.techStack?.forEach(tItem => set.add(tItem));
    });
    return Array.from(set);
  }, [employer]);

  // Filtrer les projets par terme de recherche et technologie
  const filteredProjects = useMemo(() => {
    if (!employer) return [];
    return employer.projects.filter(project => {
      const matchesSearch =
        searchTerm === '' ||
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.rawDescription.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTech =
        selectedTech === 'all' ||
        project.techStack?.some(tItem => tItem.toLowerCase() === selectedTech.toLowerCase());

      return matchesSearch && matchesTech;
    });
  }, [employer, searchTerm, selectedTech]);

  if (!employer) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/10 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {t('detail.notFoundTitle')}
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
          {t('detail.notFoundDesc')}
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm hover:bg-brand-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('detail.backHome')}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Top Breadcrumb Bar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-4">
        <Breadcrumb
          items={[
            { label: t('detail.breadcrumbExp'), to: '/#experience-overview' },
            { label: employer.name },
          ]}
        />
      </div>

      {/* Hero of the employer */}
      <EmployerHero employer={employer} />

      {/* Projects Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        
        {/* Controls: Title, Search, Filter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {t('detail.projectsTitle')} {employer.name}
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {t('detail.showing')} {filteredProjects.length} {t('detail.on')} {employer.projects.length} {t('detail.projectsSuffix')}
            </p>
          </div>

          {/* Search bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder={t('detail.searchPlaceholder')}
                className="pl-9 pr-4 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 w-52 sm:w-60"
              />
            </div>

            {/* Filter by tech if more than 2 techs */}
            {allTechs.length > 2 && (
              <div className="relative">
                <select
                  value={selectedTech}
                  onChange={e => setSelectedTech(e.target.value)}
                  className="py-2 pl-3 pr-8 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/40 appearance-none cursor-pointer"
                >
                  <option value="all">{t('detail.allTechs')}</option>
                  {allTechs.map(tech => (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  ))}
                </select>
                <Filter className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            )}
          </div>
        </div>

        {/* Projects Cards List */}
        {filteredProjects.length > 0 ? (
          <div className="space-y-8">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        ) : (
          <div className="p-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {t('detail.noProject')}
            </p>
            <button
              type="button"
              onClick={() => { setSearchTerm(''); setSelectedTech('all'); }}
              className="mt-3 text-xs font-semibold text-brand-600 dark:text-brand-400 underline"
            >
              {t('detail.resetFilters')}
            </button>
          </div>
        )}

        {/* Bottom Navigation between Employers */}
        <EmployerNav currentSlug={employer.slug} />

      </div>
    </div>
  );
};
