import { reveal } from "../lib/style";
import { Display1 } from "./Headings";

// A hero heading set on stacked lines.
export function StackedTitle({ lines }: { lines: string[] }) {
  return (
    <Display1 {...reveal(1)}>
      {lines.map((line, i) => (
        // The space keeps the lines as separate words for crawlers and
        // screen readers; the spans are blocks, so it never shows.
        <span className="block" key={line}>
          {i > 0 ? ` ${line}` : line}
        </span>
      ))}
    </Display1>
  );
}
