// Candlelight & Floating Lotus Lantern section with interactive water ripples

import { getRoyalCrestSVG } from './svgs.js';

export function renderCandlelight() {
  return `
  <section id="candlelight-section" class="candlelight-section">
    <!-- Romantic dark water lake background -->
    <div class="candlelight-bg">
      <div class="candlelight-photo"></div>
      <div class="candlelight-overlay"></div>
    </div>

    <!-- Interactive Water Ripple & Floating Lantern Canvas -->
    <canvas id="water-ripple-canvas" class="water-ripple-canvas"></canvas>

    <div class="candlelight-content">
      <div class="candlelight-crest">${getRoyalCrestSVG(64, 38)}</div>
      <h2 class="candlelight-title moul-font">ពន្លឺទៀនជ័យ & ប្រទីបបួងសួង</h2>
      <p class="candlelight-desc">
        ចុច ឬប៉ះលើផ្ទៃទឹក ដើម្បីបង្ហោះប្រទីបផ្កាឈូក និងប្រសិទ្ធពរជ័យ
      </p>
      <div class="candlelight-cue">
        <span class="cue-ripple">✨ ប៉ះលើផ្ទៃទឹកដើម្បីបង្កើតរលកទឹក (Tap for Water Ripples)</span>
      </div>
    </div>
  </section>
  `;
}

export function initCandlelightCanvas() {
  const canvas = document.getElementById('water-ripple-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const section = document.getElementById('candlelight-section');
  let width = (canvas.width = section?.clientWidth || window.innerWidth);
  let height = (canvas.height = section?.clientHeight || window.innerHeight);

  const resize = () => {
    if (!section) return;
    if (canvas.width !== section.clientWidth || canvas.height !== section.clientHeight) {
      width = canvas.width = section.clientWidth;
      height = canvas.height = section.clientHeight;
    }
  };
  window.addEventListener('resize', resize);

  // Ripples system
  const ripples = [];
  // Floating lotus lanterns
  const lanterns = [
    { x: width * 0.5, y: height * 0.65, vx: 0.15, vy: -0.05, size: 28, bob: 0 }
  ];

  function addRipple(x, y) {
    ripples.push({ x, y, radius: 2, maxRadius: 120, opacity: 0.85, speed: 2.2 });
    if (lanterns.length < 8) {
      lanterns.push({
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.3 - 0.1,
        size: Math.random() * 8 + 22,
        bob: Math.random() * Math.PI
      });
    }
  }

  const handlePointer = (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    addRipple(x, y);
  };
  canvas.addEventListener('pointerdown', handlePointer);

  let isVisible = true;
  const observer = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
  }, { threshold: 0.1 });
  if (section) observer.observe(section);

  let animId;
  function loop() {
    if (!isVisible) {
      animId = requestAnimationFrame(loop);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    // 1. Draw ripples
    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];
      r.radius += r.speed;
      r.opacity -= 0.012;

      if (r.opacity <= 0 || r.radius >= r.maxRadius) {
        ripples.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(236, 200, 128, ${Math.max(0, r.opacity * 0.7)})`;
      ctx.lineWidth = 1.6;
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#ECC880';
      ctx.stroke();

      // Secondary echo ripple
      if (r.radius > 15) {
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius - 12, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 243, 209, ${Math.max(0, r.opacity * 0.4)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();
    }

    // 2. Draw floating lotus lanterns
    for (let l of lanterns) {
      l.x += l.vx;
      l.y += l.vy;
      l.bob += 0.04;

      // Keep within bounds
      if (l.x < 30 || l.x > width - 30) l.vx *= -1;
      if (l.y < height * 0.3) {
        l.y = height + 10;
        l.x = Math.random() * (width - 80) + 40;
      }

      const bobY = l.y + Math.sin(l.bob) * 3;

      ctx.save();
      ctx.translate(l.x, bobY);

      // Candle flame glow
      const glow = ctx.createRadialGradient(0, -6, 2, 0, -6, l.size * 1.5);
      glow.addColorStop(0, 'rgba(255, 240, 180, 0.95)');
      glow.addColorStop(0.3, 'rgba(236, 170, 60, 0.6)');
      glow.addColorStop(1, 'rgba(210, 120, 20, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, -6, l.size * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Lotus petal base (gold / pink lotus)
      ctx.fillStyle = '#D68846';
      ctx.beginPath();
      ctx.ellipse(0, 6, l.size * 0.7, l.size * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Candle flame
      ctx.fillStyle = '#FFF8E0';
      ctx.beginPath();
      ctx.ellipse(0, -6, 3.5, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      // Flame tip
      ctx.fillStyle = '#FF9D00';
      ctx.beginPath();
      ctx.arc(0, -11, 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    animId = requestAnimationFrame(loop);
  }
  loop();

  return () => {
    cancelAnimationFrame(animId);
    window.removeEventListener('resize', resize);
    observer.disconnect();
  };
}
