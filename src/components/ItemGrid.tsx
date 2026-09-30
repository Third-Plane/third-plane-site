import type { ReactNode } from "react";
import { reveal } from "../lib/style";

// A grid of titled items that reveal in turn. `card` items are raised tiles;
// `point` items are ruled, open text. `media` adds something above the title,
// such as a CardMark.
export function ItemGrid({
  items,
  variant,
  columns = 2,
  media,
}: {
  items: ReadonlyArray<{ title: string; body?: string }>;
  variant: "card" | "point";
  columns?: 2 | 3 | 4;
  media?: (index: number) => ReactNode;
}) {
  return (
    <div className={`grid grid--${columns}`}>
      {items.map((item, i) => (
        <article className={variant} {...reveal(i)} key={item.title}>
          {media?.(i)}
          <h3 className={`${variant}__title`}>{item.title}</h3>
          {item.body ? <p className={`${variant}__body`}>{item.body}</p> : null}
        </article>
      ))}
    </div>
  );
}
