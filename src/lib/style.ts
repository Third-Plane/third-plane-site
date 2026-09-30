import type { CSSProperties } from "react";

// Props for an element that fades in on scroll, `i` steps behind the first of
// its siblings.
export const reveal = (i: number) => ({
  "data-reveal": true,
  style: { "--i": i } as CSSProperties,
});
