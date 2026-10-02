import type { ReactNode } from "react";
import { Header } from "./Header";
import { ParticleField } from "./ParticleField";

// Sticky from lg up, where scroll-driven animation is available (see the
// scroll-linked variant in tailwind.css): the hero stays pinned and its band
// closes down to the nav as the page scrolls. A sticky element is held inside
// its container, so this hero has to sit directly under <body> (Base's `hero`
// slot), not in <main>, or it would be pushed off where <main> ends.
// It pins flush with the top of the window; its top corners square off as it
// does (hero-pin, over the m-3 margin it starts inset by).
const PINNED =
  "lg:scroll-linked:sticky lg:scroll-linked:top-0 lg:scroll-linked:z-40 lg:scroll-linked:hero-pin";
const COLLAPSING = "lg:scroll-linked:hero-collapse";
// A pinned hero can't be taller than the window, less its 12px margin (m-3; a
// safe bound, top and bottom): where the page ends, the browser pushes up a
// sticky box that doesn't fit. So the band stops at that height, and anything
// below it is cut off.
const CAPPED = "lg:scroll-linked:max-h-[calc(100svh-1.5rem)]";

// A hero band: the lavender wash with the particle field behind its content.
//
// The hero carries its own nav, on top. Unlike a Section there is no page-width
// column: `children` run the full width of the band, above the particles and
// below the nav (which they leave room for). Padding is the caller's, so
// content can sit where it likes.
//
// The nav sits outside the band that collapses, so its menus and the mobile
// drawer are never clipped; the band (particles and children) is what closes
// down to a strip as wide as the nav.
//
// The section keeps its full height while the band closes (only the band is
// clipped), so the section itself ignores the pointer: left alone it would sit
// over the page below and swallow its clicks. The nav and the content that
// wants the pointer take it back.
export function Hero({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <section
      className={`pointer-events-none relative z-2 m-3 mt-0 overflow-hidden ${PINNED} ${className}`.trim()}
      id={id}
      data-hero-collapse
    >
      <div className="pointer-events-auto absolute inset-x-0 top-0 z-10">
        <Header tone="hero" />
      </div>
      <div
        className={`relative overflow-hidden rounded-b-(--hero-radius) bg-hero ${CAPPED} ${COLLAPSING}`}
      >
        <ParticleField mask="hero" tone="purple" alpha={0.9} />
        <div className="relative z-2 pt-(--nav-h)">{children}</div>
      </div>
    </section>
  );
}
