import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

async function main() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to https://www.sewdarlin.com.au/...');
  await page.goto('https://www.sewdarlin.com.au/', { waitUntil: 'networkidle2', timeout: 60000 });

  // Extract all details
  const siteData = await page.evaluate(() => {
    // Collect all fonts
    const fontFaces = Array.from(document.fonts).map(f => ({
      family: f.family,
      weight: f.weight,
      style: f.style
    }));

    // Collect all links (stylesheet, fonts)
    const links = Array.from(document.querySelectorAll('link')).map(l => ({
      rel: l.rel,
      href: l.href
    }));

    // Collect all images
    const images = Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src || img.currentSrc,
      alt: img.alt,
      width: img.naturalWidth || img.width,
      height: img.naturalHeight || img.height,
      className: img.className
    }));

    // Background images
    const bgElements = Array.from(document.querySelectorAll('*')).filter(el => {
      const bg = window.getComputedStyle(el).backgroundImage;
      return bg && bg !== 'none';
    }).map(el => ({
      tagName: el.tagName,
      className: el.className,
      backgroundImage: window.getComputedStyle(el).backgroundImage
    }));

    // Key sections computed styles
    const bodyStyle = window.getComputedStyle(document.body);
    const h1 = document.querySelector('h1, h2, .font-serif');
    const h1Style = h1 ? window.getComputedStyle(h1) : null;

    return {
      title: document.title,
      fontFaces,
      links,
      images,
      bgElements,
      body: {
        backgroundColor: bodyStyle.backgroundColor,
        color: bodyStyle.color,
        fontFamily: bodyStyle.fontFamily
      },
      h1: h1Style ? {
        fontFamily: h1Style.fontFamily,
        fontSize: h1Style.fontSize,
        fontWeight: h1Style.fontWeight,
        color: h1Style.color
      } : null
    };
  });

  console.log('Site title:', siteData.title);
  console.log('Found images count:', siteData.images.length);
  console.log('Found bg elements count:', siteData.bgElements.length);
  console.log('Found font faces count:', siteData.fontFaces.length);

  fs.writeFileSync('scripts/sewdarlin_raw.json', JSON.stringify(siteData, null, 2));
  console.log('Saved data to scripts/sewdarlin_raw.json');

  await browser.close();
}

main().catch(err => {
  console.error('Extraction error:', err);
  process.exit(1);
});
