import type { ComponentProps } from "react";
import { cn } from "../lib/style";

// The site's type styles, beyond the headings' own (see index.css). Each takes
// the choices that differ between uses as props, so no two competing utilities
// land on one element.

const DISPLAY_1_SIZE = {
  hero: "text-[clamp(2.5rem,4.5vw,4rem)]/none",
  editorial: "text-4xl/none",
} as const;

// The title is a string, or an array of lines. Two or more lines stack, one to
// a row; anything else flows as one.
export function Display1({
  size = "hero",
  className,
  children,
  ...props
}: Omit<ComponentProps<"h1">, "children"> & {
  children: string | readonly string[];
  size?: keyof typeof DISPLAY_1_SIZE;
}) {
  const lines = typeof children === "string" ? [children] : children;
  const stacked = lines.length > 1;
  return (
    <h1 className={cn("tracking-tighter", DISPLAY_1_SIZE[size], className)} {...props}>
      {stacked
        ? lines.map((line, i) => (
            // The space keeps the lines as separate words for crawlers and
            // screen readers; the spans are blocks, so it never shows.
            <span className="block" key={i}>
              {i > 0 ? ` ${line}` : line}
            </span>
          ))
        : lines.join(" ")}
    </h1>
  );
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
