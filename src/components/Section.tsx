import type { ElementType, HTMLAttributes } from "react";
import { Display2, Lead } from "./Headings";
import { cn } from "../lib/style";

// A theme sets the colours of a section and everything in it (see index.css).
export type Theme = "hero" | "white" | "blend" | "deep" | "invert";

// A full-width stripe of the page, in a theme: the nav, the hero, the page's
// sections and the footer. The pinned nav takes the theme of the section just
// below it (scripts/nav-theme.ts), which finds them as <body>'s children, so a
// section must be one.
//
// A section has the page's gutter, and the bar's padding (see --bar), twice
// over above its content and once below. It is positioned, so it paints over
// the pinned hero (see Hero). `as` and `className` are for those that are laid
// out otherwise (the nav, the hero, the footer).
export function Section({
  as: Tag = "section",
  theme,
  className,
  ...props
}: HTMLAttributes<HTMLElement> & { as?: ElementType; theme: Theme }) {
  return (
    <Tag
      className={cn(
        "relative z-1 overflow-hidden px-(--gutter) pt-[calc(var(--bar)*2)] pb-(--bar)",
        className,
      )}
      data-theme={theme}
      {...props}
    />
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
