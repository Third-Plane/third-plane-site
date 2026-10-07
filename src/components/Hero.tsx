import type { ReactNode } from "react";
import { Header } from "./Header";
import { cn } from "../lib/style";

// Pinned from lg up, where scroll-driven animation is available (see the
// scroll-linked variant in tailwind.css): the hero stays where it is, no
// taller than the window, and the page slides up over it as it scrolls (what
// follows it is positioned, so it paints on top) while the hero fades away
// (hero-cover). A sticky element is held inside its container, so the hero
// has to sit directly under <body> (Base's `hero` slot), or it would be pushed
// off where its container ends.
const PINNED =
  "lg:scroll-linked:sticky lg:scroll-linked:top-0 lg:scroll-linked:max-h-svh lg:scroll-linked:hero-cover";

// A hero: see-through, over the page's flowchart (Base.astro), with a wash
// behind its copy (across the top where the copy stacks, down the copy column
// from lg up), the full width with the page's gutter, starting below the nav.
// From lg up it is at least 16:7, and taller where its content needs it, but
// never taller than the window. The section is the hero's surface (see
// index.css). Vertical spacing is the caller's.
//
// The nav comes with it (see Header), pinned over the page as well as the hero.
export function Hero({ children }: { children?: ReactNode }) {
  return (
    <>
      <Header />
      <section
        className={cn(
          "surface-hero hero-veil-stacked lg:hero-veil relative overflow-hidden px-(--gutter) pt-(--nav-h) lg:min-h-[min(43.75vw,100svh)]",
          PINNED,
        )}
        id="top"
        data-hero
      >
        {children}
      </section>
    </>
  );
}
