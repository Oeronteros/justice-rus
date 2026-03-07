import { NextRequest } from 'next/server';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { getAuthToken } from '@/lib/auth/request';

export async function resolveRosterClassName(nickname: string | undefined): Promise<string | null> {
  if (!nickname || !hasDatabaseUrl()) return null;

  const pool = getPool();
  const columns = await pool.query(
    `SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'registrations'`
  );
  const names = new Set(columns.rows.map((row) => String(row.column_name).toLowerCase()));
  const nickCol = names.has('nick') ? 'nick' : names.has('nickname') ? 'nickname' : null;
  const classCol = names.has('class_name') ? 'class_name' : names.has('class') ? 'class' : null;
  if (!nickCol || !classCol) return null;

  const result = await pool.query(
    `SELECT ${classCol} AS class_name FROM registrations WHERE LOWER(${nickCol}) = LOWER($1) LIMIT 1`,
    [nickname]
  );
  return result.rows[0]?.class_name || null;
}

export async function ensureHelpSchema() {
  const pool = getPool();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS help_requests (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      details TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'general',
      author TEXT NOT NULL DEFAULT 'unknown',
      status TEXT NOT NULL DEFAULT 'open',
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`ALTER TABLE help_requests ADD COLUMN IF NOT EXISTS author_user_id TEXT;`);
  await pool.query(`ALTER TABLE help_requests ADD COLUMN IF NOT EXISTS gathering_start TIMESTAMP;`);
  await pool.query(`ALTER TABLE help_requests ADD COLUMN IF NOT EXISTS gathering_end TIMESTAMP;`);

  await pool.query(`CREATE INDEX IF NOT EXISTS help_requests_status_idx ON help_requests(status);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS help_requests_created_at_idx ON help_requests(created_at DESC);`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS help_request_responders (
      id SERIAL PRIMARY KEY,
      request_id INTEGER NOT NULL REFERENCES help_requests(id) ON DELETE CASCADE,
      responder_user_id TEXT NOT NULL,
      responder_nickname TEXT NOT NULL,
      responder_class TEXT NOT NULL DEFAULT '',
      responded_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(
    `CREATE UNIQUE INDEX IF NOT EXISTS help_request_responders_unique_idx ON help_request_responders(request_id, responder_user_id);`
  );
  await pool.query(
    `CREATE INDEX IF NOT EXISTS help_request_responders_request_idx ON help_request_responders(request_id);`
  );
}
