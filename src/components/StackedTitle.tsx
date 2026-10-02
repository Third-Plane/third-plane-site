import { cn, reveal } from "../lib/style";
import { Display1 } from "./Headings";

// A hero heading set on stacked lines. The lines after the first are the
// accent colour, or plain where the page wants them quieter.
export function StackedTitle({
  lines,
  secondLine = "accent",
}: {
  lines: string[];
  secondLine?: "accent" | "foreground";
}) {
  return (
    <Display1 {...reveal(1)}>
      {lines.map((line, i) => (
        // The space keeps the lines as separate words for crawlers and
        // screen readers; the spans are blocks, so it never shows.
        <span className={cn("block", i > 0 && secondLine === "accent" && "text-accent")} key={line}>
          {i > 0 ? ` ${line}` : line}
        </span>
      ))}
    </Display1>
  );
}
