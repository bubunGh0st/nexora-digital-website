/* Theme Toggle JS Goes Here */

function initThemeToggle() {
  // Theme Toggle
  const toggle = document.getElementById("themeToggle");

  if (!toggle) return; // safety

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("light");

    const icon = toggle.querySelector("i");

    if (!icon) return;

    if (document.body.classList.contains("light")) {
      icon.setAttribute("data-lucide", "sun");
    } else {
      icon.setAttribute("data-lucide", "moon");
    }

    lucide.createIcons();
  });
}

