import { useEffect, useState } from 'react'
import { nav, site } from '../content'
import { Button, Mark } from './ui'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="nav" data-scrolled={scrolled}>
      <div className="container">
        <div className="nav__inner">
          <a className="nav__brand" href="#top">
            <Mark className="nav__mark" />
            {site.wordmark}
          </a>

          <nav className="nav__links" aria-label="Main">
            {nav.map((item) => (
              <a key={item.href} className="nav__link" href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <Button small />

          <button
            className="nav__toggle"
            type="button"
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              {open ? (
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <path d="M3 6h14M3 13h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        <div className="nav__drawer" data-open={open}>
          {nav.map((item) => (
            <a
              className="nav__drawer-link"
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <Button />
        </div>
      </div>
    </header>
  )
}
