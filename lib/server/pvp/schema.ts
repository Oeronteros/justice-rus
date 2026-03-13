import { getPool } from '@/lib/neon';
import { runServerTaskOnce } from '@/lib/server/db-cache';

export async function ensurePvpSchema() {
  await runServerTaskOnce('schema:pvp', async () => {
    const pool = getPool();

    await pool.query(`
      CREATE TABLE IF NOT EXISTS duel_queue (
        id SERIAL PRIMARY KEY,
        player_id TEXT NOT NULL UNIQUE,
        nickname TEXT NOT NULL,
        class_name TEXT NOT NULL DEFAULT '',
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
    await pool.query(`ALTER TABLE duel_queue ADD COLUMN IF NOT EXISTS player_id TEXT;`);
    await pool.query(`ALTER TABLE duel_queue ADD COLUMN IF NOT EXISTS discord_id TEXT;`);
    await pool.query(`ALTER TABLE duel_queue ADD COLUMN IF NOT EXISTS nickname TEXT;`);
    await pool.query(`ALTER TABLE duel_queue ADD COLUMN IF NOT EXISTS prefix TEXT NOT NULL DEFAULT '';`);
    await pool.query(`ALTER TABLE duel_queue ADD COLUMN IF NOT EXISTS class_name TEXT NOT NULL DEFAULT '';`);
    await pool.query(`ALTER TABLE duel_queue ADD COLUMN IF NOT EXISTS queued_at TIMESTAMP NULL;`);
    await pool.query(`ALTER TABLE duel_queue ADD COLUMN IF NOT EXISTS created_at TIMESTAMP NOT NULL DEFAULT NOW();`);
    await pool.query(`CREATE UNIQUE INDEX IF NOT EXISTS duel_queue_player_id_idx ON duel_queue(player_id);`);
    await pool.query(`CREATE UNIQUE INDEX IF NOT EXISTS duel_queue_discord_id_idx ON duel_queue(discord_id);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS duel_queue_created_at_idx ON duel_queue(created_at ASC);`);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS duel_matches (
        id SERIAL PRIMARY KEY,
        player_one_id TEXT NOT NULL,
        player_one_nickname TEXT NOT NULL,
        player_one_prefix TEXT NOT NULL DEFAULT '',
        player_one_class TEXT NOT NULL DEFAULT '',
        player_two_id TEXT NOT NULL,
        player_two_nickname TEXT NOT NULL,
        player_two_prefix TEXT NOT NULL DEFAULT '',
        player_two_class TEXT NOT NULL DEFAULT '',
        status TEXT NOT NULL DEFAULT 'pending',
        winner_id TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        confirmed_at TIMESTAMP
      );
    `);
    await pool.query(`ALTER TABLE duel_matches ADD COLUMN IF NOT EXISTS player_one_id TEXT;`);
    await pool.query(`ALTER TABLE duel_matches ADD COLUMN IF NOT EXISTS player1_id TEXT;`);
    await pool.query(`ALTER TABLE duel_matches ADD COLUMN IF NOT EXISTS player_one_nickname TEXT;`);
    await pool.query(`ALTER TABLE duel_matches ADD COLUMN IF NOT EXISTS player_one_prefix TEXT NOT NULL DEFAULT '';`);
    await pool.query(`ALTER TABLE duel_matches ADD COLUMN IF NOT EXISTS player_one_class TEXT NOT NULL DEFAULT '';`);
    await pool.query(`ALTER TABLE duel_matches ADD COLUMN IF NOT EXISTS player_two_id TEXT;`);
    await pool.query(`ALTER TABLE duel_matches ADD COLUMN IF NOT EXISTS player2_id TEXT;`);
    await pool.query(`ALTER TABLE duel_matches ADD COLUMN IF NOT EXISTS player_two_nickname TEXT;`);
    await pool.query(`ALTER TABLE duel_matches ADD COLUMN IF NOT EXISTS player_two_prefix TEXT NOT NULL DEFAULT '';`);
    await pool.query(`ALTER TABLE duel_matches ADD COLUMN IF NOT EXISTS player_two_class TEXT NOT NULL DEFAULT '';`);
    await pool.query(`ALTER TABLE duel_matches ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'pending';`);
    await pool.query(`ALTER TABLE duel_matches ADD COLUMN IF NOT EXISTS winner_id TEXT;`);
    await pool.query(`ALTER TABLE duel_matches ADD COLUMN IF NOT EXISTS created_at TIMESTAMP NOT NULL DEFAULT NOW();`);
    await pool.query(`ALTER TABLE duel_matches ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NOT NULL DEFAULT NOW();`);
    await pool.query(`ALTER TABLE duel_matches ADD COLUMN IF NOT EXISTS confirmed_at TIMESTAMP;`);
    await pool.query(`ALTER TABLE duel_matches ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP;`);
    await pool.query(`CREATE INDEX IF NOT EXISTS duel_matches_status_idx ON duel_matches(status);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS duel_matches_player_one_idx ON duel_matches(player_one_id);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS duel_matches_player_two_idx ON duel_matches(player_two_id);`);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS duel_confirmations (
        id SERIAL PRIMARY KEY,
        match_id INTEGER NOT NULL REFERENCES duel_matches(id) ON DELETE CASCADE,
        player_id TEXT NOT NULL,
        reported_winner_id TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
    await pool.query(`ALTER TABLE duel_confirmations ADD COLUMN IF NOT EXISTS match_id INTEGER;`);
    await pool.query(`ALTER TABLE duel_confirmations ADD COLUMN IF NOT EXISTS discord_id TEXT;`);
    await pool.query(`ALTER TABLE duel_confirmations ADD COLUMN IF NOT EXISTS confirmed_winner_id TEXT;`);
    await pool.query(`ALTER TABLE duel_confirmations ADD COLUMN IF NOT EXISTS confirmed_at TIMESTAMP;`);
    await pool.query(`ALTER TABLE duel_confirmations ADD COLUMN IF NOT EXISTS player_id TEXT;`);
    await pool.query(`ALTER TABLE duel_confirmations ADD COLUMN IF NOT EXISTS reported_winner_id TEXT;`);
    await pool.query(`ALTER TABLE duel_confirmations ADD COLUMN IF NOT EXISTS created_at TIMESTAMP NOT NULL DEFAULT NOW();`);
    await pool.query(`ALTER TABLE duel_confirmations ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NOT NULL DEFAULT NOW();`);
    await pool.query(`CREATE UNIQUE INDEX IF NOT EXISTS duel_confirmations_match_player_idx ON duel_confirmations(match_id, player_id);`);
    await pool.query(`CREATE UNIQUE INDEX IF NOT EXISTS duel_confirmations_match_discord_idx ON duel_confirmations(match_id, discord_id);`);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS duel_ratings (
        id SERIAL PRIMARY KEY,
        discord_id TEXT NOT NULL UNIQUE,
        username TEXT NOT NULL DEFAULT '',
        prefix TEXT NOT NULL DEFAULT '',
        rating INTEGER NOT NULL DEFAULT 1000,
        wins INTEGER NOT NULL DEFAULT 0,
        losses INTEGER NOT NULL DEFAULT 0,
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
    await pool.query(`ALTER TABLE duel_ratings ADD COLUMN IF NOT EXISTS discord_id TEXT;`);
    await pool.query(`ALTER TABLE duel_ratings ADD COLUMN IF NOT EXISTS username TEXT NOT NULL DEFAULT '';`);
    await pool.query(`ALTER TABLE duel_ratings ADD COLUMN IF NOT EXISTS prefix TEXT NOT NULL DEFAULT '';`);
    await pool.query(`ALTER TABLE duel_ratings ADD COLUMN IF NOT EXISTS rating INTEGER NOT NULL DEFAULT 1000;`);
    await pool.query(`ALTER TABLE duel_ratings ADD COLUMN IF NOT EXISTS wins INTEGER NOT NULL DEFAULT 0;`);
    await pool.query(`ALTER TABLE duel_ratings ADD COLUMN IF NOT EXISTS losses INTEGER NOT NULL DEFAULT 0;`);
    await pool.query(`ALTER TABLE duel_ratings ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NOT NULL DEFAULT NOW();`);
    await pool.query(`CREATE UNIQUE INDEX IF NOT EXISTS duel_ratings_discord_id_idx ON duel_ratings(discord_id);`);
  });
}
