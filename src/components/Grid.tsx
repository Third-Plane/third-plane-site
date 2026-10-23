import { Children, type CSSProperties, type ReactNode } from "react";
import { cn } from "../lib/style";

// Columns from md for two (four shows two at md), from lg for three.
const COLUMNS = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

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

export function GridItem({ children }: { children: ReactNode }) {
  return (
    <article
      className="row-span-(--parts) grid grid-rows-subgrid gap-2 px-(--gutter) py-8"
      style={{ "--parts": Children.toArray(children).length } as CSSProperties}
    >
      {children}
    </article>
  );
}
