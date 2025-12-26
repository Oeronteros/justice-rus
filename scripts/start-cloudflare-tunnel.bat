@echo off
REM Скрипт для запуска Cloudflare Tunnel на Windows
REM Сохраните как start-cloudflare-tunnel.bat

echo Starting Cloudflare Tunnel for Discord Bot...
echo.

REM Проверка, что Discord бот запущен
curl -s http://localhost:3001/health >nul 2>&1
if errorlevel 1 (
    echo ERROR: Discord bot is not running on port 3001!
    echo Please start your Discord bot first.
    pause
    exit /b 1
)

REM Запуск туннеля
echo Starting tunnel...
cloudflared tunnel run justice-bot

if errorlevel 1 (
    echo.
    echo ERROR: Failed to start tunnel!
    echo Make sure you have:
    echo 1. Installed cloudflared
    echo 2. Run: cloudflared tunnel login
    echo 3. Run: cloudflared tunnel create justice-bot
    echo 4. Created config.yml file
    pause
    exit /b 1
)

pause

