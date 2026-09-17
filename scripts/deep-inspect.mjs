import fs from 'fs';
import path from 'path';

async function deepInspect() {
  const dir = './docs/research/thf';
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));

  for (const f of files) {
    const text = fs.readFileSync(path.join(dir, f), 'utf-8');
    
    // Look for API endpoints or fetch calls
    const apis = text.match(/["'](?:\/api\/|https:\/\/api\.[^"']+)["']/g);
    if (apis) {
      console.log(`API calls in ${f}:`, apis);
    }

    // Look for component signatures or strings related to homepage sections
    if (text.includes('Hero') || text.includes('hero') || text.includes('Baklava') || text.includes('baklava') || text.includes('Sweets') || text.includes('sweets') || text.includes('Gifting') || text.includes('gifting') || text.includes('Categories') || text.includes('category')) {
      console.log(`Potential section content in ${f}`);
      // find array or object definitions
      const jsonLike = text.match(/\[\s*\{\s*"[^"]+":\s*"[^"]+"/g);
      if (jsonLike) {
        console.log(`JSON-like data in ${f}:`, jsonLike.slice(0, 5));
      }
    }
  }
}

deepInspect();
