import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ExternalLink } from '../common/ExternalLink';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const { resume, t } = useLanguage();
  const linkedin = resume.sections.profiles.items.find(p => p.network.toLowerCase().includes('linkedin'));
  const github = resume.sections.profiles.items.find(p => p.network.toLowerCase().includes('github'));

  return (
    <section id="contact" className="py-16 md:py-24 border-t border-slate-200/70 dark:border-slate-800/70 bg-gradient-to-b from-transparent to-slate-100/50 dark:to-slate-900/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-500/10 dark:bg-brand-500/20 px-3 py-1 rounded-full">
          {t('contact.badge')}
        </span>

        <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t('contact.title')}
        </h2>

        <p className="mt-4 text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
          {t('contact.subtitle')}
        </p>

        {/* Cards Grid for contact methods */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left">
          
          {/* Email */}
          <a
            href={`mailto:${resume.basics.email}`}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-brand-500/50 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <span className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {t('contact.emailLabel')}
            </span>
            <span className="block font-semibold text-slate-900 dark:text-white text-sm mt-0.5 truncate">
              {resume.basics.email}
            </span>
          </a>

          {/* Téléphone */}
          <a
            href={`tel:${resume.basics.phone}`}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-brand-500/50 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
            <span className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {t('contact.phoneLabel')}
            </span>
            <span className="block font-semibold text-slate-900 dark:text-white text-sm mt-0.5">
              {resume.basics.phone}
            </span>
          </a>

          {/* Localisation */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm sm:col-span-2 md:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {t('contact.locationLabel')}
            </span>
            <span className="block font-semibold text-slate-900 dark:text-white text-sm mt-0.5">
              {resume.basics.location}
            </span>
          </div>

        </div>

        {/* Quick Direct action button */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
          <a
            href={`mailto:${resume.basics.email}?subject=${encodeURIComponent(t('contact.mailSubject'))}`}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-sm shadow-md hover:bg-brand-600 dark:hover:bg-brand-400 transition-all hover:shadow-lg"
          >
            <Send className="w-4 h-4" />
            <span>{t('contact.sendDirect')}</span>
          </a>

          {linkedin && (
            <ExternalLink
              href={linkedin.website.url}
              showIcon={false}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm"
            >
              <LinkedinIcon className="w-4 h-4 text-blue-600" />
              <span>{t('contact.linkedin')}</span>
            </ExternalLink>
          )}

          {github && (
            <ExternalLink
              href={github.website.url}
              showIcon={false}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm"
            >
              <GithubIcon className="w-4 h-4" />
              <span>{t('contact.github')}</span>
            </ExternalLink>
          )}
        </div>

      </div>
    </section>
  );
};
