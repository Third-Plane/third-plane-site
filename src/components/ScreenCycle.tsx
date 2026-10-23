import type { ReactNode } from "react";
import { AppLink, Arrow } from "./Ui";
import { cn } from "../lib/style";

// With an `href`, the item's title links there.
export type CycleItem = { title: string; body: ReactNode; screen: ReactNode; href?: string };
export type CycleStage = { title: string; items: CycleItem[] };

// A grid of items on the left, the active item's screen on the right (above
// the items below lg), one item at a time. The markup is static, with the
// first item active; scripts/screen-cycle.ts moves `data-active` along as each
// active cell's progress bar fills (see animate-progress in tailwind.css), and
// stops on a cell when it's clicked. Under reduced motion the bar doesn't
// fill, so the items only change on a click.
//
// From lg up the screens are out of flow, filling their column, so the column
// is as tall as the items beside it, and a gap past them, and no taller.
//
// The whole cell is its button's to click; a link in it (a linked title, or
// one in a body) sits above it.
//
// Each item shows for `duration` seconds (6 by default), and `active` is
// whether the first item starts active: a StagedScreenCycle's later stages
// start with none.
export function ScreenCycle({
  items,
  duration,
  active = true,
}: {
  items: CycleItem[];
  duration?: number;
  active?: boolean;
}) {
  return (
    <div className="grid gap-x-(--gutter) gap-y-10 lg:grid-cols-2" data-cycle>
      <div className="grid aspect-video lg:relative lg:col-start-2 lg:row-start-1">
        {items.map((item, i) => (
          <div
            className="col-start-1 row-start-1 transition-opacity duration-500 not-data-active:opacity-0 lg:absolute lg:inset-0"
            data-active={active && i === 0 ? "" : undefined}
            data-cycle-screen
            key={item.title}
          >
            {item.screen}
          </div>
        ))}
      </div>
      <div className="grid content-start gap-8 sm:grid-cols-2 lg:col-start-1 lg:row-start-1">
        {items.map((item, i) => (
          <CycleCell item={item} active={active && i === 0} duration={duration} key={item.title} />
        ))}
      </div>
    </div>
  );
}

// ScreenCycles in stages, run one after another as one cycle: a tab for each
// stage, always showing, over the active stage's ScreenCycle. After a stage's
// last item comes the next stage's first, and after the last stage's, the
// first's. The stages share one grid cell, so the section keeps the height of
// the tallest and doesn't shift as the stage changes, and from lg up each is
// stretched to it, so their screens are all the one size. Clicking a tab stops
// the cycle on its stage's first item.
//
// The outer data-cycle is the one scripts/screen-cycle.ts runs; the stages'
// own are left to it.
export function StagedScreenCycle({
  stages,
  duration,
}: {
  stages: CycleStage[];
  duration?: number;
}) {
  return (
    <div data-cycle>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-4">
        {stages.map((stage, i) => (
          <div className="contents" key={stage.title}>
            {i > 0 ? <Arrow className="size-4 shrink-0 text-muted-foreground/60" /> : null}
            <button
              className={cn(
                "cursor-pointer bg-transparent p-0 text-left font-heading text-lg leading-tight font-medium tracking-tight [border:0]",
                "text-muted-foreground/70 transition-colors duration-300 hover:text-foreground data-active:text-foreground",
              )}
              type="button"
              aria-pressed={i === 0}
              data-active={i === 0 ? "" : undefined}
              data-cycle-tab
            >
              {stage.title}
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 grid">
        {stages.map((stage, i) => (
          <div
            className={cn(
              "col-start-1 row-start-1 lg:grid",
              "transition-[opacity,visibility] duration-300 not-data-active:invisible not-data-active:opacity-0",
            )}
            data-active={i === 0 ? "" : undefined}
            data-cycle-group
            key={stage.title}
          >
            <ScreenCycle items={stage.items} duration={duration} active={i === 0} />
          </div>
        ))}
      </div>
    </div>
  );
}

function CycleCell({
  item,
  active,
  duration,
}: {
  item: CycleItem;
  active: boolean;
  duration?: number;
}) {
  return (
    <div
      className="group/cell relative space-y-2 border-t border-border pt-5 transition-opacity duration-300 not-data-active:opacity-50 hover:opacity-100 [&_a]:relative [&_a]:z-1"
      data-active={active ? "" : undefined}
      data-cycle-cell
    >
      <span
        className={cn(
          "absolute inset-x-0 -top-px h-0.5 origin-left scale-x-0 bg-accent",
          "group-data-active/cell:scale-x-100 motion-safe:group-data-active/cell:animate-progress",
        )}
        // Inline, so it holds over the animation's own duration.
        style={duration ? { animationDuration: `${duration}s` } : undefined}
        aria-hidden="true"
        data-cycle-progress
      />
      {item.href ? (
        // The title is the link, so the button is the cell's alone, named for
        // the item.
        <>
          <button
            className="absolute inset-0 cursor-pointer bg-transparent [border:0]"
            type="button"
            aria-pressed={active}
            aria-label={item.title}
          />
          <h4>
            <AppLink className="group/link hover:text-accent" href={item.href}>
              {item.title}
              <Arrow className="ml-1.5 inline-block size-4 align-[-0.1em] text-accent transition-transform duration-200 group-hover/link:translate-x-0.75" />
            </AppLink>
          </h4>
        </>
      ) : (
        <h4>
          <button
            className="cursor-pointer bg-transparent p-0 text-left tracking-[inherit] text-inherit [border:0] [font:inherit] after:absolute after:inset-0"
            type="button"
            aria-pressed={active}
          >
            {item.title}
          </button>
        </h4>
      )}
      <p className="text-sm text-muted-foreground">{item.body}</p>
    </div>
  );
}
