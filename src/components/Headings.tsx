import type { ComponentProps } from "react";
import { cn } from "../lib/style";

// The site's type styles. Each takes the choices that differ between uses as
// props, so no two competing utilities land on one element.

const DISPLAY_1_SIZE = {
  hero: "text-[clamp(2.5rem,5vw,4.15rem)]/none",
  editorial: "text-4xl/none",
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
        "font-heading font-medium tracking-tighter text-foreground",
        DISPLAY_1_SIZE[size],
        wrap === "balance" ? "text-balance" : "text-pretty",
        className,
      )}
      {...props}
    />
  );
}

export function Display2({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "font-heading text-4xl leading-none font-medium tracking-tight text-balance text-foreground",
        className,
      )}
      {...props}
    />
  );
}

// accent: the default. muted: quieter, in an inner-page hero. The caller sets
// the measure (max-w-*) and any top margin.
const LEAD_TONE = {
  accent: "text-accent font-medium",
  muted: "text-muted-foreground font-normal",
} as const;

export function Lead({
  tone = "accent",
  className,
  ...props
}: ComponentProps<"p"> & { tone?: keyof typeof LEAD_TONE }) {
  return (
    <p
      className={cn("font-sans text-xl leading-normal text-pretty", LEAD_TONE[tone], className)}
      {...props}
    />
  );
}
