import type { ReactNode } from "react";
import { Eyebrow, Slash } from "./Ui";
import { ParticleField } from "./ParticleField";
import { delayStyle } from "../lib/style";

// The single-column opener every inner page uses: crumb, two-line title,
// purple lead, body, and whatever actions the page wants.
export function PageHero({
  crumb,
  status,
  title,
  lead,
  body,
  children,
}: {
  crumb: string;
  status?: string;
  title: string[];
  lead: string;
  body?: string;
  children?: ReactNode;
}) {
  return (
    <section className="hero hero--page" id="top">
      <ParticleField className="hero__particles" tone="purple" alpha={0.9} />
      <div className="container hero__page-copy">
        <div data-reveal className="hero__crumbs">
          <Slash className="hero__slash" />
          <Eyebrow>{crumb}</Eyebrow>
          {status ? <span className="status-pill">{status}</span> : null}
        </div>
        <h1 className="display-1" data-reveal style={delayStyle(1)}>
          {title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
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
