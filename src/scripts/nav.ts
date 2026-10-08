// The header: hover/click dropdowns on desktop and a drawer on narrow screens. The markup is static (Header.tsx);
// this sets `data-open` and `aria-expanded` on it.

const nav = document.querySelector<HTMLElement>("[data-nav]");

if (nav) {
  const toggle = nav.querySelector<HTMLButtonElement>("[data-nav-toggle]")!;
  const menus = [...nav.querySelectorAll<HTMLElement>("[data-menu]")];
  const links = nav.querySelector<HTMLElement>("[data-nav-links]")!;

  let drawerOpen = false;
  let openMenu: HTMLElement | null = null;

  const render = () => {
    nav.dataset.open = String(drawerOpen);
    toggle.setAttribute("aria-expanded", String(drawerOpen));
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    for (const menu of menus) {
      const isOpen = menu === openMenu;
      menu.dataset.open = String(isOpen);
      menu.querySelector("[data-menu-btn]")!.setAttribute("aria-expanded", String(isOpen));
    }
  };

  const closeAll = () => {
    drawerOpen = false;
    openMenu = null;
    render();
  };

  toggle.addEventListener("click", () => {
    drawerOpen = !drawerOpen;
    render();
  });

  for (const menu of menus) {
    menu.addEventListener("mouseenter", () => {
      openMenu = menu;
      render();
    });
    menu.addEventListener("mouseleave", () => {
      if (openMenu === menu) openMenu = null;
      render();
    });
    menu.querySelector("[data-menu-btn]")!.addEventListener("click", () => {
      openMenu = openMenu === menu ? null : menu;
      render();
    });
  }

  // Following a link closes whatever it was in.
  nav.addEventListener("click", (event) => {
    if ((event.target as Element).closest("[data-nav-panel] a[href], [data-nav-drawer] a[href]"))
      closeAll();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeAll();
  });

  window.addEventListener("pointerdown", (event) => {
    if (openMenu && !links.contains(event.target as Node)) {
      openMenu = null;
      render();
    }
  });

  window.addEventListener("resize", () => {
    // The toggle is only displayed where the drawer is (see Header.tsx), so once
    // it is gone there is no drawer to leave open. Asking the stylesheet keeps
    // the breakpoint in one place.
    if (drawerOpen && getComputedStyle(toggle).display === "none") {
      drawerOpen = false;
      render();
    }
  });
}
