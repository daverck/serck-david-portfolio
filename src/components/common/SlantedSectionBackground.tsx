import React, { useId, useEffect, useRef } from 'react';

interface SlantedSectionBackgroundProps {
  /**
   * Direction of the diagonal slant:
   * 'down' = slopes from top-right to bottom-left (starts lower at left, higher at right)
   * 'up' = slopes from top-left to bottom-right (starts higher at left, lower at right)
   */
  direction?: 'down' | 'up';
  hasTopSlant?: boolean;
  hasBottomSlant?: boolean;
  accentLine?: boolean;
  className?: string;
}

const BASE_SLANT_HEIGHT = 48; // in px
const LINE_PROXIMITY_THRESHOLD = 80; // px threshold for intense line hover

const computeClipPath = (
  topH: number,
  botH: number,
  direction: 'down' | 'up',
  hasTopSlant: boolean,
  hasBottomSlant: boolean
): string => {
  if (direction === 'down') {
    const topLeft = hasTopSlant ? `0px ${topH.toFixed(2)}px` : '0px 0px';
    const topRight = '100% 0px';
    const bottomRight = hasBottomSlant ? `100% calc(100% - ${botH.toFixed(2)}px)` : '100% 100%';
    const bottomLeft = '0px 100%';
    return `polygon(${topLeft}, ${topRight}, ${bottomRight}, ${bottomLeft})`;
  } else {
    const topLeft = '0px 0px';
    const topRight = hasTopSlant ? `100% ${topH.toFixed(2)}px` : '100% 0px';
    const bottomRight = '100% 100%';
    const bottomLeft = hasBottomSlant ? `0px calc(100% - ${botH.toFixed(2)}px)` : '0px 100%';
    return `polygon(${topLeft}, ${topRight}, ${bottomRight}, ${bottomLeft})`;
  }
};

export const SlantedSectionBackground: React.FC<SlantedSectionBackgroundProps> = ({
  direction = 'down',
  hasTopSlant = true,
  hasBottomSlant = true,
  accentLine = true,
  className = '',
}) => {
  const rawId = useId();
  const id = rawId.replace(/:/g, '');

  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const svgTopRef = useRef<SVGSVGElement>(null);
  const svgBotRef = useRef<SVGSVGElement>(null);
  const lineTopRef = useRef<SVGLineElement>(null);
  const lineBotRef = useRef<SVGLineElement>(null);

  // Configuration et états d'animation persistants
  const animConfig = useRef({
    staticTopH: BASE_SLANT_HEIGHT + (Math.sin(Math.random() * Math.PI * 2) * 14),
    staticBotH: BASE_SLANT_HEIGHT + (Math.sin(Math.random() * Math.PI * 2) * 14),

    // Phases courantes intégrées (évite tout saut de phase lors d'un changement de vitesse)
    topPhase1: Math.random() * Math.PI * 2,
    topPhase2: Math.random() * Math.PI * 2,
    topSpeed1: 0.00045 + Math.random() * 0.0002,
    topSpeed2: 0.00075 + Math.random() * 0.0003,
    topAmp: 13 + Math.random() * 5,

    botPhase1: Math.random() * Math.PI * 2,
    botPhase2: Math.random() * Math.PI * 2,
    botSpeed1: 0.0005 + Math.random() * 0.0002,
    botSpeed2: 0.0008 + Math.random() * 0.0003,
    botAmp: 13 + Math.random() * 5,

    // Phase de respiration profonde et flottaison liquide
    breathingPhase: Math.random() * Math.PI * 2,

    // Facteurs interactifs interpolés (lerp doux et aérien)
    currentSpeedFactor: 1.0,
    targetSpeedFactor: 1.0,
    currentTopGlow: 0.0,
    targetTopGlow: 0.0,
    currentBotGlow: 0.0,
    targetBotGlow: 0.0,

    // Hauteurs actuelles mémorisées pour calcul précis de distance
    liveTopH: BASE_SLANT_HEIGHT,
    liveBotH: BASE_SLANT_HEIGHT,
  });

  useEffect(() => {
    let rafId: number;
    let lastTimestamp: number | null = null;
    const cfg = animConfig.current;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const parent = containerRef.current?.parentElement;

    const applyStaticSlant = () => {
      if (panelRef.current) {
        panelRef.current.style.clipPath = computeClipPath(
          cfg.staticTopH,
          cfg.staticBotH,
          direction,
          hasTopSlant,
          hasBottomSlant
        );
      }
      if (svgTopRef.current) {
        svgTopRef.current.style.height = `${cfg.staticTopH.toFixed(2)}px`;
      }
      if (svgBotRef.current) {
        svgBotRef.current.style.height = `${cfg.staticBotH.toFixed(2)}px`;
      }
    };

    const update = (time: number) => {
      if (lastTimestamp === null) {
        lastTimestamp = time;
      }
      // Delta time en ms, borné à 50ms pour la régularité
      const dt = Math.min(time - lastTimestamp, 50);
      lastTimestamp = time;

      // Amortissement exponentiel très doux (inertie soyeuse et aérienne)
      const lerpAlpha = 1 - Math.exp(-dt * 0.0035);
      cfg.currentSpeedFactor += (cfg.targetSpeedFactor - cfg.currentSpeedFactor) * lerpAlpha;
      cfg.currentTopGlow += (cfg.targetTopGlow - cfg.currentTopGlow) * lerpAlpha;
      cfg.currentBotGlow += (cfg.targetBotGlow - cfg.currentBotGlow) * lerpAlpha;

      // Intégration continue de la phase (zéro à-coup ni saccade)
      cfg.topPhase1 += dt * cfg.topSpeed1 * cfg.currentSpeedFactor;
      cfg.topPhase2 += dt * cfg.topSpeed2 * cfg.currentSpeedFactor;
      cfg.botPhase1 += dt * cfg.botSpeed1 * cfg.currentSpeedFactor;
      cfg.botPhase2 += dt * cfg.botSpeed2 * cfg.currentSpeedFactor;

      // Respiration asymétrique lente : dérive douce et majestueuse
      cfg.breathingPhase += dt * 0.0006 * cfg.currentSpeedFactor;
      const breathingWave = Math.sin(cfg.breathingPhase);

      // Flottaison liquide amplifiée au survol : la pente respire doucement sans jamais vibrer
      const topBreathingOffset = breathingWave * (6.0 * cfg.currentTopGlow);
      const topAmpMultiplier = 1 + 0.3 * cfg.currentTopGlow;
      const topH =
        BASE_SLANT_HEIGHT +
        (Math.sin(cfg.topPhase1) * (cfg.topAmp * 0.65) +
          Math.cos(cfg.topPhase2) * (cfg.topAmp * 0.35)) *
          topAmpMultiplier +
        topBreathingOffset;

      // Déphasage asymétrique de 90° (cosinus) pour la bordure inférieure
      const botBreathingOffset = Math.cos(cfg.breathingPhase) * (6.0 * cfg.currentBotGlow);
      const botAmpMultiplier = 1 + 0.3 * cfg.currentBotGlow;
      const botH =
        BASE_SLANT_HEIGHT +
        (Math.sin(cfg.botPhase1) * (cfg.botAmp * 0.65) +
          Math.cos(cfg.botPhase2) * (cfg.botAmp * 0.35)) *
          botAmpMultiplier +
        botBreathingOffset;

      cfg.liveTopH = topH;
      cfg.liveBotH = botH;

      if (panelRef.current) {
        panelRef.current.style.clipPath = computeClipPath(
          topH,
          botH,
          direction,
          hasTopSlant,
          hasBottomSlant
        );
      }

      // Mise à jour de la ligne d'accent supérieure (épaississement doux et halo néon profond)
      if (svgTopRef.current) {
        svgTopRef.current.style.height = `${topH.toFixed(2)}px`;
      }
      if (lineTopRef.current) {
        const strokeW = 1.5 + cfg.currentTopGlow * 1.8;
        lineTopRef.current.setAttribute('stroke-width', strokeW.toFixed(2));
        if (cfg.currentTopGlow > 0.01) {
          const glowBlur = (cfg.currentTopGlow * 9.5).toFixed(1);
          const glowAlpha = (cfg.currentTopGlow * 0.85).toFixed(2);
          lineTopRef.current.style.filter = `drop-shadow(0 0 ${glowBlur}px rgba(20, 184, 166, ${glowAlpha})) drop-shadow(0 0 ${(cfg.currentTopGlow * 18).toFixed(1)}px rgba(56, 189, 248, ${(cfg.currentTopGlow * 0.45).toFixed(2)}))`;
        } else {
          lineTopRef.current.style.filter = 'none';
        }
      }

      // Mise à jour de la ligne d'accent inférieure (épaississement doux et halo néon profond)
      if (svgBotRef.current) {
        svgBotRef.current.style.height = `${botH.toFixed(2)}px`;
      }
      if (lineBotRef.current) {
        const strokeW = 1.5 + cfg.currentBotGlow * 1.8;
        lineBotRef.current.setAttribute('stroke-width', strokeW.toFixed(2));
        if (cfg.currentBotGlow > 0.01) {
          const glowBlur = (cfg.currentBotGlow * 9.5).toFixed(1);
          const glowAlpha = (cfg.currentBotGlow * 0.85).toFixed(2);
          lineBotRef.current.style.filter = `drop-shadow(0 0 ${glowBlur}px rgba(2, 132, 199, ${glowAlpha})) drop-shadow(0 0 ${(cfg.currentBotGlow * 18).toFixed(1)}px rgba(45, 212, 191, ${(cfg.currentBotGlow * 0.45).toFixed(2)}))`;
        } else {
          lineBotRef.current.style.filter = 'none';
        }
      }

      rafId = requestAnimationFrame(update);
    };

    const startAnimation = () => {
      if (motionQuery.matches) {
        applyStaticSlant();
        return;
      }
      if (document.hidden) return;
      cancelAnimationFrame(rafId);
      lastTimestamp = null;
      rafId = requestAnimationFrame(update);
    };

    const stopAnimation = () => {
      cancelAnimationFrame(rafId);
    };

    // Gestion des événements de survol et de proximité
    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || !parent) return;

      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const w = rect.width;
      const h = rect.height;

      if (w <= 0 || h <= 0) return;

      const nx = Math.max(0, Math.min(1, x / w));

      // Calcul des hauteurs géométriques de chaque ligne diagonale au point x
      let distTop = Infinity;
      if (hasTopSlant) {
        const yTop = direction === 'down' ? cfg.liveTopH * (1 - nx) : cfg.liveTopH * nx;
        distTop = Math.abs(y - yTop);
      }

      let distBot = Infinity;
      if (hasBottomSlant) {
        const yBot = direction === 'down' ? h - cfg.liveBotH * nx : h - cfg.liveBotH * (1 - nx);
        distBot = Math.abs(y - yBot);
      }

      const topProximity =
        distTop < LINE_PROXIMITY_THRESHOLD ? 1 - distTop / LINE_PROXIMITY_THRESHOLD : 0;
      const botProximity =
        distBot < LINE_PROXIMITY_THRESHOLD ? 1 - distBot / LINE_PROXIMITY_THRESHOLD : 0;

      cfg.targetTopGlow = topProximity;
      cfg.targetBotGlow = botProximity;

      // Palier 1 : survol de la section -> accélération subtile x1.3
      // Palier 2 : proximité directe de la ligne -> jusqu'à x1.8 (respiration profonde)
      const maxProximity = Math.max(topProximity, botProximity);
      cfg.targetSpeedFactor = 1.3 + 0.5 * maxProximity;
    };

    const handlePointerEnter = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      cfg.targetSpeedFactor = 1.3;
    };

    const handlePointerLeave = () => {
      cfg.targetSpeedFactor = 1.0;
      cfg.targetTopGlow = 0.0;
      cfg.targetBotGlow = 0.0;
    };

    const onMotionChange = () => {
      if (motionQuery.matches) {
        stopAnimation();
        applyStaticSlant();
      } else {
        startAnimation();
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };

    motionQuery.addEventListener('change', onMotionChange);
    document.addEventListener('visibilitychange', onVisibilityChange);

    if (parent) {
      parent.addEventListener('pointerenter', handlePointerEnter);
      parent.addEventListener('pointermove', handlePointerMove);
      parent.addEventListener('pointerleave', handlePointerLeave);
    }
    window.addEventListener('blur', handlePointerLeave);

    startAnimation();

    return () => {
      motionQuery.removeEventListener('change', onMotionChange);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (parent) {
        parent.removeEventListener('pointerenter', handlePointerEnter);
        parent.removeEventListener('pointermove', handlePointerMove);
        parent.removeEventListener('pointerleave', handlePointerLeave);
      }
      window.removeEventListener('blur', handlePointerLeave);
      cancelAnimationFrame(rafId);
    };
  }, [direction, hasTopSlant, hasBottomSlant]);

  const initialClipPath = computeClipPath(
    animConfig.current.staticTopH,
    animConfig.current.staticBotH,
    direction,
    hasTopSlant,
    hasBottomSlant
  );

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 -z-10 pointer-events-none select-none overflow-hidden ${className}`}
    >
      {/* Panneau d'arrière-plan continu avec clip-path sans aucune couture subpixel */}
      <div
        ref={panelRef}
        className="w-full h-full bg-slate-100/50 dark:bg-slate-900/35 backdrop-blur-[1px] will-change-[clip-path]"
        style={{ clipPath: initialClipPath }}
      />

      {/* Ligne d'accent lumineuse supérieure calée au pixel près avec le panneau */}
      {accentLine && hasTopSlant && (
        <svg
          ref={svgTopRef}
          className="absolute top-0 left-0 w-full pointer-events-none overflow-visible will-change-[height]"
          style={{ height: `${animConfig.current.staticTopH.toFixed(2)}px` }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`slant-grad-top-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.05" />
              <stop offset="25%" stopColor="#14b8a6" stopOpacity="0.5" />
              <stop offset="75%" stopColor="#0284c7" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <line
            ref={lineTopRef}
            x1="0"
            y1={direction === 'down' ? 100 : 0}
            x2="100"
            y2={direction === 'down' ? 0 : 100}
            stroke={`url(#slant-grad-top-${id})`}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            className="transition-[stroke-width] duration-200 ease-out"
          />
        </svg>
      )}

      {/* Ligne d'accent lumineuse inférieure calée au pixel près avec le panneau */}
      {accentLine && hasBottomSlant && (
        <svg
          ref={svgBotRef}
          className="absolute bottom-0 left-0 w-full pointer-events-none overflow-visible will-change-[height]"
          style={{ height: `${animConfig.current.staticBotH.toFixed(2)}px` }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`slant-grad-bot-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.05" />
              <stop offset="25%" stopColor="#0284c7" stopOpacity="0.5" />
              <stop offset="75%" stopColor="#14b8a6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <line
            ref={lineBotRef}
            x1="0"
            y1={direction === 'down' ? 100 : 0}
            x2="100"
            y2={direction === 'down' ? 0 : 100}
            stroke={`url(#slant-grad-bot-${id})`}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            className="transition-[stroke-width] duration-200 ease-out"
          />
        </svg>
      )}
    </div>
  );
};
