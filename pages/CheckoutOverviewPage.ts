import { Page, Locator } from '@playwright/test';

export class CheckoutOverviewPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly paymentInfo: Locator;
    readonly shippingInfo: Locator;
    readonly subtotal: Locator;
    readonly tax: Locator;
    readonly total: Locator;
    readonly finishButton: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.paymentInfo = page.locator('.summary_info_label:has-text("Payment Information") + .summary_value_label');
        this.shippingInfo = page.locator('.summary_info_label:has-text("Shipping Information") + .summary_value_label');
        this.subtotal = page.locator('.summary_subtotal_label');
        this.tax = page.locator('.summary_tax_label');
        this.total = page.locator('.summary_total_label');
        this.finishButton = page.locator('[data-test="finish"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
    }

    async getProductNames() {
        return await this.cartItems.locator('.inventory_item_name').allTextContents();
    }

    async getProductPrices() {
        return await this.cartItems.locator('.inventory_item_price').allTextContents();
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }
}
