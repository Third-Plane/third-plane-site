import { site } from '../content'

export function Pill({ children, dark = false, outline = false }) {
  const variant = dark ? ' pill--dark' : outline ? ' pill--outline' : ''
  return (
    <span className={`pill${variant}`}>
      <i className="pill__dot" aria-hidden="true" />
      {children}
    </span>
  )
}

export function HeroEyebrow({ children }) {
  return <p className="hero__eyebrow">{children}</p>
}

export function Button({ children = site.ctaLabel, small = false, href = site.mailto }) {
  return (
    <a className={small ? 'btn btn--sm' : 'btn'} href={href}>
      {children}
      <ArrowRight className="btn__arrow" />
    </a>
  )
}

export function ArrowRight({ className }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7h9M7.5 3.5 11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SectionHead({ eyebrow, title, body, dark = false, outline = false, id }) {
  return (
    <header className="section-head" data-reveal>
      <Pill dark={dark} outline={outline}>
        {eyebrow}
      </Pill>
      <h2 className="display-2" id={id}>
        {title}
      </h2>
      {body && <p className="lead">{body}</p>}
    </header>
  )
}

export function Mark({ className }) {
  return (
    <svg className={className} width="21" height="14" viewBox="0 0 21 14" fill="none" aria-hidden="true">
      <g transform="skewX(-24)">
        <rect x="6.4" y="0.6" width="14.2" height="3" fill="var(--mark-coral)" />
        <rect x="6.4" y="5.1" width="14.2" height="3" fill="var(--mark-teal)" />
        <rect x="6.4" y="9.6" width="14.2" height="3" fill="var(--mark-deep)" />
      </g>
    </svg>
  )
}
