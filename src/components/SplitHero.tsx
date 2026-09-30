import type { ReactNode } from "react";
import { reveal } from "../lib/style";
import { Display1, Lead } from "./Headings";
import { Ledger } from "./Ledger";
import { ParticleField } from "./ParticleField";
import { StackedTitle } from "./StackedTitle";

// The hero with copy on the left and the activity ledger on the right. A
// `title` array stacks its lines; a string flows as one. The page-width column
// ignores the pointer so the canvas behind stays out of the way; the copy and
// actions take it back, and the ledger sits on top.
export function SplitHero({
  title,
  lead,
  actions,
  secondLine,
}: {
  title: string | string[];
  lead: string;
  actions: ReactNode;
  secondLine?: "purple" | "ink";
}) {
  const heading = Array.isArray(title) ? (
    <StackedTitle lines={title} secondLine={secondLine} />
  ) : (
    <Display1 wrap="pretty" {...reveal(1)}>
      {title}
    </Display1>
  );

  return (
    <section
      className="relative overflow-hidden pt-[clamp(3.5rem,7vw,6.5rem)] pb-[clamp(4rem,8vw,7rem)] bg-hero"
      id="top"
    >
      <ParticleField mask="hero" tone="purple" alpha={0.9} />
      <div className="pointer-events-none wrap grid grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-center gap-[clamp(2rem,5vw,5rem)] max-[980px]:grid-cols-1">
        <div className="pointer-events-auto relative z-3 max-w-[600px]">
          {heading}
          <Lead className="mt-7 max-w-[46ch]" {...reveal(2)}>
            {lead}
          </Lead>
          <div className="pointer-events-auto mt-9 flex flex-wrap gap-3" {...reveal(3)}>
            {actions}
          </div>
        </div>
        <div className="pointer-events-none relative z-3" {...reveal(3)}>
          <Ledger />
        </div>
      </div>
    </section>
  );
}
