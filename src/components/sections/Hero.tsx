import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ExternalLink } from '../common/ExternalLink';
import { RichHtml } from '../common/RichHtml';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import { MapPin, Mail, Phone, ArrowDown, Sparkles, FileDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const [imgError, setImgError] = useState(false);
  const [isLongHair, setIsLongHair] = useState(false);
  const { resume, t, cvUrl, cvFileName, lang } = useLanguage();
  const linkedin = resume.sections.profiles.items.find(p => p.network.toLowerCase().includes('linkedin'));
  const github = resume.sections.profiles.items.find(p => p.network.toLowerCase().includes('github'));

  const shortHairUrl = `${import.meta.env.BASE_URL}avatar_short_hair.png`;
  const longHairUrl = `${import.meta.env.BASE_URL}avatar_long_hair.png`;

  return (
    <section className="relative pt-6 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-14">
          
          {/* Left Text Column */}
          <div className="flex-1 text-center md:text-left relative">
            {/* Halo doux de contraste garantissant une parfaite lisibilité du texte en mode clair */}
            <div className="absolute -inset-4 sm:-inset-8 bg-white/75 dark:bg-slate-950/40 rounded-3xl blur-2xl -z-10 pointer-events-none" />

            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 mb-6 animate-fade-in shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{t('hero.available')}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              <span className="bg-gradient-to-r from-brand-600 via-teal-500 to-primary-light bg-clip-text text-transparent">
                {resume.basics.name}
              </span>
            </h1>

            <p className="mt-3 text-xl sm:text-2xl font-medium text-slate-700 dark:text-slate-300">
              {resume.basics.headline}
            </p>

            {/* Core Technologies Highlight */}
            <div className="mt-3.5 flex items-center justify-center md:justify-start">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                <div className="w-6 h-6 rounded-lg bg-teal-500/15 flex items-center justify-center text-brand-600 dark:text-brand-400 shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 tracking-wide">
                  {t('hero.spec')}
                </span>
              </div>
            </div>

            <div className="mt-4 max-w-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              <RichHtml html={resume.summary.content} />
            </div>

            {/* Quick Location & Contact meta */}
            <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
                <span>{resume.basics.location}</span>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-normal">
                  ({t('contact.mobility')})
                </span>
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
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-brand-500/50 dark:hover:border-brand-500/50 hover:text-brand-600 dark:hover:text-brand-400 hover:-translate-y-0.5 hover:shadow-md transition-all shadow-sm active:translate-y-0"
              >
                <span>{t('hero.contactMe')}</span>
              </a>

              <a
                href={cvUrl}
                download={cvFileName}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-brand-500/50 dark:hover:border-brand-500/50 hover:text-brand-600 dark:hover:text-brand-400 hover:-translate-y-0.5 hover:shadow-md transition-all shadow-sm active:translate-y-0"
              >
                <FileDown className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span>{t('hero.downloadCv')}</span>
              </a>

              {github && (
                <ExternalLink
                  href={github.website.url}
                  showIcon={false}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 hover:border-brand-500/50 hover:text-brand-600 dark:hover:text-brand-400 hover:-translate-y-0.5 hover:shadow-md transition-all shadow-sm active:translate-y-0"
                >
                  <GithubIcon className="w-5 h-5" />
                </ExternalLink>
              )}

              {linkedin && (
                <ExternalLink
                  href={linkedin.website.url}
                  showIcon={false}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 hover:border-brand-500/50 hover:text-brand-600 dark:hover:text-brand-400 hover:-translate-y-0.5 hover:shadow-md transition-all shadow-sm active:translate-y-0"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </ExternalLink>
              )}
            </div>
          </div>

          {/* Right Column: Avatar Photo (Pixel Art with hover toggle) */}
          <div className="relative shrink-0">
            <div
              className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-3xl p-2 bg-gradient-to-tr from-brand-600 via-teal-400 to-blue-500 shadow-2xl group cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
              onClick={() => setIsLongHair(prev => !prev)}
              title={lang === 'fr' ? 'Survolez ou cliquez pour basculer la coupe de cheveux !' : 'Hover or click to switch hairstyle!'}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-200/40 dark:bg-slate-800/50 backdrop-blur-sm flex items-center justify-center">
                {!imgError ? (
                  <>
                    {/* Avatar Cheveux Courts (Base) */}
                    <img
                      src={shortHairUrl}
                      alt={`${resume.basics.name} - Pixel Art`}
                      onError={() => setImgError(true)}
                      className={`w-full h-full object-cover select-none transition-opacity duration-200 ${
                        isLongHair ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'
                      }`}
                      style={{ imageRendering: 'pixelated' }}
                      loading="eager"
                    />

                    {/* Avatar Cheveux Longs (Survol / Clic) */}
                    <img
                      src={longHairUrl}
                      alt={`${resume.basics.name} - Pixel Art (Cheveux mi-longs)`}
                      aria-hidden="true"
                      className={`absolute inset-0 w-full h-full object-cover select-none transition-opacity duration-200 ${
                        isLongHair ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                      style={{ imageRendering: 'pixelated' }}
                      loading="eager"
                    />
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-brand-700 to-slate-900 text-white font-extrabold text-5xl">
                    DS
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
