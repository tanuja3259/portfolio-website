/* project.js — shared across all project pages */

/* ─── PARTICLE CANVAS ─────────────────────────────────────── */
(function() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  const N = 60, CONNECT = 120, ACC = '99,179,237';

  function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }

  class P {
    constructor() {
      this.x = Math.random() * W; this.y = Math.random() * H;
      this.vx = (Math.random()-.5)*.3; this.vy = (Math.random()-.5)*.3;
      this.r = Math.random()*1.2+.4; this.a = Math.random()*.4+.15;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x<0) this.x=W; if (this.x>W) this.x=0;
      if (this.y<0) this.y=H; if (this.y>H) this.y=0;
    }
    draw() {
      ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${ACC},${this.a})`; ctx.fill();
    }
  }

  function init() { particles = Array.from({length:N}, ()=>new P()); }
  function loop() {
    ctx.clearRect(0,0,W,H);
    for (let i=0;i<particles.length;i++) {
      for (let j=i+1;j<particles.length;j++) {
        const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if (d<CONNECT) { ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y); ctx.strokeStyle=`rgba(${ACC},${(1-d/CONNECT)*.14})`; ctx.lineWidth=.7; ctx.stroke(); }
      }
    }
    particles.forEach(p=>{ p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  addEventListener('resize',()=>{ resize(); init(); });
  resize(); init(); loop();
})();

/* ─── SCROLL REVEAL ───────────────────────────────────────── */
(function() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(e => e.forEach(x => {
    if (x.isIntersecting) { x.target.classList.add('visible'); io.unobserve(x.target); }
  }), { threshold: .1 });
  els.forEach(el => io.observe(el));
})();

/* ─── LIGHTBOX ────────────────────────────────────────────── */
(function() {
  const box     = document.getElementById('lightbox');
  const img     = document.getElementById('lightbox-img');
  const counter = document.getElementById('lightbox-counter');
  if (!box || !img) return;

  const thumbs = Array.from(document.querySelectorAll('.screenshot-thumb'));
  let cur = 0;

  function show(i) {
    cur = (i + thumbs.length) % thumbs.length;
    const src = thumbs[cur].querySelector('img').src;
    img.src = src;
    if (counter) counter.textContent = `${cur+1} / ${thumbs.length}`;
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() { box.classList.remove('open'); document.body.style.overflow=''; }

  thumbs.forEach((t, i) => t.addEventListener('click', () => show(i)));
  document.getElementById('lightbox-close')?.addEventListener('click', close);
  document.getElementById('lightbox-prev')?.addEventListener('click', () => show(cur - 1));
  document.getElementById('lightbox-next')?.addEventListener('click', () => show(cur + 1));
  box.addEventListener('click', e => { if (e.target === box) close(); });
  document.addEventListener('keydown', e => {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });
})();

/* ─── NAVBAR SCROLL ───────────────────────────────────────── */
(function() {
  const nav = document.querySelector('.proj-nav');
  if (!nav) return;
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 20));
})();