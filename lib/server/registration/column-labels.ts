import { defaultRegistrationColumnLabels } from '@/components/sections/registration/columnLabels';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import {
  normalizeRegistrationColumnLabels,
  registrationColumnLabelsSchema,
} from '@/lib/registration/column-labels';
import { runServerTaskOnce } from '@/lib/server/db-cache';

type RegistrationColumnLabels = typeof registrationColumnLabelsSchema._output;

const SETTINGS_KEY = 'shared-column-labels';

export async function ensureRegistrationColumnLabelsSchema() {
  if (!hasDatabaseUrl()) {
    return;
  }

  await runServerTaskOnce('schema:portal_registration_column_labels', async () => {
    const pool = getPool();

    await pool.query(`
      CREATE TABLE IF NOT EXISTS portal_registration_column_labels (
        settings_key TEXT PRIMARY KEY,
        labels JSONB NOT NULL DEFAULT '{}'::jsonb,
        updated_by TEXT NULL,
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    await pool.query(`ALTER TABLE portal_registration_column_labels ADD COLUMN IF NOT EXISTS labels JSONB NOT NULL DEFAULT '{}'::jsonb;`);
    await pool.query(`ALTER TABLE portal_registration_column_labels ADD COLUMN IF NOT EXISTS updated_by TEXT NULL;`);
    await pool.query(`ALTER TABLE portal_registration_column_labels ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NOT NULL DEFAULT NOW();`);
  });
}

export async function getSharedRegistrationColumnLabels(): Promise<RegistrationColumnLabels> {
  if (!hasDatabaseUrl()) {
    return defaultRegistrationColumnLabels;
  }

  await ensureRegistrationColumnLabelsSchema();
  const pool = getPool();
  const result = await pool.query(
    `SELECT labels FROM portal_registration_column_labels WHERE settings_key = $1 LIMIT 1`,
    [SETTINGS_KEY]
  );

  return normalizeRegistrationColumnLabels((result.rows[0]?.labels ?? null) as Record<string, string> | null);
}

export async function saveSharedRegistrationColumnLabels(
  labels: RegistrationColumnLabels,
  updatedBy: string
): Promise<RegistrationColumnLabels> {
  if (!hasDatabaseUrl()) {
    return defaultRegistrationColumnLabels;
  }

  await ensureRegistrationColumnLabelsSchema();
  const normalized = normalizeRegistrationColumnLabels(labels);
  const pool = getPool();

  await pool.query(
    `
      INSERT INTO portal_registration_column_labels (settings_key, labels, updated_by, updated_at)
      VALUES ($1, $2::jsonb, $3, NOW())
      ON CONFLICT (settings_key) DO UPDATE
      SET labels = EXCLUDED.labels,
          updated_by = EXCLUDED.updated_by,
          updated_at = NOW()
    `,
    [SETTINGS_KEY, JSON.stringify(normalized), updatedBy]
  );

  return normalized;
}
