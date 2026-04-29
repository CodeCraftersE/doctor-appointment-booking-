/**
 * Reusable SVG liquid blob backdrop with gooey filter.
 * Static SVG (no per-frame React re-renders) — animated via CSS only.
 */
export function LiquidBackdrop({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 800 600"
      preserveAspectRatio="none"
      className={`pointer-events-none ${className}`}
    >
      <defs>
        <linearGradient id="lq-aqua" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(0.85 0.12 195)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="oklch(0.92 0.06 165)" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="lq-deep" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="oklch(0.55 0.11 190)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="oklch(0.85 0.1 195)" stopOpacity="0.05" />
        </linearGradient>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="b" />
          <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" result="g" />
          <feBlend in="SourceGraphic" in2="g" />
        </filter>
      </defs>
      <g filter="url(#goo)">
        <path
          d="M0,420 Q160,340 340,400 T700,380 L800,420 L800,600 L0,600 Z"
          fill="url(#lq-aqua)"
        />
        <ellipse cx="180" cy="380" rx="60" ry="40" fill="url(#lq-aqua)" />
        <ellipse cx="540" cy="360" rx="48" ry="32" fill="url(#lq-deep)" />
      </g>
      {/* meniscus highlight */}
      <path
        d="M0,418 Q160,338 340,398 T700,378 L800,418"
        fill="none"
        stroke="oklch(1 0 0 / 0.4)"
        strokeWidth="1.5"
      />
    </svg>
  );
}
