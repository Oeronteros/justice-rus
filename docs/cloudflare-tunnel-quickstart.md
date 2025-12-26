# Быстрый старт: Cloudflare Tunnel

## За 5 минут

### 1. Установите cloudflared

**Windows:**
```powershell
choco install cloudflared
# или скачайте с https://github.com/cloudflare/cloudflared/releases
```

**macOS:**
```bash
brew install cloudflared
```

**Linux:**
```bash
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
chmod +x cloudflared-linux-amd64
sudo mv cloudflared-linux-amd64 /usr/local/bin/cloudflared
```

### 2. Авторизуйтесь

```bash
cloudflared tunnel login
```

Откроется браузер - войдите в Cloudflare (можно создать бесплатный аккаунт).

### 3. Создайте туннель

```bash
cloudflared tunnel create justice-bot
```

### 4. Запустите Discord бот

Убедитесь, что ваш Discord бот запущен на порту 3001.

### 5. Запустите туннель (простой способ)

```bash
cloudflared tunnel --url http://localhost:3001
```

Скопируйте URL (например: `https://abc123.trycloudflare.com`)

### 6. Настройте Vercel

1. Vercel Dashboard → Ваш проект → Settings → Environment Variables
2. Добавьте: `DISCORD_BOT_API_URL=https://abc123.trycloudflare.com`
3. Передеплойте

### 7. Готово! ✅

## Для постоянного URL (опционально)

Если хотите стабильный URL, используйте свой домен:

1. Добавьте домен в Cloudflare (бесплатно)
2. Создайте конфиг `~/.cloudflared/config.yml`:
```yaml
tunnel: YOUR_TUNNEL_ID
credentials-file: ~/.cloudflared/YOUR_TUNNEL_ID.json

ingress:
  - hostname: justice-bot.yourdomain.com
    service: http://localhost:3001
  - service: http_status:404
```

3. В DNS Cloudflare добавьте CNAME:
   - Name: `justice-bot`
   - Target: `YOUR_TUNNEL_ID.cfargotunnel.com`
   - Proxy: Включен

4. Запустите:
```bash
cloudflared tunnel run justice-bot
```

5. Используйте `https://justice-bot.yourdomain.com` в Vercel

Подробнее: `docs/cloudflare-tunnel-setup.md`

