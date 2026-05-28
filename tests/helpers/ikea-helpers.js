/**
 * Shared helper utilities for IKEA India Playwright automation tests.
 * Handles cookie consent, popups, login, and common navigation tasks.
 */

/**
 * Dismisses the IKEA cookie consent banner and any location/country popups.
 * Called in beforeEach of every test to keep tests clean.
 * @param {import('@playwright/test').Page} page
 */
export async function dismissCookieAndPopups(page) {
  // Dismiss IKEA's OneTrust cookie consent banner (button text is "Ok")
  try {
    const cookieBtn = page.locator('#onetrust-accept-btn-handler');
    await cookieBtn.click({ timeout: 5000 });
  } catch {
    // Cookie banner may not appear — safe to ignore
  }

  // Bypass the corporate landing page (yellow "Go shopping" button)
  try {
    const goShoppingBtn = page.locator('text="Go shopping"').first();
    if (await goShoppingBtn.isVisible({ timeout: 3000 })) {
      await goShoppingBtn.click();
      await page.waitForLoadState('domcontentloaded'); await page.waitForTimeout(3000);
    }
  } catch {
    // Already on the shopping page
  }

  // Dismiss any location/country popup
  try {
    const closePopup = page.locator('[data-testid="popup-close"], [aria-label="Close"], button:has-text("Close"), .modal-close');
    await closePopup.first().click({ timeout: 3000 });
  } catch {
    // No popup — safe to ignore
  }

  // Dismiss any promotional overlay or notification
  try {
    const promoClose = page.locator('[data-testid="promo-close"], .notification-close, [aria-label="Dismiss"]');
    await promoClose.first().click({ timeout: 2000 });
  } catch {
    // No promo — safe to ignore
  }
}

/**
 * Performs login with the pre-created test account.
 * Uses credentials from environment variables.
 * @param {import('@playwright/test').Page} page
 */
export async function loginWithTestAccount(page) {
  const email = process.env.TEST_EMAIL || 'testuser@example.com';
  const password = process.env.TEST_PASSWORD || 'Test@12345';

  await page.goto('/in/en/profile/login/');
  await dismissCookieAndPopups(page);

  const continueBtn = page.getByRole('button', { name: /continue/i }).first();
  await continueBtn.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});

  // Fill login form
  await page.getByLabel(/email/i).fill(email).catch(() => {});
  await page.getByLabel(/password/i).fill(password).catch(() => {});

  await continueBtn.click({ force: true });

  // Wait for navigation after login
  await page.waitForLoadState('domcontentloaded').catch(() => {});
  await page.waitForTimeout(3000);
}

/**
 * Adds a product to the cart from a product listing or search results page.
 * Navigates to a known product category and adds the first available item.
 * @param {import('@playwright/test').Page} page
 * @param {string} [category] - Category URL path segment (default: sofas)
 */
export async function addProductToCart(page, category = 'cat/sofas-fu003/') {
  await page.goto(`/in/en/${category}`);
  await dismissCookieAndPopups(page);

  // Click on the first product card
  const productCard = page.locator('[data-testid="product-card"], .product-card, .plp-product-card__container').first();
  await productCard.click();
  await page.waitForLoadState('domcontentloaded'); await page.waitForTimeout(3000);

  // Click Add to Bag
  await page.getByRole('button', { name: /add to bag|add to cart/i }).first().click();

  // Wait for cart update
  await page.waitForTimeout(2000);
}

/**
 * Gets the current cart badge count from the header.
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<number>} The cart item count
 */
export async function getCartBadgeCount(page) {
  try {
    const badge = page.locator('a[href*="shoppingcart"] .hnf-btn__label, .hnf-btn__badge, [data-testid="cart-badge"], .cart-badge').first();
    const text = await badge.textContent({ timeout: 5000 }).catch(() => '');
    const match = text?.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  } catch {
    return 0;
  }
}

/**
 * Navigates to the cart page.
 * @param {import('@playwright/test').Page} page
 */
export async function navigateToCart(page) {
  await page.goto('/in/en/shoppingcart/');
  await dismissCookieAndPopups(page);
  await page.waitForLoadState('domcontentloaded'); await page.waitForTimeout(3000);
}

/**
 * Extracts price value from a text string containing INR formatting.
 * Handles formats like "Rs.1,299", "₹ 1,299.00", "Rs 1299", etc.
 * @param {string} priceText
 * @returns {number}
 */
export function parsePriceText(priceText) {
  if (!priceText) return 0;
  // Match currency prefix followed by numbers and commas
  const match = priceText.match(/(?:Rs\.?|₹)\s*([\d,]+)/i);
  if (match) {
    return parseInt(match[1].replace(/,/g, ''), 10);
  }
  // Fallback: match any number block that is longer than 2 digits (avoid quantity numbers like 1, 2, 3)
  const fallbackMatch = priceText.match(/\d{3,}/);
  if (fallbackMatch) {
    return parseInt(fallbackMatch[0], 10);
  }
  // Last resort: extract all digits
  const cleaned = priceText.replace(/\D/g, '');
  return parseInt(cleaned, 10) || 0;
}
