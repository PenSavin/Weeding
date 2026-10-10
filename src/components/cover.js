// Cover section with personalized Guest greeting (merged with Hero, fits one desktop screen)

import { getRoyalCrestSVG, getCornerScrollSVG, getNameLogoHTML } from './svgs.js';
import { t } from '../data/i18n.js';

export function renderCover(data) {
  const guestName = data.guestName || 'ភ្ញៀវកិត្តិយសដ៏ថ្លៃថ្លា';

  return `
  <section id="cover-section" class="cover-section">
    <!-- Full-screen darkened couple photo background with ambient glow -->
    <div class="cover-bg-wrap">
      <div class="cover-bg-img" style="background-image: url('${data.photos?.cover || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80'}');"></div>
      <div class="cover-bg-vignette"></div>
      <canvas id="ambient-canvas" class="ambient-canvas"></canvas>
    </div>

    <!-- Decorative Corner Elements -->
    <div class="cover-corner corner-tl">${getCornerScrollSVG('top-left', 84)}</div>
    <div class="cover-corner corner-tr">${getCornerScrollSVG('top-right', 84)}</div>
    <div class="cover-corner corner-bl">${getCornerScrollSVG('bottom-left', 84)}</div>
    <div class="cover-corner corner-br">${getCornerScrollSVG('bottom-right', 84)}</div>

    <!-- Cover Content Container -->
    <div class="cover-container">
      
      <!-- Top Crest & Traditional Heading -->
      <div class="cover-top-block">
        <div class="cover-crest">${getRoyalCrestSVG(88, 52)}</div>
        <h1 class="cover-celebration-title moul-font">${t('weddingCelebration')}</h1>
        <div class="cover-sub-divider">
          <span class="divider-line"></span>
          <span class="divider-diamond">✦</span>
          <span class="divider-line"></span>
        </div>
      </div>

      <!-- Couple Name Logo & English Names -->
      <div class="cover-name-logo-block">
        ${getNameLogoHTML(data, 'large')}
      </div>

      <!-- Personalized Guest Invitation Badge -->
      <div class="cover-guest-callout">
        <div class="guest-callout-inner">
          <span class="callout-invite-word">${t('cordiallyInvite')} ៖</span>
          <span class="callout-guest-name moul-font">${guestName}</span>
        </div>
      </div>

      <!-- Date Grid: ថ្ងៃ | ទី | ខែ | ឆ្នាំ -->
      <div class="cover-date-grid">
        <div class="date-col">
          <span class="date-label">${t('dayCol')}</span>
          <span class="date-val">${data.date?.solarKm?.split(' ')[0] || 'អាទិត្យ'}</span>
        </div>
        <div class="date-divider">|</div>
        <div class="date-col">
          <span class="date-label">${t('dateCol')}</span>
          <span class="date-val">${data.date?.dayKm || '១០'}</span>
        </div>
        <div class="date-divider">|</div>
        <div class="date-col">
          <span class="date-label">${t('monthCol')}</span>
          <span class="date-val">${data.date?.monthKm || '១០'}</span>
        </div>
        <div class="date-divider">|</div>
        <div class="date-col">
          <span class="date-label">${t('yearCol')}</span>
          <span class="date-val">${data.date?.yearKm || '២០២៦'}</span>
        </div>
      </div>

      <!-- Khmer Lunar Date -->
      <div class="cover-lunar-date">
        <p class="lunar-text">${data.date?.lunarKm || 'ត្រូវនឹង ថ្ងៃ១៥កើត ខែអស្សុជ ឆ្នាំរោង ឆស័ក ព.ស. ២៥៧០'}</p>
      </div>

      <!-- Venue Name -->
      <div class="cover-venue-block">
        <div class="venue-icon">🏛️</div>
        <div class="venue-text">${data.venue?.nameKm || 'OCIC ជ្រោយចង្វារ រាជធានីភ្នំពេញ'}</div>
      </div>

      <!-- Scroll cue -->
      <div class="cover-scroll-cue" id="cover-scroll-cue">
        <span class="scroll-label">${t('scrollDown')}</span>
        <div class="scroll-mouse-anim">
          <div class="scroll-wheel"></div>
        </div>
      </div>

    </div>
  </section>
  `;
}

export function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
  let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

  const resize = () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight;
  };
  window.addEventListener('resize', resize);

  const particles = Array.from({ length: 32 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 2 + 0.8,
    speedY: Math.random() * 0.45 + 0.15,
    speedX: (Math.random() - 0.5) * 0.2,
    opacity: Math.random() * 0.7 + 0.2,
    fadeSpeed: Math.random() * 0.008 + 0.004
  }));

  let animId;
  function loop() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      p.y -= p.speedY;
      p.x += p.speedX;
      p.opacity += p.fadeSpeed;
      if (p.opacity > 0.85 || p.opacity < 0.15) {
        p.fadeSpeed = -p.fadeSpeed;
      }
      if (p.y < 0) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(236, 200, 128, ${Math.max(0, p.opacity)})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#ECC880';
      ctx.fill();
    }
    animId = requestAnimationFrame(loop);
  }
  loop();

  return () => {
    cancelAnimationFrame(animId);
    window.removeEventListener('resize', resize);
  };
}
