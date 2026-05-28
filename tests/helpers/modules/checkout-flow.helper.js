import {
  dismissCookieAndPopups,
  loginWithTestAccount,
  addProductToCart,
  navigateToCart,
  parsePriceText,
  handleTurnstileGracefully
} from '../ikea-helpers.js';

/**
 * Handles full checkout entry: logs in, adds a product to cart, and navigates to checkout.
 * @param {import('@playwright/test').Page} page
 */
export async function goToCheckout(page) {
  await loginWithTestAccount(page);
  await addProductToCart(page);
  console.log('Navigating directly to checkout page...');
  await page.goto('/in/en/checkout/');
  await handleTurnstileGracefully(page);
  await dismissCookieAndPopups(page);
  await page.waitForLoadState('domcontentloaded').catch(() => {});
  await page.waitForTimeout(3000);
}

export {
  dismissCookieAndPopups,
  loginWithTestAccount,
  addProductToCart,
  navigateToCart,
  parsePriceText
};
