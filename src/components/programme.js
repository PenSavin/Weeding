// Programme section with gold thread drawing down and illuminating ritual line icons

import { getRoyalCrestSVG } from './svgs.js';

function getRitualIconSVG(iconId) {
  switch (iconId) {
    case 'procession':
      // Golden tray / procession gift
      return `
      <svg viewBox="0 0 48 48" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 28 L40 28 L36 38 L12 38 Z" />
        <path d="M24 10 L24 28" />
        <path d="M16 18 C20 12 28 12 32 18" />
        <circle cx="24" cy="10" r="3" />
        <path d="M4 28 L44 28" />
      </svg>`;
    case 'ancestors':
      // Homage hands & incense / candles
      return `
      <svg viewBox="0 0 48 48" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 38 C16 30 20 20 24 14 C28 20 32 30 32 38 Z" />
        <path d="M24 14 L24 6" />
        <circle cx="24" cy="5" r="2" fill="currentColor" />
        <path d="M12 42 L36 42" />
        <path d="M18 26 C22 28 26 28 30 26" />
      </svg>`;
    case 'haircut':
      // Scissors & blessing comb
      return `
      <svg viewBox="0 0 48 48" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="14" cy="36" r="6" />
        <circle cx="34" cy="36" r="6" />
        <line x1="18" y1="32" x2="36" y2="10" />
        <line x1="30" y1="32" x2="12" y2="10" />
        <circle cx="24" cy="21" r="2" fill="currentColor" />
      </svg>`;
    case 'knots':
      // Sacred knot tying & rotating candle lotus
      return `
      <svg viewBox="0 0 48 48" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M24 8 C18 18 12 24 12 32 C12 38 17 42 24 42 C31 42 36 38 36 32 C36 24 30 18 24 8 Z" />
        <path d="M24 16 C22 22 18 26 18 32" />
        <path d="M24 16 C26 22 30 26 30 32" />
        <circle cx="24" cy="28" r="3" fill="currentColor" />
      </svg>`;
    case 'banquet':
      // Cheers / banquet glasses
      return `
      <svg viewBox="0 0 48 48" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 8 L22 8 L22 20 C22 24 18 26 17 26 L17 38 L24 38" />
        <path d="M36 8 L26 8 L26 20 C26 24 30 26 31 26 L31 38 L24 38" />
        <path d="M12 40 L36 40" />
        <path d="M24 14 L24 8" />
        <circle cx="24" cy="6" r="2" fill="currentColor" />
      </svg>`;
    default:
      return `<circle cx="24" cy="24" r="10" stroke="currentColor" stroke-width="2" />`;
  }
}

export function renderProgramme(data) {
  const items = data.program || [];

  return `
  <section id="programme-section" class="programme-section">
    <div class="programme-container">
      
      <div class="programme-header">
        <div class="programme-crest">${getRoyalCrestSVG(68, 40)}</div>
        <!-- Strict requirement: heading ONLY "កម្មវិធី" -->
        <h2 class="programme-main-heading moul-font">កម្មវិធី</h2>
        <div class="programme-gold-bar"></div>
      </div>

      <!-- Timeline with gold thread -->
      <div class="programme-timeline" id="programme-timeline">
        <!-- SVG Gold Thread line -->
        <div class="gold-thread-track">
          <div class="gold-thread-fill" id="gold-thread-fill"></div>
        </div>

        <div class="programme-items-list">
          ${items.map((item, idx) => `
            <div class="programme-item" data-index="${idx}">
              <!-- Icon Node that lights up -->
              <div class="programme-node">
                <div class="node-halo"></div>
                <div class="node-icon-box">
                  ${getRitualIconSVG(item.iconId)}
                </div>
              </div>

              <!-- Content card -->
              <div class="programme-card">
                <div class="programme-time-badge">
                  <span class="time-text">${item.time}</span>
                  <span class="time-en">${item.timeEn}</span>
                </div>
                <h3 class="programme-title moul-font">${item.titleKm}</h3>
                <p class="programme-desc">${item.descKm}</p>
              </div>
            </div>
          `).join('')}
        </div>

      </div>

    </div>
  </section>
  `;
}

export function initProgrammeScroll() {
  const timeline = document.getElementById('programme-timeline');
  const threadFill = document.getElementById('gold-thread-fill');
  const items = document.querySelectorAll('.programme-item');

  if (!timeline || !threadFill) return;

  const handleScroll = () => {
    const rect = timeline.getBoundingClientRect();
    const windowH = window.innerHeight;
    
    // Calculate scroll progress through timeline
    const totalDist = rect.height;
    const currentDist = Math.max(0, (windowH * 0.75) - rect.top);
    const progress = Math.min(1, Math.max(0, currentDist / totalDist));

    // Update gold thread height
    threadFill.style.height = `${progress * 100}%`;

    // Light up nodes as the gold thread reaches them
    items.forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      if (itemRect.top < windowH * 0.7) {
        item.classList.add('lit');
      } else {
        item.classList.remove('lit');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}
