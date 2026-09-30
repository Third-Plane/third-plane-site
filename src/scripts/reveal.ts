// Fades [data-reveal] elements in as they scroll into view. The inline script
// in the head sets `reveal-ready` before first paint; if nothing is seen
// within a moment (or IntersectionObserver is missing), the class is removed
// so the content is never left hidden.

const CLASS = "reveal-ready";
const FALLBACK_MS = 1500;
const root = document.documentElement;
const clear = () => root.classList.remove(CLASS);

try {
  const nodes = document.querySelectorAll("[data-reveal]");
  if (!nodes.length || !("IntersectionObserver" in window)) {
    clear();
  } else {
    root.classList.add(CLASS);
    let seen = false;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          seen = true;
          entry.target.setAttribute("data-revealed", "true");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    window.setTimeout(() => {
      if (!seen) clear();
    }, FALLBACK_MS);
  }
} catch {
  clear();
}
