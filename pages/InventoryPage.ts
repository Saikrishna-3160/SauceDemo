import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly title: Locator;
    readonly menuButton: Locator;
    readonly logoutLink: Locator;
    readonly cartIcon: Locator;
    readonly cartBadge: Locator;
    readonly sortDropdown: Locator;
    readonly productItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('.title');
        this.menuButton = page.getByRole('button', { name: 'Open Menu' });
        this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.productItems = page.locator('.inventory_item');
    }

    async logout() {
        await this.menuButton.click();
        await this.logoutLink.waitFor({ state: 'visible' });
        await this.logoutLink.click();
    }

    async getProductNames() {
        return await this.productItems.locator('.inventory_item_name').allTextContents();
    }
    
    async getProductPrices() {
        return await this.productItems.locator('.inventory_item_price').allTextContents();
    }

    async sortProducts(option: string) {
        await this.sortDropdown.selectOption({ label: option });
    }

    async openProductDetails(productName: string) {
        await this.page.locator('.inventory_item_name', { hasText: productName }).click();
    }

    async addProductToCart(productName: string) {
        const item = this.productItems.filter({ hasText: productName });
        await item.locator('button', { hasText: 'Add to cart' }).click();
    }

    async removeProductFromCart(productName: string) {
        const item = this.productItems.filter({ hasText: productName });
        await item.locator('button', { hasText: 'Remove' }).click();
    }
    
    async openCart() {
        await this.cartIcon.click();
    }
}
