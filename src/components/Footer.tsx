import { site, siteFooter } from "../data/content";
import { Logo } from "./Logo";
import { NavEntry } from "./NavEntry";
import { AppLink } from "./Ui";
import { cn } from "../lib/style";

function LinkedInMark() {
  return (
    <svg className="size-4.5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

const iconLink =
  "inline-flex text-subtle-foreground transition-colors duration-200 hover:text-accent";

// From lg up, where scroll-driven animation is available (see the scroll-linked
// variant in tailwind.css), the footer is the inverse of the hero: pinned to the
// bottom of the window, square along its bottom edge and flush with it, showing
// only its bottom bar until the page is scrolled to the end, which reveals the
// rest. Anywhere else it is an ordinary rounded card at the end of the page.
const PINNED =
  "lg:scroll-linked:sticky lg:scroll-linked:bottom-0 lg:scroll-linked:z-40 lg:scroll-linked:mb-0 lg:scroll-linked:rounded-b-none lg:scroll-linked:footer-reveal";

export function Footer() {
  return (
    <footer
      className={cn("surface-deep mx-3 mb-3 rounded-xl px-(--gutter)", PINNED)}
      data-footer-reveal
    >
      <div className="flex justify-between gap-16 py-16 max-lg:flex-col">
        <div>
          <Logo tone="white" className="h-8.5 w-auto" />
          <p className="mt-4 text-base text-muted-foreground">{siteFooter.tagline}</p>
        </div>
        <div className="grid max-w-2xl flex-1 gap-12 sm:grid-cols-3">
          {siteFooter.columns.map((column) => (
            <nav
              className="grid content-start gap-2.5 text-base text-foreground"
              aria-label={column.label}
              key={column.label}
            >
              <p className="mb-1 text-sm font-medium tracking-widest text-subtle-foreground uppercase">
                {column.label}
              </p>
              {column.links.map((link) => (
                <NavEntry
                  className="transition-colors duration-200 hover:text-accent"
                  disabledClassName="text-subtle-foreground"
                  href={link.href}
                  disabled={link.disabled}
                  key={link.label}
                >
                  {link.label}
                </NavEntry>
              ))}
            </nav>
          ))}
        </div>
      </div>
      <div className="flex h-19 items-center justify-between gap-4 text-sm text-subtle-foreground max-sm:flex-col">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p>{siteFooter.location}</p>
          <AppLink className={iconLink} href={site.linkedin} aria-label="Third Plane on LinkedIn">
            <LinkedInMark />
          </AppLink>
          <AppLink className={iconLink} href={site.mailto}>
            {site.email}
          </AppLink>
        </div>
        <p>
          © {site.year} {site.name}
        </p>
      </div>
    </footer>
  );
}
