/* Navbar JS Goes Here */

// Fucntion to call navbar in index page. 
// Navbar behavior code
function initNavbar() {

  // Scroll effect
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".nx-navbar");
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    }
  });

  // Menu Mobile Toggle
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.querySelector(".nx-nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");

      // Animate menu items
      if (navMenu.classList.contains("active")) {
        gsap.from(".nx-nav-menu li", {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.5
        });
      }
    });
  }

  // Active link highlight
  const links = document.querySelectorAll(".nx-nav-menu a");
  const currentPath = window.location.pathname;

  links.forEach(link => {
    if (link.getAttribute("href") === currentPath || link.getAttribute("href") === "") {
      link.classList.add("active");
    }
  });

  // ✅ CLOSE MENU ON LINK CLICK (ADD HERE)
  if (navMenu) {
    links.forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 992) {
          navMenu.classList.remove("active");
        }
      });
    });
  }
}
