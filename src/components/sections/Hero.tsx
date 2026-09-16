import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ExternalLink } from '../common/ExternalLink';
import { RichHtml } from '../common/RichHtml';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import { MapPin, Mail, Phone, ArrowDown, Sparkles, FileDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const [imgError, setImgError] = useState(false);
  const { resume, t, cvUrl, cvFileName } = useLanguage();
  const linkedin = resume.sections.profiles.items.find(p => p.network.toLowerCase().includes('linkedin'));
  const github = resume.sections.profiles.items.find(p => p.network.toLowerCase().includes('github'));

  return (
    <section className="relative pt-6 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/10 dark:bg-brand-500/15 blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/10 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-14">
          
          {/* Left Text Column */}
          <div className="flex-1 text-center md:text-left">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 mb-6 animate-fade-in shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{t('hero.available')}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              {t('hero.greeting')}{' '}
              <span className="bg-gradient-to-r from-brand-600 via-teal-500 to-primary-light bg-clip-text text-transparent">
                {resume.basics.name}
              </span>
            </h1>

            <p className="mt-3 text-xl sm:text-2xl font-medium text-slate-700 dark:text-slate-300">
              {resume.basics.headline}
            </p>

            <div className="mt-4 max-w-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              <RichHtml html={resume.summary.content} />
            </div>

            {/* Quick Location & Contact meta */}
            <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
                <span>{resume.basics.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
                <a
                  href={`mailto:${resume.basics.email}`}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  {resume.basics.email}
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
                <a
                  href={`tel:${resume.basics.phone}`}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  {resume.basics.phone}
                </a>
              </div>
            </div>

            {/* CTA Buttons & Social Links */}
            <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3.5">
              <a
                href="#experience-overview"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-teal-600 text-white font-semibold text-sm shadow-md hover:from-brand-700 hover:to-teal-700 transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{t('hero.explore')}</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm"
              >
                <span>{t('hero.contactMe')}</span>
              </a>

              <a
                href={cvUrl}
                download={cvFileName}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-brand-500/50 dark:hover:border-brand-500/50 hover:text-brand-600 dark:hover:text-brand-400 transition-all shadow-sm"
              >
                <FileDown className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>{t('hero.downloadCv')}</span>
              </a>

              {github && (
                <ExternalLink
                  href={github.website.url}
                  showIcon={false}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 hover:border-brand-500/50 hover:text-brand-600 dark:hover:text-brand-400 transition-all shadow-sm"
                >
                  <GithubIcon className="w-5 h-5" />
                </ExternalLink>
              )}

              {linkedin && (
                <ExternalLink
                  href={linkedin.website.url}
                  showIcon={false}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 hover:border-brand-500/50 hover:text-brand-600 dark:hover:text-brand-400 transition-all shadow-sm"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </ExternalLink>
              )}
            </div>
          </div>

          {/* Right Column: Avatar Photo */}
          <div className="relative shrink-0">
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-3xl p-2 bg-gradient-to-tr from-brand-600 via-teal-400 to-blue-500 shadow-2xl">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                {!imgError ? (
                  <img
                    src={resume.picture.url}
                    alt={resume.basics.name}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-brand-700 to-slate-900 text-white font-extrabold text-5xl">
                    DS
                  </div>
                )}
              </div>
            </div>

            {/* Experience Badge floating */}
            <div className="absolute -bottom-3 -right-2 sm:-bottom-4 sm:-right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-lg flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-teal-500/15 flex items-center justify-center text-brand-600 dark:text-brand-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-slate-900 dark:text-white">{t('hero.expYears')}</span>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400 font-medium">{t('hero.spec')}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
