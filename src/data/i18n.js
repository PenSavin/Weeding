// Khmer and English translations for the digital wedding invitation

export const TRANSLATIONS = {
  km: {
    weddingCelebration: 'សិរីសួស្តីអាពាហ៍ពិពាហ៍',
    theWeddingInvitation: 'The Wedding Invitation',
    cordiallyInvite: 'សូមគោរពអញ្ជើញ',
    cordiallyInviteText: 'ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា និងប្រិយមិត្តជិតឆ្ងាយទាំងអស់ មេត្តាអញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យសិរីសួស្តីជ័យមង្គល ក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍កូនប្រុស កូនស្រីរបស់យើងខ្ញុំ',
    groomParentsHeading: 'មាតាបិតាកូនកំលោះ',
    brideParentsHeading: 'មាតាបិតាកូនក្រមុំ',
    groomLabel: 'កូនកំលោះ',
    brideLabel: 'កូនក្រមុំ',
    and: 'និង',
    mr: 'លោក',
    mrs: 'លោកស្រី',
    tapToOpen: 'ចុចលើត្រាជ័រឃ្មុំ ដើម្បីបើកធៀប',
    dateLabel: 'កាលបរិច្ឆេទ & វេលា',
    dayCol: 'ថ្ងៃ',
    dateCol: 'ទី',
    monthCol: 'ខែ',
    yearCol: 'ឆ្នាំ',
    venueLabel: 'ទីតាំងប្រារព្ធពិធី',
    programmeHeading: 'កម្មវិធី',
    countdownHeading: 'រាប់ថយក្រោយថ្ងៃមង្គល',
    days: 'ថ្ងៃ',
    hours: 'ម៉ោង',
    minutes: 'នាទី',
    seconds: 'វិនាទី',
    loveStoryHeading: 'ដំណើររឿងនៃសេចក្តីស្រឡាញ់',
    galleryHeading: 'កម្រងរូបភាពអនុស្សាវរីយ៍',
    giftHeading: 'ចំណងដៃអាពាហ៍ពិពាហ៍',
    giftSub: 'សម្រាប់ញាតិមិត្តដែលមានបំណងចងដៃតាមប្រព័ន្ធឌីជីថល KHQR',
    saveQr: 'រក្សាទុករូបភាព QR',
    copyAccount: 'ចម្លងលេខគណនី',
    copied: 'បានចម្លងរួចរាល់!',
    openMap: 'បើកផែនទី Google Maps',
    addToCalendar: 'បញ្ចូលក្នុងប្រតិទិន (.ics)',
    thankYouHeading: 'សូមអរគុណ',
    thankYouText: 'វត្តមាន និងពរជ័យដ៏ថ្លៃថ្លារបស់លោកអ្នក គឺជាកិត្តិយស និងជាមង្គលដ៏ឧត្តុង្គឧត្តមសម្រាប់គ្រួសារយើងខ្ញុំទាំងពីរ។',
    shareViaTelegram: 'ផ្ញើតាម Telegram',
    shareViaMessenger: 'ផ្ញើតាម Messenger',
    shareViaFacebook: 'ចែករំលែកលើ Facebook',
    copyLink: 'ចម្លងតំណភ្ជាប់',
    linkCopied: 'បានចម្លងតំណភ្ជាប់រួចរាល់!',
    musicPlay: 'ចាក់តន្ត្រី',
    musicPause: 'ផ្អាកតន្ត្រី',
    scrollDown: 'អូសចុះក្រោម',
    editDetailsBtn: '✏️ កែប្រែព័ត៌មាន (Customize Details)'
  },
  en: {
    weddingCelebration: 'The Wedding Celebration',
    theWeddingInvitation: 'The Wedding Invitation',
    cordiallyInvite: 'Cordially Invites You',
    cordiallyInviteText: 'Request the honor of your presence and blessings at the auspicious wedding ceremony of their children.',
    groomParentsHeading: "Groom's Parents",
    brideParentsHeading: "Bride's Parents",
    groomLabel: 'Groom',
    brideLabel: 'Bride',
    and: 'and',
    mr: 'Mr.',
    mrs: 'Mrs.',
    tapToOpen: 'Tap the wax seal to open',
    dateLabel: 'Date & Time',
    dayCol: 'Day',
    dateCol: 'Date',
    monthCol: 'Month',
    yearCol: 'Year',
    venueLabel: 'Ceremony Venue',
    programmeHeading: 'Programme',
    countdownHeading: 'Days Until The Celebration',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Mins',
    seconds: 'Secs',
    loveStoryHeading: 'Our Love Story',
    galleryHeading: 'Photo Memories',
    giftHeading: 'Wedding Gift',
    giftSub: 'For beloved guests who wish to send digital gifts via KHQR',
    saveQr: 'Save QR Image',
    copyAccount: 'Copy Account Number',
    copied: 'Copied to clipboard!',
    openMap: 'Open Google Maps',
    addToCalendar: 'Save to Calendar (.ics)',
    thankYouHeading: 'Thank You',
    thankYouText: 'Your presence and blessings bring immense joy and honor to our union and our families.',
    shareViaTelegram: 'Share via Telegram',
    shareViaMessenger: 'Share via Messenger',
    shareViaFacebook: 'Share on Facebook',
    copyLink: 'Copy Invitation Link',
    linkCopied: 'Invitation link copied!',
    musicPlay: 'Play Music',
    musicPause: 'Pause Music',
    scrollDown: 'Scroll to explore',
    editDetailsBtn: '✏️ Edit Wedding Details'
  }
};

let currentLang = 'km';

export function getLang() {
  return currentLang;
}

export function setLang(lang) {
  if (lang === 'km' || lang === 'en') {
    currentLang = lang;
    window.dispatchEvent(new CustomEvent('langChanged', { detail: lang }));
  }
}

export function t(key) {
  return TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS['km']?.[key] || key;
}
