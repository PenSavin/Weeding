import { chromium } from 'playwright';
import { preview, build } from 'vite';
import fs from 'fs';
import path from 'path';

async function main() {
  const screenshotDir = path.resolve(process.cwd(), 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  console.log('Building Vite project...');
  await build();

  console.log('Starting preview server...');
  const server = await preview({
    preview: { port: 4173, host: '127.0.0.1' }
  });
  const serverUrl = 'http://127.0.0.1:4173';
  console.log('Preview server running at:', serverUrl);

  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  const viewports = [
    { name: 'desktop-1280x800', width: 1280, height: 800 },
    { name: 'mobile-390x844', width: 390, height: 844 },
    { name: 'small-phone-320x568', width: 320, height: 568 },
    { name: 'landscape-740x360', width: 740, height: 360 }
  ];

  for (const vp of viewports) {
    console.log(`\nTesting viewport: ${vp.name} (${vp.width}x${vp.height})`);
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });

    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(err.message));
    page.on('response', res => {
      if (res.status() === 404) {
        console.log(`[404 Detected]: ${res.url()}`);
      }
    });

    const testUrl = `${serverUrl}?to=${encodeURIComponent('ឯកឧត្តម សុខា & លោកជំទាវ')}`;
    await page.goto(testUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);

    // 1. Capture unopened envelope
    const envelopePath = path.join(screenshotDir, `${vp.name}-01-envelope.png`);
    await page.screenshot({ path: envelopePath });
    console.log(`Saved: ${envelopePath}`);

    // If mobile-390x844, capture full journey through all sections
    if (vp.name === 'mobile-390x844') {
      console.log('Triggering opening sequence on 390x844...');
      await page.evaluate(() => document.getElementById('wax-seal')?.click());
      await page.waitForTimeout(5600); // Complete envelope opening

      // Cover Hero
      await page.screenshot({ path: path.join(screenshotDir, `mobile-02-cover.png`) });

      // Formal Section
      await page.evaluate(() => document.getElementById('formal-section')?.scrollIntoView());
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(screenshotDir, `mobile-03-formal.png`) });

      // Countdown Section
      await page.evaluate(() => document.getElementById('countdown-section')?.scrollIntoView());
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(screenshotDir, `mobile-04-countdown.png`) });

      // Programme Section
      await page.evaluate(() => document.getElementById('programme-section')?.scrollIntoView());
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(screenshotDir, `mobile-05-programme.png`) });

      // Love Story Section
      await page.evaluate(() => document.getElementById('love-story-section')?.scrollIntoView());
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(screenshotDir, `mobile-06-love-story.png`) });

      // Candlelight Section (water ripples)
      await page.evaluate(() => document.getElementById('candlelight-section')?.scrollIntoView());
      await page.waitForTimeout(300);
      await page.mouse.click(195, 420);
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(screenshotDir, `mobile-07-candlelight.png`) });

      // Gallery Section
      await page.evaluate(() => document.getElementById('gallery-section')?.scrollIntoView());
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(screenshotDir, `mobile-08-gallery.png`) });

      // Venue Section
      await page.evaluate(() => document.getElementById('venue-section')?.scrollIntoView());
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(screenshotDir, `mobile-09-venue.png`) });

      // Gift KHQR Section
      await page.evaluate(() => document.getElementById('gift-section')?.scrollIntoView());
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(screenshotDir, `mobile-10-gift.png`) });

      // Thank You Section
      await page.evaluate(() => document.getElementById('thankyou-section')?.scrollIntoView());
      await page.waitForTimeout(1200); // Candles lighting
      await page.screenshot({ path: path.join(screenshotDir, `mobile-11-thankyou.png`) });

      // Open Customizer Form
      await page.evaluate(() => document.getElementById('btn-open-editor')?.click());
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(screenshotDir, `mobile-12-customizer-form.png`) });
    }

    if (errors.length > 0) {
      console.warn(`Console errors on ${vp.name}:`, errors);
    } else {
      console.log(`✓ Zero console errors on ${vp.name}`);
    }

    await page.close();
  }

  // Desktop captures
  console.log('\nCapturing Desktop full experience...');
  const desktopPage = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await desktopPage.goto(`${serverUrl}?to=${encodeURIComponent('ឯកឧត្តម សុខា & លោកជំទាវ')}`, { waitUntil: 'domcontentloaded' });
  await desktopPage.waitForTimeout(600);
  await desktopPage.evaluate(() => document.getElementById('wax-seal')?.click());
  await desktopPage.waitForTimeout(5600);

  // Desktop Cover
  await desktopPage.screenshot({ path: path.join(screenshotDir, 'desktop-02-cover.png') });

  // Desktop Countdown & Programme
  await desktopPage.evaluate(() => document.getElementById('programme-section')?.scrollIntoView());
  await desktopPage.waitForTimeout(500);
  await desktopPage.screenshot({ path: path.join(screenshotDir, 'desktop-05-programme.png') });

  // Desktop Love Story & Candlelight
  await desktopPage.evaluate(() => document.getElementById('love-story-section')?.scrollIntoView());
  await desktopPage.waitForTimeout(500);
  await desktopPage.screenshot({ path: path.join(screenshotDir, 'desktop-06-love-story.png') });

  // Desktop Gift KHQR
  await desktopPage.evaluate(() => document.getElementById('gift-section')?.scrollIntoView());
  await desktopPage.waitForTimeout(500);
  await desktopPage.screenshot({ path: path.join(screenshotDir, 'desktop-10-gift.png') });

  // Desktop Thank You
  await desktopPage.evaluate(() => document.getElementById('thankyou-section')?.scrollIntoView());
  await desktopPage.waitForTimeout(1200);
  await desktopPage.screenshot({ path: path.join(screenshotDir, 'desktop-11-thankyou.png') });

  // Desktop Customizer Form
  await desktopPage.evaluate(() => document.getElementById('btn-open-editor')?.click());
  await desktopPage.waitForTimeout(400);
  await desktopPage.screenshot({ path: path.join(screenshotDir, 'desktop-12-customizer-form.png') });

  await desktopPage.close();
  await browser.close();
  server.httpServer.close();
  console.log('\nAll section screenshots captured successfully!');
}

main().catch(err => {
  console.error('Screenshot script error:', err);
  process.exit(1);
});
