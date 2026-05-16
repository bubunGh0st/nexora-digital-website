/* Gloabl JS Goes Here */

/*======================
    LOAD NAVBAR
========================*/
// Loading Navbar in Index.html
document.addEventListener("DOMContentLoaded", function () {
  fetch('components/navbar.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('navbar').innerHTML = data;

      lucide.createIcons();
      initNavbar();
      initThemeToggle();
    });
});

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
    LOAD TESTIMONIALS
========================*/
document.addEventListener("DOMContentLoaded", function () {
  fetch('components/testimonials.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('testimonials').innerHTML = data;

    // re-init icons & swiper after load
    lucide.createIcons();

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
  });
});

/*======================
    LOAD CTA SECTION
========================*/
document.addEventListener("DOMContentLoaded", function () {
  fetch('components/cta-section.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('cta').innerHTML = data;
    AOS.refresh();
  });
});

/*======================
    LOAD FOOTER
========================*/
document.addEventListener("DOMContentLoaded", function () {
  fetch('components/footer.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
    lucide.createIcons();
  });
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