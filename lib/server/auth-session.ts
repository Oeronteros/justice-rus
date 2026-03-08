import { verifyToken } from '@/lib/auth';
import { ensureAccountsSchema } from '@/lib/auth/accounts';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { getCachedTableColumns } from '@/lib/server/db-cache';
import { User } from '@/types';

export type SessionFailureReason =
  | 'missing-token'
  | 'invalid-token'
  | 'account-state-unavailable'
  | 'inactive-account';

export type SessionResolution =
  | {
      valid: true;
      user: User;
    }
  | {
      valid: false;
      reason: SessionFailureReason;
    };

async function resolveClassName(nickname: string | undefined): Promise<string | null> {
  if (!nickname || !hasDatabaseUrl()) {
    return null;
  }

  const pool = getPool();
  const names = await getCachedTableColumns('registrations');
  const nickCol = names.has('nick') ? 'nick' : names.has('nickname') ? 'nickname' : null;
  const classCol = names.has('class_name') ? 'class_name' : names.has('class') ? 'class' : null;
  if (!nickCol || !classCol) {
    return null;
  }

  const result = await pool.query(
    `SELECT ${classCol} AS class_name FROM registrations WHERE LOWER(${nickCol}) = LOWER($1) LIMIT 1`,
    [nickname]
  );

  return result.rows[0]?.class_name || null;
}

export async function resolveSessionFromToken(token: string | null | undefined): Promise<SessionResolution> {
  if (!token) {
    return {
      valid: false,
      reason: 'missing-token',
    };
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return {
      valid: false,
      reason: 'invalid-token',
    };
  }

  let user: User = {
    id: decoded.id,
    nickname: decoded.nickname,
    role: decoded.role,
    isActive: decoded.isActive ?? true,
    authMethod: decoded.authMethod ?? 'account',
    discordId: decoded.discordId,
    discordHandle: decoded.discordHandle,
    className: null,
  };

  if (decoded.authMethod !== 'pin') {
    if (!decoded.id || !hasDatabaseUrl()) {
      return {
        valid: false,
        reason: 'account-state-unavailable',
      };
    }

    await ensureAccountsSchema();
    const pool = getPool();
    const result = await pool.query(
      `
      SELECT id, nickname, class_name, discord_handle, role, is_active
      FROM portal_account
      WHERE id = $1
      LIMIT 1
      `,
      [decoded.id]
    );

    const row = result.rows[0];
    if (!row || !row.is_active) {
      return {
        valid: false,
        reason: 'inactive-account',
      };
    }

    user = {
      id: String(row.id),
      nickname: row.nickname,
      role: row.role,
      isActive: true,
      authMethod: 'account',
      discordId: decoded.discordId,
      discordHandle: row.discord_handle || null,
      className: (await resolveClassName(row.nickname)) || row.class_name || null,
    };
  } else {
    user.className = await resolveClassName(decoded.nickname);
  }

  return {
    valid: true,
    user,
  };
}
