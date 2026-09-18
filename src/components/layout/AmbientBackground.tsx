import React, { useEffect, useRef } from 'react';

export const AmbientBackground: React.FC = () => {
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);
  const blob4Ref = useRef<HTMLDivElement>(null);
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
      // Vitesse tempérée : fluide, élégante et parfaitement dosée
      time += 0.0095;

      currentX += (targetX - currentX) * 0.07;
      currentY += (targetY - currentY) * 0.07;
      currentCursorX += (targetCursorX - currentCursorX) * 0.1;
      currentCursorY += (targetCursorY - currentCursorY) * 0.1;

      // Orbe 1 : Grande dérive fluide + pulsation de taille
      const autoX1 = Math.sin(time * 0.8) * 150 + Math.cos(time * 0.4) * 80;
      const autoY1 = Math.cos(time * 0.65) * 120 + Math.sin(time * 0.45) * 70;
      const scale1 = 1 + Math.sin(time * 0.9) * 0.10;
      if (blob1Ref.current) {
        blob1Ref.current.style.transform = `translate3d(${autoX1 + currentX * 100}px, ${autoY1 + currentY * 80}px, 0) scale(${scale1})`;
      }

      // Orbe 2 : Dérive opposée ample + pulsation
      const autoX2 = Math.cos(time * 0.6) * -160 + Math.sin(time * 1.1) * 80;
      const autoY2 = Math.sin(time * 0.75) * 140 + Math.cos(time * 0.4) * -90;
      const scale2 = 1 + Math.cos(time * 0.85) * 0.10;
      if (blob2Ref.current) {
        blob2Ref.current.style.transform = `translate3d(${autoX2 + currentX * -120}px, ${autoY2 + currentY * -90}px, 0) scale(${scale2})`;
      }

      // Orbe 3 : Amplitude diagonale marquée + pulsation
      const autoX3 = Math.sin(time * 0.55) * 170 + Math.cos(time * 0.8) * -80;
      const autoY3 = Math.cos(time * 0.6) * -130 + Math.sin(time * 0.9) * 90;
      const scale3 = 1 + Math.sin(time * 1.1) * 0.10;
      if (blob3Ref.current) {
        blob3Ref.current.style.transform = `translate3d(${autoX3 + currentX * 85}px, ${autoY3 + currentY * -95}px, 0) scale(${scale3})`;
      }

      // Orbe 4 : Flottement ample central/latéral + pulsation
      const autoX4 = Math.cos(time * 0.7) * 140 + Math.sin(time * 1.2) * -90;
      const autoY4 = Math.sin(time * 0.6) * -150 + Math.cos(time * 0.5) * 80;
      const scale4 = 1 + Math.cos(time * 0.7) * 0.10;
      if (blob4Ref.current) {
        blob4Ref.current.style.transform = `translate3d(${autoX4 + currentX * -75}px, ${autoY4 + currentY * 80}px, 0) scale(${scale4})`;
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
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Orbe 1: Teal / Émeraude (Décalé vers la marge haut gauche) */}
      <div
        ref={blob1Ref}
        className="absolute -top-36 -left-36 sm:-top-48 sm:-left-48 w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] lg:w-[840px] lg:h-[840px] will-change-transform mix-blend-multiply dark:mix-blend-normal"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-teal-500/50 via-brand-600/40 to-emerald-400/35 dark:from-teal-500/30 dark:via-brand-600/25 dark:to-emerald-500/20 blur-[85px]" />
      </div>

      {/* Orbe 2: Bleu Primaire Cobalt / Azur (Décalé vers la marge droite) */}
      <div
        ref={blob2Ref}
        className="absolute top-1/4 -right-32 sm:top-1/3 sm:-right-44 w-[480px] h-[480px] sm:w-[620px] sm:h-[620px] lg:w-[780px] lg:h-[780px] will-change-transform mix-blend-multiply dark:mix-blend-normal"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-bl from-blue-600/50 via-primary-light/45 to-teal-400/35 dark:from-primary-light/30 dark:via-primary/25 dark:to-blue-600/20 blur-[85px]" />
      </div>

      {/* Orbe 3: Cyan & Turquoise vif (Marge bas gauche) */}
      <div
        ref={blob3Ref}
        className="absolute -bottom-28 -left-12 sm:-bottom-36 sm:-left-20 w-[440px] h-[440px] sm:w-[580px] sm:h-[580px] lg:w-[720px] lg:h-[720px] will-change-transform mix-blend-multiply dark:mix-blend-normal"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-cyan-500/45 via-teal-400/40 to-blue-500/35 dark:from-cyan-500/25 dark:via-teal-600/20 dark:to-primary/20 blur-[85px]" />
      </div>

      {/* Orbe 4: Azur / Indigo doux (Marge bas droite) */}
      <div
        ref={blob4Ref}
        className="absolute top-2/3 -right-16 sm:top-3/4 sm:-right-24 w-[420px] h-[420px] sm:w-[540px] sm:h-[540px] lg:w-[680px] lg:h-[680px] will-change-transform mix-blend-multiply dark:mix-blend-normal"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-sky-500/45 via-indigo-500/40 to-teal-400/35 dark:from-sky-500/25 dark:via-indigo-600/20 dark:to-teal-500/20 blur-[85px]" />
      </div>

      {/* Orbe 5: Halo interactif suivant le curseur */}
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 w-[450px] h-[450px] will-change-transform mix-blend-multiply dark:mix-blend-normal"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-teal-400/55 via-cyan-400/50 to-blue-400/45 dark:from-teal-400/25 dark:via-brand-500/20 dark:to-primary-light/20 blur-[75px]" />
      </div>
    </div>
  );
};
