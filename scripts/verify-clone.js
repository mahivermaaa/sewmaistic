import puppeteer from 'puppeteer';
import fs from 'fs';

async function verifyClone() {
  const browserPaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ];

  let executablePath = browserPaths.find(p => fs.existsSync(p));
  const options = { headless: true };
  if (executablePath) options.executablePath = executablePath;

  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:3001 ...');
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle2', timeout: 30000 });

  const outDir = './docs/design-references/thf/root-default';
  fs.mkdirSync(outDir, { recursive: true });

  await page.screenshot({ path: `${outDir}/clone-verification-desktop.png`, fullPage: true });
  console.log('Saved clone-verification-desktop.png');

  await page.setViewport({ width: 390, height: 844 });
  await page.screenshot({ path: `${outDir}/clone-verification-mobile.png`, fullPage: true });
  console.log('Saved clone-verification-mobile.png');

  await browser.close();
}

verifyClone().catch(console.error);
