# Миграция с Google Sheets на базу данных Discord бота

## Что было сделано

✅ **Создана библиотека для работы с БД** (`lib/db/index.ts`)
- Поддержка PostgreSQL, MongoDB, SQLite
- Автоматическое определение типа БД из переменных окружения
- Единый интерфейс для всех типов БД

✅ **Созданы новые API endpoints:**
- `/api/members` - получение участников из БД
- `/api/activity` - получение активности из БД
- `/api/news` - получение новостей из БД
- `/api/guides` - получение гайдов из БД
- `/api/absences` - получение отсутствий из БД

✅ **Обновлен API клиент** (`lib/api.ts`)
- Убрана зависимость от Google Sheets
- Использует новые endpoints БД

✅ **Удален старый endpoint** `/api/google-proxy`

## Быстрый старт

### 1. Установите зависимости для БД

Выберите один вариант:

**PostgreSQL:**
```bash
npm install pg
npm install --save-dev @types/pg
```

**MongoDB:**
```bash
npm install mongodb
```

**SQLite:**
```bash
npm install better-sqlite3
npm install --save-dev @types/better-sqlite3
```

### 2. Настройте переменные окружения

Создайте `.env.local` и добавьте:

**Для PostgreSQL:**
```env
DB_TYPE=postgresql
DATABASE_URL=postgresql://username:password@localhost:5432/justice_db
```

**Для MongoDB:**
```env
DB_TYPE=mongodb
MONGODB_URI=mongodb://localhost:27017/justice_db
```

**Для SQLite:**
```env
DB_TYPE=sqlite
DB_PATH=./database.db
```

### 3. Создайте таблицы в БД

**PostgreSQL:**
```bash
psql justice_db < docs/schema-postgresql.sql
```

**SQLite:**
```bash
sqlite3 database.db < docs/schema-sqlite.sql
```

**MongoDB:** Коллекции создадутся автоматически при первом использовании

### 4. Проверьте подключение

```bash
npm run dev
```

Откройте браузер и перейдите на `/api/members`. Если все настроено правильно, вы увидите данные из БД.

## Интеграция с существующим Discord ботом

Если ваш Discord бот уже использует БД:

1. **Проверьте структуру таблиц** - убедитесь, что она соответствует схеме в `docs/database-schema.md`
2. **Проверьте названия полей** - они должны совпадать с ожидаемыми (см. маппинг в `docs/database-schema.md`)
3. **Настройте подключение** - используйте те же параметры подключения, что и в боте

### Примеры для популярных библиотек:

**discord.js + PostgreSQL:**
```javascript
// Используйте те же таблицы, что созданы для портала
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
```

**discord.py + PostgreSQL:**
```python
import asyncpg
pool = await asyncpg.create_pool(
    dsn=os.getenv('DATABASE_URL')
)
```

## Структура данных

Все таблицы/коллекции должны иметь следующие поля:

- **members**: discord_id, nickname, rank, class, guild, join_date, kpi, status
- **activity**: date, member, type, description
- **news**: title, content, author, date, pinned
- **guides**: title, content, category, author, date
- **absences**: member, start_date, end_date, reason, status

Подробнее см. `docs/database-schema.md`

## Troubleshooting

**Ошибка: "Database driver not installed"**
- Установите соответствующий драйвер: `npm install pg` или `npm install mongodb` или `npm install better-sqlite3`

**Ошибка подключения к БД**
- Проверьте переменные окружения в `.env.local`
- Убедитесь, что БД запущена и доступна
- Проверьте права доступа пользователя БД

**Пустой ответ от API**
- Убедитесь, что таблицы созданы и содержат данные
- Проверьте названия полей в БД (должны совпадать со схемой)
- Проверьте логи сервера на наличие ошибок

