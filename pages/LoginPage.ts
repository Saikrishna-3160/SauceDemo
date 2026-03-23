import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly logo: Locator;
    readonly credentialsHint: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
        this.logo = page.locator('.login_logo');
        this.credentialsHint = page.locator('.login_credentials_wrap');
    }

    async goto(url: string) {
        await this.page.goto(url);
    }

    async login(username?: string, password?: string) {
        if (username !== undefined) await this.usernameInput.fill(username);
        if (password !== undefined) await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async closeError() {
        await this.errorMessage.locator('button').click();
    }
}
