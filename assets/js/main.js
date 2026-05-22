/* Gloabl JS Goes Here */

/*======================
    COMPONENT LOADER
========================*/

document.addEventListener("DOMContentLoaded", async () => {

  // Load Components
  await loadComponent("navbar", "components/navbar.html");
  await loadComponent("pageHero", "components/page-hero.html");
  await loadComponent("testimonials", "components/testimonials.html");
  await loadComponent("cta", "components/cta-section.html");
  await loadComponent("footer", "components/footer.html");

  // Init Global Icons
  lucide.createIcons();

  // Init Features
  initNavbar();
  initThemeToggle();
  initTestimonials();

  // Refresh AOS
  AOS.refresh();
});


/*======================
    LOAD COMPONENT
========================*/

async function loadComponent(id, file) {

  const element = document.getElementById(id);

  if (!element) return;

  try {

    const response = await fetch(file);
    const data = await response.text();

    element.innerHTML = data;

  } catch (error) {

    console.error(`Error loading ${file}:`, error);

  }

}

/*======================
    TESTIMONIALS
========================*/

function initTestimonials() {

  if (!document.querySelector(".nx-testimonial-slider")) return;

  new Swiper(".nx-testimonial-slider", {

    loop: true,
    spaceBetween: 30,

    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    navigation: {
      nextEl: ".nx-testimonial-next",
      prevEl: ".nx-testimonial-prev",
    },

    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      992: { slidesPerView: 3 }
    }

  });

}

/*======================
  ABOUT SECTION COUNTER
========================*/
const counters = document.querySelectorAll(".nx-counter");

const startCounter = (entry) => {
  if (entry.isIntersecting) {
    counters.forEach(counter => {
      let target = +counter.getAttribute("data-target");
      let count = 0;
      let speed = target / 50;

      const update = () => {
        count += speed;
        if (count < target) {
          counter.innerText = Math.floor(count);
          requestAnimationFrame(update);
        } else {
          counter.innerText = target;
        }
      };

      update();
    });
  }
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(startCounter);
}, { threshold: 0.5 });

document.querySelectorAll(".nx-about-stats").forEach(section => {
  observer.observe(section);
});

/*======================
    TOP TO SCROLL
========================*/
const scrollBtn = document.getElementById("scrollTopBtn");
const progressCircle = document.querySelector(".nx-progress-circle");

const radius = progressCircle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

progressCircle.style.strokeDasharray = circumference;
progressCircle.style.strokeDashoffset = circumference;

// Update progress
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  const progress = scrollTop / docHeight;
  const offset = circumference - progress * circumference;

  progressCircle.style.strokeDashoffset = offset;

  // Show/hide button
  if (scrollTop > 300) {
    scrollBtn.classList.add("active");
  } else {
    scrollBtn.classList.remove("active");
  }
}

window.addEventListener("scroll", updateScrollProgress);

// Scroll to top
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* ========================
    LOADER
======================== */
document.body.classList.add("loading");

window.addEventListener("load", () => {
  const loader = document.getElementById("nxLoader");

  setTimeout(() => {
    loader.classList.add("hidden");
    document.body.classList.remove("loading");
  }, 500);
});