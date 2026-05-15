/* Gloabl JS Goes Here */

/*======================
    LENIS OPTIMIZED
========================*/

// const lenis = new Lenis({
//   duration: 1,          // lower = faster response
//   lerp: 0.12,            // 🔥 key fix (default is too low = laggy)
//   smoothWheel: true,
//   smoothTouch: false,   // improves performance
//   wheelMultiplier: 1.1  // slight boost for responsiveness
// });

// function raf(time) {
//   lenis.raf(time);
//   requestAnimationFrame(raf);
// }

// requestAnimationFrame(raf);

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