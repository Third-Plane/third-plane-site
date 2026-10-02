import type { CSSProperties } from "react";

// Joins class names, dropping falsy ones, and lets a later Tailwind class win
// over an earlier one it conflicts with. It knows Tailwind's own scale names
// (text-xl, rounded-2xl, ...), which is why the theme sticks to them.
export { cn } from "cnfast";

// Props for an element that fades in on scroll, `i` steps behind the first of
// its siblings.
export const reveal = (i: number) => ({
  "data-reveal": true,
  style: { "--i": i } as CSSProperties,
});
