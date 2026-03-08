# Justice RU - Next.js + TypeScript Deployment Guide for Vercel

## 📋 Предварительные требования

- Node.js 20+
- npm/yarn
- Аккаунт на Vercel

---

## 🚀 Быстрый старт (Локально)

### 1. Установка зависимостей
```bash
npm install
```

### 2. Запуск dev-сервера
```bash
npm run dev
```
Откройте [http://localhost:3000](http://localhost:3000) в браузере.

### 3. Запуск production-сборки
```bash
npm run build
npm start
```

---

## 🌐 Развертывание на Vercel

### Вариант 1: Через Vercel Dashboard (рекомендуется)

1. Откройте [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Нажмите "Add New" → "Project"
3. Выберите Git репозиторий (GitHub/GitLab/Bitbucket)
4. Выберите ветку (например, `main`)
5. Vercel автоматически обнаружит Next.js и установит правильные параметры
6. Нажмите "Deploy"

### Вариант 2: Через Vercel CLI

```bash
# Установка CLI
npm install -g vercel

# Первый деплой
vercel

# Последующие деплои (production)
vercel --prod
```

---

## ⚙️ Переменные окружения (Environment Variables)

На Vercel Dashboard → Project Settings → Environment Variables добавьте:

```env
# Обязательные
DISCORD_BOT_API_URL=https://your-bot-url.example.com

# Для локальной разработки (.env.local)
JWT_SECRET=your-secret-key-change-in-production
MEMBER_PASSWORD=1111
OFFICER_PASSWORD=2222
GM_PASSWORD=3333
```

### Если используете Discord бота локально:
```env
DISCORD_BOT_API_URL=https://your-ngrok-url.ngrok.io
# или
DISCORD_BOT_API_URL=https://your-localtunnel-url.loca.lt
```

---

## 📊 Структура проекта

```
justice-ru/
├── app/                     # Next.js App Router
│   ├── (portal)/page.tsx    # Главная страница портала
│   └── layout.tsx           # Root layout
├── components/              # React компоненты
├── lib/                      # Утилиты и константы
├── types/                    # TypeScript типы
├── public/                   # Статические файлы
├── next.config.ts          # Конфигурация Next.js
├── vercel.json             # Конфигурация Vercel
├── tsconfig.json           # TypeScript конфигурация
└── package.json            # Dependencies
```

---

## 🔧 API маршруты

Все API маршруты находятся в `app/api/`:

- `POST /api/auth` - Аутентификация (проверка PIN)
- `GET /api/verify-auth` - Проверка токена
- `GET /api/discord-proxy/registration` - Список регистраций
- `GET /api/discord-proxy/schedule` - График
- `GET /api/discord-proxy/news` - Новости
- `GET /api/discord-proxy/guides` - Гайды
- `GET /api/discord-proxy/absences` - Отсутствия

Все запросы требуют Discord бота, доступного по `DISCORD_BOT_API_URL`.

---

## 🐛 Решение проблем

### 404 на корневом пути `/`
1. Проверьте, что корневой маршрут существует (в текущей структуре это `app/(portal)/page.tsx`)
2. Пересоберите: `npm run build`
3. На Vercel: очистите кэш и пересоберите (Settings → Deployments → Redeploy)

### "Failed to connect to Discord bot"
1. Убедитесь, что Discord бот запущен и доступен
2. Проверьте `DISCORD_BOT_API_URL` в Vercel Environment Variables
3. Используйте туннель (ngrok/LocalTunnel/Cloudflare) если бот на локальной машине

### Ошибки TypeScript при deploy
```bash
npm run type-check
```
Исправьте ошибки локально перед push.

---

## 📝 Команды

```bash
npm run dev         # Запуск dev-сервера
npm run build       # Production сборка
npm start           # Запуск production-сервера
npm run lint        # ESLint проверка
npm run type-check  # TypeScript проверка
```

---

## 🔐 Безопасность

- JWT tokens are stored in httpOnly cookies (not accessible to JS).
- PIN коды хранятся как переменные окружения
- API endpoints rely on cookie auth; Authorization headers are optional for legacy clients.

---

## 📞 Поддержка

Для вопросов и обновлений смотрите:
- [QUICKSTART.md](./QUICKSTART.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [docs/](./docs/)

---

**Last Updated:** 2025-12-26
**Next.js Version:** 16.1.1
**Node Version:** 20+
