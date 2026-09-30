import type { ReactNode } from "react";
import { SectionHead } from "./Ui";

export type SectionTone = "white" | "blend" | "deep";

// A page section: the band, the container and, when `title` is given, the
// heading. `backdrop` renders inside the band but outside the container, for
// decoration such as a ParticleField.
export function Section({
  id,
  tone,
  className,
  containerClassName,
  title,
  body,
  align,
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
  backdrop?: ReactNode;
  children?: ReactNode;
}) {
  const sectionClass = ["section", tone && `section--${tone}`, className].filter(Boolean).join(" ");
  const containerClass = ["wrap", containerClassName].filter(Boolean).join(" ");

  return (
    <section className={sectionClass} id={id}>
      {backdrop}
      <div className={containerClass}>
        {title ? <SectionHead title={title} body={body} align={align} /> : null}
        {children}
      </div>
    </section>
  );
}
