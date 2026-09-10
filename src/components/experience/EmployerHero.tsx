import React from 'react';
import { EmployerDetails } from '../../types/resume';
import { ExternalLink } from '../common/ExternalLink';
import { RichHtml } from '../common/RichHtml';
import { Calendar, MapPin, Briefcase, Sparkles } from 'lucide-react';

export const EmployerHero: React.FC<{ employer: EmployerDetails }> = ({ employer }) => {
  return (
    <div className="relative pt-6 pb-12 overflow-hidden border-b border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-slate-100/60 to-transparent dark:from-slate-900/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${employer.badgeBg}`}>
            <Briefcase className="w-3.5 h-3.5" />
            <span>{employer.badgeText}</span>
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-200/60 dark:border-slate-700/60">
            <Calendar className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span>{employer.period}</span>
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-200/60 dark:border-slate-700/60">
            <MapPin className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span>{employer.location}</span>
          </span>
          {employer.websiteUrl && (
            <ExternalLink
              href={employer.websiteUrl}
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              <span>Site officiel {employer.name}</span>
            </ExternalLink>
          )}
        </div>

        {/* Title and Position */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {employer.position}{' '}
          <span className="text-brand-600 dark:text-brand-400">@ {employer.name}</span>
        </h1>

        <p className="mt-3 text-lg font-medium text-slate-700 dark:text-slate-300 max-w-3xl">
          {employer.tagline}
        </p>

        {/* Missions Overview */}
        {employer.overviewHtml && (
          <div className="mt-6 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm max-w-3xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              <span>Synthèse des responsabilités & périmètre</span>
            </h3>
            <RichHtml html={employer.overviewHtml} />
          </div>
        )}

      </div>
    </div>
  );
};

