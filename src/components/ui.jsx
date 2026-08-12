import { site } from '../content'

export function Eyebrow({ children, dark = false }) {
  return <p className={dark ? 'eyebrow eyebrow--dark' : 'eyebrow'}>{children}</p>
}

export function HeroEyebrow({ children }) {
  return <Eyebrow>{children}</Eyebrow>
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

/* Problem card glyphs. Same 14 box, 1.4 stroke and round caps as ArrowRight, so
   the three read as one set: a round one, a jagged one, a square one. */
export function Clock({ className }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="5.3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7 4.3V7l2 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function BarsRising({ className }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 11.8V7.6M7 11.8V5M11 11.8V2.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Doc({ className }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="3.5" y="2" width="7" height="10" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5.4 5.4h3.2M5.4 8h1.9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function SectionHead({ eyebrow, title, body, dark = false, id }) {
  return (
    <header className="section-head" data-reveal>
      {eyebrow ? <Eyebrow dark={dark}>{eyebrow}</Eyebrow> : null}
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
