// Display1's lines (Headings.tsx). The title is a plain string the browser
// wraps (text-pretty); this finds where each line starts, from where its
// characters land, and writes the lines into the heading's overlay as one
// block span each, kept from wrapping again: data-line and --line hold the
// index, and --lines on the heading the count. The string stays underneath,
// laid out the same but see-through (data-split), so it is what the lines are
// measured from whenever the heading changes width or the fonts arrive.

// The title's lines as laid out: a character starts a new line when it sits
// more than half its height below the line before. The space a line breaks
// at stays on the line it ends, and is trimmed.
function measure(text: Text) {
  const range = document.createRange();
  const lines: string[] = [];
  let line = "";
  let top = -Infinity;
  for (let i = 0; i < text.length; i++) {
    range.setStart(text, i);
    range.setEnd(text, i + 1);
    const rect = range.getBoundingClientRect();
    if (rect.height && rect.top > top + rect.height / 2) {
      if (line.trim()) lines.push(line.trim());
      line = "";
      top = rect.top;
    }
    line += text.data[i];
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}

for (const heading of document.querySelectorAll<HTMLElement>("[data-lines]")) {
  const text = heading.querySelector("[data-lines-text]")?.firstChild;
  const out = heading.querySelector("[data-lines-out]");
  if (!(text instanceof Text) || !out) continue;

  let current = "";
  const split = () => {
    const lines = measure(text);
    // Unchanged: keep the spans, so an effect running on them carries on.
    if (lines.join("\n") === current) return;
    current = lines.join("\n");
    out.replaceChildren(
      ...lines.map((line, i) => {
        const span = document.createElement("span");
        span.className =
          "bg-deep/7 backdrop-blur-xs -ml-(--gutter) pl-(--gutter) whitespace-nowrap";
        span.dataset.line = String(i);
        span.style.setProperty("--line", String(i));
        span.textContent = line;
        return span;
      }),
    );
    heading.style.setProperty("--lines", String(lines.length));
    heading.toggleAttribute("data-split", true);
  };

  new ResizeObserver(split).observe(heading);
  document.fonts.ready.then(split);
}
