/* ─── CURSOR GLOW ─── */
const glow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
  glow.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
});

/* ─── NAVBAR SCROLL ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ─── REVEAL ON SCROLL ─── */
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

/* ─── COUNTER ANIMATION ─── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step = 16;
  const increment = target / (duration / step);
  let current = 0;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current).toLocaleString();
    }
  }, step);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ─── MATH CANVAS BACKGROUND ─── */
const canvas = document.getElementById('mathCanvas');
const ctx = canvas.getContext('2d');

const SYMBOLS = ['∑', '∫', 'π', 'Δ', '∞', '√', 'θ', 'α', 'β', 'λ', 'ℝ', '∂', '⊕', '∇', '±', '≈', '≡'];

let particles = [];
let W, H;

function resize() {
  W = canvas.width  = canvas.offsetWidth;
  H = canvas.height = canvas.offsetHeight;
}
resize();
window.addEventListener('resize', () => { resize(); initParticles(); });

function randomBetween(a, b) { return a + Math.random() * (b - a); }

function initParticles() {
  particles = [];
  const count = Math.floor((W * H) / 18000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: randomBetween(0, W),
      y: randomBetween(0, H),
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      size: randomBetween(12, 28),
      opacity: randomBetween(0.04, 0.18),
      speed: randomBetween(0.1, 0.35),
      drift: randomBetween(-0.1, 0.1),
    });
  }
}
initParticles();

function drawFrame() {
  ctx.clearRect(0, 0, W, H);

  // Faint grid lines
  ctx.strokeStyle = 'rgba(201,168,76,0.04)';
  ctx.lineWidth = 1;
  const gridSize = 80;
  for (let x = 0; x < W; x += gridSize) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += gridSize) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  // Floating symbols
  particles.forEach(p => {
    ctx.font = `${p.size}px 'Playfair Display', serif`;
    ctx.fillStyle = `rgba(201,168,76,${p.opacity})`;
    ctx.fillText(p.symbol, p.x, p.y);

    p.y -= p.speed;
    p.x += p.drift;

    if (p.y < -40) { p.y = H + 20; p.x = randomBetween(0, W); }
    if (p.x < -20) p.x = W + 20;
    if (p.x > W + 20) p.x = -20;
  });

  requestAnimationFrame(drawFrame);
}
drawFrame();

/* ─── SMOOTH ANCHOR SCROLLING ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
