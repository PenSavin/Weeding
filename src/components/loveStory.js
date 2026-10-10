// Love story section: pinned sideways photo strip, day-to-dusk shift, poetic Khmer captions

import { getRoyalCrestSVG } from './svgs.js';
import { t } from '../data/i18n.js';

export function renderLoveStory(data) {
  const stories = data.loveStory || [];

  return `
  <section id="love-story-section" class="love-story-section">
    <!-- Background transition overlay (shifts day to dusk) -->
    <div class="story-dusk-overlay" id="story-dusk-overlay"></div>

    <div class="story-header-wrap">
      <div class="story-crest">${getRoyalCrestSVG(64, 38)}</div>
      <h2 class="story-heading moul-font">${t('loveStoryHeading')}</h2>
      <p class="story-subtitle">Our Journey of Love</p>
    </div>

    <!-- Pinned horizontal photo strip container -->
    <div class="story-strip-outer" id="story-strip-outer">
      <div class="story-strip-track" id="story-strip-track">
        ${stories.map((s, idx) => `
          <div class="story-card" data-index="${idx}">
            <div class="story-card-inner">
              <div class="story-photo-box">
                <img src="${s.photo}" alt="${s.titleKm}" class="story-img" loading="lazy" />
                <div class="story-year-tag moul-font">${s.year}</div>
                <div class="story-photo-vignette"></div>
              </div>
              <div class="story-content-box">
                <h3 class="story-item-title moul-font">${s.titleKm}</h3>
                <p class="story-item-caption">${s.captionKm}</p>
                <span class="story-en-caption">${s.captionEn}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Scroll / Drag indicator -->
    <div class="story-indicator">
      <span class="indicator-dot active"></span>
      <span class="indicator-dot"></span>
      <span class="indicator-dot"></span>
    </div>
  </section>
  `;
}

export function initLoveStoryScroll() {
  const section = document.getElementById('love-story-section');
  const duskOverlay = document.getElementById('story-dusk-overlay');
  const stripTrack = document.getElementById('story-strip-track');
  const dots = document.querySelectorAll('.story-indicator .indicator-dot');

  if (!section || !duskOverlay) return;

  const handleScroll = () => {
    const rect = section.getBoundingClientRect();
    const windowH = window.innerHeight;
    
    // Background day to dusk gradient shift as section scrolls through
    const progress = Math.min(1, Math.max(0, (windowH - rect.top) / (rect.height + windowH)));
    duskOverlay.style.opacity = `${progress * 0.85}`;

    // Track active slide in horizontal scroll
    if (stripTrack && dots.length > 0) {
      const scrollLeft = stripTrack.scrollLeft;
      const cardWidth = stripTrack.firstElementChild?.clientWidth || 320;
      const activeIdx = Math.min(dots.length - 1, Math.round(scrollLeft / cardWidth));
      dots.forEach((d, i) => {
        if (i === activeIdx) d.classList.add('active');
        else d.classList.remove('active');
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  stripTrack?.addEventListener('scroll', handleScroll, { passive: true });
}
