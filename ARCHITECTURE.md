# Архитектура системы

## Схема взаимодействия

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Website   │ ──────> │ Discord Bot  │ ──────> │     DB      │
│  (Next.js)  │ <────── │   (API)      │ <──────  │             │
└─────────────┘         └──────────────┘         └─────────────┘
     Port 3000              Port 3001
```

## Компоненты

### 1. Website (Next.js)
- **Порт:** 3000
- **Роль:** Frontend + API Proxy
- **Функции:**
  - Отображение UI
  - Аутентификация пользователей
  - Проксирование запросов к Discord боту
  - Кэширование данных

### 2. Discord Bot (API Server)
- **Порт:** 3001 (по умолчанию)
- **Роль:** Middleware между Website и DB
- **Функции:**
  - Обработка Discord команд
  - Предоставление HTTP API для веб-сайта
  - Управление данными в БД
  - Бизнес-логика

### 3. Database
- **Роль:** Хранение данных
- **Таблицы:**
  - `registrations` - регистрации участников
  - `schedule` - расписание событий
  - `news` - новости
  - `guides` - гайды
  - `absences` - отсутствия

## Поток данных

1. **Пользователь открывает веб-сайт**
   - Website проверяет аутентификацию
   - Показывает UI

2. **Пользователь запрашивает данные**
   - Website отправляет запрос к `/api/discord-proxy/*`
   - Next.js API Route проксирует запрос к Discord боту
   - Discord бот получает данные из БД
   - Данные возвращаются через цепочку обратно

3. **Discord бот обновляет данные**
   - Бот получает команды из Discord
   - Обновляет данные в БД
   - Веб-сайт получает актуальные данные при следующем запросе

## Преимущества такой архитектуры

✅ **Безопасность:** БД не доступна напрямую из интернета
✅ **Централизация:** Вся бизнес-логика в одном месте (Discord бот)
✅ **Гибкость:** Легко добавить новые источники данных
✅ **Масштабируемость:** Можно добавить несколько веб-сайтов или клиентов

## API Endpoints

### Website → Discord Bot

Все запросы идут через `/api/discord-proxy/*`:

- `GET /api/discord-proxy/registration` → `GET /api/registrations` (Discord Bot)
- `GET /api/discord-proxy/schedule` → `GET /api/schedule` (Discord Bot)
- `GET /api/discord-proxy/news` → `GET /api/news` (Discord Bot)
- `GET /api/discord-proxy/guides` → `GET /api/guides` (Discord Bot)
- `GET /api/discord-proxy/absences` → `GET /api/absences` (Discord Bot)

### Discord Bot должен предоставлять

- `GET /api/registrations` - список регистраций
- `GET /api/schedule` - расписание
- `GET /api/news` - новости
- `GET /api/guides` - гайды
- `GET /api/absences` - отсутствия

## Настройка

1. **Discord Bot:** Запустите HTTP сервер на порту 3001 (или другом)
2. **Website:** Установите `DISCORD_BOT_API_URL` в `.env.local` или Vercel Environment Variables
3. **Database:** Настройте подключение в Discord боте

### Если сайт на Vercel, а бот локально:

**Используйте туннелирование:**
- **ngrok** - быстро, просто (`docs/ngrok-setup.md`)
- **Cloudflare Tunnel** - бесплатно, стабильно (`docs/deployment-solutions.md`)

**Или задеплойте бота:**
- **Railway** - простой деплой (`docs/deployment-solutions.md`)
- **Render** - бесплатный план (`docs/deployment-solutions.md`)

Подробнее см.:
- `docs/discord-bot-integration.md` - интеграция с ботом
- `docs/deployment-solutions.md` - решения для деплоя
- `QUICKSTART.md` - быстрый старт

