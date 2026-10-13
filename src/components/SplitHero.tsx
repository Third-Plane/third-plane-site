import type { ReactNode } from "react";
import { Display1, Lead } from "./Headings";
import { Hero } from "./Hero";

// The hero with copy on the left and `children` (a panel: the activity
// ledger, the open roles) on the right, full width (see Hero). The `title` is
// as Display1 takes it.
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
  return (
    <Hero>
      <div className="my-16 grid items-center gap-16 lg:grid-cols-2">
        <div>
          <Display1>{title}</Display1>
          <Lead className="mt-7">{lead}</Lead>
          {actions ? <div className="mt-9 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        {children}
      </div>
    </Hero>
  );
}
