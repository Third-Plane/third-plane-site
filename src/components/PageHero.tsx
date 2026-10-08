import type { ReactNode } from "react";
import { Display1, Lead } from "./Headings";
import { Hero } from "./Hero";

export function PageHero({
  title,
  lead,
  children,
}: {
  title: string[];
  lead: string;
  children?: ReactNode;
}) {
  return (
    <Hero>
      <div className="py-16">
        <Display1 wrap="pretty">{title.join(" ")}</Display1>
        <Lead tone="muted">{lead}</Lead>
        {children ? <div className="mt-9 flex flex-wrap gap-3">{children}</div> : null}
      </div>
    </Hero>
  );
}
