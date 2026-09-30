import type { ReactNode } from "react";
import { reveal } from "../lib/style";
import { AppLink, Arrow } from "./Ui";

type Item = { title: string; body?: string; href?: string };

// card: a raised tile. outline: a flat, bordered tile. point: ruled, open text.
// An item with an `href` is a link, with an arrow after its title.
type Variant = "card" | "outline" | "point";

const COLUMNS = {
  2: "grid-cols-2 max-[760px]:grid-cols-1",
  3: "grid-cols-3 max-[900px]:grid-cols-1",
  4: "grid-cols-4 max-[1020px]:grid-cols-2 max-[760px]:grid-cols-1",
} as const;

// Wide screens only: each item is a subgrid spanning one set of rows (media,
// title, body), so titles and bodies line up across a row and every body row
// shares one height. Points only do this when they have a body.
function gridRows(variant: Variant, columns: 2 | 3 | 4, hasBody: boolean) {
  if (variant === "point") {
    return columns === 3 && hasBody
      ? "min-[901px]:auto-rows-[auto_1fr] min-[901px]:items-start"
      : "";
  }
  return columns === 3
    ? "min-[901px]:auto-rows-[auto_auto_1fr]"
    : "min-[901px]:auto-rows-[auto_1fr] min-[901px]:items-start";
}

function itemRows(variant: Variant, columns: 2 | 3 | 4, hasBody: boolean) {
  const subgrid = "min-[901px]:grid min-[901px]:grid-rows-subgrid";
  if (variant === "point") {
    return columns === 3 && hasBody ? `${subgrid} min-[901px]:row-span-2` : "";
  }
  return columns === 3 ? `${subgrid} min-[901px]:row-span-3` : `${subgrid} min-[901px]:row-span-2`;
}

const BOX = {
  card: "rounded-card bg-white p-(--pad) shadow-card transition-[translate,box-shadow] duration-250 hover:-translate-y-0.5 hover:shadow-lg",
  outline: "rounded-card border border-line bg-white p-(--pad) shadow-none",
  outlineDense: "rounded-card border border-line bg-white px-6 py-[1.35rem] shadow-none",
  point:
    "border-t-[1.5px] border-t-line pt-6 transition-[border-color] duration-200 hover:border-t-purple",
} as const;

const TITLE = {
  tile: "font-heading text-title leading-[1.2] font-medium tracking-head text-balance text-ink",
  point: "mb-3 font-heading text-title font-medium tracking-head text-ink",
  pointTight: "mb-[0.55rem] font-heading text-title font-medium tracking-head text-ink",
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
  const gap = spaced ? "gap-x-[clamp(1.5rem,3vw,2.5rem)] gap-y-8 items-start" : "gap-(--gap)";
  const hasBody = items.some((item) => item.body);
  const box = variant === "outline" && dense ? BOX.outlineDense : BOX[variant];
  const title = variant === "point" ? (spaced ? TITLE.pointTight : TITLE.point) : TITLE.tile;

  return (
    <div
      className={`grid ${COLUMNS[columns]} ${gap} ${gridRows(variant, columns, hasBody)}`.trim()}
    >
      {items.map((item, i) => {
        const className = `${box} ${itemRows(variant, columns, !!item.body)}`.trim();
        const content = (
          <>
            {media?.(i)}
            <h3 className={title}>
              {item.title}
              {item.href ? (
                <Arrow className="ml-[0.4rem] inline-block size-4 align-[-0.1em] text-purple transition-[translate] duration-200 group-hover:translate-x-[3px]" />
              ) : null}
            </h3>
            {item.body ? <p className="text-copy text-pretty text-ink-body">{item.body}</p> : null}
          </>
        );
        return item.href ? (
          <AppLink className={`group ${className}`} href={item.href} key={item.href} {...reveal(i)}>
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
