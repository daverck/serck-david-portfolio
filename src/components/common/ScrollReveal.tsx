import React, { useEffect, useRef, useState } from 'react';

export type RevealDirection = 'down' | 'left' | 'right' | 'fade';

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Delay in milliseconds
  direction?: RevealDirection;
  distance?: number; // Distance in pixels (default: 28px)
  duration?: number; // Duration in milliseconds (default: 650ms)
  threshold?: number; // Intersection threshold (default: 0.12)
  rootMargin?: string; // Intersection root margin
  once?: boolean; // Trigger once and remain visible
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'fade',
  distance = 28,
  duration = 650,
  threshold = 0.12,
  rootMargin = '0px 0px -40px 0px',
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect user's preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  // Compute transform offset based on chosen direction (excluding 'up')
  const getHiddenTransform = (): string => {
    switch (direction) {
      case 'down':
        return `translateY(-${distance}px)`;
      case 'left':
        return `translateX(-${distance}px)`;
      case 'right':
        return `translateX(${distance}px)`;
      case 'fade':
      default:
        return 'none';
    }
  };

  const hiddenTransform = getHiddenTransform();

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : hiddenTransform,
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: isVisible ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};
