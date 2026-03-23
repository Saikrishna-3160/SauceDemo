import { test, expect } from '../fixtures/loginFixture';
import { testData } from '../data/testData';

test.describe('4. Checkout: Your Information', () => {

    test.beforeEach(async ({ authenticatedUser }) => {
        const { inventoryPage, cartPage } = authenticatedUser;
        await inventoryPage.addProductToCart(testData.products.backpack.name);
        await inventoryPage.openCart();
        await cartPage.proceedToCheckout();
    });

    test('TC-301: Proceed to Checkout from Cart with Items', async ({ page }) => {
        await expect(page).toHaveURL(/.*checkout-step-one.html/);
        await expect(page.locator('.title')).toHaveText('Checkout: Your Information');
        await expect(page.locator('[data-test="firstName"]')).toBeVisible();
        await expect(page.locator('[data-test="lastName"]')).toBeVisible();
        await expect(page.locator('[data-test="postalCode"]')).toBeVisible();
    });

    test('TC-302: Complete Checkout Information with Valid Data', async ({ authenticatedUser, page }) => {
        const { checkoutInfoPage } = authenticatedUser;
        await checkoutInfoPage.fillInfo(
            testData.checkoutInfo.valid.firstName,
            testData.checkoutInfo.valid.lastName,
            testData.checkoutInfo.valid.postalCode
        );
        await checkoutInfoPage.continueToNextStep();
        await expect(page).toHaveURL(/.*checkout-step-two.html/);
    });

    test('TC-303: Checkout with Missing First Name', async ({ authenticatedUser }) => {
        const { checkoutInfoPage } = authenticatedUser;
        await checkoutInfoPage.fillInfo(
            undefined,
            testData.checkoutInfo.valid.lastName,
            testData.checkoutInfo.valid.postalCode
        );
        await checkoutInfoPage.continueToNextStep();
        await expect(checkoutInfoPage.errorMessage).toHaveText('Error: First Name is required');
    });

    test('TC-304: Checkout with Missing Last Name', async ({ authenticatedUser }) => {
        const { checkoutInfoPage } = authenticatedUser;
        await checkoutInfoPage.fillInfo(
            testData.checkoutInfo.valid.firstName,
            undefined,
            testData.checkoutInfo.valid.postalCode
        );
        await checkoutInfoPage.continueToNextStep();
        await expect(checkoutInfoPage.errorMessage).toHaveText('Error: Last Name is required');
    });

    test('TC-305: Checkout with Missing Zip/Postal Code', async ({ authenticatedUser }) => {
        const { checkoutInfoPage } = authenticatedUser;
        await checkoutInfoPage.fillInfo(
            testData.checkoutInfo.valid.firstName,
            testData.checkoutInfo.valid.lastName,
            undefined
        );
        await checkoutInfoPage.continueToNextStep();
        await expect(checkoutInfoPage.errorMessage).toHaveText('Error: Postal Code is required');
    });

    test('TC-306: Checkout with All Fields Missing', async ({ authenticatedUser }) => {
        const { checkoutInfoPage } = authenticatedUser;
        await checkoutInfoPage.continueToNextStep();
        await expect(checkoutInfoPage.errorMessage).toHaveText('Error: First Name is required');
    });

    test('TC-307: Cancel Checkout', async ({ authenticatedUser, page }) => {
        const { checkoutInfoPage } = authenticatedUser;
        await checkoutInfoPage.cancel();
        await expect(page).toHaveURL(/.*cart.html/);
    });

    test('TC-308: Checkout with Special Characters in Name', async ({ authenticatedUser, page }) => {
        const { checkoutInfoPage } = authenticatedUser;
        await checkoutInfoPage.fillInfo(
            testData.checkoutInfo.specialChars.firstName,
            testData.checkoutInfo.specialChars.lastName,
            testData.checkoutInfo.specialChars.postalCode
        );
        await checkoutInfoPage.continueToNextStep();
        await expect(page).toHaveURL(/.*checkout-step-two.html/);
    });

    test('TC-309: Checkout with Long Names and Zip Code', async ({ authenticatedUser, page }) => {
        const { checkoutInfoPage } = authenticatedUser;
        await checkoutInfoPage.fillInfo(
            testData.checkoutInfo.longInput.firstName,
            testData.checkoutInfo.longInput.lastName,
            testData.checkoutInfo.longInput.postalCode
        );
        await checkoutInfoPage.continueToNextStep();
        await expect(page).toHaveURL(/.*checkout-step-two.html/);
    });

});
