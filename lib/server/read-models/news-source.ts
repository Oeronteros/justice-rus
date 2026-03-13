import type { News } from '@/lib/schemas/news';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { getExpiringValue, runServerTaskOnce } from '@/lib/server/db-cache';
import { getReadModelFetchErrorMessage, getReadModelTunnelBypassHeaders } from './runtime';

const BOT_NEWS_CACHE_TTL_MS = 30_000;
const DISCORD_BOT_API_URL = process.env.BOT_API_URL || process.env.DISCORD_BOT_API_URL || 'http://localhost:3001';
const BOT_API_KEY = process.env.BOT_API_KEY || process.env.DISCORD_BOT_API_KEY;
const bypassHeader = getReadModelTunnelBypassHeaders(DISCORD_BOT_API_URL);

function normalizeNewsRows(data: ReadonlyArray<Record<string, unknown>>): News[] {
  return data.map((item, index) => ({
    id: String(item.id ?? item.news_id ?? item.message_id ?? index + 1),
    title: String(item.title ?? item.headline ?? item.name ?? item.content ?? item.description ?? 'Untitled'),
    content: String(item.content ?? item.body ?? item.text ?? item.description ?? ''),
    author: String(item.author ?? item.author_name ?? item.username ?? item.created_by ?? item.event_type ?? 'DiscordBot2'),
    date: String(item.date ?? item.created_at ?? item.published_at ?? item.start_time ?? new Date().toISOString()),
    pinned: Boolean(item.pinned),
    messageUrl:
      item.message_url || item.messageUrl
        ? String(item.message_url ?? item.messageUrl)
        : undefined,
    discordDeliveryStatus:
      item.discord_delivery_status || item.discordDeliveryStatus
        ? String(item.discord_delivery_status ?? item.discordDeliveryStatus) as News['discordDeliveryStatus']
        : item.message_url || item.messageUrl
          ? 'sent'
          : undefined,
    discordDeliveryError:
      item.discord_delivery_error || item.discordDeliveryError
        ? String(item.discord_delivery_error ?? item.discordDeliveryError)
        : undefined,
    publishedToDiscordAt:
      item.published_to_discord_at || item.publishedToDiscordAt
        ? String(item.published_to_discord_at ?? item.publishedToDiscordAt)
        : undefined,
  }));
}

function toObjectArray(value: unknown): Record<string, unknown>[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is Record<string, unknown> => typeof item === 'object' && item !== null);
}

function buildBotHeaders(token?: string): Record<string, string> {
  if (BOT_API_KEY) {
    return {
      'Content-Type': 'application/json',
      'X-API-KEY': BOT_API_KEY,
      Authorization: `Bearer ${BOT_API_KEY}`,
      ...bypassHeader,
    };
  }

  if (!token) {
    throw new Error('BOT_API_KEY is not configured for background news sync');
  }

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    ...bypassHeader,
  };
}

export async function fetchNewsFromBotSource(token?: string): Promise<News[]> {
  const loadNews = async () => {
    const attempts = [
      {
        url: `${DISCORD_BOT_API_URL}/api/news`,
        extract: (payload: unknown) => {
          if (Array.isArray(payload)) {
            return toObjectArray(payload);
          }
          if (payload && typeof payload === 'object' && 'data' in payload) {
            return toObjectArray(payload.data);
          }
          return [];
        },
      },
      {
        url: `${DISCORD_BOT_API_URL}/api/events?page=1&page_size=20`,
        extract: (payload: unknown) => {
          if (payload && typeof payload === 'object') {
            if ('items' in payload) {
              return toObjectArray(payload.items);
            }
            if ('data' in payload) {
              return toObjectArray(payload.data);
            }
          }
          return [];
        },
      },
    ];

    const errors: string[] = [];
    for (const attempt of attempts) {
      const response = await fetch(attempt.url, {
        headers: buildBotHeaders(token),
        cache: 'no-store',
      });

      const payload: unknown = await response.json().catch(() => ({}));
      if (!response.ok) {
        const message = getReadModelFetchErrorMessage(payload, response.status);
        errors.push(`${attempt.url}: ${message}`);
        continue;
      }

      const rows = attempt.extract(payload);
      if (rows.length > 0) {
        return normalizeNewsRows(rows);
      }
    }

    throw new Error(errors.join(' | ') || 'No bot news endpoints returned data');
  };

  if (BOT_API_KEY) {
    return getExpiringValue('bot-news:read-model', BOT_NEWS_CACHE_TTL_MS, loadNews);
  }

  return loadNews();
}

export async function ensureNewsSourceSchema() {
  if (!hasDatabaseUrl()) {
    return;
  }

  await runServerTaskOnce('schema:news_source', async () => {
    const pool = getPool();
    await pool.query(`ALTER TABLE news ADD COLUMN IF NOT EXISTS publish_key TEXT NULL;`).catch(() => undefined);
    await pool.query(`ALTER TABLE news ADD COLUMN IF NOT EXISTS discord_delivery_status TEXT NOT NULL DEFAULT 'pending';`).catch(() => undefined);
    await pool.query(`ALTER TABLE news ADD COLUMN IF NOT EXISTS discord_delivery_error TEXT NULL;`).catch(() => undefined);
    await pool.query(`ALTER TABLE news ADD COLUMN IF NOT EXISTS published_to_discord_at TIMESTAMP NULL;`).catch(() => undefined);
    await pool.query(`CREATE UNIQUE INDEX IF NOT EXISTS news_publish_key_uq ON news(publish_key) WHERE publish_key IS NOT NULL;`).catch(() => undefined);
  });
}

async function loadNewsFromDatabase(): Promise<News[]> {
  await ensureNewsSourceSchema();
  const pool = getPool();
  const result = await pool.query(
    `SELECT id, title, content, author, date, pinned, created_at, message_url,
            discord_delivery_status, discord_delivery_error, published_to_discord_at
     FROM news
     ORDER BY pinned DESC, date DESC, created_at DESC
     LIMIT 50`
  );

  return result.rows.map((row) => ({
    id: String(row.id),
    title: String(row.title || ''),
    content: String(row.content || ''),
    author: String(row.author || ''),
    date: row.date instanceof Date ? row.date.toISOString() : String(row.date || ''),
    pinned: Boolean(row.pinned),
    messageUrl: row.message_url ? String(row.message_url) : undefined,
    discordDeliveryStatus: row.discord_delivery_status ? String(row.discord_delivery_status) as News['discordDeliveryStatus'] : undefined,
    discordDeliveryError: row.discord_delivery_error ? String(row.discord_delivery_error) : undefined,
    publishedToDiscordAt: row.published_to_discord_at
      ? row.published_to_discord_at instanceof Date
        ? row.published_to_discord_at.toISOString()
        : String(row.published_to_discord_at)
      : undefined,
  }));
}

export async function resolveNewsSyncSource(): Promise<{ source: string; rows: News[] }> {
  if (hasDatabaseUrl()) {
    try {
      const rows = await loadNewsFromDatabase();
      if (rows.length > 0) {
        return { source: 'database', rows };
      }
    } catch (error) {
      console.error('Failed to load news source rows from database:', error);
    }
  }

  if (BOT_API_KEY) {
    const rows = await fetchNewsFromBotSource();
    return { source: 'discord-bot', rows };
  }

  return { source: 'database', rows: [] };
}
