import type { News } from '@/lib/schemas/news';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { getExpiringValue, runCoalescedTask, runServerTaskOnce } from '@/lib/server/db-cache';
import {
  ensureReadModelStateSchema,
  getReadModelState,
  isReadModelStale,
  markReadModelError,
  markReadModelReady,
} from './shared';

const READ_MODEL_KEY = 'news-feed';
const READ_MODEL_TTL_MS = 5 * 60 * 1000;
const BOT_NEWS_CACHE_TTL_MS = 30_000;
const DISCORD_BOT_API_URL = process.env.BOT_API_URL || process.env.DISCORD_BOT_API_URL || 'http://localhost:3001';
const BOT_API_KEY = process.env.BOT_API_KEY || process.env.DISCORD_BOT_API_KEY;
const bypassHeader: Record<string, string> =
  DISCORD_BOT_API_URL.includes('.loca.lt') || DISCORD_BOT_API_URL.includes('.localtunnel.me')
    ? { 'bypass-tunnel-reminder': '1' }
    : {};

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

async function fetchNewsFromBotSource(token?: string): Promise<News[]> {
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
        const message = payload && typeof payload === 'object'
          ? String((payload as Record<string, unknown>).error || (payload as Record<string, unknown>).message || `HTTP ${response.status}`)
          : `HTTP ${response.status}`;
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

async function resolveNewsSyncSource(): Promise<{ source: string; rows: News[] }> {
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

export async function ensureNewsReadModelSchema() {
  if (!hasDatabaseUrl()) {
    return;
  }

  await runServerTaskOnce('schema:news_read_model', async () => {
    await ensureNewsSourceSchema();
    await ensureReadModelStateSchema();
    const pool = getPool();
    await pool.query(`
      CREATE TABLE IF NOT EXISTS news_read_model (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL DEFAULT '',
        content TEXT NOT NULL DEFAULT '',
        author TEXT NOT NULL DEFAULT '',
        published_at TIMESTAMP NOT NULL DEFAULT NOW(),
        pinned BOOLEAN NOT NULL DEFAULT FALSE,
        message_url TEXT NULL,
        discord_delivery_status TEXT NOT NULL DEFAULT 'pending',
        discord_delivery_error TEXT NULL,
        published_to_discord_at TIMESTAMP NULL,
        source TEXT NOT NULL DEFAULT 'database',
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
    await pool.query(`CREATE INDEX IF NOT EXISTS news_read_model_published_at_idx ON news_read_model(published_at DESC);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS news_read_model_pinned_idx ON news_read_model(pinned DESC);`);
    await pool.query(`ALTER TABLE news_read_model ADD COLUMN IF NOT EXISTS discord_delivery_status TEXT NOT NULL DEFAULT 'pending';`).catch(() => undefined);
    await pool.query(`ALTER TABLE news_read_model ADD COLUMN IF NOT EXISTS discord_delivery_error TEXT NULL;`).catch(() => undefined);
    await pool.query(`ALTER TABLE news_read_model ADD COLUMN IF NOT EXISTS published_to_discord_at TIMESTAMP NULL;`).catch(() => undefined);
  });
}

export async function listNewsReadModel(): Promise<News[]> {
  if (!hasDatabaseUrl()) {
    return [];
  }

  await ensureNewsReadModelSchema();
  const pool = getPool();
  const result = await pool.query(
    `
      SELECT id, title, content, author, published_at, pinned, message_url,
             discord_delivery_status, discord_delivery_error, published_to_discord_at
      FROM news_read_model
      ORDER BY pinned DESC, published_at DESC, updated_at DESC
      LIMIT 50
    `
  );

  return result.rows.map((row) => ({
    id: String(row.id),
    title: String(row.title || ''),
    content: String(row.content || ''),
    author: String(row.author || ''),
    date: row.published_at instanceof Date ? row.published_at.toISOString() : String(row.published_at || ''),
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

export async function syncNewsReadModel(): Promise<News[]> {
  if (!hasDatabaseUrl()) {
    return [];
  }

  return runCoalescedTask('read-model-sync:news', async () => {
    await ensureNewsReadModelSchema();
    const { source, rows } = await resolveNewsSyncSource();
    const pool = getPool();
    const client = await pool.connect();

    try {
      await client.query('BEGIN');
      await client.query('DELETE FROM news_read_model');

      for (const row of rows) {
        await client.query(
          `
            INSERT INTO news_read_model (
              id, title, content, author, published_at, pinned, message_url,
              discord_delivery_status, discord_delivery_error, published_to_discord_at,
              source, updated_at
            )
            VALUES ($1, $2, $3, $4, $5::timestamp, $6, $7, $8, $9, $10::timestamp, $11, NOW())
          `,
          [
            row.id,
            row.title,
            row.content,
            row.author,
            row.date || new Date().toISOString(),
            Boolean(row.pinned),
            row.messageUrl || null,
            row.discordDeliveryStatus || (row.messageUrl ? 'sent' : 'pending'),
            row.discordDeliveryError || null,
            row.publishedToDiscordAt || null,
            source,
          ]
        );
      }

      await client.query('COMMIT');
      await markReadModelReady(READ_MODEL_KEY, source, rows.length);
      return rows;
    } catch (error) {
      await client.query('ROLLBACK').catch(() => undefined);
      await markReadModelError(READ_MODEL_KEY, error instanceof Error ? error.message : 'Unknown sync error');
      throw error;
    } finally {
      client.release();
    }
  });
}

export async function getNewsReadModel(): Promise<News[]> {
  if (!hasDatabaseUrl()) {
    return [];
  }

  const snapshot = await listNewsReadModel();
  const state = await getReadModelState(READ_MODEL_KEY);
  if (snapshot.length > 0 && !isReadModelStale(state, READ_MODEL_TTL_MS)) {
    return snapshot;
  }

  try {
    const fresh = await syncNewsReadModel();
    return fresh.length > 0 ? fresh : snapshot;
  } catch (error) {
    if (snapshot.length > 0) {
      console.error('Serving stale news read model after sync failure:', error);
      return snapshot;
    }
    throw error;
  }
}

export async function fetchNewsDirect(token: string): Promise<News[]> {
  return fetchNewsFromBotSource(token);
}

export async function refreshNewsReadModelAfterWrite(): Promise<void> {
  if (!hasDatabaseUrl()) {
    return;
  }

  try {
    await syncNewsReadModel();
  } catch (error) {
    console.error('Failed to refresh news read model after write:', error);
  }
}
