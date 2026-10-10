// Thank You section: candles lighting up one by one, social share buttons, and couple name logo

import { getRoyalCrestSVG, getNameLogoHTML } from './svgs.js';
import { t } from '../data/i18n.js';

export function renderThankYou(data) {
  return `
  <section id="thankyou-section" class="thankyou-section">
    <div class="thankyou-container">
      
      <!-- Top crest -->
      <div class="thankyou-crest">
        ${getRoyalCrestSVG(72, 42)}
      </div>

      <!-- Candles lighting up one by one -->
      <div class="thankyou-candles-row" id="thankyou-candles">
        <div class="candle-item" data-index="0">
          <div class="candle-flame">
            <div class="flame-glow"></div>
            <div class="flame-core"></div>
          </div>
          <div class="candle-wax wax-short"></div>
        </div>

        <div class="candle-item" data-index="1">
          <div class="candle-flame">
            <div class="flame-glow"></div>
            <div class="flame-core"></div>
          </div>
          <div class="candle-wax wax-tall"></div>
        </div>

        <div class="candle-item" data-index="2">
          <div class="candle-flame">
            <div class="flame-glow"></div>
            <div class="flame-core"></div>
          </div>
          <div class="candle-wax wax-center"></div>
        </div>

        <div class="candle-item" data-index="3">
          <div class="candle-flame">
            <div class="flame-glow"></div>
            <div class="flame-core"></div>
          </div>
          <div class="candle-wax wax-tall"></div>
        </div>

        <div class="candle-item" data-index="4">
          <div class="candle-flame">
            <div class="flame-glow"></div>
            <div class="flame-core"></div>
          </div>
          <div class="candle-wax wax-short"></div>
        </div>
      </div>

      <!-- Heading -->
      <h2 class="thankyou-heading moul-font">${t('thankYouHeading')}</h2>
      
      <!-- Heartfelt appreciation text -->
      <p class="thankyou-text">
        ${t('thankYouText')}
      </p>

      <!-- Share Buttons Grid -->
      <div class="thankyou-share-box">
        <div class="share-box-title">ចែករំលែកធៀបមង្គលការ (Share Invitation)</div>
        <div class="share-buttons-grid">
          
          <!-- Telegram -->
          <button class="btn-share btn-share-telegram" id="btn-share-telegram">
            <span class="share-icon">✈️</span>
            <span class="share-text">${t('shareViaTelegram')}</span>
          </button>

          <!-- Messenger -->
          <button class="btn-share btn-share-messenger" id="btn-share-messenger">
            <span class="share-icon">💬</span>
            <span class="share-text">${t('shareViaMessenger')}</span>
          </button>

          <!-- Facebook -->
          <button class="btn-share btn-share-facebook" id="btn-share-facebook">
            <span class="share-icon">🌐</span>
            <span class="share-text">${t('shareViaFacebook')}</span>
          </button>

          <!-- Copy Link -->
          <button class="btn-share btn-share-copy" id="btn-share-copy">
            <span class="share-icon">🔗</span>
            <span class="share-text" id="share-copy-text">${t('copyLink')}</span>
          </button>

        </div>
      </div>

      <!-- Bottom Couple Name Logo -->
      <div class="thankyou-name-logo">
        ${getNameLogoHTML(data, 'large')}
      </div>

    </div>
  </section>
  `;
}

export function initThankYouEvents(data) {
  const candlesRow = document.getElementById('thankyou-candles');
  const candles = document.querySelectorAll('.candle-item');

  // Sequential candle lighting when scrolled into view
  if (candlesRow && candles.length > 0) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        candles.forEach((c, idx) => {
          setTimeout(() => {
            c.classList.add('lit');
          }, idx * 240);
        });
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(candlesRow);
  }

  const pageUrl = window.location.href;
  const groom = data.groom?.nameKm || 'សាន សុងហេង';
  const bride = data.bride?.nameKm || 'ជ្រា វីរិន';
  const shareTitle = `ធៀបអាពាហ៍ពិពាហ៍ | ${groom} & ${bride}`;

  // Telegram
  document.getElementById('btn-share-telegram')?.addEventListener('click', () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareTitle)}`;
    window.open(url, '_blank');
  });

  // Facebook
  document.getElementById('btn-share-facebook')?.addEventListener('click', () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
    window.open(url, '_blank');
  });

  // Messenger
  document.getElementById('btn-share-messenger')?.addEventListener('click', () => {
    const url = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(pageUrl)}&app_id=291494419107518&redirect_uri=${encodeURIComponent(pageUrl)}`;
    window.open(url, '_blank');
  });

  // Copy Link
  const copyBtn = document.getElementById('btn-share-copy');
  const copyText = document.getElementById('share-copy-text');
  if (copyBtn && copyText) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(pageUrl).then(() => {
        const prev = copyText.textContent;
        copyText.textContent = t('linkCopied');
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyText.textContent = prev;
          copyBtn.classList.remove('copied');
        }, 2200);
      });
    });
  }
}
