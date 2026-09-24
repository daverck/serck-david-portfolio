import React, { useEffect, useRef } from 'react';

export const AmbientBackground: React.FC = () => {
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);
  const blob4Ref = useRef<HTMLDivElement>(null);
  const blob5Ref = useRef<HTMLDivElement>(null);
  const blob6Ref = useRef<HTMLDivElement>(null);
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

      // Orbe 1 : Hero haut gauche
      const autoX1 = Math.sin(time * 0.8) * 140 + Math.cos(time * 0.4) * 70;
      const autoY1 = Math.cos(time * 0.65) * 110 + Math.sin(time * 0.45) * 60;
      const scale1 = 1 + Math.sin(time * 0.9) * 0.10;
      if (blob1Ref.current) {
        blob1Ref.current.style.transform = `translate3d(${autoX1 + currentX * 90}px, ${autoY1 + currentY * 70}px, 0) scale(${scale1})`;
      }

      // Orbe 2 : Hero / Expérience droite
      const autoX2 = Math.cos(time * 0.6) * -150 + Math.sin(time * 1.1) * 70;
      const autoY2 = Math.sin(time * 0.75) * 120 + Math.cos(time * 0.4) * -80;
      const scale2 = 1 + Math.cos(time * 0.85) * 0.10;
      if (blob2Ref.current) {
        blob2Ref.current.style.transform = `translate3d(${autoX2 + currentX * -100}px, ${autoY2 + currentY * -75}px, 0) scale(${scale2})`;
      }

      // Orbe 3 : Expérience / Skills gauche
      const autoX3 = Math.sin(time * 0.55) * 160 + Math.cos(time * 0.8) * -70;
      const autoY3 = Math.cos(time * 0.6) * -120 + Math.sin(time * 0.9) * 80;
      const scale3 = 1 + Math.sin(time * 1.1) * 0.10;
      if (blob3Ref.current) {
        blob3Ref.current.style.transform = `translate3d(${autoX3 + currentX * 80}px, ${autoY3 + currentY * -85}px, 0) scale(${scale3})`;
      }

      // Orbe 4 : Skills / Formations droite
      const autoX4 = Math.cos(time * 0.7) * 130 + Math.sin(time * 1.2) * -80;
      const autoY4 = Math.sin(time * 0.6) * -130 + Math.cos(time * 0.5) * 70;
      const scale4 = 1 + Math.cos(time * 0.7) * 0.10;
      if (blob4Ref.current) {
        blob4Ref.current.style.transform = `translate3d(${autoX4 + currentX * -70}px, ${autoY4 + currentY * 70}px, 0) scale(${scale4})`;
      }

      // Orbe 5 : HealthKicks gauche
      const autoX5 = Math.sin(time * 0.65) * 140 + Math.cos(time * 0.85) * 60;
      const autoY5 = Math.cos(time * 0.5) * 110 + Math.sin(time * 1.0) * -70;
      const scale5 = 1 + Math.sin(time * 0.8) * 0.10;
      if (blob5Ref.current) {
        blob5Ref.current.style.transform = `translate3d(${autoX5 + currentX * 85}px, ${autoY5 + currentY * 65}px, 0) scale(${scale5})`;
      }

      // Orbe 6 : Contact droite
      const autoX6 = Math.cos(time * 0.75) * -140 + Math.sin(time * 0.5) * -70;
      const autoY6 = Math.sin(time * 0.8) * 120 + Math.cos(time * 0.65) * 70;
      const scale6 = 1 + Math.cos(time * 0.95) * 0.10;
      if (blob6Ref.current) {
        blob6Ref.current.style.transform = `translate3d(${autoX6 + currentX * -90}px, ${autoY6 + currentY * -75}px, 0) scale(${scale6})`;
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
        {/* Orbe 1: Teal / Émeraude (Zone Hero - Haut gauche) */}
        <div
          ref={blob1Ref}
          className="absolute top-[2%] -left-28 sm:-left-44 w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] lg:w-[840px] lg:h-[840px] will-change-transform mix-blend-multiply dark:mix-blend-normal"
        >
          <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500/55 via-brand-600/40 to-transparent blur-[50px] dark:from-teal-500/30 dark:via-brand-600/20 dark:to-transparent" />
        </div>

        {/* Orbe 2: Bleu Primaire Cobalt / Azur (Zone Hero / Expérience - Marge droite) */}
        <div
          ref={blob2Ref}
          className="absolute top-[13%] -right-28 sm:-right-44 w-[480px] h-[480px] sm:w-[620px] sm:h-[620px] lg:w-[780px] lg:h-[780px] will-change-transform mix-blend-multiply dark:mix-blend-normal"
        >
          <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/55 via-primary-light/40 to-transparent blur-[50px] dark:from-primary-light/30 dark:via-primary/20 dark:to-transparent" />
        </div>

        {/* Orbe 3: Cyan & Turquoise vif (Zone Expérience / Compétences - Marge gauche) */}
        <div
          ref={blob3Ref}
          className="absolute top-[30%] -left-28 sm:-left-44 w-[460px] h-[460px] sm:w-[600px] sm:h-[600px] lg:w-[740px] lg:h-[740px] will-change-transform mix-blend-multiply dark:mix-blend-normal"
        >
          <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/50 via-teal-400/35 to-transparent blur-[50px] dark:from-cyan-500/25 dark:via-teal-600/20 dark:to-transparent" />
        </div>

        {/* Orbe 4: Azur / Indigo doux (Zone Compétences / Formations - Marge droite) */}
        <div
          ref={blob4Ref}
          className="absolute top-[48%] -right-24 sm:-right-40 w-[460px] h-[460px] sm:w-[580px] sm:h-[580px] lg:w-[720px] lg:h-[720px] will-change-transform mix-blend-multiply dark:mix-blend-normal"
        >
          <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-500/50 via-indigo-500/35 to-transparent blur-[50px] dark:from-sky-500/25 dark:via-indigo-600/20 dark:to-transparent" />
        </div>

        {/* Orbe 5: Teal & Émeraude (Zone HealthKicks Showcase - Marge gauche) */}
        <div
          ref={blob5Ref}
          className="absolute top-[68%] -left-24 sm:-left-40 w-[480px] h-[480px] sm:w-[620px] sm:h-[620px] lg:w-[760px] lg:h-[760px] will-change-transform mix-blend-multiply dark:mix-blend-normal"
        >
          <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500/50 via-emerald-500/35 to-transparent blur-[50px] dark:from-teal-500/25 dark:via-brand-600/20 dark:to-transparent" />
        </div>

        {/* Orbe 6: Cyan & Bleu ciel (Zone Contact - Marge droite) */}
        <div
          ref={blob6Ref}
          className="absolute top-[88%] -right-24 sm:-right-40 w-[500px] h-[500px] sm:w-[640px] sm:h-[640px] lg:w-[780px] lg:h-[780px] will-change-transform mix-blend-multiply dark:mix-blend-normal"
        >
          <div className="w-full h-full rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-400/50 via-blue-500/40 to-transparent blur-[50px] dark:from-cyan-400/25 dark:via-primary/20 dark:to-transparent" />
        </div>
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
