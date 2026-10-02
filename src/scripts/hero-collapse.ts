// Keeps a collapsing hero's scroll distance exact. The hero closes down to its
// nav strip over --hero-d (see hero-collapse in tailwind.css): its height less
// the strip, so the foot of the hero rises in step with the page. The height
// changes with the viewport and the copy, so it is measured and kept up to date.

const hero = document.querySelector<HTMLElement>("[data-hero-collapse]");

if (hero) {
  const set = () => {
    const strip = parseFloat(getComputedStyle(hero).getPropertyValue("--nav-h"));
    document.documentElement.style.setProperty("--hero-d", `${hero.offsetHeight - strip}px`);
  };
  new ResizeObserver(set).observe(hero);
  set();
}
