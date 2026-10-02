import type { ReactNode } from "react";
import { cn, reveal } from "../lib/style";
import { AppLink, Arrow } from "./Ui";

type Item = { title: string; body?: string; href?: string };

// card: a raised tile. outline: a flat, bordered tile. point: ruled, open text.
// An item with an `href` is a link, with an arrow after its title.
type Variant = "card" | "outline" | "point";

const COLUMNS = {
  2: "grid-cols-2 max-md:grid-cols-1",
  3: "grid-cols-3 max-lg:grid-cols-1",
  4: "grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1",
} as const;

// Each item is a subgrid spanning one set of rows (media, title, body), so
// titles and bodies line up across a row and every body row shares one height.
// It switches on exactly when the columns show: from md for two columns, from
// lg for three. Points only do this when they have a body.
function gridRows(variant: Variant, columns: 2 | 3 | 4, hasBody: boolean) {
  if (variant === "point") {
    return columns === 3 && hasBody ? "lg:auto-rows-[auto_1fr] lg:items-start" : "";
  }
  return columns === 3 ? "lg:auto-rows-[auto_auto_1fr]" : "md:auto-rows-[auto_1fr] md:items-start";
}

function itemRows(variant: Variant, columns: 2 | 3 | 4, hasBody: boolean) {
  if (variant === "point") {
    return columns === 3 && hasBody ? "lg:row-span-2 lg:grid lg:grid-rows-subgrid" : "";
  }
  return columns === 3
    ? "lg:row-span-3 lg:grid lg:grid-rows-subgrid"
    : "md:row-span-2 md:grid md:grid-rows-subgrid";
}

const BOX = {
  card: "rounded-2xl bg-white p-(--pad) shadow-lg transition-[translate,box-shadow] duration-250 hover:-translate-y-0.5 hover:shadow-2xl",
  outline: "rounded-2xl border border-line bg-white p-(--pad) shadow-none",
  point: "border-t border-t-line pt-6 transition-[border-color] duration-200 hover:border-t-purple",
} as const;

const TITLE = {
  tile: "font-heading text-xl leading-tight font-medium tracking-tight text-balance text-ink",
  point: "mb-3 font-heading text-xl font-medium tracking-tight text-ink",
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
  const gap = spaced ? "gap-8 items-start" : "gap-(--gap)";
  const hasBody = items.some((item) => item.body);
  const box = cn(BOX[variant], variant === "outline" && dense && "px-6 py-5");
  const title = variant === "point" ? cn(TITLE.point, spaced && "mb-2") : TITLE.tile;

  return (
    <div className={cn("grid", COLUMNS[columns], gap, gridRows(variant, columns, hasBody))}>
      {items.map((item, i) => {
        const className = cn(box, itemRows(variant, columns, !!item.body));
        const content = (
          <>
            {media?.(i)}
            <h3 className={title}>
              {item.title}
              {item.href ? (
                <Arrow className="ml-1.5 inline-block size-4 align-[-0.1em] text-purple transition-[translate] duration-200 group-hover:translate-x-0.75" />
              ) : null}
            </h3>
            {item.body ? <p className="text-base text-pretty text-ink-body">{item.body}</p> : null}
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
