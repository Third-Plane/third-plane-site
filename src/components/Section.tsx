import type { ReactNode } from "react";
import { SectionHead } from "./Ui";
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
  containerClassName,
  title,
  body,
  backdrop,
  children,
}: {
  id?: string;
  tone: SectionTone;
  containerClassName?: string;
  title?: string;
  body?: string;
  backdrop?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className={cn("relative overflow-hidden rounded-xl py-20", SURFACE[tone])} id={id}>
      {backdrop}
      <div className={cn("wrap", containerClassName)}>
        {title ? <SectionHead title={title} body={body} /> : null}
        {children}
      </div>
    </section>
  );
}
