import type { CSSProperties, ReactNode } from "react";
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

  if (href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a className={className} href={href}>
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
  "data-reveal"?: boolean;
  style?: CSSProperties;
}) {
  if (href.startsWith("http")) {
    return (
      <a
        className={className}
        href={href}
        onClick={onClick}
        target="_blank"
        rel="noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }

  if (href.startsWith("mailto:")) {
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
