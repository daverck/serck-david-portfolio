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
  Zap,
  Bluetooth,
  Wifi
} from 'lucide-react';

export const HealthKicksShowcase: React.FC = () => {
  const { lang } = useLanguage();
  const isFr = lang === 'fr';

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
      badge: isFr ? 'Pont Matériel ↔ Cloud' : 'Hardware ↔ Cloud Bridge',
      title: isFr ? 'Passerelle Mobile (Mobile Gateway)' : 'Mobile Gateway Architecture',
      description: isFr
        ? 'Conception et développement d\'une passerelle mobile temps réel sous Flutter/Dart servant de pont robuste entre les capteurs embarqués dans les chaussures (footwear devices) et l\'infrastructure AWS.'
        : 'Designed and engineered a robust real-time Flutter/Dart mobile gateway bridging embedded footwear sensors with the AWS cloud infrastructure.'
    },
    {
      icon: Bluetooth,
      color: 'from-sky-500 to-blue-600',
      badge: 'BLE / GATT Profile',
      title: isFr ? 'Architecture GATT & Capteurs BLE' : 'GATT Architecture & BLE Sensors',
      description: isFr
        ? 'Spécification et implémentation de services et caractéristiques GATT personnalisés pour la capture d\'activité en direct, le paramétrage interactif en studio et le déclenchement haptique réactif.'
        : 'Custom GATT services and characteristics implementation for live activity detection, interactive studio control, and responsive haptic triggers.'
    },
    {
      icon: ShieldCheck,
      color: 'from-amber-500 to-orange-500',
      badge: 'SigV4 & WebSockets',
      title: isFr ? 'Pipeline de Télémétrie Sécurisé' : 'Secure Telemetry Pipeline',
      description: isFr
        ? 'Acheminement temps réel et sécurisé de flux de données de télémétrie capteurs via MQTT over WebSockets, sécurisé par signature cryptographique AWS STS / SigV4.'
        : 'Real-time resilient transmission of high-frequency sensor telemetry via MQTT over WebSockets, authenticated through SigV4 and AWS STS token exchange.'
    },
    {
      icon: Activity,
      color: 'from-purple-500 to-indigo-600',
      badge: isFr ? 'Contrôle & Détection' : 'Control & Proximity',
      title: isFr ? 'Routage Distant & Détection Studio' : 'Remote Routing & Studio Presence',
      description: isFr
        ? 'Implémentation du routage bidirectionnel de commandes à distance et d\'un mécanisme hybride de détection de présence des coureurs/athlètes au sein des studios connectés.'
        : 'Engineered bidirectional remote command routing and hybrid proximity/presence detection for connected studio training environments.'
    }
  ];

  return (
    <section id="healthkicks-showcase" className="py-16 md:py-24 border-t border-slate-200/70 dark:border-slate-800/70 bg-gradient-to-b from-transparent via-teal-500/[0.02] to-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="mb-4 inline-flex items-center justify-center p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md ring-4 ring-teal-500/10 hover:scale-105 transition-transform duration-300">
            <img
              src={`${import.meta.env.BASE_URL}healthkicks.svg`}
              alt="HealthKicks Logo"
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-sm"
              loading="lazy"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 bg-teal-500/10 dark:bg-teal-500/20 border border-teal-500/30 mb-4 shadow-sm">
            <Radio className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 animate-pulse" />
            <span>{isFr ? 'Projet de fin de formation • Architecte IA/IOT (Technofutur TIC)' : 'Capstone Project • AI & IoT Architect (Technofutur TIC)'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            HealthKicks
          </h2>
          <p className="mt-2 text-lg sm:text-xl font-semibold text-teal-600 dark:text-teal-400">
            {isFr
              ? 'Passerelle Mobile & Télémétrie IoT pour Chaussures Connectées'
              : 'Mobile Gateway & IoT Telemetry for Smart Footwear'}
          </p>

          <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>{isFr ? 'Rôle : Concepteur & Développeur IoT / Mobile Gateway' : 'Role: IoT & Mobile Gateway Designer / Developer'}</span>
          </div>

          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {isFr
              ? 'Conception complète de la passerelle mobile Flutter assurant l\'interconnexion temps réel entre les capteurs biomécaniques de chaussures connectées (footwear devices) et le cloud AWS IoT Core via MQTT sécurisé SigV4.'
              : 'End-to-end design of the Flutter mobile gateway orchestrating real-time communication between smart footwear biomechanical sensors and AWS IoT Core via SigV4-signed MQTT.'}
          </p>
        </div>

        {/* Interactive Architecture Flow Diagram Card */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-slate-100/70 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl relative overflow-hidden transition-colors duration-300">
          {/* Background decorative grid & glow */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  {isFr ? 'Architecture du Flux Temps Réel' : 'Real-Time Telemetry Pipeline Flow'}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  Footwear Sensors ➔ Mobile Gateway ➔ AWS IoT Core
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-200/70 dark:border-slate-700/60 shadow-sm shrink-0">
                <Wifi className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>MQTT / WebSockets + BLE 5.0</span>
              </div>
            </div>

            {/* 3 Steps Pipeline Visual */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* Step 1 : Footwear Devices */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/70 hover:border-teal-500/50 dark:hover:border-teal-500/50 transition-colors shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-4">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-sky-600 dark:text-sky-400 font-bold mb-1">
                  {isFr ? 'Étage 1 • Matériel Embarqué' : 'Tier 1 • Embedded Hardware'}
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Smart Footwear Devices
                </h4>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 dark:bg-sky-400" />
                    <span>Capteurs pression & inertiels (IMU)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 dark:bg-sky-400" />
                    <span>Serveur GATT & Profils personnalisés</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 dark:bg-sky-400" />
                    <span>Déclencheurs de vibration haptiques</span>
                  </li>
                </ul>
              </div>

              {/* Step 2 : Mobile Gateway */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-teal-50/80 to-white dark:from-teal-900/40 dark:to-slate-800/70 border border-teal-500/30 dark:border-teal-500/40 shadow-md relative">
                <div className="w-10 h-10 rounded-xl bg-teal-500/15 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-4">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-teal-600 dark:text-teal-400 font-bold mb-1">
                  {isFr ? 'Étage 2 • Passerelle Mobile' : 'Tier 2 • Mobile Gateway'}
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Flutter / Dart Gateway
                </h4>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400" />
                    <span>Gestionnaire BLE / GATT synchrone</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400" />
                    <span>Bufferisation locale & filtrage télémétrie</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400" />
                    <span>Client MQTT over WebSockets + SigV4</span>
                  </li>
                </ul>
              </div>

              {/* Step 3 : AWS Cloud */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/70 hover:border-amber-500/50 dark:hover:border-amber-500/50 transition-colors shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                  <Cloud className="w-5 h-5" />
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold mb-1">
                  {isFr ? 'Étage 3 • Cloud Ingestion' : 'Tier 3 • Cloud Ingestion'}
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  AWS IoT Core & Services
                </h4>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400" />
                    <span>AWS STS & Signature SigV4</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400" />
                    <span>Broker MQTT & Règles de routage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400" />
                    <span>Monitoring de présence studio en direct</span>
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

        {/* Stack & Protocols Pills + Action Button */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              {isFr ? 'Stack & Protocoles Employés' : 'Tech Stack & Protocols'}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {techBadges.map((tItem, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  {tItem.label}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://github.com/topics/health-kicks"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm hover:bg-brand-600 hover:text-white dark:hover:bg-brand-400 dark:hover:text-slate-950 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all shadow-md group"
            >
              <GithubIcon className="w-4 h-4 text-white dark:text-slate-900 group-hover:text-white dark:group-hover:text-slate-950 transition-colors" />
              <span>{isFr ? 'Dépôts GitHub HealthKicks' : 'HealthKicks GitHub Repos'}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
