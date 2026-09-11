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

type Item = { label: string; href: string; note?: string; live?: boolean };

function Note({ item }: { item: Item }) {
  if (!item.note) return null;
  return <span className={item.live ? "nav__note nav__note--live" : "nav__note"}>{item.note}</span>;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

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
        setMenu(null);
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setMenu(null);
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
    setMenu(null);
  };

  return (
    <header className="nav" data-scrolled={scrolled} data-open={open}>
      <div className="container nav__inner">
        <AppLink className="nav__brand" href="/" aria-label={`${site.name} home`}>
          <Logo className="nav__logo" />
        </AppLink>

        <nav className="nav__links" aria-label="Main" ref={navRef}>
          {primaryNav.menus.map((group) => {
            const isOpen = menu === group.label;
            return (
              <div
                className="nav__menu"
                data-open={isOpen}
                key={group.label}
                onMouseEnter={() => setMenu(group.label)}
                onMouseLeave={() => setMenu((current) => (current === group.label ? null : current))}
              >
                <button
                  className="nav__link nav__menu-btn"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setMenu(isOpen ? null : group.label)}
                >
                  {group.label}
                  <Chevron />
                </button>
                <div className="nav__panel" role="menu">
                  {(group.items as Item[]).map((item) => (
                    <AppLink className="nav__panel-item" href={item.href} key={item.href} onClick={close}>
                      <span>{item.label}</span>
                      <Note item={item} />
                    </AppLink>
                  ))}
                </div>
              </div>
            );
          })}
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
          {primaryNav.menus.map((group) => (
            <div key={group.label}>
              <p className="nav__drawer-group">{group.label}</p>
              {(group.items as Item[]).map((item) => (
                <AppLink className="nav__drawer-link" href={item.href} key={item.href} onClick={close}>
                  {item.label}
                  {item.live !== undefined ? <Note item={item} /> : null}
                </AppLink>
              ))}
            </div>
          ))}
          <Button variant="dark" />
        </div>
      </div>
    </header>
  );
}
