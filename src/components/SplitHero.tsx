import type { ReactNode } from "react";
import { delayStyle } from "../lib/style";
import { Ledger } from "./Ledger";
import { ParticleField } from "./ParticleField";

// The hero with copy on the left and the activity ledger on the right. A
// `title` array stacks its lines; a string flows as one.
export function SplitHero({
  title,
  lead,
  actions,
  className,
}: {
  title: string | string[];
  lead: string;
  actions: ReactNode;
  className?: string;
}) {
  const heading = Array.isArray(title) ? (
    <h1 className="display-1" data-reveal style={delayStyle(1)}>
      {title.map((line, i) => (
        // The space keeps the lines as separate words for crawlers and
        // screen readers; the spans are blocks, so it never shows.
        <span key={line}>{i > 0 ? ` ${line}` : line}</span>
      ))}
    </h1>
  ) : (
    <h1 className="display-1 display-1--inline" data-reveal style={delayStyle(1)}>
      {title}
    </h1>
  );

  return (
    <section className={["hero", className].filter(Boolean).join(" ")} id="top">
      <ParticleField className="hero__particles" tone="purple" alpha={0.9} />
      <div className="container hero__grid">
        <div className="hero__copy">
          {heading}
          <p className="lead hero__lead" data-reveal style={delayStyle(2)}>
            {lead}
          </p>
          <div className="hero__actions" data-reveal style={delayStyle(3)}>
            {actions}
          </div>
        </div>
        <div className="hero__figure" data-reveal style={delayStyle(3)}>
          <Ledger />
        </div>
      </div>
    </section>
  );
}
