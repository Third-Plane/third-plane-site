import { useEffect, useState } from 'react'
import { nav, site } from '../content'
import { Button, Logo } from './ui'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="nav" data-scrolled={scrolled} data-open={open}>
      <div className="container nav__inner">
        <a className="nav__brand" href="/" aria-label={`${site.name} home`}>
          <Logo className="nav__logo" />
        </a>

        <nav className="nav__links" aria-label="Main">
          {nav.links.map((item) => (
            <a key={item.href} className="nav__link" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav__cta">
          <Button small variant="dark" />
        </div>

        <button
          className="nav__toggle"
          type="button"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            {open ? (
              <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <path d="M3 7h16M3 15h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      <div className="nav__drawer" data-open={open}>
        <div className="container">
          {nav.links.map((item) => (
            <a className="nav__drawer-link" key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <Button variant="dark" />
        </div>
      </div>
    </header>
  )
}
