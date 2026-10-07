import { primaryNav, site } from "../data/content";
import { AppLink, Button } from "./Ui";
import { Logo } from "./Logo";
import { NavEntry } from "./NavEntry";
import { cn } from "../lib/style";

// A disabled item has no page yet: it is shown, but not as a link.
type Item = { label: string; href?: string; note?: string; live?: boolean; disabled?: boolean };

function Note({ item, inDrawer = false }: { item: Item; inDrawer?: boolean }) {
  if (!item.note) return null;
  const tone = item.live ? "text-accent" : "text-subtle-foreground";
  return (
    <span
      className={cn("text-base font-normal", tone, inDrawer && "ml-2.5 font-sans tracking-normal")}
    >
      {item.note}
    </span>
  );
}

const panelItem = "grid gap-0.5 px-3 py-3 text-base font-medium";
const drawerLink =
  "block border-b border-b-border/50 py-3.5 font-heading text-xl font-medium tracking-tight";

// The drawer is compact: it shows status notes (live, or no page yet) but
// leaves the descriptive ones to the dropdown.
const showDrawerNote = (item: Item) => item.live !== undefined || item.disabled || !item.href;

// The nav of the hero (see Hero): the full width with the same gutter as the
// hero's content, over the top of it in the hero's colours. From lg up it is
// pinned over the page too, see-through over the hero and filling in as the
// page slides up to it (nav-fill in tailwind.css), then taking the tone of
// the band below it (scripts/nav-tone.ts); elsewhere it scrolls away with the
// hero. Only its border colour is a transition: its fill follows the scroll.
// Static markup.
// scripts/nav.ts opens and closes the menus by setting `data-open` on the
// elements below; the `group-data-[open=true]` and `data-[open=true]` classes
// react to it.
export function Header() {
  return (
    <header
      className="group/nav surface-hero absolute inset-x-0 top-0 z-40 border-b border-b-transparent transition-[border-color] duration-250 data-[open=true]:border-b-border/50 lg:scroll-linked:fixed lg:scroll-linked:nav-fill"
      data-open="false"
      data-nav
    >
      <div className="flex h-19 items-center justify-between gap-8 px-(--gutter)">
        {/* Both lockups, stacked: the white one fades in over the purple one
            over a dark band (see scripts/nav-tone.ts). The purple one only goes
            once the white is whole, and is back before it starts to go, so the
            two are never both part-faded, which would wash the logo out. */}
        <AppLink className="grid items-center" href="/" aria-label={`${site.name} home`}>
          <Logo
            className={cn(
              "h-8.5 w-auto transition-opacity duration-0 [grid-area:1/1]",
              "group-data-[tone=deep]/nav:opacity-0 group-data-[tone=deep]/nav:delay-400",
              "group-data-[tone=invert]/nav:opacity-0 group-data-[tone=invert]/nav:delay-400",
            )}
          />
          <Logo
            tone="white"
            className={cn(
              "h-8.5 w-auto opacity-0 transition-opacity duration-400 [grid-area:1/1]",
              "group-data-[tone=deep]/nav:opacity-100 group-data-[tone=invert]/nav:opacity-100",
            )}
          />
        </AppLink>

        <nav className="ml-auto flex gap-8 max-lg:hidden" aria-label="Main" data-nav-links>
          {primaryNav.menus.map((group) => (
            <div className="group/menu relative" data-open="false" data-menu key={group.label}>
              <button
                className="inline-flex cursor-pointer items-center gap-2 bg-transparent p-0 text-base! font-bold! text-foreground transition-colors duration-200 [border:0] [font:inherit] hover:text-accent"
                type="button"
                aria-expanded="false"
                data-menu-btn
              >
                {group.label}
              </button>
              <div
                className="surface-white absolute top-[calc(100%+0.9rem)] -left-3 hidden w-80 gap-0.5 rounded-2xl border border-border/50 bg-card p-2.5 shadow-2xl group-data-[open=true]/menu:grid before:absolute before:inset-x-0 before:-top-4 before:h-4 before:content-['']"
                role="menu"
                data-nav-panel
              >
                {(group.items as Item[]).map((item) => (
                  <NavEntry
                    className={cn(
                      panelItem,
                      "text-foreground transition-colors duration-150 hover:bg-muted",
                    )}
                    disabledClassName={cn(panelItem, "cursor-default text-subtle-foreground")}
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

        <div className="max-lg:hidden">
          <Button small />
        </div>

        <button
          className="-mr-2 hidden cursor-pointer bg-transparent p-2 text-foreground [border:0] max-lg:inline-flex"
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          data-nav-toggle
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path
              className="hidden group-data-[open=true]/nav:inline"
              d="M5 5l12 12M17 5L5 17"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              className="group-data-[open=true]/nav:hidden"
              d="M3 7h16M3 15h16"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div
        className="hidden max-lg:data-[open=true]:block max-lg:data-[open=true]:max-h-[calc(100vh-76px)] max-lg:data-[open=true]:overflow-y-auto max-lg:data-[open=true]:border-t max-lg:data-[open=true]:border-t-border/50 max-lg:data-[open=true]:bg-background max-lg:data-[open=true]:pt-2 max-lg:data-[open=true]:pb-7"
        data-open="false"
        data-nav-drawer
      >
        <div className="grid gap-1 px-(--gutter)">
          {primaryNav.menus.map((group) => (
            <div key={group.label}>
              <p className="pt-5 pb-1 text-sm font-medium tracking-widest text-subtle-foreground uppercase">
                {group.label}
              </p>
              {(group.items as Item[]).map((item) => (
                <NavEntry
                  className={cn(drawerLink, "text-foreground")}
                  disabledClassName={cn(drawerLink, "text-subtle-foreground")}
                  href={item.href}
                  disabled={item.disabled}
                  key={item.label}
                >
                  {item.label}
                  {showDrawerNote(item) ? <Note item={item} inDrawer /> : null}
                </NavEntry>
              ))}
            </div>
          ))}
          <div className="mt-4 flex">
            <Button />
          </div>
        </div>
      </div>
    </header>
  );
}
