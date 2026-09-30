import type { ReactNode } from "react";
import { Eyebrow, Slash } from "./Ui";
import { delayStyle } from "../lib/style";

export type HeroFamily = "evidence" | "editorial" | "careers";

export function PageHero({
  crumb,
  status,
  title,
  lead,
  body,
  children,
  family = "evidence",
}: {
  crumb?: string;
  status?: string;
  title: string[];
  lead: string;
  body?: string;
  children?: ReactNode;
  family?: HeroFamily;
}) {
  const slash = family === "careers";
  const showCrumb = family === "careers" && Boolean(crumb);
  const stacked = family === "careers";
  const chrome = slash || showCrumb || status;

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
        {chrome ? (
          <div data-reveal className="hero__crumbs">
            {slash ? <Slash className="hero__slash" /> : null}
            {showCrumb ? <Eyebrow>{crumb}</Eyebrow> : null}
            {status ? <span className="status-pill">{status}</span> : null}
          </div>
        ) : null}
        {heading}
        <p className="lead hero__lead" data-reveal style={delayStyle(2)}>
          {lead}
        </p>
        {body ? (
          <p className="hero__body" data-reveal style={delayStyle(3)}>
            {body}
          </p>
        ) : null}
        {children ? (
          <div className="hero__actions" data-reveal style={delayStyle(4)}>
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
