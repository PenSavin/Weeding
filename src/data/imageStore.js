// Robust IndexedDB image store for user-uploaded photos & KHQR images (bypasses 5MB localStorage limit)

const DB_NAME = 'KhmerWeddingPhotosDB';
const STORE_NAME = 'wedding_images';
const DB_VERSION = 1;

let dbPromise = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = (e) => reject(e.target.error);
    });
  }
  return dbPromise;
}

export async function setStoredImage(key, dataUrl) {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(dataUrl, key);
      req.onsuccess = () => resolve(true);
      req.onerror = (err) => reject(err);
    });
  } catch (err) {
    console.warn('IndexedDB setStoredImage error:', err);
    try {
      localStorage.setItem(`img_${key}`, dataUrl);
      return true;
    } catch (e) {
      return false;
    }
  }
}

export async function getStoredImage(key) {
  try {
    const db = await getDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch (err) {
    try {
      return localStorage.getItem(`img_${key}`);
    } catch (e) {
      return null;
    }
  }
}

export async function getAllStoredImages() {
  const keys = ['coverPhoto', 'archedPhoto', 'couplePhoto', 'groomQrImage', 'brideQrImage'];
  const result = {};
  for (const k of keys) {
    const val = await getStoredImage(k);
    if (val) result[k] = val;
  }
  return result;
}

export async function clearAllStoredImages() {
  try {
    const db = await getDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.clear();
      req.onsuccess = () => resolve(true);
      req.onerror = () => resolve(false);
    });
  } catch (err) {
    return false;
  }
}
