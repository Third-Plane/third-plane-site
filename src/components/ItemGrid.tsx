import type { ReactNode } from "react";
import { cn, reveal } from "../lib/style";
import { AppLink, Arrow } from "./Ui";

type Item = { title: string; body?: string; href?: string };

// card: a raised tile. outline: a flat, bordered tile. point: ruled, open text.
// An item with an `href` is a link, with an arrow after its title.
type Variant = "card" | "outline" | "point";

// The columns show from md for two (and four, as two at first), from lg for
// three.
const COLUMNS = {
  2: "md:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
} as const;

// Once the columns show, each item is a subgrid spanning its rows (media,
// title, body), so titles and bodies line up across a row and every body row
// shares one height. By breakpoint, then by how many rows an item has.
const SUBGRID = {
  md: {
    2: { grid: "md:auto-rows-[auto_1fr]", item: "md:row-span-2 md:grid-rows-subgrid" },
    3: { grid: "md:auto-rows-[auto_auto_1fr]", item: "md:row-span-3 md:grid-rows-subgrid" },
  },
  lg: {
    2: { grid: "lg:auto-rows-[auto_1fr]", item: "lg:row-span-2 lg:grid-rows-subgrid" },
    3: { grid: "lg:auto-rows-[auto_auto_1fr]", item: "lg:row-span-3 lg:grid-rows-subgrid" },
  },
} as const;

// Each item is a grid with its own row gap, which also holds in the subgrid
// (instead of the gap between items).
const BOX = {
  card: "grid gap-y-5 rounded-2xl bg-card p-7 shadow-lg transition duration-250 hover:-translate-y-0.5 hover:shadow-2xl",
  outline: "grid gap-y-5 rounded-2xl border border-border bg-card p-7 shadow-none",
  point:
    "grid gap-y-3 border-t border-t-border pt-6 transition-colors duration-200 hover:border-t-accent",
} as const;

const TITLE = {
  tile: "font-heading text-xl leading-tight font-medium tracking-tight text-balance text-foreground",
  point: "font-heading text-xl font-medium tracking-tight text-foreground",
} as const;

// A grid of titled items that reveal in turn. `media` adds something above the
// title, such as a CardMark. `dense` tightens an outline tile's padding;
// `spaced` opens up a row of points.
export function ItemGrid({
  items,
  variant,
  columns = 2,
  media,
  dense = false,
  spaced = false,
}: {
  items: ReadonlyArray<Item>;
  variant: Variant;
  columns?: 2 | 3 | 4;
  media?: (index: number) => ReactNode;
  dense?: boolean;
  spaced?: boolean;
}) {
  const rows = (media ? 1 : 0) + 1 + (items.some((item) => item.body) ? 1 : 0);
  const subgrid = rows > 1 ? SUBGRID[columns === 3 ? "lg" : "md"][rows as 2 | 3] : undefined;
  const className = cn(
    BOX[variant],
    variant === "outline" && dense && "px-6 py-5",
    variant === "point" && spaced && "gap-y-2",
    subgrid?.item,
  );
  const title = variant === "point" ? TITLE.point : TITLE.tile;

  return (
    <div className={cn("grid", COLUMNS[columns], spaced ? "gap-8" : "gap-5", subgrid?.grid)}>
      {items.map((item, i) => {
        const content = (
          <>
            {media?.(i)}
            <h3 className={title}>
              {item.title}
              {item.href ? (
                <Arrow className="ml-1.5 inline-block size-4 align-[-0.1em] text-accent transition-transform duration-200 group-hover:translate-x-0.75" />
              ) : null}
            </h3>
            {item.body ? (
              <p className="text-base text-pretty text-muted-foreground">{item.body}</p>
            ) : null}
          </>
        );
        return item.href ? (
          <AppLink
            className={cn("group", className)}
            href={item.href}
            key={item.href}
            {...reveal(i)}
          >
            {content}
          </AppLink>
        ) : (
          <article className={className} {...reveal(i)} key={item.title}>
            {content}
          </article>
        );
      })}
    </div>
  );
}
