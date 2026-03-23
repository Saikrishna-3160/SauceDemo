import { test, expect } from '../fixtures/loginFixture';
import { testData } from '../data/testData';

test.describe('2. Products Page and Filtering', () => {

    test('TC-101: View All Products on Inventory Page', async ({ authenticatedUser }) => {
        const { inventoryPage } = authenticatedUser;
        const productsCount = await inventoryPage.productItems.count();
        expect(productsCount).toBe(6);
        
        const names = await inventoryPage.getProductNames();
        expect(names).toContain(testData.products.backpack.name);
        expect(names).toContain(testData.products.bikeLight.name);
    });

    test('TC-102: Sort Products by Name (A to Z)', async ({ authenticatedUser }) => {
        const { inventoryPage } = authenticatedUser;
        await inventoryPage.sortProducts('Name (A to Z)');
        const names = await inventoryPage.getProductNames();
        const sortedNames = [...names].sort();
        expect(names).toEqual(sortedNames);
    });

    test('TC-103: Sort Products by Name (Z to A)', async ({ authenticatedUser }) => {
        const { inventoryPage } = authenticatedUser;
        await inventoryPage.sortProducts('Name (Z to A)');
        const names = await inventoryPage.getProductNames();
        const sortedNames = [...names].sort().reverse();
        expect(names).toEqual(sortedNames);
    });

    test('TC-104: Sort Products by Price (Low to High)', async ({ authenticatedUser }) => {
        const { inventoryPage } = authenticatedUser;
        await inventoryPage.sortProducts('Price (low to high)');
        const prices = await inventoryPage.getProductPrices();
        const numPrices = prices.map(p => parseFloat(p.replace('$', '')));
        const sortedPrices = [...numPrices].sort((a, b) => a - b);
        expect(numPrices).toEqual(sortedPrices);
    });

    test('TC-105: Sort Products by Price (High to Low)', async ({ authenticatedUser }) => {
        const { inventoryPage } = authenticatedUser;
        await inventoryPage.sortProducts('Price (high to low)');
        const prices = await inventoryPage.getProductPrices();
        const numPrices = prices.map(p => parseFloat(p.replace('$', '')));
        const sortedPrices = [...numPrices].sort((a, b) => b - a);
        expect(numPrices).toEqual(sortedPrices);
    });

    test('TC-106: View Product Details by Clicking Product Name', async ({ authenticatedUser, page }) => {
        const { inventoryPage } = authenticatedUser;
        await inventoryPage.openProductDetails(testData.products.backpack.name);
        await expect(page).toHaveURL(/.*inventory-item.html\?id=4/);
        await expect(page.locator('.inventory_details_name')).toHaveText(testData.products.backpack.name);
    });

    test('TC-107: Navigate Back from Product Details', async ({ authenticatedUser, page }) => {
        const { inventoryPage } = authenticatedUser;
        await inventoryPage.openProductDetails(testData.products.backpack.name);
        await page.locator('[data-test="back-to-products"]').click();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('TC-108: Add Multiple Products to Cart', async ({ authenticatedUser }) => {
        const { inventoryPage } = authenticatedUser;
        await expect(inventoryPage.cartBadge).toBeHidden();
        
        await inventoryPage.addProductToCart(testData.products.backpack.name);
        await expect(inventoryPage.cartBadge).toHaveText('1');
        
        await inventoryPage.addProductToCart(testData.products.bikeLight.name);
        await expect(inventoryPage.cartBadge).toHaveText('2');
        
        await inventoryPage.addProductToCart(testData.products.boltTShirt.name);
        await expect(inventoryPage.cartBadge).toHaveText('3');
    });

});
