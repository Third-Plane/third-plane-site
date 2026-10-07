// Keeps a pinned hero's scroll distance exact. The page slides up over the hero
// until its top edge meets the nav, over --hero-d (see nav-fill in
// tailwind.css): the hero's height less the nav's. The height changes with the
// viewport and the copy, so it is measured and kept up to date.

const hero = document.querySelector<HTMLElement>("[data-hero]");

if (hero) {
  const set = () => {
    const nav = parseFloat(getComputedStyle(hero).getPropertyValue("--nav-h"));
    document.documentElement.style.setProperty("--hero-d", `${hero.offsetHeight - nav}px`);
  };
  new ResizeObserver(set).observe(hero);
  set();
}
