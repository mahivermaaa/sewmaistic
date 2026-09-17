import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://www.thehazelnutfactory.com';

async function downloadAllAssetsClean() {
  const rawPaths = JSON.parse(fs.readFileSync('./docs/research/thf/root-default/image_paths.json', 'utf-8'));
  
  const cleanPaths = new Set();
  rawPaths.forEach(p => {
    if (!p) return;
    if (p.includes('/_next/image?url=')) {
      const match = p.match(/url=([^&]+)/);
      if (match) {
        cleanPaths.add(decodeURIComponent(match[1]));
      }
    } else {
      cleanPaths.add(p);
    }
  });

  console.log('Clean asset paths to download:', cleanPaths.size);
  const publicDir = './public/sites/thf/root-default';
  fs.mkdirSync(publicDir, { recursive: true });

  for (const assetPath of cleanPaths) {
    if (!assetPath || assetPath.length < 2) continue;
    const fullUrl = BASE_URL + assetPath;
    
    // Make sure destPath doesn't contain query params
    const cleanRelativePath = assetPath.split('?')[0];
    const destPath = path.join(publicDir, cleanRelativePath);
    fs.mkdirSync(path.dirname(destPath), { recursive: true });

    try {
      console.log(`Downloading ${assetPath} ...`);
      const res = await fetch(fullUrl);
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(destPath, buffer);
        console.log(`Saved ${cleanRelativePath}`);
      } else {
        console.warn(`Failed ${assetPath}: status ${res.status}`);
      }
    } catch (e) {
      console.error(`Error downloading ${assetPath}:`, e.message);
    }
  }

  console.log('Finished downloading all clean assets!');
}

downloadAllAssetsClean().catch(console.error);
