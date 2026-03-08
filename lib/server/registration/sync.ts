import type { Registration } from '@/lib/schemas/registration';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { runCoalescedTask } from '@/lib/server/db-cache';
import {
  getReadModelState,
  isReadModelStale,
  markReadModelError,
  markReadModelReady,
} from '@/lib/server/read-models/shared';
import { getRegistrationsFromDb } from './read';
import {
  ensureRegistrationReadModelSchema,
  getRegistrationNicknameKey,
  listRegistrationReadModel,
  REGISTRATION_READ_MODEL_KEY,
} from './read-model';

const REGISTRATION_READ_MODEL_TTL_MS = 5 * 60 * 1000;

export async function syncRegistrationReadModel(): Promise<Registration[]> {
  if (!hasDatabaseUrl()) {
    return [];
  }

  return runCoalescedTask('read-model-sync:registration', async () => {
    await ensureRegistrationReadModelSchema();
    const rows = await getRegistrationsFromDb();
    const pool = getPool();
    const client = await pool.connect();

    try {
      await client.query('BEGIN');
      await client.query('DELETE FROM registration_read_model');

      for (const row of rows) {
        await client.query(
          `
            INSERT INTO registration_read_model (nickname_key, nickname, status, payload, refreshed_at)
            VALUES ($1, $2, $3, $4::jsonb, NOW())
          `,
          [
            getRegistrationNicknameKey(row.nickname),
            row.nickname,
            row.status,
            JSON.stringify(row),
          ]
        );
      }

      await client.query('COMMIT');
      await markReadModelReady(REGISTRATION_READ_MODEL_KEY, 'database', rows.length);
      return rows;
    } catch (error) {
      await client.query('ROLLBACK').catch(() => undefined);
      await markReadModelError(
        REGISTRATION_READ_MODEL_KEY,
        error instanceof Error ? error.message : 'Unknown registration read-model sync error'
      );
      throw error;
    } finally {
      client.release();
    }
  });
}

export async function getRegistrationReadModel(): Promise<Registration[]> {
  if (!hasDatabaseUrl()) {
    return [];
  }

  const snapshot = await listRegistrationReadModel();
  const state = await getReadModelState(REGISTRATION_READ_MODEL_KEY);
  if (snapshot.length > 0 && !isReadModelStale(state, REGISTRATION_READ_MODEL_TTL_MS)) {
    return snapshot;
  }

  try {
    const fresh = await syncRegistrationReadModel();
    return fresh.length > 0 ? fresh : snapshot;
  } catch (error) {
    if (snapshot.length > 0) {
      console.error('Serving stale registration read model after sync failure:', error);
      return snapshot;
    }
    throw error;
  }
}

export async function refreshRegistrationReadModelAfterWrite(): Promise<void> {
  if (!hasDatabaseUrl()) {
    return;
  }

  try {
    await syncRegistrationReadModel();
  } catch (error) {
    console.error('Failed to refresh registration read model after write:', error);
  }
}
