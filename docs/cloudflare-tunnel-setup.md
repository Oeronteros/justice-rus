# Настройка Cloudflare Tunnel для локального Discord бота

## Преимущества Cloudflare Tunnel

✅ **Полностью бесплатно**  
✅ **Стабильный URL** (можно использовать свой домен)  
✅ **Быстро и надежно**  
✅ **HTTPS из коробки**  
✅ **Не требует открытия портов**

## Шаг 1: Установка cloudflared

### Windows

1. Скачайте с https://github.com/cloudflare/cloudflared/releases/latest
2. Выберите `cloudflared-windows-amd64.exe`
3. Переименуйте в `cloudflared.exe`
4. Поместите в папку (например, `C:\cloudflared`)
5. Добавьте в PATH или используйте полный путь

**Или через Chocolatey:**
```powershell
choco install cloudflared
```

### macOS

```bash
brew install cloudflared
```

### Linux

```bash
# Ubuntu/Debian
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb

# Или бинарник
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
chmod +x cloudflared-linux-amd64
sudo mv cloudflared-linux-amd64 /usr/local/bin/cloudflared
```

## Шаг 2: Авторизация в Cloudflare

```bash
cloudflared tunnel login
```

Откроется браузер, войдите в Cloudflare аккаунт (можно создать бесплатный) и авторизуйте приложение.

## Шаг 3: Создание туннеля

```bash
cloudflared tunnel create justice-bot
```

Вы увидите что-то вроде:
```
Created tunnel justice-bot with id abc123...
```

**Сохраните ID туннеля!**

## Шаг 4: Настройка конфигурации

Создайте файл конфигурации. На Windows это будет:
```
C:\Users\YourUsername\.cloudflared\config.yml
```

На macOS/Linux:
```
~/.cloudflared/config.yml
```

**Содержимое файла:**

```yaml
tunnel: abc123-def456-ghi789  # Замените на ваш tunnel ID
credentials-file: C:\Users\YourUsername\.cloudflared\abc123-def456-ghi789.json  # Полный путь к credentials файлу

ingress:
  # Правило для вашего Discord бота API
  - hostname: justice-bot.yourdomain.com  # Используйте свой домен ИЛИ *.trycloudflare.com
    service: http://localhost:3001
  
  # Правило по умолчанию (404 для всех остальных запросов)
  - service: http_status:404
```

### Вариант A: Использование бесплатного домена Cloudflare

Если у вас нет своего домена, используйте `*.trycloudflare.com`:

```yaml
tunnel: abc123-def456-ghi789
credentials-file: C:\Users\YourUsername\.cloudflared\abc123-def456-ghi789.json

ingress:
  - service: http://localhost:3001
```

При запуске вы получите случайный URL типа `https://random-name.trycloudflare.com`

### Вариант B: Использование своего домена

1. Добавьте домен в Cloudflare (бесплатно)
2. В DNS настройте CNAME запись:
   - **Type:** CNAME
   - **Name:** `justice-bot` (или любое имя)
   - **Target:** `abc123-def456-ghi789.cfargotunnel.com` (ваш tunnel ID + .cfargotunnel.com)
   - **Proxy:** Включен (оранжевое облачко)

3. Используйте в конфиге:
```yaml
ingress:
  - hostname: justice-bot.yourdomain.com
    service: http://localhost:3001
```

## Шаг 5: Запуск туннеля

### Вариант 1: Одноразовый запуск (для теста)

```bash
cloudflared tunnel --url http://localhost:3001
```

Вы получите URL типа `https://random-name.trycloudflare.com` - используйте его в Vercel.

### Вариант 2: Постоянный запуск через конфиг

```bash
cloudflared tunnel run justice-bot
```

Если используете свой домен, URL будет стабильным: `https://justice-bot.yourdomain.com`

## Шаг 6: Настройка автозапуска (Windows)

### Через Task Scheduler

1. Откройте **Task Scheduler** (Планировщик заданий)
2. **Create Basic Task**
3. **Name:** Cloudflare Tunnel
4. **Trigger:** When the computer starts
5. **Action:** Start a program
6. **Program:** `C:\cloudflared\cloudflared.exe` (или полный путь)
7. **Arguments:** `tunnel run justice-bot`
8. **Start in:** `C:\cloudflared` (или ваша папка)
9. Сохраните

### Через NSSM (более надежно)

1. Скачайте NSSM: https://nssm.cc/download
2. Распакуйте и запустите:
```cmd
nssm install CloudflareTunnel
```

3. В окне NSSM:
   - **Path:** `C:\cloudflared\cloudflared.exe`
   - **Startup directory:** `C:\cloudflared`
   - **Arguments:** `tunnel run justice-bot`
   - **Service name:** `CloudflareTunnel`

4. **Install service** → **Start service**

## Шаг 7: Настройка автозапуска (macOS/Linux)

### Через systemd (Linux)

Создайте файл `/etc/systemd/system/cloudflared.service`:

```ini
[Unit]
Description=Cloudflare Tunnel
After=network.target

[Service]
Type=simple
User=your-username
ExecStart=/usr/local/bin/cloudflared tunnel run justice-bot
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

Затем:
```bash
sudo systemctl daemon-reload
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
sudo systemctl status cloudflared
```

### Через launchd (macOS)

Создайте файл `~/Library/LaunchAgents/com.cloudflare.tunnel.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.cloudflare.tunnel</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/cloudflared</string>
        <string>tunnel</string>
        <string>run</string>
        <string>justice-bot</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
</dict>
</plist>
```

Затем:
```bash
launchctl load ~/Library/LaunchAgents/com.cloudflare.tunnel.plist
launchctl start com.cloudflare.tunnel
```

## Шаг 8: Настройка Vercel

1. Зайдите в **Vercel Dashboard**
2. Выберите ваш проект
3. **Settings** → **Environment Variables**
4. Добавьте:
   - **Key:** `DISCORD_BOT_API_URL`
   - **Value:** Ваш Cloudflare Tunnel URL
     - Если используете `*.trycloudflare.com`: `https://random-name.trycloudflare.com`
     - Если используете свой домен: `https://justice-bot.yourdomain.com`
5. **Save** и **Redeploy** проект

## Шаг 9: Проверка

### Проверьте локальный бот:
```bash
curl http://localhost:3001/api/registrations
```

### Проверьте через туннель:
```bash
curl https://your-tunnel-url.trycloudflare.com/api/registrations
# или
curl https://justice-bot.yourdomain.com/api/registrations
```

Должен вернуться JSON с данными.

## Управление туннелем

### Просмотр всех туннелей:
```bash
cloudflared tunnel list
```

### Просмотр информации о туннеле:
```bash
cloudflared tunnel info justice-bot
```

### Остановка туннеля:
```bash
# Если запущен вручную - Ctrl+C
# Если через systemd:
sudo systemctl stop cloudflared
```

### Удаление туннеля:
```bash
cloudflared tunnel delete justice-bot
```

## Troubleshooting

### Туннель не запускается

1. Проверьте, что Discord бот запущен на порту 3001:
```bash
curl http://localhost:3001/health
```

2. Проверьте конфиг:
```bash
cloudflared tunnel validate
```

3. Проверьте логи:
```bash
# Windows
type C:\Users\YourUsername\.cloudflared\*.log

# macOS/Linux
tail -f ~/.cloudflared/*.log
```

### Ошибка "tunnel not found"

Убедитесь, что используете правильный tunnel ID в конфиге.

### Ошибка подключения из Vercel

1. Проверьте, что туннель запущен
2. Проверьте URL в Vercel Environment Variables
3. Убедитесь, что Discord бот отвечает на `/api/registrations`

## Полезные команды

```bash
# Проверка статуса
cloudflared tunnel info justice-bot

# Просмотр логов в реальном времени
cloudflared tunnel run justice-bot --loglevel debug

# Обновление cloudflared
cloudflared update
```

## Готово! ✅

Теперь ваш локальный Discord бот доступен из интернета через Cloudflare Tunnel, и Vercel может к нему подключаться!

