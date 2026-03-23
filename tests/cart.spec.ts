import { test, expect } from '../fixtures/loginFixture';
import { testData } from '../data/testData';

test.describe('3. Shopping Cart Operations', () => {

    test('TC-201: View Empty Cart', async ({ authenticatedUser, page }) => {
        const { inventoryPage } = authenticatedUser;
        await inventoryPage.openCart();
        await expect(page).toHaveURL(/.*cart.html/);
        const cartItems = page.locator('.cart_item');
        expect(await cartItems.count()).toBe(0);
    });

    test('TC-202: Add Single Product to Cart and View', async ({ authenticatedUser }) => {
        const { inventoryPage, cartPage } = authenticatedUser;
        await inventoryPage.addProductToCart(testData.products.backpack.name);
        await inventoryPage.openCart();
        
        const names = await cartPage.getCartItemNames();
        expect(names).toContain(testData.products.backpack.name);
    });

    test('TC-203: Add Multiple Products to Cart and View', async ({ authenticatedUser }) => {
        const { inventoryPage, cartPage } = authenticatedUser;
        await inventoryPage.addProductToCart(testData.products.backpack.name);
        await inventoryPage.addProductToCart(testData.products.bikeLight.name);
        await inventoryPage.openCart();
        
        const names = await cartPage.getCartItemNames();
        expect(names.length).toBe(2);
        expect(names).toContain(testData.products.backpack.name);
        expect(names).toContain(testData.products.bikeLight.name);
    });

    test('TC-204: Remove Product from Cart', async ({ authenticatedUser, page }) => {
        const { inventoryPage, cartPage } = authenticatedUser;
        await inventoryPage.addProductToCart(testData.products.backpack.name);
        await inventoryPage.openCart();
        
        await cartPage.removeProduct(testData.products.backpack.name);
        const cartItems = page.locator('.cart_item');
        expect(await cartItems.count()).toBe(0);
    });

    test('TC-205: Continue Shopping from Cart', async ({ authenticatedUser, page }) => {
        const { inventoryPage, cartPage } = authenticatedUser;
        await inventoryPage.addProductToCart(testData.products.backpack.name);
        await inventoryPage.openCart();
        
        await cartPage.continueShopping();
        await expect(page).toHaveURL(/.*inventory.html/);
        await expect(inventoryPage.cartBadge).toHaveText('1');
    });

    test('TC-206: View Cart Total with Multiple Products', async ({ authenticatedUser }) => {
        const { inventoryPage, cartPage } = authenticatedUser;
        await inventoryPage.addProductToCart(testData.products.backpack.name);
        await inventoryPage.addProductToCart(testData.products.bikeLight.name);
        await inventoryPage.openCart();
        
        const prices = await cartPage.getCartItemPrices();
        expect(prices).toContain(testData.products.backpack.price);
        expect(prices).toContain(testData.products.bikeLight.price);
    });

    test('TC-207: Remove All Products from Cart', async ({ authenticatedUser, page }) => {
        const { inventoryPage, cartPage } = authenticatedUser;
        await inventoryPage.addProductToCart(testData.products.backpack.name);
        await inventoryPage.addProductToCart(testData.products.bikeLight.name);
        await inventoryPage.openCart();
        
        await cartPage.removeProduct(testData.products.backpack.name);
        await cartPage.removeProduct(testData.products.bikeLight.name);
        
        const cartItems = page.locator('.cart_item');
        expect(await cartItems.count()).toBe(0);
    });

    test('TC-208: Cart Persistence After Navigation', async ({ authenticatedUser, page }) => {
        const { inventoryPage } = authenticatedUser;
        await inventoryPage.addProductToCart(testData.products.backpack.name);
        await inventoryPage.openCart();
        await page.goBack();
        await expect(inventoryPage.cartBadge).toHaveText('1');
    });

});
