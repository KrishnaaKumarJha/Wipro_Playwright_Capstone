const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.ikea.com/in/en/');
  
  // check for go shopping
  const goShopping = page.locator('text="Go shopping"').first();
  if (await goShopping.isVisible({ timeout: 5000 })) {
    console.log('Found Go Shopping - clicking');
    await goShopping.click();
    await page.waitForLoadState('networkidle');
  }

  // dump header
  const headerHtml = await page.innerHTML('header');
  require('fs').writeFileSync('header_dump.html', headerHtml);
  console.log('Header dumped');
  await browser.close();
})();
