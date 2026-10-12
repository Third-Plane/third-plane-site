// A section's items on a cycle (ScreenCycle.tsx): one item is active at a
// time, its cell highlighted and its screen showing. The active cell's
// progress bar is a CSS animation, and when it ends the next item takes over,
// so the bar is the timer: pausing it pauses the cycle. It holds still while a
// mouse is over it (not a tap, which never leaves) and while it's off-screen,
// and starts over at the first item the first time it comes into view.
// Clicking a cell makes it the active one, from the start.
//
// Under reduced motion the bar doesn't animate (it's motion-safe), so nothing
// ends and the items only change on a click.

for (const cycle of document.querySelectorAll<HTMLElement>("[data-cycle]")) {
  const cells = [...cycle.querySelectorAll<HTMLElement>("[data-cycle-cell]")];
  const screens = [...cycle.querySelectorAll<HTMLElement>("[data-cycle-screen]")];
  if (cells.length < 2) continue;

  let active = 0;
  let hovered = false;
  let visible = false;
  let seen = false;

  // Pause or run the active bar to match. getAnimations() brings styles up to
  // date first, so a bar that has only just become active has its animation.
  const sync = () => {
    const progress = cells[active].querySelector("[data-cycle-progress]");
    for (const animation of progress?.getAnimations() ?? []) {
      if (hovered || !visible) animation.pause();
      else animation.play();
    }
  };

  const activate = (index: number) => {
    active = index;
    cells.forEach((cell, i) => {
      cell.toggleAttribute("data-active", i === index);
      cell.querySelector("button")?.setAttribute("aria-pressed", String(i === index));
    });
    screens.forEach((screen, i) => screen.toggleAttribute("data-active", i === index));
    // Already active (clicked again, or the first point on first view): start over.
    const progress = cells[index].querySelector("[data-cycle-progress]");
    for (const animation of progress?.getAnimations() ?? []) animation.currentTime = 0;
    sync();
  };

  cycle.addEventListener("animationend", (event) => {
    if ((event.target as Element).matches("[data-cycle-progress]"))
      activate((active + 1) % cells.length);
  });

  cells.forEach((cell, i) => {
    cell.querySelector("button")?.addEventListener("click", () => activate(i));
  });

  cycle.addEventListener("pointerenter", (event) => {
    if (event.pointerType !== "mouse") return;
    hovered = true;
    sync();
  });
  cycle.addEventListener("pointerleave", (event) => {
    if (event.pointerType !== "mouse") return;
    hovered = false;
    sync();
  });

  new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !seen) {
        seen = true;
        activate(0);
      } else sync();
    },
    { threshold: 0.3 },
  ).observe(cycle);

  sync();
}
