// 3D Envelope with Personalized Guest Name ribbon and Realistic Hand Opening Sequence (5.5s)

import { getWaxSealSVG, getRoyalCrestSVG } from './svgs.js';
import { t } from '../data/i18n.js';
import gsap from 'gsap';

export function renderEnvelope(data) {
  const initialsGroom = data.groom?.shortKm || 'ហេង';
  const initialsBride = data.bride?.shortKm || 'រិន';
  const guestName = data.guestName || 'ភ្ញៀវកិត្តិយសដ៏ថ្លៃថ្លា';

  return `
  <section id="envelope-section" class="envelope-section">
    <!-- Dark blurred romantic background -->
    <div class="envelope-backdrop">
      <div class="envelope-backdrop-img" style="background-image: url('${data.photos?.cover || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80'}');"></div>
      <div class="envelope-backdrop-overlay"></div>
    </div>

    <!-- Top ceremonial heading -->
    <div class="envelope-top-header">
      <div class="envelope-crest-top">${getRoyalCrestSVG(64, 38)}</div>
      <h1 class="envelope-main-title">${t('weddingCelebration')}</h1>
      <p class="envelope-sub-title">${t('theWeddingInvitation')}</p>

      <!-- Personalized Guest Ribbon on Envelope -->
      <div class="envelope-guest-ribbon">
        <span class="ribbon-prefix">សូមគោរពអញ្ជើញ ៖</span>
        <span class="ribbon-guest-name moul-font">${guestName}</span>
      </div>
    </div>

    <!-- 3D Envelope Stage (never put CSS filter on 3D parent!) -->
    <div class="envelope-stage" id="envelope-stage">
      <div class="envelope-3d-box" id="envelope-3d-box">
        
        <!-- Layer 1: Back Panel (solid dark paper) -->
        <div class="envelope-panel envelope-back">
          <div class="paper-texture"></div>
        </div>

        <!-- Layer 2: Inner Card (tucked inside pocket) -->
        <div class="envelope-inner-card" id="envelope-inner-card">
          <div class="inner-card-paper">
            <div class="inner-card-border">
              <div class="inner-card-crest">${getRoyalCrestSVG(52, 32)}</div>
              <div class="inner-card-title">${t('weddingCelebration')}</div>
              
              <!-- Personalized Guest Name inside card -->
              <div class="inner-card-guest">
                <span class="card-guest-to">ជូនចំពោះ</span>
                <span class="card-guest-val moul-font">${guestName}</span>
              </div>

              <div class="inner-card-names">
                <span class="inner-groom">${data.groom?.nameKm || 'សាន សុងហេង'}</span>
                <span class="inner-amp">&</span>
                <span class="inner-bride">${data.bride?.nameKm || 'ជ្រា វីរិន'}</span>
              </div>
              <div class="inner-card-date">${data.date?.solarKm || 'ថ្ងៃអាទិត្យ ទី១០ ខែតុលា ឆ្នាំ២០២៦'}</div>
              <div class="inner-card-venue">${data.venue?.nameKm || 'OCIC ជ្រោយចង្វារ រាជធានីភ្នំពេញ'}</div>
            </div>
          </div>
        </div>

        <!-- Layer 3: Front Pocket (opaque folded envelope panels) -->
        <div class="envelope-panel envelope-pocket" id="envelope-pocket">
          <!-- Folded geometric panels -->
          <div class="pocket-triangle-left"></div>
          <div class="pocket-triangle-right"></div>
          <div class="pocket-triangle-bottom"></div>
          <div class="pocket-gold-rim"></div>
          <div class="pocket-paper-grain"></div>
        </div>

        <!-- Layer 4: Top Flap (folds 180° back in 3D) -->
        <div class="envelope-panel envelope-flap" id="envelope-flap">
          <div class="flap-front">
            <div class="flap-gold-scallop-line">
              <svg viewBox="0 0 400 160" width="100%" height="100%" preserveAspectRatio="none" fill="none">
                <path d="M0 0 L200 155 L400 0 Z" fill="#182c21" stroke="url(#g-foil)" stroke-width="2" />
                <path d="M20 0 L200 140 L380 0" stroke="url(#g-foil)" stroke-width="0.8" stroke-dasharray="3 4" opacity="0.7" />
              </svg>
            </div>
            <div class="flap-mini-crest">
              ${getRoyalCrestSVG(44, 26)}
            </div>
          </div>
          <!-- Flap Back (Cream lining visible when flap flips 180°) -->
          <div class="flap-back-lining">
            <svg viewBox="0 0 400 160" width="100%" height="100%" preserveAspectRatio="none" fill="none">
              <path d="M0 0 L200 155 L400 0 Z" fill="#FAF6ED" stroke="rgba(184, 134, 40, 0.4)" stroke-width="1.5" />
            </svg>
          </div>
        </div>

        <!-- Flap cast shadow on pocket -->
        <div class="flap-cast-shadow" id="flap-shadow"></div>

        <!-- Layer 5: Wax Seal with Specular Lighting -->
        <div class="seal-container" id="seal-container">
          ${getWaxSealSVG(initialsGroom, initialsBride)}
          <div class="seal-tap-cue" id="seal-tap-cue">
            <span class="cue-hand">👆</span>
            <span class="cue-text">${t('tapToOpen')}</span>
          </div>
        </div>

      </div>
    </div>

    <!-- Darkness transition curtain between envelope and cover -->
    <div class="envelope-fade-curtain" id="envelope-fade-curtain"></div>
  </section>
  `;
}

export function initEnvelopeAnimation(onCompleteCallback) {
  const seal = document.getElementById('wax-seal');
  const stage = document.getElementById('envelope-stage');
  const box = document.getElementById('envelope-3d-box');
  const flap = document.getElementById('envelope-flap');
  const flapShadow = document.getElementById('flap-shadow');
  const innerCard = document.getElementById('envelope-inner-card');
  const pocket = document.getElementById('envelope-pocket');
  const tapCue = document.getElementById('seal-tap-cue');
  const curtain = document.getElementById('envelope-fade-curtain');
  const section = document.getElementById('envelope-section');

  if (!seal || !flap || !innerCard) return;

  // Gentle idle tilt & float
  let idleTween = gsap.to(box, {
    y: '-=6',
    rotationX: 1.5,
    rotationY: -1.5,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  // Parallax on pointer move
  const handlePointerMove = (e) => {
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    gsap.to(box, {
      rotationY: x * 6,
      rotationX: -y * 6,
      duration: 0.8,
      ease: 'power1.out'
    });
  };
  window.addEventListener('pointermove', handlePointerMove);

  let isOpening = false;

  seal.addEventListener('click', () => {
    if (isOpening) return;
    isOpening = true;

    // Stop idle float & parallax
    if (idleTween) idleTween.kill();
    window.removeEventListener('pointermove', handlePointerMove);
    if (tapCue) gsap.to(tapCue, { opacity: 0, duration: 0.25 });

    // Broadcast audio start event
    window.dispatchEvent(new CustomEvent('requestAudioPlay'));

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: () => {
        if (section) section.style.display = 'none';
        if (typeof onCompleteCallback === 'function') onCompleteCallback();
      }
    });

    // 1. Seal pressed down slightly ("by hand" feel)
    tl.to(seal, {
      scale: 0.94,
      duration: 0.35,
      ease: 'power1.in'
    })
    // 2. Seal lifted up with growing shadow
    .to(seal, {
      scale: 1.15,
      y: -22,
      duration: 0.6,
      ease: 'power2.out'
    })
    // 3. Seal set aside off-screen
    .to(seal, {
      x: 320,
      y: -140,
      rotation: 28,
      opacity: 0,
      duration: 0.85,
      ease: 'power2.in'
    }, '-=0.1')

    // 4. Flap folds back 180° in 3D, its shadow lifting
    .to(flap, {
      rotateX: -180,
      duration: 1.5,
      ease: 'power1.inOut',
      onUpdate: function () {
        // Once flap passes 90°, put it behind the card
        const progress = this.progress();
        if (progress >= 0.5) {
          flap.style.zIndex = '1';
        } else {
          flap.style.zIndex = '8';
        }
      }
    }, '-=0.5')
    .to(flapShadow, {
      opacity: 0,
      duration: 0.8
    }, '-=1.4')

    // 5. Inner card drawn out of pocket at slight angle while envelope sinks slightly
    .to(innerCard, {
      y: -230,
      rotation: -2.5,
      duration: 1.4,
      ease: 'power2.out'
    }, '-=0.6')
    .to(box, {
      y: 45,
      duration: 1.4,
      ease: 'power1.out'
    }, '-=1.4')

    // 6. Envelope drops out of frame
    .to([pocket, flap, document.querySelector('.envelope-back')], {
      y: 600,
      opacity: 0,
      duration: 0.9,
      ease: 'power2.in'
    }, '-=0.5')

    // 7. Card comes to the camera
    .to(innerCard, {
      y: 0,
      scale: 1.35,
      rotation: 0,
      duration: 1.1,
      ease: 'power2.inOut'
    }, '-=0.4')

    // 8. Fade through dark into the cover
    .to(curtain, {
      opacity: 1,
      duration: 0.7,
      ease: 'power1.inOut'
    }, '-=0.3')
    .set(section, {
      display: 'none'
    })
    .to(curtain, {
      opacity: 0,
      duration: 0.7,
      ease: 'power1.out'
    });
  });
}
