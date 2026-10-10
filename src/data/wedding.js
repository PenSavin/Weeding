// Wedding details with LocalStorage support, Guest Name URL handling, and reactive updates

import { getAllStoredImages } from './imageStore.js';

const STORAGE_KEY = 'khmer_wedding_details_v1';

// Convert numbers to Khmer numerals (0 -> ០, 1 -> ១, ...)
export function toKhmerNum(num) {
  const kmDigits = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
  return String(num).replace(/[0-9]/g, d => kmDigits[Number(d)]);
}

// Get guest name from URL parameter (?to=... or ?guest=...)
export function getGuestFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    const guest = params.get('to') || params.get('guest');
    if (guest) return decodeURIComponent(guest.trim());
  } catch (e) {
    // fallback
  }
  return '';
}

export const DEFAULT_WEDDING_DATA = {
  guestName: getGuestFromUrl() || 'ភ្ញៀវកិត្តិយសដ៏ថ្លៃថ្លា',
  guestTitle: 'ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា',
  photos: {
    cover: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80',
    formalArched: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    coupleSpotlight: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80'
  },
  groom: {
    nameKm: 'សាន សុងហេង',
    nameEn: 'San SongHeng',
    shortKm: 'ហេង',
    shortEn: 'Heng',
    fatherKm: 'ប៉ែន សាវិន្ទ',
    fatherEn: 'Pen Savin',
    motherKm: 'សាវិន្ទ',
    motherEn: 'Savinth'
  },
  bride: {
    nameKm: 'ជ្រា វីរិន',
    nameEn: 'Chrea Virin',
    shortKm: 'រិន',
    shortEn: 'Rin',
    fatherKm: 'ជ្រា សុខា',
    fatherEn: 'Chrea Sokha',
    motherKm: 'អ៊ឹម សារ៉េត',
    motherEn: 'Im Sareth'
  },
  date: {
    solarKm: 'ថ្ងៃអាទិត្យ ទី១០ ខែធ្នូ ឆ្នាំ២០២៦',
    solarEn: 'Thursday, December 10, 2026',
    lunarKm: 'ត្រូវនឹង ថ្ងៃ១៥កើត ខែមិគសិរ ឆ្នាំរោង ឆស័ក ព.ស. ២៥៧០',
    lunarEn: '15th Waxing Moon of Migasira, Year of the Dragon, B.E. 2570',
    dayKm: '១០',
    monthKm: '១២',
    yearKm: '២០២៦',
    dayEn: '10',
    monthEn: '12',
    yearEn: '2026',
    isoDate: '2026-12-10T06:30',
    targetTimestamp: new Date('2026-12-10T06:30:00+07:00').getTime()
  },
  venue: {
    nameKm: 'មជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍ OCIC ជ្រោយចង្វារ រាជធានីភ្នំពេញ',
    nameEn: 'OCIC Wedding & Exhibition Center, Chroy Changvar, Phnom Penh',
    hallKm: 'អគារ C (អាគារមង្គលការ)',
    hallEn: 'Building C (Grand Ballroom)',
    lat: 11.591238,
    lng: 104.931252,
    mapUrl: 'https://maps.google.com/maps?q=11.591238,104.931252&output=embed',
    directMapUrl: 'https://maps.google.com/?q=OCIC+Wedding+Center+Chroy+Changvar'
  },
  gift: {
    groomAba: {
      accountName: 'SAN SONGHENG',
      accountNumber: '000 123 456',
      bank: 'ABA Bank (KHQR)',
      qrImage: ''
    },
    brideAba: {
      accountName: 'CHREA VIRIN',
      accountNumber: '000 789 101',
      bank: 'ABA Bank (KHQR)',
      qrImage: ''
    }
  },
  program: [
    {
      time: '០៦:៣០ ព្រឹក',
      timeEn: '06:30 AM',
      titleKm: 'ពិធីហែជំនូន & ពិសាអាហារពេលព្រឹក',
      titleEn: "Groom's Procession & Breakfast",
      descKm: 'ក្បួនហែជំនូនចូលដល់គេហដ្ឋាន និងពិសាអាហារពេលព្រឹកជួបជុំសាច់ញាតិ',
      iconId: 'procession'
    },
    {
      time: '០៧:៣០ ព្រឹក',
      timeEn: '07:30 AM',
      titleKm: 'ពិធីសំពះសែនព្រេនមេបា',
      titleEn: 'Homage to Ancestors & Parents',
      descKm: 'ពិធីសំពះព្រះរតនត្រ័យ និងរំលឹកគុណូបការៈមាតាបិតា',
      iconId: 'ancestors'
    },
    {
      time: '០៩:០០ ព្រឹក',
      timeEn: '09:00 AM',
      titleKm: 'ពិធីកាត់សក់បង្កក់សិរី',
      titleEn: 'Hair-Cutting & Cleansing Ceremony',
      descKm: 'ជម្រះសេចក្តីសៅហ្មង និងប្រសិទ្ធពរជ័យសិរីសួស្តីដល់កូនកំលោះកូនក្រមុំ',
      iconId: 'haircut'
    },
    {
      time: '១០:៣០ ព្រឹក',
      timeEn: '10:30 AM',
      titleKm: 'ពិធីសំពះផ្ទឹម ចងដៃ & បង្វិលពពិល',
      titleEn: 'Knot-Tying & Candle Circle Ceremony',
      descKm: 'ពិធីសំពះផ្ទឹមចងអំបោះក្រហម និងបង្វិលពពិលប្រសិទ្ធពរជ័យសុភមង្គល',
      iconId: 'knots'
    },
    {
      time: '០៥:០០ ល្ងាច',
      timeEn: '05:00 PM',
      titleKm: 'ពិធីទទួលបដិសណ្ឋារកិច្ច & ពិសាភោជនាហារ',
      titleEn: 'Reception & Wedding Banquet',
      descKm: 'សូមគោរពអញ្ជើញឯកឧត្តម លោកជំទាវ លោក លោកស្រី និងប្រិយមិត្តចូលរួមពិសាអាហារ',
      iconId: 'banquet'
    }
  ],
  loveStory: [
    {
      year: '២០២០',
      titleKm: 'ថ្ងៃដំបូងដែលយើងបានជួបគ្នា',
      titleEn: 'The Day We First Met',
      captionKm: '«និស្ស័យបាននាំយើងមកជួបគ្នា ដោយស្នាមញញឹមដំបូងដ៏កក់ក្តៅ»',
      captionEn: 'Fate brought our paths together with an unforgettable warm smile.',
      photo: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'
    },
    {
      year: '២០២៣',
      titleKm: 'ការសន្យារួមដំណើរកសាងអនាគត',
      titleEn: 'Our Shared Promise',
      captionKm: '«កាន់ដៃគ្នាកាត់ឧបសគ្គ ចែករំលែកក្តីសុខ និងក្តីស្រឡាញ់ជារៀងរាល់ថ្ងៃ»',
      captionEn: 'Walking hand in hand through every season, growing stronger together.',
      photo: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
    },
    {
      year: '២០២៦',
      titleKm: 'ថ្ងៃមង្គលសិរីសួស្តីអាពាហ៍ពិពាហ៍',
      titleEn: 'Our Auspicious Wedding Day',
      captionKm: '«ថ្ងៃដែលយើងប្តេជ្ញាស្រឡាញ់ និងមើលថែគ្នាអស់មួយជីវិត»',
      captionEn: 'The day two hearts unite as one forever in sacred blessings.',
      photo: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80'
    }
  ],
  gallery: [
    {
      id: 1,
      titleKm: 'អនុស្សាវរីយ៍ស្នេហ៍',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
      aspect: 'tall'
    },
    {
      id: 2,
      titleKm: 'ស្នាមញញឹមរស្មីស្នេហ៍',
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
      aspect: 'wide'
    },
    {
      id: 3,
      titleKm: 'ក្តីស្រឡាញ់កក់ក្តៅ',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
      aspect: 'tall'
    },
    {
      id: 4,
      titleKm: 'សេចក្តីសុខក្នុងក្រសែភ្នែក',
      url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85',
      aspect: 'wide'
    },
    {
      id: 5,
      titleKm: 'រាត្រីផ្អែមល្ហែម',
      url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=85',
      aspect: 'tall'
    },
    {
      id: 6,
      titleKm: 'ដំណើររួមគ្នា',
      url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=85',
      aspect: 'wide'
    }
  ]
};

// In-memory cache for fast sync access
let cachedData = null;

export function getWeddingData() {
  if (cachedData) return cachedData;

  const urlGuest = getGuestFromUrl();
  let base = { ...DEFAULT_WEDDING_DATA };

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      base = {
        ...base,
        ...parsed,
        photos: { ...base.photos, ...parsed.photos },
        groom: { ...base.groom, ...parsed.groom },
        bride: { ...base.bride, ...parsed.bride },
        date: { ...base.date, ...parsed.date },
        venue: { ...base.venue, ...parsed.venue },
        gift: {
          groomAba: { ...base.gift.groomAba, ...parsed.gift?.groomAba },
          brideAba: { ...base.gift.brideAba, ...parsed.gift?.brideAba }
        }
      };
    }
  } catch (e) {
    console.error('Error reading wedding data:', e);
  }

  if (urlGuest) {
    base.guestName = urlGuest;
  }

  cachedData = base;
  return cachedData;
}

// Hydrate stored images from IndexedDB asynchronously into cachedData
export async function hydrateStoredImages() {
  try {
    const images = await getAllStoredImages();
    const data = getWeddingData();
    let changed = false;

    if (images.coverPhoto && data.photos.cover !== images.coverPhoto) {
      data.photos.cover = images.coverPhoto;
      changed = true;
    }
    if (images.archedPhoto && data.photos.formalArched !== images.archedPhoto) {
      data.photos.formalArched = images.archedPhoto;
      changed = true;
    }
    if (images.couplePhoto && data.photos.coupleSpotlight !== images.couplePhoto) {
      data.photos.coupleSpotlight = images.couplePhoto;
      changed = true;
    }
    if (images.groomQrImage && data.gift.groomAba.qrImage !== images.groomQrImage) {
      data.gift.groomAba.qrImage = images.groomQrImage;
      changed = true;
    }
    if (images.brideQrImage && data.gift.brideAba.qrImage !== images.brideQrImage) {
      data.gift.brideAba.qrImage = images.brideQrImage;
      changed = true;
    }

    if (changed) {
      cachedData = data;
      window.dispatchEvent(new CustomEvent('weddingDataChanged', { detail: data }));
    }
  } catch (err) {
    console.warn('Hydrate stored images failed:', err);
  }
}

export function saveWeddingData(newData) {
  try {
    cachedData = newData;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    window.dispatchEvent(new CustomEvent('weddingDataChanged', { detail: newData }));
  } catch (e) {
    console.error('Error saving wedding data:', e);
  }
}

export function resetWeddingData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    cachedData = { ...DEFAULT_WEDDING_DATA };
    window.dispatchEvent(new CustomEvent('weddingDataChanged', { detail: DEFAULT_WEDDING_DATA }));
  } catch (e) {
    console.error('Error resetting wedding data:', e);
  }
}
