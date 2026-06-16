/* ============================================================
   TANUJA BHATT PORTFOLIO — script.js
   Features: Particle canvas · Typed text · Scroll reveal ·
             Custom cursor · Navbar scroll · Mobile menu
   ============================================================ */

/* ─── PARTICLE CANVAS ───────────────────────────────────────── */
(function initCanvas() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: -999, y: -999 };
  const PARTICLE_COUNT = 90;
  const CONNECT_DIST   = 130;
  const ACCENT = '99,179,237';

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(random) {
      this.x  = Math.random() * W;
      this.y  = random ? Math.random() * H : H + 10;
      this.vx = (Math.random() - .5) * .35;
      this.vy = (Math.random() - .5) * .35;
      this.r  = Math.random() * 1.5 + .5;
      this.alpha = Math.random() * .5 + .2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      // Mouse repulsion
      const dx = this.x - mouse.x, dy = this.y - mouse.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 100) {
        this.x += (dx / dist) * 1.2;
        this.y += (dy / dist) * 1.2;
      }
      if (this.x < 0) this.x = W;
      if (this.x > W) this.x = 0;
      if (this.y < 0) this.y = H;
      if (this.y > H) this.y = 0;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${ACCENT},${this.alpha})`;
      ctx.fill();
    }
  }

  function init() {
    particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < CONNECT_DIST) {
          const alpha = (1 - d / CONNECT_DIST) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${ACCENT},${alpha})`;
          ctx.lineWidth = .8;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => { resize(); init(); });
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  resize(); init(); loop();
})();


/* ─── CUSTOM CURSOR ─────────────────────────────────────────── */
(function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;
  let rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    dot.style.left  = e.clientX + 'px';
    dot.style.top   = e.clientY + 'px';
    rx += (e.clientX - rx) * .12;
    ry += (e.clientY - ry) * .12;
  });
  (function animRing() {
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();
  // Smooth ring with rAF
  document.addEventListener('mousemove', e => {
    rx = e.clientX; ry = e.clientY;
  });
})();


/* ─── TYPED TEXT ────────────────────────────────────────────── */
(function initTyped() {
  const el = document.getElementById('typed-text');
  if (!el) return;
  const phrases = [
    'secure systems.',
    'elegant UIs.',
    'scalable backends.',
    'compilers.',
    'things that matter.',
  ];
  let pi = 0, ci = 0, deleting = false;
  const SPEED_TYPE = 65, SPEED_DEL = 35, PAUSE = 1800;

  function tick() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; setTimeout(tick, PAUSE); return; }
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(tick, deleting ? SPEED_DEL : SPEED_TYPE);
  }
  setTimeout(tick, 600);
})();


/* ─── SCROLL REVEAL ─────────────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const io  = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: .12 });
  els.forEach(el => io.observe(el));
})();


/* ─── NAVBAR SCROLL ─────────────────────────────────────────── */
(function initNav() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
})();


/* ─── MOBILE MENU ───────────────────────────────────────────── */
(function initMobile() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  menu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();


/* ─── ACTIVE NAV HIGHLIGHT ──────────────────────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: .4 });
  sections.forEach(s => io.observe(s));
})();


/* ─── COUNTER ANIMATION ─────────────────────────────────────── */
(function initCounters() {
  const nums = document.querySelectorAll('.stat-num');
  const io   = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el  = e.target;
      const raw = el.textContent.replace(/\D/g, '');
      const suffix = el.textContent.replace(/[\d]/g, '');
      if (!raw) return;
      const target = parseInt(raw);
      let cur = 0, step = Math.ceil(target / 40);
      const t = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = cur + suffix;
        if (cur >= target) clearInterval(t);
      }, 30);
      io.unobserve(el);
    });
  }, { threshold: 1 });
  nums.forEach(n => io.observe(n));
})();