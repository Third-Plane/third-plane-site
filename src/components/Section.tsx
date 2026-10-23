import { type ElementType, type HTMLAttributes } from "react";
import { NavCopy } from "./NavBar";
import type { Theme } from "./theme";
import { cn } from "../lib/style";

type Layer = Record<Theme, { className: string; copyNav?: boolean; fringe?: boolean }>;

const layers: Layer = {
  hero: { className: "hero-veil-stacked lg:hero-veil" },
  white: { className: "bg-background", copyNav: true, fringe: true },
  blend: {
    className: "bg-linear-to-b/srgb from-blue to-pink",
    copyNav: true,
    fringe: true,
  },
  deep: {
    className: "backdrop-blur-xs bg-background mix-blend-multiply",
    copyNav: true,
  },
  invert: { className: "backdrop-blur-sm backdrop-invert", copyNav: true },
};

// A full-width stripe of the page, in a theme: the hero, the page's sections
// and the footer. The pinned nav takes the theme of the section just below it
// (scripts/nav-theme.ts), which finds them by data-section.
//
// A section has the page's gutter, and the bar's height (see --spacing-bar)
// twice over above and below its content, so the hero's copy starts clear
// of the nav. `as` and `className` are for those that are laid out otherwise
// (the footer).
//
// A section makes no stacking context of its own (no z-index, isolation,
// opacity, transform...), or its layer would blend with and filter nothing
// but the section. The section, its layer and the content after it
// (positioned, see index.css) join the page's stacking order instead.
//
// A light section stands a fringe on its top edge, a fade of the flowchart's
// shades in its edge colour (see fringe in tailwind.css), in the bottom
// padding of the section above, unless that one is dark. It's positioned, after the section
// above, so it paints over that one's layer; a section doesn't clip its
// overflow, for it.
//
// Each section but the hero's carries a copy of the nav's bar in its theme
// (NavCopy), and is the timeline that reveals it (nav-timeline in
// tailwind.css). The copy is pinned to the window, so the section must not
// hold fixed elements either (no transform, filter, contain...).

type SectionProps = HTMLAttributes<HTMLElement> & { as?: ElementType; theme: Theme };

export function Section({
  as: Tag = "section",
  theme,
  className,
  children,
  ...props
}: SectionProps) {
  const layer = layers[theme];
  return (
    <Tag
      className={cn(
        "py-[calc(var(--spacing-bar)*2)] relative",
        layer.copyNav && "scroll-linked:nav-timeline",
        className,
      )}
      data-theme={theme}
      data-section
      {...props}
    >
      <div
        className={cn("pointer-events-none absolute inset-0", layer.className)}
        aria-hidden="true"
        data-layer
      />
      {layer.fringe && (
        <>
          <div
            className="pointer-events-none absolute inset-x-0 top-px h-px bg-accent/10"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-full fringe"
            aria-hidden="true"
          />
        </>
      )}
      {layer.copyNav && <NavCopy theme={theme} />}
      {children}
    </Tag>
  );
}

export function SectionHeader({ children }: HTMLAttributes<HTMLElement>) {
  return (
    <header className="relative mx-auto mb-(--gutter) max-w-(--page) px-(--gutter)">
      <div className="absolute inset-x-0 top-9.75 h-px bg-accent/5" />
      <div className="relative space-y-6">{children}</div>
    </header>
  );
}

export function SectionContent({
  className,
  border = true,
  ...props
}: HTMLAttributes<HTMLElement> & { border?: boolean }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-30 mx-auto max-w-(--page) border-x border-accent/10 max-page:hidden" />
      <div
        className={cn(
          "mx-auto max-w-(--page) px-(--gutter) pt-(--gutter) relative z-25",
          border && "border-t border-accent/10",
          className,
        )}
        {...props}
      />
    </>
  );
}
