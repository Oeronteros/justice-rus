import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { UserRole } from '@/types';
import { getPool } from '@/lib/neon';

export type AccountRecord = {
  id: number;
  nickname: string;
  class_name?: string | null;
  role: UserRole;
  is_active: boolean;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
  last_login_at: Date | null;
};

const HASH_KEY_LENGTH = 64;

export async function ensureAccountsSchema() {
  const pool = getPool();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS portal_account (
      id SERIAL PRIMARY KEY,
      nickname TEXT NOT NULL,
      class_name TEXT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'guest',
      is_active BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
      last_login_at TIMESTAMP NULL,
      CONSTRAINT portal_account_role_chk CHECK (role IN ('guest', 'member', 'officer', 'head', 'sysadmin'))
    );
  `);

  await pool.query(`ALTER TABLE portal_account DROP CONSTRAINT IF EXISTS portal_account_role_chk;`);
  await pool.query(`ALTER TABLE portal_account ADD COLUMN IF NOT EXISTS class_name TEXT NULL;`).catch(() => undefined);
  await pool.query(`ALTER TABLE portal_account ALTER COLUMN role SET DEFAULT 'guest';`);
  await pool.query(`UPDATE portal_account SET role = 'head' WHERE role = 'gm';`).catch(() => undefined);
  await pool.query(`
    ALTER TABLE portal_account
    ADD CONSTRAINT portal_account_role_chk
    CHECK (role IN ('guest', 'member', 'officer', 'head', 'sysadmin'));
  `).catch(() => undefined);

  await pool.query(`
    CREATE UNIQUE INDEX IF NOT EXISTS portal_account_nickname_uq
    ON portal_account ((LOWER(nickname)));
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS portal_account_active_idx
    ON portal_account (is_active);
  `);
}

export function normalizeNickname(nickname: string): string {
  return nickname.trim().replace(/\s+/g, ' ');
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, HASH_KEY_LENGTH).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, expectedHash] = storedHash.split(':');
  if (!salt || !expectedHash) return false;

  const actualHash = scryptSync(password, salt, HASH_KEY_LENGTH).toString('hex');
  const actual = Buffer.from(actualHash, 'hex');
  const expected = Buffer.from(expectedHash, 'hex');

  if (actual.length !== expected.length) return false;
  return timingSafeEqual(actual, expected);
}

export function toPublicAccount(record: AccountRecord) {
  return {
    id: String(record.id),
    nickname: record.nickname,
    role: record.role,
    isActive: Boolean(record.is_active),
    createdAt: (record.created_at || new Date()).toISOString(),
    lastLoginAt: record.last_login_at ? new Date(record.last_login_at).toISOString() : null,
  };
}
