import { dismissCookieAndPopups, loginWithTestAccount, parsePriceText } from '../ikea-helpers.js';

const PRODUCT_CARDS_SELECTOR = '.pip-product-compact, .plp-fragment-wrapper, [data-testid="plp-product-card"], [data-testid="product-card"], .product-card, .item-card, .plp-product-card__container';

/**
 * Navigates to a category page, finds the first product card, clicks it, and lands on product detail.
 * @param {import('@playwright/test').Page} page
 * @param {string} categoryUrl
 */
export async function goToFirstProduct(page, categoryUrl = '/in/en/cat/sofas-fu003/') {
  await page.goto(categoryUrl).catch(() => {});
  await dismissCookieAndPopups(page);
  
  // Gracefully wait for any Turnstile/Akamai overlay to clear first if it's there
  await page.locator('text="The page will refresh automatically"').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
  await page.waitForLoadState('domcontentloaded').catch(() => {});
  await page.waitForTimeout(3000);
  
  const cards = page.locator(PRODUCT_CARDS_SELECTOR);
  await cards.first().waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
  
  const link = cards.first().locator('a[href*="/p/"]').first();
  if (await link.isVisible({ timeout: 5000 })) {
    await link.click({ force: true });
  } else {
    const fallbackLink = cards.first().locator('a').first();
    if (await fallbackLink.isVisible({ timeout: 5000 })) {
      await fallbackLink.click({ force: true });
    } else {
      await cards.first().click({ force: true });
    }
  }
  
  await page.waitForLoadState('domcontentloaded').catch(() => {});
  await page.locator('text="The page will refresh automatically"').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
  await dismissCookieAndPopups(page);
  await page.waitForTimeout(3000);
}

export { dismissCookieAndPopups, loginWithTestAccount, parsePriceText };

