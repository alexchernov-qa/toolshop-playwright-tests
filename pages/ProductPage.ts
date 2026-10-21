import { Page, Locator } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly name: Locator;
    readonly price: Locator;

    constructor(page: Page) {
        this.page = page;
        this.name = page.getByTestId('product-name');
        this.price = page.getByTestId('unit-price');
    }
}

