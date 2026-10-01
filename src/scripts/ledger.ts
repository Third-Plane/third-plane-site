// The Placement Desk activity list: restamps the opening rows with the
// reader's clock (the page was rendered at build time), then adds a row every
// few seconds and drops the oldest. New rows are copies of the first one, so
// they carry its styling; the markup is hooked up by data attributes.

type Task = { task: string; status: string };

const VISIBLE = 5;
const formatTime = (value: number) => new Date(value).toTimeString().slice(0, 5);

for (const ledger of document.querySelectorAll<HTMLElement>("[data-ledger]")) {
  const tasks: Task[] = JSON.parse(ledger.dataset.tasks ?? "[]");
  const list = ledger.querySelector("[data-rows]");
  const template = list?.firstElementChild;
  if (!list || !template || !tasks.length) continue;

  const now = Date.now();
  list.querySelectorAll("[data-time]").forEach((el, i) => {
    el.textContent = formatTime(now - (VISIBLE - 1 - i) * 47_000);
  });

  let index = VISIBLE;
  const tick = () => {
    const { task, status } = tasks[index % tasks.length];
    const row = template.cloneNode(true) as HTMLElement;
    row.dataset.status = status;
    row.querySelector("[data-time]")!.textContent = formatTime(Date.now());
    row.querySelector("[data-task]")!.textContent = task;

    list.firstElementChild?.remove();
    list.append(row);
    index += 1;
    window.setTimeout(tick, 3800 + Math.random() * 2400);
  };
  window.setTimeout(tick, 3000);
}
