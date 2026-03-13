import { getPool } from '@/lib/neon';
import type { User } from '@/lib/schemas/auth';
import { getCachedTableColumns } from '@/lib/server/db-cache';
import { PvpError } from '@/lib/server/pvp/errors';
import type { Actor } from '@/lib/server/pvp/types';

export function actorIdFromUser(user: User | null): string | null {
  if (!user) return null;
  return user.discordId || user.id || user.nickname || null;
}

export function requireActorId(user: User): string {
  const actorId = actorIdFromUser(user);
  if (!actorId) {
    throw new PvpError('Player identity is unavailable', 400);
  }
  return actorId;
}

export async function resolveActor(user: User): Promise<Actor> {
  const actorId = requireActorId(user);
  const pool = getPool();
  let className = '';
  let prefix = user.prefix || '';

  const names = await getCachedTableColumns('registrations');
  const nickCol = names.has('nick') ? 'nick' : names.has('nickname') ? 'nickname' : null;
  const classCol = names.has('class_name') ? 'class_name' : names.has('class') ? 'class' : null;
  const prefixCol = names.has('prefix') ? 'prefix' : null;

  if (nickCol && user.nickname) {
    const selectedColumns = [
      classCol ? `${classCol} AS class_name` : `'' AS class_name`,
      prefixCol ? `${prefixCol} AS prefix` : `'' AS prefix`,
    ].join(', ');
    const registration = await pool.query(
      `SELECT ${selectedColumns} FROM registrations WHERE LOWER(${nickCol}) = LOWER($1) LIMIT 1`,
      [user.nickname]
    );
    className = String(registration.rows[0]?.class_name || '');
    prefix = String(registration.rows[0]?.prefix || prefix || '');
  }

  return {
    id: actorId,
    nickname: user.nickname || user.discordId || user.id || 'Unknown duelist',
    prefix,
    className,
  };
}
