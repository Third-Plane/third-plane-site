import { reveal } from "../lib/style";

// A hero heading set on stacked lines.
export function StackedTitle({ lines }: { lines: string[] }) {
  return (
    <h1 className="display-1" {...reveal(1)}>
      {lines.map((line, i) => (
        // The space keeps the lines as separate words for crawlers and
        // screen readers; the spans are blocks, so it never shows.
        <span key={line}>{i > 0 ? ` ${line}` : line}</span>
      ))}
    </h1>
  );
}
