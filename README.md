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
- Веб-сайт получает данные через Discord бота, а не напрямую из БД
- Веб-сайт сам не читает Discord-канал по `DISCORD_NEWS_CHANNEL_ID`; он читает данные из API бота (`/api/news`) или из БД, которую наполняет бот
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
├── app/              # Next.js App Router
│   ├── api/          # API routes
│   │   ├── members/  # Получение участников из БД
│   │   ├── activity/ # Получение активности из БД
│   │   ├── news/     # Получение новостей из БД
│   │   ├── guides/   # Получение гайдов из БД
│   │   └── absences/ # Получение отсутствий из БД
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Главная страница
├── components/        # React компоненты
│   ├── sections/     # Секции приложения
│   └── ...
├── lib/              # Утилиты и сервисы
│   ├── db/          # Подключение к БД
│   ├── api.ts        # API клиент
│   └── auth.ts       # Аутентификация
├── types/            # TypeScript типы
└── docs/             # Документация
    ├── database-schema.md    # Схема БД
    └── database-setup.md     # Инструкции по настройке
```

## Поддерживаемые базы данных

- **PostgreSQL** - Рекомендуется для продакшена
- **MongoDB** - NoSQL база данных
- **SQLite** - Для разработки и небольших проектов

## Интеграция с Discord ботом

Портал использует ту же базу данных, что и ваш Discord бот. Убедитесь, что:

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

Почему порядок именно такой:

- unit и E2E тесты ловят поведенческие регрессии до production build;
- `build` идет перед финальным `type-check`, потому что в этом репо Next.js генерирует `.next/types`, и такой порядок стабильнее для проверки типов после E2E/webServer сценариев.

### CI

GitHub Actions workflow находится в `.github/workflows/ci.yml` и запускает тот же `npm run validate`, чтобы локальная проверка и pull request gate не расходились.

## Безопасность

Краткие текущие security defaults и trust-boundary правила описаны в `SECURITY.md`.

## Производительность

Краткая стратегия по process-local cache и lightweight performance check описана в `PERFORMANCE.md`.

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
