import { primaryNav, site } from "../data/content";
import { AppLink, Button } from "./Ui";
import { Logo } from "./Logo";
import { NavEntry } from "./NavEntry";

function Chevron() {
  return (
    <svg
      className="nav__chevron"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 3.5 5 6.5 8 3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// A disabled item has no page yet: it is shown, but not as a link.
type Item = { label: string; href?: string; note?: string; live?: boolean; disabled?: boolean };

function Note({ item }: { item: Item }) {
  if (!item.note) return null;
  return <span className={item.live ? "nav__note nav__note--live" : "nav__note"}>{item.note}</span>;
}

// The drawer is compact: it shows status notes (live, or no page yet) but
// leaves the descriptive ones to the dropdown.
const showDrawerNote = (item: Item) => item.live !== undefined || item.disabled || !item.href;

// Static markup. scripts/nav.ts opens and closes the menus by setting
// `data-open` on the elements below, which the stylesheet keys off.
export function Header() {
  return (
    <header className="nav" data-scrolled="false" data-open="false" data-nav>
      <div className="nav__inner wrap">
        <AppLink className="nav__brand" href="/" aria-label={`${site.name} home`}>
          <Logo className="nav__logo" />
        </AppLink>

        <nav className="nav__links" aria-label="Main">
          {primaryNav.menus.map((group) => (
            <div className="nav__menu" data-open="false" data-menu key={group.label}>
              <button
                className="nav__link nav__menu-btn"
                type="button"
                aria-expanded="false"
                data-menu-btn
              >
                {group.label}
                <Chevron />
              </button>
              <div className="nav__panel" role="menu">
                {(group.items as Item[]).map((item) => (
                  <NavEntry
                    className="nav__panel-item"
                    disabledClassName="nav__panel-item nav__panel-item--disabled"
                    href={item.href}
                    disabled={item.disabled}
                    key={item.label}
                  >
                    <span>{item.label}</span>
                    <Note item={item} />
                  </NavEntry>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="nav__cta">
          <Button small variant="dark" />
        </div>

        <button
          className="nav__toggle"
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          data-nav-toggle
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path
              className="nav__icon-open"
              d="M5 5l12 12M17 5L5 17"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              className="nav__icon-closed"
              d="M3 7h16M3 15h16"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="nav__drawer" data-open="false">
        <div className="wrap">
          {primaryNav.menus.map((group) => (
            <div key={group.label}>
              <p className="nav__drawer-group">{group.label}</p>
              {(group.items as Item[]).map((item) => (
                <NavEntry
                  className="nav__drawer-link"
                  disabledClassName="nav__drawer-link nav__drawer-link--disabled"
                  href={item.href}
                  disabled={item.disabled}
                  key={item.label}
                >
                  {item.label}
                  {showDrawerNote(item) ? <Note item={item} /> : null}
                </NavEntry>
              ))}
            </div>
          ))}
          <Button variant="dark" />
        </div>
      </div>
    </header>
  );
}
