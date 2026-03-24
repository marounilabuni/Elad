/* ─── NAVBAR SCROLL ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ─── REVEAL ON SCROLL ─── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

/* ─── COUNTER ANIMATION ─── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1600;
  const frameDuration = 16;
  const totalFrames = Math.round(duration / frameDuration);
  let frame = 0;
  const timer = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (frame >= totalFrames) {
      el.textContent = target.toLocaleString();
      clearInterval(timer);
    }
  }, frameDuration);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ─── MATH SYMBOLS CANVAS ─── */
const canvas = document.getElementById('mathCanvas');
const ctx = canvas.getContext('2d');

const SYMBOLS = ['∑', '∫', 'π', 'Δ', '∞', '√', 'θ', 'α', 'β', 'λ', 'ℝ', '∂', '∇', '±', '≈'];
const COLORS  = [
  'rgba(255,69,0,',
  'rgba(255,26,108,',
  'rgba(255,107,53,',
];

let W, H, particles = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

function initParticles() {
  particles = [];
  const count = Math.min(60, Math.floor((W * H) / 20000));
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      size: 11 + Math.random() * 16,
      opacity: 0.03 + Math.random() * 0.1,
      speed: 0.08 + Math.random() * 0.25,
      drift: (Math.random() - 0.5) * 0.12,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    });
  }
}

resize();
initParticles();
window.addEventListener('resize', () => { resize(); initParticles(); });

function draw() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => {
    ctx.font = `${p.size}px 'Space Grotesk', sans-serif`;
    ctx.fillStyle = `${p.color}${p.opacity})`;
    ctx.fillText(p.symbol, p.x, p.y);
    p.y -= p.speed;
    p.x += p.drift;
    if (p.y < -30) { p.y = H + 20; p.x = Math.random() * W; }
    if (p.x < -20) p.x = W + 20;
    if (p.x > W + 20) p.x = -20;
  });
  requestAnimationFrame(draw);
}
draw();

/* ─── SMOOTH ANCHORS ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
