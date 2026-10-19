import fs from 'fs';
import path from 'path';

const copies = [
  {
    src: 'C:\\Users\\mahi\\.gemini\\antigravity-ide\\brain\\c03db91e-cb52-4913-9998-5ec0f2365b73\\cosplay_costumes_collection_1792379631263.jpg',
    dest: 'public/sites/sewdarlin/root-default/col-cosplay.jpg'
  },
  {
    src: 'C:\\Users\\mahi\\.gemini\\antigravity-ide\\brain\\c03db91e-cb52-4913-9998-5ec0f2365b73\\thrift_store_collection_1792379656090.jpg',
    dest: 'public/sites/sewdarlin/root-default/col-thrift.jpg'
  },
  {
    src: 'C:\\Users\\mahi\\.gemini\\antigravity-ide\\brain\\c03db91e-cb52-4913-9998-5ec0f2365b73\\little_somethings_collection_1792379673025.jpg',
    dest: 'public/sites/sewdarlin/root-default/col-little-somethings.jpg'
  }
];

copies.forEach(({ src, dest }) => {
  fs.copyFileSync(src, dest);
  console.log('Copied to', dest);
});
