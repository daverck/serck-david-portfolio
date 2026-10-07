import React, { useId } from 'react';

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

const SLANT_HEIGHT = 48; // in px

export const SlantedSectionBackground: React.FC<SlantedSectionBackgroundProps> = ({
  direction = 'down',
  hasTopSlant = true,
  hasBottomSlant = true,
  accentLine = true,
  className = '',
}) => {
  const rawId = useId();
  const id = rawId.replace(/:/g, '');

  // Build a single continuous clip-path polygon to completely eradicate horizontal subpixel seams
  // polygon coordinates: top-left -> top-right -> bottom-right -> bottom-left
  let clipPath: string;

  if (direction === 'down') {
    const topLeft = hasTopSlant ? `0px ${SLANT_HEIGHT}px` : '0px 0px';
    const topRight = '100% 0px';
    const bottomRight = hasBottomSlant ? `100% calc(100% - ${SLANT_HEIGHT}px)` : '100% 100%';
    const bottomLeft = '0px 100%';
    clipPath = `polygon(${topLeft}, ${topRight}, ${bottomRight}, ${bottomLeft})`;
  } else {
    const topLeft = '0px 0px';
    const topRight = hasTopSlant ? `100% ${SLANT_HEIGHT}px` : '100% 0px';
    const bottomRight = '100% 100%';
    const bottomLeft = hasBottomSlant ? `0px calc(100% - ${SLANT_HEIGHT}px)` : '0px 100%';
    clipPath = `polygon(${topLeft}, ${topRight}, ${bottomRight}, ${bottomLeft})`;
  }

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 -z-10 pointer-events-none select-none overflow-hidden ${className}`}
    >
      {/* Single continuous background panel clipped with CSS clip-path (zero horizontal seams) */}
      <div
        className="w-full h-full bg-slate-100/50 dark:bg-slate-900/35 backdrop-blur-[1px]"
        style={{ clipPath }}
      />

      {/* Optional luminous accent line on top diagonal */}
      {accentLine && hasTopSlant && (
        <svg
          className="absolute top-0 left-0 w-full pointer-events-none overflow-visible"
          style={{ height: `${SLANT_HEIGHT}px` }}
          viewBox={`0 0 1200 ${SLANT_HEIGHT}`}
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
            y1={direction === 'down' ? SLANT_HEIGHT : 0}
            x2="1200"
            y2={direction === 'down' ? 0 : SLANT_HEIGHT}
            stroke={`url(#slant-grad-top-${id})`}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}

      {/* Optional luminous accent line on bottom diagonal */}
      {accentLine && hasBottomSlant && (
        <svg
          className="absolute bottom-0 left-0 w-full pointer-events-none overflow-visible"
          style={{ height: `${SLANT_HEIGHT}px` }}
          viewBox={`0 0 1200 ${SLANT_HEIGHT}`}
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
            y1={direction === 'down' ? SLANT_HEIGHT : 0}
            x2="1200"
            y2={direction === 'down' ? 0 : SLANT_HEIGHT}
            stroke={`url(#slant-grad-bot-${id})`}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
    </div>
  );
};
