/* THEME TOGGEL BUTTON ACTION & ANIMATION CODE HERE */

function initThemeToggle() {

  const toggle = document.getElementById("themeToggle");

  if (!toggle) return;

  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute( "data-theme", savedTheme );

  updateThemeIcon(savedTheme);
  updateThemeLogo(savedTheme);

  toggle.addEventListener("click", () => {

    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute( "data-theme", newTheme );
    localStorage.setItem( "theme", newTheme );

    updateThemeIcon(newTheme);
    updateThemeLogo(newTheme);
    
  });
}

function updateThemeIcon(theme) {

  const icon = document.querySelector("#themeToggle svg");

  if (!icon) return;

  icon.setAttribute( "data-lucide", theme === "dark" ? "sun" : "moon" );
  lucide.createIcons();

}

function updateThemeLogo(theme) {

  const logos = document.querySelectorAll(".nx-theme-logo");

  logos.forEach(logo => {

    logo.src = theme === "light" ? logo.dataset.light : logo.dataset.dark;

  });
}

const savedTheme = localStorage.getItem("theme");

if (!savedTheme) {

  const prefersDark = window.matchMedia( "(prefers-color-scheme: dark)" ).matches;
  document.documentElement.setAttribute( "data-theme", prefersDark ? "dark" : "light" );

}