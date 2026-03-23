import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { testData } from '../data/testData';
import { CartPage } from '../pages/CartPage';
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';

type MyFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    checkoutInfoPage: CheckoutInfoPage;
    checkoutOverviewPage: CheckoutOverviewPage;
    authenticatedUser: { inventoryPage: InventoryPage, cartPage: CartPage, checkoutInfoPage: CheckoutInfoPage, checkoutOverviewPage: CheckoutOverviewPage }; 
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    checkoutInfoPage: async ({ page }, use) => {
        await use(new CheckoutInfoPage(page));
    },
    checkoutOverviewPage: async ({ page }, use) => {
        await use(new CheckoutOverviewPage(page));
    },
    authenticatedUser: async ({ page, inventoryPage, cartPage, checkoutInfoPage, checkoutOverviewPage }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto(testData.baseUrl);
        await loginPage.login(testData.users.standard.username, testData.users.standard.password);
        await use({ inventoryPage, cartPage, checkoutInfoPage, checkoutOverviewPage });
    }
});
export { expect } from '@playwright/test';
