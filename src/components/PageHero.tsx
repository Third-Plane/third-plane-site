import type { ReactNode } from "react";
import { reveal } from "../lib/style";
import { Display1, Lead } from "./Headings";
import type { ChartName } from "./Flowchart";
import { Hero, Leave } from "./Hero";

export function PageHero({
  title,
  lead,
  chart,
  children,
}: {
  title: string[];
  lead: string;
  chart?: ChartName;
  children?: ReactNode;
}) {
  return (
    <Hero chart={chart}>
      <div className="px-(--gutter) py-16">
        <div className="pointer-events-auto relative z-3">
          <Leave tier="heading">
            <Display1 wrap="pretty" {...reveal(1)}>
              {title.join(" ")}
            </Display1>
          </Leave>
          <Leave tier="lead">
            <Lead tone="muted" {...reveal(2)}>
              {lead}
            </Lead>
          </Leave>
          {children ? (
            <Leave tier="actions">
              <div className="mt-9 flex flex-wrap gap-3" {...reveal(3)}>
                {children}
              </div>
            </Leave>
          ) : null}
        </div>
      </div>
    </Hero>
  );
}
