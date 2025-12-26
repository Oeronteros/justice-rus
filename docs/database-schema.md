# Структура базы данных

## PostgreSQL

```sql
-- Таблица участников
CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    discord_id VARCHAR(255) UNIQUE NOT NULL,
    nickname VARCHAR(255) NOT NULL,
    rank VARCHAR(50) NOT NULL DEFAULT 'novice',
    class VARCHAR(100),
    guild VARCHAR(255),
    join_date DATE NOT NULL DEFAULT CURRENT_DATE,
    kpi INTEGER DEFAULT 0,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица расписания (было: activity)
CREATE TABLE schedule (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    registration VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица новостей
CREATE TABLE news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    pinned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица гайдов
CREATE TABLE guides (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100),
    author VARCHAR(255) NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица отсутствий
CREATE TABLE absences (
    id SERIAL PRIMARY KEY,
    member VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для производительности
CREATE INDEX idx_members_status ON members(status);
CREATE INDEX idx_members_rank ON members(rank);
CREATE INDEX idx_activity_date ON activity(date);
CREATE INDEX idx_news_date ON news(date);
CREATE INDEX idx_absences_status ON absences(status);
```

## MongoDB

```javascript
// Коллекция registrations (было: members)
db.registrations.createIndex({ discordId: 1 }, { unique: true });
db.registrations.createIndex({ status: 1 });
db.registrations.createIndex({ rank: 1 });

// Коллекция schedule (было: activity)
db.schedule.createIndex({ date: -1 });
db.schedule.createIndex({ registration: 1 });

// Коллекция news
db.news.createIndex({ date: -1 });
db.news.createIndex({ pinned: -1, date: -1 });

// Коллекция guides
db.guides.createIndex({ date: -1 });
db.guides.createIndex({ category: 1 });

// Коллекция absences
db.absences.createIndex({ startDate: -1 });
db.absences.createIndex({ status: 1 });
```

## SQLite

```sql
-- Таблица участников
CREATE TABLE members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    discord_id TEXT UNIQUE NOT NULL,
    nickname TEXT NOT NULL,
    rank TEXT NOT NULL DEFAULT 'novice',
    class TEXT,
    guild TEXT,
    join_date DATE NOT NULL DEFAULT CURRENT_DATE,
    kpi INTEGER DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица расписания (было: activity)
CREATE TABLE schedule (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    registration TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица новостей
CREATE TABLE news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    pinned INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица гайдов
CREATE TABLE guides (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT,
    author TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица отсутствий
CREATE TABLE absences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    member TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы
CREATE INDEX idx_registrations_status ON registrations(status);
CREATE INDEX idx_registrations_rank ON registrations(rank);
CREATE INDEX idx_schedule_date ON schedule(date);
CREATE INDEX idx_news_date ON news(date);
CREATE INDEX idx_absences_status ON absences(status);
```

## Маппинг полей

### Registrations (было: Members)
- `discord_id` / `discordId` → `discord`
- `nickname` → `nickname`
- `rank` → `rank` (novice, member, veteran, elite, legend, gm)
- `class` → `class`
- `guild` → `guild`
- `join_date` / `joinDate` → `joinDate`
- `kpi` → `kpi`
- `status` → `status` (active, inactive, pending, leave)

### Schedule (было: Activity)
- `date` → `date`
- `registration` → `registration` (было: member)
- `type` → `type`
- `description` → `description`

### News
- `id` / `_id` → `id`
- `title` → `title`
- `content` → `content`
- `author` → `author`
- `date` → `date`
- `pinned` → `pinned`

### Guides
- `id` / `_id` → `id`
- `title` → `title`
- `content` → `content`
- `category` → `category`
- `author` → `author`
- `date` → `date`

### Absences
- `id` / `_id` → `id`
- `member` → `member`
- `start_date` / `startDate` → `startDate`
- `end_date` / `endDate` → `endDate`
- `reason` → `reason`
- `status` → `status` (pending, approved, rejected)

