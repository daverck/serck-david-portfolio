import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { GithubIcon } from '../common/Icons';
import {
  Smartphone,
  Cpu,
  Cloud,
  Radio,
  Activity,
  ShieldCheck,
  Globe,
  AlertCircle,
  ExternalLink as ExternalLinkIcon,
  GitBranch,
  Terminal,
  Database,
  Layers,
  Zap,
  Presentation,
  X,
  Download,
} from 'lucide-react';

export const HealthKicksShowcase: React.FC = () => {
  const { t } = useLanguage();
  const [isSlidesOpen, setIsSlidesOpen] = useState(false);

  const slidesUrl = `${import.meta.env.BASE_URL}healthkicks-slides/index.html`;
  const pdfUrl = `${import.meta.env.BASE_URL}healthkicks-slides/presentation_healthkicks.pdf`;

  useEffect(() => {
    if (!isSlidesOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSlidesOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isSlidesOpen]);

  const flowSteps = [
    {
      step: t('hk.flow.step1.tier'),
      title: t('hk.flow.step1.title'),
      icon: Cpu,
      color: 'sky',
      features: [
        t('hk.flow.step1.f1'),
        t('hk.flow.step1.f2'),
        t('hk.flow.step1.f3'),
      ],
    },
    {
      step: t('hk.flow.step2.tier'),
      title: t('hk.flow.step2.title'),
      icon: Smartphone,
      color: 'teal',
      features: [
        t('hk.flow.step2.f1'),
        t('hk.flow.step2.f2'),
        t('hk.flow.step2.f3'),
      ],
    },
    {
      step: t('hk.flow.step3.tier'),
      title: t('hk.flow.step3.title'),
      icon: Cloud,
      color: 'amber',
      features: [
        t('hk.flow.step3.f1'),
        t('hk.flow.step3.f2'),
        t('hk.flow.step3.f3'),
      ],
    },
    {
      step: t('hk.flow.step4.tier'),
      title: t('hk.flow.step4.title'),
      icon: Globe,
      color: 'purple',
      features: [
        t('hk.flow.step4.f1'),
        t('hk.flow.step4.f2'),
        t('hk.flow.step4.f3'),
      ],
    },
  ];

  const keyAchievements = [
    {
      icon: Cpu,
      color: 'from-teal-500 to-emerald-500',
      badge: t('hk.achieve.ai.badge'),
      title: t('hk.achieve.ai.title'),
      description: t('hk.achieve.ai.desc'),
    },
    {
      icon: ShieldCheck,
      color: 'from-amber-500 to-orange-500',
      badge: t('hk.achieve.alert.badge'),
      title: t('hk.achieve.alert.title'),
      description: t('hk.achieve.alert.desc'),
    },
    {
      icon: Database,
      color: 'from-sky-500 to-blue-600',
      badge: t('hk.achieve.cloud.badge'),
      title: t('hk.achieve.cloud.title'),
      description: t('hk.achieve.cloud.desc'),
    },
    {
      icon: Activity,
      color: 'from-purple-500 to-indigo-600',
      badge: t('hk.achieve.web.badge'),
      title: t('hk.achieve.web.title'),
      description: t('hk.achieve.web.desc'),
    },
  ];

  const submodules = [
    {
      name: t('hk.modules.firmware'),
      role: t('hk.modules.firmwareRole'),
      desc: t('hk.modules.firmwareDesc'),
      icon: Cpu,
      color: 'sky',
      url: 'https://github.com/daverck/health-kicks-esp32-s3',
      tech: 'C++20 • PlatformIO • FreeRTOS',
    },
    {
      name: t('hk.modules.mobile'),
      role: t('hk.modules.mobileRole'),
      desc: t('hk.modules.mobileDesc'),
      icon: Smartphone,
      color: 'teal',
      url: 'https://github.com/daverck/health-kicks-mobile',
      tech: 'Flutter 3 • Dart • Android SmsManager',
    },
    {
      name: t('hk.modules.backend'),
      role: t('hk.modules.backendRole'),
      desc: t('hk.modules.backendDesc'),
      icon: Terminal,
      color: 'amber',
      url: 'https://github.com/daverck/health-kicks',
      tech: 'Python 3.12 • FastAPI • PostgreSQL • DynamoDB',
    },
    {
      name: t('hk.modules.frontend'),
      role: t('hk.modules.frontendRole'),
      desc: t('hk.modules.frontendDesc'),
      icon: Globe,
      color: 'purple',
      url: 'https://github.com/daverck/health-kicks-frontend',
      tech: 'Angular 22 • Tailwind v4 • Three.js',
    },
    {
      name: t('hk.modules.contracts'),
      role: t('hk.modules.contractsRole'),
      desc: t('hk.modules.contractsDesc'),
      icon: Layers,
      color: 'emerald',
      url: 'https://github.com/daverck/health-kicks-ecosystem/tree/main/contracts',
      tech: 'BLE GATT LESC • MQTT QoS 1 • OpenAPI 3.1',
    },
  ];

  const stackCategories = [
    {
      category: t('hk.stack.cat.firmware'),
      skills: ['ESP32-S3-N16R8', 'C++20 / FreeRTOS', 'MPU-6050 (I2C)', 'NimBLE LESC', 'PWM LEDC', 'OTA SHA-256 + Rollback', 'PlatformIO'],
    },
    {
      category: t('hk.stack.cat.mobile'),
      skills: ['Flutter 3', 'Dart 3', 'Foreground Service', 'Android SmsManager (GSM)', 'SQLite (sqflite)', 'MQTT over WebSockets', 'AWS STS / SigV4', 'Geolocator'],
    },
    {
      category: t('hk.stack.cat.cloud'),
      skills: ['Python 3.12', 'FastAPI', 'PostgreSQL 16 (Aurora)', 'Amazon DynamoDB', 'AWS IoT Core', 'SQLAlchemy / Alembic', 'Docker / Compose', 'uv'],
    },
    {
      category: t('hk.stack.cat.ai'),
      skills: ['Random Forest', 'm2cgen', '5-Fold Stratified CV'],
    },
    {
      category: t('hk.stack.cat.web'),
      skills: ['Angular 22 (Signals)', 'TypeScript 5.9', 'Tailwind CSS v4', 'Three.js', 'Chart.js', 'Vitest 5', 'Google & Azure SSO (PKCE)'],
    },
  ];

  return (
    <section id="healthkicks-showcase" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 bg-teal-500/10 dark:bg-teal-500/20 border border-teal-500/30 mb-4 shadow-sm">
            <Radio className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 animate-pulse" aria-hidden="true" />
            <span>{t('hk.badge')}</span>
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <img
              src={`${import.meta.env.BASE_URL}healthkicks.svg`}
              alt="HealthKicks Logo"
              width="48"
              height="48"
              className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain shrink-0"
              loading="lazy"
            />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              HealthKicks
            </h2>
          </div>
          <p className="mt-2 text-lg sm:text-xl font-semibold text-teal-600 dark:text-teal-400">
            {t('hk.subtitle')}
          </p>

          {/* Action links: GitHub Repos, Slides Presentation & Web Demo */}
          <div className="mt-5 mb-2 flex flex-wrap items-center justify-center gap-3">
            {/* Ecosystem GitHub Repo */}
            <a
              href="https://github.com/daverck/health-kicks-ecosystem"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs sm:text-sm hover:bg-brand-600 hover:text-white dark:hover:bg-brand-400 dark:hover:text-slate-950 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all shadow-md group"
            >
              <GithubIcon className="w-4 h-4 text-white dark:text-slate-900 group-hover:text-white dark:group-hover:text-slate-950 transition-colors" />
              <span>{t('hk.githubRepos')}</span>
              <ExternalLinkIcon className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
            </a>

            {/* Slides Presentation Button */}
            <button
              type="button"
              onClick={() => setIsSlidesOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold text-xs sm:text-sm shadow-md hover:from-teal-500 hover:to-emerald-500 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              <Presentation className="w-4 h-4 text-teal-100 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span>{t('hk.slidesBtn')}</span>
              <span className="flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/20 text-white backdrop-blur-xs">
                {t('hk.slidesBadge')}
              </span>
            </button>

            {/* Web Clinical Demo */}
            <div className="relative group/tooltip">
              <a
                href="https://healthkicks.duckdns.org/"
                target="_blank"
                rel="noopener noreferrer"
                title={t('hk.webDemoTitle')}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-semibold text-xs sm:text-sm hover:border-teal-500/50 hover:text-teal-600 dark:hover:text-teal-400 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all shadow-sm"
              >
                <Globe className="w-4 h-4 text-teal-600 dark:text-teal-400" aria-hidden="true" />
                <span>{t('hk.webInterface')}</span>
                <span className="flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <AlertCircle className="w-3 h-3" aria-hidden="true" />
                  <span>{t('hk.onDemand')}</span>
                </span>
                <ExternalLinkIcon className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
              </a>

              {/* Tooltip on hover */}
              <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-64 p-2.5 rounded-xl bg-slate-900/95 dark:bg-slate-800/95 text-white text-[11px] leading-snug text-center shadow-xl border border-slate-700/50 backdrop-blur-md opacity-0 group-hover/tooltip:opacity-100 transition-all duration-200 z-30">
                <div className="flex items-center justify-center gap-1.5 text-amber-400 font-semibold mb-0.5">
                  <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                  <span>{t('hk.onDemandAvailability')}</span>
                </div>
                <p className="text-slate-300">
                  {t('hk.onDemandTooltip')}
                </p>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900/95 dark:border-t-slate-800/95" />
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
            {t('hk.description')}
          </p>
        </div>

        {/* 4-Tier Interactive Architecture Flow Diagram Card */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-slate-100/70 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl relative overflow-hidden transition-colors duration-300">
          {/* Background decorative glow */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                {t('hk.flow.badge')}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {t('hk.flow.subtitle')}
              </h3>
            </div>

            {/* 4 Steps Pipeline Visual Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {flowSteps.map((step, idx) => {
                const StepIcon = step.icon;
                const isSky = step.color === 'sky';
                const isTeal = step.color === 'teal';
                const isAmber = step.color === 'amber';

                const iconBgClass = isSky
                  ? 'bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400'
                  : isTeal
                  ? 'bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400'
                  : isAmber
                  ? 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400'
                  : 'bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400';

                const tierTextClass = isSky
                  ? 'text-sky-600 dark:text-sky-400'
                  : isTeal
                  ? 'text-teal-600 dark:text-teal-400'
                  : isAmber
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-purple-600 dark:text-purple-400';

                const bulletClass = isSky
                  ? 'bg-sky-500 dark:bg-sky-400'
                  : isTeal
                  ? 'bg-teal-500 dark:bg-teal-400'
                  : isAmber
                  ? 'bg-amber-500 dark:bg-amber-400'
                  : 'bg-purple-500 dark:bg-purple-400';

                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/70 hover:border-teal-500/50 dark:hover:border-teal-500/50 transition-colors shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className={`w-10 h-10 rounded-xl ${iconBgClass} flex items-center justify-center mb-4`}>
                        <StepIcon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div className={`text-[11px] font-mono uppercase tracking-wider font-bold mb-1 ${tierTextClass}`}>
                        {step.step}
                      </div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                        {step.title}
                      </h4>
                      <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
                        {step.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${bulletClass}`} />
                            <span className="leading-snug">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4 Key Pillars & Technical Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {keyAchievements.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-md group-hover:scale-105 transition-transform shrink-0`}>
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-1">
                      {item.badge}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ecosystem Multi-Repositories Explorer */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-slate-100/70 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              {t('hk.modules.badge')}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {t('hk.modules.title')}
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {t('hk.modules.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {submodules.map((mod, idx) => {
              const ModIcon = mod.icon;
              return (
                <a
                  key={idx}
                  href={mod.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 hover:border-brand-500/50 dark:hover:border-brand-500/50 hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <ModIcon className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" aria-hidden="true" />
                        <span className="font-mono text-xs font-bold text-slate-900 dark:text-white truncate">
                          {mod.name}
                        </span>
                      </div>
                      <ExternalLinkIcon className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-500 transition-colors shrink-0" aria-hidden="true" />
                    </div>

                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-700 dark:text-teal-300 mb-2">
                      {mod.role}
                    </span>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                      {mod.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-mono truncate">{mod.tech}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-teal-600 dark:text-teal-400 shrink-0 ml-2 group-hover:translate-x-0.5 transition-transform">
                      <GitBranch className="w-3 h-3" aria-hidden="true" />
                      <span>Code</span>
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Categorized Tech Stack Badges */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-4 h-4 text-amber-500" aria-hidden="true" />
            <span className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              {t('hk.stack.title')}
            </span>
          </div>

          <div className="space-y-4">
            {stackCategories.map((group, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider min-w-[170px] shrink-0">
                  {group.category} :
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {group.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-medium bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 shadow-2xs hover:border-teal-500/40 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Presentation Slides Fullscreen Modal */}
      {isSlidesOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t('hk.slidesModalTitle')}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in"
        >
          <div className="relative w-full max-w-6xl h-[92vh] max-h-[850px] rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-900/95 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                  <Presentation className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="flex items-center gap-2 truncate">
                  <span className="font-bold text-sm sm:text-base text-white truncate">
                    {t('hk.slidesModalTitle')}
                  </span>
                  <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 shrink-0">
                    {t('hk.slidesBadge')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={pdfUrl}
                  download="HealthKicks_Presentation.pdf"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                  title={t('hk.slidesDownloadPdf')}
                >
                  <Download className="w-3.5 h-3.5 text-slate-300" aria-hidden="true" />
                  <span>PDF</span>
                </a>
                <a
                  href={slidesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                  title={t('hk.slidesOpenTab')}
                >
                  <ExternalLinkIcon className="w-3.5 h-3.5 text-slate-300" aria-hidden="true" />
                  <span>{t('hk.slidesOpenTab')}</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsSlidesOpen(false)}
                  aria-label={t('hk.slidesClose')}
                  title={t('hk.slidesClose')}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 cursor-pointer"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Modal Body / Iframe */}
            <div className="flex-1 w-full h-full bg-black relative">
              <iframe
                src={slidesUrl}
                title={t('hk.slidesModalTitle')}
                className="w-full h-full border-0"
                allow="fullscreen"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
