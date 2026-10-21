import { APIRequestContext, test as base, expect } from '@playwright/test';
import { CatalogPage } from '../pages/CatalogPage';
import { ProductPage } from '../pages/ProductPage';
import { LoginPage } from '../pages/LoginPage';
import { Header } from '../pages/components/Header';
import { ProductsApi } from '../api/ProductsApi';
import { AuthApi } from '../api/AuthApi';
import { requireEnv } from '../utils/env';
import { LoginResponse } from '../types/api';
 
export const test = base.extend<{ catalogPage: CatalogPage, productPage: ProductPage, loginPage: LoginPage, header: Header, productsApi: ProductsApi, authApi: AuthApi, token: string }>({
  catalogPage: async ({ page }, use) => {
    const catalogPage = new CatalogPage(page); 
    await catalogPage.open();
    await use(catalogPage);
  },
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await use(loginPage);
  },
  header: async ({ page }, use) => {
    const header = new Header(page);
    await use(header);
  },
  productsApi: async ({ request }, use) => {
    const productsApi = new ProductsApi(request);
    await use(productsApi);
  },
  authApi: async ({ request }, use) => {
    const authApi  = new AuthApi(request)
    await use(authApi);
  },
  token: async ({ authApi }, use) => {
    const response = await authApi.login(requireEnv('APP_EMAIL'), requireEnv('APP_PASSWORD'));
    const body = await response.json() as LoginResponse;
    await use(body.access_token);
  }
  })

export { expect };