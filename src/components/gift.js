// Wedding Gift (ចំណងដៃ) section: always visible QR codes, custom uploaded KHQR support, Save QR, and Copy Account

import { getRoyalCrestSVG } from './svgs.js';
import { t } from '../data/i18n.js';

function getMockKhqrSVG(name = 'SAN SONGHENG', account = '000 123 456', bank = 'ABA Bank (KHQR)') {
  return `
  <svg class="khqr-card-svg" viewBox="0 0 280 340" width="100%" height="340" xmlns="http://www.w3.org/2000/svg">
    <!-- KHQR Red Header Bar -->
    <rect x="0" y="0" width="280" height="340" rx="16" fill="#FFFFFF" />
    <rect x="0" y="0" width="280" height="58" rx="16" fill="#D61B22" />
    <rect x="0" y="44" width="280" height="14" fill="#D61B22" />
    <text x="140" y="38" font-family="'Kantumruy Pro', sans-serif" font-size="20" font-weight="bold" fill="#FFFFFF" text-anchor="middle">KHQR</text>

    <!-- Recipient Info -->
    <text x="140" y="85" font-family="'Kantumruy Pro', sans-serif" font-size="14" font-weight="700" fill="#14221A" text-anchor="middle">${name}</text>
    <text x="140" y="104" font-family="monospace" font-size="13" fill="#666666" text-anchor="middle">${account}</text>

    <!-- QR Code Pattern -->
    <rect x="35" y="120" width="210" height="180" rx="8" fill="#F8F9FA" stroke="#E9ECEF" stroke-width="1.5" />
    <!-- Center Mock Matrix Elements -->
    <g fill="#14221A">
      <!-- Corner Markers -->
      <rect x="50" y="135" width="40" height="40" rx="4" />
      <rect x="58" y="143" width="24" height="24" fill="#FFFFFF" />
      <rect x="64" y="149" width="12" height="12" />

      <rect x="190" y="135" width="40" height="40" rx="4" />
      <rect x="198" y="143" width="24" height="24" fill="#FFFFFF" />
      <rect x="204" y="149" width="12" height="12" />

      <rect x="50" y="245" width="40" height="40" rx="4" />
      <rect x="58" y="253" width="24" height="24" fill="#FFFFFF" />
      <rect x="64" y="259" width="12" height="12" />

      <!-- Data Dots -->
      <rect x="105" y="135" width="8" height="8" />
      <rect x="120" y="135" width="8" height="8" />
      <rect x="140" y="135" width="8" height="8" />
      <rect x="155" y="135" width="8" height="8" />
      <rect x="170" y="135" width="8" height="8" />

      <rect x="105" y="150" width="14" height="8" />
      <rect x="135" y="150" width="8" height="14" />
      <rect x="150" y="150" width="14" height="8" />
      <rect x="170" y="150" width="8" height="8" />

      <rect x="105" y="170" width="8" height="8" />
      <rect x="120" y="170" width="18" height="8" />
      <rect x="150" y="170" width="18" height="8" />

      <!-- Center Logo Badge -->
      <circle cx="140" cy="210" r="16" fill="#D61B22" />
      <text x="140" y="215" font-family="'Kantumruy Pro', sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF" text-anchor="middle">៛ / $</text>

      <rect x="105" y="245" width="14" height="8" />
      <rect x="130" y="245" width="8" height="14" />
      <rect x="150" y="245" width="18" height="8" />
      <rect x="175" y="245" width="8" height="8" />

      <rect x="105" y="265" width="8" height="14" />
      <rect x="125" y="265" width="14" height="8" />
      <rect x="150" y="265" width="8" height="8" />
      <rect x="170" y="265" width="14" height="14" />
      <rect x="195" y="265" width="18" height="8" />
    </g>

    <!-- Footer bank watermark -->
    <text x="140" y="322" font-family="'Kantumruy Pro', sans-serif" font-size="11" fill="#888888" text-anchor="middle">${bank}</text>
  </svg>
  `;
}

export function renderGift(data) {
  const groomAba = data.gift?.groomAba || { accountName: 'SAN SONGHENG', accountNumber: '000 123 456', bank: 'ABA Bank (KHQR)', qrImage: '' };
  const brideAba = data.gift?.brideAba || { accountName: 'CHREA VIRIN', accountNumber: '000 789 101', bank: 'ABA Bank (KHQR)', qrImage: '' };

  return `
  <section id="gift-section" class="gift-section">
    <div class="gift-container">
      <div class="gift-header">
        <div class="gift-crest">${getRoyalCrestSVG(64, 38)}</div>
        <h2 class="gift-title moul-font">${t('giftHeading')}</h2>
        <p class="gift-sub">${t('giftSub')}</p>
      </div>

      <!-- QR Cards (Always visible, no toggle) -->
      <div class="gift-cards-grid">
        
        <!-- Groom KHQR Card -->
        <div class="gift-card">
          <div class="gift-card-badge moul-font">${t('groomLabel')}</div>
          <div class="gift-qr-box" id="qr-box-groom">
            ${groomAba.qrImage ? `
              <img src="${groomAba.qrImage}" alt="Groom KHQR" class="user-uploaded-qr" id="img-qr-groom" />
            ` : getMockKhqrSVG(groomAba.accountName, groomAba.accountNumber, groomAba.bank)}
          </div>
          <div class="gift-card-info">
            <span class="acc-bank-tag">${groomAba.bank || 'ABA Bank (KHQR)'}</span>
            <span class="acc-name">${groomAba.accountName}</span>
            <span class="acc-number">${groomAba.accountNumber}</span>
          </div>
          <div class="gift-card-actions">
            <button class="btn-gift btn-save-qr" data-target="qr-box-groom" data-filename="KHQR-Groom-${groomAba.accountName}.png">
              <span>📥</span> ${t('saveQr')}
            </button>
            <button class="btn-gift btn-copy-acc" data-account="${groomAba.accountNumber}">
              <span>📋</span> ${t('copyAccount')}
            </button>
          </div>
        </div>

        <!-- Bride KHQR Card -->
        <div class="gift-card">
          <div class="gift-card-badge moul-font">${t('brideLabel')}</div>
          <div class="gift-qr-box" id="qr-box-bride">
            ${brideAba.qrImage ? `
              <img src="${brideAba.qrImage}" alt="Bride KHQR" class="user-uploaded-qr" id="img-qr-bride" />
            ` : getMockKhqrSVG(brideAba.accountName, brideAba.accountNumber, brideAba.bank)}
          </div>
          <div class="gift-card-info">
            <span class="acc-bank-tag">${brideAba.bank || 'ABA Bank (KHQR)'}</span>
            <span class="acc-name">${brideAba.accountName}</span>
            <span class="acc-number">${brideAba.accountNumber}</span>
          </div>
          <div class="gift-card-actions">
            <button class="btn-gift btn-save-qr" data-target="qr-box-bride" data-filename="KHQR-Bride-${brideAba.accountName}.png">
              <span>📥</span> ${t('saveQr')}
            </button>
            <button class="btn-gift btn-copy-acc" data-account="${brideAba.accountNumber}">
              <span>📋</span> ${t('copyAccount')}
            </button>
          </div>
        </div>

      </div>
    </div>
  </section>
  `;
}

export function initGiftEvents() {
  // Copy Account buttons
  document.querySelectorAll('.btn-copy-acc').forEach((btn) => {
    btn.addEventListener('click', () => {
      const acc = btn.getAttribute('data-account');
      if (acc) {
        navigator.clipboard.writeText(acc).then(() => {
          const original = btn.innerHTML;
          btn.innerHTML = `<span>✓</span> បានចម្លង!`;
          setTimeout(() => {
            btn.innerHTML = original;
          }, 2000);
        });
      }
    });
  });

  // Save QR buttons
  document.querySelectorAll('.btn-save-qr').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const filename = btn.getAttribute('data-filename') || 'KHQR.png';
      const box = document.getElementById(targetId);
      if (!box) return;

      const userImg = box.querySelector('.user-uploaded-qr');
      if (userImg) {
        // Direct download of uploaded QR image
        const a = document.createElement('a');
        a.download = filename;
        a.href = userImg.src;
        a.click();
        return;
      }

      // If SVG template, render to canvas and download PNG
      const svg = box.querySelector('svg');
      if (!svg) return;

      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      canvas.width = 560;
      canvas.height = 680;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const a = document.createElement('a');
        a.download = filename;
        a.href = canvas.toDataURL('image/png');
        a.click();
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    });
  });
}
