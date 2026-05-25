import { dismissCookieAndPopups } from '../ikea-helpers.js';

/**
 * Navigates to a product category page robustly, handling popups and bot protections.
 * @param {import('@playwright/test').Page} page
 * @param {string} url
 */
export async function gotoCategoryPage(page, url) {
  await page.goto(url).catch(() => {});
  await dismissCookieAndPopups(page);
  // Gracefully wait for any Turnstile/Akamai overlay to clear first if it's there
  await page.locator('text="The page will refresh automatically"').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {});
  await page.waitForLoadState('domcontentloaded').catch(() => {});
  await page.waitForTimeout(3000);
}

/**
 * Robustly selects a sorting option from a dropdown or button menu.
 * @param {import('@playwright/test').Page} page
 * @param {RegExp} regex
 */
export async function selectSortOption(page, regex) {
  const sortDropdown = page.locator('select[data-testid="sort"], [class*="sort"] select, button:has-text("Sort"), [class*="sort"] button').first();
  if (await sortDropdown.isVisible({ timeout: 5000 })) {
    if (await sortDropdown.evaluate(el => el.tagName === 'SELECT')) {
      const options = sortDropdown.locator('option');
      const count = await options.count();
      for (let i = 0; i < count; i++) {
        const text = await options.nth(i).textContent();
        if (regex.test(text || '')) {
          const val = await options.nth(i).getAttribute('value');
          if (val) {
            await sortDropdown.selectOption(val);
            return true;
          }
        }
      }
    } else {
      await sortDropdown.click({ force: true });
      await page.waitForTimeout(1000);
      const option = page.locator('button, [role="option"], [role="menuitem"], .plp-sort-options__option, label, span').filter({ hasText: regex }).first();
      if (await option.isVisible({ timeout: 5000 })) {
        await option.click({ force: true });
        return true;
      }
    }
  }
  return false;
}

export { dismissCookieAndPopups };

