import { getPool, hasDatabaseUrl } from '@/lib/neon';
import type { User } from '@/lib/schemas/auth';
import type { CreateNewsDto, News } from '@/lib/schemas/news';
import { extractMessageUrlInput, isDiscordMessageUrl } from '@/lib/news/message-url';
import {
  ensureNewsSourceSchema,
  fetchNewsDirect,
  getNewsReadModel,
  refreshNewsReadModelAfterWrite,
} from '@/lib/server/read-models/news';

const BOT_API_URL = process.env.BOT_API_URL || process.env.DISCORD_BOT_API_URL || '';
const BOT_API_KEY = process.env.BOT_API_KEY || process.env.DISCORD_BOT_API_KEY || '';

type BotPublishResult = {
  status: 'sent' | 'failed' | 'pending';
  messageUrl?: string;
  messageId?: string;
  error?: string;
  publishedAt?: string;
};

class NewsError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
    this.name = 'NewsError';
  }
}

export async function listNews(token: string): Promise<News[]> {
  if (hasDatabaseUrl()) {
    const news = await getNewsReadModel();
    if (news.length > 0) {
      return news;
    }
  }

  return fetchNewsDirect(token);
}

export async function createNews(payload: CreateNewsDto, user: User): Promise<News> {
  if (!hasDatabaseUrl()) {
    throw new NewsError('Database not configured', 503);
  }

  await ensureNewsSourceSchema();

  const title = payload.title;
  const content = payload.content;
  const author = payload.author || '';
  const pinned = Boolean(payload.pinned);
  const messageUrl = extractMessageUrlInput(payload);
  const resolvedAuthor = author || user.nickname || user.discordId || user.role;

  if (!title || !content || !resolvedAuthor) {
    throw new NewsError('Missing required fields', 400);
  }

  if (messageUrl && !isDiscordMessageUrl(messageUrl)) {
    throw new NewsError('messageUrl must be a valid Discord message URL', 400);
  }

  const pool = getPool();
  const result = await pool.query(
    `INSERT INTO news (title, content, author, pinned, message_url, discord_delivery_status, discord_delivery_error)
     VALUES ($1, $2, $3, $4, $5, 'pending', NULL)
     RETURNING id, title, content, author, date, pinned, created_at, message_url,
               discord_delivery_status, discord_delivery_error, published_to_discord_at`,
    [title, content, resolvedAuthor, pinned, messageUrl]
  );

  const createdRow = result.rows[0];
  const newsId = String(createdRow.id);
  const publishKey = `site-news-${newsId}`;

  await pool.query('UPDATE news SET publish_key = $2 WHERE id = $1', [newsId, publishKey]);

  const publishResult: BotPublishResult = {
    status: 'pending',
    messageUrl: messageUrl ?? undefined,
  };

  console.log('[FIX] News created in DB-only mode; Discord publish delegated to bot sync', {
    newsId,
    publishKey,
  });

  const updatedPublish = await pool.query(
    `UPDATE news
     SET message_url = COALESCE($2, message_url),
         discord_delivery_status = $3,
         discord_delivery_error = $4,
         published_to_discord_at = COALESCE($5::timestamp, published_to_discord_at),
         created_at = created_at
     WHERE id = $1
     RETURNING id, title, content, author, date, pinned, created_at, message_url,
               discord_delivery_status, discord_delivery_error, published_to_discord_at`,
    [
      newsId,
      publishResult.messageUrl ?? messageUrl ?? null,
      publishResult.status,
      publishResult.error ?? null,
      publishResult.publishedAt ?? null,
    ]
  );

  await refreshNewsReadModelAfterWrite();

  const finalRow = updatedPublish.rows[0];
  return {
    id: String(finalRow.id),
    title: String(finalRow.title || ''),
    content: String(finalRow.content || ''),
    author: String(finalRow.author || ''),
    date: finalRow.date instanceof Date ? finalRow.date.toISOString() : String(finalRow.date || ''),
    pinned: Boolean(finalRow.pinned),
    messageUrl: finalRow.message_url ? String(finalRow.message_url) : undefined,
    discordDeliveryStatus: String(finalRow.discord_delivery_status || 'pending') as News['discordDeliveryStatus'],
    discordDeliveryError: finalRow.discord_delivery_error ? String(finalRow.discord_delivery_error) : undefined,
    publishedToDiscordAt: finalRow.published_to_discord_at
      ? finalRow.published_to_discord_at instanceof Date
        ? finalRow.published_to_discord_at.toISOString()
        : String(finalRow.published_to_discord_at)
      : undefined,
  };
}

export async function deleteNews(newsId: string): Promise<{ id: string }> {
  if (!hasDatabaseUrl()) {
    throw new NewsError('Database not configured', 503);
  }

  await ensureNewsSourceSchema();

  const normalizedId = newsId.trim();
  if (!normalizedId) {
    throw new NewsError('News id is required', 400);
  }

  const pool = getPool();
  const existing = await pool.query('SELECT id, message_url FROM news WHERE id = $1 LIMIT 1', [normalizedId]);
  const existingRow = existing.rows[0];
  if (!existingRow) {
    throw new NewsError('News not found', 404);
  }

  const messageUrl = existingRow.message_url ? String(existingRow.message_url) : '';
  if (messageUrl && BOT_API_URL && BOT_API_KEY) {
    try {
      const response = await fetch(`${BOT_API_URL.replace(/\/$/, '')}/api/internal/news/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': BOT_API_KEY,
        },
        body: JSON.stringify({ message_url: messageUrl }),
        cache: 'no-store',
      });

      if (!response.ok) {
        const payload = await response.text().catch(() => '');
        console.warn('Failed to delete Discord news message before removing site news:', payload || response.statusText);
      }
    } catch (error) {
      console.warn('Failed to reach Discord bot for news deletion:', error);
    }
  }

  const result = await pool.query('DELETE FROM news WHERE id = $1 RETURNING id', [normalizedId]);
  const deletedRow = result.rows[0];

  if (!deletedRow) {
    throw new NewsError('News not found', 404);
  }

  await refreshNewsReadModelAfterWrite();

  return { id: String(deletedRow.id) };
}
