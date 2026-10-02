import type { ReactNode } from "react";
import { cn, reveal } from "../lib/style";
import { Display1, Lead } from "./Headings";
import { Hero, Leave } from "./Hero";
import { StackedTitle } from "./StackedTitle";

export type HeroFamily = "evidence" | "editorial" | "careers";

// The inner pages' hero: one column of copy in the hero band (see Hero), under
// the page's nav. evidence and careers have the full padding; editorial is
// tighter, with a smaller title and a looser lead.
const FAMILY = {
  evidence: {
    padding: "pt-17 pb-19",
    lead: "mt-7 max-w-[46ch]",
    size: "hero",
  },
  careers: {
    padding: "pt-17 pb-19",
    lead: "mt-7 max-w-[46ch]",
    size: "hero",
  },
  editorial: {
    padding: "pt-10 pb-12",
    lead: "mt-4 max-w-[60ch]",
    size: "editorial",
  },
} as const;

export function PageHero({
  status,
  title,
  lead,
  children,
  family = "evidence",
}: {
  status?: string;
  title: string[];
  lead: string;
  children?: ReactNode;
  family?: HeroFamily;
}) {
  const { padding, lead: leadClass, size } = FAMILY[family];

  const heading =
    family === "careers" ? (
      <StackedTitle lines={title} secondLine="foreground" />
    ) : (
      <Display1 size={size} wrap="pretty" {...reveal(1)}>
        {title.join(" ")}
      </Display1>
    );

  return (
    <Hero id="top">
      <div className={cn("px-(--gutter)", padding)}>
        <div className="pointer-events-auto relative z-3 max-w-180">
          <Leave tier="heading">
            {status ? (
              <div data-reveal className="mb-5 flex flex-col items-start gap-3">
                <span className="inline-block w-fit rounded-full bg-pink px-3 py-1 text-sm font-medium text-deep">
                  {status}
                </span>
              </div>
            ) : null}
            {heading}
          </Leave>
          <Leave tier="lead">
            <Lead tone="muted" className={leadClass} {...reveal(2)}>
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
