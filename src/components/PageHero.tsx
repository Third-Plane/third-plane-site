import type { ReactNode } from "react";
import { Eyebrow, Slash } from "./Ui";
import { ParticleField } from "./ParticleField";
import { delayStyle } from "../lib/style";

export function PageHero({
  crumb,
  status,
  title,
  lead,
  body,
  children,
  slash = false,
  stacked = false,
  leadFirst = false,
}: {
  crumb?: string;
  status?: string;
  title: string[];
  lead: string;
  body?: string;
  children?: ReactNode;
  slash?: boolean;
  stacked?: boolean;
  leadFirst?: boolean;
}) {
  const heading = stacked ? (
    <h1 className="display-1" data-reveal style={delayStyle(leadFirst ? 2 : 1)}>
      {title.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </h1>
  ) : (
    <h1
      className="display-1 display-1--inline"
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

  const chrome = slash || crumb || status;

  return (
    <section
      className={
        leadFirst ? "hero hero--page hero--lead-first" : "hero hero--page"
      }
      id="top"
    >
      <ParticleField className="hero__particles" tone="purple" alpha={0.9} />
      <div className="container hero__page-copy">
        {chrome ? (
          <div data-reveal className="hero__crumbs">
            {slash ? <Slash className="hero__slash" /> : null}
            {crumb ? <Eyebrow>{crumb}</Eyebrow> : null}
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
