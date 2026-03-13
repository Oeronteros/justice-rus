import type { News } from '@/lib/schemas/news';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { runCoalescedTask, runServerTaskOnce } from '@/lib/server/db-cache';
import {
  ensureReadModelStateSchema,
  getReadModelState,
  markReadModelError,
  markReadModelReady,
} from './shared';
import { refreshReadModelAfterWrite, resolveReadModelSnapshot } from './runtime';
import { ensureNewsSourceSchema, fetchNewsFromBotSource, resolveNewsSyncSource } from './news-source';

export { ensureNewsSourceSchema } from './news-source';

const READ_MODEL_KEY = 'news-feed';
const READ_MODEL_TTL_MS = 5 * 60 * 1000;

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
  return resolveReadModelSnapshot({
    snapshot,
    state,
    ttlMs: READ_MODEL_TTL_MS,
    sync: syncNewsReadModel,
    staleLogLabel: 'Serving stale news read model after sync failure:',
  });
}

export async function fetchNewsDirect(token: string): Promise<News[]> {
  return fetchNewsFromBotSource(token);
}

export async function refreshNewsReadModelAfterWrite(): Promise<void> {
  if (!hasDatabaseUrl()) {
    return;
  }

  await refreshReadModelAfterWrite(syncNewsReadModel, 'Failed to refresh news read model after write:');
}
