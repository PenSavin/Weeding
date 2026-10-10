// Main entry point for Khmer Wedding Digital Invitation

import './style.css';
import { getWeddingData, hydrateStoredImages } from './data/wedding.js';
import { SVG_FILTERS } from './components/svgs.js';
import { renderTopBar, initTopBarEvents } from './components/topBar.js';
import { renderEnvelope, initEnvelopeAnimation } from './components/envelope.js';
import { renderCover, initAmbientCanvas } from './components/cover.js';
import { renderFormalSection } from './components/formalSection.js';
import { renderCountdown, initCountdownTimer } from './components/countdown.js';
import { renderProgramme, initProgrammeScroll } from './components/programme.js';
import { renderLoveStory, initLoveStoryScroll } from './components/loveStory.js';
import { renderCandlelight, initCandlelightCanvas } from './components/candlelight.js';
import { renderGallery, initGalleryLightbox } from './components/gallery.js';
import { renderVenue, initCalendarDownload } from './components/venue.js';
import { renderGift, initGiftEvents } from './components/gift.js';
import { renderThankYou, initThankYouEvents } from './components/thankYou.js';
import { renderEditFormModal, initEditFormEvents } from './components/editForm.js';
import Lenis from 'lenis';

function renderApp() {
  const app = document.getElementById('app');
  if (!app) return;

  const data = getWeddingData();

  app.innerHTML = `
    ${SVG_FILTERS}
    ${renderTopBar(data)}
    <main id="main-content">
      ${renderEnvelope(data)}
      ${renderCover(data)}
      ${renderFormalSection(data)}
      ${renderCountdown(data)}
      ${renderProgramme(data)}
      ${renderLoveStory(data)}
      ${renderCandlelight()}
      ${renderGallery(data)}
      ${renderVenue(data)}
      ${renderGift(data)}
      ${renderThankYou(data)}
    </main>

    <!-- Footer Credit -->
    <footer class="site-footer">
      <p class="footer-credit">
        Design inspired by Someth Phay · <a href="https://somethphay.me" target="_blank" rel="noopener noreferrer">somethphay.me</a>
      </p>
    </footer>

    <!-- Personal details & Guest Name Customizer Modal -->
    ${renderEditFormModal()}
  `;

  // Initialize event handlers & animations
  initTopBarEvents(() => renderApp());
  initEnvelopeAnimation(() => {
    console.log('Envelope opened successfully.');
  });
  initAmbientCanvas();
  initCountdownTimer(data.date?.isoDate || data.date?.targetTimestamp);
  initProgrammeScroll();
  initLoveStoryScroll();
  initCandlelightCanvas();
  initGalleryLightbox(data.gallery || []);
  initCalendarDownload(data);
  initGiftEvents();
  initThankYouEvents(data);
  initEditFormEvents(() => renderApp());
}

// Initial Render
renderApp();
hydrateStoredImages();

// Smooth scrolling with Lenis on desktop
if (window.innerWidth > 768) {
  try {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  } catch (err) {
    console.warn('Lenis smooth scroll initialization:', err);
  }
}

// Reactive listen for data changes
window.addEventListener('weddingDataChanged', () => {
  renderApp();
});
