/**
 * Decorative floating globules — pure CSS animations (no JS frame work).
 * Renders <count> spheres with deterministic positions for performance.
 */
type Props = { count?: number; className?: string };

const presets = [
  { left: "8%", top: "12%", size: 14, delay: 0 },
  { left: "82%", top: "20%", size: 22, delay: 1.2 },
  { left: "18%", top: "70%", size: 10, delay: 0.6 },
  { left: "70%", top: "78%", size: 18, delay: 2 },
  { left: "45%", top: "8%", size: 12, delay: 1.8 },
  { left: "92%", top: "55%", size: 16, delay: 0.3 },
  { left: "5%", top: "45%", size: 9, delay: 2.4 },
  { left: "55%", top: "60%", size: 11, delay: 1.5 },
];

export function Globules({ count = 6, className = "" }: Props) {
  return (
    <div aria-hidden className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {presets.slice(0, count).map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full globule gpu animate-float-slow"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${6 + (i % 3)}s`,
          }}
        />
      ))}
    </div>
  );
}
