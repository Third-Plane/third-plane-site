import type { ReactNode } from "react";
import { Header } from "./Header";
import { cn } from "../lib/style";

// Pinned from lg up, where scroll-driven animation is available (see the
// scroll-linked variant in tailwind.css): the hero stays where it is and the
// page slides up over it as it scrolls (what follows it is positioned, so it
// paints on top). A sticky element is held inside its container, so this hero
// has to sit directly under <body> (Base's `hero` slot), or it would be pushed
// off where its container ends. It sits flush with the top of the window and
// is pinned from the first pixel.
const PINNED = "lg:scroll-linked:sticky lg:scroll-linked:top-0";
// The nav is pinned over everything from lg up (elsewhere it scrolls away with
// the hero). Its fill comes in as the page slides up to it (see nav-fill).
const NAV_PINNED = "lg:scroll-linked:fixed";
const NAV_FILL = "opacity-0 lg:scroll-linked:nav-fill";
// The wash that keeps the copy legible over the page's flowchart.
const VEIL = "hero-veil-stacked lg:hero-veil";
// A pinned hero can't be taller than the window: where the page ends, the
// browser pushes up a sticky box that doesn't fit, and below the window its
// foot would never be seen. So the band stops at the window's height, and
// anything below it is cut off.
const CAPPED = "lg:scroll-linked:max-h-svh";
// From lg up the band is at least 16:7, and taller where its content needs
// it. The floor is a min-height from the hero's width (the section is a size
// container), not an aspect-ratio: the band clips its overflow, which turns
// off aspect-ratio's growing to fit, so content would be cut off instead. It
// never asks for more than the window allows a pinned hero (see CAPPED): a
// min-height would win over that cap.
const SHAPED = "lg:min-h-[min(calc(100cqw*7/16),100svh)]";

// The hero's content leaves in tiers as the page covers it, the lowest first
// (see hero-leave in tailwind.css). Each tier's slice of that distance, as
// fractions of it: they overlap, and all finish before the page's rising edge
// reaches the tier above. A tier's shift is how far it drops as it fades.
const LEAVE = {
  actions: "lg:scroll-linked:hero-leave [--leave-from:0] [--leave-to:0.3] [--leave-shift:2.5rem]",
  lead: "lg:scroll-linked:hero-leave [--leave-from:0.15] [--leave-to:0.45] [--leave-shift:2.5rem]",
  heading: "lg:scroll-linked:hero-leave [--leave-from:0.3] [--leave-to:0.6] [--leave-shift:2.5rem]",
} as const;

// A wrapper that carries a tier's animation. It sits around, not on, the
// content: the scroll-into-view reveal owns the content's own opacity.
export function Leave({ tier, children }: { tier: keyof typeof LEAVE; children: ReactNode }) {
  return <div className={LEAVE[tier]}>{children}</div>;
}

// The space around a hero's content, below the nav.
export const HERO_PADDING = "pt-20 pb-22";

// A hero band: see-through, over the page's flowchart (Base.astro), with a
// wash behind its copy. The section is the hero's surface (see index.css).
//
// The hero carries its own nav, which sits outside the band, on top of the
// page as well as the hero, and takes the hero's colours. Unlike a Section
// there is no page-width column: `children` run the full width of the band,
// below the nav (which they leave room for). Padding is the caller's, so
// content can sit where it likes.
export function Hero({ children }: { children?: ReactNode }) {
  return (
    <>
      <div className={cn("surface-hero absolute inset-x-0 top-0 z-40", NAV_PINNED)}>
        <div
          className={cn("absolute inset-0 bg-hero shadow-xl shadow-deep/10", NAV_FILL)}
          aria-hidden="true"
        />
        <Header />
      </div>
      <section className={cn("surface-hero @container relative", PINNED)} id="top" data-hero>
        <div className={cn("relative overflow-hidden", VEIL, SHAPED, CAPPED)}>
          <div className="pt-(--nav-h)">{children}</div>
        </div>
      </section>
    </>
  );
}
