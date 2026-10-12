import type { HomeFile } from "../data/content-types";
import { ItemBody, ItemTitle } from "./Grid";
import { Display2, Lead } from "./Headings";
import { ProblemScreen, type ScreenName } from "./ProblemScreens";
import { cn } from "../lib/style";

// A mock AMS screen for each problem point, in the order of problem.points.
const problemScreens: ScreenName[] = ["renewed", "overdue", "unassigned", "revenue"];

// The homepage's problems: the heading and a grid of the points on the left,
// the active point's screen on the right (stacked above the points below lg).
// The markup is static, with the first point active; scripts/problem-cycle.ts
// moves `data-active` along as each active cell's progress bar fills (see
// animate-progress in tailwind.css), and to a cell when it's clicked. Under
// reduced motion the bar doesn't fill, so the points only change on a click.
export function ProblemCycle({
  title,
  body,
  points,
}: {
  title: string;
  body: string;
  points: HomeFile["problem"]["points"];
}) {
  return (
    <div className="grid gap-x-16 gap-y-13 lg:grid-cols-2" data-cycle>
      {/* SectionHeader's, without its column or its margin (the gap's). */}
      <header>
        <Display2>{title}</Display2>
        <Lead className="mt-5 max-w-[62ch]">{body}</Lead>
      </header>
      <div className="grid lg:col-start-2 lg:row-span-2 lg:row-start-1">
        {points.map((point, i) => (
          <div
            className="col-start-1 row-start-1 transition-opacity duration-500 not-data-active:opacity-0"
            data-active={i === 0 ? "" : undefined}
            data-cycle-screen
            key={point.title}
          >
            <ProblemScreen name={problemScreens[i]} className="rounded-2xl border-b-0 shadow-lg" />
          </div>
        ))}
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        {points.map((point, i) => (
          <div
            className="group/cell relative space-y-2 border-t border-border pt-5 transition-opacity duration-300 not-data-active:opacity-50 hover:opacity-100"
            data-active={i === 0 ? "" : undefined}
            data-cycle-cell
            key={point.title}
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
              {/* The whole cell is the button's to click. */}
              <button
                className="cursor-pointer bg-transparent p-0 text-left tracking-[inherit] text-inherit [border:0] [font:inherit] after:absolute after:inset-0"
                type="button"
                aria-pressed={i === 0}
              >
                {point.title}
              </button>
            </ItemTitle>
            <ItemBody className="text-sm">{point.body}</ItemBody>
          </div>
        ))}
      </div>
    </div>
  );
}
