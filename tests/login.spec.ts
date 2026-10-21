import { test, expect } from '../fixtures';
import { requireEnv } from '../utils/env';

test.use({ storageState: { cookies: [], origins: [] } });

test('вход с верными данными ведёт в личный кабинет', async ({ loginPage, page }) => {
    await loginPage.login(requireEnv('APP_EMAIL'), requireEnv('APP_PASSWORD'));
    await expect(page).toHaveURL(/\/account/);
    await expect(page.getByTestId('page-title')).toHaveText('My account');
});

test('вход с неверным паролем показывает ошибку и остаётся на странице входа', async ({ loginPage, page }) => {
    await loginPage.login(requireEnv('APP_EMAIL'), 'wrong-password');
    await expect(loginPage.errorMessage).toContainText('Invalid email or password');
    await expect(page).toHaveURL(/\/auth\/login/);
});