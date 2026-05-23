/**
 * Helper for Module 3 — Search Functionality.
 * Defines search-specific helper functions and imports common helpers.
 */

import { dismissCookieAndPopups } from '../ikea-helpers.js';

/**
 * Performs a search query on the IKEA page.
 * @param {import('@playwright/test').Page} page
 * @param {string} query
 */
export async function performSearch(page, query) {
  try {
    // Gracefully wait for any Turnstile/Akamai overlay to clear first if it's there
    await page.locator('text="The page will refresh automatically"').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
    
    const input = page.locator('input[type="search"], input[name="q"], input[placeholder*="search" i]').first();
    if (!(await input.isVisible({ timeout: 5000 }))) {
      const searchIcon = page.locator('button[data-testid="search-icon"], a[data-testid="search-icon"], .search-wrapper button, button[aria-label="Search"]').first();
      if (await searchIcon.isVisible({ timeout: 2000 })) {
        await searchIcon.click({ force: true });
        await page.waitForTimeout(1000);
      }
    }
    await input.fill(query);
    await input.press('Enter');
    await page.waitForLoadState('domcontentloaded').catch(() => {});
    await page.waitForTimeout(3000);
  } catch (err) {
    console.log(`Search for "${query}" encountered an error, possibly due to bot-protection or Turnstile: ${err.message}`);
  }
}

export { dismissCookieAndPopups };
