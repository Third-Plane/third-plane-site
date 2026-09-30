import type { CSSProperties, ReactNode } from "react";
import { site } from "../data/content";

type ButtonVariant = "primary" | "dark" | "light" | "ghost";

type ButtonProps = {
  children?: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  small?: boolean;
};

export function Button({
  children = site.ctaLabel,
  href = site.ctaHref,
  variant = "primary",
  small = false,
}: ButtonProps) {
  const className = ["btn", `btn--${variant}`, small ? "btn--sm" : ""].filter(Boolean).join(" ");

  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
}

export function AppLink({
  href,
  className,
  children,
  ...rest
}: {
  href: string;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
  "data-reveal"?: boolean;
  style?: CSSProperties;
}) {
  const external = href.startsWith("http");

  return (
    <a
      className={className}
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

export function SectionHead({
  title,
  body,
  align = "left",
}: {
  title: string;
  body?: string;
  align?: "left" | "center";
}) {
  return (
    <header className={`section-head section-head--${align}`} data-reveal>
      <h2 className="display-2">{title}</h2>
      {body ? <p className="lead">{body}</p> : null}
    </header>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
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
