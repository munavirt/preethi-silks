/**
 * Hand-drawn style 2D textile artwork: fine red line work used sparingly.
 * Pure inline SVG — no images, no 3D.
 */

export function ZariBorderLine({ className = "" }: { className?: string }) {
  const cx = 14;
  const motifCount = 14;
  const viewH = 600;
  const spacing = viewH / motifCount;
  const half = spacing / 2;
  const outerR = 11;
  const innerR = 5;

  return (
    <svg
      viewBox={`0 0 28 ${viewH}`}
      fill="none"
      aria-hidden="true"
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Vertical spine */}
      <line x1={cx} y1="0" x2={cx} y2={viewH} stroke="currentColor" strokeWidth="0.5" opacity="0.25" />

      {Array.from({ length: motifCount }).map((_, i) => {
        const y = half + i * spacing;
        return (
          <g key={i}>
            <line x1={cx - 5} y1={y - half * 0.45} x2={cx + 5} y2={y - half * 0.45} stroke="currentColor" strokeWidth="0.4" opacity="0.35" />
            <path d={`M${cx} ${y - outerR} L${cx + outerR} ${y} L${cx} ${y + outerR} L${cx - outerR} ${y} Z`} stroke="currentColor" strokeWidth="0.75" opacity="0.85" />
            <path d={`M${cx} ${y - innerR} L${cx + innerR} ${y} L${cx} ${y + innerR} L${cx - innerR} ${y} Z`} stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
            <circle cx={cx} cy={y} r="1.6" fill="currentColor" opacity="0.9" />
            <circle cx={cx} cy={y - outerR - 3} r="1" fill="currentColor" opacity="0.4" />
            <circle cx={cx} cy={y + outerR + 3} r="1" fill="currentColor" opacity="0.4" />
          </g>
        );
      })}
    </svg>
  );
}

export function BotanicalSpray({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 420"
      fill="none"
      aria-hidden="true"
      className={className}
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    >
      <path d="M110 415C110 300 104 210 78 120C64 72 48 40 30 14" />
      <path d="M110 330c30-8 54-30 66-64-38-2-62 22-66 64Z" />
      <path d="M96 268c-30-10-52-34-60-70 38 0 60 26 60 70Z" />
      <path d="M100 210c28-10 48-32 56-66-36 0-58 24-56 66Z" />
      <path d="M84 152c-26-12-44-34-50-66 34 2 52 26 50 66Z" />
      <path d="M92 100c22-12 36-32 40-60-30 4-44 26-40 60Z" />
      <circle cx="30" cy="14" r="4" />
      <circle cx="150" cy="60" r="3" />
      <circle cx="60" cy="60" r="2.5" />
    </svg>
  );
}

export function BorderMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 40"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M0 20h480" opacity="0.35" />
      {Array.from({ length: 16 }).map((_, i) => (
        <g key={i} transform={`translate(${i * 30 + 15} 20)`}>
          <path d="M0 -10 L8 0 L0 10 L-8 0 Z" />
          <path d="M0 -4 L3 0 L0 4 L-3 0 Z" opacity="0.6" />
        </g>
      ))}
    </svg>
  );
}

export function ThreadLine({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 60"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    >
      <path d="M0 30C60 4 120 56 180 30S300 4 360 30s120 26 180 0 60-26 60-26" />
    </svg>
  );
}

export function MapLines({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      aria-hidden="true"
      className={className}
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M0 70h400M0 190h400M120 0v300M280 0v300" opacity="0.4" />
      <path d="M120 190 200 70l80 120" opacity="0.6" />
      <circle cx="200" cy="130" r="8" />
      <circle cx="200" cy="130" r="20" opacity="0.4" />
      <circle cx="200" cy="130" r="34" opacity="0.2" />
    </svg>
  );
}
