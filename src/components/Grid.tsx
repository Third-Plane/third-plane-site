import { Children, type CSSProperties, type ReactNode } from "react";
import { cn } from "../lib/style";
import { AppLink, Arrow } from "./Ui";

// Columns from md for two (four shows two at md), from lg for three.
const COLUMNS = {
  2: "md:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
} as const;

// A grid of items (Card, OutlineCard, Point).
export function Grid({
  columns = 2,
  className,
  children,
}: {
  columns?: 2 | 3 | 4;
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("grid gap-5", COLUMNS[columns], className)}>{children}</div>;
}

type ItemProps = {
  href?: string;
  className?: string;
  children: ReactNode;
  "data-reveal"?: boolean;
  style?: CSSProperties;
};

// An item of a Grid. It spans one grid row per part it renders (a CardMark, a
// title, a body) as a subgrid, so the same part lines up across a row of items
// even when one title wraps. Its gap-y is its own, between its parts. With an
// `href` it is a link (give its ItemTitle the `arrow`).
function Item({ href, className, style, children, ...rest }: ItemProps) {
  const props = {
    ...rest,
    className: cn("grid row-span-(--parts) grid-rows-subgrid", href && "group", className),
    style: { ...style, "--parts": Children.toArray(children).length } as CSSProperties,
    children,
  };
  return href ? <AppLink href={href} {...props} /> : <article {...props} />;
}

// A raised tile.
export function Card({ className, ...props }: ItemProps) {
  return (
    <Item
      className={cn(
        "gap-y-5 rounded-2xl bg-card p-7 shadow-lg transition duration-250 hover:-translate-y-0.5 hover:shadow-2xl",
        className,
      )}
      {...props}
    />
  );
}

// A flat, bordered tile.
export function OutlineCard({ className, ...props }: ItemProps) {
  return (
    <Item
      className={cn("gap-y-5 rounded-2xl border border-border bg-card p-7", className)}
      {...props}
    />
  );
}

// Open text under a rule.
export function Point({ className, ...props }: ItemProps) {
  return (
    <Item
      className={cn(
        "gap-y-3 border-t border-border pt-6 transition-colors duration-200 hover:border-accent",
        className,
      )}
      {...props}
    />
  );
}

export function ItemTitle({ arrow = false, children }: { arrow?: boolean; children: ReactNode }) {
  return (
    <h3 className="font-heading text-xl leading-tight font-medium tracking-tight text-balance text-foreground">
      {children}
      {arrow ? (
        <Arrow className="ml-1.5 inline-block size-4 align-[-0.1em] text-accent transition-transform duration-200 group-hover:translate-x-0.75" />
      ) : null}
    </h3>
  );
}

export function ItemBody({ children }: { children: ReactNode }) {
  return <p className="text-base text-pretty text-muted-foreground">{children}</p>;
}
