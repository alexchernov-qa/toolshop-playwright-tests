import { test as setup, expect } from '../fixtures';
import { requireEnv } from '../utils/env';

const authFile = 'playwright/.auth/user.json';

setup('войти и сохранить состояние', async ({ loginPage, page }) => {
    // 1. войти через loginPage (как в твоём первом логин-тесте)
    await loginPage.login(requireEnv('APP_EMAIL'), requireEnv('APP_PASSWORD'));
    // 2. проверить, что вошли: адрес содержит /account
    await expect(page).toHaveURL(/\/account/);
    // 3. сохранить состояние: await page.context().storageState({ path: authFile });
    await page.context().storageState({ path: authFile });
});
