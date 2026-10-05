import { cn } from "../lib/style";

// A one-bit halftone of an image, drawn live so a background doesn't need a
// pre-rendered screen. It matches Dotraster's AM Screening with a circle dot
// on a benday layout at 72 dpi, inverted (white dots on black): `lpi` sets the
// screen, 72 / lpi image pixels between dots, or CSS pixels when `fixed` so the
// dots keep their size at any width. The canvas covers its positioned parent
// the way object-cover object-center would, so it lines up with an <img> of
// the same source. With `shine` it draws only the dots under a light that
// follows the mouse over the parent, `radius` CSS pixels in radius; layer it
// over a plain one with the same screen. Static markup: scripts/halftone.ts
// paints it.
export function Halftone({
  src,
  lpi = 12,
  fixed = false,
  shine = false,
  radius = 360,
  className,
}: {
  src: string;
  lpi?: number;
  fixed?: boolean;
  shine?: boolean;
  radius?: number;
  className?: string;
}) {
  return (
    <canvas
      className={cn("pointer-events-none absolute inset-0 size-full", className)}
      aria-hidden="true"
      data-halftone
      data-src={src}
      data-lpi={lpi}
      data-fixed={fixed || undefined}
      data-shine={shine || undefined}
      data-radius={shine ? radius : undefined}
    />
  );
}
