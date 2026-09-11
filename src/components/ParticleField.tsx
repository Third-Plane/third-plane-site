import { useEffect, useRef } from "react";

// The Intelligence Field: thousands of small square points, sparse at the top
// of a section and dense toward the foot, the way the identity draws it.
// Painted once to a canvas that fills its positioned parent; repainted only
// when the parent resizes. Colour comes from `tone`, overall strength from
// `alpha`, how many points from `density`.

const TONES = {
  purple: "99,56,227",
  deep: "45,31,87",
  cream: "246,243,240",
  white: "255,255,255",
} as const;

type Tone = keyof typeof TONES;

const MAX_POINTS = 3200;
const AREA_PER_POINT = 650;
const LEVELS = 24;

export function ParticleField({
  className = "",
  tone = "purple",
  alpha = 1,
  density = 1,
}: {
  className?: string;
  tone?: Tone;
  alpha?: number;
  density?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const rgb = TONES[tone];
    const palette = Array.from(
      { length: LEVELS + 1 },
      (_, i) => `rgba(${rgb},${(i / LEVELS).toFixed(3)})`,
    );
    const rand = Math.random;

    const paint = () => {
      const rect = parent.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const count = Math.min(
        MAX_POINTS,
        Math.round(((w * h) / AREA_PER_POINT) * density),
      );
      for (let i = 0; i < count; i += 1) {
        // Depth drives size and brightness; sqrt on y piles points toward
        // the bottom edge.
        const z = rand();
        const x = rand() * w;
        const y = h * Math.sqrt(rand());
        const size = 1 + Math.round(z * 2);
        const depth = y / h;
        const a =
          Math.min(1, depth * 1.6 + 0.12) *
          (0.45 + z * 0.55) *
          (0.55 + rand() * 0.45) *
          alpha;
        const level = Math.round(a * LEVELS);
        if (level <= 0) continue;
        ctx.fillStyle = palette[level];
        ctx.fillRect(x | 0, y | 0, size, size);
      }
    };

    paint();
    const observer = new ResizeObserver(paint);
    observer.observe(parent);
    return () => observer.disconnect();
  }, [tone, alpha, density]);

  return (
    <canvas
      ref={ref}
      className={`particles ${className}`.trim()}
      aria-hidden="true"
    />
  );
}
