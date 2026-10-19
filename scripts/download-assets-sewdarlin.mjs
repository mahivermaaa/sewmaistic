import fs from 'fs';
import path from 'path';
import https from 'https';

const ASSETS = [
  {
    name: 'logo.jpg',
    url: 'https://static.wixstatic.com/media/39a655_d14feff807b44afeacff430010b5f13b~mv2.jpg/v1/fill/w_400,h_400,al_c,q_90/840e4a01-c64b-4ee4-96aa-c051d0404287.jpg'
  },
  {
    name: 'hero-banner.png',
    url: 'https://static.wixstatic.com/media/39a655_a856103bef0d46dd8073ea0565a2ed2a~mv2.png/v1/fill/w_1920,h_785,al_c,q_90/39a655_a856103bef0d46dd8073ea0565a2ed2a~mv2.png'
  },
  // Collections
  {
    name: 'col-kindle.png',
    url: 'https://static.wixstatic.com/media/39a655_c478f9aee7b54343bb40d11b3a584c85~mv2.png/v1/fill/w_600,h_600,al_c,q_85/10.png'
  },
  {
    name: 'col-boot-bows.png',
    url: 'https://static.wixstatic.com/media/39a655_f1dc900dcfce41e9a2de0138be5c4d0e~mv2.png/v1/fill/w_600,h_600,al_c,q_85/13.png'
  },
  {
    name: 'col-home.jpg',
    url: 'https://static.wixstatic.com/media/39a655_31015e1ebc7e46599b8498a6a3458510~mv2.jpg/v1/fill/w_600,h_600,al_c,q_85/Website%20Collection%20thumbnails_edited.jpg'
  },
  {
    name: 'col-rodeo.png',
    url: 'https://static.wixstatic.com/media/39a655_df52c5ad47994e98957cce560b161281~mv2.png/v1/crop/x_7,y_0,w_1639,h_1654/fill/w_600,h_600,al_c,q_85/12.png'
  },
  {
    name: 'col-scrunchies.png',
    url: 'https://static.wixstatic.com/media/39a655_a297b8fd706045959b3886d748ff2c72~mv2.png/v1/fill/w_600,h_600,al_c,q_85/Website%20Collection%20thumbnails%20(1).png'
  },
  {
    name: 'col-bows.jpg',
    url: 'https://static.wixstatic.com/media/39a655_aa9d39be37bb47fbb90aa79706536a18~mv2.jpg/v1/fill/w_600,h_600,al_c,q_85/Website%20Collection%20thumbnails_edited.jpg'
  },
  {
    name: 'col-bags.png',
    url: 'https://static.wixstatic.com/media/39a655_e2eaa7ae03254dc28f8530c8d79caadf~mv2.png/v1/crop/x_7,y_0,w_1639,h_1654/fill/w_600,h_600,al_c,q_85/11.png'
  },
  {
    name: 'col-sale.png',
    url: 'https://static.wixstatic.com/media/39a655_6e849385150f43309c180a5fd15b7c68~mv2.png/v1/fill/w_600,h_600,al_c,q_85/14.png'
  },
  // Products
  {
    name: 'prod-green-puff-bow.png',
    url: 'https://static.wixstatic.com/media/39a655_74b71cf39624419eb1efd97dc3a23cec~mv2.png/v1/fill/w_600,h_600,al_c,q_85/39a655_74b71cf39624419eb1efd97dc3a23cec~mv2.png'
  },
  {
    name: 'prod-strawberry-kindle.jpg',
    url: 'https://static.wixstatic.com/media/39a655_d319ce41e4344826ba85b4b0c24d126d~mv2.jpg/v1/fill/w_600,h_600,al_c,q_85/39a655_d319ce41e4344826ba85b4b0c24d126d~mv2.jpg'
  },
  {
    name: 'prod-boots-kindle.jpg',
    url: 'https://static.wixstatic.com/media/39a655_0fa28519770e4e86be52e4ec564b68ea~mv2.jpg/v1/fill/w_600,h_600,al_c,q_85/39a655_0fa28519770e4e86be52e4ec564b68ea~mv2.jpg'
  },
  {
    name: 'prod-cowboy-kindle.jpg',
    url: 'https://static.wixstatic.com/media/39a655_60c762b8dd334b72a80a7c370ab6b79c~mv2.jpg/v1/fill/w_600,h_600,al_c,q_85/39a655_60c762b8dd334b72a80a7c370ab6b79c~mv2.jpg'
  },
  {
    name: 'prod-western-kindle.jpg',
    url: 'https://static.wixstatic.com/media/39a655_0034a08f05ca4dda90c9bf800f872e47~mv2.jpg/v1/fill/w_600,h_600,al_c,q_85/39a655_0034a08f05ca4dda90c9bf800f872e47~mv2.jpg'
  },
  {
    name: 'prod-cowgirl-kindle.jpg',
    url: 'https://static.wixstatic.com/media/39a655_634457815ec14b4bbac41e438a87db1f~mv2.jpg/v1/fill/w_600,h_600,al_c,q_85/39a655_634457815ec14b4bbac41e438a87db1f~mv2.jpg'
  },
  {
    name: 'prod-blue-patchwork-tote.png',
    url: 'https://static.wixstatic.com/media/39a655_6e6950e41fe94cf991ee2eec82289e90~mv2.png/v1/fill/w_600,h_600,al_c,q_85/39a655_6e6950e41fe94cf991ee2eec82289e90~mv2.png'
  },
  {
    name: 'prod-green-patchwork-tote.png',
    url: 'https://static.wixstatic.com/media/39a655_172fc6f1379348e68b38c5d24a7fd49c~mv2.png/v1/fill/w_600,h_600,al_c,q_85/39a655_172fc6f1379348e68b38c5d24a7fd49c~mv2.png'
  },
  {
    name: 'prod-purple-patchwork-tote.png',
    url: 'https://static.wixstatic.com/media/39a655_f7b747564654442eb11a68d207977f83~mv2.png/v1/fill/w_600,h_600,al_c,q_85/39a655_f7b747564654442eb11a68d207977f83~mv2.png'
  },
  {
    name: 'prod-pink-patchwork-tote.png',
    url: 'https://static.wixstatic.com/media/39a655_8494bb5f9d6d42eab885a44e116bba63~mv2.png/v1/fill/w_600,h_600,al_c,q_85/39a655_8494bb5f9d6d42eab885a44e116bba63~mv2.png'
  },
  {
    name: 'prod-assorted-wristlet.png',
    url: 'https://static.wixstatic.com/media/39a655_5f30a7e2794e447ba6f90cc2a7a2b8e4~mv2.png/v1/fill/w_600,h_600,al_c,q_85/39a655_5f30a7e2794e447ba6f90cc2a7a2b8e4~mv2.png'
  },
  {
    name: 'prod-gingham-wristlet.jpg',
    url: 'https://static.wixstatic.com/media/39a655_a2dc9e1265ea4f298b307b9f88cb3896~mv2.jpg/v1/fill/w_600,h_600,al_c,q_85/39a655_a2dc9e1265ea4f298b307b9f88cb3896~mv2.jpg'
  },
  {
    name: 'prod-love-xl-scrunchie.png',
    url: 'https://static.wixstatic.com/media/39a655_8b4347b79b4c41cfaece616243749d2a~mv2.png/v1/fill/w_600,h_600,al_c,q_85/39a655_8b4347b79b4c41cfaece616243749d2a~mv2.png'
  },
  {
    name: 'prod-strawberry-bow.png',
    url: 'https://static.wixstatic.com/media/39a655_82d540dbb5104421b0f9bc14c3df9ff4~mv2.png/v1/fill/w_600,h_600,al_c,q_85/39a655_82d540dbb5104421b0f9bc14c3df9ff4~mv2.png'
  },
  {
    name: 'prod-sunflower-coasters.png',
    url: 'https://static.wixstatic.com/media/39a655_3cc5bddaf20e4ad78cab63004936dced~mv2.png/v1/fill/w_600,h_600,al_c,q_85/39a655_3cc5bddaf20e4ad78cab63004936dced~mv2.png'
  },
  {
    name: 'prod-wrangler-jar-cover.png',
    url: 'https://static.wixstatic.com/media/39a655_ae09e98acd15428da3e792c7f40d147e~mv2.png/v1/fill/w_600,h_600,al_c,q_85/39a655_ae09e98acd15428da3e792c7f40d147e~mv2.png'
  },
  // Social icons
  {
    name: 'icon-instagram.png',
    url: 'https://static.wixstatic.com/media/8d6893330740455c96d218258a458aa4.png/v1/fill/w_80,h_80,al_c,q_85/8d6893330740455c96d218258a458aa4.png'
  },
  {
    name: 'icon-facebook.png',
    url: 'https://static.wixstatic.com/media/e316f544f9094143b9eac01f1f19e697.png/v1/fill/w_80,h_80,al_c,q_85/e316f544f9094143b9eac01f1f19e697.png'
  },
  {
    name: 'icon-tiktok.png',
    url: 'https://static.wixstatic.com/media/11062b_7a80704b0d4547c4a6a39347d587411d~mv2.png/v1/fill/w_80,h_80,al_c,q_85/11062b_7a80704b0d4547c4a6a39347d587411d~mv2.png'
  }
];

const destDir = path.resolve('public/sites/sewdarlin/root-default');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

async function downloadOne(item) {
  const destPath = path.join(destDir, item.name);
  return new Promise((resolve) => {
    const file = fs.createWriteStream(destPath);
    https.get(item.url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        https.get(response.headers.location, (res2) => {
          res2.pipe(file);
          file.on('finish', () => { file.close(); resolve(true); });
        }).on('error', () => resolve(false));
      } else {
        response.pipe(file);
        file.on('finish', () => { file.close(); resolve(true); });
      }
    }).on('error', (err) => {
      console.error(`Failed ${item.name}:`, err.message);
      resolve(false);
    });
  });
}

async function run() {
  console.log(`Downloading ${ASSETS.length} assets to ${destDir}...`);
  for (const item of ASSETS) {
    process.stdout.write(`Downloading ${item.name}... `);
    const ok = await downloadOne(item);
    console.log(ok ? 'OK' : 'FAILED');
  }
  console.log('All downloads completed!');
}

run();
