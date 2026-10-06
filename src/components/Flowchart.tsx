import { cn } from "../lib/style";

// The hero's background: the AI workforce drawn as a box-drawing flowchart, in
// motion. Static markup: scripts/flowchart.ts reads the settings from the data
// attributes and paints it.
//
// It sits below the page-width column (z 2). The mask quiets it under the copy
// column and the nav, so the headline reads over it.
const MASK =
  "[mask-image:linear-gradient(90deg,#0000004d_0%,#0000004d_30%,#000_58%),linear-gradient(180deg,#0000_0%,#000_18%)] [mask-composite:intersect] max-lg:[mask-image:linear-gradient(180deg,#0000_0%,#0006_30%,#000_100%)] max-lg:[mask-composite:add]";

// curve is how far the lens bends the chart, as on a CRT (0 for flat), and
// fringe how far its colours part at the corners, in CSS pixels (0 for none),
// scan how dark its scanlines are and noise how strong its grain, 0 to 1 (0
// for none). A slow bar rolls down the chart: roll is how much it strengthens
// the ink as it passes (0.4 is 40%) and glow how far it lifts the screen
// toward white (0.06 is 6%); 0 for both is no bar.
export function Flowchart({
  alpha = 1,
  cell = 8,
  curve = 0.12,
  fringe = 1.5,
  scan = 0.05,
  noise = 0.04,
  roll = 0.4,
  glow = 0.06,
}: {
  alpha?: number;
  cell?: number;
  curve?: number;
  fringe?: number;
  scan?: number;
  noise?: number;
  roll?: number;
  glow?: number;
}) {
  return (
    <canvas
      className={cn("pointer-events-none absolute inset-0 z-1 size-full", MASK)}
      aria-hidden="true"
      data-flowchart
      data-alpha={alpha}
      data-cell={cell}
      data-curve={curve}
      data-fringe={fringe}
      data-scan={scan}
      data-noise={noise}
      data-roll={roll}
      data-glow={glow}
    />
  );
}
