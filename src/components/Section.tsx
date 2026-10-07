import { Children, isValidElement, type PropsWithChildren, type ReactNode } from "react";
import { Display2, Lead } from "./Headings";
import { cn } from "../lib/style";
import { ParticleField } from "./ParticleField";

export type SectionTone = "white" | "blend" | "deep" | "invert";

// How much of the page's flowchart (Base.astro) the band lets through: none
// (opaque), some, under a translucent surface (veil), or all of it (clear,
// which keeps only the tone's colours).
export type SectionBackdrop = "opaque" | "veil" | "clear";

const BACKDROP: Record<SectionBackdrop, string> = {
  opaque: "",
  veil: "veil",
  clear: "clear",
};

// Each tone is a surface (see index.css), which sets the colours of the band
// and everything in it.
const SURFACE: Record<SectionTone, string> = {
  white: "surface-white",
  blend: "surface-blend",
  deep: "surface-deep",
  invert: "surface-invert",
};

export function Section({
  id,
  tone,
  backdrop = "opaque",
  children,
}: PropsWithChildren & {
  id?: string;
  tone: SectionTone;
  backdrop?: SectionBackdrop;
}) {
  return (
    <section
      className={cn(
        "relative overflow-clip px-(--gutter) py-20 z-1",
        SURFACE[tone],
        BACKDROP[backdrop],
      )}
      id={id}
      data-band={tone}
    >
      {Children.map(children, (child) =>
        isValidElement(child) && child.type === ParticleField ? child : <Cut>{child}</Cut>,
      )}
    </section>
  );
}

// PROTOTYPE: a child of a band, cut away where it passes under the pinned nav
// (see the nav cut in tailwind.css). Plain blocks wherever that is off, which
// leave the layout as it was: neither starts a formatting context, so the
// child's margins still collapse through them. `className` is the outer
// block's, for what must sit on it (a blend mode, which inside it would blend
// with nothing).
export function Cut({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={className} data-cut>
      <div>{children}</div>
    </div>
  );
}

// A section's heading and optional lead, above its content in the column.
export function SectionHeader({ title, body }: { title: string; body?: string }) {
  return (
    <header className="wrap mb-13" data-reveal>
      <Display2>{title}</Display2>
      {body ? <Lead className="mt-5 max-w-[62ch]">{body}</Lead> : null}
    </header>
  );
}
