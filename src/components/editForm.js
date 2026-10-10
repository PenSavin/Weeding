// Form allowing user to customize Guest Name, Groom, Bride, Parents, Date, Photos, and KHQR settings

import { getWeddingData, saveWeddingData, resetWeddingData } from '../data/wedding.js';
import { setStoredImage, clearAllStoredImages } from '../data/imageStore.js';

export function renderEditFormModal() {
  const data = getWeddingData();
  const photos = data.photos || {};
  const groomAba = data.gift?.groomAba || {};
  const brideAba = data.gift?.brideAba || {};

  return `
  <!-- Floating Edit Trigger Button -->
  <button id="btn-open-editor" class="btn-floating-editor" title="កែប្រែព័ត៌មាន រូបថត និង KHQR">
    <span class="editor-icon">✏️</span>
    <span class="editor-label">កែប្រែព័ត៌មាន (Edit Details & Photos)</span>
  </button>

  <!-- Editor Modal Overlay -->
  <div id="editor-modal-overlay" class="editor-modal-overlay hidden">
    <div class="editor-modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="editor-modal-header">
        <div class="modal-header-text">
          <h2 id="modal-title" class="modal-title">បញ្ចូលព័ត៌មានផ្ទាល់ខ្លួន (Customize Details)</h2>
          <p class="modal-subtitle">បញ្ចូលឈ្មោះភ្ញៀវ កូនកំលោះ កូនក្រមុំ មាតាបិតា បញ្ចូលរូបថតផ្ទាល់ខ្លួន និង KHQR</p>
        </div>
        <button id="btn-close-editor" class="btn-close-modal" aria-label="បិទ">✕</button>
      </div>

      <form id="wedding-customizer-form" class="editor-form-scrollable">
        
        <!-- Section 0: Guest Name & Link Generator -->
        <div class="form-section-card form-section-guest-highlight">
          <div class="form-section-badge">💌 ឈ្មោះភ្ញៀវកិត្តិយស (Personalized Guest Invitation)</div>
          
          <div class="form-group">
            <label for="guestName">ឈ្មោះភ្ញៀវកិត្តិយស (Guest Name & Honorific) *</label>
            <input 
              type="text" 
              id="guestName" 
              name="guestName" 
              value="${data.guestName || ''}" 
              placeholder="ឧ. ឯកឧត្តម សុខា និងលោកជំទាវ ឬ លោក វណ្ណា" 
            />
            <span class="input-hint">ឈ្មោះនេះនឹងបង្ហាញលើធៀប ស្រោមសំបុត្រ និងពាក្យគោរពអញ្ជើញ។</span>
          </div>

          <div class="guest-link-generator-box">
            <button type="button" id="btn-copy-guest-url" class="btn-copy-guest-url">
              <span class="btn-icon">🔗</span> បង្កើត & ចម្លងតំណភ្ជាប់ផ្ញើជូនភ្ញៀវនេះ (Copy Guest Link)
            </button>
            <div id="guest-url-preview" class="guest-url-preview"></div>
          </div>
        </div>

        <!-- Section: Custom Photo Uploads -->
        <div class="form-section-card">
          <div class="form-section-badge">📸 រូបថតអាពាហ៍ពិពាហ៍ផ្ទាល់ខ្លួន (Insert Your Own Photos)</div>
          
          <!-- 1. Cover & Envelope Photo -->
          <div class="form-group">
            <label>១. រូបថតធៀប & ផ្ទៃខាងក្រោយ Cover (Hero Photo)</label>
            <div class="photo-upload-row">
              <div class="photo-preview-thumb" id="preview-cover-thumb" style="background-image: url('${photos.cover || ''}');"></div>
              <div class="photo-upload-inputs">
                <input type="file" id="fileCoverPhoto" accept="image/*" class="file-input-control" />
                <input type="text" id="urlCoverPhoto" value="${photos.cover || ''}" placeholder="ឬបិទភ្ជាប់តំណភ្ជាប់រូបភាព (Or image URL)" class="input-url-fallback" />
              </div>
            </div>
          </div>

          <!-- 2. Arched Formal Photo -->
          <div class="form-group">
            <label>២. រូបថតស៊ុមខាងលើមាតាបិតា (Formal Arched Photo)</label>
            <div class="photo-upload-row">
              <div class="photo-preview-thumb arched-thumb" id="preview-arched-thumb" style="background-image: url('${photos.formalArched || ''}');"></div>
              <div class="photo-upload-inputs">
                <input type="file" id="fileArchedPhoto" accept="image/*" class="file-input-control" />
                <input type="text" id="urlArchedPhoto" value="${photos.formalArched || ''}" placeholder="ឬបិទភ្ជាប់តំណភ្ជាប់រូបភាព (Or image URL)" class="input-url-fallback" />
              </div>
            </div>
          </div>

          <!-- 3. Couple Spotlight Photo -->
          <div class="form-group">
            <label>៣. រូបថតគូស្នេហ៍ក្នុងស៊ុមមូល (Couple Spotlight Photo)</label>
            <div class="photo-upload-row">
              <div class="photo-preview-thumb circle-thumb" id="preview-couple-thumb" style="background-image: url('${photos.coupleSpotlight || ''}');"></div>
              <div class="photo-upload-inputs">
                <input type="file" id="fileCouplePhoto" accept="image/*" class="file-input-control" />
                <input type="text" id="urlCouplePhoto" value="${photos.coupleSpotlight || ''}" placeholder="ឬបិទភ្ជាប់តំណភ្ជាប់រូបភាព (Or image URL)" class="input-url-fallback" />
              </div>
            </div>
          </div>
        </div>

        <!-- Section: Custom KHQR & Gift Configuration -->
        <div class="form-section-card">
          <div class="form-section-badge">🎁 កំណត់ចំណងដៃ KHQR (Configure KHQR & Payment Cards)</div>
          
          <!-- Groom KHQR -->
          <div class="khqr-config-block">
            <div class="khqr-config-title">🤵 KHQR កូនកំលោះ (Groom)</div>
            <div class="form-grid-2">
              <div class="form-group">
                <label for="groomKhqrName">ឈ្មោះគណនី (Account Name)</label>
                <input type="text" id="groomKhqrName" value="${groomAba.accountName || ''}" placeholder="e.g. SAN SONGHENG" />
              </div>
              <div class="form-group">
                <label for="groomKhqrNumber">លេខគណនី (Account Number)</label>
                <input type="text" id="groomKhqrNumber" value="${groomAba.accountNumber || ''}" placeholder="e.g. 000 123 456" />
              </div>
            </div>
            <div class="form-grid-2">
              <div class="form-group">
                <label for="groomKhqrBank">ឈ្មោះធនាគារ (Bank Name)</label>
                <input type="text" id="groomKhqrBank" value="${groomAba.bank || 'ABA Bank (KHQR)'}" placeholder="e.g. ABA Bank / ACLEDA" />
              </div>
              <div class="form-group">
                <label>ផ្ទុកឡើងរូបភាព KHQR កូនកំលោះ (Upload QR Image)</label>
                <input type="file" id="fileGroomQr" accept="image/*" class="file-input-control" />
              </div>
            </div>
          </div>

          <!-- Bride KHQR -->
          <div class="khqr-config-block">
            <div class="khqr-config-title">👰 KHQR កូនក្រមុំ (Bride)</div>
            <div class="form-grid-2">
              <div class="form-group">
                <label for="brideKhqrName">ឈ្មោះគណនី (Account Name)</label>
                <input type="text" id="brideKhqrName" value="${brideAba.accountName || ''}" placeholder="e.g. CHREA VIRIN" />
              </div>
              <div class="form-group">
                <label for="brideKhqrNumber">លេខគណនី (Account Number)</label>
                <input type="text" id="brideKhqrNumber" value="${brideAba.accountNumber || ''}" placeholder="e.g. 000 789 101" />
              </div>
            </div>
            <div class="form-grid-2">
              <div class="form-group">
                <label for="brideKhqrBank">ឈ្មោះធនាគារ (Bank Name)</label>
                <input type="text" id="brideKhqrBank" value="${brideAba.bank || 'ABA Bank (KHQR)'}" placeholder="e.g. ABA Bank / ACLEDA" />
              </div>
              <div class="form-group">
                <label>ផ្ទុកឡើងរូបភាព KHQR កូនក្រមុំ (Upload QR Image)</label>
                <input type="file" id="fileBrideQr" accept="image/*" class="file-input-control" />
              </div>
            </div>
          </div>
        </div>

        <!-- Section 1: Groom & Parents -->
        <div class="form-section-card">
          <div class="form-section-badge">🤵 កូនកំលោះ & មាតាបិតា (Groom & Parents)</div>
          
          <div class="form-grid-2">
            <div class="form-group">
              <label for="groomNameKm">ឈ្មោះកូនកំលោះ (ភាសាខ្មែរ) *</label>
              <input type="text" id="groomNameKm" name="groomNameKm" value="${data.groom?.nameKm || ''}" required placeholder="ឧ. សាន សុងហេង" />
            </div>
            <div class="form-group">
              <label for="groomNameEn">ឈ្មោះកូនកំលោះ (English) *</label>
              <input type="text" id="groomNameEn" name="groomNameEn" value="${data.groom?.nameEn || ''}" required placeholder="e.g. San SongHeng" />
            </div>
          </div>

          <div class="form-grid-2">
            <div class="form-group">
              <label for="groomShortKm">ឈ្មោះកាត់សម្រាប់ឡូហ្គោ & ត្រាជ័រ</label>
              <input type="text" id="groomShortKm" name="groomShortKm" value="${data.groom?.shortKm || ''}" placeholder="ឧ. ហេង" maxlength="10" />
            </div>
            <div class="form-group">
              <label for="groomShortEn">English Short / Initial</label>
              <input type="text" id="groomShortEn" name="groomShortEn" value="${data.groom?.shortEn || ''}" placeholder="e.g. Heng" maxlength="10" />
            </div>
          </div>

          <div class="form-grid-2">
            <div class="form-group">
              <label for="groomFatherKm">ឪពុកកូនកំលោះ (លោក...)</label>
              <input type="text" id="groomFatherKm" name="groomFatherKm" value="${data.groom?.fatherKm || ''}" placeholder="ឧ. ប៉ែន សាវិន្ទ" />
            </div>
            <div class="form-group">
              <label for="groomMotherKm">ម្ដាយកូនកំលោះ (និងលោកស្រី...)</label>
              <input type="text" id="groomMotherKm" name="groomMotherKm" value="${data.groom?.motherKm || ''}" placeholder="ឧ. សាវិន្ទ" />
            </div>
          </div>
        </div>

        <!-- Section 2: Bride & Parents -->
        <div class="form-section-card">
          <div class="form-section-badge">👰 កូនក្រមុំ & មាតាបិតា (Bride & Parents)</div>
          
          <div class="form-grid-2">
            <div class="form-group">
              <label for="brideNameKm">ឈ្មោះកូនក្រមុំ (ភាសាខ្មែរ) *</label>
              <input type="text" id="brideNameKm" name="brideNameKm" value="${data.bride?.nameKm || ''}" required placeholder="ឧ. ជ្រា វីរិន" />
            </div>
            <div class="form-group">
              <label for="brideNameEn">ឈ្មោះកូនក្រមុំ (English) *</label>
              <input type="text" id="brideNameEn" name="brideNameEn" value="${data.bride?.nameEn || ''}" required placeholder="e.g. Chrea Virin" />
            </div>
          </div>

          <div class="form-grid-2">
            <div class="form-group">
              <label for="brideShortKm">ឈ្មោះកាត់សម្រាប់ឡូហ្គោ & ត្រាជ័រ</label>
              <input type="text" id="brideShortKm" name="brideShortKm" value="${data.bride?.shortKm || ''}" placeholder="ឧ. រិន" maxlength="10" />
            </div>
            <div class="form-group">
              <label for="brideShortEn">English Short / Initial</label>
              <input type="text" id="brideShortEn" name="brideShortEn" value="${data.bride?.shortEn || ''}" placeholder="e.g. Rin" maxlength="10" />
            </div>
          </div>

          <div class="form-grid-2">
            <div class="form-group">
              <label for="brideFatherKm">ឪពុកកូនក្រមុំ (លោក...)</label>
              <input type="text" id="brideFatherKm" name="brideFatherKm" value="${data.bride?.fatherKm || ''}" placeholder="ឧ. ជ្រា សុខា" />
            </div>
            <div class="form-group">
              <label for="brideMotherKm">ម្ដាយកូនក្រមុំ (និងលោកស្រី...)</label>
              <input type="text" id="brideMotherKm" name="brideMotherKm" value="${data.bride?.motherKm || ''}" placeholder="ឧ. អ៊ឹម សារ៉េត" />
            </div>
          </div>
        </div>

        <!-- Section 3: Date, Lunar Date & Venue -->
        <div class="form-section-card">
          <div class="form-section-badge">📅 កាលបរិច្ឆេទ & ទីកន្លែង (Date & Venue)</div>

          <!-- Date-Time picker for Countdown -->
          <div class="form-group">
            <label for="isoDate">ជ្រើសរើសថ្ងៃ & ម៉ោងរាប់ថយក្រោយ (Countdown Target Date & Time) *</label>
            <input type="datetime-local" id="isoDate" name="isoDate" value="${data.date?.isoDate || '2026-12-10T06:30'}" />
            <span class="input-hint">នាឡិការាប់ថយក្រោយនឹងគណនាទៅកាន់ថ្ងៃ និងម៉ោងនេះដោយស្វ័យប្រវត្តិនឹងបង្ហាញជាលេខខ្មែរ។</span>
          </div>

          <div class="form-grid-2">
            <div class="form-group">
              <label for="solarKm">កាលបរិច្ឆេទ (ខ្មែរ)</label>
              <input type="text" id="solarKm" name="solarKm" value="${data.date?.solarKm || ''}" placeholder="ឧ. ថ្ងៃអាទិត្យ ទី១០ ខែធ្នូ ឆ្នាំ២០២៦" />
            </div>
            <div class="form-group">
              <label for="solarEn">Date (English)</label>
              <input type="text" id="solarEn" name="solarEn" value="${data.date?.solarEn || ''}" placeholder="e.g. Sunday, December 10, 2026" />
            </div>
          </div>

          <div class="form-group">
            <label for="lunarKm">ត្រូវនឹងថ្ងៃសិរីសួស្តី (កាលបរិច្ឆេទចន្ទគតិខ្មែរ)</label>
            <input type="text" id="lunarKm" name="lunarKm" value="${data.date?.lunarKm || ''}" placeholder="ឧ. ត្រូវនឹង ថ្ងៃ១៥កើត ខែអស្សុជ ឆ្នាំរោង ឆស័ក ព.ស. ២៥៧០" />
          </div>

          <div class="form-grid-2">
            <div class="form-group">
              <label for="venueNameKm">ទីតាំងប្រារព្ធពិធី (ខ្មែរ)</label>
              <input type="text" id="venueNameKm" name="venueNameKm" value="${data.venue?.nameKm || ''}" placeholder="ឧ. OCIC ជ្រោយចង្វារ រាជធានីភ្នំពេញ" />
            </div>
            <div class="form-group">
              <label for="venueNameEn">Venue Name (English)</label>
              <input type="text" id="venueNameEn" name="venueNameEn" value="${data.venue?.nameEn || ''}" placeholder="e.g. OCIC Wedding Center, Phnom Penh" />
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="editor-actions">
          <button type="submit" class="btn-submit-save">
            <span class="btn-icon">✨</span> រក្សាទុក & មើលលទ្ធផលភ្លាមៗ (Save & Apply Live)
          </button>
          <button type="button" id="btn-reset-default" class="btn-reset-data">
            <span class="btn-icon">🔄</span> កំណត់គំរូដើមឡើងវិញ (Reset)
          </button>
        </div>
      </form>
    </div>
  </div>
  `;
}

export function initEditFormEvents(onDataUpdated) {
  const openBtn = document.getElementById('btn-open-editor');
  const closeBtn = document.getElementById('btn-close-editor');
  const modalOverlay = document.getElementById('editor-modal-overlay');
  const form = document.getElementById('wedding-customizer-form');
  const resetBtn = document.getElementById('btn-reset-default');
  const copyGuestUrlBtn = document.getElementById('btn-copy-guest-url');
  const guestNameInput = document.getElementById('guestName');
  const guestUrlPreview = document.getElementById('guest-url-preview');

  // File upload previews and handlers
  const setupFileInput = (inputId, urlInputId, thumbId, storageKey) => {
    const fileInput = document.getElementById(inputId);
    const urlInput = document.getElementById(urlInputId);
    const thumb = document.getElementById(thumbId);

    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = async (ev) => {
            const dataUrl = ev.target?.result;
            if (dataUrl) {
              if (thumb) thumb.style.backgroundImage = `url('${dataUrl}')`;
              if (urlInput) urlInput.value = dataUrl;
              await setStoredImage(storageKey, dataUrl);
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }

    if (urlInput && thumb) {
      urlInput.addEventListener('input', () => {
        thumb.style.backgroundImage = `url('${urlInput.value}')`;
      });
    }
  };

  setupFileInput('fileCoverPhoto', 'urlCoverPhoto', 'preview-cover-thumb', 'coverPhoto');
  setupFileInput('fileArchedPhoto', 'urlArchedPhoto', 'preview-arched-thumb', 'archedPhoto');
  setupFileInput('fileCouplePhoto', 'urlCouplePhoto', 'preview-couple-thumb', 'couplePhoto');

  // KHQR Upload handlers
  const setupQrUpload = (fileId, storageKey) => {
    const fileInput = document.getElementById(fileId);
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = async (ev) => {
            const dataUrl = ev.target?.result;
            if (dataUrl) {
              await setStoredImage(storageKey, dataUrl);
              const data = getWeddingData();
              if (storageKey === 'groomQrImage') data.gift.groomAba.qrImage = dataUrl;
              if (storageKey === 'brideQrImage') data.gift.brideAba.qrImage = dataUrl;
              saveWeddingData(data);
              if (typeof onDataUpdated === 'function') onDataUpdated();
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  setupQrUpload('fileGroomQr', 'groomQrImage');
  setupQrUpload('fileBrideQr', 'brideQrImage');

  if (openBtn && modalOverlay) {
    openBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('hidden');
    });
  }

  if (closeBtn && modalOverlay) {
    closeBtn.addEventListener('click', () => {
      modalOverlay.classList.add('hidden');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.add('hidden');
      }
    });
  }

  // Copy personalized guest URL
  if (copyGuestUrlBtn && guestNameInput) {
    const updatePreview = () => {
      const gName = guestNameInput.value.trim();
      const baseUrl = window.location.origin + window.location.pathname;
      const fullUrl = gName ? `${baseUrl}?to=${encodeURIComponent(gName)}` : baseUrl;
      if (guestUrlPreview) guestUrlPreview.textContent = fullUrl;
      return fullUrl;
    };

    guestNameInput.addEventListener('input', updatePreview);
    updatePreview();

    copyGuestUrlBtn.addEventListener('click', () => {
      const link = updatePreview();
      navigator.clipboard.writeText(link).then(() => {
        const orig = copyGuestUrlBtn.innerHTML;
        copyGuestUrlBtn.innerHTML = `<span>✓</span> បានចម្លងតំណភ្ជាប់រួចរាល់! (Copied!)`;
        setTimeout(() => {
          copyGuestUrlBtn.innerHTML = orig;
        }, 2500);
      });
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', async () => {
      if (confirm('តើអ្នកពិតជាចង់ត្រឡប់ទៅព័ត៌មានដើមវិញមែនទេ? / Reset to default details?')) {
        await clearAllStoredImages();
        resetWeddingData();
        if (modalOverlay) modalOverlay.classList.add('hidden');
        if (typeof onDataUpdated === 'function') onDataUpdated();
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const current = getWeddingData();

      const updated = {
        ...current,
        guestName: document.getElementById('guestName')?.value || current.guestName,
        photos: {
          ...current.photos,
          cover: document.getElementById('urlCoverPhoto')?.value || current.photos.cover,
          formalArched: document.getElementById('urlArchedPhoto')?.value || current.photos.formalArched,
          coupleSpotlight: document.getElementById('urlCouplePhoto')?.value || current.photos.coupleSpotlight
        },
        gift: {
          groomAba: {
            ...current.gift.groomAba,
            accountName: document.getElementById('groomKhqrName')?.value || current.gift.groomAba.accountName,
            accountNumber: document.getElementById('groomKhqrNumber')?.value || current.gift.groomAba.accountNumber,
            bank: document.getElementById('groomKhqrBank')?.value || current.gift.groomAba.bank
          },
          brideAba: {
            ...current.gift.brideAba,
            accountName: document.getElementById('brideKhqrName')?.value || current.gift.brideAba.accountName,
            accountNumber: document.getElementById('brideKhqrNumber')?.value || current.gift.brideAba.accountNumber,
            bank: document.getElementById('brideKhqrBank')?.value || current.gift.brideAba.bank
          }
        },
        groom: {
          ...current.groom,
          nameKm: document.getElementById('groomNameKm')?.value || current.groom.nameKm,
          nameEn: document.getElementById('groomNameEn')?.value || current.groom.nameEn,
          shortKm: document.getElementById('groomShortKm')?.value || current.groom.shortKm,
          shortEn: document.getElementById('groomShortEn')?.value || current.groom.shortEn,
          fatherKm: document.getElementById('groomFatherKm')?.value || current.groom.fatherKm,
          motherKm: document.getElementById('groomMotherKm')?.value || current.groom.motherKm
        },
        bride: {
          ...current.bride,
          nameKm: document.getElementById('brideNameKm')?.value || current.bride.nameKm,
          nameEn: document.getElementById('brideNameEn')?.value || current.bride.nameEn,
          shortKm: document.getElementById('brideShortKm')?.value || current.bride.shortKm,
          shortEn: document.getElementById('brideShortEn')?.value || current.bride.shortEn,
          fatherKm: document.getElementById('brideFatherKm')?.value || current.bride.fatherKm,
          motherKm: document.getElementById('brideMotherKm')?.value || current.bride.motherKm
        },
        date: {
          ...current.date,
          isoDate: document.getElementById('isoDate')?.value || current.date.isoDate,
          targetTimestamp: new Date(document.getElementById('isoDate')?.value || current.date.isoDate).getTime(),
          solarKm: document.getElementById('solarKm')?.value || current.date.solarKm,
          solarEn: document.getElementById('solarEn')?.value || current.date.solarEn,
          lunarKm: document.getElementById('lunarKm')?.value || current.date.lunarKm
        },
        venue: {
          ...current.venue,
          nameKm: document.getElementById('venueNameKm')?.value || current.venue.nameKm,
          nameEn: document.getElementById('venueNameEn')?.value || current.venue.nameEn
        }
      };

      saveWeddingData(updated);
      if (modalOverlay) modalOverlay.classList.add('hidden');
      if (typeof onDataUpdated === 'function') onDataUpdated();
    });
  }
}
