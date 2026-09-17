import { execSync } from 'child_process';
import fs from 'fs';

console.log('Testing headless scraping...');
try {
  // Try running a node script using puppeteer or playwright
  const testScript = `
    const puppeteer = require('puppeteer');
    (async () => {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.goto('https://www.thehazelnutfactory.com', { waitUntil: 'networkidle2', timeout: 30000 });
      
      const title = await page.title();
      console.log('Page Title:', title);
      
      const screenshotPath = './docs/design-references/thf-desktop.png';
      fs.mkdirSync('./docs/design-references', { recursive: true });
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log('Saved screenshot to', screenshotPath);

      // Extract DOM sections & computed styles
      const pageData = await page.evaluate(() => {
        const sections = [...document.querySelectorAll('section, main > div, header, footer')].map(el => ({
          tagName: el.tagName,
          className: el.className,
          id: el.id,
          text: el.innerText ? el.innerText.slice(0, 300) : '',
          rect: el.getBoundingClientRect(),
          styles: {
            bg: getComputedStyle(el).backgroundColor,
            color: getComputedStyle(el).color,
            font: getComputedStyle(el).fontFamily,
            padding: getComputedStyle(el).padding
          }
        }));

        const images = [...document.querySelectorAll('img, video')].map(img => ({
          tag: img.tagName,
          src: img.src || img.currentSrc,
          alt: img.alt || '',
          width: img.width,
          height: img.height,
          rect: img.getBoundingClientRect()
        }));

        const bgImages = [...document.querySelectorAll('*')].filter(el => {
          const bg = getComputedStyle(el).backgroundImage;
          return bg && bg !== 'none' && !bg.includes('gradient');
        }).map(el => ({
          bg: getComputedStyle(el).backgroundImage,
          class: el.className
        }));

        return { sections, images, bgImages };
      });

      fs.writeFileSync('./docs/research/thf/rendered_page_data.json', JSON.stringify(pageData, null, 2));
      console.log('Saved rendered_page_data.json with', pageData.sections.length, 'sections and', pageData.images.length, 'images');

      await browser.close();
    })();
  `;

  fs.writeFileSync('scripts/run-puppeteer.js', testScript);
} catch (e) {
  console.error(e);
}
