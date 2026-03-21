import { verifyToken } from '@/lib/auth';
import { ensureAccountsSchema } from '@/lib/auth/accounts';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { getCachedTableColumns } from '@/lib/server/db-cache';
import type { User } from '@/lib/schemas/auth';
import type { NotificationDefaults, ProfileInterest } from '@/lib/schemas/registration';

function parseStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((entry): entry is string => typeof entry === 'string' && entry.trim().length > 0);
}

function parseInterests(value: unknown): ProfileInterest[] {
  const interests = parseStringArray(value);
  return interests.filter((entry): entry is ProfileInterest => (
    entry === 'pvp' ||
    entry === 'absences-planning' ||
    entry === 'raid-prep' ||
    entry === 'matchmaking' ||
    entry === 'mentoring'
  ));
}

function parseNotificationDefaults(value: unknown): NotificationDefaults | undefined {
  if (!value || typeof value !== 'object') {
    return undefined;
  }

  const source = value as Partial<NotificationDefaults>;
  if (
    typeof source.helpRequests !== 'boolean' ||
    typeof source.absenceApprovals !== 'boolean' ||
    typeof source.pvpMatches !== 'boolean' ||
    typeof source.eventReminders !== 'boolean'
  ) {
    return undefined;
  }

  return {
    helpRequests: source.helpRequests,
    absenceApprovals: source.absenceApprovals,
    pvpMatches: source.pvpMatches,
    eventReminders: source.eventReminders,
  };
}

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

function isPortalAccountId(value: string | undefined): value is string {
  return Boolean(value && /^\d+$/.test(value));
}

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
    prefix: decoded.prefix ?? null,
    profileTitle: decoded.profileTitle ?? null,
    preferredClasses: decoded.preferredClasses ?? [],
    interests: decoded.interests ?? [],
    notificationDefaults: decoded.notificationDefaults,
  };

  if (decoded.authMethod !== 'pin') {
    if (!isPortalAccountId(decoded.id) || !hasDatabaseUrl()) {
      return {
        valid: false,
        reason: 'account-state-unavailable',
      };
    }

    await ensureAccountsSchema();
    const pool = getPool();
    const result = await pool.query(
      `
      SELECT id, nickname, class_name, discord_handle, prefix, profile_title, preferred_classes, interests, notification_defaults, role, is_active
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
      prefix: row.prefix || null,
      profileTitle: row.profile_title || null,
      preferredClasses: parseStringArray(row.preferred_classes),
      interests: parseInterests(row.interests),
      notificationDefaults: parseNotificationDefaults(row.notification_defaults),
    };
  } else {
    user.className = await resolveClassName(decoded.nickname);
  }

  return {
    valid: true,
    user,
  };
}

export function resolveSessionFromTokenStateless(token: string | null | undefined): SessionResolution {
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

  return {
    valid: true,
    user: {
      ...decoded,
      className: decoded.className ?? null,
      prefix: decoded.prefix ?? null,
    },
  };
}
