import fs from 'fs';
import path from 'path';

const dir = './docs/research/thf';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf-8');
  // Look for text fragments, titles, images, categories, section headings
  const strings = content.match(/"[^"\r\n]{5,100}"/g) || [];
  const imageRefs = content.match(/(?:src|image|bg|poster|url)\s*[:=]\s*["']([^"']+\.(?:png|jpg|jpeg|webp|svg))["']/gi) || [];
  
  console.log(`\n--- File: ${f} (${content.length} bytes) ---`);
  if (imageRefs.length > 0) {
    console.log('Image refs:', imageRefs.slice(0, 15));
  }
  
  // Look for headings / section titles
  const headings = strings.filter(s => 
    s.includes('Hazelnut') || s.includes('Sweet') || s.includes('Baklava') || 
    s.includes('Gift') || s.includes('Box') || s.includes('Collection') ||
    s.includes('Wedding') || s.includes('Story') || s.includes('Handcrafted') ||
    s.includes('Category') || s.includes('Best') || s.includes('Artisanal') ||
    s.includes('Crafted') || s.includes('Savour') || s.includes('Treat') ||
    s.includes('Luxury') || s.includes('Signature') || s.includes('Celebration')
  );
  if (headings.length > 0) {
    console.log('Key text strings:', headings.slice(0, 20));
  }
});
