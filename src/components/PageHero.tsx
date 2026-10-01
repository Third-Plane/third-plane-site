import type { ReactNode } from "react";
import { reveal } from "../lib/style";
import { Display1, Lead } from "./Headings";
import { StackedTitle } from "./StackedTitle";

export type HeroFamily = "evidence" | "editorial" | "careers";

// evidence and careers share the washed hero; editorial is a plain cream band,
// tighter, with a smaller title and a looser lead.
const FAMILY = {
  evidence: {
    band: "bg-hero pt-[clamp(3rem,6vw,5.5rem)] pb-[clamp(3.5rem,7vw,6rem)]",
    lead: "mt-7 max-w-[46ch]",
    size: "hero",
  },
  careers: {
    band: "bg-hero pt-[clamp(3rem,6vw,5.5rem)] pb-[clamp(3.5rem,7vw,6rem)]",
    lead: "mt-7 max-w-[46ch]",
    size: "hero",
  },
  editorial: {
    band: "bg-cream pt-[clamp(2rem,4vw,3.25rem)] pb-[clamp(2.25rem,4.5vw,3.75rem)]",
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
  const { band, lead: leadClass, size } = FAMILY[family];

  const heading =
    family === "careers" ? (
      <StackedTitle lines={title} secondLine="ink" />
    ) : (
      <Display1 size={size} wrap="pretty" {...reveal(1)}>
        {title.join(" ")}
      </Display1>
    );

  return (
    <section className={`relative overflow-hidden ${band}`} id="top">
      <div className="pointer-events-auto wrap relative z-3 max-w-[720px]">
        {status ? (
          <div data-reveal className="mb-5 flex flex-col items-start gap-3">
            <span className="inline-block w-fit rounded-pill bg-pink px-[0.7rem] py-[0.3rem] text-label font-medium text-deep">
              {status}
            </span>
          </div>
        ) : null}
        {heading}
        <Lead tone="body" className={leadClass} {...reveal(2)}>
          {lead}
        </Lead>
        {children ? (
          <div className="pointer-events-auto mt-9 flex flex-wrap gap-3" {...reveal(3)}>
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
