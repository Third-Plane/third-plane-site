import type { ReactNode } from "react";
import { reveal } from "../lib/style";
import { Display1, Lead } from "./Headings";
import { Hero, Leave } from "./Hero";
import { StackedTitle } from "./StackedTitle";

export type HeroFamily = "evidence" | "editorial" | "careers";

// The inner pages' hero: one column of copy in the hero band (see Hero), under
// the page's nav. evidence and careers have the full padding; editorial is
// tighter, with a smaller title and a looser lead.
const FAMILY = {
  evidence: {
    padding: "pt-[clamp(3rem,6vw,5.5rem)] pb-[clamp(3.5rem,7vw,6rem)]",
    lead: "mt-7 max-w-[46ch]",
    size: "hero",
  },
  careers: {
    padding: "pt-[clamp(3rem,6vw,5.5rem)] pb-[clamp(3.5rem,7vw,6rem)]",
    lead: "mt-7 max-w-[46ch]",
    size: "hero",
  },
  editorial: {
    padding: "pt-[clamp(2rem,4vw,3.25rem)] pb-[clamp(2.25rem,4.5vw,3.75rem)]",
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
      <StackedTitle lines={title} secondLine="ink" />
    ) : (
      <Display1 size={size} wrap="pretty" {...reveal(1)}>
        {title.join(" ")}
      </Display1>
    );

  return (
    <Hero id="top">
      <div className={`px-(--gutter) ${padding}`}>
        <div className="pointer-events-auto relative z-3 max-w-[720px]">
          <Leave tier="heading">
            {status ? (
              <div data-reveal className="mb-5 flex flex-col items-start gap-3">
                <span className="inline-block w-fit rounded-pill bg-pink px-[0.7rem] py-[0.3rem] text-label font-medium text-deep">
                  {status}
                </span>
              </div>
            ) : null}
            {heading}
          </Leave>
          <Leave tier="lead">
            <Lead tone="body" className={leadClass} {...reveal(2)}>
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
