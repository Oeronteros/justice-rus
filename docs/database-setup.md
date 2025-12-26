# Настройка базы данных

## PostgreSQL

1. Установите PostgreSQL:
```bash
# Ubuntu/Debian
sudo apt-get install postgresql

# macOS
brew install postgresql

# Windows
# Скачайте с https://www.postgresql.org/download/windows/
```

2. Создайте базу данных:
```bash
createdb justice_db
psql justice_db < docs/schema-postgresql.sql
```

3. Настройте переменные окружения в `.env.local`:
```env
DB_TYPE=postgresql
DATABASE_URL=postgresql://username:password@localhost:5432/justice_db
```

## MongoDB

1. Установите MongoDB:
```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# macOS
brew install mongodb-community

# Windows
# Скачайте с https://www.mongodb.com/try/download/community
```

2. Запустите MongoDB:
```bash
mongod
```

3. Создайте коллекции (опционально, они создадутся автоматически):
```bash
mongo
use justice_db
```

4. Настройте переменные окружения в `.env.local`:
```env
DB_TYPE=mongodb
MONGODB_URI=mongodb://localhost:27017/justice_db
```

## SQLite

1. SQLite уже включен в Node.js, дополнительная установка не требуется

2. Создайте базу данных:
```bash
sqlite3 database.db < docs/schema-sqlite.sql
```

3. Настройте переменные окружения в `.env.local`:
```env
DB_TYPE=sqlite
DB_PATH=./database.db
```

## Интеграция с Discord ботом

Если ваш Discord бот уже использует базу данных, убедитесь что:

1. **Таблицы/коллекции существуют** с правильной структурой
2. **Поля соответствуют** ожидаемым именам (см. `docs/database-schema.md`)
3. **Подключение настроено** через переменные окружения

### Пример для популярных библиотек Discord ботов:

#### discord.js + PostgreSQL (pg)
```javascript
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Используйте те же таблицы, что и в портале
```

#### discord.py + PostgreSQL (asyncpg)
```python
import asyncpg

pool = await asyncpg.create_pool(
    host='localhost',
    port=5432,
    user='username',
    password='password',
    database='justice_db'
)
```

#### discord.js + MongoDB (mongoose)
```javascript
const mongoose = require('mongoose');
await mongoose.connect(process.env.MONGODB_URI);

// Используйте те же схемы коллекций
```

## Проверка подключения

После настройки проверьте подключение:

```bash
npm run dev
```

Откройте браузер и перейдите на `/api/members`. Если все настроено правильно, вы увидите список участников из БД.

