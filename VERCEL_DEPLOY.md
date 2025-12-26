# Инструкция по деплою на Vercel

## Проверка перед деплоем

1. **Убедитесь, что проект собирается локально:**
   ```bash
   npm run build
   ```

2. **Проверьте структуру проекта:**
   - `app/page.tsx` должен существовать
   - `app/layout.tsx` должен существовать
   - Все компоненты должны быть в `components/`

## Настройка в Vercel Dashboard

1. **Подключите репозиторий** к Vercel
2. **Настройки проекта:**
   - **Framework Preset:** Next.js
   - **Root Directory:** `./` (корень проекта)
   - **Build Command:** `npm run build` (по умолчанию)
   - **Output Directory:** `.next` (по умолчанию)
   - **Install Command:** `npm install` (по умолчанию)

3. **Environment Variables:**
   Добавьте следующие переменные окружения:
   ```
   MEMBER_PIN=1111
   OFFICER_PIN=2222
   GM_PIN=3333
   JWT_SECRET=your-secret-key-change-in-production
   DISCORD_BOT_API_URL=https://your-cloudflare-tunnel-url.trycloudflare.com
   ```

## Возможные проблемы и решения

### 404 ошибка после деплоя

1. **Проверьте логи сборки:**
   - Зайдите в Vercel Dashboard → Ваш проект → Deployments
   - Откройте последний деплой и проверьте логи сборки
   - Убедитесь, что сборка прошла успешно

2. **Проверьте структуру файлов:**
   - Убедитесь, что `app/page.tsx` существует
   - Убедитесь, что `app/layout.tsx` существует
   - Проверьте, что нет синтаксических ошибок

3. **Проверьте TypeScript:**
   ```bash
   npm run type-check
   ```

4. **Проверьте линтер:**
   ```bash
   npm run lint
   ```

### Проблемы с переменными окружения

- Убедитесь, что все переменные окружения добавлены в Vercel Dashboard
- После добавления переменных передеплойте проект

### Проблемы с зависимостями

- Убедитесь, что все зависимости указаны в `package.json`
- Проверьте, что нет конфликтов версий

## После успешного деплоя

1. Проверьте, что сайт открывается
2. Проверьте, что API routes работают (`/api/auth`, `/api/verify-auth`)
3. Проверьте подключение к Discord боту через Cloudflare Tunnel

## Полезные команды

```bash
# Локальная сборка
npm run build

# Локальный запуск production версии
npm run build
npm start

# Проверка типов
npm run type-check

# Линтинг
npm run lint
```

