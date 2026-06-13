/* Swiper JS Goes Here */

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