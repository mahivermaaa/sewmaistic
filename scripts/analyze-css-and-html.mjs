import fs from 'fs';

function analyze() {
  const html = fs.readFileSync('./docs/research/thf/index.html', 'utf-8');
  const css = fs.readFileSync('./docs/research/thf/083hbnk4-x1f6.css', 'utf-8');

  // Extract font family names from CSS
  const fontFamilies = css.match(/font-family:[^;\}]+/g) || [];
  const uniqueFonts = [...new Set(fontFamilies)];
  console.log('Font families in CSS:', uniqueFonts);

  // Extract color values in CSS (hex, rgb, rgba, hsl, oklch)
  const colors = css.match(/(?:#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)|hsl\([^)]+\)|var\(--[a-zA-Z0-9_-]+\))/g) || [];
  const uniqueColors = [...new Set(colors)];
  console.log('Sample colors in CSS:', uniqueColors.slice(0, 30));

  // Extract Nav Links from HTML
  const navMatches = html.match(/<nav[\s\S]*?<\/nav>/g) || [];
  console.log('Nav HTML:', navMatches);

  // Extract Footer HTML
  const footerMatches = html.match(/<footer[\s\S]*?<\/footer>/g) || [];
  console.log('Footer HTML length:', footerMatches.join('').length);

  // Save analysis summary
  const summary = {
    fonts: uniqueFonts,
    sampleColors: uniqueColors.slice(0, 50),
    title: "The Hazelnut Factory - Research Summary"
  };
  fs.writeFileSync('./docs/research/thf/css_analysis.json', JSON.stringify(summary, null, 2));
}

analyze();
