import { schedulesArraySchema, type Schedule } from '@/lib/schemas/schedule';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import {
  runCoalescedTask,
  runServerTaskOnce,
} from '@/lib/server/db-cache';
import {
  ensureReadModelStateSchema,
  getReadModelState,
  markReadModelError,
  markReadModelReady,
} from './shared';
import { refreshReadModelAfterWrite, resolveReadModelSnapshot } from './runtime';
import {
  buildScheduleKey,
  fetchScheduleFromBot,
  formatScheduleForLanguage,
  resolveScheduleSyncSource,
} from './schedule-source';

const READ_MODEL_KEY = 'schedule-feed';
const READ_MODEL_TTL_MS = 5 * 60 * 1000;

export async function ensureScheduleReadModelSchema() {
  if (!hasDatabaseUrl()) {
    return;
  }

  await runServerTaskOnce('schema:schedule_read_model', async () => {
    await ensureReadModelStateSchema();
    const pool = getPool();
    await pool.query(`
      CREATE TABLE IF NOT EXISTS schedule_read_model (
        item_key TEXT PRIMARY KEY,
        day_type TEXT NOT NULL DEFAULT '',
        order_index INTEGER NOT NULL DEFAULT 0,
        payload JSONB NOT NULL,
        refreshed_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
    await pool.query(`CREATE INDEX IF NOT EXISTS schedule_read_model_day_type_idx ON schedule_read_model(day_type, order_index);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS schedule_read_model_refreshed_at_idx ON schedule_read_model(refreshed_at DESC);`);
  });
}

export async function listScheduleReadModel(language: string): Promise<Schedule[]> {
  if (!hasDatabaseUrl()) {
    return [];
  }

  await ensureScheduleReadModelSchema();
  const pool = getPool();
  const result = await pool.query(
    `
      SELECT payload
      FROM schedule_read_model
      ORDER BY day_type ASC, order_index ASC
    `
  );

  const rows = schedulesArraySchema.parse(result.rows.map((row) => row.payload));
  return rows.map((row) => formatScheduleForLanguage(row, language));
}

export async function syncScheduleReadModel(): Promise<Schedule[]> {
  if (!hasDatabaseUrl()) {
    return [];
  }

  return runCoalescedTask('read-model-sync:schedule', async () => {
    await ensureScheduleReadModelSchema();
    const { source, rows } = await resolveScheduleSyncSource();
    const pool = getPool();
    const client = await pool.connect();

    try {
      await client.query('BEGIN');
      await client.query('DELETE FROM schedule_read_model');

      for (let index = 0; index < rows.length; index += 1) {
        const row = rows[index];
        await client.query(
          `
            INSERT INTO schedule_read_model (item_key, day_type, order_index, payload, refreshed_at)
            VALUES ($1, $2, $3, $4::jsonb, NOW())
          `,
          [
            buildScheduleKey(row, index),
            row.dayType || row.type || row.group || '',
            row.orderIndex ?? index,
            JSON.stringify(row),
          ]
        );
      }

      await client.query('COMMIT');
      await markReadModelReady(READ_MODEL_KEY, source, rows.length);
      return rows;
    } catch (error) {
      await client.query('ROLLBACK').catch(() => undefined);
      await markReadModelError(READ_MODEL_KEY, error instanceof Error ? error.message : 'Unknown schedule sync error');
      throw error;
    } finally {
      client.release();
    }
  });
}

export async function getScheduleReadModel(language: string): Promise<Schedule[]> {
  if (!hasDatabaseUrl()) {
    return [];
  }

  const snapshot = await listScheduleReadModel(language);
  const state = await getReadModelState(READ_MODEL_KEY);
  return resolveReadModelSnapshot({
    snapshot,
    state,
    ttlMs: READ_MODEL_TTL_MS,
    sync: async () => {
      const fresh = await syncScheduleReadModel();
      const typed = schedulesArraySchema.parse(fresh);
      return typed.map((row) => formatScheduleForLanguage(row, language));
    },
    staleLogLabel: 'Serving stale schedule read model after sync failure:',
  });
}

export async function fetchScheduleDirect(language: string): Promise<Schedule[]> {
  return fetchScheduleFromBot(language);
}

export async function refreshScheduleReadModelAfterWrite(): Promise<void> {
  if (!hasDatabaseUrl()) {
    return;
  }

  await refreshReadModelAfterWrite(syncScheduleReadModel, 'Failed to refresh schedule read model after write:');
}
