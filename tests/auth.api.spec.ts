import { test, expect } from '../fixtures';
import type { LoginResponse, User } from '../types/api';
import { requireEnv } from '../utils/env';

test('логин с верными данными возвращает токен', async ({ authApi }) => {
    const response = await authApi.login(requireEnv('APP_EMAIL'), requireEnv('APP_PASSWORD'));

    await expect(response).toBeOK();

    const body = await response.json() as LoginResponse;

    expect(body.access_token.length).toBeGreaterThan(0);

    expect(body.token_type).toBe('bearer');
});

test('логин с неверным паролем возвращает 401', async ({ authApi }) => {
    const response = await authApi.login(requireEnv('APP_EMAIL'), 'wrong-password');

    expect(response.status()).toBe(401);

    const body = await response.json();

    expect(body.error).toBe('Unauthorized');
});

test('профиль с токеном возвращает данные текущего пользователя', async ({ request, token }) => {
    const response = await request.get('/users/me', { headers: { Authorization: `Bearer ${token}` } });

    await expect(response).toBeOK();

    const body = await response.json() as User;

    expect(body.email).toEqual(requireEnv('APP_EMAIL'));
});

test('профиль без токена возвращает 401', async ({ request }) => {
    const response = await request.get('/users/me');

    expect(response.status()).toBe(401);

    const body = await response.json()

    expect(body.message).toBe('Unauthorized');
});

test('профиль с неверным токеном возвращает 401', async ({ request }) => {
    const response = await request.get('/users/me', { headers: { Authorization: `Bearer abc` } });

    expect(response.status()).toBe(401);

    const body = await response.json()

    expect(body.message).toBe('Unauthorized');
});