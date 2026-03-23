import { Page, Locator } from '@playwright/test';

export class CheckoutInfoPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async fillInfo(firstName?: string, lastName?: string, postalCode?: string) {
        if (firstName !== undefined) await this.firstNameInput.fill(firstName);
        if (lastName !== undefined) await this.lastNameInput.fill(lastName);
        if (postalCode !== undefined) await this.postalCodeInput.fill(postalCode);
    }

    async continueToNextStep() {
        await this.continueButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }
}
