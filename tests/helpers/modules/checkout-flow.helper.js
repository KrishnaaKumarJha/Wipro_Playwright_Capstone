/**
 * Helper for Module 7 — Checkout Flow.
 * Defines checkout-specific helper functions and imports common helpers.
 */

import {
  dismissCookieAndPopups,
  loginWithTestAccount,
  addProductToCart,
  navigateToCart,
  parsePriceText
} from '../ikea-helpers.js';

/**
 * Handles full checkout entry: logs in, adds a product to cart, navigates to cart, and clicks proceed to checkout.
 * @param {import('@playwright/test').Page} page
 */
export async function goToCheckout(page) {
  await loginWithTestAccount(page);
  await addProductToCart(page);
  await navigateToCart(page);
  const checkoutBtn = page.getByRole('button', { name: /proceed to checkout|checkout/i }).first()
    || page.getByRole('link', { name: /proceed to checkout|checkout/i }).first();
  await checkoutBtn.click();
  await page.waitForLoadState('domcontentloaded');
  await dismissCookieAndPopups(page);
}

export {
  dismissCookieAndPopups,
  loginWithTestAccount,
  addProductToCart,
  navigateToCart,
  parsePriceText
};
