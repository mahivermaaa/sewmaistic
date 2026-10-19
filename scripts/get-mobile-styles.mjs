import puppeteer from 'puppeteer';

async function getMobileHeaderStyles() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.goto('https://www.sewdarlin.com.au/', { waitUntil: 'networkidle2' });

  const data = await page.evaluate(() => {
    const header = document.querySelector('header');
    const toggle = document.querySelector('#MENU_AS_CONTAINER_TOGGLE');
    const toggleParent = toggle ? toggle.closest('[data-mesh-id], div') : null;
    
    // Find pink bar
    const allDivs = Array.from(document.querySelectorAll('header div, header section, [id*="comp-"]'));
    const coloredDivs = allDivs.map(d => {
      const bg = window.getComputedStyle(d).backgroundColor;
      return {
        id: d.id,
        className: d.className,
        bg,
        height: d.clientHeight,
        text: d.innerText?.slice(0, 30)
      };
    }).filter(d => d.bg && d.bg !== 'rgba(0, 0, 0, 0)' && !d.bg.includes('255, 255, 255'));

    // Announcement bar styles
    const announcement = document.querySelector('[class*="announcement"], [id*="comp-m27as72y"], [data-mesh-id*="m27as72y"]') || document.body;
    
    return {
      coloredDivs: coloredDivs.slice(0, 15),
      bodyBg: window.getComputedStyle(document.body).backgroundColor
    };
  });

  console.log('Mobile colored divs:', JSON.stringify(data, null, 2));
  await browser.close();
}

getMobileHeaderStyles().catch(console.error);
