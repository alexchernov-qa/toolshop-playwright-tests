# Toolshop Test Automation: Playwright + TypeScript

<!-- TODO: после публикации замени ТВОЙ_ЛОГИН и ИМЯ_РЕПО и раскомментируй бейдж CI:
[![Tests](https://github.com/ТВОЙ_ЛОГИН/ИМЯ_РЕПО/actions/workflows/tests.yml/badge.svg)](https://github.com/ТВОЙ_ЛОГИН/ИМЯ_РЕПО/actions/workflows/tests.yml)
-->

Фреймворк автотестов для демо-магазина [Toolshop](https://practicesoftwaretesting.com): UI-тесты (каталог, поиск, вход) и API-тесты (каталог, авторизация) на **Playwright** и **TypeScript**.

Проект учебный, но устроен как рабочий: Page Object, фикстуры, типизированный API-клиент, авторизация через `storageState`, секреты вне кода, запуск в CI.

## Что проверяется

| Область | Что покрыто | Где |
|---|---|---|
| **Каталог (UI)** | карточки товаров, поиск, фильтр по категории, сортировка по алфавиту, переход на страницу товара | `tests/catalog.spec.ts` |
| **Вход (UI)** | успешный вход, ошибка при неверном пароле | `tests/login.spec.ts` |
| **Авторизованная зона (UI)** | имя пользователя в шапке без повторного ввода пароля | `tests/catalog.spec.ts` |
| **Каталог (API)** | список товаров, структура ответа, поиск, `404` на неизвестный товар, бренды | `tests/products.api.spec.ts`, `tests/search.api.spec.ts` |
| **Авторизация (API)** | логин и токен, защищённый профиль, `401` без токена и с неверным токеном | `tests/auth.api.spec.ts` |

Всего **19 тестов** (включая один setup-тест входа).

## Стек
- [Playwright](https://playwright.dev) (`@playwright/test`) + TypeScript
- `dotenv` для локальных секретов
- GitHub Actions для CI

## Архитектура

```
.
├── tests/        # сами тесты (*.spec.ts для UI, *.api.spec.ts для API) и auth.setup.ts
├── pages/        # Page Object: CatalogPage, ProductPage, LoginPage
│   └── components/   # компоненты, общие для страниц (Header)
├── api/          # клиенты API: ProductsApi, AuthApi
├── fixtures/     # test.extend: готовые page object-ы, клиенты и токен для тестов
├── types/        # TypeScript-типы ответов API
├── utils/        # вспомогательные функции (requireEnv)
└── playwright.config.ts
```

Ключевые решения:
- **Page Object** хранит локаторы и действия страницы, проверки (`expect`) остаются в тестах.
- **Фикстуры** (`test.extend`) выдают тесту готовые `catalogPage`, `loginPage`, `productsApi`, `token`. Подготовка не повторяется в каждом тесте.
- **Авторизация через `storageState`**: отдельный setup-проект входит один раз, остальные UI-тесты стартуют уже авторизованными. Тесты самой формы входа запускаются без сохранённого состояния.
- **API-клиенты и типы**: адреса и параметры запросов собраны в классах, ответы описаны через `interface`.
- **Локаторы** выбираются по приоритету: роль и имя, затем `data-test`.
- **Проекты в конфиге**: `setup`, `chromium` (UI) и `api` (свой `baseURL`, без браузера).
- **Секреты** не лежат в коде: локально в `.env`, в CI в GitHub Secrets.
- **Трейсы** записываются при повторном запуске упавшего теста (`on-first-retry`), в CI доступны как артефакт.

## Как запустить

Нужны Node.js 20+ и npm.

```bash
npm install
npx playwright install chromium

cp .env.example .env
# впиши в .env логин и пароль демо-аккаунта (они указаны в документации Toolshop)

npm test
```

Полезные команды:

| Команда | Что делает |
|---|---|
| `npm test` | все тесты |
| `npx playwright test --project=api` | только API-тесты |
| `npx playwright test --project=chromium` | только UI-тесты |
| `npm run test:ui` | UI mode: пошаговый просмотр |
| `npm run test:trace` | прогон с записью трейса |
| `npm run report` | открыть HTML-отчёт |

## CI

Workflow `.github/workflows/tests.yml` запускает тесты при каждом `push` и `pull_request` в `main` на чистой машине, а HTML-отчёт сохраняет как артефакт.

Для запуска в своём форке нужно добавить два секрета репозитория: `APP_EMAIL` и `APP_PASSWORD`.

## Планы

- Allure-отчёт и публикация на GitHub Pages
- Генерация тестовых данных
- Моки сетевых запросов (`page.route`)
- Шардирование и запуск на нескольких браузерах

## Об авторе

Александр Чернов, QA-инженер. Тестирую классифайд-платформы: web, Android и iOS. Хорошо знаю предметную область: выдачу и фильтры, поиск, авторизацию, проверку аналитических событий.

Этот репозиторий - публичный фреймворк автотестов, который я собрал, чтобы перенести доменный опыт в автоматизацию: Page Object, фикстуры, типизированный API-клиент, авторизация через `storageState`, запуск в CI. Решения можно брать и адаптировать под похожие продукты (классифайды, e-commerce).

Контакты: Telegram @AlexandrChernov, email alex.chernov1012@gmail.com
