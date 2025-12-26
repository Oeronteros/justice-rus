# Быстрый старт: Vercel + Локальный Discord бот

## Проблема
Сайт на Vercel не может подключиться к `localhost:3001` где работает ваш Discord бот.

## Решение 1: Cloudflare Tunnel (Рекомендуется) ⭐

✅ Бесплатно  
✅ Стабильный URL  
✅ Быстро

См. `docs/cloudflare-tunnel-quickstart.md` для быстрого старта или `docs/cloudflare-tunnel-setup.md` для подробной настройки.

## Решение 2: ngrok (Альтернатива)

### 1. Установите ngrok
```bash
# Windows: скачайте с https://ngrok.com/download
# macOS:
brew install ngrok

# Linux:
wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz
tar -xzf ngrok-v3-stable-linux-amd64.tgz
sudo mv ngrok /usr/local/bin
```

### 2. Зарегистрируйтесь и получите токен
1. Зайдите на https://dashboard.ngrok.com/signup
2. Скопируйте ваш Authtoken

### 3. Настройте ngrok
```bash
ngrok config add-authtoken YOUR_AUTH_TOKEN
```

### 4. Запустите Discord бот
```bash
# В папке с ботом
node server.js
# Должен слушать порт 3001
```

### 5. Запустите ngrok (в новом терминале)
```bash
ngrok http 3001
```

Скопируйте HTTPS URL (например: `https://abc123.ngrok-free.app`)

### 6. Настройте Vercel
1. Vercel Dashboard → Ваш проект → Settings → Environment Variables
2. Добавьте:
   - **Key:** `DISCORD_BOT_API_URL`
   - **Value:** `https://abc123.ngrok-free.app` (ваш ngrok URL)
3. Передеплойте проект

### 7. Готово! ✅

## Важно!

⚠️ **URL меняется:** При каждом перезапуске ngrok URL меняется. Нужно обновить переменную в Vercel.

⚠️ **Для постоянного URL:** Используйте Cloudflare Tunnel или задеплойте бота на Railway/Render (см. `docs/deployment-solutions.md`)

## Альтернативы

- **Cloudflare Tunnel** - бесплатно, стабильный URL (`docs/deployment-solutions.md`)
- **Railway** - задеплойте бота в облако, бесплатный план (`docs/deployment-solutions.md`)
- **Render** - задеплойте бота в облако, бесплатный план (`docs/deployment-solutions.md`)

Подробнее: `docs/deployment-solutions.md`

