#!/bin/bash
# Скрипт для запуска Cloudflare Tunnel на macOS/Linux
# Сохраните как start-cloudflare-tunnel.sh
# Сделайте исполняемым: chmod +x start-cloudflare-tunnel.sh

echo "Starting Cloudflare Tunnel for Discord Bot..."
echo ""

# Проверка, что Discord бот запущен
if ! curl -s http://localhost:3001/health > /dev/null 2>&1; then
    echo "ERROR: Discord bot is not running on port 3001!"
    echo "Please start your Discord bot first."
    exit 1
fi

# Запуск туннеля
echo "Starting tunnel..."
cloudflared tunnel run justice-bot

if [ $? -ne 0 ]; then
    echo ""
    echo "ERROR: Failed to start tunnel!"
    echo "Make sure you have:"
    echo "1. Installed cloudflared"
    echo "2. Run: cloudflared tunnel login"
    echo "3. Run: cloudflared tunnel create justice-bot"
    echo "4. Created config.yml file"
    exit 1
fi

