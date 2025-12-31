# Интеграция Discord бота с БД для новостей

## Проблема

Discord бот работает локально, туннели (ngrok, localtunnel) недоступны.  
Прямая связь Discord Bot ↔ Portal невозможна.

## Решение

Использовать **PostgreSQL как промежуточное хранилище**:

```
Discord Bot → PostgreSQL ← Portal
```

- Discord бот записывает новости в БД при новых сообщениях в канале
- Портал читает новости из БД через `/api/news`

## Настройка БД

### 1. Создание таблицы

Таблица `news` уже создана в схеме:

```sql
CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    pinned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_news_date ON news(date);
CREATE INDEX IF NOT EXISTS idx_news_pinned ON news(pinned);
```

### 2. Применение схемы

Если таблица ещё не создана:

```bash
psql $DATABASE_URL < docs/schema-postgresql.sql
```

## Discord бот

### 1. Установка зависимостей

```bash
npm install pg
# или
npm install @vercel/postgres
```

### 2. Подключение к БД

**Вариант 1: pg (рекомендуется)**

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connected:', result.rows[0]);
  } catch (error) {
    console.error('❌ Database connection error:', error);
  }
}

testConnection();
```

**Вариант 2: @vercel/postgres**

```javascript
const { sql } = require('@vercel/postgres');

async function testConnection() {
  try {
    const result = await sql`SELECT NOW()`;
    console.log('✅ Database connected:', result.rows[0]);
  } catch (error) {
    console.error('❌ Database connection error:', error);
  }
}

testConnection();
```

### 3. Код для записи новостей

```javascript
const { Pool } = require('pg');
const { Client, GatewayIntentBits } = require('discord.js');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const NEWS_CHANNEL_ID = 'YOUR_NEWS_CHANNEL_ID';

client.on('messageCreate', async (message) => {
  // Игнорируем сообщения ботов
  if (message.author.bot) return;
  
  // Только из канала новостей
  if (message.channel.id !== NEWS_CHANNEL_ID) return;

  try {
    const title = extractTitle(message.content);
    const content = formatContent(message.content);
    const author = message.author.username;
    const pinned = message.pinned;

    await pool.query(
      'INSERT INTO news (title, content, author, pinned) VALUES ($1, $2, $3, $4)',
      [title, content, author, pinned]
    );

    console.log('✅ News saved:', title);
    await message.react('✅');
  } catch (error) {
    console.error('❌ Error saving news:', error);
    await message.react('❌');
  }
});

function extractTitle(content) {
  // Извлекаем первую строку как заголовок
  const firstLine = content.split('\n')[0];
  return firstLine.replace(/^#+\s*/, '').substring(0, 255);
}

function formatContent(content) {
  // Конвертируем markdown в HTML
  return content
    .replace(/^#+\s*(.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/~~(.+?)~~/g, '<del>$1</del>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>');
}

client.on('ready', () => {
  console.log(`✅ Discord bot logged in as ${client.user.tag}`);
});

client.on('messagePinToggle', async (message) => {
  if (message.channel.id !== NEWS_CHANNEL_ID) return;

  try {
    const title = extractTitle(message.content);
    await pool.query(
      'UPDATE news SET pinned = $1 WHERE title = $2',
      [message.pinned, title]
    );
    console.log(`📌 News pin toggled: ${title}`);
  } catch (error) {
    console.error('❌ Error updating pin:', error);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
```

### 4. Переменные окружения

Создайте `.env` для Discord бота:

```env
DISCORD_BOT_TOKEN=your_discord_bot_token
DATABASE_URL=postgresql://user:password@host:5432/database
```

## Формат сообщений в канале новостей

Рекомендуемый формат для публикации:

```markdown
# Заголовок новости

Основной текст новости. Можно использовать **жирный** и *курсив*.

- Список
- Пунктов

Дополнительная информация.
```

## Дополнительные возможности

### 1. Редактирование новостей

```javascript
client.on('messageUpdate', async (oldMessage, newMessage) => {
  if (newMessage.channel.id !== NEWS_CHANNEL_ID) return;
  if (newMessage.author.bot) return;

  try {
    const title = extractTitle(newMessage.content);
    const content = formatContent(newMessage.content);

    await pool.query(
      'UPDATE news SET content = $1 WHERE title = $2',
      [content, title]
    );

    console.log('✏️ News updated:', title);
  } catch (error) {
    console.error('❌ Error updating news:', error);
  }
});
```

### 2. Удаление новостей

```javascript
client.on('messageDelete', async (message) => {
  if (message.channel.id !== NEWS_CHANNEL_ID) return;

  try {
    const title = extractTitle(message.content);

    await pool.query(
      'DELETE FROM news WHERE title = $1',
      [title]
    );

    console.log('🗑️ News deleted:', title);
  } catch (error) {
    console.error('❌ Error deleting news:', error);
  }
});
```

### 3. Команда для проверки

```javascript
client.on('messageCreate', async (message) => {
  if (message.content === '!news-count') {
    const result = await pool.query('SELECT COUNT(*) FROM news');
    await message.reply(`📰 Всего новостей в БД: ${result.rows[0].count}`);
  }

  if (message.content === '!news-sync') {
    // Синхронизировать все сообщения из канала
    const channel = await client.channels.fetch(NEWS_CHANNEL_ID);
    const messages = await channel.messages.fetch({ limit: 50 });

    let synced = 0;
    for (const msg of messages.values()) {
      if (msg.author.bot) continue;

      const title = extractTitle(msg.content);
      const content = formatContent(msg.content);
      const author = msg.author.username;
      const pinned = msg.pinned;

      await pool.query(
        'INSERT INTO news (title, content, author, pinned) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING',
        [title, content, author, pinned]
      );
      synced++;
    }

    await message.reply(`✅ Синхронизировано новостей: ${synced}`);
  }
});
```

## Проверка работы

### 1. Запуск Discord бота

```bash
node bot.js
```

### 2. Публикация новости в Discord

Напишите сообщение в канале новостей:

```
# Тестовая новость

Это тестовая новость для проверки интеграции.
```

### 3. Проверка в БД

```bash
psql $DATABASE_URL -c "SELECT * FROM news ORDER BY created_at DESC LIMIT 1;"
```

### 4. Проверка на портале

1. Войдите в портал
2. Откройте раздел "Новости"
3. Новость должна отобразиться

## Troubleshooting

### Бот не подключается к БД

**Проблема:** `Error: connect ECONNREFUSED`

**Решение:**
- Проверьте DATABASE_URL
- Убедитесь, что БД доступна извне (если используете Neon/Vercel Postgres - должна быть)
- Проверьте SSL настройки

### Новости не сохраняются

**Проблема:** Новости не появляются в БД

**Решение:**
- Проверьте логи бота
- Убедитесь, что NEWS_CHANNEL_ID правильный
- Проверьте права бота (Read Messages, Read Message History)

### Дублирование новостей

**Проблема:** Новости добавляются несколько раз

**Решение:**
Добавьте уникальный constraint:

```sql
ALTER TABLE news ADD CONSTRAINT news_title_unique UNIQUE (title);
```

Или используйте `ON CONFLICT DO NOTHING` при INSERT.

## Альтернативный вариант: Webhook

Если Discord бот сложно настроить, можно использовать webhook:

1. В Discord канале создайте webhook
2. Получите webhook URL
3. В портале создайте страницу для публикации новостей
4. При публикации отправляйте сообщение в Discord через webhook

Но этот вариант требует доступа к порталу для создания новостей.
