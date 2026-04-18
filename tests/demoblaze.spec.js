const { test, expect } = require('@playwright/test');

test('Demoblaze: view laptops, add to cart and verify in cart', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/index.html');

    await expect(page.locator('#navbarExample')).toBeVisible({ timeout: 10000 });

    await expect(page.getByText('Phones')).toBeVisible();
    await expect(page.getByText('Laptops')).toBeVisible();
    await expect(page.getByText('Monitors')).toBeVisible();

    await page.click('a:has-text("Laptops")');
    await expect(page.locator('#tbodyid .col-lg-4').first()).toBeVisible({ timeout: 10000 });

    const firstProductLink = page.locator('#tbodyid .card-title a').first();
    const productName = (await firstProductLink.textContent()).trim();

    await firstProductLink.click();

    // Product detail: verify title and price are visible
    const detailTitleLocator = page.locator('.name, h2');
    await expect(detailTitleLocator).toBeVisible({ timeout: 10000 });
    const detailName = (await detailTitleLocator.first().textContent()).trim();

    const priceLocator = page.locator('.price-container, #price, h3');
    await expect(priceLocator).toBeVisible();
    const detailPrice = (await priceLocator.first().textContent()).trim();

    // Add to cart and accept alert
    const [dialog] = await Promise.all([
        page.waitForEvent('dialog'),
        page.click('a:has-text("Add to cart")'),
    ]);
    await expect(dialog.message()).toContain('Product');
    await dialog.accept();

    // Go to cart and verify product is listed
    await page.click('#cartur');
    await expect(page).toHaveURL(/.*cart.html/);

    await expect(page.locator('#tbodyid')).toContainText(detailName, { timeout: 10000 });
});
