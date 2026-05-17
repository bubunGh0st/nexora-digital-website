/* Animation JS Goes Here */

/*======================
    AOS INITIAL
========================*/
AOS.init({
  duration: 800,
  once: true
});

/*======================
    HERO NETWORK ANIMATION
========================*/

// Canvas
const canvas = document.getElementById("networkCanvas");
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

  /* DRAW CONNECTIONS */
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

  /* DRAW NODES */
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

    /* MOUSE INTERACTION */
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

  /* ANIMATION LOOP */

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

/* GSAP ENTRY ANIMATION */
gsap.from("#networkCanvas", {
  opacity: 0,
  duration: 1.5
});

/*======================
    SERVICES SECTION
========================*/
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
