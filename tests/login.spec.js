const { test, expect } = require('@playwright/test');

test('OrangeHRM login shows dashboard after success', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard/**', { timeout: 10000 });
    const heading = page.locator('h6:has-text("Dashboard")');
    await expect(heading).toBeVisible({ timeout: 5000 });
});
