import { ensureAccountsSchema } from '@/lib/auth/accounts';
import { getPool } from '@/lib/neon';
import { getCachedTableColumns, runServerTaskOnce } from '@/lib/server/db-cache';

export async function getTableColumns(tableName: string): Promise<Set<string>> {
  return getCachedTableColumns(tableName);
}

export async function ensurePortalActivityColumns() {
  await runServerTaskOnce('schema:activity_kpi', async () => {
    const pool = getPool();
    await pool.query(`
      CREATE TABLE IF NOT EXISTS activity_kpi (
        id SERIAL PRIMARY KEY,
        discord_id TEXT NOT NULL,
        username TEXT NOT NULL DEFAULT '',
        activity_date DATE NOT NULL DEFAULT CURRENT_DATE,
        outer_city_heroic INTEGER NOT NULL DEFAULT 0,
        inner_city INTEGER NOT NULL DEFAULT 0,
        chronicles INTEGER NOT NULL DEFAULT 0,
        abyss INTEGER NOT NULL DEFAULT 0,
        bounty INTEGER NOT NULL DEFAULT 0,
        gvg INTEGER NOT NULL DEFAULT 0,
        mvp_20 INTEGER NOT NULL DEFAULT 0,
        secret_realm INTEGER NOT NULL DEFAULT 0,
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
    await pool.query(`ALTER TABLE activity_kpi ADD COLUMN IF NOT EXISTS discord_id TEXT;`);
    await pool.query(`ALTER TABLE activity_kpi ADD COLUMN IF NOT EXISTS username TEXT NOT NULL DEFAULT '';`);
    await pool.query(`ALTER TABLE activity_kpi ADD COLUMN IF NOT EXISTS activity_date DATE NOT NULL DEFAULT CURRENT_DATE;`);
    await pool.query(`ALTER TABLE activity_kpi ADD COLUMN IF NOT EXISTS outer_city_heroic INTEGER NOT NULL DEFAULT 0;`);
    await pool.query(`ALTER TABLE activity_kpi ADD COLUMN IF NOT EXISTS inner_city INTEGER NOT NULL DEFAULT 0;`);
    await pool.query(`ALTER TABLE activity_kpi ADD COLUMN IF NOT EXISTS chronicles INTEGER NOT NULL DEFAULT 0;`);
    await pool.query(`ALTER TABLE activity_kpi ADD COLUMN IF NOT EXISTS abyss INTEGER NOT NULL DEFAULT 0;`);
    await pool.query(`ALTER TABLE activity_kpi ADD COLUMN IF NOT EXISTS bounty INTEGER NOT NULL DEFAULT 0;`);
    await pool.query(`ALTER TABLE activity_kpi ADD COLUMN IF NOT EXISTS gvg INTEGER NOT NULL DEFAULT 0;`);
    await pool.query(`ALTER TABLE activity_kpi ADD COLUMN IF NOT EXISTS mvp_20 INTEGER NOT NULL DEFAULT 0;`);
    await pool.query(`ALTER TABLE activity_kpi ADD COLUMN IF NOT EXISTS secret_realm INTEGER DEFAULT 0;`);
    await pool.query(`ALTER TABLE activity_kpi ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NOT NULL DEFAULT NOW();`);
    await pool.query(`
      DELETE FROM activity_kpi
      WHERE ctid IN (
        SELECT ctid
        FROM (
          SELECT
            ctid,
            ROW_NUMBER() OVER (
              PARTITION BY discord_id, activity_date
              ORDER BY updated_at DESC NULLS LAST, ctid DESC
            ) AS duplicate_rank
          FROM activity_kpi
          WHERE discord_id IS NOT NULL AND activity_date IS NOT NULL
        ) ranked
        WHERE duplicate_rank > 1
      );
    `);
    await pool.query(`CREATE UNIQUE INDEX IF NOT EXISTS activity_kpi_discord_date_idx ON activity_kpi(discord_id, activity_date);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS activity_kpi_discord_idx ON activity_kpi(discord_id);`);
  });
}

export async function ensureDuelRatingsSchema() {
  await runServerTaskOnce('schema:duel_ratings', async () => {
    const pool = getPool();
    await pool.query(`
      CREATE TABLE IF NOT EXISTS duel_ratings (
        id SERIAL PRIMARY KEY,
        discord_id TEXT NOT NULL UNIQUE,
        username TEXT NOT NULL DEFAULT '',
        rating INTEGER NOT NULL DEFAULT 1000,
        wins INTEGER NOT NULL DEFAULT 0,
        losses INTEGER NOT NULL DEFAULT 0,
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
    await pool.query(`ALTER TABLE duel_ratings ADD COLUMN IF NOT EXISTS discord_id TEXT;`);
    await pool.query(`ALTER TABLE duel_ratings ADD COLUMN IF NOT EXISTS username TEXT NOT NULL DEFAULT '';`);
    await pool.query(`ALTER TABLE duel_ratings ADD COLUMN IF NOT EXISTS rating INTEGER NOT NULL DEFAULT 1000;`);
    await pool.query(`ALTER TABLE duel_ratings ADD COLUMN IF NOT EXISTS wins INTEGER NOT NULL DEFAULT 0;`);
    await pool.query(`ALTER TABLE duel_ratings ADD COLUMN IF NOT EXISTS losses INTEGER NOT NULL DEFAULT 0;`);
    await pool.query(`ALTER TABLE duel_ratings ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NOT NULL DEFAULT NOW();`);
    await pool.query(`
      DELETE FROM duel_ratings
      WHERE ctid IN (
        SELECT ctid
        FROM (
          SELECT
            ctid,
            ROW_NUMBER() OVER (
              PARTITION BY discord_id
              ORDER BY updated_at DESC NULLS LAST, ctid DESC
            ) AS duplicate_rank
          FROM duel_ratings
          WHERE discord_id IS NOT NULL
        ) ranked
        WHERE duplicate_rank > 1
      );
    `);
    await pool.query(`CREATE UNIQUE INDEX IF NOT EXISTS duel_ratings_discord_id_idx ON duel_ratings(discord_id);`);
  });
}

export async function ensureRegistrationStatsSchema() {
  await ensureAccountsSchema();
  await ensurePortalActivityColumns();
  await ensureDuelRatingsSchema();
}

export async function ensureActivityRow(discordId: string, nickname: string) {
  const pool = getPool();
  const today = new Date().toISOString().slice(0, 10);
  await ensurePortalActivityColumns();
  await pool.query(
    `
      INSERT INTO activity_kpi (discord_id, username, activity_date)
      VALUES ($1, $2, $3)
      ON CONFLICT (discord_id, activity_date) DO UPDATE
      SET username = EXCLUDED.username
    `,
    [discordId, nickname, today]
  );

  return today;
}
