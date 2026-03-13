# Silent Moonfall Guild Portal

Веб-портал для управления гильдией Silent Moonfall в Justice Mobile.

## 🎯 Возможности

### Для участников:
- 📅 **Расписание** — просмотр событий гильдии с RSVP (Иду/Не иду/Возможно)
- 📊 **Личный кабинет** — управление профилем, активностями, учетками
- 📬 **Помощь** — запрос и оказание помощи внутри гильдии
- 🏥 **Отсутствия** — подача заявок на отсутствие
- ⚔️ **PvP** — запись на PvP сессии, статистика, рейтинг
- 📖 **Гайды** — база знаний гильдии
- 📰 **Новости** — объявления и обновления
- 📱 **Мобильная версия** — полный функционал на мобильных устройствах

### Для офицеров:
- 📈 **Аналитика** — heatmap посещаемости, композиция классов, тренды, нагрузка офицеров
- ⚙️ **Автоматизация** — авто-одобрение отсутствий, авто-закрытие помощи, шаблоны ответов
- 🔔 **Уведомления** — toast-алерты для важных событий
- 🔗 **Интеграции** — Discord bot, Google Sheets (планируется), WoW API (планируется)

## 🛠 Технологии

## Установка

1. Клонируйте репозиторий
2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env.local` на основе `.env.example`:
```bash
cp .env.example .env.local
```

4. Заполните переменные окружения в `.env.local`

**Примечание:** База данных настраивается в Discord боте, а не в веб-приложении. См. `docs/discord-bot-integration.md`

6. Запустите dev сервер:
```bash
npm run dev
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)

## Переменные окружения

### Аутентификация
- `JWT_SECRET` - Секретный ключ для JWT токенов
- `OFFICER_PIN` *(опционально)* - резервный PIN вход офицера
- `GM_PIN` *(опционально)* - резервный PIN вход GM

Основной вход: **ник + пароль** (личные учетные записи).
Новые аккаунты создаются в статусе `inactive` и активируются офицером/GM в личном кабинете.

### Discord Bot API
- `DISCORD_BOT_API_URL` или `BOT_API_URL` - URL API сервера Discord бота
- `DISCORD_BOT_API_KEY` или `BOT_API_KEY` - ключ для чтения защищенных эндпоинтов бота *(нужен, если `/api/news` и другие bot endpoints закрыты)*

**Важно:** 
- Портал работает по гибридной схеме: часть данных идет через Discord Bot API, часть читается и обновляется самим Next.js приложением напрямую через БД/read-model слой
- Портал сам не читает Discord-канал по `DISCORD_NEWS_CHANNEL_ID`; он получает новости через bot API или из БД/read-model, которую наполняет бот или сам портал
- Если сайт на Vercel, а бот локально → используйте **Cloudflare Tunnel** (рекомендуется) или ngrok
- Discord бот должен предоставлять HTTP API endpoints (см. `docs/discord-bot-integration.md`)

**Быстрый старт:**
- Cloudflare Tunnel: `docs/cloudflare-tunnel-quickstart.md` ⭐
- Все варианты: `docs/deployment-solutions.md`

**Примеры URL:**
- Локально: `http://localhost:3001`
- Cloudflare Tunnel: `https://abc123.trycloudflare.com` или `https://justice-bot.yourdomain.com`
- ngrok: `https://abc123.ngrok-free.app`
- На сервере: `https://your-bot.railway.app`

### Discord bot side (для чтения новостей именно из Discord-канала)
- `DISCORD_BOT_TOKEN` - токен Discord-бота
- `DISCORD_NEWS_CHANNEL_ID` - ID канала, из которого бот забирает новости
- `DATABASE_URL` - нужен, если бот складывает новости в общую БД, из которой потом читает портал

Для схемы `Discord channel -> bot -> website` минимальный набор такой:

```env
# website
DISCORD_BOT_API_URL=http://localhost:3001
# если bot API закрыт ключом
BOT_API_KEY=your_shared_api_key

# discord bot
DISCORD_BOT_TOKEN=your_discord_bot_token
DISCORD_NEWS_CHANNEL_ID=123456789012345678

# если бот пишет новости в PostgreSQL
DATABASE_URL=postgresql://user:password@host:5432/database
```

## Структура проекта

```
├── app/                  # App Router pages, layouts, API routes
│   └── api/              # Thin HTTP transport layer
├── components/           # UI shell, sections, forms, shared components
├── lib/
│   ├── api/              # Typed client-side API wrappers
│   ├── schemas/          # Zod schemas and DTOs
│   ├── server/           # Domain services, read-models, route helpers
│   ├── auth/             # Auth helpers and account flows
│   ├── i18n/             # Language context and translations
│   └── providers/        # Query/i18n/react providers
├── tests/                # Unit/integration tests
├── e2e/                  # Playwright scenarios
├── docs/                 # Supplemental docs
├── ARCHITECTURE.md       # Current hybrid architecture baseline
├── SECURITY.md           # Security defaults and trust boundaries
└── PERFORMANCE.md        # Read-model/cache strategy
```

## Поддерживаемые базы данных

- **PostgreSQL / Neon** - основной поддерживаемый storage path для портала и read-model слоя

## Интеграция с Discord ботом

Портал может работать и напрямую с БД, и через Discord Bot API. Для интеграционных сценариев убедитесь, что:

1. Структура таблиц/коллекций соответствует схеме (см. `docs/database-schema.md`)
2. Поля имеют правильные имена
3. Подключение настроено через переменные окружения

Подробнее см. `docs/database-setup.md`

## Деплой

Проект настроен для деплоя на Vercel:

```bash
npm run build
vercel --prod
```

Не забудьте настроить переменные окружения в Vercel Dashboard.

### Локальный vinext cutover

В репозитории есть path-based cutover scaffold для параллельного запуска `Next` и `vinext`.

- `VINEXT_CUTOVER_SCOPE=off` — весь трафик остается на `Next`
- `VINEXT_CUTOVER_SCOPE=pilot` — `vinext` забирает `/news`, `/help`, `/guides`
- `VINEXT_CUTOVER_SCOPE=wave2` — дополнительно забирает `/profile`, `/absences`, `/pvp`, `/schedule`, `/calendar`
- `VINEXT_CUTOVER_SCOPE=all` — тот же набор, но режим оставлен для дальнейшего расширения волн

Для локального dual-runtime запуска есть готовые команды:

```bash
npm run dev:cutover:pilot
npm run dev:cutover:wave2
npm run dev:cutover:all
```

По умолчанию они поднимают:

- `Next` на `http://127.0.0.1:3000`
- `vinext` на `http://127.0.0.1:3101`

Можно переопределить порты и origin:

```bash
NEXT_PORT=3001 VINEXT_PORT=3201 VINEXT_CUTOVER_ORIGIN=http://127.0.0.1:3201 npm run dev:cutover:wave2
```

Быстрый rollback локально — остановить cutover script и вернуться к обычному `npm run dev`, либо выставить `VINEXT_CUTOVER_SCOPE=off`.

### Staging / preview cutover

Для preview/staging env используйте тот же path-based cutover через env vars. Подробный runbook лежит в `docs/vinext-staging-cutover.md`.

Быстрые команды:

```bash
npm run cutover:env:pilot
npm run cutover:env:wave2
npm run cutover:env:off
```

Проверка активных rewrites под текущим env:

```bash
VINEXT_CUTOVER_SCOPE=wave2 VINEXT_CUTOVER_ORIGIN=https://vinext-preview.example.com npm run cutover:verify
```

## Проверка качества

Локальный и CI-путь теперь совпадают: основной quality gate запускается одной командой.

```bash
npm run validate
```

`validate` выполняет последовательно:

1. `npm run lint`
2. `npm run test`
3. `npm run test:e2e`
4. `npm run build`
5. `npm run type-check`

`npm run test:e2e` теперь включает два Playwright project внутри одного `playwright.config.ts`:

- `chromium` — основной Next.js smoke/a11y/mobile путь
- `vinext-chromium` — authenticated vinext pilot и vinext a11y smoke на отдельном vinext dev server

Почему порядок именно такой:

- unit и E2E тесты ловят поведенческие регрессии до production build;
- `build` идет перед финальным `type-check`, потому что в этом репо Next.js генерирует `.next/types`, и такой порядок стабильнее для проверки типов после E2E/webServer сценариев.

### CI

GitHub Actions workflow находится в `.github/workflows/ci.yml` и запускает тот же `npm run validate`, чтобы локальная проверка и pull request gate не расходились.

## Безопасность

Краткие текущие security defaults и trust-boundary правила описаны в `SECURITY.md`.

## Производительность

Краткая стратегия по process-local cache и lightweight performance check описана в `PERFORMANCE.md`.

## Текущие engineering notes

- Источник shell/navigation copy теперь централизован в `lib/i18n/copy.ts`; `lib/i18n.ts` оставлен как compatibility re-export для старых импортов.
- Authenticated session boundary валидирует DB-backed account id до SQL lookup, чтобы тестовые/невалидные идентификаторы не превращались в Postgres `22P02`.
- Планируемые split points для крупных модулей зафиксированы в `docs/hotspot-refactor-seams.md`.

## 📋 Roadmap

### ✅ Завершено (2024-2025)

1. **Слой уведомлений** — Toast-алерты, настройки уведомлений, интеграция со всеми модулями
2. **RSVP + Календарь** — Система ответов на события, личный календарь, экспорт в Google/Outlook
3. **Аналитика гильдии** — Heatmap посещаемости, композиция классов, тренды, метрики офицеров
4. **Автоматизация** — Авто-одобрение отсутствий, авто-закрытие помощи, шаблоны ответов
5. **Интеграции** — Discord bot, Google Sheets (WIP), WoW API (WIP)

### ⏳ В планах

- Рефакторинг и оптимизация производительности
- Увеличение покрытия тестами
- Расширение документации

## Лицензия

MIT
