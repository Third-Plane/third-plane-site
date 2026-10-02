// Keeps a footer's reveal distance exact. The footer shows only its bottom bar
// until the end of the page, then opens over --footer-d (see footer-reveal in
// tailwind.css): its height less the bar, so the top of the footer rises in step
// with the page. The height changes with the viewport and the copy, so it is
// measured and kept up to date. The bar is the footer's last child.

const footer = document.querySelector<HTMLElement>("[data-footer-reveal]");

if (footer) {
  const bar = footer.lastElementChild as HTMLElement;
  const set = () => {
    document.documentElement.style.setProperty(
      "--footer-d",
      `${footer.offsetHeight - bar.offsetHeight}px`,
    );
  };
  new ResizeObserver(set).observe(footer);
  set();
}
