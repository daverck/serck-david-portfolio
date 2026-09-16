import React from 'react';
import { ResumeEducationItem } from '../../types/resume';
import { RichHtml } from '../common/RichHtml';
import { GraduationCap, Calendar, ExternalLink as ExternalLinkIcon } from 'lucide-react';

interface EducationCardProps {
  item: ResumeEducationItem;
}

export const EducationCard: React.FC<EducationCardProps> = ({ item }) => {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-brand-500/40 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
        <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
          {item.website?.url ? (
            <a
              href={item.website.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors inline-flex items-center gap-1.5 group/link"
            >
              <span>{item.school}</span>
              <ExternalLinkIcon className="w-3.5 h-3.5 text-slate-400 group-hover/link:text-teal-500 shrink-0" />
            </a>
          ) : (
            <span>{item.school}</span>
          )}
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
  );
};

