import { primaryNav, site } from "../data/content";
import { AppLink, Button } from "./Ui";
import { Logo } from "./Logo";
import type { Theme } from "./theme";
import { cn } from "../lib/style";

// The nav's bar: the logo, the dropdowns, the button and the drawer's toggle.
// It is the nav's own (see Header) and each section's copy of it (NavCopy).
// It takes its colours from the theme around it. A copy is only ever seen, so
// it leaves out the dropdowns' panels and the hooks scripts/nav.ts finds the
// bar's controls by.
export function NavBar({ copy = false }: { copy?: boolean }) {
  const hook = copy ? undefined : true;
  return (
    <div className="flex h-bar items-center justify-between gap-8 px-(--gutter)">
      {/* The white logo on a dark theme, the purple one otherwise (see
          logo-white in index.css). */}
      <AppLink className="grid items-center" href="/" aria-label={`${site.name} home`}>
        <Logo className="h-7 w-auto opacity-[calc(1-var(--logo-white))] [grid-area:1/1]" />
        <Logo tone="white" className="h-7 w-auto opacity-(--logo-white) [grid-area:1/1]" />
      </AppLink>

      <nav className="ml-auto flex gap-8 max-md:hidden" aria-label="Main" data-nav-links={hook}>
        {primaryNav.menus.map((menu) => (
          <div className="group/menu relative" data-open="false" data-menu={hook} key={menu.label}>
            <button
              className="inline-flex cursor-pointer items-center gap-2 bg-transparent p-0 text-base! font-bold! text-foreground transition-colors duration-200 [border:0] [font:inherit] hover:text-accent"
              type="button"
              aria-expanded="false"
              data-menu-btn={hook}
            >
              {menu.label}
            </button>
            {/* The panel hangs from the nav's foot, not into the nav, where a
                section's copy of the bar would cover it (NavCopy). The menu is
                centred in the bar, so that is half its height and the rest of
                the nav's below its middle. The ::before bridges the gap down
                to it, so the pointer can cross it without the menu closing. */}
            {copy ? null : (
              <div
                className="absolute top-[calc(50%+var(--nav-h)-var(--bar)/2)] -left-3 hidden w-80 rounded-2xl border border-border/50 bg-card p-1 shadow-2xl group-data-[open=true]/menu:grid before:absolute before:inset-x-0 before:-top-6 before:h-6"
                role="menu"
                data-theme="white"
                data-nav-panel
              >
                {menu.items.map((item) => (
                  <AppLink
                    className="grid gap-0.5 rounded-xl px-3 py-2.5 text-base font-medium text-foreground transition-colors duration-150 not-aria-disabled:hover:bg-muted aria-disabled:cursor-default aria-disabled:text-subtle-foreground"
                    href={item.href}
                    key={item.label}
                  >
                    <span>{item.label}</span>
                    {item.note ? (
                      <span
                        className={cn(
                          "text-sm font-normal",
                          item.live ? "text-accent" : "text-subtle-foreground",
                        )}
                      >
                        {item.note}
                      </span>
                    ) : null}
                  </AppLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="max-md:hidden">
        <Button small />
      </div>

      <button
        className="-mr-2 hidden cursor-pointer bg-transparent p-2 text-foreground [border:0] max-md:inline-flex"
        type="button"
        aria-expanded="false"
        aria-label="Toggle navigation"
        data-nav-toggle={hook}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path className="hidden group-data-[open=true]/nav:inline" d="M5 5l12 12M17 5L5 17" />
          <path className="group-data-[open=true]/nav:hidden" d="M3 7h16M3 15h16" />
        </svg>
      </button>
    </div>
  );
}

// A section's copy of the nav's bar, in the section's theme, pinned over the
// nav (see the nav in tailwind.css). As the section's top edge rises through
// the nav it is revealed from the nav's foot up, the edge drawn through it,
// so the section reads as sliding in under the nav (nav-reveal). It is only
// shown while the edge crosses the nav and a little after, so it hides the
// nav's own hover and focus only then.
export function NavCopy({ theme }: { theme: Theme }) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-40 hidden h-(--nav-h) scroll-linked:block scroll-linked:nav-reveal"
      data-theme={theme}
      data-nav-copy
      aria-hidden="true"
      inert
    >
      <NavBar copy />
    </div>
  );
}
