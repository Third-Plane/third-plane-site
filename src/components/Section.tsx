import type { ReactNode } from "react";
import { SectionHead } from "./Ui";
import { cn } from "../lib/style";

export type SectionTone = "white" | "blend" | "deep";

// Each tone is a surface (see index.css), which sets the colours of the band
// and everything in it.
const SURFACE: Record<SectionTone | "cream", string> = {
  cream: "surface-cream",
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
  className,
  containerClassName,
  title,
  body,
  align,
  compactHead,
  backdrop,
  children,
}: {
  id?: string;
  tone?: SectionTone;
  className?: string;
  containerClassName?: string;
  title?: string;
  body?: string;
  align?: "left" | "center";
  compactHead?: boolean;
  backdrop?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-xl py-27",
        SURFACE[tone ?? "cream"],
        className,
      )}
      id={id}
    >
      {backdrop}
      <div className={cn("wrap", containerClassName)}>
        {title ? (
          <SectionHead title={title} body={body} align={align} compact={compactHead} />
        ) : null}
        {children}
      </div>
    </section>
  );
}
