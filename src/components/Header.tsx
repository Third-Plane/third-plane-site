import { useEffect, useRef, useState } from "react";
import { primaryNav, site } from "../data/content";
import { AppLink, Button } from "./Ui";
import { Logo } from "./Logo";

function Chevron() {
  return (
    <svg className="nav__chevron" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M2 3.5 5 6.5 8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { desks, links } = primaryNav;

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
      if (window.matchMedia("(min-width: 1021px)").matches) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!open && !menu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setMenu(false);
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open, menu]);

  const close = () => {
    setOpen(false);
    setMenu(false);
  };

  return (
    <header className="nav" data-scrolled={scrolled} data-open={open}>
      <div className="container nav__inner">
        <AppLink className="nav__brand" href="/" aria-label={`${site.name} home`}>
          <Logo className="nav__logo" />
        </AppLink>

        <nav className="nav__links" aria-label="Main">
          <div
            className="nav__menu"
            data-open={menu}
            ref={menuRef}
            onMouseEnter={() => setMenu(true)}
            onMouseLeave={() => setMenu(false)}
          >
            <button
              className="nav__link nav__menu-btn"
              type="button"
              aria-expanded={menu}
              onClick={() => setMenu((value) => !value)}
            >
              {desks.label}
              <Chevron />
            </button>
            <div className="nav__panel" role="menu">
              <div className="nav__panel-group">
                {desks.items.map((item) => (
                  <AppLink className="nav__panel-item" href={item.href} key={item.href} onClick={close}>
                    <span>{item.label}</span>
                    <span className={item.live ? "nav__note nav__note--live" : "nav__note"}>{item.note}</span>
                  </AppLink>
                ))}
              </div>
              <div className="nav__panel-group nav__panel-group--caps">
                <p className="nav__panel-label">{desks.capabilities.label}</p>
                {desks.capabilities.items.map((item) => (
                  <AppLink className="nav__panel-item nav__panel-item--cap" href={item.href} key={item.label} onClick={close}>
                    {item.label}
                  </AppLink>
                ))}
              </div>
            </div>
          </div>

          {links.map((link) => (
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
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            {open ? (
              <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <path d="M3 7h16M3 15h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      <div className="nav__drawer" data-open={open}>
        <div className="container">
          <p className="nav__drawer-group">{desks.label}</p>
          {desks.items.map((item) => (
            <AppLink className="nav__drawer-link" href={item.href} key={item.href} onClick={close}>
              {item.label}
              <span className={item.live ? "nav__note nav__note--live" : "nav__note"}>{item.note}</span>
            </AppLink>
          ))}
          <p className="nav__drawer-group">{desks.capabilities.label}</p>
          {desks.capabilities.items.map((item) => (
            <AppLink className="nav__drawer-link nav__drawer-link--sub" href={item.href} key={item.label} onClick={close}>
              {item.label}
            </AppLink>
          ))}
          <p className="nav__drawer-group">More</p>
          {links.map((link) => (
            <AppLink className="nav__drawer-link" href={link.href} key={link.href} onClick={close}>
              {link.label}
            </AppLink>
          ))}
          <Button variant="dark" />
        </div>
      </div>
    </header>
  );
}
