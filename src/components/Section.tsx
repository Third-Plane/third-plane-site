import type { PropsWithChildren } from "react";
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

export function Section({
  id,
  tone,
  children,
}: PropsWithChildren & {
  id?: string;
  tone: SectionTone;
}) {
  return (
    <section
      className={cn("relative overflow-hidden px-(--gutter) rounded-xl py-20", SURFACE[tone])}
      id={id}
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
