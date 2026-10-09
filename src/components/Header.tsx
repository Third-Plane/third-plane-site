import { primaryNav, site } from "../data/content";
import { AppLink, Button } from "./Ui";
import { Logo } from "./Logo";
import { Section } from "./Section";
import { cn } from "../lib/style";

// The site's nav, over the top of the hero. Where the page can follow the
// scroll it is pinned over the page too, filling in as the page reaches it
// (nav-fill in tailwind.css) and taking the theme of the section under it
// (scripts/nav-theme.ts). Dropdowns from md up, a drawer below: scripts/nav.ts
// opens and closes them by setting `data-open`.
export function Header() {
  return (
    <Section
      as="header"
      theme="hero"
      className="group/nav absolute inset-x-0 top-0 z-40 overflow-visible border-b border-b-transparent p-0 transition-[border-color] duration-250 data-[open=true]:border-b-border/50 scroll-linked:fixed scroll-linked:nav-fill"
      data-open="false"
      data-nav
    >
      <div className="flex h-bar items-center justify-between gap-8 px-(--gutter)">
        {/* On a dark theme the white logo fades in over the purple one, which
            hides once it's in, so the logo never looks washed out. */}
        <AppLink className="grid items-center" href="/" aria-label={`${site.name} home`}>
          <Logo className="h-7 w-auto transition-opacity duration-0 [grid-area:1/1] group-data-[theme=deep]/nav:opacity-0 group-data-[theme=deep]/nav:delay-400 group-data-[theme=invert]/nav:opacity-0 group-data-[theme=invert]/nav:delay-400" />
          <Logo
            tone="white"
            className="h-7 w-auto opacity-0 transition-opacity duration-400 [grid-area:1/1] group-data-[theme=deep]/nav:opacity-100 group-data-[theme=invert]/nav:opacity-100"
          />
        </AppLink>

        <nav className="ml-auto flex gap-8 max-md:hidden" aria-label="Main" data-nav-links>
          {primaryNav.menus.map((menu) => (
            <div className="group/menu relative" data-open="false" data-menu key={menu.label}>
              <button
                className="inline-flex cursor-pointer items-center gap-2 bg-transparent p-0 text-base! font-bold! text-foreground transition-colors duration-200 [border:0] [font:inherit] hover:text-accent"
                type="button"
                aria-expanded="false"
                data-menu-btn
              >
                {menu.label}
              </button>
              {/* The ::before bridges the gap down to the panel, so the pointer
                  can cross it without the menu closing. */}
              <div
                className="absolute top-[calc(100%+0.9rem)] -left-3 hidden w-80 rounded-2xl border border-border/50 bg-card p-1 shadow-2xl group-data-[open=true]/menu:grid before:absolute before:inset-x-0 before:-top-4 before:h-4"
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
          data-nav-toggle
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

      {/* The drawer keeps the hero's theme, whatever section the nav is over,
          and fits the window under the nav, toolbars and all. It only shows
          the status notes, leaving the descriptions to the dropdowns. */}
      <div
        className="hidden max-h-[calc(100dvh-var(--nav-h))] overflow-y-auto border-t border-t-border/50 bg-background pt-2 pb-7 max-md:group-data-[open=true]/nav:block"
        data-theme="hero"
        data-nav-drawer
      >
        <div className="grid gap-1 px-(--gutter)">
          {primaryNav.menus.map((menu) => (
            <div key={menu.label}>
              <p className="pt-5 pb-1 text-sm font-medium tracking-widest text-subtle-foreground uppercase">
                {menu.label}
              </p>
              {menu.items.map((item) => (
                <AppLink
                  className="block border-b border-b-border/50 py-3.5 font-heading text-xl font-medium tracking-tight text-foreground aria-disabled:text-subtle-foreground"
                  href={item.href}
                  key={item.label}
                >
                  {item.label}
                  {item.live || !item.href ? (
                    <span
                      className={cn(
                        "ml-2.5 font-sans text-sm font-normal tracking-normal",
                        item.live ? "text-accent" : "text-subtle-foreground",
                      )}
                    >
                      {item.note}
                    </span>
                  ) : null}
                </AppLink>
              ))}
            </div>
          ))}
          <div className="mt-4 flex">
            <Button />
          </div>
        </div>
      </div>
    </Section>
  );
}
