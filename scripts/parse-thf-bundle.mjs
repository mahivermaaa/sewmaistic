import fs from 'fs';
import path from 'path';

function extractData() {
  const dir = './docs/research/thf';
  const files = fs.readdirSync(dir);
  
  const images = new Set();
  const textSnippets = [];
  
  files.forEach(file => {
    if (file.endsWith('.js') || file.endsWith('.html') || file.endsWith('.css')) {
      const content = fs.readFileSync(path.join(dir, file), 'utf-8');
      
      // Find image URLs
      const imgRegex = /(?:\/images\/|\/icons\/|\/logo\/|https?:\/\/[^"'\s]+\.(?:png|jpg|jpeg|webp|svg|gif))/g;
      let match;
      while ((match = imgRegex.exec(content)) !== null) {
        images.add(match[0]);
      }

      // Find relative image paths like /images/... or /logo/...
      const relImgRegex = /"(\/(?:images|logo|icons|banner|products|assets|upload|static)[^"]+)"/g;
      while ((match = relImgRegex.exec(content)) !== null) {
        images.add(match[1]);
      }
    }
  });

  console.log('Extracted Images:', Array.from(images));
  fs.writeFileSync('./docs/research/thf/extracted_images.json', JSON.stringify(Array.from(images), null, 2));

  // Let's inspect the CSS file for variables and fonts
  const css = fs.readFileSync('./docs/research/thf/083hbnk4-x1f6.css', 'utf-8');
  console.log('CSS Length:', css.length);
  
  // Extract CSS variables
  const rootVars = css.match(/--[a-zA-Z0-9_-]+:[^;}]+/g) || [];
  console.log('CSS Variables count:', rootVars.length);
  fs.writeFileSync('./docs/research/thf/css_variables.json', JSON.stringify(rootVars, null, 2));
}

extractData();
