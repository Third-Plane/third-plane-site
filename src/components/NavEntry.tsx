import type { ReactNode } from "react";
import { AppLink } from "./Ui";

// A menu or footer entry. One with no page yet (`disabled`, or no `href`) is
// shown, but not as a link.
export function NavEntry({
  href,
  disabled,
  className,
  disabledClassName,
  onClick,
  children,
}: {
  href?: string;
  disabled?: boolean;
  className?: string;
  disabledClassName: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  if (disabled || !href) {
    return (
      <span className={disabledClassName} aria-disabled="true">
        {children}
      </span>
    );
  }

  return (
    <AppLink className={className} href={href} onClick={onClick}>
      {children}
    </AppLink>
  );
}
