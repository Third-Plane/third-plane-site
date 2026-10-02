import type { ReactNode } from "react";
import { reveal } from "../lib/style";
import { Display1, Lead } from "./Headings";
import { Ledger } from "./Ledger";
import { Hero } from "./Hero";
import { StackedTitle } from "./StackedTitle";

// The full-width column ignores the pointer so the particle canvas behind stays out of
// the way; the copy and actions take it back, and the ledger sits on top.
const GRID =
  "pointer-events-none grid grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-center gap-[clamp(2rem,5vw,5rem)] max-lg:grid-cols-1";

const PADDING = "pt-[clamp(3.5rem,7vw,6.5rem)] pb-[clamp(4rem,8vw,7rem)]";

// Over the collapsing hero the content leaves in tiers, the lowest first
// (see hero-leave in tailwind.css). Each tier's slice of the collapse distance,
// as fractions of it: they overlap, and all finish before the rising edge of
// the hero reaches the tier above. The ledger goes with the actions; they sit
// lowest. A tier's shift is how far it drops as it fades.
const LEAVE = {
  actions: "lg:scroll-linked:hero-leave [--leave-from:0] [--leave-to:0.3] [--leave-shift:2.5rem]",
  lead: "lg:scroll-linked:hero-leave [--leave-from:0.15] [--leave-to:0.45] [--leave-shift:2.5rem]",
  heading: "lg:scroll-linked:hero-leave [--leave-from:0.3] [--leave-to:0.6] [--leave-shift:2.5rem]",
} as const;

// A wrapper that carries a tier's animation.
function Leave({ tier, children }: { tier: keyof typeof LEAVE; children: ReactNode }) {
  return <div className={LEAVE[tier]}>{children}</div>;
}

// The hero with copy on the left and the activity ledger on the right, full
// width (see Hero). A `title` array stacks its lines; a string flows as one.
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
    <Hero id="top">
      <div className={`px-(--gutter) ${PADDING} ${GRID}`}>
        <div className="pointer-events-auto relative z-3 max-w-[600px]">
          <Leave tier="heading">{heading}</Leave>
          <Leave tier="lead">
            <Lead className="mt-7 max-w-[46ch]" {...reveal(2)}>
              {lead}
            </Lead>
          </Leave>
          <Leave tier="actions">
            <div className="mt-9 flex flex-wrap gap-3" {...reveal(3)}>
              {actions}
            </div>
          </Leave>
        </div>
        <div className="pointer-events-none relative z-3" {...reveal(3)}>
          <Leave tier="actions">
            <Ledger />
          </Leave>
        </div>
      </div>
    </Hero>
  );
}
