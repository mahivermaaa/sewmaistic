import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import https from 'https';

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function scrapeDeep() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto('https://www.sewdarlin.com.au/', { waitUntil: 'networkidle2', timeout: 60000 });

  // Get deep details
  const pageDetails = await page.evaluate(() => {
    // 1. Navigation items
    const navLinks = Array.from(document.querySelectorAll('header nav a, header a')).map(a => ({
      text: a.innerText.trim(),
      href: a.href
    })).filter(a => a.text.length > 0 && !a.text.includes('\n'));

    // 2. Banner text
    const announcement = document.querySelector('[data-testid="richTextElement"], [class*="announcement"], header div')?.innerText || '';

    // 3. Products in New Arrivals and Fan Favourites
    // Look for product grids/lists
    const productElements = Array.from(document.querySelectorAll('[data-hook="product-item"], [data-testid="product-item"], li[data-hook="grid-item"], [class*="ProductItem"]'));

    // If Wix ecommerce widgets are used:
    const allTextBlocks = Array.from(document.querySelectorAll('section, [data-mesh-id]')).map(sec => ({
      id: sec.id,
      text: sec.innerText
    }));

    return {
      navLinks,
      allTextBlocks: allTextBlocks.slice(0, 10)
    };
  });

  console.log('Nav links:', pageDetails.navLinks);

  // Let's also extract all product lists directly by finding product links
  const products = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[href*="/product-page/"]'));
    const unique = new Map();

    links.forEach(a => {
      const href = a.href;
      const card = a.closest('li') || a.parentElement;
      const text = card ? card.innerText : a.innerText;
      const img = card ? card.querySelector('img') : a.querySelector('img');
      const imgSrc = img ? (img.src || img.currentSrc) : null;
      
      if (!unique.has(href)) {
        unique.set(href, {
          url: href,
          text: text,
          imgSrc: imgSrc
        });
      }
    });

    return Array.from(unique.values());
  });

  console.log('Found products count:', products.length);

  // Category items
  const categories = await page.evaluate(() => {
    const catLinks = Array.from(document.querySelectorAll('a[href*="/category/"]'));
    const unique = new Map();
    catLinks.forEach(a => {
      const href = a.href;
      const card = a.closest('div') || a;
      const img = card.querySelector('img') || a.querySelector('img');
      const text = a.innerText.trim() || card.innerText.trim();
      if (!unique.has(href)) {
        unique.set(href, {
          url: href,
          text,
          imgSrc: img ? img.src : null
        });
      }
    });
    return Array.from(unique.values());
  });

  console.log('Found categories count:', categories.length);

  fs.writeFileSync('scripts/sewdarlin_deep.json', JSON.stringify({
    pageDetails,
    products,
    categories
  }, null, 2));

  await browser.close();
}

scrapeDeep().catch(console.error);
