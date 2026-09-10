import React from 'react';
import { ParsedProject } from '../../types/resume';
import { ExternalLink } from '../common/ExternalLink';
import { RichHtml } from '../common/RichHtml';
import { Calendar, Code2 } from 'lucide-react';

export const ProjectCard: React.FC<{ project: ParsedProject; index: number }> = ({ project, index }) => {
  return (
    <article
      className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-brand-500/40 group"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
              #{String(index + 1).padStart(2, '0')}
            </span>
            {project.url && (
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                En ligne / Référence
              </span>
            )}
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            {project.title}
          </h3>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {project.period && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
              <Calendar className="w-3.5 h-3.5" />
              <span>{project.period}</span>
            </span>
          )}

          {project.url && (
            <ExternalLink
              href={project.url}
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 bg-teal-50 dark:bg-teal-950/40 px-3 py-1 rounded-lg border border-teal-200 dark:border-teal-800/50"
            >
              <span>Voir le projet</span>
            </ExternalLink>
          )}
        </div>
      </div>

      {/* Tech stack tags */}
      {project.techStack && project.techStack.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 mb-6 pt-1">
          <Code2 className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
          {project.techStack.map((tech, i) => (
            <span
              key={i}
              className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Rich content (Context, Achievements, Tasks, Environment) */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60">
        <RichHtml html={project.rawDescription} />
      </div>
    </article>
  );
};
