import { primaryNav } from "../data/content";
import { AppLink, Button } from "./Ui";
import { NavBar } from "./NavBar";
import { Section } from "./Section";
import { cn } from "../lib/style";

// The site's nav, over the top of the hero. Where the page can follow the
// scroll it is pinned over the page too, filling in as the page reaches it
// (nav-fill in tailwind.css) and taking the theme of the section under it
// (scripts/nav-theme.ts), while each section's copy of its bar draws the
// section's edge through it (NavCopy). Dropdowns from md up, a drawer below:
// scripts/nav.ts opens and closes them by setting `data-open`.
export function Header() {
  return (
    <Section
      as="header"
      theme="hero"
      className="group/nav absolute inset-x-0 top-0 z-40 overflow-visible border-b border-b-transparent p-0 transition-[border-color] duration-250 data-[open=true]:border-b-border/50 scroll-linked:fixed scroll-linked:nav-fill"
      data-open="false"
      data-nav
    >
      <NavBar />

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
