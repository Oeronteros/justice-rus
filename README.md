# Justice Mobile Guild Portal

Веб-портал для управления гильдией Justice Mobile в игре Cult Game Community.

## Технологии

- **Next.js 16** - React фреймворк с App Router
- **TypeScript** - Типизированный JavaScript
- **Tailwind CSS 4** - Utility-first CSS фреймворк
- **JWT** - Аутентификация через токены
- **Discord Bot API** - Получение данных через Discord бота (архитектура: DB ↔ Discord Bot ↔ Website)

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

4. Настройте базу данных (см. `docs/database-setup.md`)

5. Заполните переменные окружения в `.env.local`

6. Запустите dev сервер:
```bash
npm run dev
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)

## Переменные окружения

### Аутентификация
- `MEMBER_PIN` - PIN код для участников
- `OFFICER_PIN` - PIN код для офицеров
- `GM_PIN` - PIN код для мастера гильдии
- `JWT_SECRET` - Секретный ключ для JWT токенов

### Discord Bot API
- `DISCORD_BOT_API_URL` - URL API сервера Discord бота

**Важно:** 
- Веб-сайт получает данные через Discord бота, а не напрямую из БД
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

### Discord (опционально)
- `DISCORD_BOT_TOKEN` - Токен Discord бота
- `DISCORD_NEWS_CHANNEL_ID` - ID канала с новостями

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

## Лицензия

MIT
