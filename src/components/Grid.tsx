import { Children, type CSSProperties, type ReactNode } from "react";
import { cn } from "../lib/style";

// Columns from md for two (four shows two at md), from lg for three.
const COLUMNS = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

// A grid of Points, ruled off from each other. Each item draws a rule on its
// right and its foot, and the grid clips its own right and foot by a pixel, so
// the rules show only between items, at any number of columns. The clip cuts
// off anything else drawn outside the grid too.
export function Grid({
  columns = 2,
  className,
  children,
}: {
  columns?: 2 | 3 | 4;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid [clip-path:inset(0_1px_1px_0)] *:border-r *:border-b *:border-accent/5",
        COLUMNS[columns],
        className,
      )}
    >
      {children}
    </div>
  );
}

// An item of a Grid: open text between its rules. It spans one grid row per
// part it renders (an illustration, a title, a body) as a subgrid, so the same
// part lines up across a row of items even when one title wraps. Its gap-y is
// its own, between its parts.
export function Point({ children }: { children: ReactNode }) {
  return (
    <article
      className="row-span-(--parts) grid grid-rows-subgrid gap-2 px-(--gutter) py-8"
      style={{ "--parts": Children.toArray(children).length } as CSSProperties}
    >
      {children}
    </article>
  );
}

export function ItemTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={className}>{children}</h3>;
}

export function ItemBody({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-base text-pretty text-muted-foreground", className)}>{children}</p>;
}
