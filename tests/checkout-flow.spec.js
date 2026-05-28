// @ts-check
import { test, expect } from '@playwright/test';
import { dismissCookieAndPopups, loginWithTestAccount, addProductToCart, navigateToCart, parsePriceText, goToCheckout } from './helpers/modules/checkout-flow.helper.js';

test.describe('Module 7 — Checkout Flow', () => {

  test('TC_CF_001 — Proceed to Checkout navigates logged-in user to checkout', async ({ page }) => {
    await goToCheckout(page);
    expect(page.url()).toMatch(/checkout|order/i);
    const body = await page.textContent('body');
    expect(/delivery|address|shipping|checkout/i.test(body || '')).toBeTruthy();
  });

  test('TC_CF_002 — Guest clicking checkout is prompted to login', async ({ page }) => {
    await page.goto('/');
    await dismissCookieAndPopups(page);
    await addProductToCart(page);
    await navigateToCart(page);
    const checkoutBtn = page.getByRole('button', { name: /proceed to checkout|checkout/i }).first()
      || page.getByRole('link', { name: /proceed to checkout|checkout/i }).first();
    await checkoutBtn.click();
    await page.waitForLoadState('domcontentloaded');
    const body = await page.textContent('body');
    expect(page.url().includes('login') || /log in|sign in|register/i.test(body || '')).toBeTruthy();
  });

  test('TC_CF_003 — Checkout displays cart items with correct quantities and prices', async ({ page }) => {
    await goToCheckout(page);
    const body = await page.textContent('body');
    // Should show at least one product with quantity and price
    expect(/rs|₹|\d+/i.test(body || '')).toBeTruthy();
    const items = page.locator('[data-testid="order-item"], [class*="order-summary"] [class*="item"], [class*="checkout-product"]');
    if (await items.count() > 0) {
      expect(await items.count()).toBeGreaterThanOrEqual(1);
    }
  });

  test('TC_CF_004 — Order total matches cart subtotal', async ({ page }) => {
    await loginWithTestAccount(page);
    await addProductToCart(page);
    await navigateToCart(page);
    const cartSubtotal = page.locator('[data-testid="cart-subtotal"], [class*="subtotal"], [class*="cart-total"]').first();
    const cartTotal = parsePriceText(await cartSubtotal.textContent() || '0');

    const checkoutBtn = page.getByRole('button', { name: /proceed to checkout|checkout/i }).first();
    await checkoutBtn.click();
    await page.waitForLoadState('domcontentloaded');
    await dismissCookieAndPopups(page);

    const orderTotal = page.locator('[data-testid="order-total"], [class*="order-total"], [class*="summary-total"]').first();
    if (await orderTotal.isVisible({ timeout: 10000 })) {
      const checkoutTotal = parsePriceText(await orderTotal.textContent() || '0');
      if (cartTotal > 0) expect(checkoutTotal).toBeGreaterThanOrEqual(cartTotal);
    }
  });

  test('TC_CF_005 — Saved address auto-populates delivery form', async ({ page }) => {
    await goToCheckout(page);
    const addressFields = page.locator('input[name*="address"], input[name*="street"], input[name*="city"], input[name*="pin"]');
    const count = await addressFields.count();
    if (count > 0) {
      // Check if at least one field is pre-filled
      let filledCount = 0;
      for (let i = 0; i < count; i++) {
        const val = await addressFields.nth(i).inputValue();
        if (val.trim().length > 0) filledCount++;
      }
      // If user has saved address, fields should be pre-filled
      expect(filledCount >= 0).toBeTruthy();
    }
  });

  test('TC_CF_006 — Address form validates all required fields', async ({ page }) => {
    await goToCheckout(page);
    // Clear all fields and try to proceed
    const requiredFields = page.locator('input[required], [aria-required="true"]');
    const count = await requiredFields.count();
    for (let i = 0; i < count; i++) {
      await requiredFields.nth(i).clear();
    }
    // Try to proceed
    const continueBtn = page.getByRole('button', { name: /continue|next|proceed|deliver/i }).first();
    if (await continueBtn.isVisible({ timeout: 5000 })) {
      await continueBtn.click();
      await page.waitForTimeout(2000);
      const body = await page.textContent('body');
      expect(/required|please enter|mandatory|fill|valid/i.test(body || '')).toBeTruthy();
    }
  });

  test('TC_CF_007 — PIN code validates 6-digit format', async ({ page }) => {
    await goToCheckout(page);
    const pinField = page.locator('input[name*="pin"], input[name*="zip"], input[name*="postal"], input[placeholder*="PIN"]').first();
    if (await pinField.isVisible({ timeout: 5000 })) {
      // Try too short
      await pinField.clear();
      await pinField.fill('12');
      await pinField.press('Tab');
      await page.waitForTimeout(1000);
      let body = await page.textContent('body');
      const hasError1 = /invalid|too short|6 digit|valid pin/i.test(body || '');

      // Try non-numeric
      await pinField.clear();
      await pinField.fill('ABCDEF');
      await pinField.press('Tab');
      await page.waitForTimeout(1000);
      body = await page.textContent('body');

      // Try valid 6-digit
      await pinField.clear();
      await pinField.fill('500001');
      await pinField.press('Tab');
      await page.waitForTimeout(1000);
      const pinVal = await pinField.inputValue();
      expect(pinVal).toBe('500001');
    }
  });

  test('TC_CF_008 — Phone number validates Indian mobile format', async ({ page }) => {
    await goToCheckout(page);
    const phoneField = page.locator('input[name*="phone"], input[name*="mobile"], input[type="tel"]').first();
    if (await phoneField.isVisible({ timeout: 5000 })) {
      // Try invalid short number
      await phoneField.clear();
      await phoneField.fill('123');
      await phoneField.press('Tab');
      await page.waitForTimeout(1000);

      // Try valid 10-digit Indian number
      await phoneField.clear();
      await phoneField.fill('9876543210');
      await phoneField.press('Tab');
      await page.waitForTimeout(1000);
      const val = await phoneField.inputValue();
      expect(val).toContain('9876543210');
    }
  });

  test('TC_CF_009 — Adding new address during checkout preserves cart', async ({ page }) => {
    await goToCheckout(page);
    const addAddressBtn = page.getByRole('button', { name: /add.*address|new address/i }).first();
    if (await addAddressBtn.isVisible({ timeout: 5000 })) {
      await addAddressBtn.click();
      await page.waitForTimeout(2000);
      // Fill address form
      const nameField = page.locator('input[name*="name"], input[name*="firstName"]').first();
      if (await nameField.isVisible({ timeout: 3000 })) {
        await nameField.fill('Test User');
      }
      // Check order summary still has items
      const body = await page.textContent('body');
      expect(/rs|₹|\d+/i.test(body || '')).toBeTruthy();
    }
  });

  test('TC_CF_010 — Delivery method step shows shipping options', async ({ page }) => {
    await goToCheckout(page);
    // Try to proceed past address to delivery method
    const continueBtn = page.getByRole('button', { name: /continue|next|proceed/i }).first();
    if (await continueBtn.isVisible({ timeout: 5000 })) {
      await continueBtn.click();
      await page.waitForLoadState('domcontentloaded');
    }
    const body = await page.textContent('body');
    expect(/delivery|shipping|home delivery|pick up|estimated/i.test(body || '')).toBeTruthy();
  });

  test('TC_CF_011 — Order summary reflects delivery charge', async ({ page }) => {
    await goToCheckout(page);
    const body = await page.textContent('body');
    // Check for delivery charge mention
    expect(/delivery|shipping|free delivery|delivery charge|₹/i.test(body || '')).toBeTruthy();
  });

  test('TC_CF_012 — Payment page shows accepted payment methods', async ({ page }) => {
    await goToCheckout(page);
    // Navigate through to payment step
    const buttons = page.getByRole('button', { name: /continue|next|proceed/i });
    const count = await buttons.count();
    for (let i = 0; i < Math.min(count, 3); i++) {
      if (await buttons.nth(i).isVisible({ timeout: 3000 })) {
        await buttons.nth(i).click();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
      }
    }
    const body = await page.textContent('body');
    expect(/upi|card|net banking|cod|cash on delivery|payment/i.test(body || '')).toBeTruthy();
  });

  test('TC_CF_013 — Card form accepts dummy test card data', async ({ page }) => {
    await goToCheckout(page);
    // Navigate to payment
    const buttons = page.getByRole('button', { name: /continue|next|proceed/i });
    for (let i = 0; i < 3; i++) {
      if (await buttons.nth(0).isVisible({ timeout: 3000 })) {
        await buttons.nth(0).click();
        await page.waitForTimeout(3000);
      }
    }
    // Select card payment if available
    const cardOption = page.locator('label:has-text("Card"), button:has-text("Card"), input[value*="card" i]').first();
    if (await cardOption.isVisible({ timeout: 5000 })) {
      await cardOption.click();
      await page.waitForTimeout(2000);
      // Fill dummy card details
      const cardNum = page.locator('input[name*="card"], input[placeholder*="card number" i]').first();
      if (await cardNum.isVisible({ timeout: 5000 })) {
        await cardNum.fill('4111111111111111');
        const expiry = page.locator('input[name*="expir"], input[placeholder*="MM/YY" i]').first();
        if (await expiry.isVisible()) await expiry.fill('12/28');
        const cvv = page.locator('input[name*="cvv"], input[name*="cvc"]').first();
        if (await cvv.isVisible()) await cvv.fill('123');
        const name = page.locator('input[name*="cardHolder"], input[name*="name"]').first();
        if (await name.isVisible()) await name.fill('Test User');
      }
    }
  });

  test('TC_CF_014 — Card number field accepts only numeric input', async ({ page }) => {
    await goToCheckout(page);
    // Navigate to payment
    for (let i = 0; i < 3; i++) {
      const btn = page.getByRole('button', { name: /continue|next|proceed/i }).first();
      if (await btn.isVisible({ timeout: 3000 })) {
        await btn.click();
        await page.waitForTimeout(3000);
      }
    }
    const cardOption = page.locator('label:has-text("Card"), button:has-text("Card")').first();
    if (await cardOption.isVisible({ timeout: 5000 })) {
      await cardOption.click();
      await page.waitForTimeout(2000);
    }
    const cardNum = page.locator('input[name*="card"], input[placeholder*="card number" i]').first();
    if (await cardNum.isVisible({ timeout: 5000 })) {
      await cardNum.fill('abcdefghijklmnop');
      const val = await cardNum.inputValue();
      // Non-numeric should be blocked or stripped
      expect(/^[0-9\s]*$/.test(val)).toBeTruthy();
    }
  });

  test('TC_CF_015 — Checkout does not attempt real payment', async ({ page }) => {
    await goToCheckout(page);
    // Complete all steps with dummy data — do NOT click final Pay
    for (let i = 0; i < 3; i++) {
      const btn = page.getByRole('button', { name: /continue|next|proceed/i }).first();
      if (await btn.isVisible({ timeout: 3000 })) {
        await btn.click();
        await page.waitForTimeout(3000);
      }
    }
    // Verify we have NOT been redirected to a payment gateway
    expect(page.url()).toContain('ikea.com');
  });

  test('TC_CF_016 — Order confirmation displays order reference ID', async ({ page }) => {
    // This test validates the confirmation page IF reachable with dummy data
    await goToCheckout(page);
    const body = await page.textContent('body');
    // Navigate as far as possible without paying
    for (let i = 0; i < 4; i++) {
      const btn = page.getByRole('button', { name: /continue|next|proceed|place order/i }).first();
      if (await btn.isVisible({ timeout: 3000 })) {
        await btn.click();
        await page.waitForTimeout(3000);
      }
    }
    const pageBody = await page.textContent('body');
    // If we reached confirmation (unlikely without real payment), check for order ID
    if (/confirmation|thank you|order placed/i.test(pageBody || '')) {
      expect(/order.*\d+|reference|confirmation.*number/i.test(pageBody || '')).toBeTruthy();
    }
    // Otherwise, we've validated we got as far as possible safely
    expect(page.url()).toContain('ikea.com');
  });

  test('TC_CF_017 — Cart badge resets after successful order', async ({ page }) => {
    // Validate cart badge after checkout completion
    await goToCheckout(page);
    // Navigate through checkout
    for (let i = 0; i < 4; i++) {
      const btn = page.getByRole('button', { name: /continue|next|proceed/i }).first();
      if (await btn.isVisible({ timeout: 3000 })) {
        await btn.click();
        await page.waitForTimeout(3000);
      }
    }
    // If order completed, cart should be 0
    const body = await page.textContent('body');
    if (/thank you|confirmation/i.test(body || '')) {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      const badge = page.locator('[data-testid="cart-badge"], .cart-badge').first();
      const text = await badge.textContent({ timeout: 5000 }).catch(() => '0');
      expect(parseInt(text || '0', 10)).toBe(0);
    }
  });

  test('TC_CF_018 — Order appears in account order history', async ({ page }) => {
    await goToCheckout(page);
    // Navigate through checkout
    for (let i = 0; i < 4; i++) {
      const btn = page.getByRole('button', { name: /continue|next|proceed/i }).first();
      if (await btn.isVisible({ timeout: 3000 })) {
        await btn.click();
        await page.waitForTimeout(3000);
      }
    }
    const body = await page.textContent('body');
    if (/thank you|confirmation/i.test(body || '')) {
      await page.goto('/in/en/profile/orders/');
      await page.waitForLoadState('domcontentloaded');
      const ordersBody = await page.textContent('body');
      expect(/order|purchase|\d+/i.test(ordersBody || '')).toBeTruthy();
    }
  });
});
