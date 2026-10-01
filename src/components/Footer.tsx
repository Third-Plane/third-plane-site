import { site, siteFooter } from "../data/content";
import { Logo } from "./Logo";
import { NavEntry } from "./NavEntry";
import { AppLink } from "./Ui";

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

const iconLink = "inline-flex text-on-dark-faint transition-[color] duration-200 hover:text-pink";

export function Footer() {
  return (
    <footer className="bg-deep pt-[clamp(3rem,5vw,4.5rem)] pb-8 text-on-dark-muted">
      <div className="wrap flex items-start justify-between gap-8 border-b border-b-line-dark pb-10 max-lg:flex-col">
        <div>
          <Logo tone="white" className="h-8.5 w-auto" />
          <p className="mt-4 text-copy text-on-dark-muted">{siteFooter.tagline}</p>
          <p className="mt-[0.35rem] text-[0.9rem] text-on-dark-faint">{siteFooter.location}</p>
          <div className="mt-[0.85rem] flex items-center gap-3">
            <AppLink className={iconLink} href={site.linkedin} aria-label="Third Plane on LinkedIn">
              <LinkedInMark />
            </AppLink>
            <AppLink className={`${iconLink} text-[0.9rem]`} href={site.mailto}>
              {site.email}
            </AppLink>
          </div>
        </div>
        <div className="grid grid-cols-[repeat(3,minmax(0,auto))] gap-[clamp(2rem,5vw,5rem)] max-md:grid-cols-[1fr_1fr]">
          {siteFooter.columns.map((column) => (
            <nav
              className="grid content-start gap-[0.6rem] text-copy text-on-dark"
              aria-label={column.label}
              key={column.label}
            >
              <p className="mb-1 text-label font-medium tracking-eyebrow text-on-dark-faint uppercase">
                {column.label}
              </p>
              {column.links.map((link) => (
                <NavEntry
                  className="transition-[color] duration-200 hover:text-pink"
                  disabledClassName="text-on-dark-faint"
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
      <div className="wrap flex justify-between gap-4 pt-6 text-copy text-on-dark-faint max-sm:flex-col">
        <p>
          © {site.year} {site.name}
        </p>
        <p>thirdplane.com</p>
      </div>
    </footer>
  );
}
