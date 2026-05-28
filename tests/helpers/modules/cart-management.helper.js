import { test } from '@playwright/test';
import {
  dismissCookieAndPopups as baseDismissCookieAndPopups,
  navigateToCart as baseNavigateToCart,
  getCartBadgeCount as baseGetCartBadgeCount,
  loginWithTestAccount as baseLoginWithTestAccount,
  parsePriceText as baseParsePriceText
} from '../ikea-helpers.js';

const PRODUCT_CARDS_SELECTOR = '.plp-product-compact, .pipf-product-compact, .pip-product-compact, .plp-fragment-wrapper, [data-testid="plp-product-card"], [data-testid="product-card"], .product-card, .item-card, .plp-product-card__container';

const FALLBACK_PRODUCTS = {
  sofas: '/in/en/p/glostad-3-seat-sofa-knisa-dark-grey-40595937/',
  beds: '/in/en/p/slattum-upholstered-bed-frame-vissle-dark-grey-60571247/',
  tables: '/in/en/p/micke-desk-white-30354274/',
  lighting: '/in/en/p/tagarp-floor-uplighter-black-white-40464050/',
  default: '/in/en/p/glostad-3-seat-sofa-knisa-dark-grey-40595937/'
};

/**
 * Checks for Turnstile challenge and skips test if it is not solved.
 */
export async function handleTurnstileGracefully(page) {
  const body = await page.textContent('body').catch(() => '');
  if (/refresh automatically|just a moment|verifying/i.test(body || '')) {
    await page.locator('text="The page will refresh automatically"').waitFor({ state: 'hidden', timeout: 25000 }).catch(() => {});
    const body2 = await page.textContent('body').catch(() => '');
    if (/refresh automatically|just a moment|verifying/i.test(body2 || '')) {
      test.skip(true, 'Turnstile/Akamai bot challenge intercepted the page');
    }
  }
}

/**
 * Dismisses IKEA cookie popups.
 */
export async function dismissCookieAndPopups(page) {
  await baseDismissCookieAndPopups(page);
}

/**
 * Navigates to the shopping cart page.
 */
export async function navigateToCart(page) {
  await page.goto('/in/en/shoppingcart/');
  await handleTurnstileGracefully(page);
  await baseDismissCookieAndPopups(page);
  await page.waitForLoadState('domcontentloaded').catch(() => {});
  await page.waitForTimeout(3000);
}

/**
 * Fetches current cart count from the header badge.
 */
export async function getCartBadgeCount(page) {
  return await baseGetCartBadgeCount(page);
}

/**
 * Performs customer login using test credentials robustly.
 */
export async function loginWithTestAccount(page) {
  const email = process.env.TEST_EMAIL || 'testuser@example.com';
  const password = process.env.TEST_PASSWORD || 'Test@12345';

  console.log('Navigating to login page...');
  await page.goto('/in/en/profile/login/');
  await handleTurnstileGracefully(page);
  await baseDismissCookieAndPopups(page);

  const continueBtn = page.getByRole('button', { name: /continue/i }).first();
  await continueBtn.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});

  // Fill login form
  await page.getByLabel(/email/i).fill(email).catch(() => {});
  await page.getByLabel(/password/i).fill(password).catch(() => {});

  await continueBtn.click({ force: true });
  await page.waitForTimeout(1000);
  await handleTurnstileGracefully(page);

  // Wait for navigation after login
  await page.waitForLoadState('domcontentloaded').catch(() => {});
  await page.waitForTimeout(3000);
}

/**
 * Utility to parse price string text into integer.
 */
export function parsePriceText(priceText) {
  return baseParsePriceText(priceText);
}

/**
 * Adds a product to the cart robustly from category or active product fallback.
 */
export async function addProductToCart(page, category = 'cat/sofas-fu003/') {
  // Build proper category URL path
  const cleanCategory = category.startsWith('/') ? category : `/${category}`;
  const categoryPath = cleanCategory.startsWith('/in/en/') ? cleanCategory : `/in/en/${category.replace(/^\//, '')}`;
  
  console.log(`Navigating to category: ${categoryPath}`);
  await page.goto(categoryPath).catch(() => {});
  await handleTurnstileGracefully(page);
  await baseDismissCookieAndPopups(page);
  await page.waitForLoadState('domcontentloaded').catch(() => {});
  await page.waitForTimeout(3000);
  
  let navigated = false;
  const cards = page.locator(PRODUCT_CARDS_SELECTOR);
  if (await cards.first().isVisible({ timeout: 5000 })) {
    const link = cards.first().locator('a[href*="/p/"]').first();
    if (await link.isVisible({ timeout: 2000 })) {
      await link.click({ timeout: 5000 }).catch(async () => {
        await link.click({ force: true }).catch(() => {});
      });
      navigated = true;
    } else {
      await cards.first().click({ timeout: 5000 }).catch(async () => {
        await cards.first().click({ force: true }).catch(() => {});
      });
      navigated = true;
    }
    await page.waitForTimeout(4000);
  }
  
  // If card click didn't land on detail page, go directly to our active stable product fallback
  if (!navigated || !page.url().includes('/p/')) {
    let fallbackUrl = FALLBACK_PRODUCTS.default;
    const lowerCat = category.toLowerCase();
    if (lowerCat.includes('bed')) fallbackUrl = FALLBACK_PRODUCTS.beds;
    else if (lowerCat.includes('table') || lowerCat.includes('desk')) fallbackUrl = FALLBACK_PRODUCTS.tables;
    else if (lowerCat.includes('light') || lowerCat.includes('lamp')) fallbackUrl = FALLBACK_PRODUCTS.lighting;
    else if (lowerCat.includes('sofa')) fallbackUrl = FALLBACK_PRODUCTS.sofas;
    
    console.log(`Prerequisite category card click did not navigate. Direct routing to stable fallback: ${fallbackUrl}`);
    await page.goto(fallbackUrl, { timeout: 30000 }).catch(() => {});
    await handleTurnstileGracefully(page);
    await baseDismissCookieAndPopups(page);
    await page.waitForLoadState('domcontentloaded').catch(() => {});
    await page.waitForTimeout(3000);
  }
  
  // Click Add to Bag
  const addBtn = page.getByRole('button', { name: /add to bag|add to cart/i }).first();
  await addBtn.scrollIntoViewIfNeeded().catch(() => {});
  await addBtn.click({ force: true }).catch(() => addBtn.evaluate(el => el.click()));
  
  // Wait for cart update animation
  await page.waitForTimeout(4000);
  
  // Dismiss side drawer toast if visible
  const closeBtn = page.locator('[data-testid="toast-close"], button[aria-label*="close" i], .hn-popup-close-btn, .modal-close').first();
  if (await closeBtn.isVisible({ timeout: 2000 })) {
    await closeBtn.click().catch(() => {});
    await page.waitForTimeout(1000);
  }
}
