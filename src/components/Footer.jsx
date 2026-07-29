import { site } from '../content'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="mono">
          © {site.year} {site.name}
        </p>
      </div>
    </footer>
  )
}
