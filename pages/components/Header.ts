import { Page, Locator } from "@playwright/test";

export class Header {
    readonly page : Page;
    readonly userName : Locator;
    readonly signInLink : Locator;

    constructor(page: Page) {
        this.page = page;
        this.userName = page.getByTestId('nav-menu');
        this.signInLink = page.getByTestId('nav-sign-in');
    }
    
}