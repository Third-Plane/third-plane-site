import { site } from '../content'

export function Pill({ children, dark = false }) {
  return <span className={dark ? 'pill pill--dark' : 'pill'}>{children}</span>
}

export function Button({ children = site.ctaLabel, small = false, href = site.mailto }) {
  return (
    <a className={small ? 'btn btn--sm' : 'btn'} href={href}>
      {children}
      <ArrowRight className="btn__arrow" />
    </a>
  )
}

export function SectionHead({ eyebrow, title, titleLines, body, dark = false, id }) {
  return (
    <header className="section-head" data-reveal>
      <Pill dark={dark}>{eyebrow}</Pill>
      <h2 className="display-2" id={id}>
        {titleLines
          ? titleLines.map((line) => <span key={line} style={{ display: 'block' }}>{line}</span>)
          : title}
      </h2>
      {body && <p className="lead">{body}</p>}
    </header>
  )
}

export function ArrowRight({ className }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7h9M7.5 3.5 11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Cross() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
      <path d="M1.5 1.5l8 8M9.5 1.5l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function Check() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M1.5 6.4 4.3 9.2 10.5 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Mark({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1.5 14.5 13H1.5L8 1.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M8 6.5 11.2 12H4.8L8 6.5Z" fill="currentColor" />
    </svg>
  )
}
