import type { CSSProperties, ReactNode } from "react";
import { site } from "../data/content";
import { Display2, Lead } from "./Headings";

type ButtonVariant = "primary" | "dark" | "light" | "ghost";

type ButtonProps = {
  children?: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  small?: boolean;
  className?: string;
};

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 rounded-pill font-sans leading-none font-medium whitespace-nowrap transition-[background,color,translate,box-shadow] duration-200 hover:-translate-y-px";

const BUTTON_SIZE = {
  regular: "px-[1.6rem] py-[0.95rem] text-[0.975rem]",
  small: "px-[1.2rem] py-[0.7rem] text-[0.9rem]",
} as const;

const BUTTON_VARIANT: Record<ButtonVariant, string> = {
  primary: "bg-purple text-white hover:bg-purple-hover",
  dark: "bg-deep text-white hover:bg-deep-2 hover:shadow-[0_10px_24px_#2d1f5738]",
  light: "bg-white text-deep hover:bg-cream",
  ghost:
    "bg-transparent text-deep inset-ring-[1.5px] inset-ring-line hover:text-purple hover:inset-ring-purple",
};

export function Button({
  children = site.ctaLabel,
  href = site.ctaHref,
  variant = "primary",
  small = false,
  className: extra,
}: ButtonProps) {
  const className = [
    BUTTON_BASE,
    BUTTON_SIZE[small ? "small" : "regular"],
    BUTTON_VARIANT[variant],
    extra,
  ]
    .filter(Boolean)
    .join(" ");

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
  dark = false,
  compact = false,
}: {
  title: string;
  body?: string;
  align?: "left" | "center";
  dark?: boolean;
  compact?: boolean;
}) {
  const center = align === "center";
  const margin = compact ? "mb-[clamp(1.75rem,3vw,2.5rem)]" : "mb-[clamp(2.5rem,5vw,4rem)]";
  return (
    <header
      className={`max-w-190 ${margin} ${center ? "mx-auto text-center" : ""}`.trim()}
      data-reveal
    >
      <Display2 tone={dark ? "dark" : "light"}>{title}</Display2>
      {body ? (
        <Lead
          tone={dark ? "dark" : "purple"}
          className={`mt-5 max-w-[62ch] ${center ? "mx-auto" : ""}`.trim()}
        >
          {body}
        </Lead>
      ) : null}
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
