import { cn, reveal } from "../lib/style";
import { Display1 } from "./Headings";

// A hero heading set on stacked lines. The lines after the first are purple,
// or ink where the page wants them quieter.
export function StackedTitle({
  lines,
  secondLine = "purple",
}: {
  lines: string[];
  secondLine?: "purple" | "ink";
}) {
  const tone = secondLine === "purple" ? "text-purple" : "text-ink";
  return (
    <Display1 {...reveal(1)}>
      {lines.map((line, i) => (
        // The space keeps the lines as separate words for crawlers and
        // screen readers; the spans are blocks, so it never shows.
        <span className={cn("block", i > 0 && tone)} key={line}>
          {i > 0 ? ` ${line}` : line}
        </span>
      ))}
    </Display1>
  );
}
