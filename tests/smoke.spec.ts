import { test, expect } from '@playwright/test';

test('has title and hero text', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/ProstoLab/);

    // Expect the hero to be visible
    await expect(page.getByRole('heading', { name: 'ProstoLab' })).toBeVisible();

    // Expect the navbar brand to be present in DOM (even if obscured by hero initially)
    const navbarBrand = page.locator('nav').getByText('ProstoLab');
    await expect(navbarBrand).toBeAttached();
});
