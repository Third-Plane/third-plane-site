// PROTOTYPE (home page only, see the nav mask in tailwind.css): gives the pinned
// nav the tone of the band under the middle of it, as `data-tone` (see
// index.css). Where the nav isn't pinned it scrolls away with the hero, and
// keeps the hero's colours.

const pinnedNav = document.querySelector<HTMLElement>("[data-nav]");

if (pinnedNav && document.body.classList.contains("nav-mask")) {
  const bands = [...document.querySelectorAll<HTMLElement>("[data-band]")];
  let pinned = false;
  let frame = 0;

  const update = () => {
    frame = 0;
    const mid = pinnedNav.offsetHeight / 2;
    const band = pinned
      ? bands.find((band) => {
          const { top, bottom } = band.getBoundingClientRect();
          return top <= mid && bottom > mid;
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
