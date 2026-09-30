import type { ReactNode } from "react";
import { delayStyle } from "../lib/style";

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
    <h1 className="display-1" data-reveal style={delayStyle(1)}>
      {title.map((line, i) => (
        // The space keeps the lines as separate words for crawlers and
        // screen readers; the spans are blocks, so it never shows.
        <span key={line}>{i > 0 ? ` ${line}` : line}</span>
      ))}
    </h1>
  ) : (
    <h1 className="display-1 display-1--inline display-1--plain" data-reveal style={delayStyle(1)}>
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
        <p className="lead hero__lead" data-reveal style={delayStyle(2)}>
          {lead}
        </p>
        {children ? (
          <div className="hero__actions" data-reveal style={delayStyle(3)}>
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
