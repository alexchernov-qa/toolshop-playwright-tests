import { expect, test } from "@playwright/test";
import type { ProductsPage } from '../types/api';


test('GET /products возвращает первую страницу товаров', async ({ request }) => {
    const response = await request.get('/products', { params: { page: 1 } });

    await expect(response).toBeOK();

    const body = (await response.json()) as ProductsPage;

    expect(body.data).toHaveLength(body.per_page);

    expect(body.current_page).toBe(1);
});

test('у каждого товара в списке есть название и положительная цена', async ({ request }) => {
    const response = await request.get('/products', { params: { page: 1 } });

    await expect(response).toBeOK();

    const body = (await response.json()) as ProductsPage;

    expect(body.data.length).toBeGreaterThan(0);

    const result = body.data.every(product => product.name.length > 0 && product.price > 0);

    expect(result).toBe(true);
});