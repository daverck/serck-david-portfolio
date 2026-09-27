import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { GithubIcon } from '../common/Icons';
import {
  Smartphone,
  Cpu,
  Cloud,
  Radio,
  Activity,
  ShieldCheck,
  Bluetooth,
  Globe,
  AlertCircle
} from 'lucide-react';

export const HealthKicksShowcase: React.FC = () => {
  const { t } = useLanguage();

  const techBadges = [
    { label: 'Flutter', category: 'Mobile' },
    { label: 'Dart', category: 'Language' },
    { label: 'Bluetooth Low Energy (BLE / GATT)', category: 'Hardware Protocol' },
    { label: 'AWS IoT Core', category: 'Cloud IoT' },
    { label: 'MQTT over WebSockets', category: 'Streaming Protocol' },
    { label: 'AWS STS / SigV4', category: 'Security' },
    { label: 'Android', category: 'OS' },
  ];

  const keyAchievements = [
    {
      icon: Smartphone,
      color: 'from-teal-500 to-emerald-500',
      badge: t('hk.achieve.bridge.badge'),
      title: t('hk.achieve.bridge.title'),
      description: t('hk.achieve.bridge.desc'),
    },
    {
      icon: Bluetooth,
      color: 'from-sky-500 to-blue-600',
      badge: t('hk.achieve.ble.badge'),
      title: t('hk.achieve.ble.title'),
      description: t('hk.achieve.ble.desc'),
    },
    {
      icon: ShieldCheck,
      color: 'from-amber-500 to-orange-500',
      badge: t('hk.achieve.sigv4.badge'),
      title: t('hk.achieve.sigv4.title'),
      description: t('hk.achieve.sigv4.desc'),
    },
    {
      icon: Activity,
      color: 'from-purple-500 to-indigo-600',
      badge: t('hk.achieve.routing.badge'),
      title: t('hk.achieve.routing.title'),
      description: t('hk.achieve.routing.desc'),
    }
  ];

  return (
    <section id="healthkicks-showcase" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 bg-teal-500/10 dark:bg-teal-500/20 border border-teal-500/30 mb-4 shadow-sm">
            <Radio className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 animate-pulse" />
            <span>{t('hk.badge')}</span>
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <img
              src={`${import.meta.env.BASE_URL}healthkicks.svg`}
              alt="HealthKicks Logo"
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

          {/* Action links: GitHub Repos & Web Demo */}
          <div className="mt-4 mb-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://github.com/topics/health-kicks"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs sm:text-sm hover:bg-brand-600 hover:text-white dark:hover:bg-brand-400 dark:hover:text-slate-950 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all shadow-md group"
            >
              <GithubIcon className="w-4 h-4 text-white dark:text-slate-900 group-hover:text-white dark:group-hover:text-slate-950 transition-colors" />
              <span>{t('hk.githubRepos')}</span>
            </a>

            <div className="relative group/tooltip">
              <a
                href="https://healthkicks.duckdns.org/"
                target="_blank"
                rel="noopener noreferrer"
                title={t('hk.webDemoTitle')}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-semibold text-xs sm:text-sm hover:border-teal-500/50 hover:text-teal-600 dark:hover:text-teal-400 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 transition-all shadow-sm"
              >
                <Globe className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>{t('hk.webInterface')}</span>
                <span className="flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <AlertCircle className="w-3 h-3" />
                  <span>{t('hk.onDemand')}</span>
                </span>
              </a>

              {/* Tooltip on hover */}
              <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-64 p-2.5 rounded-xl bg-slate-900/95 dark:bg-slate-800/95 text-white text-[11px] leading-snug text-center shadow-xl border border-slate-700/50 backdrop-blur-md opacity-0 group-hover/tooltip:opacity-100 transition-all duration-200 z-30">
                <div className="flex items-center justify-center gap-1.5 text-amber-400 font-semibold mb-0.5">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{t('hk.onDemandAvailability')}</span>
                </div>
                <p className="text-slate-300">
                  {t('hk.onDemandTooltip')}
                </p>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900/95 dark:border-t-slate-800/95" />
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {t('hk.description')}
          </p>
        </div>

        {/* Interactive Architecture Flow Diagram Card */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-slate-100/70 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl relative overflow-hidden transition-colors duration-300">
          {/* Background decorative grid & glow */}
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

            {/* 3 Steps Pipeline Visual */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* Step 1 : Footwear Devices */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/70 hover:border-teal-500/50 dark:hover:border-teal-500/50 transition-colors shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-4">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-sky-600 dark:text-sky-400 font-bold mb-1">
                  {t('hk.flow.step1.tier')}
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {t('hk.flow.step1.title')}
                </h4>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 dark:bg-sky-400" />
                    <span>{t('hk.flow.step1.f1')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 dark:bg-sky-400" />
                    <span>{t('hk.flow.step1.f2')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 dark:bg-sky-400" />
                    <span>{t('hk.flow.step1.f3')}</span>
                  </li>
                </ul>
              </div>

              {/* Step 2 : Mobile Gateway */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-teal-50/80 to-white dark:from-teal-900/40 dark:to-slate-800/70 border border-teal-500/30 dark:border-teal-500/40 shadow-md relative">
                <div className="w-10 h-10 rounded-xl bg-teal-500/15 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-4">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-teal-600 dark:text-teal-400 font-bold mb-1">
                  {t('hk.flow.step2.tier')}
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {t('hk.flow.step2.title')}
                </h4>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400" />
                    <span>{t('hk.flow.step2.f1')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400" />
                    <span>{t('hk.flow.step2.f2')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400" />
                    <span>{t('hk.flow.step2.f3')}</span>
                  </li>
                </ul>
              </div>

              {/* Step 3 : AWS Cloud */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/70 hover:border-amber-500/50 dark:hover:border-amber-500/50 transition-colors shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                  <Cloud className="w-5 h-5" />
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold mb-1">
                  {t('hk.flow.step3.tier')}
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {t('hk.flow.step3.title')}
                </h4>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400" />
                    <span>{t('hk.flow.step3.f1')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400" />
                    <span>{t('hk.flow.step3.f2')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400" />
                    <span>{t('hk.flow.step3.f3')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Key Achievements 4-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {keyAchievements.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-md group-hover:scale-105 transition-transform shrink-0`}>
                    <Icon className="w-6 h-6" />
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

        {/* Stack & Protocols Pills */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80">
          <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            {t('hk.stack.title')}
          </span>
          <div className="flex flex-wrap items-center gap-2.5">
            {techBadges.map((tItem, i) => (
              <span
                key={i}
                className="inline-flex items-center px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 shadow-sm"
              >
                {tItem.label}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
