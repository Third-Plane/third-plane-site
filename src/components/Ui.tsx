import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { site } from "../data/content";

function toRoute(href: string) {
  if (!href.includes("#")) return href;
  const [pathname, hash] = href.split("#");
  return {
    pathname: pathname || "/",
    hash: `#${hash}`,
  };
}

export function Eyebrow({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <p className={dark ? "eyebrow eyebrow--dark" : "eyebrow"}>{children}</p>
  );
}

type ButtonVariant = "primary" | "dark" | "light" | "ghost";

type ButtonProps = {
  children?: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  small?: boolean;
};

export function Button({
  children = site.ctaLabel,
  href = site.mailto,
  variant = "primary",
  small = false,
}: ButtonProps) {
  const className = ["btn", `btn--${variant}`, small ? "btn--sm" : ""]
    .filter(Boolean)
    .join(" ");

  if (href.startsWith("mailto:")) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  }

  if (href.startsWith("http")) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link className={className} to={toRoute(href)}>
      {children}
    </Link>
  );
}

export function TextLink({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <Link className="textlink" to={toRoute(href)}>
      {children}
      <Arrow className="textlink__arrow" />
    </Link>
  );
}

export function AppLink({
  href,
  className,
  children,
  onClick,
  ...rest
}: {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  "aria-label"?: string;
}) {
  if (href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a className={className} href={href} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link className={className} to={toRoute(href)} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}

export function SectionHead({
  eyebrow,
  title,
  body,
  dark = false,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  dark?: boolean;
  align?: "left" | "center";
}) {
  return (
    <header className={`section-head section-head--${align}`} data-reveal>
      {eyebrow ? <Eyebrow dark={dark}>{eyebrow}</Eyebrow> : null}
      <h2 className="display-2">{title}</h2>
      {body ? <p className="lead">{body}</p> : null}
    </header>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 8h10M8.5 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Slash({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`slash ${className}`.trim()}
      viewBox="0 0 64 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 1l62 38"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

const COS30 = Math.cos(Math.PI / 6);
const SCALE = 30;
const project = (x: number, y: number, z: number) =>
  [
    ((x - y) * COS30 * SCALE).toFixed(1),
    ((x + y) * 0.5 * SCALE - z * SCALE).toFixed(1),
  ] as const;

const CUBE_EDGES: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 4],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],
];

type Box = {
  x: number;
  y: number;
  z: number;
  w: number;
  d: number;
  h: number;
  fill?: "top" | "east" | "south";
};

function projectBox({ x, y, z, w, d, h }: Box) {
  const points = [
    [x, y, z],
    [x + w, y, z],
    [x + w, y + d, z],
    [x, y + d, z],
    [x, y, z + h],
    [x + w, y, z + h],
    [x + w, y + d, z + h],
    [x, y + d, z + h],
  ].map(([px, py, pz]) => project(px, py, pz));

  return {
    edges: CUBE_EDGES.map(
      ([a, b]) => `M${points[a].join(" ")}L${points[b].join(" ")}`,
    ).join(""),
    points,
  };
}

const BOXES: Box[] = [
  { x: 0, y: 0, z: 0, w: 3, d: 3, h: 0.6 },
  { x: 3.6, y: 0.4, z: 0, w: 1, d: 1, h: 4.6, fill: "top" },
  { x: 0.5, y: 4.2, z: 0, w: 2, d: 1, h: 2.2 },
  { x: 5.2, y: 3.4, z: 0, w: 3, d: 2, h: 0.8, fill: "east" },
  { x: -3.2, y: 2.4, z: 0, w: 1, d: 2, h: 3, fill: "south" },
  { x: 2.6, y: -3.6, z: 0, w: 2, d: 2, h: 0.7 },
  { x: 7.4, y: -1.2, z: 0, w: 1, d: 1, h: 2.4 },
  { x: -1.4, y: 7.6, z: 0, w: 4, d: 1, h: 0.9 },
  { x: 6, y: 6.6, z: 0.8, w: 1, d: 3, h: 1 },
  { x: -4.6, y: -1.4, z: 0, w: 2, d: 1, h: 1.2 },
  { x: 9.2, y: 2.2, z: 0, w: 1.4, d: 1.4, h: 1.4 },
  { x: -5.4, y: 5.4, z: 0, w: 1, d: 1, h: 1 },
];

const AXES: Array<[[number, number, number], [number, number, number]]> = [
  [
    [-8, 2.2, 0],
    [12, 2.2, 0],
  ],
  [
    [3.6, -7, 0],
    [3.6, 11, 0],
  ],
  [
    [-7, 6.4, 0],
    [9, 6.4, 0],
  ],
  [
    [-2, -7, 0],
    [-2, 4, 0],
  ],
  [
    [8.4, -6, 0],
    [8.4, 9, 0],
  ],
];

function polygonPoints(
  points: Array<readonly [string, string]>,
  indexes: number[],
) {
  return indexes.map((index) => points[index].join(",")).join(" ");
}

const FACES = [
  { name: "south" as const, indexes: [2, 3, 7, 6] },
  { name: "east" as const, indexes: [1, 2, 6, 5] },
  { name: "top" as const, indexes: [4, 5, 6, 7] },
];

function BoxGraphic({
  box,
}: {
  box: Box & ReturnType<typeof projectBox>;
}) {
  const xs = box.points.map((point) => Number(point[0]));
  const ys = box.points.map((point) => Number(point[1]));
  const x = Math.min(...xs);
  const y = Math.min(...ys);

  return (
    <g className="network__box">
      <rect
        className="network__hit"
        fill="none"
        stroke="none"
        x={x - 10}
        y={y - 10}
        width={Math.max(...xs) - x + 20}
        height={Math.max(...ys) - y + 20}
      />
      {FACES.map((face) => (
        <polygon
          key={face.name}
          className={[
            "network__face",
            `network__face--${face.name}`,
            box.fill === face.name ? "is-filled" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          points={polygonPoints(box.points, face.indexes)}
        />
      ))}
      <path d={box.edges} />
    </g>
  );
}

export function Network({
  className = "",
  tint = "currentColor",
}: {
  className?: string;
  tint?: string;
}) {
  const boxes = BOXES.map((box) => ({ ...box, ...projectBox(box) }));
  const axes = AXES.map(
    ([a, b]) => `M${project(...a).join(" ")}L${project(...b).join(" ")}`,
  ).join("");

  return (
    <svg
      className={`network ${className}`.trim()}
      viewBox="-300 -230 640 460"
      fill="none"
      aria-hidden="true"
    >
      <g
        stroke={tint}
        strokeWidth="1.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path d={axes} opacity="0.55" />
        {boxes.map((box, i) => (
          <BoxGraphic key={i} box={box} />
        ))}
      </g>
    </svg>
  );
}

const MARKS: Record<
  | "context"
  | "authority"
  | "record"
  | "human"
  | "intake"
  | "process"
  | "output"
  | "portal"
  | "api"
  | "mail",
  Box[]
> = {
  context: [
    { x: -0.2, y: -0.15, z: 0, w: 3.5, d: 2.6, h: 0.32 },
    { x: 0.05, y: 0.05, z: 0.42, w: 3.15, d: 2.3, h: 0.32, fill: "top" },
    { x: 0.28, y: 0.22, z: 0.84, w: 2.8, d: 2, h: 0.32 },
    { x: 2.85, y: -0.55, z: 0, w: 0.7, d: 0.7, h: 1.55, fill: "east" },
  ],
  authority: [
    { x: 0, y: 0, z: 0, w: 3.2, d: 3.2, h: 0.36 },
    { x: 0, y: 0, z: 0.36, w: 0.38, d: 3.2, h: 2.15, fill: "south" },
    { x: 2.82, y: 0, z: 0.36, w: 0.38, d: 3.2, h: 2.15 },
    { x: 0.38, y: 2.82, z: 0.36, w: 2.44, d: 0.38, h: 1.45 },
    { x: 1, y: 0.9, z: 0.36, w: 1.2, d: 1.2, h: 1.2, fill: "top" },
  ],
  record: [
    { x: 0, y: 0, z: 0, w: 1, d: 1, h: 0.45 },
    { x: 1.25, y: 0, z: 0, w: 1, d: 1, h: 0.95, fill: "top" },
    { x: 2.5, y: 0, z: 0, w: 1, d: 1, h: 0.45 },
    { x: 0, y: 1.25, z: 0, w: 1, d: 1, h: 0.7 },
    { x: 1.25, y: 1.25, z: 0, w: 1, d: 1, h: 0.45 },
    { x: 2.5, y: 1.25, z: 0, w: 1, d: 1, h: 1.45, fill: "east" },
    { x: 0, y: 2.5, z: 0, w: 1, d: 1, h: 0.45 },
    { x: 1.25, y: 2.5, z: 0, w: 1, d: 1, h: 0.45 },
    { x: 2.5, y: 2.5, z: 0, w: 1, d: 1, h: 0.7 },
  ],
  human: [
    { x: 0, y: 0, z: 0, w: 3.6, d: 2.4, h: 0.38 },
    { x: 1.15, y: 0.55, z: 0.38, w: 1.2, d: 1.2, h: 2.05, fill: "top" },
    { x: -0.35, y: 2.55, z: 0, w: 0.7, d: 0.7, h: 0.7 },
    { x: 3.15, y: -0.45, z: 0, w: 0.65, d: 0.65, h: 0.95, fill: "east" },
  ],
  intake: [
    { x: 0, y: 0, z: 0, w: 3.6, d: 2.2, h: 0.36 },
    { x: 0.3, y: 0.35, z: 0.36, w: 1.4, d: 1.5, h: 1.65, fill: "top" },
    { x: 1.95, y: 0.3, z: 0.36, w: 1.3, d: 1.3, h: 0.85, fill: "east" },
  ],
  process: [
    { x: 0, y: 0, z: 0, w: 3.4, d: 2.4, h: 0.36 },
    { x: 0.25, y: 0.3, z: 0.36, w: 1.2, d: 1.8, h: 1.9, fill: "top" },
    { x: 1.7, y: 0.25, z: 0.36, w: 1.45, d: 1.1, h: 1.15, fill: "east" },
    { x: 1.85, y: 1.5, z: 0.36, w: 1.15, d: 0.7, h: 0.7 },
  ],
  output: [
    { x: 0, y: 0.1, z: 0, w: 2.4, d: 2.15, h: 0.32 },
    { x: 0.14, y: 0.24, z: 0.32, w: 2.12, d: 1.87, h: 0.32, fill: "top" },
    { x: 0.28, y: 0.38, z: 0.64, w: 1.84, d: 1.59, h: 0.32 },
    { x: 2.7, y: -0.15, z: 0, w: 1.15, d: 1.15, h: 1.85, fill: "east" },
  ],
  portal: [
    { x: 0, y: 0, z: 0, w: 3.3, d: 1.4, h: 0.32 },
    { x: 0.05, y: 0.15, z: 0.32, w: 0.4, d: 1.1, h: 2.15, fill: "south" },
    { x: 2.85, y: 0.15, z: 0.32, w: 0.4, d: 1.1, h: 2.15 },
    { x: 0.45, y: 0.2, z: 2.15, w: 2.4, d: 1, h: 0.32, fill: "top" },
    { x: 1.15, y: 0.35, z: 0.32, w: 1, d: 0.7, h: 1.15 },
  ],
  api: [
    { x: 0, y: 0.35, z: 0, w: 1.35, d: 1.35, h: 1.35, fill: "top" },
    { x: 2.35, y: 0, z: 0, w: 1.2, d: 1.2, h: 1.9, fill: "east" },
    { x: 1.2, y: 0.7, z: 0.5, w: 1.3, d: 0.38, h: 0.38 },
  ],
  mail: [
    { x: 0, y: 0, z: 0, w: 3.5, d: 2.15, h: 0.28 },
    { x: 0.18, y: 0.15, z: 0.28, w: 3.14, d: 1.85, h: 0.22, fill: "top" },
    { x: 2.55, y: -0.5, z: 0, w: 0.7, d: 0.7, h: 0.95, fill: "east" },
  ],
};

function boxesViewBox(boxes: Box[], pad = 24) {
  const pts = boxes.flatMap((box) => projectBox(box).points);
  const xs = pts.map((point) => Number(point[0]));
  const ys = pts.map((point) => Number(point[1]));
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  return `${minX} ${minY} ${Math.max(...xs) - minX + pad} ${Math.max(...ys) - minY + pad}`;
}

export function CardMark({
  name,
  variant = "default",
}: {
  name: keyof typeof MARKS;
  variant?: "default" | "wide";
}) {
  const boxes = MARKS[name].map((box) => ({ ...box, ...projectBox(box) }));
  const pad = variant === "wide" ? 10 : 24;

  return (
    <div className={`card__media card__media--${variant}`}>
      <svg
        className="card__mark"
        viewBox={boxesViewBox(MARKS[name], pad)}
        fill="none"
        aria-hidden="true"
      >
        <g
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          {boxes.map((box, i) => (
            <BoxGraphic key={i} box={box} />
          ))}
        </g>
      </svg>
    </div>
  );
}

type DotsDirection = "down" | "up" | "right" | "left";

export function Dots({
  className = "",
  id = "dots",
  direction = "down",
}: {
  className?: string;
  id?: string;
  direction?: DotsDirection;
}) {
  const [x1, y1, x2, y2] =
    direction === "down"
      ? [0, 0, 0, 1]
      : direction === "up"
        ? [0, 1, 0, 0]
        : direction === "right"
          ? [0, 0, 1, 0]
          : [1, 0, 0, 0];

  return (
    <svg
      className={`dots ${className}`.trim()}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id={`${id}-a`}
          width="9"
          height="9"
          patternUnits="userSpaceOnUse"
        >
          <rect width="1.6" height="1.6" fill="currentColor" />
        </pattern>
        <pattern
          id={`${id}-b`}
          width="14"
          height="14"
          patternUnits="userSpaceOnUse"
          patternTransform="translate(4 6)"
        >
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
  );
}
