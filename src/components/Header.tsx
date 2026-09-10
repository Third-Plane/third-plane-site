import { useEffect, useState } from "react";
import { nav, site } from "../data/content";
import { AppLink, Button } from "./Ui";
import { Logo } from "./Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 1021px)").matches) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="nav" data-scrolled={scrolled} data-open={open}>
      <div className="container nav__inner">
        <AppLink
          className="nav__brand"
          href="/"
          aria-label={`${site.name} home`}
        >
          <Logo className="nav__logo" />
        </AppLink>
        <nav className="nav__links" aria-label="Main">
          {nav.links.map((link) => (
            <AppLink className="nav__link" href={link.href} key={link.href}>
              {link.label}
            </AppLink>
          ))}
        </nav>
        <div className="nav__cta">
          <Button small variant="dark" />
        </div>
        <button
          className="nav__toggle"
          type="button"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            aria-hidden="true"
          >
            {open ? (
              <path
                d="M5 5l12 12M17 5L5 17"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 7h16M3 15h16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>
      <div className="nav__drawer" data-open={open}>
        <div className="container">
          {nav.links.map((link) => (
            <AppLink
              className="nav__drawer-link"
              href={link.href}
              key={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </AppLink>
          ))}
          <Button variant="dark" />
        </div>
      </div>
    </header>
  );
}
