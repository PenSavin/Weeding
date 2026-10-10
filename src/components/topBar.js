// Top navigation bar with Couple Name logo, Khmer/English switcher, and Audio controller

import { getLang, setLang } from '../data/i18n.js';

class WeddingAudioPlayer {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.timer = null;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  play() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Romantic harp/celesta pentatonic arpeggio chords loop
    // F# Major pentatonic / romantic Cambodian inspired wedding chimes
    const notes = [
      277.18, 329.63, 369.99, 440.00, 493.88, 554.37, 659.25, 739.99
    ];
    let step = 0;

    const playChime = () => {
      if (!this.isPlaying || !this.audioCtx) return;
      const freq = notes[step % notes.length];
      step = (step + 1);

      try {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        // Warm sine + soft harmonic
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

        gain.gain.setValueAtTime(0.0001, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, this.audioCtx.currentTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 2.2);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + 2.3);
      } catch (e) {
        // Audio error fallback
      }

      const delays = [350, 450, 300, 700, 400, 800];
      const nextDelay = delays[step % delays.length];
      this.timer = setTimeout(playChime, nextDelay);
    };

    playChime();
  }

  pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}

const weddingAudio = new WeddingAudioPlayer();

export function renderTopBar(data) {
  const currentLang = getLang();
  const groomShort = data.groom?.shortKm || 'ហេង';
  const brideShort = data.bride?.shortKm || 'រិន';

  return `
  <header id="app-topbar" class="app-topbar">
    <div class="topbar-scrolled-backdrop"></div>
    <div class="topbar-inner">
      <!-- Mini name logo top-left -->
      <div class="topbar-brand">
        <span class="brand-names moulpali-foil">${groomShort} & ${brideShort}</span>
      </div>

      <!-- Controls on right: Language switch + Music toggle -->
      <div class="topbar-controls">
        <!-- Lang switch (Khmer first) -->
        <button id="btn-lang-toggle" class="btn-topbar btn-lang" title="ប្តូរភាសា / Switch Language">
          <span class="lang-flag">${currentLang === 'km' ? '🇰🇭 ខ្មែរ' : '🇬🇧 EN'}</span>
        </button>

        <!-- Music toggle -->
        <button id="btn-music-toggle" class="btn-topbar btn-music" title="ចាក់/ផ្អាកតន្ត្រី (Music Toggle)">
          <span id="music-icon" class="music-icon">🎵</span>
          <span class="music-eq">
            <span class="eq-bar bar-1"></span>
            <span class="eq-bar bar-2"></span>
            <span class="eq-bar bar-3"></span>
          </span>
        </button>
      </div>
    </div>
  </header>
  `;
}

export function initTopBarEvents(onLanguageSwitched) {
  const topbar = document.getElementById('app-topbar');
  const langBtn = document.getElementById('btn-lang-toggle');
  const musicBtn = document.getElementById('btn-music-toggle');
  const eq = document.querySelector('.music-eq');

  // Dark gradient background when scrolled
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      topbar?.classList.add('scrolled');
    } else {
      topbar?.classList.remove('scrolled');
    }
  });

  // Language switch
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const next = getLang() === 'km' ? 'en' : 'km';
      setLang(next);
      if (typeof onLanguageSwitched === 'function') onLanguageSwitched();
    });
  }

  const updateMusicUI = (playing) => {
    if (playing) {
      musicBtn?.classList.add('playing');
      eq?.classList.add('active');
    } else {
      musicBtn?.classList.remove('playing');
      eq?.classList.remove('active');
    }
  };

  if (musicBtn) {
    musicBtn.addEventListener('click', () => {
      if (weddingAudio.isPlaying) {
        weddingAudio.pause();
        updateMusicUI(false);
      } else {
        weddingAudio.play();
        updateMusicUI(true);
      }
    });
  }

  // Start music automatically on wax seal tap
  window.addEventListener('requestAudioPlay', () => {
    if (!weddingAudio.isPlaying) {
      weddingAudio.play();
      updateMusicUI(true);
    }
  });
}
