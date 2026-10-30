// A page's questions and answers (Faq.tsx): clicking a question opens or
// closes its answer. The markup is static, all closed; this sets `data-open`
// on the item and `aria-expanded` on its button.

import { onPage } from "./page";

onPage(() => {
  for (const item of document.querySelectorAll<HTMLElement>("[data-faq]")) {
    const button = item.querySelector<HTMLButtonElement>("[data-faq-toggle]")!;
    button.addEventListener("click", () => {
      const open = item.dataset.open !== "true";
      item.dataset.open = String(open);
      button.setAttribute("aria-expanded", String(open));
    });
  }
});
