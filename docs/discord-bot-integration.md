# Интеграция с Discord ботом

## Архитектура

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Website   │ ──────> │ Discord Bot  │ ──────> │     DB     │
│  (Next.js)  │ <────── │   (API)      │ <──────  │            │
└─────────────┘         └──────────────┘         └─────────────┘
```

Веб-сайт получает данные через Discord бота, а не напрямую из базы данных.

## Настройка

### 1. Переменные окружения

В `.env.local` добавьте:

```env
# URL Discord бота API
DISCORD_BOT_API_URL=http://localhost:3001

# Для продакшена используйте реальный URL бота
# DISCORD_BOT_API_URL=https://your-bot-api.example.com
```

### 2. Discord бот должен предоставлять API endpoints

Ваш Discord бот должен иметь HTTP сервер с следующими endpoints:

#### GET `/api/registrations`
Возвращает список регистраций:
```json
[
  {
    "discord": "user#1234",
    "nickname": "PlayerName",
    "rank": "member",
    "class": "Warrior",
    "guild": "Justice",
    "joinDate": "2024-01-15",
    "kpi": 85,
    "status": "active"
  }
]
```

#### GET `/api/schedule`
Возвращает расписание:
```json
[
  {
    "date": "2024-01-20",
    "registration": "user#1234",
    "type": "Raid",
    "description": "Weekly raid event"
  }
]
```

#### GET `/api/news`
Возвращает новости:
```json
[
  {
    "id": "1",
    "title": "New Update",
    "content": "Content here",
    "author": "Admin",
    "date": "2024-01-20",
    "pinned": false
  }
]
```

#### GET `/api/guides`
Возвращает гайды:
```json
[
  {
    "id": "1",
    "title": "Guide Title",
    "content": "Content here",
    "category": "PvP",
    "author": "Author",
    "date": "2024-01-20"
  }
]
```

#### GET `/api/absences`
Возвращает отсутствия:
```json
[
  {
    "id": "1",
    "member": "user#1234",
    "startDate": "2024-01-25",
    "endDate": "2024-01-30",
    "reason": "Vacation",
    "status": "approved"
  }
]
```

### 3. Аутентификация (опционально)

Если ваш Discord бот требует аутентификацию, токен будет передаваться через заголовок `Authorization: Bearer <token>`.

## Пример реализации Discord бота (Node.js)

```javascript
// discord-bot/server.js
const express = require('express');
const app = express();
app.use(express.json());

// Подключение к БД (пример с PostgreSQL)
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Middleware для CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// GET /api/registrations
app.get('/api/registrations', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        discord_id as discord,
        nickname,
        rank,
        class,
        guild,
        join_date as "joinDate",
        kpi,
        status
      FROM registrations
      ORDER BY join_date DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/schedule
app.get('/api/schedule', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        date,
        registration,
        type,
        description
      FROM schedule
      ORDER BY date DESC
      LIMIT 100
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Аналогично для других endpoints...

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Discord Bot API server running on port ${PORT}`);
});
```

## Пример реализации Discord бота (Python)

```python
# discord-bot/api.py
from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2
import os

app = Flask(__name__)
CORS(app)

# Подключение к БД
conn = psycopg2.connect(os.getenv('DATABASE_URL'))

@app.route('/api/registrations', methods=['GET'])
def get_registrations():
    cur = conn.cursor()
    cur.execute("""
        SELECT 
            discord_id as discord,
            nickname,
            rank,
            class,
            guild,
            join_date as "joinDate",
            kpi,
            status
        FROM registrations
        ORDER BY join_date DESC
    """)
    rows = cur.fetchall()
    cur.close()
    
    registrations = []
    for row in rows:
        registrations.append({
            'discord': row[0],
            'nickname': row[1],
            'rank': row[2],
            'class': row[3],
            'guild': row[4],
            'joinDate': str(row[5]),
            'kpi': row[6],
            'status': row[7]
        })
    
    return jsonify(registrations)

# Аналогично для других endpoints...

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001)
```

## Проверка подключения

1. Убедитесь, что Discord бот запущен и доступен по адресу `DISCORD_BOT_API_URL`
2. Проверьте endpoints вручную:
```bash
curl http://localhost:3001/api/registrations
```
3. Запустите веб-сайт:
```bash
npm run dev
```
4. Откройте браузер и проверьте работу

## Troubleshooting

**Ошибка: "Failed to connect to Discord bot"**
- Убедитесь, что Discord бот запущен
- Проверьте `DISCORD_BOT_API_URL` в `.env.local`
- Проверьте, что бот слушает правильный порт

**Ошибка: "CORS policy"**
- Убедитесь, что Discord бот настроен для CORS
- Проверьте заголовки ответа от бота

**Пустой ответ**
- Проверьте логи Discord бота
- Убедитесь, что бот подключен к БД
- Проверьте структуру данных, возвращаемых ботом

