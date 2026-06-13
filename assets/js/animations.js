/* Animation JS Goes Here */

/*========================================
    AOS INITIAL
========================================*/
AOS.init({
  duration: 800,
  once: true
});

/*========================================
   HOME: HERO NETWORK ANIMATION
========================================*/
function initHomeHeroCanvas() {

  // Canvas
  const canvas = document.getElementById("networkCanvas");

  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // Responsive Settings
  let NODE_COUNT;
  let MAX_DISTANCE;

  const isMobile = window.innerWidth < 768;

  if (window.innerWidth < 576) {
    NODE_COUNT = 50;
    MAX_DISTANCE = 80;
  }
  else if (window.innerWidth < 992) {
    NODE_COUNT = 80;
    MAX_DISTANCE = 110;
  }
  else {
    NODE_COUNT = 100;
    MAX_DISTANCE = 130;
  }

  // Canvas Resize
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // Nodes Array
  let nodes = [];

  // Create Nodes
  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,

      vx: (Math.random() - 0.5) * (isMobile ? 0.35 : 0.6),
      vy: (Math.random() - 0.5) * (isMobile ? 0.35 : 0.6)
    });
  }

  // Mouse Interaction
  let mouse = {
    x: null,
    y: null
  };

  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Draw Animation
  function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* Draw Connections */
    for (let i = 0; i < nodes.length; i++) {

      for (let j = i + 1; j < nodes.length; j++) {

        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;

        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAX_DISTANCE) {

          ctx.strokeStyle = `rgba(86, 204, 242, ${1 - dist / MAX_DISTANCE})`;

          ctx.lineWidth = 1;

          ctx.beginPath();

          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);

          ctx.stroke();
        }
      }
    }

    /* Draw Nodes */
    nodes.forEach(node => {

      // Move
      node.x += node.vx;
      node.y += node.vy;

      // Bounce
      if (node.x < 0 || node.x > canvas.width) {
        node.vx *= -1;
      }
      if (node.y < 0 || node.y > canvas.height) {
        node.vy *= -1;
      }

      // Glow Gradient
      const gradient = ctx.createRadialGradient(
        node.x,
        node.y,
        0,
        node.x,
        node.y,
        isMobile ? 4 : 6
      );

      gradient.addColorStop(0, "#56CCF2");
      gradient.addColorStop(1, "transparent");

      // Draw Node
      ctx.fillStyle = gradient;

      ctx.beginPath();

      ctx.arc(
        node.x,
        node.y,
        isMobile ? 2 : 3,
        0,
        Math.PI * 2
      );

      ctx.fill();

      /* Mouse Interaction */
      if (mouse.x && mouse.y) {

        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;

        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {

          node.x += dx * 0.01;
          node.y += dy * 0.01;
        }
      }

    });

    /* Animation Loop */

    // Lower FPS on mobile for smoother performance
    if (isMobile) {

      setTimeout(() => {
        requestAnimationFrame(draw);
      }, 1000 / 40);

    } else {

      requestAnimationFrame(draw);

    }
  }

  // Start Animation
  draw();

  /* GSAP Animation */
  gsap.from("#networkCanvas", {
    opacity: 0,
    duration: 1.5
  });
}

/*========================================
   PAGE HERO NETWORK
========================================*/
function initPageHeroCanvas() {

  const canvas = document.getElementById("pageHeroCanvas");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  let width;
  let height;
  let particles = [];

  function resizeCanvas() {

    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;

    createParticles();
  }

  function createParticles() {

    particles = [];

    const count = window.innerWidth < 768 ? 30 : 50;

    for (let i = 0; i < count; i++) {

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,

        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,

        radius: Math.random() * 2 + 1
      });

    }
  }

  function drawParticles() {

    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

      const gradient = ctx.createRadialGradient(
        p.x,
        p.y,
        0,
        p.x,
        p.y,
        8
      );

      gradient.addColorStop(0, "#56CCF2");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fill();

    });

    for (let a = 0; a < particles.length; a++) {

      for (let b = a + 1; b < particles.length; b++) {

        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 140) {

          ctx.beginPath();

          ctx.moveTo(
            particles[a].x,
            particles[a].y
          );

          ctx.lineTo(
            particles[b].x,
            particles[b].y
          );

          ctx.strokeStyle =
            `rgba(86,204,242,${0.20 - distance / 1000})`;

          ctx.lineWidth = 1;

          ctx.stroke();

        }

      }

    }

    requestAnimationFrame(drawParticles);

  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  drawParticles();

  /* GSAP Animation */
  gsap.to("#pageHeroCanvas", {
    y: 60,
    ease: "none",
  });
}

/*========================================
   SERVICES SECTION
========================================*/
// Services Section
gsap.utils.toArray(".nx-service-card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card.querySelector(".nx-service-icon"), {
      y: -8,
      scale: 1.15,
      duration: 0.3
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card.querySelector(".nx-service-icon"), {
      y: 0,
      scale: 1,
      duration: 0.3
    });
  });
});