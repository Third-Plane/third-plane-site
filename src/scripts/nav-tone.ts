// PROTOTYPE (home page only): gives the pinned nav the tone of the band just
// below it, as `data-tone`, for that band's colours (index.css) and
// background (tailwind.css), so the nav reads as the top of the band. Where
// the nav isn't pinned it scrolls away with the hero, and keeps the hero's
// colours.

const pinnedNav = document.querySelector<HTMLElement>("[data-nav]");

if (pinnedNav && document.body.classList.contains("nav-tone")) {
  const bands = [...document.querySelectorAll<HTMLElement>("[data-band]")];
  let pinned = false;
  let frame = 0;

  const update = () => {
    frame = 0;
    const foot = pinnedNav.offsetHeight;
    const band = pinned
      ? bands.find((band) => {
          const { top, bottom } = band.getBoundingClientRect();
          return top < foot && bottom >= foot;
        })
      : undefined;
    if (band) pinnedNav.dataset.tone = band.dataset.band;
    else delete pinnedNav.dataset.tone;
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
