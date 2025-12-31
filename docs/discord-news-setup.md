# Настройка новостей из Discord

## Обзор

Портал настроен для получения новостей через Discord прокси API. Новости должны автоматически загружаться из указанного канала Discord сервера.

## Архитектура

```
Discord Bot → News Channel → Bot API → Portal Proxy → NewsSection
```

## Требования к Discord боту

### 1. API Endpoint

Бот должен предоставлять endpoint `GET /news`:

**URL:** `http://YOUR_BOT_URL/news`

**Response:**
```json
[
  {
    "id": "1234567890",
    "title": "Заголовок новости",
    "content": "<p>HTML контент новости</p>",
    "author": "Ник автора",
    "date": "2025-12-31T08:00:00Z",
    "pinned": false
  }
]
```

### 2. Настройка канала новостей

1. Создайте или выберите канал для новостей в Discord
2. Запишите ID канала
3. Настройте бота для чтения сообщений из этого канала

### 3. Пример кода для Discord бота (Node.js)

```javascript
const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const NEWS_CHANNEL_ID = 'YOUR_NEWS_CHANNEL_ID';

app.get('/news', async (req, res) => {
  try {
    const channel = await client.channels.fetch(NEWS_CHANNEL_ID);
    if (!channel || !channel.isTextBased()) {
      return res.status(404).json({ error: 'News channel not found' });
    }

    const messages = await channel.messages.fetch({ limit: 50 });
    const news = messages
      .filter(msg => !msg.author.bot || msg.pinned)
      .map(msg => ({
        id: msg.id,
        title: extractTitle(msg.content),
        content: formatContent(msg.content),
        author: msg.author.username,
        date: msg.createdAt.toISOString(),
        pinned: msg.pinned
      }));

    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

function extractTitle(content) {
  // Извлекаем первую строку как заголовок
  const firstLine = content.split('\\n')[0];
  return firstLine.replace(/^#+\\s*/, '').substring(0, 100);
}

function formatContent(content) {
  // Конвертируем markdown в HTML
  return content
    .replace(/^#+\\s*(.+)$/gm, '<h3>$1</h3>')
    .replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>')
    .replace(/\\*(.+?)\\*/g, '<em>$1</em>')
    .replace(/\\n/g, '<br>');
}

client.login(process.env.DISCORD_BOT_TOKEN);
app.listen(3001);
```

### 4. Формат сообщений в канале новостей

Рекомендуемый формат для публикации новостей:

```markdown
# Заголовок новости

Текст новости. Можно использовать **жирный** и *курсив*.

- Список
- Пунктов

Дополнительная информация.
```

### 5. Переменные окружения

В `.env.local` портала должна быть указана ссылка на Discord бота:

```env
DISCORD_BOT_API_URL=http://localhost:3001
# или
DISCORD_BOT_API_URL=https://your-bot-url.com
```

## Тестирование

### 1. Проверка Discord бота

```bash
curl http://localhost:3001/news
```

Должен вернуть массив новостей.

### 2. Проверка портала

```bash
curl http://localhost:3000/api/discord-proxy/news \
  -H "Cookie: auth_token=YOUR_TOKEN"
```

Должен вернуть те же новости.

### 3. Проверка в браузере

1. Войдите в портал
2. Перейдите в раздел "Новости"
3. Новости должны загрузиться автоматически

## Закрепление новостей

Чтобы закрепить новость:
1. В Discord канале новостей нажмите ПКМ на сообщении
2. Выберите "Закрепить сообщение"
3. Бот автоматически пометит её как `pinned: true`
4. На портале она отобразится с иконкой булавки вверху списка

## Кеширование

Новости кешируются на стороне портала на **5 минут**.  
Для принудительного обновления нажмите кнопку "Обновить" в разделе новостей.

## Безопасность

1. Discord бот должен работать в защищенной сети
2. Используйте HTTPS для production
3. Настройте CORS если бот на отдельном домене
4. Не передавайте секретные токены в новостях

## Troubleshooting

### Новости не загружаются

1. Проверьте `DISCORD_BOT_API_URL` в `.env.local`
2. Убедитесь, что Discord бот запущен
3. Проверьте логи бота на ошибки
4. Проверьте права бота на чтение канала

### Новости отображаются неправильно

1. Проверьте формат HTML в `content`
2. Убедитесь, что используется корректный markdown
3. Проверьте кодировку символов (UTF-8)

### Закрепленные новости не отображаются сверху

1. Проверьте поле `pinned` в ответе бота
2. Убедитесь, что сортировка работает на стороне портала
3. Очистите кеш портала

## Альтернативные источники новостей

Вместо Discord можно использовать:
- **RSS фид**
- **Notion API**
- **Google Sheets**
- **Прямое управление через админ-панель портала**

Для этого нужно изменить `app/api/discord-proxy/news/route.ts`.
