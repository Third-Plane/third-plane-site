// A theme sets the colours of a section and everything in it (see index.css).
//
// A new theme needs its colours in index.css (logo-white among them), its
// layer in Section (any blur on a layer of its own), and the nav's colour on
// it (--nav-bg, with the nav in tailwind.css).
export type Theme = "hero" | "white" | "blend" | "deep" | "invert";
