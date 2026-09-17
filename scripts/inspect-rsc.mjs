import fs from 'fs';

async function testRSC() {
  const url = 'https://www.#.com';
  console.log('Fetching RSC payload from', url);

  const headers = {
    'RSC': '1',
    'Next-Router-State-Tree': '%5B%22%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%5D%7D%2Cnull%2Cnull%2Ctrue%5D',
    'Next-Url': '/'
  };

  try {
    const res = await fetch(url, { headers });
    const text = await res.text();
    console.log('RSC Payload length:', text.length);
    fs.writeFileSync('./docs/research/thf/rsc_payload.txt', text);

    // Extract image URLs, strings, products, components from RSC payload
    const images = new Set(text.match(/\/[a-zA-Z0-9_\-\/.]+\.(?:png|jpg|jpeg|webp|svg|gif|mp4|webm)/gi) || []);
    console.log('Images in RSC:', Array.from(images));
    fs.writeFileSync('./docs/research/thf/rsc_images.json', JSON.stringify(Array.from(images), null, 2));

  } catch (e) {
    console.error('RSC fetch failed:', e);
  }
}

testRSC();
