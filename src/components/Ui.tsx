import type { CSSProperties, ReactNode } from "react";
import { site } from "../data/content";
import { cn } from "../lib/style";

type ButtonProps = {
  children?: ReactNode;
  href?: string;
  small?: boolean;
};

// primary is dark on a light theme and light on a dark one.
const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 rounded-full bg-primary font-sans font-medium whitespace-nowrap text-primary-foreground transition duration-200 hover:-translate-y-px hover:bg-primary/95 hover:shadow-lg hover:shadow-deep/20";

const BUTTON_SIZE = {
  regular: "px-6 py-4 text-base/none",
  small: "px-5 py-3 text-sm/none",
} as const;

export function Button({
  children = site.ctaLabel,
  href = site.ctaHref,
  small = false,
}: ButtonProps) {
  return (
    <a className={cn(BUTTON_BASE, BUTTON_SIZE[small ? "small" : "regular"])} href={href}>
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
