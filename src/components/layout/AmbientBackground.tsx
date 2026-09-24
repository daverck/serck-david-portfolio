import React, { useEffect, useRef } from 'react';

interface OrbConfig {
  id: string | number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size: string;
  gradient: string;
  fx1: number;
  fy1: number;
  fx2: number;
  fy2: number;
  ax: number;
  ay: number;
  fScale: number;
  parallaxX: number;
  parallaxY: number;
}

const GRADIENTS = {
  teal: 'from-teal-500/55 via-brand-600/40 to-transparent blur-[50px] dark:from-teal-500/30 dark:via-brand-600/20 dark:to-transparent',
  blue: 'from-blue-600/55 via-primary-light/40 to-transparent blur-[50px] dark:from-primary-light/30 dark:via-primary/20 dark:to-transparent',
  cyan: 'from-cyan-500/50 via-teal-400/35 to-transparent blur-[50px] dark:from-cyan-500/25 dark:via-teal-600/20 dark:to-transparent',
  sky: 'from-sky-500/50 via-indigo-500/35 to-transparent blur-[50px] dark:from-sky-500/25 dark:via-indigo-600/20 dark:to-transparent',
};

// 1. Orbes fixes au viewport (restent en arrière-plan pendant le scroll pour un effet de profondeur multi-plans)
const FIXED_ORBS: OrbConfig[] = [
  {
    id: 'f1',
    top: '10%',
    right: '-10%',
    size: 'w-[480px] h-[480px] sm:w-[600px] sm:h-[600px] lg:w-[740px] lg:h-[740px]',
    gradient: GRADIENTS.cyan,
    fx1: 0.6,
    fy1: 0.7,
    fx2: 0.9,
    fy2: 0.4,
    ax: -160,
    ay: 110,
    fScale: 0.85,
    parallaxX: -60,
    parallaxY: -45,
  },
  {
    id: 'f2',
    top: '44%',
    left: '-5%',
    size: 'w-[460px] h-[460px] sm:w-[580px] sm:h-[580px] lg:w-[720px] lg:h-[720px]',
    gradient: GRADIENTS.sky,
    fx1: 0.45,
    fy1: 0.55,
    fx2: 0.25,
    fy2: 0.8,
    ax: 280, // Déplacement latéral plus large au milieu de l'écran
    ay: 70,
    fScale: 0.95,
    parallaxX: 70,
    parallaxY: 50,
  },
  {
    id: 'f3',
    top: '74%',
    left: '-12%',
    size: 'w-[500px] h-[500px] sm:w-[640px] sm:h-[640px] lg:w-[780px] lg:h-[780px]',
    gradient: GRADIENTS.teal,
    fx1: 0.7,
    fy1: 0.6,
    fx2: 0.5,
    fy2: 0.75,
    ax: 170,
    ay: -120,
    fScale: 0.9,
    parallaxX: 55,
    parallaxY: -55,
  },
];

// 2. Orbes qui défilent avec le contenu le long de la page (position absolute inset-0)
// Certaines sont configurées avec un balayage latéral étendu (ax >= 320px) pour animer les zones vides entre sections
const SCROLLING_ORBS: OrbConfig[] = [
  // Section 1 : Hero
  {
    id: 's1',
    top: '1%',
    left: '-8%',
    size: 'w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] lg:w-[840px] lg:h-[840px]',
    gradient: GRADIENTS.teal,
    fx1: 0.8,
    fy1: 0.65,
    fx2: 0.4,
    fy2: 0.45,
    ax: 140,
    ay: 110,
    fScale: 0.9,
    parallaxX: 90,
    parallaxY: 70,
  },
  {
    id: 's2',
    top: '6%',
    right: '-10%',
    size: 'w-[480px] h-[480px] sm:w-[640px] sm:h-[640px] lg:w-[780px] lg:h-[780px]',
    gradient: GRADIENTS.blue,
    fx1: 0.6,
    fy1: 0.75,
    fx2: 1.1,
    fy2: 0.4,
    ax: -150,
    ay: 120,
    fScale: 0.85,
    parallaxX: -100,
    parallaxY: -75,
  },

  // Transition Hero -> Expériences (Grand balayage latéral dans la zone vide)
  {
    id: 's3',
    top: '15%',
    left: '8%',
    size: 'w-[450px] h-[450px] sm:w-[600px] sm:h-[600px] lg:w-[740px] lg:h-[740px]',
    gradient: GRADIENTS.cyan,
    fx1: 0.48,
    fy1: 0.5,
    fx2: 0.3,
    fy2: 0.9,
    ax: 340, // Traversée latérale étendue
    ay: 65,
    fScale: 0.95,
    parallaxX: 80,
    parallaxY: -60,
  },

  // Section 2 : Expériences
  {
    id: 's4',
    top: '22%',
    right: '-8%',
    size: 'w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] lg:w-[800px] lg:h-[800px]',
    gradient: GRADIENTS.sky,
    fx1: 0.65,
    fy1: 0.7,
    fx2: 0.9,
    fy2: 0.35,
    ax: -140,
    ay: 115,
    fScale: 0.8,
    parallaxX: -90,
    parallaxY: 70,
  },
  {
    id: 's5',
    top: '29%',
    left: '-10%',
    size: 'w-[460px] h-[460px] sm:w-[620px] sm:h-[620px] lg:w-[760px] lg:h-[760px]',
    gradient: GRADIENTS.teal,
    fx1: 0.55,
    fy1: 0.6,
    fx2: 0.8,
    fy2: 0.9,
    ax: 150,
    ay: -120,
    fScale: 1.1,
    parallaxX: 85,
    parallaxY: -85,
  },

  // Transition Expérience -> Compétences (Grand balayage latéral dans la zone vide)
  {
    id: 's6',
    top: '36%',
    right: '10%',
    size: 'w-[470px] h-[470px] sm:w-[620px] sm:h-[620px] lg:w-[760px] lg:h-[760px]',
    gradient: GRADIENTS.blue,
    fx1: 0.5,
    fy1: 0.55,
    fx2: 0.28,
    fy2: 0.8,
    ax: -350, // Traversée latérale étendue
    ay: 70,
    fScale: 0.85,
    parallaxX: -85,
    parallaxY: -65,
  },

  // Section 3 : Compétences
  {
    id: 's7',
    top: '44%',
    left: '-8%',
    size: 'w-[480px] h-[480px] sm:w-[640px] sm:h-[640px] lg:w-[780px] lg:h-[780px]',
    gradient: GRADIENTS.cyan,
    fx1: 0.7,
    fy1: 0.65,
    fx2: 1.2,
    fy2: 0.5,
    ax: 140,
    ay: -130,
    fScale: 0.9,
    parallaxX: 80,
    parallaxY: 75,
  },

  // Transition Compétences -> Formations (Grand balayage latéral dans la zone vide)
  {
    id: 's8',
    top: '52%',
    left: '12%',
    size: 'w-[460px] h-[460px] sm:w-[600px] sm:h-[600px] lg:w-[750px] lg:h-[750px]',
    gradient: GRADIENTS.teal,
    fx1: 0.46,
    fy1: 0.6,
    fx2: 0.32,
    fy2: 0.75,
    ax: 360, // Traversée latérale étendue
    ay: 75,
    fScale: 0.95,
    parallaxX: 85,
    parallaxY: -60,
  },

  // Section 4 : Formations
  {
    id: 's9',
    top: '60%',
    right: '-10%',
    size: 'w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] lg:w-[820px] lg:h-[820px]',
    gradient: GRADIENTS.blue,
    fx1: 0.6,
    fy1: 0.7,
    fx2: 0.85,
    fy2: 0.4,
    ax: -145,
    ay: 125,
    fScale: 1.0,
    parallaxX: -95,
    parallaxY: -80,
  },

  // Transition Formations -> HealthKicks (Grand balayage latéral dans la zone vide)
  {
    id: 's10',
    top: '69%',
    right: '8%',
    size: 'w-[470px] h-[470px] sm:w-[620px] sm:h-[620px] lg:w-[770px] lg:h-[770px]',
    gradient: GRADIENTS.cyan,
    fx1: 0.52,
    fy1: 0.6,
    fx2: 0.3,
    fy2: 0.8,
    ax: -340, // Traversée latérale étendue
    ay: 70,
    fScale: 0.9,
    parallaxX: -85,
    parallaxY: 65,
  },

  // Section 5 : HealthKicks Showcase
  {
    id: 's11',
    top: '77%',
    left: '-10%',
    size: 'w-[480px] h-[480px] sm:w-[640px] sm:h-[640px] lg:w-[780px] lg:h-[780px]',
    gradient: GRADIENTS.sky,
    fx1: 0.75,
    fy1: 0.6,
    fx2: 0.65,
    fy2: 0.85,
    ax: 140,
    ay: 125,
    fScale: 0.8,
    parallaxX: 90,
    parallaxY: -85,
  },

  // Transition HealthKicks -> Contact (Grand balayage latéral dans la zone vide)
  {
    id: 's12',
    top: '85%',
    left: '10%',
    size: 'w-[460px] h-[460px] sm:w-[610px] sm:h-[610px] lg:w-[760px] lg:h-[760px]',
    gradient: GRADIENTS.teal,
    fx1: 0.48,
    fy1: 0.65,
    fx2: 0.3,
    fy2: 0.8,
    ax: 330, // Traversée latérale étendue
    ay: 70,
    fScale: 1.0,
    parallaxX: 85,
    parallaxY: -70,
  },

  // Section 6 : Contact
  {
    id: 's13',
    top: '94%',
    right: '-8%',
    size: 'w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] lg:w-[820px] lg:h-[820px]',
    gradient: GRADIENTS.blue,
    fx1: 0.85,
    fy1: 0.6,
    fx2: 0.45,
    fy2: 0.7,
    ax: -140,
    ay: 110,
    fScale: 0.9,
    parallaxX: -80,
    parallaxY: 70,
  },
];

export const AmbientBackground: React.FC = () => {
  const fixedOrbsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollingOrbsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;

    // Coordonnées pour l'interaction souris
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    let targetCursorX = typeof window !== 'undefined' ? window.innerWidth / 2 : 600;
    let targetCursorY = typeof window !== 'undefined' ? window.innerHeight / 2 : 400;
    let currentCursorX = targetCursorX;
    let currentCursorY = targetCursorY;

    let time = 0;

    const handleMove = (clientX: number, clientY: number) => {
      const w = window.innerWidth || 1920;
      const h = window.innerHeight || 1080;
      targetX = ((clientX / w) - 0.5) * 2;
      targetY = ((clientY / h) - 0.5) * 2;
      targetCursorX = clientX;
      targetCursorY = clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      handleMove(e.clientX, e.clientY);
    };

    const onMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      time += 0.0095;

      currentX += (targetX - currentX) * 0.07;
      currentY += (targetY - currentY) * 0.07;
      currentCursorX += (targetCursorX - currentCursorX) * 0.1;
      currentCursorY += (targetCursorY - currentCursorY) * 0.1;

      // 1. Animation des orbes fixes (viewport)
      for (let i = 0; i < FIXED_ORBS.length; i++) {
        const el = fixedOrbsRef.current[i];
        if (!el) continue;
        const o = FIXED_ORBS[i];

        const autoX = Math.sin(time * o.fx1) * o.ax + Math.cos(time * o.fx2) * (o.ax * 0.4);
        const autoY = Math.cos(time * o.fy1) * o.ay + Math.sin(time * o.fy2) * (o.ay * 0.4);
        const scale = 1 + Math.sin(time * o.fScale) * 0.08;

        el.style.transform = `translate3d(${autoX + currentX * o.parallaxX}px, ${autoY + currentY * o.parallaxY}px, 0) scale(${scale})`;
      }

      // 2. Animation des orbes qui défilent (document)
      for (let i = 0; i < SCROLLING_ORBS.length; i++) {
        const el = scrollingOrbsRef.current[i];
        if (!el) continue;
        const o = SCROLLING_ORBS[i];

        const autoX = Math.sin(time * o.fx1) * o.ax + Math.cos(time * o.fx2) * (o.ax * 0.4);
        const autoY = Math.cos(time * o.fy1) * o.ay + Math.sin(time * o.fy2) * (o.ay * 0.4);
        const scale = 1 + Math.sin(time * o.fScale) * 0.10;

        el.style.transform = `translate3d(${autoX + currentX * o.parallaxX}px, ${autoY + currentY * o.parallaxY}px, 0) scale(${scale})`;
      }

      // 3. Halo curseur interactif
      if (cursorRef.current) {
        const cursorScale = 1 + Math.sin(time * 1.3) * 0.05;
        cursorRef.current.style.transform = `translate3d(${currentCursorX - 225}px, ${currentCursorY - 225}px, 0) scale(${cursorScale})`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* 1. Couche d'orbes FIXES au viewport : créent une ambiance permanente et un effet de profondeur multi-plans lors du scroll */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      >
        {FIXED_ORBS.map((o, idx) => (
          <div
            key={o.id}
            ref={el => { fixedOrbsRef.current[idx] = el; }}
            style={{
              top: o.top,
              bottom: o.bottom,
              left: o.left,
              right: o.right,
            }}
            className={`absolute ${o.size} will-change-transform mix-blend-multiply dark:mix-blend-normal`}
          >
            <div className={`w-full h-full rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${o.gradient}`} />
          </div>
        ))}

        {/* Halo curseur interactif doux qui suit le pointeur */}
        <div
          ref={cursorRef}
          className="absolute top-0 left-0 w-[450px] h-[450px] will-change-transform mix-blend-multiply dark:mix-blend-normal"
        >
          <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-400/50 via-cyan-400/35 to-transparent blur-2xl dark:from-teal-400/25 dark:via-brand-500/15 dark:to-transparent" />
        </div>
      </div>

      {/* 2. Couche d'orbes en ABSOLUTE : défilent naturellement avec le scroll le long du document */}
      <div
        aria-hidden="true"
        className="absolute inset-0 w-full overflow-hidden pointer-events-none z-0 select-none"
      >
        {SCROLLING_ORBS.map((o, idx) => (
          <div
            key={o.id}
            ref={el => { scrollingOrbsRef.current[idx] = el; }}
            style={{
              top: o.top,
              bottom: o.bottom,
              left: o.left,
              right: o.right,
            }}
            className={`absolute ${o.size} will-change-transform mix-blend-multiply dark:mix-blend-normal`}
          >
            <div className={`w-full h-full rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${o.gradient}`} />
          </div>
        ))}
      </div>
    </>
  );
};
