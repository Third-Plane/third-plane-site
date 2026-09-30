import type { ReactNode } from "react";
import { reveal } from "../lib/style";
import { StackedTitle } from "./StackedTitle";

export type HeroFamily = "evidence" | "editorial" | "careers";

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
  const stacked = family === "careers";

  const heading = stacked ? (
    <StackedTitle lines={title} />
  ) : (
    <h1 className="display-1 display-1--inline display-1--plain" {...reveal(1)}>
      {title.join(" ")}
    </h1>
  );

  return (
    <section className={`hero hero--page hero--${family}`} id="top">
      <div className="container hero__page-copy">
        {status ? (
          <div data-reveal className="hero__status">
            <span className="status-pill">{status}</span>
          </div>
        ) : null}
        {heading}
        <p className="lead hero__lead" {...reveal(2)}>
          {lead}
        </p>
        {children ? (
          <div className="hero__actions" {...reveal(3)}>
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
