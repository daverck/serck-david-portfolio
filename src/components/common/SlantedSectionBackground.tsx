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

  // Paramètres pseudo-aléatoires distincts pour chaque instance de section
  // Assure une oscillation organique décorrélée entre toutes les séparations
  const animConfig = useRef({
    topPhase1: Math.random() * Math.PI * 2,
    topPhase2: Math.random() * Math.PI * 2,
    topSpeed1: 0.0005 + Math.random() * 0.0004,
    topSpeed2: 0.0009 + Math.random() * 0.0005,
    topAmp: 13 + Math.random() * 6, // Variation d'amplitude entre ~13px et 19px

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
    const speedMultiplier = motionQuery.matches ? 0.35 : 1;

    const update = (time: number) => {
      const adjustedTime = time * speedMultiplier;

      // Somme de deux ondes sinusoïdales à fréquences incommensurables :
      // produit une dérive continue, fluide et non répétitive
      const topH =
        BASE_SLANT_HEIGHT +
        Math.sin(adjustedTime * cfg.topSpeed1 + cfg.topPhase1) * (cfg.topAmp * 0.65) +
        Math.cos(adjustedTime * cfg.topSpeed2 + cfg.topPhase2) * (cfg.topAmp * 0.35);

      const botH =
        BASE_SLANT_HEIGHT +
        Math.sin(adjustedTime * cfg.botSpeed1 + cfg.botPhase1) * (cfg.botAmp * 0.65) +
        Math.cos(adjustedTime * cfg.botSpeed2 + cfg.botPhase2) * (cfg.botAmp * 0.35);

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

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(update);
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    rafId = requestAnimationFrame(update);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      cancelAnimationFrame(rafId);
    };
  }, [direction, hasTopSlant, hasBottomSlant]);

  const initialClipPath = computeClipPath(
    BASE_SLANT_HEIGHT,
    BASE_SLANT_HEIGHT,
    direction,
    hasTopSlant,
    hasBottomSlant
  );

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 -z-10 pointer-events-none select-none overflow-hidden ${className}`}
    >
      {/* Panneau d'arrière-plan continu avec clip-path animé sans aucune couture subpixel */}
      <div
        ref={panelRef}
        className="w-full h-full bg-slate-100/50 dark:bg-slate-900/35 backdrop-blur-[1px] will-change-[clip-path]"
        style={{ clipPath: initialClipPath }}
      />

      {/* Ligne d'accent lumineuse supérieure dont l'angle oscille en parfaite synchronie avec le panneau */}
      {accentLine && hasTopSlant && (
        <svg
          ref={svgTopRef}
          className="absolute top-0 left-0 w-full pointer-events-none overflow-visible will-change-[height]"
          style={{ height: `${BASE_SLANT_HEIGHT}px` }}
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

      {/* Ligne d'accent lumineuse inférieure oscillant de manière indépendante */}
      {accentLine && hasBottomSlant && (
        <svg
          ref={svgBotRef}
          className="absolute bottom-0 left-0 w-full pointer-events-none overflow-visible will-change-[height]"
          style={{ height: `${BASE_SLANT_HEIGHT}px` }}
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
