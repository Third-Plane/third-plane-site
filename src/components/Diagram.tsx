import { cn } from "../lib/style";
import { Flowchart, type ChartName } from "./Flowchart";

// A chart (scripts/flowchart/charts.ts) as a figure: a titled, bordered tile
// with the chart, in motion, in a square under the title and the caption
// below. The chart is drawn whole at the largest size the square holds, so
// its type scales with the tile, in the theme's foreground colour, plain (no
// lens). The chart is decoration to a screen reader; `description` says what
// it shows instead.
export function Diagram({
  chart,
  title,
  caption,
  description,
  accent = false,
}: {
  chart: ChartName;
  title: string;
  caption: string;
  description: string;
  accent?: boolean;
}) {
  return (
    <figure
      className={cn(
        "m-0 flex flex-col overflow-hidden rounded-2xl border",
        accent ? "border-transparent" : "border-border bg-card",
      )}
      data-theme={accent ? "accent" : undefined}
    >
      <p className="px-6 pt-6 font-heading text-xl leading-tight font-medium tracking-tight text-foreground sm:px-7 sm:pt-7">
        {title}
      </p>
      <div className="px-3 py-5 sm:px-5">
        <div className="relative aspect-square">
          <Flowchart
            chart={chart}
            fit="contain"
            ink="--foreground"
            alpha={1.6}
            curve={0}
            fringe={0}
            scan={0}
            noise={0}
            roll={0}
            glow={0}
          />
        </div>
      </div>
      <p className="sr-only">{description}</p>
      <figcaption className="mt-auto border-t border-border px-6 py-5 text-base text-muted-foreground sm:px-7">
        {caption}
      </figcaption>
    </figure>
  );
}
