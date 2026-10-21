import { APIRequestContext } from "@playwright/test";

export class ProductsApi {

    constructor(readonly request: APIRequestContext) {}

    async list(page = 1) {
        const response = await this.request.get('/products', { params: { page } });
        return response;
    }
    async search(q: string) {
        const response = await this.request.get('/products/search', { params: { q } });
        return response;
    }
    async getById(id: string) {
        const response = await this.request.get(`/products/${id}`);
        return response;
    }
}