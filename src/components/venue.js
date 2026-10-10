// Venue section with embedded Google Maps, direct links, and dynamic .ics Calendar generator

import { getRoyalCrestSVG } from './svgs.js';
import { t } from '../data/i18n.js';

export function renderVenue(data) {
  const venue = data.venue || {};
  const groom = data.groom?.nameKm || 'សាន សុងហេង';
  const bride = data.bride?.nameKm || 'ជ្រា វីរិន';

  return `
  <section id="venue-section" class="venue-section">
    <div class="venue-container">
      
      <div class="venue-header">
        <div class="venue-crest">${getRoyalCrestSVG(72, 42)}</div>
        <h2 class="venue-title moul-font">${t('venueLabel')}</h2>
        <div class="venue-name-block">
          <h3 class="venue-name-km">${venue.nameKm || 'មជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍ OCIC ជ្រោយចង្វារ'}</h3>
          <p class="venue-name-en">${venue.nameEn || 'OCIC Wedding & Exhibition Center, Phnom Penh'}</p>
          <div class="venue-hall-tag">${venue.hallKm || 'អគារ C (អាគារមង្គលការ)'}</div>
        </div>
      </div>

      <!-- Embedded Google Map -->
      <div class="venue-map-wrapper">
        <iframe
          class="venue-map-iframe"
          title="Google Map Venue Location"
          src="${venue.mapUrl || 'https://maps.google.com/maps?q=11.591238,104.931252&output=embed'}"
          width="100%"
          height="380"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        <div class="venue-map-border"></div>
      </div>

      <!-- Action Buttons: Open Maps + Save to Calendar (.ics) -->
      <div class="venue-action-buttons">
        <a
          href="${venue.directMapUrl || 'https://maps.google.com/?q=OCIC+Wedding+Center+Chroy+Changvar'}"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-venue btn-open-map"
        >
          <span class="btn-icon">📍</span>
          <span>${t('openMap')}</span>
        </a>

        <button
          id="btn-download-ics"
          class="btn-venue btn-save-calendar"
        >
          <span class="btn-icon">📅</span>
          <span>${t('addToCalendar')}</span>
        </button>
      </div>

    </div>
  </section>
  `;
}

export function initCalendarDownload(data) {
  const btn = document.getElementById('btn-download-ics');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const groom = data.groom?.nameKm || 'San SongHeng';
    const bride = data.bride?.nameKm || 'Chrea Virin';
    const venue = data.venue?.nameKm || 'OCIC Wedding Center Phnom Penh';

    // Wedding ceremony start & end times (2026-10-10 06:30 to 22:00 UTC+7)
    // In UTC: 2026-10-09T23:30:00Z to 2026-10-10T15:00:00Z
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Khmer Digital Wedding Invitation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:អាពាហ៍ពិពាហ៍ | ${groom} & ${bride}`,
      `DESCRIPTION:សូមគោរពអញ្ជើញចូលរួមពិធីមង្គលការរបស់ ${groom} និង ${bride} នៅ ${venue}`,
      `LOCATION:${venue}`,
      'DTSTART:20261009T233000Z',
      'DTEND:20261010T150000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Wedding-Invitation-${groom}-${bride}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
}
