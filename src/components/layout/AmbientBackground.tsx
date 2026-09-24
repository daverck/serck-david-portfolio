import React, { useEffect, useRef } from 'react';

interface OrbConfig {
  id: number;
  top: string;
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

const ORBS: OrbConfig[] = [
  // 1. Zone Hero
  {
    id: 1,
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
    id: 2,
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
  {
    id: 3,
    top: '14%',
    left: '8%',
    size: 'w-[440px] h-[440px] sm:w-[580px] sm:h-[580px] lg:w-[720px] lg:h-[720px]',
    gradient: GRADIENTS.cyan,
    fx1: 0.7,
    fy1: 0.5,
    fx2: 0.5,
    fy2: 0.9,
    ax: 130,
    ay: -100,
    fScale: 0.95,
    parallaxX: 75,
    parallaxY: -80,
  },

  // 2. Zone Expériences
  {
    id: 4,
    top: '21%',
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
    id: 5,
    top: '28%',
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

  // 3. Zone Transition & Compétences
  {
    id: 6,
    top: '36%',
    right: '-6%',
    size: 'w-[450px] h-[450px] sm:w-[600px] sm:h-[600px] lg:w-[740px] lg:h-[740px]',
    gradient: GRADIENTS.blue,
    fx1: 0.75,
    fy1: 0.55,
    fx2: 0.6,
    fy2: 0.8,
    ax: -130,
    ay: 110,
    fScale: 0.75,
    parallaxX: -80,
    parallaxY: -70,
  },
  {
    id: 7,
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

  // 4. Zone Formations & Profil
  {
    id: 8,
    top: '53%',
    right: '-10%',
    size: 'w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] lg:w-[820px] lg:h-[820px]',
    gradient: GRADIENTS.teal,
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
  {
    id: 9,
    top: '61%',
    left: '-6%',
    size: 'w-[460px] h-[460px] sm:w-[620px] sm:h-[620px] lg:w-[750px] lg:h-[750px]',
    gradient: GRADIENTS.blue,
    fx1: 0.8,
    fy1: 0.55,
    fx2: 0.5,
    fy2: 0.75,
    ax: 135,
    ay: 110,
    fScale: 0.85,
    parallaxX: 70,
    parallaxY: 65,
  },

  // 5. Zone HealthKicks Showcase
  {
    id: 10,
    top: '70%',
    right: '-8%',
    size: 'w-[500px] h-[500px] sm:w-[660px] sm:h-[660px] lg:w-[800px] lg:h-[800px]',
    gradient: GRADIENTS.cyan,
    fx1: 0.65,
    fy1: 0.8,
    fx2: 0.9,
    fy2: 0.45,
    ax: -150,
    ay: -120,
    fScale: 0.95,
    parallaxX: -85,
    parallaxY: 75,
  },
  {
    id: 11,
    top: '78%',
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

  // 6. Zone Contact
  {
    id: 12,
    top: '87%',
    right: '-8%',
    size: 'w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] lg:w-[820px] lg:h-[820px]',
    gradient: GRADIENTS.teal,
    fx1: 0.7,
    fy1: 0.75,
    fx2: 0.8,
    fy2: 0.5,
    ax: -145,
    ay: -120,
    fScale: 1.05,
    parallaxX: -95,
    parallaxY: -80,
  },
  {
    id: 13,
    top: '94%',
    left: '-6%',
    size: 'w-[460px] h-[460px] sm:w-[620px] sm:h-[620px] lg:w-[760px] lg:h-[760px]',
    gradient: GRADIENTS.blue,
    fx1: 0.85,
    fy1: 0.6,
    fx2: 0.45,
    fy2: 0.7,
    ax: 130,
    ay: 110,
    fScale: 0.9,
    parallaxX: 75,
    parallaxY: 70,
  },
];

export const AmbientBackground: React.FC = () => {
  const orbsRef = useRef<(HTMLDivElement | null)[]>([]);
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

      // Animation continue et réactive pour chaque orbe
      for (let i = 0; i < ORBS.length; i++) {
        const el = orbsRef.current[i];
        if (!el) continue;
        const o = ORBS[i];

        const autoX = Math.sin(time * o.fx1) * o.ax + Math.cos(time * o.fx2) * (o.ax * 0.5);
        const autoY = Math.cos(time * o.fy1) * o.ay + Math.sin(time * o.fy2) * (o.ay * 0.5);
        const scale = 1 + Math.sin(time * o.fScale) * 0.10;

        el.style.transform = `translate3d(${autoX + currentX * o.parallaxX}px, ${autoY + currentY * o.parallaxY}px, 0) scale(${scale})`;
      }

      // Halo curseur interactif
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
      {/* 1. Orbes d'ambiance en absolute inset-0 : défilent naturellement avec le scroll sur toute la hauteur du document */}
      <div
        aria-hidden="true"
        className="absolute inset-0 w-full overflow-hidden pointer-events-none z-0 select-none"
      >
        {ORBS.map((o, idx) => (
          <div
            key={o.id}
            ref={el => { orbsRef.current[idx] = el; }}
            style={{
              top: o.top,
              left: o.left,
              right: o.right,
            }}
            className={`absolute ${o.size} will-change-transform mix-blend-multiply dark:mix-blend-normal`}
          >
            <div className={`w-full h-full rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${o.gradient}`} />
          </div>
        ))}
      </div>

      {/* 2. Halo interactif doux attaché au viewport (suit le curseur avec fluidité partout sur l'écran) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      >
        <div
          ref={cursorRef}
          className="absolute top-0 left-0 w-[450px] h-[450px] will-change-transform mix-blend-multiply dark:mix-blend-normal"
        >
          <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-400/50 via-cyan-400/35 to-transparent blur-2xl dark:from-teal-400/25 dark:via-brand-500/15 dark:to-transparent" />
        </div>
      </div>
    </>
  );
};
