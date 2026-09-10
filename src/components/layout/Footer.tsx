import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ExternalLink } from '../common/ExternalLink';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import { Mail, Cloud } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { resume, t } = useLanguage();
  const linkedin = resume.sections.profiles.items.find(p => p.network.toLowerCase().includes('linkedin'));
  const github = resume.sections.profiles.items.find(p => p.network.toLowerCase().includes('github'));

  return (
    <footer className="mt-20 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-base font-bold text-slate-900 dark:text-white">
              {resume.basics.name}
            </span>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {resume.basics.headline} • {resume.basics.location}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
            {github && (
              <ExternalLink
                href={github.website.url}
                showIcon={false}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
              >
                <GithubIcon className="w-5 h-5" />
              </ExternalLink>
            )}
            {linkedin && (
              <ExternalLink
                href={linkedin.website.url}
                showIcon={false}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
              >
                <LinkedinIcon className="w-5 h-5" />
              </ExternalLink>
            )}
            <a
              href={`mailto:${resume.basics.email}`}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
              title="Envoyer un email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {currentYear} {resume.basics.name}. {t('footer.rights')}</p>
          
          <div className="flex items-center gap-2">
            <span>{t('footer.deployedWith')}</span>
            <span className="inline-flex items-center gap-1 font-medium text-amber-600 dark:text-amber-400">
              <Cloud className="w-3.5 h-3.5" />
              Cloudflare Pages
            </span>
            <span>• {t('footer.builtWith')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
