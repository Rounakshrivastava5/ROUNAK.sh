import type { Project } from '../data/profile'

// Wireframe schematics in the spirit of technical drawings — stroke only, theme-aware.
export default function ProjectArt({ kind }: { kind: Project['art'] }) {
  const common = {
    viewBox: '0 0 220 150',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.25,
    className: 'h-full w-full',
    'aria-hidden': true,
  } as const

  switch (kind) {
    case 'context':
      return (
        <svg {...common}>
          <rect x="6" y="6" width="208" height="138" />
          <line x1="6" y1="22" x2="214" y2="22" />
          <circle cx="15" cy="14" r="2" />
          <circle cx="23" cy="14" r="2" />
          <circle cx="31" cy="14" r="2" />
          <rect x="44" y="10" width="90" height="8" />
          {/* Source chat */}
          <circle cx="26" cy="46" r="7" />
          <rect x="42" y="36" width="96" height="40" />
          <line x1="50" y1="46" x2="124" y2="46" />
          <line x1="50" y1="55" x2="130" y2="55" />
          <line x1="50" y1="64" x2="104" y2="64" />
          {/* transfer arrow */}
          <path className="transition-transform duration-300 group-hover:translate-x-1" d="M148 56h36m-6-6 6 6-6 6" />
          <circle cx="196" cy="56" r="7" />
          {/* Target chat */}
          <circle cx="26" cy="104" r="7" />
          <rect x="42" y="92" width="96" height="36" />
          <line x1="50" y1="102" x2="120" y2="102" />
          <line x1="50" y1="111" x2="128" y2="111" />
          <line x1="50" y1="120" x2="92" y2="120" strokeDasharray="3 3" />
        </svg>
      )
    case 'overlay':
      return (
        <svg {...common}>
          <rect x="6" y="6" width="208" height="138" strokeDasharray="4 4" />
          <line x1="20" y1="28" x2="110" y2="28" />
          <line x1="20" y1="40" x2="96" y2="40" />
          <line x1="20" y1="52" x2="104" y2="52" />
          <line x1="20" y1="64" x2="80" y2="64" />
          {/* floating panel */}
          <g className="transition-transform duration-300 group-hover:-translate-y-1">
            <rect x="118" y="34" width="84" height="96" fill="rgb(var(--surface))" />
            <line x1="118" y1="48" x2="202" y2="48" />
            <circle cx="126" cy="41" r="2" />
            {/* token gauge */}
            <path d="M136 92a24 24 0 0 1 48 0" />
            <path d="M136 92a24 24 0 0 1 36-20.8" strokeWidth="3" />
            <line x1="160" y1="92" x2="171" y2="76" />
            <rect x="130" y="102" width="60" height="8" />
            <rect x="130" y="102" width="44" height="8" fill="currentColor" opacity="0.15" />
            <line x1="130" y1="120" x2="176" y2="120" />
          </g>
        </svg>
      )
    case 'kanban':
      return (
        <svg {...common}>
          <rect x="6" y="6" width="208" height="138" />
          <line x1="6" y1="20" x2="214" y2="20" />
          <line x1="74" y1="20" x2="74" y2="144" />
          <line x1="146" y1="20" x2="146" y2="144" />
          {[0, 1, 2].map((c) => (
            <line key={c} x1={14 + c * 72} y1="30" x2={44 + c * 72} y2="30" />
          ))}
          <rect x="14" y="38" width="52" height="22" />
          <rect x="14" y="66" width="52" height="22" />
          <rect x="86" y="38" width="52" height="22" />
          <rect
            className="transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[2px]"
            x="86"
            y="66"
            width="52"
            height="22"
            strokeDasharray="3 2"
          />
          <rect x="86" y="94" width="52" height="22" />
          <rect x="156" y="38" width="50" height="22" />
          {[44, 72, 100].map((y) => (
            <line key={y} x1="92" y1={y + 6} x2="124" y2={y + 6} />
          ))}
          <line x1="20" y1="44" x2="50" y2="44" />
          <line x1="20" y1="72" x2="56" y2="72" />
          <line x1="162" y1="44" x2="194" y2="44" />
        </svg>
      )
    case 'timer':
      return (
        <svg {...common}>
          <rect x="6" y="6" width="208" height="138" />
          <line x1="40" y1="6" x2="40" y2="144" />
          <line x1="40" y1="20" x2="214" y2="20" />
          {[30, 44, 58].map((y) => (
            <rect key={y} x="16" y={y} width="12" height="8" />
          ))}
          {[34, 46, 58, 70, 82, 94].map((y, i) => (
            <line key={y} x1="52" y1={y} x2={[150, 120, 170, 100, 136, 90][i]} y2={y} />
          ))}
          {/* timer dial */}
          <circle cx="176" cy="96" r="22" />
          <path d="M176 74a22 22 0 0 1 21 28" strokeWidth="3" />
          <line
            className="origin-[176px_96px] transition-transform duration-500 group-hover:rotate-45"
            x1="176"
            y1="96"
            x2="176"
            y2="82"
          />
          <line x1="40" y1="132" x2="214" y2="132" />
          <rect x="150" y="135" width="58" height="6" />
        </svg>
      )
  }
}
