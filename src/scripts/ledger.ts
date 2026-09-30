// The Placement Desk activity list: restamps the opening rows with the
// reader's clock (the page was rendered at build time), then adds a row every
// few seconds and drops the oldest.

type Task = { task: string; status: string };

const VISIBLE = 5;
const formatTime = (value: number) => new Date(value).toTimeString().slice(0, 5);

function row({ task, status }: Task, time: string) {
  const li = document.createElement("li");
  li.className = "ledger__row";
  li.dataset.status = status;
  li.innerHTML =
    '<span class="ledger__time"></span><span class="ledger__task"></span><i class="ledger__dot" aria-hidden="true"></i>';
  li.querySelector(".ledger__time")!.textContent = time;
  li.querySelector(".ledger__task")!.textContent = task;
  return li;
}

for (const ledger of document.querySelectorAll<HTMLElement>("[data-ledger]")) {
  const tasks: Task[] = JSON.parse(ledger.dataset.tasks ?? "[]");
  const list = ledger.querySelector(".ledger__rows");
  if (!list || !tasks.length) continue;

  const now = Date.now();
  list.querySelectorAll(".ledger__time").forEach((el, i) => {
    el.textContent = formatTime(now - (VISIBLE - 1 - i) * 47_000);
  });

  let index = VISIBLE;
  const tick = () => {
    list.firstElementChild?.remove();
    list.append(row(tasks[index % tasks.length], formatTime(Date.now())));
    index += 1;
    window.setTimeout(tick, 3800 + Math.random() * 2400);
  };
  window.setTimeout(tick, 3000);
}
