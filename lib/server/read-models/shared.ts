import { getPool } from '@/lib/neon';
import { runServerTaskOnce } from '@/lib/server/db-cache';

export type ReadModelState = {
  key: string;
  status: 'idle' | 'ready' | 'error';
  source: string | null;
  rowCount: number;
  refreshedAt: string | null;
  lastError: string | null;
};

export async function ensureReadModelStateSchema() {
  await runServerTaskOnce('schema:read_model_state', async () => {
    const pool = getPool();
    await pool.query(`
      CREATE TABLE IF NOT EXISTS read_model_state (
        read_model_key TEXT PRIMARY KEY,
        status TEXT NOT NULL DEFAULT 'idle',
        source TEXT NULL,
        row_count INTEGER NOT NULL DEFAULT 0,
        refreshed_at TIMESTAMP NULL,
        last_error TEXT NULL,
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
    await pool.query(`CREATE INDEX IF NOT EXISTS read_model_state_updated_at_idx ON read_model_state(updated_at DESC);`);
  });
}

export async function getReadModelState(key: string): Promise<ReadModelState | null> {
  await ensureReadModelStateSchema();
  const pool = getPool();
  const result = await pool.query(
    `
      SELECT read_model_key, status, source, row_count, refreshed_at, last_error
      FROM read_model_state
      WHERE read_model_key = $1
      LIMIT 1
    `,
    [key]
  );

  const row = result.rows[0];
  if (!row) {
    return null;
  }

  return {
    key: String(row.read_model_key),
    status: row.status === 'error' ? 'error' : row.status === 'ready' ? 'ready' : 'idle',
    source: row.source ? String(row.source) : null,
    rowCount: Number(row.row_count || 0),
    refreshedAt: row.refreshed_at ? new Date(row.refreshed_at).toISOString() : null,
    lastError: row.last_error ? String(row.last_error) : null,
  };
}

export async function markReadModelReady(key: string, source: string, rowCount: number) {
  await ensureReadModelStateSchema();
  const pool = getPool();
  await pool.query(
    `
      INSERT INTO read_model_state (read_model_key, status, source, row_count, refreshed_at, last_error, updated_at)
      VALUES ($1, 'ready', $2, $3, NOW(), NULL, NOW())
      ON CONFLICT (read_model_key) DO UPDATE
      SET status = 'ready',
          source = EXCLUDED.source,
          row_count = EXCLUDED.row_count,
          refreshed_at = EXCLUDED.refreshed_at,
          last_error = NULL,
          updated_at = NOW()
    `,
    [key, source, rowCount]
  );
}

export async function markReadModelError(key: string, error: string) {
  await ensureReadModelStateSchema();
  const pool = getPool();
  await pool.query(
    `
      INSERT INTO read_model_state (read_model_key, status, source, row_count, refreshed_at, last_error, updated_at)
      VALUES ($1, 'error', NULL, 0, NULL, $2, NOW())
      ON CONFLICT (read_model_key) DO UPDATE
      SET status = 'error',
          last_error = EXCLUDED.last_error,
          updated_at = NOW()
    `,
    [key, error.slice(0, 1500)]
  );
}

export function isReadModelStale(state: ReadModelState | null, ttlMs: number): boolean {
  if (!state?.refreshedAt) {
    return true;
  }

  return Date.now() - Date.parse(state.refreshedAt) > ttlMs;
}
