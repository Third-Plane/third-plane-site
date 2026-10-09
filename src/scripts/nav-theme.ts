// Gives the pinned nav the theme of the section it reads as the top of. The
// sections are <body>'s children with a theme (see Section): of those there,
// the last, as a later one is painted over an earlier one (the page over the
// pinned hero). Where the nav isn't pinned it scrolls away with the hero, and
// keeps its own theme.
//
// It switches once a section's top edge is a nav's height above the window,
// halfway through the time the section's copy of the bar covers the nav (see
// nav-reveal in tailwind.css), so the switch is never seen, even a frame late.
// A section with no copy to cover it (the one starting under the nav, on a
// page with no hero) switches it as soon as it is under it. At the foot of the
// page the last section's edge may stop while its copy covers the nav, so
// there it switches it and puts the copy away (data-settled).

const pinnedNav = document.querySelector<HTMLElement>("[data-nav]");

if (pinnedNav) {
  const own = pinnedNav.dataset.theme;
  const sections = [...document.querySelectorAll<HTMLElement>("body > [data-theme]")]
    .filter((section) => section !== pinnedNav)
    .reverse();
  // The sections whose copy draws their edge through the nav: those that
  // have one, but the one just after the nav (see tailwind.css).
  const drawn = new Set(
    sections.filter(
      (section) =>
        section.querySelector(":scope > [data-nav-copy]") &&
        !section.previousElementSibling?.hasAttribute("data-nav"),
    ),
  );
  let pinned = false;
  let frame = 0;

  const update = () => {
    frame = 0;
    const foot = pinnedNav.offsetHeight;
    const end = scrollY + innerHeight >= document.documentElement.scrollHeight - 1;
    const section = pinned
      ? sections.find((section) => {
          const { top, bottom } = section.getBoundingClientRect();
          const line = end ? 1 : drawn.has(section) ? -foot : foot;
          return top < line && bottom >= line;
        })
      : undefined;
    for (const other of sections) other.toggleAttribute("data-settled", end && other === section);
    const theme = section?.dataset.theme ?? own;
    if (pinnedNav.dataset.theme === theme) return;
    // Switched with transitions off (see tailwind.css), or the colours would
    // still be fading, from hover's transitions, when the copy uncovers them.
    pinnedNav.dataset.switching = "";
    pinnedNav.dataset.theme = theme;
    void pinnedNav.offsetHeight;
    delete pinnedNav.dataset.switching;
  };

  // Asking the stylesheet keeps the breakpoint in one place.
  const measure = () => {
    pinned = getComputedStyle(pinnedNav).position === "fixed";
    update();
  };

  window.addEventListener("scroll", () => (frame ||= requestAnimationFrame(update)), {
    passive: true,
  });
  window.addEventListener("resize", measure);
  measure();
}
