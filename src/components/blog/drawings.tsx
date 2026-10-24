/*
 * One abstract line drawing per article, in the house style of src/assets/gfx:
 * engineering blueprint, cyan on navy, no text, no people. Decorative only, so
 * aria-hidden; the card's title carries the meaning. Keyed by the article's
 * `drawing` front matter.
 */
import type { ReactNode } from "react";

const Frame = ({ children }: { children: ReactNode }) => (
  <svg
    viewBox="0 0 240 120"
    className="w-full h-auto max-w-[260px]"
    fill="none"
    stroke="#03c3f8"
    strokeWidth={1.25}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <g opacity={0.22} strokeDasharray="2 4">
      <path d="M8 104H232M8 16H232" />
    </g>
    {children}
  </svg>
);

const pipeline = () => (
  <Frame>
    <rect x="14" y="44" width="34" height="30" rx="3" />
    <rect x="76" y="26" width="34" height="30" rx="3" />
    <rect x="76" y="64" width="34" height="30" rx="3" />
    <rect x="138" y="44" width="34" height="30" rx="3" />
    <circle cx="210" cy="59" r="13" />
    <path d="M48 59h14v-18h14M62 59v20h14M110 41h14v18h14M110 79h14V59M172 59h25" />
    <path d="M204 59l4 4 8-9" />
  </Frame>
);

const rules = () => (
  <Frame>
    {[30, 42, 54, 66, 78, 90].map((y, i) => (
      <path key={y} d={`M24 ${y}H${70 + i * 22}`} />
    ))}
    <path d="M24 24v72" />
    <path d="M168 20v84" strokeDasharray="4 4" />
    <circle cx="168" cy="20" r="3" />
    <path d="M190 40l18 18-18 18" />
  </Frame>
);

const slides = () => (
  <Frame>
    <rect x="30" y="28" width="60" height="60" rx="3" />
    <rect x="98" y="28" width="60" height="60" rx="3" opacity={0.7} />
    <rect x="166" y="28" width="44" height="60" rx="3" opacity={0.4} />
    <path d="M42 46h28M42 56h36M42 66h20" />
    <path d="M110 46h22M110 56h36" opacity={0.7} />
  </Frame>
);

const sessions = () => (
  <Frame>
    <circle cx="120" cy="60" r="36" strokeDasharray="3 5" />
    {[0, 60, 120, 180, 240, 300].map((deg) => {
      const r = (deg * Math.PI) / 180;
      return <circle key={deg} cx={120 + 36 * Math.cos(r)} cy={60 + 36 * Math.sin(r)} r={6} />;
    })}
    <circle cx="120" cy="60" r="10" />
    <path d="M120 54v6l4 3" />
  </Frame>
);

const funnel = () => (
  <Frame>
    <path d="M40 24h160l-58 42v26l-44 10V66z" />
    <path d="M64 38h112M88 52h64" opacity={0.6} />
    <circle cx="120" cy="110" r="3" />
    <path d="M206 30l14-6M206 44l14 0M206 58l14 6" opacity={0.5} />
  </Frame>
);

const review = () => (
  <Frame>
    <rect x="40" y="22" width="64" height="80" rx="3" />
    <path d="M52 40h40M52 52h40M52 64h28" />
    <rect x="136" y="22" width="64" height="80" rx="3" />
    <path d="M150 62l12 12 24-26" />
    <path d="M104 62h32" strokeDasharray="3 4" />
  </Frame>
);

export const drawings: Record<string, () => JSX.Element> = {
  pipeline,
  rules,
  slides,
  sessions,
  funnel,
  review,
};
