import type { ElementType, HTMLAttributes } from "react";
import { Display2, Lead } from "./Headings";
import { NavCopy } from "./NavBar";
import type { Theme } from "./theme";
import { cn } from "../lib/style";

// A theme's layer: its background, painted on a layer of its own behind the
// section's content, so it can blend with or filter what lies behind the
// section (the page's flowchart) without touching the content.
// invert's filter has to be on a layer: an element with a backdrop filter is a
// backdrop root, and a backdrop filter inside it only sees what is painted
// within it, so a frosted card in the section (see Cta) would blur nothing.
// The hero has none: its wash is the page's backdrop (see Base), and the nav,
// a hero section too, must not have one (see the nav in tailwind.css).
//
// A theme's blur is a layer of its own, over its colour. Where a layer runs
// under the nav, Chrome's backdrop filter takes the nav in too, though the
// nav is painted over it, and a blur spreads it past the nav's foot. Blurred
// in with the colour, the nav came out inverted (a light band over the
// footer) or multiplied; blurred on its own, over the section's colour, it is
// the nav's colour, which is the section's near enough, so it blurs in unseen.
const layers: Partial<Record<Theme, { color: string; blur?: string }>> = {
  white: { color: "bg-background" },
  blend: { color: "bg-linear-to-b/srgb from-blue to-pink" },
  deep: { color: "bg-background mix-blend-multiply", blur: "backdrop-blur-xs" },
  invert: { color: "backdrop-invert", blur: "backdrop-blur-sm" },
};

// A full-width stripe of the page, in a theme: the nav, the hero, the page's
// sections and the footer. The pinned nav takes the theme of the section just
// below it (scripts/nav-theme.ts), which finds them by data-section.
//
// A section has the page's gutter, and the bar's padding (see --bar), twice
// over above its content and once below. `as` and `className` are for those
// that are laid out otherwise (the nav, the hero, the footer).
//
// A section makes no stacking context of its own (no z-index, isolation,
// opacity, transform...), or its layer would blend with and filter nothing
// but the section. The section, its layer and the content after it
// (positioned, see index.css) join the page's stacking order instead.
//
// Each section but the hero's carries a copy of the nav's bar in its theme
// (NavCopy), and is the timeline that reveals it (nav-timeline in
// tailwind.css). The copy is pinned to the window, so the section must not
// hold fixed elements either (no transform, filter, contain...).
export function Section({
  as: Tag = "section",
  theme,
  className,
  children,
  ...props
}: HTMLAttributes<HTMLElement> & { as?: ElementType; theme: Theme }) {
  const layer = layers[theme];
  const copy = theme !== "hero";
  return (
    <Tag
      className={cn(
        "relative overflow-clip px-(--gutter) pt-[calc(var(--bar)*2)] pb-(--bar)",
        copy && "scroll-linked:nav-timeline",
        className,
      )}
      data-theme={theme}
      data-section
      {...props}
    >
      {layer ? (
        <div
          className={cn("pointer-events-none absolute inset-0", layer.color)}
          aria-hidden="true"
          data-layer
        />
      ) : null}
      {layer?.blur ? (
        <div
          className={cn("pointer-events-none absolute inset-0", layer.blur)}
          aria-hidden="true"
        />
      ) : null}
      {copy ? <NavCopy theme={theme} /> : null}
      {children}
    </Tag>
  );
}

// A section's heading and optional lead, above its content in the column.
export function SectionHeader({ title, body }: { title: string; body?: string }) {
  return (
    <header className="wrap mb-13">
      <Display2>{title}</Display2>
      {body ? <Lead className="mt-5 max-w-[62ch]">{body}</Lead> : null}
    </header>
  );
}
