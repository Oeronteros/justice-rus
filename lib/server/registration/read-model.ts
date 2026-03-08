import { registrationsArraySchema, type Registration } from '@/lib/schemas/registration';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { runServerTaskOnce } from '@/lib/server/db-cache';
import { ensureReadModelStateSchema } from '@/lib/server/read-models/shared';

export const REGISTRATION_READ_MODEL_KEY = 'registration-roster';

function toNicknameKey(value: string): string {
  return value.trim().toLowerCase();
}

export async function ensureRegistrationReadModelSchema() {
  if (!hasDatabaseUrl()) {
    return;
  }

  await runServerTaskOnce('schema:registration_read_model', async () => {
    await ensureReadModelStateSchema();
    const pool = getPool();
    await pool.query(`
      CREATE TABLE IF NOT EXISTS registration_read_model (
        nickname_key TEXT PRIMARY KEY,
        nickname TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'active',
        payload JSONB NOT NULL,
        refreshed_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
    await pool.query(`CREATE INDEX IF NOT EXISTS registration_read_model_status_idx ON registration_read_model(status);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS registration_read_model_refreshed_at_idx ON registration_read_model(refreshed_at DESC);`);
  });
}

export async function listRegistrationReadModel(): Promise<Registration[]> {
  if (!hasDatabaseUrl()) {
    return [];
  }

  await ensureRegistrationReadModelSchema();
  const pool = getPool();
  const result = await pool.query(
    `
      SELECT payload
      FROM registration_read_model
      ORDER BY
        CASE status
          WHEN 'active' THEN 0
          WHEN 'pending' THEN 1
          WHEN 'leave' THEN 2
          WHEN 'inactive' THEN 3
          ELSE 4
        END,
        nickname ASC
    `
  );

  return registrationsArraySchema.parse(result.rows.map((row) => row.payload));
}

export function getRegistrationNicknameKey(nickname: string): string {
  return toNicknameKey(nickname);
}
