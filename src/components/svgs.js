// Authentic SVG decorative assets and filters for Khmer Wedding Invitation

export const SVG_FILTERS = `
<svg style="position: absolute; width: 0; height: 0; overflow: hidden;" aria-hidden="true">
  <defs>
    <!-- Specular lighting for gold wax seal -->
    <filter id="wax-specular" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3.5" result="blur" />
      <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1.2" specularExponent="24" lighting-color="#FFF8E0" result="specOut">
        <fePointLight x="-50" y="-70" z="220" />
      </feSpecularLighting>
      <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specIn" />
      <feComposite in="SourceGraphic" in2="specIn" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litGraphic" />
    </filter>

    <!-- Metallic Gold Foil Gradient -->
    <linearGradient id="g-foil" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E5C170" />
      <stop offset="25%" stop-color="#FFF4D0" />
      <stop offset="50%" stop-color="#C2943E" />
      <stop offset="75%" stop-color="#F5DA95" />
      <stop offset="100%" stop-color="#AF7E2B" />
    </linearGradient>

    <!-- Wax Seal Gold Gradient -->
    <radialGradient id="g-wax-gold" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFEBB0" />
      <stop offset="35%" stop-color="#DDA94B" />
      <stop offset="70%" stop-color="#AC7720" />
      <stop offset="100%" stop-color="#6E4A0C" />
    </radialGradient>

    <!-- Deep Shadow Filter -->
    <filter id="seal-shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#000000" flood-opacity="0.45" />
    </filter>
  </defs>
</svg>
`;

// Fan-shaped decorative royal crest (no clipart, pure refined geometry & floral curls)
export function getRoyalCrestSVG(width = 80, height = 48) {
  return `
  <svg class="royal-crest-svg" width="${width}" height="${height}" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 4 C48 14 36 20 22 21 C32 25 36 34 38 42 C44 32 47 18 50 4Z" fill="url(#g-foil)" opacity="0.9" />
    <path d="M50 4 C52 14 64 20 78 21 C68 25 64 34 62 42 C56 32 53 18 50 4Z" fill="url(#g-foil)" opacity="0.9" />
    <circle cx="50" cy="18" r="3.5" fill="url(#g-foil)" />
    <circle cx="50" cy="8" r="2" fill="#FFF8E0" />
    <circle cx="35" cy="22" r="2" fill="url(#g-foil)" />
    <circle cx="65" cy="22" r="2" fill="url(#g-foil)" />
    <path d="M50 24 C45 34 34 38 20 38 C32 41 38 48 40 55 C46 47 48 36 50 24Z" fill="url(#g-foil)" opacity="0.8" />
    <path d="M50 24 C55 34 66 38 80 38 C68 41 62 48 60 55 C54 47 52 36 50 24Z" fill="url(#g-foil)" opacity="0.8" />
    <path d="M15 38 C28 40 45 48 50 58 C55 48 72 40 85 38" stroke="url(#g-foil)" stroke-width="1.2" stroke-linecap="round" fill="none" />
  </svg>
  `;
}

// Decorative Corner scroll elements (mirrored with inner SVG transform on inner <g>, NOT with CSS transform)
export function getCornerScrollSVG(position = 'top-left', size = 72) {
  let transform = '';
  if (position === 'top-right') {
    transform = 'transform="translate(100, 0) scale(-1, 1)"';
  } else if (position === 'bottom-left') {
    transform = 'transform="translate(0, 100) scale(1, -1)"';
  } else if (position === 'bottom-right') {
    transform = 'transform="translate(100, 100) scale(-1, -1)"';
  }

  return `
  <svg class="corner-scroll-svg corner-${position}" width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g ${transform}>
      <path d="M6 6 L6 42 C6 30 18 18 30 18 L70 18 C55 18 42 6 42 6 Z" fill="url(#g-foil)" opacity="0.4" />
      <path d="M4 4 L4 55 C4 35 22 22 42 22 L75 22" stroke="url(#g-foil)" stroke-width="1.5" stroke-linecap="round" fill="none" />
      <path d="M8 8 L8 36 C8 24 20 12 32 12 L58 12" stroke="url(#g-foil)" stroke-width="0.8" stroke-dasharray="2 3" fill="none" opacity="0.8" />
      <circle cx="12" cy="12" r="3" fill="url(#g-foil)" />
      <path d="M26 22 C26 30 32 36 40 36 C48 36 50 28 46 24 C42 20 34 22 36 28" stroke="url(#g-foil)" stroke-width="1" fill="none" />
      <circle cx="41" cy="29" r="1.5" fill="#FFF8E0" />
      <path d="M12 28 C12 36 18 44 24 48 C28 51 32 50 32 46 C32 42 26 40 24 44" stroke="url(#g-foil)" stroke-width="0.9" fill="none" opacity="0.75" />
    </g>
  </svg>
  `;
}

// Uneven poured gold wax seal with specular lighting filter
export function getWaxSealSVG(initialsGroom = 'ហេង', initialsBride = 'រិន') {
  return `
  <div class="wax-seal-wrapper" id="wax-seal" title="ចុចដើម្បីបើកធៀប / Tap to open">
    <svg class="wax-seal-svg" viewBox="0 0 140 140" width="108" height="108" xmlns="http://www.w3.org/2000/svg">
      <!-- Poured edge irregular contour -->
      <path class="seal-base" d="
        M 70 8
        C 86 6, 98 12, 108 20
        C 120 30, 128 42, 131 58
        C 134 74, 129 90, 121 103
        C 112 117, 98 128, 82 131
        C 66 134, 49 130, 36 122
        C 21 113, 11 99, 9 82
        C 7 66, 13 50, 22 37
        C 33 22, 51 10, 70 8 Z
      " fill="url(#g-wax-gold)" filter="url(#wax-specular)" />

      <!-- Inner pressed ridge -->
      <circle cx="70" cy="70" r="48" fill="none" stroke="#7A520E" stroke-width="3" opacity="0.65" />
      <circle cx="70" cy="70" r="45.5" fill="none" stroke="#FFF2C7" stroke-width="1.8" opacity="0.85" />
      <circle cx="70" cy="70" r="42" fill="#B48227" opacity="0.35" />

      <!-- Decorative pressed ring dots -->
      <circle cx="70" cy="70" r="39" stroke="url(#g-foil)" stroke-width="1" stroke-dasharray="2 4.5" fill="none" opacity="0.9" />

      <!-- Debossed mini royal crest -->
      <g transform="translate(48, 30) scale(0.44)" opacity="0.95">
        <path d="M25 2 C24 8 18 11 11 12 C16 14 18 19 19 23 C22 17 23 10 25 2Z" fill="#FFF4D0" />
        <path d="M25 2 C26 8 32 11 39 12 C34 14 32 19 31 23 C28 17 27 10 25 2Z" fill="#FFF4D0" />
        <circle cx="25" cy="10" r="2.2" fill="#FFE8A0" />
      </g>

      <!-- Center heart flourish -->
      <g transform="translate(62, 63) scale(0.55)">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FFF3D0" opacity="0.9" />
      </g>

      <!-- Gold Monogram Ring (HTML overlay is used for Khmer text to avoid SVG text clipping) -->
    </svg>
    <div class="seal-khmer-monogram">
      <span class="seal-initial seal-groom">${initialsGroom}</span>
      <span class="seal-heart">♥</span>
      <span class="seal-initial seal-bride">${initialsBride}</span>
    </div>
  </div>
  `;
}

// Couple Name Logo (ឡូហ្គោឈ្មោះ) with flourish connector and flying gold butterfly
export function getNameLogoHTML(data, variant = 'large') {
  const groomShort = data.groom?.shortKm || 'ហេង';
  const brideShort = data.bride?.shortKm || 'រិន';
  const groomEng = data.groom?.nameEn || 'San SongHeng';
  const brideEng = data.bride?.nameEn || 'Chrea Virin';

  return `
  <div class="name-logo-container name-logo-${variant}">
    <div class="name-logo-crest-wrap">
      ${getRoyalCrestSVG(variant === 'large' ? 76 : 52, variant === 'large' ? 44 : 32)}
    </div>
    
    <div class="name-logo-grid">
      <!-- Groom short name (top-left) in Moulpali gold foil -->
      <div class="name-logo-part name-logo-groom">
        <span class="moulpali-foil">${groomShort}</span>
      </div>

      <!-- Center Flourish with Heart & Butterfly -->
      <div class="name-logo-center">
        <svg class="name-flourish-svg" viewBox="0 0 120 40" width="110" height="36" fill="none">
          <path class="flourish-line" d="M10 28 C 35 28, 45 12, 60 20 C 75 28, 85 12, 110 12" stroke="url(#g-foil)" stroke-width="1.8" stroke-linecap="round" />
          <circle cx="60" cy="20" r="3.5" fill="url(#g-foil)" />
          <circle cx="60" cy="20" r="1.5" fill="#FFF8E0" />
        </svg>
        <div class="name-logo-butterfly">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="url(#g-foil)">
            <path d="M12 4c.6 0 1.1.4 1.2 1 .3 1.3 1.2 2.3 2.5 2.7 1.9.5 3.3 2.2 3.3 4.3 0 2.5-2 4.5-4.5 4.5-.4 0-.8-.1-1.2-.2-.2.5-.7.7-1.3.7s-1.1-.2-1.3-.7c-.4.1-.8.2-1.2.2-2.5 0-4.5-2-4.5-4.5 0-2.1 1.4-3.8 3.3-4.3 1.3-.4 2.2-1.4 2.5-2.7.1-.6.6-1 1.2-1zm-2.8 7.2c-.7.2-1.4.6-1.9 1.2-.5.6-.8 1.4-.8 2.2 0 1.4 1.1 2.5 2.5 2.5.3 0 .7-.1 1-.2-.2-.5-.3-1-.3-1.6 0-1.7.7-3.2 1.9-4.3-.8 0-1.6.1-2.4.2zm5.6 0c1.2 1.1 1.9 2.6 1.9 4.3 0 .6-.1 1.1-.3 1.6.3.1.7.2 1 .2 1.4 0 2.5-1.1 2.5-2.5 0-.8-.3-1.6-.8-2.2-.5-.6-1.2-1-1.9-1.2-.8-.1-1.6-.2-2.4-.2z"/>
          </svg>
        </div>
      </div>

      <!-- Bride short name (bottom-right) in Moulpali gold foil -->
      <div class="name-logo-part name-logo-bride">
        <span class="moulpali-foil">${brideShort}</span>
      </div>
    </div>

    ${variant === 'large' ? `
      <div class="name-logo-english-row">
        <span class="eng-name">${groomEng}</span>
        <span class="eng-amp">&</span>
        <span class="eng-name">${brideEng}</span>
      </div>
    ` : ''}
  </div>
  `;
}
