import type { ReactNode } from "react";
import { Section, SectionHeader } from "./Section";

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
    <Section theme="hero" id="top">
      <div className="grid items-center gap-(--gutter) lg:grid-cols-2">
        <SectionHeader>
          <h1>{title}</h1>
          <h3 className="lead text-[22px]">{lead}</h3>
          {actions ? <div className="mt-9 flex flex-wrap gap-3">{actions}</div> : null}
        </SectionHeader>
        {children}
      </div>
    </Section>
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
    <Section theme="hero" id="top">
      <SectionHeader>
        <h1>{title}</h1>
        <h3 className="lead">{lead}</h3>
        {children ? <div className="mt-9 flex flex-wrap gap-3">{children}</div> : null}
      </SectionHeader>
    </Section>
  );
}
