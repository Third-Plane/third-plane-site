import type { ReactNode } from "react";
import { Display2, Lead } from "./Headings";
import { cn } from "../lib/style";

export type SectionTone = "white" | "blend" | "deep";

// Each tone is a surface (see index.css), which sets the colours of the band
// and everything in it.
const SURFACE: Record<SectionTone, string> = {
  white: "surface-white",
  blend: "surface-blend",
  deep: "surface-deep",
};

// A page section: the band (a rounded card; <main> in Base.astro spaces them),
// the container and, when `title` is given, the heading. `backdrop` renders inside the band but outside the container, for
// decoration such as a ParticleField.
export function Section({
  id,
  tone,
  title,
  body,
  backdrop,
  children,
}: {
  id?: string;
  tone: SectionTone;
  title?: string;
  body?: string;
  backdrop?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className={cn("relative overflow-hidden rounded-xl py-20", SURFACE[tone])} id={id}>
      {backdrop}
      <div className="wrap">
        {title ? (
          <header className="mb-13 max-w-190" data-reveal>
            <Display2>{title}</Display2>
            {body ? <Lead className="mt-5 max-w-[62ch]">{body}</Lead> : null}
          </header>
        ) : null}
        {children}
      </div>
    </section>
  );
}
