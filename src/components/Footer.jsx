import { footer, site } from '../content'
import { Logo } from './ui'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo tone="white" className="footer__logo" />
          <p className="footer__tagline">{footer.tagline}</p>
        </div>
        <nav className="footer__links" aria-label="Footer">
          {footer.links.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
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
  )
}
