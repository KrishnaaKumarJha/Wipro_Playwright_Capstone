# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cart-management.spec.js >> Module 6 — Cart Management >> TC_CM_011 — Price column is read-only
- Location: tests/cart-management.spec.js:213:7

# Error details

```
TimeoutError: locator.evaluate: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('[class*="price-module__price"], .cart-ingka-price-module__price, [data-testid="cart-item-price"], [class*="price"]').first()

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - link "Skip to main content":
      - /url: "#hnf-content"
      - generic:
        - generic: Skip to main content
    - banner [ref=e3]:
      - generic [ref=e5]:
        - button "Change language or country/region, current language is English" [ref=e7] [cursor=pointer]:
          - generic:
            - img
            - generic: INEnglish
        - link "Flat 15% off* on furniture shopping above Rs. 25,000. Shop now." [ref=e10] [cursor=pointer]:
          - /url: https://www.ikea.com/in/en/offers/
          - img [ref=e11]
          - generic [ref=e14]: Flat 15% off* on furniture shopping above Rs. 25,000. Shop now.
        - generic [ref=e15]:
          - button "Enter postal code" [ref=e17] [cursor=pointer]:
            - generic:
              - img
              - generic: Enter postal code
          - button "Select store" [ref=e18] [cursor=pointer]:
            - generic:
              - img
              - generic: Select store
      - generic [ref=e20]:
        - link "IKEA Home" [ref=e22] [cursor=pointer]:
          - /url: https://www.ikea.com/in/en/
        - navigation "Open the navigation menu" [ref=e25]:
          - button "Products" [ref=e26] [cursor=pointer]
          - button "Rooms" [ref=e27] [cursor=pointer]
          - button "Offers" [ref=e28] [cursor=pointer]
          - button "Inspiration" [ref=e29] [cursor=pointer]
          - button "Design/Support" [ref=e30] [cursor=pointer]
        - search [ref=e36]:
          - generic [ref=e37]:
            - img
            - combobox "Search for products, inspiration or new arrivals" [ref=e38]
            - button "Search IKEA products using a photo" [ref=e40] [cursor=pointer]:
              - generic:
                - img
                - generic: Search IKEA products using a photo
        - navigation "Shopping links" [ref=e41]:
          - list [ref=e42]:
            - listitem [ref=e43]:
              - link "Hej! Log in" [ref=e45] [cursor=pointer]:
                - /url: https://www.ikea.com/in/en/profile/login
                - generic:
                  - img
                  - generic: Hej! Log in
            - listitem [ref=e46]:
              - link "Shopping list" [ref=e48] [cursor=pointer]:
                - /url: https://www.ikea.com/in/en/favourites/
                - generic:
                  - img
                  - generic: Shopping list
            - listitem [ref=e49]:
              - link "Shopping bag" [ref=e51] [cursor=pointer]:
                - /url: https://www.ikea.com/in/en/shoppingcart/
                - generic:
                  - img
                  - generic: Shopping bag
    - generic:
      - complementary "Floating action buttons"
  - main [ref=e52]:
    - generic [ref=e55]:
      - generic:
        - generic:
          - status
        - generic:
          - button [active]:
            - generic:
              - img
              - generic: Close notification
      - generic [ref=e57]:
        - heading "Your shopping bag is empty" [level=1] [ref=e59]
        - paragraph [ref=e60]: When you add products to your shopping bag, they will appear here.
        - paragraph [ref=e61]: Can’t find your products? Make sure you’re logged in.
        - generic [ref=e62]:
          - button "Log in" [ref=e63] [cursor=pointer]:
            - generic [ref=e65]: Log in
          - button "Add by article number" [ref=e66] [cursor=pointer]:
            - generic [ref=e68]: Add by article number
  - generic [ref=e70]:
    - complementary [ref=e71]:
      - paragraph [ref=e72]: Tell us about your experience!
      - button "Share feedback" [ref=e73] [cursor=pointer]:
        - generic:
          - generic: Share feedback
    - contentinfo [ref=e74]:
      - generic [ref=e75]:
        - heading "Footer" [level=2] [ref=e76]
        - generic [ref=e77]:
          - generic [ref=e78]:
            - generic [ref=e79]:
              - heading "Join IKEA Family" [level=3] [ref=e80]
              - paragraph [ref=e82]: Enjoy member-only discounts & offers, early access to IKEA sale, delicious food offers and much more. Join for free.
              - paragraph [ref=e83]:
                - link "See more" [ref=e84] [cursor=pointer]:
                  - /url: https://www.ikea.com/in/en/ikea-family/
              - link "Join the club" [ref=e85] [cursor=pointer]:
                - /url: https://www.ikea.com/in/en/profile/signup/?itm_campaign=ikeafamily_signup&itm_element=footercta&itm_content=ikeafamily
                - generic:
                  - generic: Join the club
            - generic [ref=e86]:
              - heading "IKEA Business Network" [level=3] [ref=e87]
              - paragraph [ref=e89]: Join the membership program for business customers with exciting benefits and features. Join us for free and enjoy member discounts, quick-fix tips, online tutorials and a lot more.
              - paragraph [ref=e90]:
                - link "See more" [ref=e91] [cursor=pointer]:
                  - /url: https://www.ikea.com/in/en/ikea-business/
              - link "Join now" [ref=e92] [cursor=pointer]:
                - /url: https://in.accounts.ikea.com/en/identity/biz-signup/network/
                - generic:
                  - generic: Join now
          - list [ref=e94]:
            - listitem [ref=e95]:
              - heading "IKEA Family" [level=3] [ref=e96]:
                - generic: IKEA Family
              - list "IKEA Family Log in Join IKEA Family Member offers Workshops & Events" [ref=e97]:
                - listitem [ref=e98]:
                  - link "Log in" [ref=e99] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/profile/login
                - listitem [ref=e100]:
                  - link "Join IKEA Family" [ref=e101] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/profile/signup/family/
                - listitem [ref=e102]:
                  - link "Member offers" [ref=e103] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/offers/family-offers/
                - listitem [ref=e104]:
                  - link "Workshops & Events" [ref=e105] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/stores/events/#/store
            - listitem [ref=e106]:
              - heading "Services" [level=3] [ref=e107]:
                - generic: Services
              - list "Services Delivery Service Click & collect Personal shopper Online planning tool Assembly Service Measuring Service Kitchen Planning Installation Service Track & manage your order Customer Service Recycle Program" [ref=e108]:
                - listitem [ref=e109]:
                  - link "Delivery Service" [ref=e110] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/customer-service/delivery-service-pubd5889e60/
                - listitem [ref=e111]:
                  - link "Click & collect" [ref=e112] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/customer-service/services/click-and-collect-shopping-at-ikea-stores-pubada7dae3/
                - listitem [ref=e113]:
                  - link "Personal shopper" [ref=e114] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/customer-service/services/personal-shopper-pubdc2b0ed0/
                - listitem [ref=e115]:
                  - link "Online planning tool" [ref=e116] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/planners/
                - listitem [ref=e117]:
                  - link "Assembly Service" [ref=e118] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/customer-service/services/assembly/
                - listitem [ref=e119]:
                  - link "Measuring Service" [ref=e120] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/customer-service/measuring-service-pub2ecf8410/
                - listitem [ref=e121]:
                  - link "Kitchen Planning" [ref=e122] [cursor=pointer]:
                    - /url: https://kitchen.planner.ikea.com/in/en/
                - listitem [ref=e123]:
                  - link "Installation Service" [ref=e124] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/customer-service/installation-service-pub7f1a7a60/
                - listitem [ref=e125]:
                  - link "Track & manage your order" [ref=e126] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/purchases/lookup/
                - listitem [ref=e127]:
                  - link "Customer Service" [ref=e128] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/customer-service/
                - listitem [ref=e129]:
                  - link "Recycle Program" [ref=e130] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/product-guides/sustainable-products/recycle-program-pub1a5a43b0/
            - listitem [ref=e131]:
              - heading "Help" [level=3] [ref=e132]:
                - generic: Help
              - list "Help How to shop Return policy Prices and price tags Contact us FAQ's Gift Card Terms and conditions Damaged articles claim GST rate revision" [ref=e133]:
                - listitem [ref=e134]:
                  - link "How to shop" [ref=e135] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/customer-service/shopping-at-ikea/
                - listitem [ref=e136]:
                  - link "Return policy" [ref=e137] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/customer-service/returns-claims/return-policy/
                - listitem [ref=e138]:
                  - link "Prices and price tags" [ref=e139] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/customer-service/price-guarantee-pub2acecd51/
                - listitem [ref=e140]:
                  - link "Contact us" [ref=e141] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/customer-service/support/
                - listitem [ref=e142]:
                  - link "FAQ's" [ref=e143] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/customer-service/faq-pub7f08ed41/
                - listitem [ref=e144]:
                  - link "Gift Card" [ref=e145] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/customer-service/ikea-gift-cards-pub004138e1/
                - listitem [ref=e146]:
                  - link "Terms and conditions" [ref=e147] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/customer-service/terms-conditions/
                - listitem [ref=e148]:
                  - link "Damaged articles claim" [ref=e149] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/customer-service/track-manage-order/
                - listitem [ref=e150]:
                  - link "GST rate revision" [ref=e151] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/files/pdf/8a/8a/8a8a1c23/gst-rate-revision.pdf
            - listitem [ref=e152]:
              - heading "About IKEA" [level=3] [ref=e153]:
                - generic: About IKEA
              - list "About IKEA This is IKEA Careers at IKEA CSR Policy Newsroom Sustainability IKEA Stores IKEA Food IKEA for Business" [ref=e154]:
                - listitem [ref=e155]:
                  - link "This is IKEA" [ref=e156] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/this-is-ikea/
                - listitem [ref=e157]:
                  - link "Careers at IKEA" [ref=e158] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/this-is-ikea/work-with-us/
                - listitem [ref=e159]:
                  - link "CSR Policy" [ref=e160] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/this-is-ikea/csr-policy-ikea-india-private-limited-pubcc43bc70/
                - listitem [ref=e161]:
                  - link "Newsroom" [ref=e162] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/newsroom/
                - listitem [ref=e163]:
                  - link "Sustainability" [ref=e164] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/this-is-ikea/sustainable-everyday/
                - listitem [ref=e165]:
                  - link "IKEA Stores" [ref=e166] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/stores/
                - listitem [ref=e167]:
                  - link "IKEA Food" [ref=e168] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/cat/food-beverages-fb001/
                - listitem [ref=e169]:
                  - link "IKEA for Business" [ref=e170] [cursor=pointer]:
                    - /url: https://www.ikea.com/in/en/ikea-business/
          - generic [ref=e171]:
            - generic [ref=e172]:
              - list [ref=e173]:
                - listitem [ref=e174]:
                  - link "Follow IKEA on Facebook" [ref=e175] [cursor=pointer]:
                    - /url: https://fb.com/IKEAIndia
                    - img [ref=e176]
                - listitem [ref=e178]:
                  - link "Follow IKEA on Instagram" [ref=e179] [cursor=pointer]:
                    - /url: https://www.instagram.com/ikea.india/
                    - img [ref=e180]
                - listitem [ref=e182]:
                  - link "Follow IKEA on X" [ref=e183] [cursor=pointer]:
                    - /url: https://x.com/IKEAIndia
                    - img [ref=e184]
                - listitem [ref=e186]:
                  - link "Follow IKEA on Youtube" [ref=e187] [cursor=pointer]:
                    - /url: https://www.youtube.com/channel/UClQOVyyaLLXOx4YrpQLE01g
                    - img [ref=e188]
              - list
            - generic [ref=e190]:
              - button "Cookie settings" [ref=e192] [cursor=pointer]:
                - generic:
                  - img
                  - generic: Cookie settings
              - button "Change language or country/region, current language is English" [ref=e194] [cursor=pointer]:
                - generic:
                  - img
                  - generic:
                    - generic:
                      - generic: INEnglish
        - generic [ref=e195]:
          - paragraph [ref=e197]: © Inter IKEA Systems B.V. 2000-2026
          - list [ref=e199]:
            - listitem [ref=e200]:
              - link "Privacy policy" [ref=e201] [cursor=pointer]:
                - /url: https://www.ikea.com/in/en/customer-service/privacy-policy-pub5a22cf61/
            - listitem [ref=e202]:
              - link "Cookie policy" [ref=e203] [cursor=pointer]:
                - /url: https://www.ikea.com/in/en/customer-service/cookie-policy-pubffc638db/
```

# Test source

```ts
  118 |       await page.waitForTimeout(1000);
  119 |     }
  120 | 
  121 |     const before = await getCartBadgeCount(page);
  122 | 
  123 |     // Use the trash icon button visible in IKEA's cart — it's a small icon button near each item
  124 |     const removeBtn = page.locator(REMOVE_BTN_SELECTOR).first();
  125 |     if (await removeBtn.isVisible({ timeout: 8000 }).catch(() => false)) {
  126 |       await removeBtn.click({ force: true });
  127 |     } else {
  128 |       // Fallback: set qty to 0 which removes item on IKEA
  129 |       const qtyInput = page.locator(QTY_INPUT_SELECTOR).first();
  130 |       if (await qtyInput.isVisible({ timeout: 3000 }).catch(() => false)) {
  131 |         await qtyInput.fill('0');
  132 |         await qtyInput.press('Enter');
  133 |       }
  134 |     }
  135 |     await page.waitForTimeout(4000);
  136 |     
  137 |     const after = await getCartBadgeCount(page);
  138 |     expect(after).toBeLessThanOrEqual(before);
  139 |   });
  140 | 
  141 |   test('TC_CM_007 — Empty cart shows empty-state message', async ({ page }) => {
  142 |     await navigateToCart(page);
  143 |     // Remove all items if any are present
  144 |     const removeBtns = page.locator(REMOVE_BTN_SELECTOR);
  145 |     let attempts = 0;
  146 |     while (await removeBtns.count() > 0 && attempts < 5) {
  147 |       await removeBtns.first().click({ force: true }).catch(() => {});
  148 |       await page.waitForTimeout(2000);
  149 |       attempts++;
  150 |     }
  151 |     const body = await page.textContent('body');
  152 |     expect(/empty|no items|start shopping|your bag is empty/i.test(body || '')).toBeTruthy();
  153 |   });
  154 | 
  155 |   test('TC_CM_008 — Cart contents persist after page refresh', async ({ page }) => {
  156 |     await addProductToCart(page);
  157 |     await navigateToCart(page);
  158 |     const before = await page.locator(PRODUCT_ROWS_SELECTOR).count();
  159 |     await page.reload({ waitUntil: 'domcontentloaded' });
  160 |     await page.waitForTimeout(3000);
  161 |     const after = await page.locator(PRODUCT_ROWS_SELECTOR).count();
  162 |     expect(after).toBe(before);
  163 |   });
  164 | 
  165 |   test('TC_CM_009 — Cart persists after navigating away and returning', async ({ page }) => {
  166 |     await addProductToCart(page);
  167 |     await navigateToCart(page);
  168 |     const before = await page.locator(PRODUCT_ROWS_SELECTOR).count();
  169 |     
  170 |     await page.goto('/');
  171 |     await handleTurnstileGracefully(page);
  172 |     await page.waitForLoadState('domcontentloaded');
  173 |     
  174 |     await navigateToCart(page);
  175 |     const after = await page.locator(PRODUCT_ROWS_SELECTOR).count();
  176 |     expect(after).toBe(before);
  177 |   });
  178 | 
  179 |   test('TC_CM_010 — Quantity cannot be set to zero', async ({ page }) => {
  180 |     await addProductToCart(page);
  181 |     await navigateToCart(page);
  182 |     
  183 |     // Dismiss any overlay
  184 |     const closeOverlay = page.locator('button:has-text("Cancel"), button[aria-label*="close" i]').first();
  185 |     if (await closeOverlay.isVisible({ timeout: 2000 }).catch(() => false)) {
  186 |       await closeOverlay.click().catch(() => {});
  187 |       await page.waitForTimeout(1000);
  188 |     }
  189 | 
  190 |     const qtyInput = page.locator(QTY_INPUT_SELECTOR).first();
  191 |     if (await qtyInput.isVisible({ timeout: 8000 }).catch(() => false)) {
  192 |       await qtyInput.fill('0');
  193 |       await qtyInput.press('Tab');
  194 |       await page.waitForTimeout(3000);
  195 |       
  196 |       // IKEA behavior: setting qty to 0 removes the item from cart.
  197 |       // This is valid cart behavior — the system prevents having 0-quantity items
  198 |       // by removing them entirely. Check that either:
  199 |       // (a) the qty was reset to >= 1, OR
  200 |       // (b) the item was removed (empty cart shown)
  201 |       const stillVisible = await qtyInput.isVisible({ timeout: 2000 }).catch(() => false);
  202 |       if (stillVisible) {
  203 |         const val = await qtyInput.inputValue().catch(() => '1');
  204 |         expect(parseInt(val || '1', 10)).toBeGreaterThanOrEqual(1);
  205 |       } else {
  206 |         // Item was removed — this is valid zero-prevention behavior
  207 |         const body = await page.textContent('body') || '';
  208 |         expect(/empty|removed|undo|your.*bag/i.test(body)).toBeTruthy();
  209 |       }
  210 |     }
  211 |   });
  212 | 
  213 |   test('TC_CM_011 — Price column is read-only', async ({ page }) => {
  214 |     await addProductToCart(page);
  215 |     await navigateToCart(page);
  216 |     
  217 |     const priceEl = page.locator('[class*="price-module__price"], .cart-ingka-price-module__price, [data-testid="cart-item-price"], [class*="price"]').first();
> 218 |     const tag = await priceEl.evaluate(el => el.tagName.toLowerCase());
      |                               ^ TimeoutError: locator.evaluate: Timeout 15000ms exceeded.
  219 |     // Price must not be an input/editable field
  220 |     expect(['input', 'textarea']).not.toContain(tag);
  221 |     const contentEditable = await priceEl.getAttribute('contenteditable');
  222 |     expect(contentEditable).not.toBe('true');
  223 |   });
  224 | 
  225 |   test('TC_CM_012 — Clicking product name navigates to detail page', async ({ page }) => {
  226 |     await addProductToCart(page);
  227 |     await navigateToCart(page);
  228 |     
  229 |     const productLink = page.locator('[data-testid="cart-item"] a, .cart-item a, [class*="cart-product"] a[href*="/p/"], [class*="productCard"] a[href*="/p/"]').first();
  230 |     if (await productLink.isVisible({ timeout: 5000 })) {
  231 |       await productLink.click();
  232 |       await page.waitForLoadState('domcontentloaded');
  233 |       await page.waitForTimeout(2000);
  234 |       const h1 = await page.locator('h1').first().textContent();
  235 |       expect(h1?.trim().length).toBeGreaterThan(0);
  236 |     }
  237 |   });
  238 | 
  239 |   test('TC_CM_013 — Badge count accurate after multiple add/remove ops', async ({ page }) => {
  240 |     // Simplified: add one product, verify badge, then remove it and verify badge changed
  241 |     await addProductToCart(page);
  242 |     await page.waitForTimeout(3000);
  243 |     const afterAdd = await getCartBadgeCount(page);
  244 |     expect(afterAdd).toBeGreaterThanOrEqual(1);
  245 |     
  246 |     await navigateToCart(page);
  247 |     
  248 |     // Dismiss any overlay
  249 |     const closeOverlay = page.locator('button:has-text("Cancel"), button[aria-label*="close" i]').first();
  250 |     if (await closeOverlay.isVisible({ timeout: 2000 }).catch(() => false)) {
  251 |       await closeOverlay.click().catch(() => {});
  252 |       await page.waitForTimeout(1000);
  253 |     }
  254 | 
  255 |     // Remove the product
  256 |     const removeBtn = page.locator(REMOVE_BTN_SELECTOR).first();
  257 |     if (await removeBtn.isVisible({ timeout: 8000 }).catch(() => false)) {
  258 |       await removeBtn.click({ force: true });
  259 |     } else {
  260 |       const qtyInput = page.locator(QTY_INPUT_SELECTOR).first();
  261 |       if (await qtyInput.isVisible({ timeout: 3000 }).catch(() => false)) {
  262 |         await qtyInput.fill('0');
  263 |         await qtyInput.press('Enter');
  264 |       }
  265 |     }
  266 |     await page.waitForTimeout(4000);
  267 |     
  268 |     const afterRemove = await getCartBadgeCount(page);
  269 |     expect(afterRemove).toBeLessThanOrEqual(afterAdd);
  270 |   });
  271 | 
  272 |   test('TC_CM_014 — Guest cart retained after logging in', async ({ page }) => {
  273 |     await addProductToCart(page);
  274 |     const badgeBefore = await getCartBadgeCount(page);
  275 |     
  276 |     await loginWithTestAccount(page);
  277 |     await page.waitForTimeout(3000);
  278 |     
  279 |     // After login, cart badge should still show items (retained guest cart)
  280 |     // OR navigate to cart and check items are present
  281 |     const badgeAfter = await getCartBadgeCount(page);
  282 |     if (badgeAfter >= 1) {
  283 |       expect(badgeAfter).toBeGreaterThanOrEqual(1);
  284 |     } else {
  285 |       await navigateToCart(page);
  286 |       const body = await page.textContent('body') || '';
  287 |       // Either items visible or login was blocked by Turnstile
  288 |       const hasCartContent = /shopping bag|cart|Rs\.|₹/i.test(body);
  289 |       expect(hasCartContent).toBeTruthy();
  290 |     }
  291 |   });
  292 | 
  293 |   test('TC_CM_015 — Cart total updates without full page reload', async ({ page }) => {
  294 |     await addProductToCart(page);
  295 |     await navigateToCart(page);
  296 |     
  297 |     // Dismiss any overlay
  298 |     const closeOverlay = page.locator('button:has-text("Cancel"), button[aria-label*="close" i]').first();
  299 |     if (await closeOverlay.isVisible({ timeout: 2000 }).catch(() => false)) {
  300 |       await closeOverlay.click().catch(() => {});
  301 |       await page.waitForTimeout(1000);
  302 |     }
  303 | 
  304 |     // Get the initial total from the Order Summary section text
  305 |     const orderSummary = page.locator('text=/Total including GST/i').first();
  306 |     const summarySection = orderSummary.locator('xpath=ancestor::*[contains(@class, "order") or contains(@class, "summary") or contains(@class, "Summary")]').first();
  307 |     
  308 |     // Alternative: get total from full body text
  309 |     const bodyBefore = await page.textContent('body') || '';
  310 |     const totalMatchBefore = bodyBefore.match(/Total including GST[\s\S]*?Rs\.?\s?([\d,]+)/i);
  311 |     const totalBefore = totalMatchBefore ? parsePriceText(totalMatchBefore[0]) : 0;
  312 |     
  313 |     const increase = page.locator('button[aria-label*="increase" i], button:has-text("+"), button[class*="increase"]').first();
  314 |     if (await increase.isVisible({ timeout: 5000 }).catch(() => false)) {
  315 |       await increase.click();
  316 |       await page.waitForTimeout(4000);
  317 |       
  318 |       const bodyAfter = await page.textContent('body') || '';
```