import type { ReactNode } from "react";
import { SectionHead } from "./Ui";

export type SectionTone = "white" | "blend" | "deep";

const TONE: Record<SectionTone | "cream", string> = {
  cream: "bg-cream",
  white: "bg-white",
  blend: "bg-(image:--blend)",
  deep: "bg-deep text-on-dark-muted",
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
  const sectionClass = [
    "relative overflow-hidden rounded-xl py-(--section-y)",
    TONE[tone ?? "cream"],
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const containerClass = ["wrap", containerClassName].filter(Boolean).join(" ");

  return (
    <section className={sectionClass} id={id}>
      {backdrop}
      <div className={containerClass}>
        {title ? (
          <SectionHead
            title={title}
            body={body}
            align={align}
            dark={tone === "deep"}
            compact={compactHead}
          />
        ) : null}
        {children}
      </div>
    </section>
  );
}
