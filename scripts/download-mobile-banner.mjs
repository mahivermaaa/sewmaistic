import https from 'https';
import fs from 'fs';
import path from 'path';

const url = 'https://static.wixstatic.com/media/39a655_0b3de40b427e4223a27628dd0c7d2ae4~mv2.jpg/v1/fill/w_750,h_734,al_c,q_90/Capture_JPG.jpg';
const dest = path.resolve('public/sites/sewdarlin/root-default/hero-banner-mobile.jpg');

const file = fs.createWriteStream(dest);
https.get(url, (res) => {
  res.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Downloaded mobile hero banner to', dest);
  });
}).on('error', (err) => console.error(err));
