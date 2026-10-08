import type { ReactNode } from "react";
import { Display1, Lead } from "./Headings";
import { Hero } from "./Hero";

// The hero with copy on the left and `children` (a panel: the activity
// ledger, the open roles) on the right, full width (see Hero). A `title` array
// stacks its lines; a string flows as one.
export function SplitHero({
  title,
  lead,
  actions,
  children,
}: {
  title: string | string[];
  lead: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const heading = Array.isArray(title) ? (
    <Display1>
      {title.map((line, i) => (
        // The space keeps the lines as separate words for crawlers and
        // screen readers; the spans are blocks, so it never shows.
        <span className="block" key={line}>
          {i > 0 ? ` ${line}` : line}
        </span>
      ))}
    </Display1>
  ) : (
    <Display1 wrap="pretty">{title}</Display1>
  );

  return (
    <Hero>
      <div className="grid items-center gap-(--gutter) lg:grid-cols-2">
        <div>
          {heading}
          <Lead className="mt-7 max-w-[46ch]">{lead}</Lead>
          {actions ? <div className="mt-9 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        {children}
      </div>
    </Hero>
  );
}
