# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout-flow.spec.js >> Module 7 — Checkout Flow >> TC_CF_018 — Order appears in account order history
- Location: tests/checkout-flow.spec.js:337:7

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Test source

```ts
  252 |       }
  253 |     }
  254 |   });
  255 | 
  256 |   test('TC_CF_014 — Card number field accepts only numeric input', async ({ page }) => {
  257 |     await goToCheckout(page);
  258 |     // Navigate to payment
  259 |     for (let i = 0; i < 3; i++) {
  260 |       const btn = page.getByRole('button', { name: /continue|next|proceed/i }).first();
  261 |       if (await btn.isVisible({ timeout: 3000 })) {
  262 |         await btn.click();
  263 |         await page.waitForTimeout(3000);
  264 |       }
  265 |     }
  266 |     const cardOption = page.locator('label:has-text("Card"), button:has-text("Card")').first();
  267 |     if (await cardOption.isVisible({ timeout: 5000 })) {
  268 |       await cardOption.click();
  269 |       await page.waitForTimeout(2000);
  270 |     }
  271 |     const cardNum = page.locator('input[name*="card"], input[placeholder*="card number" i]').first();
  272 |     if (await cardNum.isVisible({ timeout: 5000 })) {
  273 |       await cardNum.fill('abcdefghijklmnop');
  274 |       const val = await cardNum.inputValue();
  275 |       // Non-numeric should be blocked or stripped
  276 |       expect(/^[0-9\s]*$/.test(val)).toBeTruthy();
  277 |     }
  278 |   });
  279 | 
  280 |   test('TC_CF_015 — Checkout does not attempt real payment', async ({ page }) => {
  281 |     await goToCheckout(page);
  282 |     // Complete all steps with dummy data — do NOT click final Pay
  283 |     for (let i = 0; i < 3; i++) {
  284 |       const btn = page.getByRole('button', { name: /continue|next|proceed/i }).first();
  285 |       if (await btn.isVisible({ timeout: 3000 })) {
  286 |         await btn.click();
  287 |         await page.waitForTimeout(3000);
  288 |       }
  289 |     }
  290 |     // Verify we have NOT been redirected to a payment gateway
  291 |     expect(page.url()).toContain('ikea.com');
  292 |   });
  293 | 
  294 |   test('TC_CF_016 — Order confirmation displays order reference ID', async ({ page }) => {
  295 |     // This test validates the confirmation page IF reachable with dummy data
  296 |     await goToCheckout(page);
  297 |     const body = await page.textContent('body');
  298 |     // Navigate as far as possible without paying
  299 |     for (let i = 0; i < 4; i++) {
  300 |       const btn = page.getByRole('button', { name: /continue|next|proceed|place order/i }).first();
  301 |       if (await btn.isVisible({ timeout: 3000 })) {
  302 |         await btn.click();
  303 |         await page.waitForTimeout(3000);
  304 |       }
  305 |     }
  306 |     const pageBody = await page.textContent('body');
  307 |     // If we reached confirmation (unlikely without real payment), check for order ID
  308 |     if (/confirmation|thank you|order placed/i.test(pageBody || '')) {
  309 |       expect(/order.*\d+|reference|confirmation.*number/i.test(pageBody || '')).toBeTruthy();
  310 |     }
  311 |     // Otherwise, we've validated we got as far as possible safely
  312 |     expect(page.url()).toContain('ikea.com');
  313 |   });
  314 | 
  315 |   test('TC_CF_017 — Cart badge resets after successful order', async ({ page }) => {
  316 |     // Validate cart badge after checkout completion
  317 |     await goToCheckout(page);
  318 |     // Navigate through checkout
  319 |     for (let i = 0; i < 4; i++) {
  320 |       const btn = page.getByRole('button', { name: /continue|next|proceed/i }).first();
  321 |       if (await btn.isVisible({ timeout: 3000 })) {
  322 |         await btn.click();
  323 |         await page.waitForTimeout(3000);
  324 |       }
  325 |     }
  326 |     // If order completed, cart should be 0
  327 |     const body = await page.textContent('body');
  328 |     if (/thank you|confirmation/i.test(body || '')) {
  329 |       await page.goto('/');
  330 |       await page.waitForLoadState('domcontentloaded');
  331 |       const badge = page.locator('[data-testid="cart-badge"], .cart-badge').first();
  332 |       const text = await badge.textContent({ timeout: 5000 }).catch(() => '0');
  333 |       expect(parseInt(text || '0', 10)).toBe(0);
  334 |     }
  335 |   });
  336 | 
  337 |   test('TC_CF_018 — Order appears in account order history', async ({ page }) => {
  338 |     await goToCheckout(page);
  339 |     // Navigate through checkout
  340 |     for (let i = 0; i < 4; i++) {
  341 |       const btn = page.getByRole('button', { name: /continue|next|proceed/i }).first();
  342 |       if (await btn.isVisible({ timeout: 3000 })) {
  343 |         await btn.click();
  344 |         await page.waitForTimeout(3000);
  345 |       }
  346 |     }
  347 |     const body = await page.textContent('body');
  348 |     if (/thank you|confirmation/i.test(body || '')) {
  349 |       await page.goto('/in/en/profile/orders/');
  350 |       await page.waitForLoadState('domcontentloaded');
  351 |       const ordersBody = await page.textContent('body');
> 352 |       expect(/order|purchase|\d+/i.test(ordersBody || '')).toBeTruthy();
      |                                                            ^ Error: expect(received).toBeTruthy()
  353 |     } else {
  354 |       // Could not complete checkout (no real payment) — verify we're still on IKEA
  355 |       // and check that the order history page at least loads
  356 |       await page.goto('/in/en/profile/orders/');
  357 |       await page.waitForLoadState('domcontentloaded');
  358 |       const ordersBody = await page.textContent('body') || '';
  359 |       // Page should show either orders, or a "no orders" / login prompt
  360 |       expect(/order|purchase|no orders|sign in|login|history|profile/i.test(ordersBody)).toBeTruthy();
  361 |     }
  362 |   });
  363 | });
  364 | 
```