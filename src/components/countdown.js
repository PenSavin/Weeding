// Countdown in Khmer numerals with slow blessing marquee behind

import { toKhmerNum } from '../data/wedding.js';
import { getRoyalCrestSVG } from './svgs.js';
import { t } from '../data/i18n.js';

export function renderCountdown(data) {
  return `
  <section id="countdown-section" class="countdown-section">
    <!-- Slow blessing marquee in background -->
    <div class="blessing-marquee-wrap" aria-hidden="true">
      <div class="blessing-marquee-track">
        <span class="marquee-text">សិរីសួស្តី ជ័យមង្គល វិបុលសុខ មហាប្រសើរ ✦ អាយុ វណ្ណៈ សុខៈ ពលៈ ✦ សុភមង្គល ភព្វព្រេងសំណាងល្អ ✦ ស្រឡាញ់គ្នាផ្អែមល្ហែមរហូតដល់ចាស់កោងខ្នង ✦ សិរីសួស្តី ជ័យមង្គល វិបុលសុខ មហាប្រសើរ ✦ </span>
        <span class="marquee-text">សិរីសួស្តី ជ័យមង្គល វិបុលសុខ មហាប្រសើរ ✦ អាយុ វណ្ណៈ សុខៈ ពលៈ ✦ សុភមង្គល ភព្វព្រេងសំណាងល្អ ✦ ស្រឡាញ់គ្នាផ្អែមល្ហែមរហូតដល់ចាស់កោងខ្នង ✦ សិរីសួស្តី ជ័យមង្គល វិបុលសុខ មហាប្រសើរ ✦ </span>
      </div>
    </div>

    <div class="countdown-container">
      <div class="countdown-crest">
        ${getRoyalCrestSVG(64, 38)}
      </div>

      <h2 class="countdown-heading moul-font">${t('countdownHeading')}</h2>
      
      <!-- Live Countdown Grid -->
      <div class="countdown-grid" id="countdown-grid">
        <div class="countdown-item">
          <div class="countdown-box">
            <span class="countdown-num moulpali-foil" id="cd-days">--</span>
          </div>
          <span class="countdown-label">${t('days')}</span>
        </div>

        <div class="countdown-colon">:</div>

        <div class="countdown-item">
          <div class="countdown-box">
            <span class="countdown-num moulpali-foil" id="cd-hours">--</span>
          </div>
          <span class="countdown-label">${t('hours')}</span>
        </div>

        <div class="countdown-colon">:</div>

        <div class="countdown-item">
          <div class="countdown-box">
            <span class="countdown-num moulpali-foil" id="cd-mins">--</span>
          </div>
          <span class="countdown-label">${t('minutes')}</span>
        </div>

        <div class="countdown-colon">:</div>

        <div class="countdown-item">
          <div class="countdown-box">
            <span class="countdown-num moulpali-foil" id="cd-secs">--</span>
          </div>
          <span class="countdown-label">${t('seconds')}</span>
        </div>
      </div>

      <!-- Celebratory banner if time is now -->
      <div id="countdown-celebration" class="countdown-celebration hidden">
        <div class="celebration-badge">
          🎉 ថ្ងៃសិរីសួស្តីមង្គលការបានមកដល់ហើយ! (The Auspicious Wedding Day Is Here!) 🎉
        </div>
      </div>

      <div class="countdown-date-note">
        <span>${data.date?.solarKm || 'ថ្ងៃអាទិត្យ ទី១០ ខែធ្នូ ឆ្នាំ២០២៦'}</span>
      </div>
    </div>
  </section>
  `;
}

export function initCountdownTimer(targetTimestampOrIso) {
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');
  const grid = document.getElementById('countdown-grid');
  const celeb = document.getElementById('countdown-celebration');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  // Resolve target timestamp accurately
  let targetTime;
  if (typeof targetTimestampOrIso === 'number') {
    targetTime = targetTimestampOrIso;
  } else if (typeof targetTimestampOrIso === 'string') {
    targetTime = new Date(targetTimestampOrIso).getTime();
  }

  // If invalid or in past, default to a future wedding date (e.g. 60 days ahead)
  const now = Date.now();
  if (!targetTime || isNaN(targetTime) || targetTime <= now) {
    // If it was in the past, let's set a realistic future target (e.g. 60 days from now)
    targetTime = now + (60 * 24 * 60 * 60 * 1000);
  }

  function update() {
    const current = Date.now();
    const diff = targetTime - current;

    if (diff <= 0) {
      daysEl.textContent = '០០';
      hoursEl.textContent = '០០';
      minsEl.textContent = '០០';
      secsEl.textContent = '០០';
      celeb?.classList.remove('hidden');
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);

    const pad = (n) => String(n).padStart(2, '0');

    daysEl.textContent = toKhmerNum(pad(d));
    hoursEl.textContent = toKhmerNum(pad(h));
    minsEl.textContent = toKhmerNum(pad(m));
    secsEl.textContent = toKhmerNum(pad(s));
  }

  update();
  const timer = setInterval(update, 1000);
  return () => clearInterval(timer);
}
