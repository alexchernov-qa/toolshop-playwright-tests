import { expect, test } from '../fixtures';
import { CatalogPage } from '../pages/CatalogPage';

test('на главной отображается 9 карточек товаров', async ({ catalogPage }) => {
    await expect(catalogPage.productNames).toHaveCount(9);
});

test('поиск Pliers показывает только товары с Pliers в названии', async ({ catalogPage }) => {
    await catalogPage.search('Pliers');

    await expect(catalogPage.productNames).toHaveCount(4);

    await expect(catalogPage.productNames.filter({ hasNotText: /pliers/i })).toHaveCount(0);
});

test('фильтр по категории Hammer показывает только молотки', async ({ catalogPage }) => {
    await catalogPage.selectCategory('Hammer');
 
    await expect(catalogPage.productNames).toHaveCount(7);

    await expect(catalogPage.productNames.filter({ hasNotText: /hammer/i })).toHaveCount(0);
});

test('сортировка Name (A - Z) выстраивает товары по алфавиту', async ({ catalogPage }) => {
    await catalogPage.sortBy('Name (A - Z)');

    await expect(catalogPage.productNames).toHaveCount(9);

    await expect.poll(async () => {
        const names = await catalogPage.productNames.allTextContents();
        const clearNames = names.map(name => name.trim()); 
        return clearNames.join() === [...clearNames].sort().join();
    }).toBe(true);
});

test('клик по первому товару открывает его страницу с тем же названием и ценой', async ({ catalogPage, productPage, page }) => {
    await expect(catalogPage.productNames).toHaveCount(9);

    const nameOfFirstCard = await catalogPage.productNames.first().innerText();

    const priceOfFirstCard = await catalogPage.productPrices.first().innerText();

    await catalogPage.productNames.first().click();

    await expect(page).toHaveURL(/\/product\//);

    await expect(productPage.name).toHaveText(nameOfFirstCard);

    await expect(productPage.price).toHaveText(priceOfFirstCard.replace('$', ''));
});

test('авторизованный пользователь видит своё имя в шапке каталога', async ({ catalogPage, header}) => {
    await expect(catalogPage.productNames).toHaveCount(9);

    await expect(header.userName).toHaveText('Jane Doe');

    await expect(header.signInLink).toHaveCount(0);
});