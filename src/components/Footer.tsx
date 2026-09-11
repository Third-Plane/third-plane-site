import { site, siteFooter } from "../data/content";
import { Logo } from "./Logo";
import { AppLink } from "./Ui";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo tone="white" className="footer__logo" />
          <p className="footer__tagline">{siteFooter.tagline}</p>
          <p className="footer__location">{siteFooter.location}</p>
        </div>
        <div className="footer__columns">
          {siteFooter.columns.map((column) => (
            <nav className="footer__column" aria-label={column.label} key={column.label}>
              <p className="footer__label">{column.label}</p>
              {column.links.map((link) => (
                <AppLink href={link.href} key={link.label}>
                  {link.label}
                </AppLink>
              ))}
            </nav>
          ))}
        </div>
      </div>
      <div className="container footer__legal">
        <p>
          © {site.year} {site.name}
        </p>
        <p>thirdplane.com</p>
      </div>
    </footer>
  );
}
