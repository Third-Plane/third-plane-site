import { useEffect, useRef } from "react";

// The Intelligence Field, in motion. Thousands of small square points drift
// downward like slow rain, decelerate as they near the bottom of the section
// and brighten as they go, so the field thickens toward one edge the way the
// identity draws it. Points that leave the frame are reborn at the top.
//
// The canvas fills its positioned parent. Colour comes from `tone`, overall
// strength from `alpha`, how many points from `density`, fall rate from
// `speed`. It pauses while off-screen or in a hidden tab, and under
// prefers-reduced-motion it paints one settled frame and stops.

const TONES = {
  purple: "99,56,227",
  deep: "45,31,87",
  cream: "246,243,240",
  white: "255,255,255",
} as const;

type Tone = keyof typeof TONES;

type Point = {
  x: number;
  y: number;
  z: number;
  size: number;
  vy: number;
  drift: number;
  phase: number;
  base: number;
};

const MAX_POINTS = 3200;
const AREA_PER_POINT = 650;
const LEVELS = 24;

export function ParticleField({
  className = "",
  tone = "purple",
  alpha = 1,
  density = 1,
  speed = 1,
}: {
  className?: string;
  tone?: Tone;
  alpha?: number;
  density?: number;
  speed?: number;
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
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const rand = Math.random;

    let w = 1;
    let h = 1;
    let points: Point[] = [];
    let raf = 0;
    let last = 0;
    let visible = true;

    // A point's depth (z) drives its size, fall speed and brightness, which
    // gives the field a little parallax without any camera. Settled points
    // are distributed the way the steady state looks: sparse at the top,
    // dense at the bottom. Reborn points start just above the frame.
    const spawn = (p: Point, settled: boolean) => {
      p.z = rand();
      p.x = rand() * w;
      p.y = settled ? h * Math.sqrt(rand()) : -rand() * h * 0.08 - 2;
      p.size = 1 + Math.round(p.z * 2);
      p.vy = (8 + p.z * 26) * speed;
      p.drift = (rand() - 0.5) * 3;
      p.phase = rand() * Math.PI * 2;
      p.base = (0.45 + p.z * 0.55) * (0.55 + rand() * 0.45) * alpha;
      return p;
    };

    const draw = (dt: number, t: number) => {
      ctx.clearRect(0, 0, w, h);
      let current = -1;
      for (const p of points) {
        if (dt > 0) {
          // Slow down toward the bottom so points accumulate there.
          const ease = 0.3 + 0.7 * (1 - Math.min(1, p.y / h));
          p.y += p.vy * ease * dt;
          p.x += (p.drift + Math.sin(t * 0.0005 + p.phase) * 2.5) * dt;
          if (p.y > h + 4) spawn(p, false);
          if (p.x < -4) p.x = w + 4;
          else if (p.x > w + 4) p.x = -4;
        }
        const depth = Math.min(1, Math.max(0, p.y / h));
        const flicker = 0.85 + 0.15 * Math.sin(t * 0.0012 + p.phase);
        const level = Math.round(
          Math.min(1, depth * 1.6 + 0.12) * p.base * flicker * LEVELS,
        );
        if (level <= 0) continue;
        if (level !== current) {
          current = level;
          ctx.fillStyle = palette[level];
        }
        ctx.fillRect(p.x | 0, p.y | 0, p.size, p.size);
      }
    };

    const frame = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      draw(dt, now);
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf || reduce.matches) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(
        MAX_POINTS,
        Math.round(((w * h) / AREA_PER_POINT) * density),
      );
      points = Array.from({ length: count }, () =>
        spawn({ x: 0, y: 0, z: 0, size: 1, vy: 0, drift: 0, phase: 0, base: 0 }, true),
      );
      draw(0, 0);
    };

    resize();
    start();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { rootMargin: "10% 0px" },
    );
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    const onMotion = () => {
      if (reduce.matches) {
        stop();
        draw(0, 0);
      } else {
        start();
      }
    };
    reduce.addEventListener("change", onMotion);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reduce.removeEventListener("change", onMotion);
    };
  }, [tone, alpha, density, speed]);

  return (
    <canvas
      ref={ref}
      className={`particles ${className}`.trim()}
      aria-hidden="true"
    />
  );
}
