import { cn } from "../lib/style";

export type ParticleTone = "purple" | "deep" | "cream" | "white";

// Where the points fade out. hero keeps the field out from under the headline:
// it fades in from the copy column toward the figure and thickens toward the
// foot of the hero (top to bottom only on narrow screens). section fades in
// from the top.
const MASK = {
  hero: "[mask-image:linear-gradient(90deg,#0000_0%,#00000059_40%,#000_62%),linear-gradient(180deg,#0000_0%,#000_55%)] [mask-composite:intersect] max-lg:[mask-image:linear-gradient(180deg,#0000_0%,#00000080_45%,#000_100%)] max-lg:[mask-composite:add]",
  section: "[mask-image:linear-gradient(180deg,#0000_0%,#000_45%)]",
} as const;

// A canvas that fills its positioned parent, below the page-width column (z 2)
// so points never cross copy. Static markup: scripts/particles.ts reads the
// settings from the data attributes and paints it.
export function ParticleField({
  mask,
  tone = "purple",
  alpha = 1,
  density = 1,
  speed = 1,
}: {
  mask: keyof typeof MASK;
  tone?: ParticleTone;
  alpha?: number;
  density?: number;
  speed?: number;
}) {
  return (
    <canvas
      className={cn("pointer-events-none absolute inset-0 z-1 size-full", MASK[mask])}
      aria-hidden="true"
      data-particles
      data-tone={tone}
      data-alpha={alpha}
      data-density={density}
      data-speed={speed}
    />
  );
}
