import type { ReactNode } from "react";
import { ItemBody, ItemTitle } from "./Grid";
import { Display2, Lead } from "./Headings";
import { cn } from "../lib/style";

// For an item's screen: a mock screen's Frame (MockUi), standing on its own
// rather than running into a card's caption.
export const cycleFrame = "rounded-2xl border-b-0 shadow-lg";

export type CycleItem = { title: string; body: ReactNode; screen: ReactNode };

// A section's heading and a grid of items on the left, the active item's
// screen on the right (stacked above the items below lg), one item at a time.
// The markup is static, with the first item active; scripts/screen-cycle.ts
// moves `data-active` along as each active cell's progress bar fills (see
// animate-progress in tailwind.css), and to a cell when it's clicked. Under
// reduced motion the bar doesn't fill, so the items only change on a click.
//
// The whole cell is its button's to click; a link in a body sits above it.
export function ScreenCycle({
  title,
  body,
  items,
}: {
  title: string;
  body?: string;
  items: CycleItem[];
}) {
  return (
    <div className="grid gap-x-16 gap-y-13 lg:grid-cols-2" data-cycle>
      {/* SectionHeader's, without its column or its margin (the gap's). */}
      <header>
        <Display2>{title}</Display2>
        {body ? <Lead className="mt-5 max-w-[62ch]">{body}</Lead> : null}
      </header>
      <div className="grid lg:col-start-2 lg:row-span-2 lg:row-start-1">
        {items.map((item, i) => (
          <div
            className="col-start-1 row-start-1 transition-opacity duration-500 not-data-active:opacity-0"
            data-active={i === 0 ? "" : undefined}
            data-cycle-screen
            key={item.title}
          >
            {item.screen}
          </div>
        ))}
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        {items.map((item, i) => (
          <div
            className="group/cell relative space-y-2 border-t border-border pt-5 transition-opacity duration-300 not-data-active:opacity-50 hover:opacity-100 [&_a]:relative [&_a]:z-1"
            data-active={i === 0 ? "" : undefined}
            data-cycle-cell
            key={item.title}
          >
            <span
              className={cn(
                "absolute inset-x-0 -top-px h-0.5 origin-left scale-x-0 bg-accent",
                "group-data-active/cell:scale-x-100 motion-safe:group-data-active/cell:animate-progress",
              )}
              aria-hidden="true"
              data-cycle-progress
            />
            <ItemTitle className="text-lg">
              <button
                className="cursor-pointer bg-transparent p-0 text-left tracking-[inherit] text-inherit [border:0] [font:inherit] after:absolute after:inset-0"
                type="button"
                aria-pressed={i === 0}
              >
                {item.title}
              </button>
            </ItemTitle>
            <ItemBody className="text-sm">{item.body}</ItemBody>
          </div>
        ))}
      </div>
    </div>
  );
}
