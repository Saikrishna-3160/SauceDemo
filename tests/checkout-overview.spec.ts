import { test, expect } from '../fixtures/loginFixture';
import { testData } from '../data/testData';

test.describe('5. Checkout: Overview Page', () => {

    test.beforeEach(async ({ authenticatedUser }) => {
        const { inventoryPage, cartPage, checkoutInfoPage } = authenticatedUser;
        await inventoryPage.addProductToCart(testData.products.backpack.name);
        await inventoryPage.openCart();
        await cartPage.proceedToCheckout();
        await checkoutInfoPage.fillInfo(
            testData.checkoutInfo.valid.firstName,
            testData.checkoutInfo.valid.lastName,
            testData.checkoutInfo.valid.postalCode
        );
        await checkoutInfoPage.continueToNextStep();
    });

    test('TC-401: View Order Overview After Information Entry', async ({ page }) => {
        await expect(page).toHaveURL(/.*checkout-step-two.html/);
        await expect(page.locator('.title')).toHaveText('Checkout: Overview');
    });

    test('TC-402: Verify Product Details in Overview', async ({ authenticatedUser }) => {
        const { checkoutOverviewPage } = authenticatedUser;
        const names = await checkoutOverviewPage.getProductNames();
        const prices = await checkoutOverviewPage.getProductPrices();
        
        expect(names).toContain(testData.products.backpack.name);
        expect(prices).toContain(testData.products.backpack.price);
    });

    test('TC-403: Verify Price Breakdown in Overview', async ({ authenticatedUser }) => {
        const { checkoutOverviewPage } = authenticatedUser;
        await expect(checkoutOverviewPage.subtotal).toContainText('Item total: $29.99');
        await expect(checkoutOverviewPage.tax).toContainText('Tax: $2.40');
        await expect(checkoutOverviewPage.total).toContainText('Total: $32.39');
    });

    test('TC-404: Verify Multiple Products in Overview', async ({ authenticatedUser }) => {
        // Need to start over for multiple products or go back
        const { inventoryPage, cartPage, checkoutInfoPage, checkoutOverviewPage } = authenticatedUser;
        await checkoutOverviewPage.cancel();
        
        await inventoryPage.addProductToCart(testData.products.bikeLight.name);
        await inventoryPage.addProductToCart(testData.products.boltTShirt.name);
        await inventoryPage.openCart();
        await cartPage.proceedToCheckout();
        await checkoutInfoPage.fillInfo('John', 'Doe', '12345');
        await checkoutInfoPage.continueToNextStep();
        
        const names = await checkoutOverviewPage.getProductNames();
        expect(names.length).toBe(3);
        expect(names).toContain(testData.products.backpack.name);
        expect(names).toContain(testData.products.bikeLight.name);
        expect(names).toContain(testData.products.boltTShirt.name);
        
        await expect(checkoutOverviewPage.subtotal).toContainText('Item total: $55.97');
    });

    test('TC-405: Cancel from Overview Page', async ({ authenticatedUser, page }) => {
        const { checkoutOverviewPage } = authenticatedUser;
        await checkoutOverviewPage.cancel();
        await expect(page).toHaveURL(/.*inventory.html/);
    });

    test('TC-406: Complete Order from Overview', async ({ authenticatedUser, page }) => {
        const { checkoutOverviewPage } = authenticatedUser;
        await checkoutOverviewPage.finishCheckout();
        await expect(page).toHaveURL(/.*checkout-complete.html/);
        await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    });

    test('TC-407: Verify Payment and Shipping Information', async ({ authenticatedUser }) => {
        const { checkoutOverviewPage } = authenticatedUser;
        await expect(checkoutOverviewPage.paymentInfo).toHaveText('SauceCard #31337');
        await expect(checkoutOverviewPage.shippingInfo).toHaveText('Free Pony Express Delivery!');
    });

    test('TC-408: Overview Page Layout and Elements', async ({ authenticatedUser }) => {
        const { checkoutOverviewPage } = authenticatedUser;
        await expect(checkoutOverviewPage.cartItems.first()).toBeVisible();
        await expect(checkoutOverviewPage.paymentInfo).toBeVisible();
        await expect(checkoutOverviewPage.shippingInfo).toBeVisible();
        await expect(checkoutOverviewPage.subtotal).toBeVisible();
        await expect(checkoutOverviewPage.tax).toBeVisible();
        await expect(checkoutOverviewPage.total).toBeVisible();
        await expect(checkoutOverviewPage.cancelButton).toBeVisible();
        await expect(checkoutOverviewPage.finishButton).toBeVisible();
    });

});
