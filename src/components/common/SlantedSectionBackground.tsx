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

  const panelRef = useRef<HTMLDivElement>(null);
  const svgTopRef = useRef<SVGSVGElement>(null);
  const svgBotRef = useRef<SVGSVGElement>(null);

  // Paramètres pseudo-aléatoires uniques par instance de séparation :
  // - Conserve une orientation/angle aléatoire même si l'animation est désactivée
  // - Assure des oscillations décorrélées en mode normal
  const animConfig = useRef({
    // Hauteurs d'angles aléatoires statiques préservées en mode prefers-reduced-motion
    staticTopH: BASE_SLANT_HEIGHT + (Math.sin(Math.random() * Math.PI * 2) * 14),
    staticBotH: BASE_SLANT_HEIGHT + (Math.sin(Math.random() * Math.PI * 2) * 14),

    topPhase1: Math.random() * Math.PI * 2,
    topPhase2: Math.random() * Math.PI * 2,
    topSpeed1: 0.0005 + Math.random() * 0.0004,
    topSpeed2: 0.0009 + Math.random() * 0.0005,
    topAmp: 13 + Math.random() * 6,

    botPhase1: Math.random() * Math.PI * 2,
    botPhase2: Math.random() * Math.PI * 2,
    botSpeed1: 0.0006 + Math.random() * 0.0004,
    botSpeed2: 0.0010 + Math.random() * 0.0005,
    botAmp: 13 + Math.random() * 6,
  });

  useEffect(() => {
    let rafId: number;
    const cfg = animConfig.current;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

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
      // Somme de sinusoïdes à fréquences incommensurables : oscillation continue et fluide
      const topH =
        BASE_SLANT_HEIGHT +
        Math.sin(time * cfg.topSpeed1 + cfg.topPhase1) * (cfg.topAmp * 0.65) +
        Math.cos(time * cfg.topSpeed2 + cfg.topPhase2) * (cfg.topAmp * 0.35);

      const botH =
        BASE_SLANT_HEIGHT +
        Math.sin(time * cfg.botSpeed1 + cfg.botPhase1) * (cfg.botAmp * 0.65) +
        Math.cos(time * cfg.botSpeed2 + cfg.botPhase2) * (cfg.botAmp * 0.35);

      if (panelRef.current) {
        panelRef.current.style.clipPath = computeClipPath(
          topH,
          botH,
          direction,
          hasTopSlant,
          hasBottomSlant
        );
      }
      if (svgTopRef.current) {
        svgTopRef.current.style.height = `${topH.toFixed(2)}px`;
      }
      if (svgBotRef.current) {
        svgBotRef.current.style.height = `${botH.toFixed(2)}px`;
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
      rafId = requestAnimationFrame(update);
    };

    const stopAnimation = () => {
      cancelAnimationFrame(rafId);
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

    startAnimation();

    return () => {
      motionQuery.removeEventListener('change', onMotionChange);
      document.removeEventListener('visibilitychange', onVisibilityChange);
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
              <stop offset="25%" stopColor="#14b8a6" stopOpacity="0.4" />
              <stop offset="75%" stopColor="#0284c7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <line
            x1="0"
            y1={direction === 'down' ? 100 : 0}
            x2="100"
            y2={direction === 'down' ? 0 : 100}
            stroke={`url(#slant-grad-top-${id})`}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
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
              <stop offset="25%" stopColor="#0284c7" stopOpacity="0.4" />
              <stop offset="75%" stopColor="#14b8a6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <line
            x1="0"
            y1={direction === 'down' ? 100 : 0}
            x2="100"
            y2={direction === 'down' ? 0 : 100}
            stroke={`url(#slant-grad-bot-${id})`}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
    </div>
  );
};
