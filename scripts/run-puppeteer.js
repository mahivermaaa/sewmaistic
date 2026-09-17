import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

async function runScraper() {
  const browserPaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ];

  let executablePath = browserPaths.find(p => fs.existsSync(p));
  console.log('Using browser executable:', executablePath || 'Default Puppeteer Chrome');

  const options = { headless: true };
  if (executablePath) {
    options.executablePath = executablePath;
  }

  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to https://www.thehazelnutfactory.com ...');
  await page.goto('https://www.thehazelnutfactory.com', { waitUntil: 'networkidle2', timeout: 45000 });

  const title = await page.title();
  console.log('Page Title:', title);

  const screenshotDir = './docs/design-references/thf/root-default';
  fs.mkdirSync(screenshotDir, { recursive: true });
  
  await page.screenshot({ path: `${screenshotDir}/desktop-1440.png`, fullPage: true });
  console.log('Saved desktop screenshot to desktop-1440.png');

  await page.setViewport({ width: 390, height: 844 });
  await page.screenshot({ path: `${screenshotDir}/mobile-390.png`, fullPage: true });
  console.log('Saved mobile screenshot to mobile-390.png');

  // Reset viewport for DOM extraction
  await page.setViewport({ width: 1440, height: 900 });

  // Extract all sections, hero items, cards, fonts, computed styles
  const data = await page.evaluate(() => {
    function getCss(el) {
      if (!el) return {};
      const cs = window.getComputedStyle(el);
      return {
        bg: cs.backgroundColor,
        color: cs.color,
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        padding: cs.padding,
        margin: cs.margin,
        display: cs.display,
        borderRadius: cs.borderRadius
      };
    }

    const sections = Array.from(document.querySelectorAll('header, main > *, footer, section')).map(el => {
      return {
        tag: el.tagName,
        className: el.className,
        id: el.id,
        innerText: el.innerText ? el.innerText.slice(0, 400) : '',
        styles: getCss(el),
        rect: el.getBoundingClientRect()
      };
    });

    const images = Array.from(document.querySelectorAll('img')).map(img => ({
      src: img.src || img.currentSrc,
      alt: img.alt,
      width: img.naturalWidth || img.width,
      height: img.naturalHeight || img.height,
      className: img.className
    }));

    return { sections, images };
  });

  const researchDir = './docs/research/thf/root-default';
  fs.mkdirSync(researchDir, { recursive: true });
  fs.writeFileSync(`${researchDir}/page_dom.json`, JSON.stringify(data, null, 2));
  console.log('Extracted', data.sections.length, 'sections and', data.images.length, 'images.');

  await browser.close();
}

runScraper().catch(console.error);