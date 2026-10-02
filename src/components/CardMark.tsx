import type { ReactNode } from "react";

export type MarkName = "portal" | "api" | "mail";

// Line drawings for the carrier channels, each on its own viewBox.
const MARKS: Record<MarkName, { viewBox: string; drawing: ReactNode }> = {
  portal: {
    viewBox: "0 0 88 52",
    drawing: (
      <>
        <rect x="10" y="8" width="68" height="36" rx="4" />
        <path d="M10 18h68" />
        <circle cx="18" cy="13" r="1.5" fill="currentColor" />
        <circle cx="24" cy="13" r="1.5" fill="currentColor" />
        <circle cx="30" cy="13" r="1.5" fill="currentColor" />
        <rect x="18" y="24" width="38" height="5" rx="1" />
        <rect x="18" y="33" width="26" height="5" rx="1" />
      </>
    ),
  },
  api: {
    viewBox: "0 0 88 52",
    drawing: (
      <>
        <rect x="8" y="14" width="22" height="24" rx="4" />
        <rect x="58" y="14" width="22" height="24" rx="4" />
        <path d="M34 26h16" />
        <path d="M46 21.5 52.5 26 46 30.5" />
      </>
    ),
  },
  mail: {
    viewBox: "0 0 88 52",
    drawing: (
      <>
        <rect x="16" y="13" width="56" height="28" rx="3" />
        <path d="M16 16.5 44 32 72 16.5" />
      </>
    ),
  },
};

export function CardMark({ name }: { name: MarkName }) {
  const { viewBox, drawing } = MARKS[name];
  return (
    <div className="mb-3 flex aspect-[1.7/1] items-center justify-center overflow-hidden rounded-2xl bg-lavender text-purple">
      <svg className="h-[86%] w-auto" viewBox={viewBox} fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
          {drawing}
        </g>
      </svg>
    </div>
  );
}
