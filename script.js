/* Lightbox */
function openLightbox(src) {
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.getElementById('lightbox-img').src = '';
  document.body.style.overflow = '';
}
document.getElementById('lightbox').addEventListener('click', function (e) {
  if (e.target === this) closeLightbox();
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeLightbox();
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleTheme() {
  document.body.classList.toggle('light');
  const btn = document.getElementById('themeIcon');
  btn.innerHTML = document.body.classList.contains('light') ? '🌙' : '🌞';
}

/* typing */
const roles = ["Web Developer  ", "AI/ML Enthusiast  ", "Python • Java • MySQL  ", "Problem Solver  "];
let i = 0, j = 0, current = "", del = false;
function type() {
  if (i >= roles.length) i = 0;
  if (!del && j <= roles[i].length) { current = roles[i].substring(0, j++) }
  else if (del && j >= 0) { current = roles[i].substring(0, j--) }
  document.getElementById("typing").innerHTML = current;
  if (j == roles[i].length) del = true;
  if (j == 0) { del = false; i++ }
  setTimeout(type, 100)
}
type();

/* scroll */
window.addEventListener("scroll", () => {
  document.querySelector('.top-btn').style.display =
    window.scrollY > 300 ? 'block' : 'none';

  document.querySelectorAll('.reveal').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add('active');
    }
  });
});

/* background */
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let dots = [];
for (let i = 0; i < 75; i++) {
  dots.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: (Math.random() - 0.5) * 0.18,
    dy: (Math.random() - 0.5) * 0.18,
    size: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.4 + 0.2,
    opacityDir: Math.random() > 0.5 ? 1 : -1,
    opacitySpeed: Math.random() * 0.003 + 0.001
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // draw connecting lines
  dots.forEach((a, ai) => {
    dots.forEach((b, bi) => {
      if (bi <= ai) return;
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < 140) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(192,132,252,${0.1 * (1 - dist / 140)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    });
  });
  // draw dots with smooth opacity pulse
  dots.forEach(d => {
    d.x += d.dx;
    d.y += d.dy;
    d.opacity += d.opacitySpeed * d.opacityDir;
    if (d.opacity >= 0.65 || d.opacity <= 0.1) d.opacityDir *= -1;
    if (d.x < -10) d.x = canvas.width + 10;
    if (d.x > canvas.width + 10) d.x = -10;
    if (d.y < -10) d.y = canvas.height + 10;
    if (d.y > canvas.height + 10) d.y = -10;
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(34,211,238,${d.opacity})`;
    ctx.fill();
  });
  requestAnimationFrame(draw);
}
draw();
