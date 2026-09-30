import type { ReactNode } from "react";
import { reveal } from "../lib/style";
import { Ledger } from "./Ledger";
import { ParticleField } from "./ParticleField";
import { StackedTitle } from "./StackedTitle";

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
    <StackedTitle lines={title} />
  ) : (
    <h1 className="display-1 display-1--inline" {...reveal(1)}>
      {title}
    </h1>
  );

  return (
    <section className={["hero", className].filter(Boolean).join(" ")} id="top">
      <ParticleField className="hero__particles" tone="purple" alpha={0.9} />
      <div className="hero__grid wrap">
        <div className="hero__copy">
          {heading}
          <p className="lead hero__lead" {...reveal(2)}>
            {lead}
          </p>
          <div className="hero__actions" {...reveal(3)}>
            {actions}
          </div>
        </div>
        <div className="hero__figure" {...reveal(3)}>
          <Ledger />
        </div>
      </div>
    </section>
  );
}
