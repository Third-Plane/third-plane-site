// A section's items on a cycle (ScreenCycle.tsx): one item is active at a
// time, its cell highlighted and its screen showing. The active cell's
// progress bar is a CSS animation, and when it ends the next item takes over,
// so the bar is the timer: pausing it pauses the cycle. It holds still while
// it's off-screen (under a third in view), and starts over at the first item
// the first time it comes into view.
//
// Clicking a cell stops the cycle there for good: the cell is the active one,
// its bar full and still, until another is clicked. A hover doesn't pause it;
// a cycle that stops whenever the pointer crosses it seems to stop at random.
//
// A staged cycle (StagedScreenCycle) has its cells in groups, a stage each,
// with a tab for each: the group holding the active cell is the active one,
// and clicking a tab stops the cycle on its group's first cell.
//
// Under reduced motion the bar doesn't animate (it's motion-safe), so nothing
// ends and the items only change on a click.

import { onPage } from "./page";

// How much of the cycle must be in view for it to run.
const IN_VIEW = 0.3;

onPage((signal) => {
  for (const cycle of document.querySelectorAll<HTMLElement>("[data-cycle]")) {
    const cells = [...cycle.querySelectorAll<HTMLElement>("[data-cycle-cell]")];
    const screens = [...cycle.querySelectorAll<HTMLElement>("[data-cycle-screen]")];
    const groups = [...cycle.querySelectorAll<HTMLElement>("[data-cycle-group]")];
    const tabs = [...cycle.querySelectorAll<HTMLElement>("[data-cycle-tab]")];
    const bars = [...cycle.querySelectorAll<HTMLElement>("[data-cycle-progress]")];
    if (cells.length < 2) continue;

    let active = 0;
    let visible = false;
    let seen = false;

    // Pause or run the active bar to match. getAnimations() brings styles up to
    // date first, so a bar that has only just become active has its animation.
    const sync = () => {
      for (const animation of bars[active].getAnimations()) {
        if (visible) animation.play();
        else animation.pause();
      }
    };

    const activate = (index: number) => {
      active = index;
      cells.forEach((cell, i) => {
        cell.toggleAttribute("data-active", i === index);
        cell.querySelector("button")?.setAttribute("aria-pressed", String(i === index));
      });
      screens.forEach((screen, i) => screen.toggleAttribute("data-active", i === index));
      const group = groups.findIndex((g) => g.contains(cells[index]));
      groups.forEach((g, i) => g.toggleAttribute("data-active", i === group));
      tabs.forEach((tab, i) => {
        tab.toggleAttribute("data-active", i === group);
        tab.setAttribute("aria-pressed", String(i === group));
      });
      // Already active (the first item on first view): start over.
      for (const animation of bars[index].getAnimations()) animation.currentTime = 0;
      sync();
    };

    // No bar animates from here on, so nothing ends; an active one stands full,
    // as under reduced motion. Inline, so it holds over the animation's class.
    const stop = (index: number) => {
      seen = true;
      for (const bar of bars) bar.style.animationName = "none";
      activate(index);
    };

    cycle.addEventListener("animationend", (event) => {
      if ((event.target as Element).matches("[data-cycle-progress]"))
        activate((active + 1) % cells.length);
    });

    cells.forEach((cell, i) => {
      cell.querySelector("button")?.addEventListener("click", () => stop(i));
    });

    tabs.forEach((tab, i) => {
      const first = groups[i]?.querySelector<HTMLElement>("[data-cycle-cell]");
      if (first) tab.addEventListener("click", () => stop(cells.indexOf(first)));
    });

    // The callback also runs as the cycle comes into or leaves view at all, so
    // the ratio, not isIntersecting, says whether enough of it is in view.
    const view = new IntersectionObserver(
      ([entry]) => {
        visible = entry.intersectionRatio >= IN_VIEW;
        if (visible && !seen) {
          seen = true;
          activate(0);
        } else sync();
      },
      { threshold: IN_VIEW },
    );
    view.observe(cycle);
    signal.addEventListener("abort", () => view.disconnect());

    sync();
  }
});
