// Markup kept out of the page's HTML (the mock screens' contents, see Frame in
// MockUi.tsx) ships as a JSON string in a script tag, which crawlers skip. Each
// page puts it in place of its tag as it is shown.

import { onPage } from "./page";

onPage(() => {
  for (const data of document.querySelectorAll<HTMLScriptElement>("script[data-deferred]")) {
    data.replaceWith(document.createRange().createContextualFragment(JSON.parse(data.text)));
  }
});
