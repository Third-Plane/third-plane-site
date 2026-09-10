import { footer, site } from "../data/content";
import { Logo } from "./Logo";
import { AppLink } from "./Ui";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo tone="white" className="footer__logo" />
          <p className="footer__tagline">{footer.tagline}</p>
        </div>
        <nav className="footer__links" aria-label="Footer">
          {footer.links.map((link) => (
            <AppLink href={link.href} key={link.label}>
              {link.label}
            </AppLink>
          ))}
        </nav>
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
