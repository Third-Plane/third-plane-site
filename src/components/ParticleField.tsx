export type ParticleTone = "purple" | "deep" | "cream" | "white";

// A canvas that fills its positioned parent. Static markup: scripts/particles.ts
// reads the settings from the data attributes and paints it.
export function ParticleField({
  className = "",
  tone = "purple",
  alpha = 1,
  density = 1,
  speed = 1,
}: {
  className?: string;
  tone?: ParticleTone;
  alpha?: number;
  density?: number;
  speed?: number;
}) {
  return (
    <canvas
      className={`particles ${className}`.trim()}
      aria-hidden="true"
      data-particles
      data-tone={tone}
      data-alpha={alpha}
      data-density={density}
      data-speed={speed}
    />
  );
}
