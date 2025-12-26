-- PostgreSQL Schema для Justice Mobile Guild Portal
-- Запустите этот файл для создания всех необходимых таблиц

-- Таблица регистраций (было: members)
CREATE TABLE IF NOT EXISTS registrations (
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
CREATE TABLE IF NOT EXISTS schedule (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    registration VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица новостей
CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    pinned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица гайдов
CREATE TABLE IF NOT EXISTS guides (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100),
    author VARCHAR(255) NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица отсутствий
CREATE TABLE IF NOT EXISTS absences (
    id SERIAL PRIMARY KEY,
    member VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для производительности
CREATE INDEX IF NOT EXISTS idx_registrations_status ON registrations(status);
CREATE INDEX IF NOT EXISTS idx_registrations_rank ON registrations(rank);
CREATE INDEX IF NOT EXISTS idx_registrations_discord_id ON registrations(discord_id);
CREATE INDEX IF NOT EXISTS idx_schedule_date ON schedule(date);
CREATE INDEX IF NOT EXISTS idx_schedule_registration ON schedule(registration);
CREATE INDEX IF NOT EXISTS idx_news_date ON news(date);
CREATE INDEX IF NOT EXISTS idx_news_pinned ON news(pinned);
CREATE INDEX IF NOT EXISTS idx_guides_category ON guides(category);
CREATE INDEX IF NOT EXISTS idx_absences_status ON absences(status);
CREATE INDEX IF NOT EXISTS idx_absences_member ON absences(member);

-- Комментарии к таблицам
COMMENT ON TABLE registrations IS 'Регистрации участников гильдии';
COMMENT ON TABLE schedule IS 'Расписание событий';
COMMENT ON TABLE news IS 'Новости гильдии';
COMMENT ON TABLE guides IS 'Гайды и инструкции';
COMMENT ON TABLE absences IS 'Отсутствия участников';

