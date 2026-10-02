import type { ComponentProps } from "react";
import { cn } from "../lib/style";

// The site's type styles. Each takes the choices that differ between uses as
// props, so no two competing utilities land on one element.

const DISPLAY_1_SIZE = {
  hero: "text-[clamp(2.5rem,5vw,4.15rem)]/[1.04]",
  editorial: "text-[clamp(2rem,3.4vw,2.85rem)]/[1.04]",
} as const;

export function Display1({
  size = "hero",
  wrap = "balance",
  className,
  ...props
}: ComponentProps<"h1"> & { size?: keyof typeof DISPLAY_1_SIZE; wrap?: "balance" | "pretty" }) {
  return (
    <h1
      className={cn(
        "font-heading font-medium tracking-tighter text-ink",
        DISPLAY_1_SIZE[size],
        wrap === "balance" ? "text-balance" : "text-pretty",
        className,
      )}
      {...props}
    />
  );
}

const DISPLAY_2_TONE = { light: "text-ink", dark: "text-on-dark" } as const;

export function Display2({
  tone = "light",
  className,
  ...props
}: ComponentProps<"h2"> & { tone?: keyof typeof DISPLAY_2_TONE }) {
  return (
    <h2
      className={cn(
        "font-heading text-[clamp(1.9rem,3.4vw,2.85rem)] leading-[1.1] font-medium tracking-tight text-balance",
        DISPLAY_2_TONE[tone],
        className,
      )}
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
  className,
  ...props
}: ComponentProps<"p"> & { tone?: keyof typeof LEAD_TONE }) {
  return (
    <p
      className={cn(
        "font-sans text-[clamp(1.125rem,1.45vw,1.35rem)] leading-[1.45] text-pretty",
        LEAD_TONE[tone],
        className,
      )}
      {...props}
    />
  );
}
