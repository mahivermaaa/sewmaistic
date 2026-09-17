import fs from 'fs';
import path from 'path';

async function main() {
  const url = 'https://www.#.com';
  console.log('Fetching main page HTML from', url);
  const res = await fetch(url);
  const html = await res.text();

  fs.mkdirSync('./docs/research/thf', { recursive: true });
  fs.writeFileSync('./docs/research/thf/index.html', html);
  console.log('Saved index.html (size:', html.length, ')');

  // Extract JS chunks
  const chunkMatches = html.match(/\/ _next\/static\/chunks\/[a-zA-Z0-9_\-~.]+\.js/g) ||
    html.match(/\/_next\/static\/chunks\/[a-zA-Z0-9_\-~.]+\.js/g) || [];
  console.log('Found JS chunks:', chunkMatches);

  for (const chunkPath of chunkMatches) {
    const chunkUrl = url + chunkPath;
    try {
      const cRes = await fetch(chunkUrl);
      if (cRes.ok) {
        const text = await cRes.text();
        const fname = path.basename(chunkPath);
        fs.writeFileSync(`./docs/research/thf/${fname}`, text);
        console.log(`Saved ${fname} (${text.length} bytes)`);
      }
    } catch (e) {
      console.error('Error fetching chunk:', chunkPath, e.message);
    }
  }

  // Extract CSS chunks
  const cssMatches = html.match(/\/_next\/static\/chunks\/[a-zA-Z0-9_\-~.]+\.css/g) || [];
  console.log('Found CSS chunks:', cssMatches);
  for (const cssPath of cssMatches) {
    const cssUrl = url + cssPath;
    try {
      const cRes = await fetch(cssUrl);
      if (cRes.ok) {
        const text = await cRes.text();
        const fname = path.basename(cssPath);
        fs.writeFileSync(`./docs/research/thf/${fname}`, text);
        console.log(`Saved ${fname} (${text.length} bytes)`);
      }
    } catch (e) {
      console.error('Error fetching CSS:', cssPath, e.message);
    }
  }
}

main().catch(console.error);
