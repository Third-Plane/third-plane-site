import type { ReactNode } from "react";
import { cn, reveal } from "../lib/style";
import { Display1, Lead } from "./Headings";
import { Ledger } from "./Ledger";
import { HERO_PADDING, Hero, Leave } from "./Hero";

// The full-width column ignores the pointer so the particle canvas behind stays out of
// the way; the copy and actions take it back, and the ledger sits on top.
const GRID = "pointer-events-none grid items-center gap-14 lg:grid-cols-2";

// The hero with copy on the left and the activity ledger on the right, full
// width (see Hero). A `title` array stacks its lines; a string flows as one.
export function SplitHero({
  title,
  lead,
  actions,
}: {
  title: string | string[];
  lead: string;
  actions: ReactNode;
}) {
  const heading = Array.isArray(title) ? (
    <Display1 {...reveal(1)}>
      {title.map((line, i) => (
        // The space keeps the lines as separate words for crawlers and
        // screen readers; the spans are blocks, so it never shows.
        <span className="block" key={line}>
          {i > 0 ? ` ${line}` : line}
        </span>
      ))}
    </Display1>
  ) : (
    <Display1 wrap="pretty" {...reveal(1)}>
      {title}
    </Display1>
  );

  return (
    <Hero>
      <div className={cn("px-(--gutter)", HERO_PADDING, GRID)}>
        <div className="pointer-events-auto relative z-3 max-w-150">
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
