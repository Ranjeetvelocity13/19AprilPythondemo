import { test, expect } from '@playwright/test';

test('OrangeHRM login shows dashboard after success', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');
    const dashboard = page.locator('text=Dashboard');
    await expect(dashboard).toBeVisible({ timeout: 10000 });
});
