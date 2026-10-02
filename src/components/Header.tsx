import { primaryNav, site } from "../data/content";
import { AppLink, Button } from "./Ui";
import { Logo } from "./Logo";
import { NavEntry } from "./NavEntry";

// The header's colours, by where it sits. light: on the page, a sticky bar.
// hero: inside the hero band, transparent and in the flow of the hero. Each part
// is listed whole so Tailwind can see it. `column` is the width of the bar and
// the drawer: the page-width column, or (in the hero) the full width, with the
// same gutter as the hero's content.
type Tone = "light" | "hero";

const TONE = {
  light: {
    column: "wrap",
    bar: "sticky top-0 z-50 border-b border-b-transparent bg-[color-mix(in_srgb,var(--lavender)_82%,transparent)] backdrop-blur-[14px] transition-[border-color] duration-250 data-[open=true]:border-b-line-soft data-[scrolled=true]:border-b-line-soft",
    logo: "purple",
    menuButton: "text-ink hover:text-purple",
    toggle: "text-ink",
    drawer:
      "max-lg:data-[open=true]:border-t max-lg:data-[open=true]:border-t-line-soft max-lg:data-[open=true]:pt-2 max-lg:data-[open=true]:pb-7",
    drawerLabel: "text-ink-muted",
    drawerLink: "border-b-line-soft text-ink",
    drawerLinkOff: "border-b-line-soft text-ink-muted",
    noteLive: "text-purple",
    noteQuiet: "text-ink-muted",
    button: "dark",
  },
  hero: {
    column: "px-(--gutter)",
    bar: "relative z-50 border-b border-b-transparent transition-[border-color] duration-250 data-[open=true]:border-b-line-soft",
    logo: "purple",
    menuButton: "text-ink hover:text-purple",
    toggle: "text-ink",
    drawer:
      "max-lg:data-[open=true]:border-t max-lg:data-[open=true]:border-t-line-soft max-lg:data-[open=true]:bg-lavender max-lg:data-[open=true]:pt-2 max-lg:data-[open=true]:pb-7",
    drawerLabel: "text-ink-muted",
    drawerLink: "border-b-line-soft text-ink",
    drawerLinkOff: "border-b-line-soft text-ink-muted",
    noteLive: "text-purple",
    noteQuiet: "text-ink-muted",
    button: "dark",
  },
} as const;

// A disabled item has no page yet: it is shown, but not as a link.
type Item = { label: string; href?: string; note?: string; live?: boolean; disabled?: boolean };

// The dropdown is a white card in either tone, so only the drawer's notes
// follow the header's tone.
function Note({
  item,
  inDrawer = false,
  tone = "light",
}: {
  item: Item;
  inDrawer?: boolean;
  tone?: Tone;
}) {
  if (!item.note) return null;
  const colours = TONE[inDrawer ? tone : "light"];
  const color = item.live ? colours.noteLive : colours.noteQuiet;
  const size = inDrawer ? "ml-[0.6rem] font-sans tracking-normal" : "";
  return <span className={`text-copy font-normal ${color} ${size}`.trim()}>{item.note}</span>;
}

const panelItem = "grid gap-[0.15rem] rounded-sm px-3 py-[0.7rem] text-[0.95rem] font-medium";
const drawerLink =
  "block border-b py-[0.85rem] font-heading text-[1.35rem] font-medium tracking-head";

// The drawer is compact: it shows status notes (live, or no page yet) but
// leaves the descriptive ones to the dropdown.
const showDrawerNote = (item: Item) => item.live !== undefined || item.disabled || !item.href;

// Static markup. scripts/nav.ts opens and closes the menus by setting
// `data-open` on the elements below; the `group-data-[open=true]` and
// `data-[open=true]` classes react to it.
export function Header({ tone = "light" }: { tone?: Tone }) {
  const c = TONE[tone];
  return (
    <header className={`group/nav ${c.bar}`} data-scrolled="false" data-open="false" data-nav>
      <div className={`${c.column} flex h-[76px] items-center justify-between gap-8`}>
        <AppLink className="inline-flex items-center" href="/" aria-label={`${site.name} home`}>
          <Logo tone={c.logo} className="h-8.5 w-auto" />
        </AppLink>

        <nav className="ml-auto flex gap-8 max-lg:hidden" aria-label="Main" data-nav-links>
          {primaryNav.menus.map((group) => (
            <div className="group/menu relative" data-open="false" data-menu key={group.label}>
              <button
                className={`inline-flex cursor-pointer items-center gap-2 bg-transparent p-0 text-xl! font-bold! transition-[color] duration-200 [border:0] [font:inherit] ${c.menuButton}`}
                type="button"
                aria-expanded="false"
                data-menu-btn
              >
                {group.label}
              </button>
              <div
                className="absolute top-[calc(100%_+_0.9rem)] -left-3 hidden w-[320px] gap-[0.15rem] rounded-card border border-line-soft bg-white p-[0.6rem] shadow-lg group-data-[open=true]/menu:grid before:absolute before:inset-x-0 before:-top-4 before:h-4 before:content-['']"
                role="menu"
                data-nav-panel
              >
                {(group.items as Item[]).map((item) => (
                  <NavEntry
                    className={`${panelItem} text-ink transition-[background] duration-150 hover:bg-cream`}
                    disabledClassName={`${panelItem} cursor-default text-ink-muted`}
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
          <Button small variant={c.button} />
        </div>

        <button
          className={`-mr-2 hidden cursor-pointer bg-transparent p-2 [border:0] max-lg:inline-flex ${c.toggle}`}
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
        className={`hidden max-lg:data-[open=true]:block max-lg:data-[open=true]:max-h-[calc(100vh_-_76px)] max-lg:data-[open=true]:overflow-y-auto ${c.drawer}`}
        data-open="false"
        data-nav-drawer
      >
        <div className={`${c.column} grid gap-1`}>
          {primaryNav.menus.map((group) => (
            <div key={group.label}>
              <p
                className={`pt-5 pb-1 text-label font-medium tracking-eyebrow uppercase ${c.drawerLabel}`}
              >
                {group.label}
              </p>
              {(group.items as Item[]).map((item) => (
                <NavEntry
                  className={`${drawerLink} ${c.drawerLink}`}
                  disabledClassName={`${drawerLink} ${c.drawerLinkOff}`}
                  href={item.href}
                  disabled={item.disabled}
                  key={item.label}
                >
                  {item.label}
                  {showDrawerNote(item) ? <Note item={item} inDrawer tone={tone} /> : null}
                </NavEntry>
              ))}
            </div>
          ))}
          <Button variant={c.button} className="mt-4 justify-self-start" />
        </div>
      </div>
    </header>
  );
}
