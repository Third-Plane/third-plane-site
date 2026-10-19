import type { ComponentProps } from "react";
import { cn } from "../lib/style";

// The site's type styles, beyond the headings' own (see index.css). Each takes
// the choices that differ between uses as props, so no two competing utilities
// land on one element.

const DISPLAY_1_SIZE = {
  hero: "text-[clamp(2.5rem,4.5vw,4rem)]/none",
  editorial: "text-4xl/none",
} as const;

// A page's title, one string the browser wraps.
export function Display1({
  size = "hero",
  className,
  ...props
}: Omit<ComponentProps<"h1">, "children"> & {
  children: string;
  size?: keyof typeof DISPLAY_1_SIZE;
}) {
  return <h1 className={cn("tracking-tighter", DISPLAY_1_SIZE[size], className)} {...props} />;
}

export function Lead({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "font-sans max-w-[66ch] text-accent font-medium text-xl leading-normal text-pretty",
        className,
      )}
      {...props}
    />
  );
}
