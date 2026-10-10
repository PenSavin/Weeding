// Formal Invitation wording, Arched Photo, Guest Name callout, Parents, and Couple presentation

import { getRoyalCrestSVG } from './svgs.js';
import { t } from '../data/i18n.js';

export function renderFormalSection(data) {
  const guestName = data.guestName || 'ភ្ញៀវកិត្តិយសដ៏ថ្លៃថ្លា';
  const groomFather = data.groom?.fatherKm || 'ប៉ែន សាវិន្ទ';
  const groomMother = data.groom?.motherKm || 'សាវិន្ទ';
  const brideFather = data.bride?.fatherKm || 'ជ្រា សុខា';
  const brideMother = data.bride?.motherKm || 'អ៊ឹម សារ៉េត';

  const groomNameKm = data.groom?.nameKm || 'សាន សុងហេង';
  const groomNameEn = data.groom?.nameEn || 'San SongHeng';
  const brideNameKm = data.bride?.nameKm || 'ជ្រា វីរិន';
  const brideNameEn = data.bride?.nameEn || 'Chrea Virin';

  return `
  <section id="formal-section" class="formal-section">
    <div class="section-container">
      
      <!-- Section Crest & Header -->
      <div class="formal-header-crest">
        ${getRoyalCrestSVG(72, 42)}
      </div>

      <div class="formal-blessing-card">
        <!-- Arched Photo Frame -->
        <div class="arched-photo-container">
          <div class="arched-photo-outer-gold">
            <div class="arched-photo-inner">
              <div class="arched-photo-img" style="background-image: url('${data.photos?.formalArched || data.photos?.cover || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'}');"></div>
            </div>
          </div>
          <div class="arched-photo-embellishment">
            <span class="embellish-gem">✦</span>
          </div>
        </div>

        <!-- Formal Invitation Words & Guest Callout -->
        <div class="formal-wording-block">
          <h2 class="formal-main-heading moul-font">${t('cordiallyInvite')}</h2>
          
          <div class="formal-guest-badge">
            <span class="formal-guest-prefix">សូមគោរពអញ្ជើញ ៖</span>
            <span class="formal-guest-val moul-font">${guestName}</span>
          </div>

          <p class="formal-prose-km">
            ${t('cordiallyInviteText')}
          </p>
        </div>

        <!-- Parents Grid: 2 Columns (Groom Parents & Bride Parents) -->
        <div class="parents-grid">
          
          <!-- Groom's Parents -->
          <div class="parents-card parents-groom">
            <div class="parents-role-badge">
              <span class="role-title moul-font">${t('groomParentsHeading')}</span>
            </div>
            <div class="parents-names-box">
              <div class="parent-line parent-father">
                <span class="parent-honorific">លោក</span>
                <span class="parent-name">${groomFather}</span>
              </div>
              <div class="parent-line parent-mother">
                <span class="parent-honorific">និងលោកស្រី</span>
                <span class="parent-name">${groomMother}</span>
              </div>
            </div>
          </div>

          <!-- Divider -->
          <div class="parents-ornament-divider">
            <span class="divider-gem">✤</span>
          </div>

          <!-- Bride's Parents -->
          <div class="parents-card parents-bride">
            <div class="parents-role-badge">
              <span class="role-title moul-font">${t('brideParentsHeading')}</span>
            </div>
            <div class="parents-names-box">
              <div class="parent-line parent-father">
                <span class="parent-honorific">លោក</span>
                <span class="parent-name">${brideFather}</span>
              </div>
              <div class="parent-line parent-mother">
                <span class="parent-honorific">និងលោកស្រី</span>
                <span class="parent-name">${brideMother}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      <!-- The Couple Section: Scalloped photo frame, names & honorifics -->
      <div class="couple-spotlight-card">
        <div class="spotlight-scalloped-frame">
          <div class="scalloped-photo-container">
            <div class="scalloped-photo-img" style="background-image: url('${data.photos?.coupleSpotlight || data.photos?.formalArched || data.photos?.cover || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80'}');"></div>
          </div>
        </div>

        <div class="couple-details-box">
          <div class="couple-pair-grid">
            
            <!-- Groom -->
            <div class="couple-person-item">
              <div class="person-role-tag moul-font">${t('groomLabel')}</div>
              <h3 class="person-full-name moul-font">${groomNameKm}</h3>
              <p class="person-en-name">${groomNameEn}</p>
            </div>

            <!-- Intersecting Golden Rings / Heart -->
            <div class="couple-center-link">
              <span class="gold-ring ring-1"></span>
              <span class="gold-ring ring-2"></span>
              <span class="couple-and-amp">&</span>
            </div>

            <!-- Bride -->
            <div class="couple-person-item">
              <div class="person-role-tag moul-font">${t('brideLabel')}</div>
              <h3 class="person-full-name moul-font">${brideNameKm}</h3>
              <p class="person-en-name">${brideNameEn}</p>
            </div>

          </div>
        </div>
      </div>

    </div>
  </section>
  `;
}
