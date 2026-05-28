# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout-flow.spec.js >> Module 7 — Checkout Flow >> TC_CF_018 — Order appears in account order history
- Location: tests/checkout-flow.spec.js:302:7

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - navigation [ref=e5]:
      - link "Go back" [ref=e6] [cursor=pointer]:
        - /url: https://www.ikea.com/in/en/
        - img [ref=e7]
      - generic "IKEA" [ref=e9]:
        - img "IKEA" [ref=e10]
    - generic [ref=e11]:
      - heading "Login to your IKEA account." [level=1] [ref=e12]
      - paragraph [ref=e13]:
        - text: Too many passwords?
        - text: You can now login with an OTP we will send on your email address or verified mobile number.
        - text: Access your IKEA account using your email address to add and verify your mobile number.
    - generic [ref=e16]:
      - generic [ref=e17]: IKEA.in -
      - link "Cookie Policy" [ref=e18] [cursor=pointer]:
        - /url: https://www.ikea.com/in/en/customer-service/cookie-policy
      - text: and
      - link "Privacy Policy" [ref=e19] [cursor=pointer]:
        - /url: https://www.ikea.com/in/en/customer-service/privacy-policy
      - generic [ref=e20]: © Inter IKEA Systems B.V. 1999-2026
  - generic [ref=e23]:
    - generic [ref=e25]:
      - generic "Email or Verified Mobile Number" [ref=e26]
      - textbox "Email or Verified Mobile Number" [ref=e28]
    - text: Login
    - button "with an OTP" [ref=e29] [cursor=pointer]
    - generic [ref=e32]:
      - generic "Password" [ref=e33]
      - generic [ref=e34]:
        - textbox "Password" [ref=e35]
        - button "show password" [ref=e36] [cursor=pointer]:
          - generic [ref=e37]:
            - img [ref=e38]
            - generic [ref=e41]: show password
    - link "Forgot your password?" [ref=e42] [cursor=pointer]:
      - /url: "#"
    - generic [ref=e44]:
      - generic [ref=e45]:
        - checkbox "Stay signed in until you sign out" [checked] [ref=e46] [cursor=pointer]
        - generic [ref=e48]: Stay signed in until you sign out
      - button [ref=e50] [cursor=pointer]:
        - img [ref=e51]
    - button "Continue" [ref=e54] [cursor=pointer]:
      - generic [ref=e56]: Continue
    - heading "Do not have an IKEA account yet? Create one now:" [level=2] [ref=e59]
    - generic [ref=e61]:
      - button "I'm buying for my home" [ref=e62] [cursor=pointer]:
        - generic [ref=e64]: I'm buying for my home
      - button "I'm buying for my company" [ref=e66] [cursor=pointer]:
        - generic [ref=e68]: I'm buying for my company
```

# Test source

```ts
  217 |       }
  218 |     }
  219 |   });
  220 | 
  221 |   test('TC_CF_014 — Card number field accepts only numeric input', async ({ page }) => {
  222 |     await goToCheckout(page);
  223 |     // Navigate to payment
  224 |     for (let i = 0; i < 3; i++) {
  225 |       const btn = page.getByRole('button', { name: /continue|next|proceed/i }).first();
  226 |       if (await btn.isVisible({ timeout: 3000 })) {
  227 |         await btn.click();
  228 |         await page.waitForTimeout(3000);
  229 |       }
  230 |     }
  231 |     const cardOption = page.locator('label:has-text("Card"), button:has-text("Card")').first();
  232 |     if (await cardOption.isVisible({ timeout: 5000 })) {
  233 |       await cardOption.click();
  234 |       await page.waitForTimeout(2000);
  235 |     }
  236 |     const cardNum = page.locator('input[name*="card"], input[placeholder*="card number" i]').first();
  237 |     if (await cardNum.isVisible({ timeout: 5000 })) {
  238 |       await cardNum.fill('abcdefghijklmnop');
  239 |       const val = await cardNum.inputValue();
  240 |       // Non-numeric should be blocked or stripped
  241 |       expect(/^[0-9\s]*$/.test(val)).toBeTruthy();
  242 |     }
  243 |   });
  244 | 
  245 |   test('TC_CF_015 — Checkout does not attempt real payment', async ({ page }) => {
  246 |     await goToCheckout(page);
  247 |     // Complete all steps with dummy data — do NOT click final Pay
  248 |     for (let i = 0; i < 3; i++) {
  249 |       const btn = page.getByRole('button', { name: /continue|next|proceed/i }).first();
  250 |       if (await btn.isVisible({ timeout: 3000 })) {
  251 |         await btn.click();
  252 |         await page.waitForTimeout(3000);
  253 |       }
  254 |     }
  255 |     // Verify we have NOT been redirected to a payment gateway
  256 |     expect(page.url()).toContain('ikea.com');
  257 |   });
  258 | 
  259 |   test('TC_CF_016 — Order confirmation displays order reference ID', async ({ page }) => {
  260 |     // This test validates the confirmation page IF reachable with dummy data
  261 |     await goToCheckout(page);
  262 |     const body = await page.textContent('body');
  263 |     // Navigate as far as possible without paying
  264 |     for (let i = 0; i < 4; i++) {
  265 |       const btn = page.getByRole('button', { name: /continue|next|proceed|place order/i }).first();
  266 |       if (await btn.isVisible({ timeout: 3000 })) {
  267 |         await btn.click();
  268 |         await page.waitForTimeout(3000);
  269 |       }
  270 |     }
  271 |     const pageBody = await page.textContent('body');
  272 |     // If we reached confirmation (unlikely without real payment), check for order ID
  273 |     if (/confirmation|thank you|order placed/i.test(pageBody || '')) {
  274 |       expect(/order.*\d+|reference|confirmation.*number/i.test(pageBody || '')).toBeTruthy();
  275 |     }
  276 |     // Otherwise, we've validated we got as far as possible safely
  277 |     expect(page.url()).toContain('ikea.com');
  278 |   });
  279 | 
  280 |   test('TC_CF_017 — Cart badge resets after successful order', async ({ page }) => {
  281 |     // Validate cart badge after checkout completion
  282 |     await goToCheckout(page);
  283 |     // Navigate through checkout
  284 |     for (let i = 0; i < 4; i++) {
  285 |       const btn = page.getByRole('button', { name: /continue|next|proceed/i }).first();
  286 |       if (await btn.isVisible({ timeout: 3000 })) {
  287 |         await btn.click();
  288 |         await page.waitForTimeout(3000);
  289 |       }
  290 |     }
  291 |     // If order completed, cart should be 0
  292 |     const body = await page.textContent('body');
  293 |     if (/thank you|confirmation/i.test(body || '')) {
  294 |       await page.goto('/');
  295 |       await page.waitForLoadState('domcontentloaded');
  296 |       const badge = page.locator('[data-testid="cart-badge"], .cart-badge').first();
  297 |       const text = await badge.textContent({ timeout: 5000 }).catch(() => '0');
  298 |       expect(parseInt(text || '0', 10)).toBe(0);
  299 |     }
  300 |   });
  301 | 
  302 |   test('TC_CF_018 — Order appears in account order history', async ({ page }) => {
  303 |     await goToCheckout(page);
  304 |     // Navigate through checkout
  305 |     for (let i = 0; i < 4; i++) {
  306 |       const btn = page.getByRole('button', { name: /continue|next|proceed/i }).first();
  307 |       if (await btn.isVisible({ timeout: 3000 })) {
  308 |         await btn.click();
  309 |         await page.waitForTimeout(3000);
  310 |       }
  311 |     }
  312 |     const body = await page.textContent('body');
  313 |     if (/thank you|confirmation/i.test(body || '')) {
  314 |       await page.goto('/in/en/profile/orders/');
  315 |       await page.waitForLoadState('domcontentloaded');
  316 |       const ordersBody = await page.textContent('body');
> 317 |       expect(/order|purchase|\d+/i.test(ordersBody || '')).toBeTruthy();
      |                                                            ^ Error: expect(received).toBeTruthy()
  318 |     }
  319 |   });
  320 | });
  321 | 
```