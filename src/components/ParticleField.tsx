import { cn } from "../lib/style";

export type ParticleTone = "purple" | "cream";

// The points fade in from the top of the band.
const MASK = "[mask-image:linear-gradient(180deg,#0000_0%,#000_45%)]";

// A canvas that fills its positioned parent, below the page-width column (z 2)
// so points never cross copy. Static markup: scripts/particles.ts reads the
// settings from the data attributes and paints it.
export function ParticleField({
  tone = "purple",
  alpha = 1,
  density = 1,
}: {
  tone?: ParticleTone;
  alpha?: number;
  density?: number;
}) {
  return (
    <canvas
      className={cn("pointer-events-none absolute inset-0 z-1 size-full", MASK)}
      aria-hidden="true"
      data-particles
      data-tone={tone}
      data-alpha={alpha}
      data-density={density}
    />
  );
}
