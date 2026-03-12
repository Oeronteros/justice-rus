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

const DISCORD_BOT_API_URL = process.env.BOT_API_URL || process.env.DISCORD_BOT_API_URL || 'http://localhost:3001';
const BOT_API_KEY = process.env.BOT_API_KEY || process.env.DISCORD_BOT_API_KEY;

function buildBotHeaders(): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    ...(BOT_API_KEY ? { 'X-API-KEY': BOT_API_KEY, Authorization: `Bearer ${BOT_API_KEY}` } : {}),
  };
}

async function publishNewsToDiscord(payload: {
  newsId: string;
  publishKey: string;
  title: string;
  content: string;
  author: string;
  pinned: boolean;
}): Promise<BotPublishResult> {
  const response = await fetch(`${DISCORD_BOT_API_URL}/api/internal/news/publish`, {
    method: 'POST',
    headers: buildBotHeaders(),
    body: JSON.stringify({
      news_id: payload.newsId,
      idempotency_key: payload.publishKey,
      title: payload.title,
      content: payload.content,
      author: payload.author,
      pinned: payload.pinned,
    }),
    cache: 'no-store',
  });

  const body: Record<string, unknown> = await response.json().catch(() => ({}));
  if (!response.ok) {
    return {
      status: 'failed',
      error: String(body.error || body.detail || body.message || `HTTP ${response.status}`),
    };
  }

  return {
    status: String(body.status || 'sent') as BotPublishResult['status'],
    messageUrl: body.message_url ? String(body.message_url) : undefined,
    messageId: body.message_id ? String(body.message_id) : undefined,
    error: body.error ? String(body.error) : undefined,
    publishedAt: body.published_at ? String(body.published_at) : undefined,
  };
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

  const publishResult: BotPublishResult = await publishNewsToDiscord({
    newsId,
    publishKey,
    title: String(createdRow.title || title),
    content: String(createdRow.content || content),
    author: String(createdRow.author || resolvedAuthor),
    pinned: Boolean(createdRow.pinned),
  }).catch((error: unknown): BotPublishResult => ({
    status: 'failed',
    error: error instanceof Error ? error.message : 'Discord publish failed',
  }));

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
