// A theme sets the colours of a section and everything in it (see index.css).
//
// A new theme needs its colours in index.css (logo-white among them), its
// layer in Section (any blur on a layer of its own), and its colour at a
// section's top edge (--edge in tailwind.css), for the nav and the fringe.
export type Theme = "hero" | "white" | "blend" | "deep" | "invert";
