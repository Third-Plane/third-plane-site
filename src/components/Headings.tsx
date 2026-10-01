import type { ComponentProps } from "react";

// The site's type styles. Each takes the choices that differ between uses as
// props, so no two competing utilities land on one element.

const DISPLAY_1_SIZE = {
  hero: "text-[clamp(2.5rem,5vw,4.15rem)]",
  editorial: "text-[clamp(2rem,3.4vw,2.85rem)]",
} as const;

export function Display1({
  size = "hero",
  wrap = "balance",
  className = "",
  ...props
}: ComponentProps<"h1"> & { size?: keyof typeof DISPLAY_1_SIZE; wrap?: "balance" | "pretty" }) {
  const wrapClass = wrap === "balance" ? "text-balance" : "text-pretty";
  return (
    <h1
      className={`font-heading leading-[1.04] font-medium tracking-display text-ink ${DISPLAY_1_SIZE[size]} ${wrapClass} ${className}`.trim()}
      {...props}
    />
  );
}

const DISPLAY_2_TONE = { light: "text-ink", dark: "text-on-dark" } as const;

export function Display2({
  tone = "light",
  className = "",
  ...props
}: ComponentProps<"h2"> & { tone?: keyof typeof DISPLAY_2_TONE }) {
  return (
    <h2
      className={`font-heading text-[clamp(1.9rem,3.4vw,2.85rem)] leading-[1.1] font-medium tracking-head-tight text-balance ${DISPLAY_2_TONE[tone]} ${className}`.trim()}
      {...props}
    />
  );
}

// purple: the default. dark: on a dark band. body: quieter, in an inner-page
// hero. The caller sets the measure (max-w-*) and any top margin.
const LEAD_TONE = {
  purple: "text-purple font-medium",
  dark: "text-on-dark-muted font-medium",
  body: "text-ink-body font-normal",
} as const;

export function Lead({
  tone = "purple",
  className = "",
  ...props
}: ComponentProps<"p"> & { tone?: keyof typeof LEAD_TONE }) {
  return (
    <p
      className={`font-sans text-[clamp(1.125rem,1.45vw,1.35rem)] leading-[1.45] text-pretty ${LEAD_TONE[tone]} ${className}`.trim()}
      {...props}
    />
  );
}
