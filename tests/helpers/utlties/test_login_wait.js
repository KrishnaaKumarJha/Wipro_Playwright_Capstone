const { chromium, firefox } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false }); // Try headed to see if it helps
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log('Navigating to login...');
  await page.goto('https://www.ikea.com/in/en/profile/login/');
  
  console.log('Waiting for 25 seconds for anti-bot challenge...');
  await page.waitForTimeout(25000);
  
  await page.screenshot({ path: 'login_after_wait.png' });
  console.log('Screenshot saved.');
  
  await browser.close();
})();
