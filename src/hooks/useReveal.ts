import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const CLASS = "reveal-ready";
const FALLBACK_MS = 1500;

export function useReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    const clear = () => root.classList.remove(CLASS);
    let observer: IntersectionObserver | undefined;
    let timeout: number | undefined;

    try {
      const nodes = document.querySelectorAll("[data-reveal]");
      if (!nodes.length || !("IntersectionObserver" in window)) {
        clear();
        return;
      }

      root.classList.add(CLASS);
      let seen = false;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            seen = true;
            entry.target.setAttribute("data-revealed", "true");
            observer?.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0 },
      );

      nodes.forEach((node) => observer?.observe(node));
      timeout = window.setTimeout(() => {
        if (!seen) clear();
      }, FALLBACK_MS);
    } catch {
      clear();
    }

    return () => {
      window.clearTimeout(timeout);
      observer?.disconnect();
      clear();
    };
  }, [pathname]);
}
