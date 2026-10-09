import type { ReactNode } from "react";
import { Header } from "./Header";
import { Section } from "./Section";

// A hero: see-through, over the page's flowchart (Base.astro), with a wash
// behind its copy (across the top where the copy stacks, down the copy column
// from lg up), the full width with the page's gutter, starting below the nav.
// From lg up it is at least 16:7, and taller where its content needs it, but
// never taller than the window, in the hero's theme. Vertical spacing is the
// caller's.
//
// The nav comes with it (see Header), pinned over the page as well as the hero.
export function Hero({ children }: { children?: ReactNode }) {
  return (
    <>
      <Header />
      <Section
        theme="hero"
        className="hero-veil-stacked lg:hero-veil grid items-center pt-(--nav-h) pb-0 lg:min-h-[min(43.75vw,100svh)]"
        id="top"
      >
        {children}
      </Section>
    </>
  );
}
