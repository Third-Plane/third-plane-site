import { site } from '../content'

const BASE = import.meta.env.BASE_URL

export function Eyebrow({ children, dark = false }) {
  return <p className={dark ? 'eyebrow eyebrow--dark' : 'eyebrow'}>{children}</p>
}

export function Button({ children = site.ctaLabel, href = site.mailto, variant = 'primary', small = false }) {
  const cls = ['btn', `btn--${variant}`, small ? 'btn--sm' : ''].filter(Boolean).join(' ')
  return (
    <a className={cls} href={href}>
      {children}
    </a>
  )
}

export function TextLink({ children, href }) {
  return (
    <a className="textlink" href={href}>
      {children}
      <ArrowRight className="textlink__arrow" />
    </a>
  )
}

export function ArrowRight({ className }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.5 8h10M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SectionHead({ eyebrow, title, body, dark = false, align = 'left' }) {
  return (
    <header className={`section-head section-head--${align}`} data-reveal>
      {eyebrow ? <Eyebrow dark={dark}>{eyebrow}</Eyebrow> : null}
      <h2 className="display-2">{title}</h2>
      {body ? <p className="lead">{body}</p> : null}
    </header>
  )
}

/* Brand lockups, extracted from the identity deck. Purple on light surfaces,
   white on purple and dark purple. */
export function Logo({ tone = 'purple', className = '', mark = false }) {
  const file = mark ? `mark-${tone}.png` : `lockup-${tone}.png`
  return <img className={`logo ${className}`.trim()} src={`${BASE}brand/${file}`} alt="Third Plane" />
}

/* The identity's short diagonal accent: a single thin stroke that leans the
   way the mark's planes do. */
export function Slash({ className = '' }) {
  return (
    <svg className={`slash ${className}`.trim()} viewBox="0 0 64 40" fill="none" aria-hidden="true">
      <path d="M1 1l62 38" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

/* ---------------------------------------------------------------------------
   The Plane Network: isometric wireframe planes and volumes drawn from one
   deterministic composition. Stroke colour comes from `currentColor`, so the
   same drawing works on cream and on purple.
   --------------------------------------------------------------------------- */
const COS = Math.cos(Math.PI / 6)
const UNIT = 30

const iso = (x, y, z) => [((x - y) * COS * UNIT).toFixed(1), ((x + y) * 0.5 * UNIT - z * UNIT).toFixed(1)]

const EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
]

function boxPath({ x, y, z, w, d, h }) {
  const P = [
    [x, y, z], [x + w, y, z], [x + w, y + d, z], [x, y + d, z],
    [x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h],
  ].map((p) => iso(...p))
  return { edges: EDGES.map(([a, b]) => `M${P[a].join(' ')}L${P[b].join(' ')}`).join(''), P }
}

const face = (P, idx) => idx.map((i) => P[i].join(',')).join(' ')

// Grid-unit boxes. `fill` names a face to tint: top (4567), east (1256), south (2367).
const BOXES = [
  { x: 0, y: 0, z: 0, w: 3, d: 3, h: 0.6 },
  { x: 3.6, y: 0.4, z: 0, w: 1, d: 1, h: 4.6, fill: 'top' },
  { x: 0.5, y: 4.2, z: 0, w: 2, d: 1, h: 2.2 },
  { x: 5.2, y: 3.4, z: 0, w: 3, d: 2, h: 0.8, fill: 'east' },
  { x: -3.2, y: 2.4, z: 0, w: 1, d: 2, h: 3, fill: 'south' },
  { x: 2.6, y: -3.6, z: 0, w: 2, d: 2, h: 0.7 },
  { x: 7.4, y: -1.2, z: 0, w: 1, d: 1, h: 2.4 },
  { x: -1.4, y: 7.6, z: 0, w: 4, d: 1, h: 0.9 },
  { x: 6, y: 6.6, z: 0.8, w: 1, d: 3, h: 1 },
  { x: -4.6, y: -1.4, z: 0, w: 2, d: 1, h: 1.2 },
  { x: 9.2, y: 2.2, z: 0, w: 1.4, d: 1.4, h: 1.4 },
  { x: -5.4, y: 5.4, z: 0, w: 1, d: 1, h: 1 },
]

// Long rails along the isometric axes, the way the identity extends planes
// off the edge of the frame.
const RAILS = [
  [[-8, 2.2, 0], [12, 2.2, 0]],
  [[3.6, -7, 0], [3.6, 11, 0]],
  [[-7, 6.4, 0], [9, 6.4, 0]],
  [[-2, -7, 0], [-2, 4, 0]],
  [[8.4, -6, 0], [8.4, 9, 0]],
]

export function PlaneNetwork({ className = '', tint = 'currentColor' }) {
  const boxes = BOXES.map((b) => ({ ...b, ...boxPath(b) }))
  const rails = RAILS.map(([a, b]) => `M${iso(...a).join(' ')}L${iso(...b).join(' ')}`).join('')
  return (
    <svg className={`network ${className}`.trim()} viewBox="-300 -230 640 460" fill="none" aria-hidden="true">
      <g stroke={tint} strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round">
        <path d={rails} opacity="0.55" />
        {boxes.map((b, i) => (
          <path key={i} d={b.edges} />
        ))}
      </g>
      <g fill={tint}>
        {boxes
          .filter((b) => b.fill)
          .map((b, i) => (
            <polygon
              key={i}
              points={face(b.P, b.fill === 'top' ? [4, 5, 6, 7] : b.fill === 'east' ? [1, 2, 6, 5] : [2, 3, 7, 6])}
              opacity={b.fill === 'top' ? 0.42 : 0.18}
            />
          ))}
      </g>
    </svg>
  )
}

/* ---------------------------------------------------------------------------
   The Intelligence Field: a field of points that changes density. Two offset
   square patterns under a gradient mask read as a grain that thickens toward
   one edge, which is how the identity uses it: atmosphere, not data.
   --------------------------------------------------------------------------- */
export function DotField({ className = '', id = 'dots', direction = 'down' }) {
  const [x1, y1, x2, y2] = direction === 'down' ? [0, 0, 0, 1] : direction === 'up' ? [0, 1, 0, 0] : direction === 'right' ? [0, 0, 1, 0] : [1, 0, 0, 0]
  return (
    <svg className={`dots ${className}`.trim()} aria-hidden="true" preserveAspectRatio="none">
      <defs>
        <pattern id={`${id}-a`} width="9" height="9" patternUnits="userSpaceOnUse">
          <rect width="1.6" height="1.6" fill="currentColor" />
        </pattern>
        <pattern id={`${id}-b`} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="translate(4 6)">
          <rect width="1.6" height="1.6" fill="currentColor" />
        </pattern>
        <linearGradient id={`${id}-g`} x1={x1} y1={y1} x2={x2} y2={y2}>
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id={`${id}-m`}>
          <rect width="100%" height="100%" fill={`url(#${id}-g)`} />
        </mask>
      </defs>
      <g mask={`url(#${id}-m)`}>
        <rect width="100%" height="100%" fill={`url(#${id}-a)`} />
        <rect width="100%" height="100%" fill={`url(#${id}-b)`} />
      </g>
    </svg>
  )
}
