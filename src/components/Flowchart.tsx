import type { ChartName } from "../scripts/flowchart/charts";

export type { ChartName };

// The page's background: one of the charts (scripts/flowchart/charts.ts)
// drawn as a box-drawing flowchart, in motion, filling the fixed backdrop
// behind everything (Base.astro). Static markup: scripts/flowchart.ts reads
// the settings from the data attributes and paints it. What lies over it
// decides how much shows: the hero's wash, and each band's backdrop.

// The chart shows the layout closest in shape to the window, scaled to cover
// it and centred, cropped evenly where it doesn't fit.
//
// curve is how far the lens bends the chart, as on a CRT (0 for flat), and
// fringe how far its colours part at the corners, in CSS pixels (0 for none),
// scan how dark its scanlines are and noise how strong its grain, 0 to 1 (0
// for none). A slow bar rolls down the chart: roll is how much it strengthens
// the ink as it passes (0.4 is 40%) and glow how far it lifts the screen
// toward white (0.06 is 6%); 0 for both is no bar.
export function Flowchart({
  chart = "placement",
  alpha = 1,
  curve = 0.12,
  fringe = 1.5,
  scan = 0.05,
  noise = 0.04,
  roll = 0.4,
  glow = 0.06,
}: {
  chart?: ChartName;
  alpha?: number;
  curve?: number;
  fringe?: number;
  scan?: number;
  noise?: number;
  roll?: number;
  glow?: number;
}) {
  return (
    <canvas
      className="pointer-events-none absolute inset-0 size-full"
      aria-hidden="true"
      data-flowchart
      data-chart={chart}
      data-alpha={alpha}
      data-curve={curve}
      data-fringe={fringe}
      data-scan={scan}
      data-noise={noise}
      data-roll={roll}
      data-glow={glow}
    />
  );
}
