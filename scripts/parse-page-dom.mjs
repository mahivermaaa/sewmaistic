import fs from 'fs';
import path from 'path';

function parseDom() {
  const domPath = './docs/research/thf/root-default/page_dom.json';
  if (!fs.existsSync(domPath)) {
    console.error('DOM file not found!');
    return;
  }

  const data = JSON.parse(fs.readFileSync(domPath, 'utf-8'));
  console.log('Total sections:', data.sections.length);
  console.log('Total images:', data.images.length);

  // Filter unique image URLs from target domain or relative paths
  const imgUrls = new Set();
  data.images.forEach(img => {
    if (img.src) {
      if (img.src.startsWith('https://www.#.com')) {
        imgUrls.add(img.src.replace('https://www.#.com', ''));
      } else if (img.src.startsWith('/')) {
        imgUrls.add(img.src);
      }
    }
  });

  console.log('Unique internal image paths:', imgUrls.size);
  fs.writeFileSync('./docs/research/thf/root-default/image_paths.json', JSON.stringify(Array.from(imgUrls), null, 2));

  // Log sections overview
  data.sections.forEach((sec, idx) => {
    console.log(`\nSection [${idx + 1}] (${sec.tag}.${sec.className.slice(0, 40)}):`);
    console.log(`Text preview: ${sec.innerText.replace(/\n+/g, ' ').slice(0, 150)}...`);
  });
}

parseDom();
