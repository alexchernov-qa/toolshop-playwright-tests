import { Page, Locator } from '@playwright/test';

export class CatalogPage {
    readonly page: Page;
    readonly productNames: Locator;
    readonly productPrices: Locator;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly sortDropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productNames = page.getByTestId('product-name');
        this.productPrices = page.getByTestId('product-price');
        this.searchInput = page.getByTestId('search-query');
        this.searchButton = page.getByTestId('search-submit');
        this.sortDropdown = page.getByRole('combobox', { name: 'sort' });
    }

    async open() {
        await this.page.goto('/');
    }
    async search(text: string) {
        await this.searchInput.fill(text);
        await this.searchButton.click();
    }
    async sortBy(label: string) {
        await this.sortDropdown.selectOption(label);
    }
    async selectCategory(name: string) {
        await this.page.getByRole('checkbox', { name: name, exact: true }).check();
    }
}
