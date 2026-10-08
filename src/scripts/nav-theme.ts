// Gives the pinned nav the theme of the section just below it, so the nav
// reads as the top of it. The sections are <body>'s children with a theme
// (see Section): of those there, the last, as a later one is painted over an
// earlier one (the page over the pinned hero). Where the nav isn't pinned it
// scrolls away with the hero, and keeps its own theme.

const pinnedNav = document.querySelector<HTMLElement>("[data-nav]");

if (pinnedNav) {
  const own = pinnedNav.dataset.theme;
  const sections = [...document.querySelectorAll<HTMLElement>("body > [data-theme]")]
    .filter((section) => section !== pinnedNav)
    .reverse();
  let pinned = false;
  let frame = 0;

  const update = () => {
    frame = 0;
    const foot = pinnedNav.offsetHeight;
    const section = pinned
      ? sections.find((section) => {
          const { top, bottom } = section.getBoundingClientRect();
          return top < foot && bottom >= foot;
        })
      : undefined;
    pinnedNav.dataset.theme = section?.dataset.theme ?? own;
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
