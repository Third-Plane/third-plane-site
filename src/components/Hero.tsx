import type { ReactNode } from "react";
import { Section, SectionHeader } from "./Section";

// A hero: see-through, over the page's flowchart (Base.astro), with a wash
// behind its copy (across the top where the copy stacks, down the copy column
// from lg up), the full width with the page's gutter, starting below the nav.
// From lg up it is at least 16:7, and taller where its content needs it, but
// never taller than the window, in the hero's theme. Vertical spacing is the
// caller's.
export function Hero({ children }: { children?: ReactNode }) {
  return (
    <Section theme="hero" id="top">
      {children}
    </Section>
  );
}

// The hero with copy on the left and `children` (a panel: the activity
// ledger, the open roles) on the right, full width (see Hero).
export function SplitHero({
  title,
  lead,
  actions,
  children,
}: {
  title: string;
  lead: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Hero>
      <div className="grid items-center gap-(--gutter) lg:grid-cols-2">
        <SectionHeader>
          <h1>{title}</h1>
          <h3 className="lead text-[22px]">{lead}</h3>
          {actions ? <div className="mt-9 flex flex-wrap gap-3">{actions}</div> : null}
        </SectionHeader>
        {children}
      </div>
    </Hero>
  );
}

export function PageHero({
  title,
  lead,
  children,
}: {
  title: string;
  lead: string;
  children?: ReactNode;
}) {
  return (
    <Hero>
      <SectionHeader>
        <h1>{title}</h1>
        <h3 className="lead">{lead}</h3>
        {children ? <div className="mt-9 flex flex-wrap gap-3">{children}</div> : null}
      </SectionHeader>
    </Hero>
  );
}
