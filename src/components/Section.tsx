import type { PropsWithChildren } from "react";
import { Display2, Lead } from "./Headings";
import { cn } from "../lib/style";

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
        "relative overflow-hidden px-(--gutter) pt-[calc(var(--spacing-bar)*2)] pb-bar z-1",
        SURFACE[tone],
        BACKDROP[backdrop],
      )}
      id={id}
      data-band={tone}
    >
      {children}
    </section>
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
