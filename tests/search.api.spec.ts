import { test, expect } from '../fixtures';
import type { Brand, ProductsPage } from '../types/api';

test('поиск Pliers возвращает только товары с Pliers в названии', async ({ productsApi }) => {
    const response = await productsApi.search('Pliers');

    await expect(response).toBeOK();

    const body = await response.json() as ProductsPage;

    expect(body.data.length).toBeGreaterThan(0);

    expect(body.data.every(product => product.name.includes('Pliers'))).toBe(true);
});

test('запрос несуществующего товара возвращает 404', async ({ productsApi }) => {
    const response = await productsApi.getById('NOT-AN-ID');

    expect(response.status()).toBe(404);

    const body = await response.json();

    expect(body.message).toBe('Requested item not found');
});

test('список брендов не пустой, у каждого бренда есть название', async ({ request }) => {
    const response = await request.get('/brands');

    await expect(response).toBeOK();

    const body = await response.json() as Brand[];

    expect(body.length).toBeGreaterThan(0);

    expect(body.every(brand => brand.name.length > 0)).toBe(true);
});

