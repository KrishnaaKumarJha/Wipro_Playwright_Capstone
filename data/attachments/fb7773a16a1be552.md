# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: responsive-crossbrowser.spec.js >> Module 9 — Responsive & Cross-Browser UI >> TC_RU_004 — Cart page fully usable on tablet (768x1024)
- Location: tests/responsive-crossbrowser.spec.js:82:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: /proceed to checkout|checkout/i }).first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('button', { name: /proceed to checkout|checkout/i }).first()

```

```yaml
- link "Skip to main content":
  - /url: "#hnf-content"
- banner:
  - button "Change language or country/region, current language is English": EN
  - button "Enter postal code"
  - button "Select store"
  - link "IKEA Home":
    - /url: https://www.ikea.com/in/en/
  - search:
    - combobox "Search for products, inspiration or new arrivals"
    - button "Search IKEA products using a photo"
  - navigation "Shopping links":
    - list:
      - listitem:
        - link "Hej! Log in":
          - /url: https://www.ikea.com/in/en/profile/login
      - listitem:
        - link "Shopping list":
          - /url: https://www.ikea.com/in/en/favourites/
      - listitem:
        - link "Shopping bag":
          - /url: https://www.ikea.com/in/en/shoppingcart/
      - listitem:
        - button "Open the navigation menu"
        - navigation
- complementary "Floating action buttons"
- main:
  - status
  - heading "Your shopping bag is empty" [level=1]
  - paragraph: When you add products to your shopping bag, they will appear here.
  - paragraph: Can’t find your products? Make sure you’re logged in.
  - button "Log in"
  - button "Add by article number"
- complementary:
  - paragraph: Tell us about your experience!
  - button "Share feedback"
- contentinfo:
  - heading "Footer" [level=2]
  - heading "Join IKEA Family" [level=3]
  - paragraph: Enjoy member-only discounts & offers, early access to IKEA sale, delicious food offers and much more. Join for free.
  - paragraph:
    - link "See more":
      - /url: https://www.ikea.com/in/en/ikea-family/
  - link "Join the club":
    - /url: https://www.ikea.com/in/en/profile/signup/?itm_campaign=ikeafamily_signup&itm_element=footercta&itm_content=ikeafamily
  - heading "IKEA Business Network" [level=3]
  - paragraph: Join the membership program for business customers with exciting benefits and features. Join us for free and enjoy member discounts, quick-fix tips, online tutorials and a lot more.
  - paragraph:
    - link "See more":
      - /url: https://www.ikea.com/in/en/ikea-business/
  - link "Join now":
    - /url: https://in.accounts.ikea.com/en/identity/biz-signup/network/
  - list:
    - listitem:
      - heading "IKEA Family" [level=2]:
        - button "IKEA Family"
    - listitem:
      - heading "Services" [level=2]:
        - button "Services"
    - listitem:
      - heading "Help" [level=2]:
        - button "Help"
    - listitem:
      - heading "About IKEA" [level=2]:
        - button "About IKEA"
  - list:
    - listitem:
      - link "Follow IKEA on Facebook":
        - /url: https://fb.com/IKEAIndia
    - listitem:
      - link "Follow IKEA on Instagram":
        - /url: https://www.instagram.com/ikea.india/
    - listitem:
      - link "Follow IKEA on X":
        - /url: https://x.com/IKEAIndia
    - listitem:
      - link "Follow IKEA on Youtube":
        - /url: https://www.youtube.com/channel/UClQOVyyaLLXOx4YrpQLE01g
  - list
  - button "Cookie settings"
  - button "Change language or country/region, current language is English": EN
  - paragraph: © Inter IKEA Systems B.V. 2000-2026
  - list:
    - listitem:
      - link "Privacy policy":
        - /url: https://www.ikea.com/in/en/customer-service/privacy-policy-pub5a22cf61/
    - listitem:
      - link "Cookie policy":
        - /url: https://www.ikea.com/in/en/customer-service/cookie-policy-pubffc638db/
```

# Test source

```ts
  1   | // @ts-check
  2   | import { test, expect } from '@playwright/test';
  3   | import { dismissCookieAndPopups, loginWithTestAccount, addProductToCart, handleTurnstileGracefully } from './helpers/modules/responsive-crossbrowser.helper.js';
  4   | 
  5   | async function gotoResiliently(page, url, timeout = 30000) {
  6   |   await page.goto(url, { timeout, waitUntil: 'domcontentloaded' });
  7   | }
  8   | 
  9   | test.describe('Module 9 — Responsive & Cross-Browser UI', () => {
  10  | 
  11  |   test('TC_RU_001 — Homepage fully usable at 375x667 mobile viewport', async ({ browser }) => {
  12  |     const context = await browser.newContext({ viewport: { width: 375, height: 667 } });
  13  |     const page = await context.newPage();
  14  |     await gotoResiliently(page, 'https://www.ikea.com/in/en/');
  15  |     await handleTurnstileGracefully(page);
  16  |     await dismissCookieAndPopups(page);
  17  |     await page.waitForLoadState('domcontentloaded');
  18  | 
  19  |     // No horizontal overflow
  20  |     const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  21  |     expect(hasOverflow).toBeFalsy();
  22  | 
  23  |     // Content is readable — body has text
  24  |     const body = await page.textContent('body');
  25  |     expect(body?.trim().length).toBeGreaterThan(100);
  26  | 
  27  |     // Images scale proportionally
  28  |     const images = page.locator('img');
  29  |     const imgCount = Math.min(await images.count(), 5);
  30  |     for (let i = 0; i < imgCount; i++) {
  31  |       const box = await images.nth(i).boundingBox();
  32  |       if (box) expect(box.width).toBeLessThanOrEqual(375);
  33  |     }
  34  | 
  35  |     await context.close();
  36  |   });
  37  | 
  38  |   test('TC_RU_002 — Navigation collapses to hamburger on mobile', async ({ browser }) => {
  39  |     const context = await browser.newContext({ viewport: { width: 375, height: 667 } });
  40  |     const page = await context.newPage();
  41  |     await gotoResiliently(page, 'https://www.ikea.com/in/en/');
  42  |     await handleTurnstileGracefully(page);
  43  |     await dismissCookieAndPopups(page);
  44  | 
  45  |     // Hamburger/menu icon should be visible
  46  |     const hamburger = page.locator('button[aria-label*="menu" i], .hnf-btn[aria-label*="menu" i], [data-testid="hamburger"], button[aria-label*="navigation" i], button.hamburger, button[class*="menu-btn"]').first();
  47  |     await expect(hamburger).toBeVisible({ timeout: 10000 });
  48  | 
  49  |     // Click hamburger to open nav drawer
  50  |     await hamburger.click();
  51  |     await page.waitForTimeout(1000);
  52  | 
  53  |     // Nav drawer should be visible
  54  |     const nav = page.locator('nav, [role="navigation"], [class*="nav-drawer"], [class*="side-menu"]');
  55  |     expect(await nav.count()).toBeGreaterThan(0);
  56  | 
  57  |     await context.close();
  58  |   });
  59  | 
  60  |   test('TC_RU_003 — Product listing reflows to single/two-column on mobile', async ({ browser }) => {
  61  |     const context = await browser.newContext({ viewport: { width: 375, height: 667 } });
  62  |     const page = await context.newPage();
  63  |     await gotoResiliently(page, 'https://www.ikea.com/in/en/cat/sofas-fu003/');
  64  |     await handleTurnstileGracefully(page);
  65  |     await dismissCookieAndPopups(page);
  66  |     await page.waitForLoadState('domcontentloaded');
  67  | 
  68  |     const cards = page.locator('[data-testid="product-card"], .product-card, .plp-product-card__container');
  69  |     const count = Math.min(await cards.count(), 4);
  70  | 
  71  |     for (let i = 0; i < count; i++) {
  72  |       const box = await cards.nth(i).boundingBox();
  73  |       if (box) {
  74  |         // Cards should not overflow the screen (375px)
  75  |         expect(box.x + box.width).toBeLessThanOrEqual(380); // small tolerance
  76  |       }
  77  |     }
  78  | 
  79  |     await context.close();
  80  |   });
  81  | 
  82  |   test('TC_RU_004 — Cart page fully usable on tablet (768x1024)', async ({ browser }) => {
  83  |     const context = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  84  |     const page = await context.newPage();
  85  | 
  86  |     await gotoResiliently(page, 'https://www.ikea.com/in/en/');
  87  |     await handleTurnstileGracefully(page);
  88  |     await dismissCookieAndPopups(page);
  89  |     await addProductToCart(page);
  90  |     await addProductToCart(page, 'cat/beds-bm003/');
  91  |     await gotoResiliently(page, 'https://www.ikea.com/in/en/shoppingcart/');
  92  |     await handleTurnstileGracefully(page);
  93  |     await dismissCookieAndPopups(page);
  94  |     await page.waitForLoadState('domcontentloaded');
  95  | 
  96  |     // Checkout button should be accessible
  97  |     const checkoutBtn = page.getByRole('button', { name: /proceed to checkout|checkout/i }).first()
  98  |       || page.getByRole('link', { name: /proceed to checkout|checkout/i }).first();
> 99  |     await expect(checkoutBtn).toBeVisible({ timeout: 10000 });
      |                               ^ Error: expect(locator).toBeVisible() failed
  100 | 
  101 |     // No layout break
  102 |     const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  103 |     expect(hasOverflow).toBeFalsy();
  104 | 
  105 |     await context.close();
  106 |   });
  107 | 
  108 |   test('TC_RU_005 — Checkout address form functional on mobile', async ({ browser }) => {
  109 |     const context = await browser.newContext({ viewport: { width: 375, height: 667 } });
  110 |     const page = await context.newPage();
  111 | 
  112 |     await loginWithTestAccount(page);
  113 |     await addProductToCart(page);
  114 |     await gotoResiliently(page, 'https://www.ikea.com/in/en/shoppingcart/');
  115 |     await handleTurnstileGracefully(page);
  116 |     await dismissCookieAndPopups(page);
  117 |     await page.waitForLoadState('domcontentloaded');
  118 | 
  119 |     const checkoutBtn = page.getByRole('button', { name: /proceed to checkout|checkout/i }).first();
  120 |     if (await checkoutBtn.isVisible({ timeout: 5000 })) {
  121 |       await checkoutBtn.click();
  122 |       await page.waitForLoadState('domcontentloaded');
  123 |       await dismissCookieAndPopups(page);
  124 | 
  125 |       // All form fields should be visible (not hidden off-screen)
  126 |       const fields = page.locator('input[type="text"], input[type="tel"], input[type="email"], input[name*="address"]');
  127 |       const count = await fields.count();
  128 |       for (let i = 0; i < Math.min(count, 5); i++) {
  129 |         const box = await fields.nth(i).boundingBox();
  130 |         if (box) {
  131 |           expect(box.x).toBeGreaterThanOrEqual(0);
  132 |           expect(box.x + box.width).toBeLessThanOrEqual(380);
  133 |         }
  134 |       }
  135 |     }
  136 | 
  137 |     await context.close();
  138 |   });
  139 | 
  140 |   test('TC_RU_006 — No horizontal scrollbar on any main page at mobile viewport', async ({ browser }) => {
  141 |     const context = await browser.newContext({ viewport: { width: 375, height: 667 } });
  142 |     const page = await context.newPage();
  143 | 
  144 |     const urls = [
  145 |       'https://www.ikea.com/in/en/',
  146 |       'https://www.ikea.com/in/en/cat/sofas-fu003/',
  147 |       'https://www.ikea.com/in/en/shoppingcart/',
  148 |     ];
  149 | 
  150 |     for (const url of urls) {
  151 |       await gotoResiliently(page, url);
  152 |       await handleTurnstileGracefully(page);
  153 |       await dismissCookieAndPopups(page);
  154 |       await page.waitForLoadState('domcontentloaded');
  155 | 
  156 |       const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
  157 |       expect(hasOverflow).toBeTruthy();
  158 |     }
  159 | 
  160 |     await context.close();
  161 |   });
  162 | 
  163 |   test('TC_RU_007 — Core checkout flow completes in Firefox', async ({ browserName, page }) => {
  164 |     test.skip(browserName !== 'firefox', 'Firefox-only test');
  165 | 
  166 |     await loginWithTestAccount(page);
  167 |     await addProductToCart(page);
  168 |     await gotoResiliently(page, '/in/en/shoppingcart/');
  169 |     await handleTurnstileGracefully(page);
  170 |     await dismissCookieAndPopups(page);
  171 |     await page.waitForLoadState('domcontentloaded');
  172 | 
  173 |     const checkoutBtn = page.getByRole('button', { name: /proceed to checkout|checkout/i }).first();
  174 |     if (await checkoutBtn.isVisible({ timeout: 5000 })) {
  175 |       await checkoutBtn.click();
  176 |       await page.waitForLoadState('domcontentloaded');
  177 | 
  178 |       // Verify checkout page loaded without browser-specific errors
  179 |       const body = await page.textContent('body');
  180 |       expect(/checkout|delivery|address|order/i.test(body || '')).toBeTruthy();
  181 |     }
  182 | 
  183 |     // No JS errors
  184 |     const errors = [];
  185 |     page.on('pageerror', (err) => errors.push(err.message));
  186 |     await page.waitForTimeout(2000);
  187 |     expect(errors.length).toBe(0);
  188 |   });
  189 | 
  190 |   test('TC_RU_008 — Core checkout flow completes in WebKit', async ({ browserName, page }) => {
  191 |     test.skip(browserName !== 'webkit', 'WebKit-only test');
  192 | 
  193 |     await loginWithTestAccount(page);
  194 |     await addProductToCart(page);
  195 |     await gotoResiliently(page, '/in/en/shoppingcart/');
  196 |     await handleTurnstileGracefully(page);
  197 |     await dismissCookieAndPopups(page);
  198 |     await page.waitForLoadState('domcontentloaded');
  199 | 
```