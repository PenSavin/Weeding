// Masonry photo gallery with swipeable full-screen lightbox viewer

import { getRoyalCrestSVG } from './svgs.js';
import { t } from '../data/i18n.js';

export function renderGallery(data) {
  const photos = data.gallery || [];

  return `
  <section id="gallery-section" class="gallery-section">
    <div class="gallery-container">
      <div class="gallery-header">
        <div class="gallery-crest">${getRoyalCrestSVG(64, 38)}</div>
        <h2 class="gallery-title moul-font">${t('galleryHeading')}</h2>
        <p class="gallery-subtitle">Pre-Wedding Memories</p>
      </div>

      <!-- Masonry Grid -->
      <div class="gallery-masonry" id="gallery-masonry">
        ${photos.map((p, idx) => `
          <div class="gallery-item ${p.aspect === 'tall' ? 'gallery-item-tall' : ''}" data-index="${idx}">
            <div class="gallery-card">
              <img src="${p.url}" alt="${p.titleKm}" class="gallery-img" loading="lazy" />
              <div class="gallery-hover-overlay">
                <span class="gallery-hover-icon">🔍</span>
                <span class="gallery-hover-title">${p.titleKm}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Full-screen Lightbox Modal -->
    <div id="gallery-lightbox" class="gallery-lightbox hidden" role="dialog" aria-modal="true">
      <div class="lightbox-backdrop"></div>
      
      <button class="lightbox-btn lightbox-close" id="lightbox-close" aria-label="Close">✕</button>
      <button class="lightbox-btn lightbox-prev" id="lightbox-prev" aria-label="Previous">❮</button>
      <button class="lightbox-btn lightbox-next" id="lightbox-next" aria-label="Next">❯</button>

      <div class="lightbox-content" id="lightbox-content">
        <img id="lightbox-img" src="" alt="Full photo" class="lightbox-img" />
        <div class="lightbox-caption" id="lightbox-caption"></div>
      </div>
    </div>
  </section>
  `;
}

export function initGalleryLightbox(photos = []) {
  const items = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('gallery-lightbox');
  const imgEl = document.getElementById('lightbox-img');
  const captionEl = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const backdrop = document.querySelector('.lightbox-backdrop');

  if (!lightbox || !imgEl || photos.length === 0) return;

  let currentIndex = 0;

  const showPhoto = (index) => {
    currentIndex = (index + photos.length) % photos.length;
    const photo = photos[currentIndex];
    imgEl.src = photo.url;
    if (captionEl) captionEl.textContent = photo.titleKm;
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    lightbox.classList.add('hidden');
    document.body.style.overflow = '';
  };

  items.forEach((item) => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.getAttribute('data-index') || '0', 10);
      showPhoto(idx);
    });
  });

  closeBtn?.addEventListener('click', close);
  backdrop?.addEventListener('click', close);
  prevBtn?.addEventListener('click', () => showPhoto(currentIndex - 1));
  nextBtn?.addEventListener('click', () => showPhoto(currentIndex + 1));

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('hidden')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') showPhoto(currentIndex - 1);
    if (e.key === 'ArrowRight') showPhoto(currentIndex + 1);
  });

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) showPhoto(currentIndex + 1); // swipe left
    if (touchEndX - touchStartX > 50) showPhoto(currentIndex - 1); // swipe right
  }, { passive: true });
}
