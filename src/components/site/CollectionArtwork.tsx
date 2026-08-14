/**
 * Art elements specifically for the Collections section.
 */

export function TextileWeave({ className = "" }: { className?: string }) {
  // A subtle criss-cross warp/weft pattern
  // Using deterministic opacities to prevent hydration mismatches
  const lines = Array.from({ length: 20 });
  const opacities = [0.1, 0.4, 0.2, 0.5, 0.15, 0.3, 0.6, 0.2, 0.4, 0.1, 0.5, 0.3, 0.2, 0.6, 0.15, 0.4, 0.25, 0.5, 0.2, 0.3];

  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth="0.5" aria-hidden="true" preserveAspectRatio="none">
      {lines.map((_, i) => (
        <g key={i} opacity={opacities[i]}>
          <line x1="0" y1={i * 10} x2="200" y2={i * 10} />
          <line x1={i * 10} y1="0" x2={i * 10} y2="200" />
        </g>
      ))}
    </svg>
  );
}

export function HandPaintedDot({ className = "" }: { className?: string }) {
  // A rough, organic circle representing a hand-painted mark
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor" aria-hidden="true">
      <path d="M50 15 C 70 12, 85 25, 88 45 C 90 70, 75 88, 50 85 C 25 82, 10 70, 15 45 C 18 20, 30 18, 50 15 Z" opacity="0.9" />
      <path d="M48 18 C 65 15, 80 28, 82 48 C 84 65, 70 82, 48 80 C 28 78, 15 65, 18 48 C 20 28, 30 20, 48 18 Z" opacity="0.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
