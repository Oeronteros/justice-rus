# Быстрая настройка ngrok для локального Discord бота

## Шаг 1: Установка ngrok

### Windows
1. Скачайте с https://ngrok.com/download
2. Распакуйте в папку (например, `C:\ngrok`)
3. Добавьте в PATH или используйте полный путь

### macOS
```bash
brew install ngrok
```

### Linux
```bash
wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz
tar -xzf ngrok-v3-stable-linux-amd64.tgz
sudo mv ngrok /usr/local/bin
```

## Шаг 2: Регистрация и получение токена

1. Зайдите на https://dashboard.ngrok.com/signup
2. Зарегистрируйтесь (можно через GitHub)
3. Скопируйте ваш Authtoken из Dashboard

## Шаг 3: Настройка ngrok

```bash
ngrok config add-authtoken YOUR_AUTH_TOKEN_HERE
```

## Шаг 4: Запуск Discord бота

Убедитесь, что ваш Discord бот запущен и слушает порт 3001:

```bash
# В папке с Discord ботом
node server.js
# или
npm start
```

## Шаг 5: Запуск ngrok туннеля

В **новом терминале**:

```bash
ngrok http 3001
```

Вы увидите что-то вроде:
```
Forwarding  https://abc123.ngrok-free.app -> http://localhost:3001
```

**Скопируйте HTTPS URL** (например: `https://abc123.ngrok-free.app`)

## Шаг 6: Настройка Vercel

1. Зайдите в Vercel Dashboard
2. Выберите ваш проект
3. Settings → Environment Variables
4. Добавьте новую переменную:
   - **Key:** `DISCORD_BOT_API_URL`
   - **Value:** `https://abc123.ngrok-free.app` (ваш ngrok URL)
5. Сохраните и передеплойте проект

## Шаг 7: Проверка

Проверьте, что все работает:

```bash
# Проверьте локальный бот
curl http://localhost:3001/api/registrations

# Проверьте через ngrok
curl https://abc123.ngrok-free.app/api/registrations
```

## Важно!

⚠️ **URL меняется:** На бесплатном плане ngrok URL меняется при каждом перезапуске. Вам нужно будет:
1. Запустить ngrok заново
2. Скопировать новый URL
3. Обновить переменную в Vercel
4. Передеплоить проект

⚠️ **Для постоянного URL:** Используйте ngrok с фиксированным доменом (платно) или задеплойте бота на сервер.

## Автоматизация (опционально)

Можно создать скрипт для автоматического обновления:

```bash
# update-ngrok.sh
#!/bin/bash
NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | jq -r '.tunnels[0].public_url')
echo "Ngrok URL: $NGROK_URL"
# Здесь можно автоматически обновить Vercel через API
```

## Альтернатива: Cloudflare Tunnel

Если ngrok не подходит, используйте Cloudflare Tunnel (бесплатно, стабильный URL):

```bash
# Установка
brew install cloudflared  # macOS
# или скачайте с https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/

# Авторизация
cloudflared tunnel login

# Создание туннеля
cloudflared tunnel create justice-bot

# Запуск
cloudflared tunnel --url http://localhost:3001
```

