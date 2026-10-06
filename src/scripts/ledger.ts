// The activity list beside a hero heading. It follows the flowchart behind it:
// the chart tells its hero each moment it passes (a "flowchart:note" event;
// see scripts/flowchart/feed.ts), and the list adds a row for it and drops
// the oldest. The opening rows are restamped with the reader's clock
// first (the page was rendered at build time). New rows are copies of the
// first one, so they carry its styling; the markup is hooked up by data
// attributes, and the wording comes from the copy in `data-copy`.
//
// While the chart is still (off-screen, a hidden tab, reduced motion) no
// moments pass, so the list holds still with it.

import { phrase, type LedgerCopy, type Note } from "./flowchart/feed";

const VISIBLE = 5;
const formatTime = (value: number) => new Date(value).toTimeString().slice(0, 5);

for (const ledger of document.querySelectorAll<HTMLElement>("[data-ledger]")) {
  const copy: LedgerCopy = JSON.parse(ledger.dataset.copy ?? "{}");
  const list = ledger.querySelector("[data-rows]");
  const template = list?.firstElementChild;
  if (!list || !template || !copy.events) continue;

  const now = Date.now();
  list.querySelectorAll("[data-time]").forEach((el, i) => {
    el.textContent = formatTime(now - (VISIBLE - 1 - i) * 47_000);
  });

  // Only its own hero's chart: the event bubbles up from the canvas.
  const hero = ledger.closest("[data-hero-collapse]") ?? document;
  hero.addEventListener("flowchart:note", (event) => {
    const row = phrase((event as CustomEvent<Note>).detail, copy);
    if (!row) return;
    const item = template.cloneNode(true) as HTMLElement;
    item.dataset.status = row.status;
    item.querySelector("[data-time]")!.textContent = formatTime(Date.now());
    item.querySelector("[data-task]")!.textContent = row.task;

    list.firstElementChild?.remove();
    list.append(item);
  });
}
