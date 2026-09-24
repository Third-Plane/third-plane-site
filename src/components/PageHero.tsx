import type { ReactNode } from "react";
import { Eyebrow, Slash } from "./Ui";
import { delayStyle } from "../lib/style";

export type HeroFamily = "evidence" | "editorial" | "careers" | "platform";

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
  const leadFirst = family === "platform";
  const chrome = slash || showCrumb || status;

  const heading = stacked ? (
    <h1 className="display-1" data-reveal style={delayStyle(leadFirst ? 2 : 1)}>
      {title.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </h1>
  ) : (
    <h1
      className="display-1 display-1--inline display-1--plain"
      data-reveal
      style={delayStyle(leadFirst ? 2 : 1)}
    >
      {title.join(" ")}
    </h1>
  );

  const leadEl = (
    <p
      className="lead hero__lead"
      data-reveal
      style={delayStyle(leadFirst ? 1 : 2)}
    >
      {lead}
    </p>
  );

  return (
    <section
      className={[
        "hero",
        "hero--page",
        `hero--${family}`,
        leadFirst ? "hero--lead-first" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      id="top"
    >
      <div className="container hero__page-copy">
        {chrome ? (
          <div data-reveal className="hero__crumbs">
            {slash ? <Slash className="hero__slash" /> : null}
            {showCrumb ? <Eyebrow>{crumb}</Eyebrow> : null}
            {status ? <span className="status-pill">{status}</span> : null}
          </div>
        ) : null}
        {leadFirst ? (
          <>
            {leadEl}
            {heading}
          </>
        ) : (
          <>
            {heading}
            {leadEl}
          </>
        )}
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
