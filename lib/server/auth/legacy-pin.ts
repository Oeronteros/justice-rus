import type { NextRequest } from 'next/server';
import type { UserRole } from '@/lib/schemas/auth';
import type { AuthResponse } from '@/lib/schemas/auth';
import { safeEqual } from '@/lib/auth';
import { PASSWORDS } from '@/lib/constants';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { getCachedTableColumns } from '@/lib/server/db-cache';

export function legacyPinRole(password: string): UserRole | null {
  if (safeEqual(password, PASSWORDS.member)) return 'member';
  if (safeEqual(password, PASSWORDS.officer)) return 'officer';
  if (safeEqual(password, PASSWORDS.head)) return 'head';
  if (safeEqual(password, PASSWORDS.sysadmin)) return 'sysadmin';
  return null;
}

function isLocalHost(value: string | null | undefined): boolean {
  if (!value) return false;

  return ['localhost', '127.0.0.1', '[::1]', '::1'].some((host) => value.includes(host));
}

export function canUseDevNicknameFallback(request: NextRequest): boolean {
  if (process.env.NODE_ENV !== 'production') {
    return true;
  }

  return isLocalHost(request.headers.get('host')) || isLocalHost(request.headers.get('origin'));
}

export async function buildLegacyUser(role: UserRole, nickname?: string): Promise<AuthResponse['user']> {
  return {
    id: `pin-${role}`,
    nickname: nickname || `${role.toUpperCase()} PIN`,
    role,
    isActive: true,
    authMethod: 'pin',
    discordHandle: null,
    className: (await resolveClassName(nickname)) || null,
    prefix: null,
  };
}

export async function resolveClassName(nickname: string | undefined): Promise<string | null> {
  if (!nickname || !hasDatabaseUrl()) return null;

  const pool = getPool();
  const names = await getCachedTableColumns('registrations');
  const nickCol = names.has('nick') ? 'nick' : names.has('nickname') ? 'nickname' : null;
  const classCol = names.has('class_name') ? 'class_name' : names.has('class') ? 'class' : null;
  if (!nickCol || !classCol) return null;

  const result = await pool.query(
    `SELECT ${classCol} AS class_name FROM registrations WHERE LOWER(${nickCol}) = LOWER($1) LIMIT 1`,
    [nickname]
  );
  return result.rows[0]?.class_name || null;
}
