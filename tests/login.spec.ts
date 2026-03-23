import { test, expect } from '../fixtures/loginFixture';
import { testData } from '../data/testData';

test.describe('1. Login and Authentication', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto(testData.baseUrl);
    });

    test('TC-001: Valid Login with Standard User', async ({ loginPage, page }) => {
        await expect(loginPage.usernameInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
        
        await loginPage.login(testData.users.standard.username, testData.users.standard.password);
        
        await expect(page).toHaveURL(/.*inventory.html/);
        await expect(page.locator('.title')).toHaveText('Products');
    });

    test('TC-002: Login with Empty Username', async ({ loginPage }) => {
        await loginPage.login('', testData.users.standard.password);
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');
        await loginPage.closeError();
        await expect(loginPage.errorMessage).toBeHidden();
    });

    test('TC-003: Login with Empty Password', async ({ loginPage }) => {
        await loginPage.login(testData.users.standard.username, '');
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Password is required');
    });

    test('TC-004: Login with Invalid Credentials', async ({ loginPage }) => {
        await loginPage.login(testData.users.invalid.username, testData.users.invalid.password);
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });

    test('TC-005: Login with Locked Out User', async ({ loginPage }) => {
        await loginPage.login(testData.users.lockedOut.username, testData.users.lockedOut.password);
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });

    test('TC-006: Logout Functionality', async ({ loginPage, inventoryPage, page }) => {
        await loginPage.login(testData.users.standard.username, testData.users.standard.password);
        await expect(page).toHaveURL(/.*inventory.html/);
        
        await inventoryPage.logout();
        await expect(page).toHaveURL(testData.baseUrl);
        await expect(loginPage.loginButton).toBeVisible();
    });

    test('TC-007: Login Page Elements Visibility', async ({ loginPage }) => {
        await expect(loginPage.logo).toBeVisible();
        await expect(loginPage.usernameInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
        await expect(loginPage.credentialsHint).toContainText('secret_sauce');
    });

    test('TC-008: Multiple Failed Login Attempts', async ({ loginPage, page }) => {
        await loginPage.login(testData.users.invalid.username, testData.users.invalid.password);
        await expect(loginPage.errorMessage).toBeVisible();
        await loginPage.closeError();
        
        await loginPage.login(testData.users.invalid.username, testData.users.invalid.password);
        await expect(loginPage.errorMessage).toBeVisible();
        
        await loginPage.page.reload();
        await loginPage.login(testData.users.standard.username, testData.users.standard.password);
        await expect(page).toHaveURL(/.*inventory.html/);
    });

});
