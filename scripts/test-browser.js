import { chromium } from 'playwright';

async function test() {
  try {
    const browser = await chromium.launch({ channel: 'msedge', headless: true });
    console.log('Successfully launched msedge!');
    await browser.close();
  } catch (e) {
    try {
      const browser = await chromium.launch({ channel: 'chrome', headless: true });
      console.log('Successfully launched chrome!');
      await browser.close();
    } catch (err) {
      console.error('Launch failed:', err.message);
    }
  }
}
test();
