/* Animation JS Goes Here */

/*======================
    AOS INITIAL
========================*/
AOS.init({
  duration: 800,
  once: true
});

/*======================
    HERO ANIMATION
========================*/
// Hero Section Animation
const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");

let nodes = [];
const NODE_COUNT = 80;
const MAX_DISTANCE = 120;

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Create nodes
for (let i = 0; i < NODE_COUNT; i++) {
  nodes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6
  });
}

// Mouse
let mouse = { x: null, y: null };

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

canvas.addEventListener("mouseleave", () => {
  mouse.x = null;
  mouse.y = null;
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw connections
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      let dx = nodes[i].x - nodes[j].x;
      let dy = nodes[i].y - nodes[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);

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

  // Draw nodes
  nodes.forEach(node => {

    // Move
    node.x += node.vx;
    node.y += node.vy;

    // Bounce
    if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
    if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

    // Glow
    const gradient = ctx.createRadialGradient(
      node.x, node.y, 0,
      node.x, node.y, 6
    );
    gradient.addColorStop(0, "#56CCF2");
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
    ctx.fill();

    // Mouse interaction
    if (mouse.x && mouse.y) {
      let dx = node.x - mouse.x;
      let dy = node.y - mouse.y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        node.x += dx * 0.01;
        node.y += dy * 0.01;
      }
    }

  });

  requestAnimationFrame(draw);
}

draw();

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
