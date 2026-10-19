import puppeteer from 'puppeteer';
import fs from 'fs';

async function inspectMobile() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  // iPhone 14 viewport
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1');

  console.log('Navigating to https://www.sewdarlin.com.au/ on mobile...');
  await page.goto('https://www.sewdarlin.com.au/', { waitUntil: 'networkidle2', timeout: 60000 });

  // Wait a moment for any popups or dynamic rendering
  await new Promise(r => setTimeout(r, 2000));

  // Dismiss popup if any
  try {
    await page.evaluate(() => {
      const closeButtons = Array.from(document.querySelectorAll('button, [aria-label*="close"], [data-testid*="close"]'));
      for (const b of closeButtons) {
        if (b.innerText?.includes('No') || b.getAttribute('aria-label')?.includes('close')) {
          b.click();
          break;
        }
      }
    });
  } catch (e) {}

  await page.screenshot({ path: 'scripts/mobile_live_top.png', fullPage: false });

  // Extract mobile header structure and images
  const mobileData = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src || img.currentSrc,
      alt: img.alt,
      width: img.naturalWidth || img.width,
      height: img.naturalHeight || img.height,
      parentClass: img.parentElement?.className
    }));

    // Find header elements
    const header = document.querySelector('header');
    const headerHtml = header ? header.outerHTML.slice(0, 3000) : '';

    return {
      images: images.slice(0, 25),
      headerHtml
    };
  });

  fs.writeFileSync('scripts/mobile_data.json', JSON.stringify(mobileData, null, 2));
  console.log('Saved screenshot to scripts/mobile_live_top.png');

  await browser.close();
}

inspectMobile().catch(console.error);
