// The site moves between pages without reloading (the ClientRouter in
// Base.astro), so a script runs once and sets each page up as it is shown:
// on the first load and after every navigation. The signal aborts as the page
// is swapped out, to take down what the setup put on the window or document,
// or anything else that outlives the page's own markup.
export function onPage(setup: (signal: AbortSignal) => void) {
  document.addEventListener("astro:page-load", () => {
    const page = new AbortController();
    document.addEventListener("astro:before-swap", () => page.abort(), { once: true });
    setup(page.signal);
  });
}
