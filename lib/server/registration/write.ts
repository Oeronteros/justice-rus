import { ensureAccountsSchema } from '@/lib/auth/accounts';
import { hasRoleAtLeast } from '@/lib/authz';
import { getPool } from '@/lib/neon';
import type { User } from '@/types';
import type { UpdateRegistrationStatsPayload } from './contracts';
import { type PortalOnlyRow, pick, portalStatsDiscordId } from './shared';
import { ensureActivityRow, ensureRegistrationStatsSchema, getTableColumns } from './schema';

type RegistrationTarget = {
  row: Record<string, unknown> | null;
  nickCol: string;
  classCol: string | null;
  discordCol: string | null;
  guildCol: string | null;
};

export class RegistrationUpdateError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = 'RegistrationUpdateError';
  }
}

async function resolveRegistrationTarget(nickname: string): Promise<RegistrationTarget> {
  const pool = getPool();
  const registrationColumns = await getTableColumns('registrations');
  const nickCol = pick(registrationColumns, 'nick', 'nickname');
  const classCol = pick(registrationColumns, 'class_name', 'class');
  const discordCol = pick(registrationColumns, 'discord_login', 'discord', 'discord_id');
  const guildCol = pick(registrationColumns, 'guild_name', 'guild');

  if (!nickCol) {
    throw new Error('Nickname column not found');
  }

  const result = await pool.query(
    `
      SELECT
        ${discordCol ? `${discordCol} AS discord_id,` : `'' AS discord_id,`}
        ${nickCol} AS nickname
      FROM registrations
      WHERE LOWER(${nickCol}) = LOWER($1)
      LIMIT 1
    `,
    [nickname]
  );

  return {
    row: result.rows[0] || null,
    nickCol,
    classCol,
    discordCol,
    guildCol,
  };
}

async function updatePortalAccountProfile(
  nickname: string,
  next: { className?: string; guild?: string; discordHandle?: string }
) {
  const pool = getPool();
  await ensureAccountsSchema();
  const updates: string[] = [];
  const values: string[] = [nickname];

  if (next.className !== undefined) {
    values.push(next.className);
    updates.push(`class_name = $${values.length}`);
  }

  if (next.guild !== undefined) {
    values.push(next.guild);
    updates.push(`guild_name = $${values.length}`);
  }

  if (next.discordHandle !== undefined) {
    values.push(next.discordHandle);
    updates.push(`discord_handle = $${values.length}`);
  }

  if (updates.length === 0) {
    return;
  }

  await pool.query(
    `UPDATE portal_account SET ${updates.join(', ')}, updated_at = NOW() WHERE LOWER(nickname) = LOWER($1)`,
    values
  );
}

async function resolvePortalAccount(nickname: string): Promise<PortalOnlyRow | null> {
  const pool = getPool();
  await ensureAccountsSchema();
  const result = await pool.query(
    `
      SELECT id, nickname, class_name, role, is_active, created_at
      FROM portal_account
      WHERE LOWER(nickname) = LOWER($1)
      LIMIT 1
    `,
    [nickname]
  );

  return (result.rows[0] as PortalOnlyRow | undefined) || null;
}

export async function updateRegistrationStats(
  payload: UpdateRegistrationStatsPayload,
  decoded: User,
  isKnownClassName: (className: string) => Promise<boolean>
): Promise<{ portalOnly: boolean }> {
  await ensureRegistrationStatsSchema();

  if (payload.className !== undefined && !(await isKnownClassName(payload.className))) {
    throw new RegistrationUpdateError('Unknown class selected', 400);
  }

  const isOfficer = hasRoleAtLeast(decoded.role, 'officer');
  const isSelf = payload.nickname.toLowerCase() === String(decoded.nickname || '').toLowerCase();

  if (!isOfficer && !isSelf) {
    throw new RegistrationUpdateError('Forbidden', 403);
  }

  if (!isOfficer && (payload.bounty !== undefined || payload.elo !== undefined)) {
    throw new RegistrationUpdateError('Forbidden', 403);
  }

  const pool = getPool();
  const target = await resolveRegistrationTarget(payload.nickname);
  const portalAccount = target.row ? null : await resolvePortalAccount(payload.nickname);

  if (!target.row && !portalAccount) {
    throw new RegistrationUpdateError('Registration target was not found', 404);
  }

  let statsDiscordId = target.row
    ? String(target.row.discord_id || '')
    : portalAccount
      ? portalStatsDiscordId(portalAccount.id)
      : '';
  const wantsLinkedStatsUpdate = [
    payload.outerHeroic,
    payload.innerHeroic,
    payload.crimsonSands,
    payload.abyss,
    payload.gvg,
    payload.secretRealm,
    payload.mmr20,
    payload.elo,
    payload.bounty,
  ].some((value) => value !== undefined);

  if (!statsDiscordId && wantsLinkedStatsUpdate) {
    throw new RegistrationUpdateError(
      target.row
        ? 'Registration row is missing Discord identifier for PvP/activity stats'
        : 'Portal account exists, but stats identity could not be resolved',
      409
    );
  }

  if (payload.className !== undefined || payload.guild !== undefined || payload.discordHandle !== undefined) {
    await updatePortalAccountProfile(payload.nickname, {
      className: payload.className,
      guild: payload.guild,
      discordHandle: payload.discordHandle,
    });
  }

  if (payload.discordHandle !== undefined && target.row && target.discordCol) {
    const nextDiscordIdentity = payload.discordHandle.trim();
    const previousDiscordIdentity = String(target.row.discord_id || '').trim();

    if (nextDiscordIdentity && nextDiscordIdentity !== previousDiscordIdentity) {
      await pool.query(
        `UPDATE registrations SET ${target.discordCol} = $2 WHERE LOWER(${target.nickCol}) = LOWER($1)`,
        [payload.nickname, nextDiscordIdentity]
      );

      const activityColumns = await getTableColumns('activity_kpi');
      if (activityColumns.has('discord_id')) {
        await pool.query(
          `UPDATE activity_kpi SET discord_id = $1, username = $3, updated_at = NOW() WHERE discord_id = $2`,
          [nextDiscordIdentity, previousDiscordIdentity, payload.nickname]
        ).catch(() => undefined);
      }

      if (statsDiscordId === previousDiscordIdentity) {
        statsDiscordId = nextDiscordIdentity;
      }
    }
  }

  if (payload.className !== undefined && target.row && target.classCol) {
    await pool.query(
      `UPDATE registrations SET ${target.classCol} = $2 WHERE LOWER(${target.nickCol}) = LOWER($1)`,
      [payload.nickname, payload.className]
    );
  }

  if (payload.guild !== undefined && target.row && target.guildCol) {
    await pool.query(
      `UPDATE registrations SET ${target.guildCol} = $2 WHERE LOWER(${target.nickCol}) = LOWER($1)`,
      [payload.nickname, payload.guild]
    );
  }

  const activityColumns = await getTableColumns('activity_kpi');
  const duelColumns = await getTableColumns('duel_ratings');

  if (activityColumns.size > 0 && statsDiscordId) {
    const today = await ensureActivityRow(statsDiscordId, payload.nickname);
    const updates: string[] = [];
    const values: unknown[] = [statsDiscordId, today, payload.nickname];

    const assignActivity = (columnCandidates: string[], value: number | undefined) => {
      if (value === undefined) {
        return;
      }

      const column = pick(activityColumns, ...columnCandidates);
      if (!column) {
        return;
      }

      values.push(value);
      updates.push(`${column} = $${values.length}`);
    };

    assignActivity(['outer_city_heroic'], payload.outerHeroic);
    assignActivity(['inner_city'], payload.innerHeroic);
    assignActivity(['chronicles'], payload.crimsonSands);
    assignActivity(['abyss'], payload.abyss);
    assignActivity(['gvg'], payload.gvg);
    assignActivity(['secret_realm'], payload.secretRealm);
    assignActivity(['mvp_20', 'mmr20', 'best_mmr_pvp', 'pvp_mmr20'], payload.mmr20);
    assignActivity(['bounty'], payload.bounty);

    if (updates.length > 0) {
      await pool.query(
        `
          UPDATE activity_kpi
          SET username = $3, ${updates.join(', ')}, updated_at = NOW()
          WHERE discord_id = $1 AND activity_date = $2
        `,
        values
      );
    }
  }

  if (payload.elo !== undefined && isOfficer && duelColumns.size > 0 && statsDiscordId) {
    const ratingCol = pick(duelColumns, 'rating');
    const winsCol = pick(duelColumns, 'wins');
    const lossesCol = pick(duelColumns, 'losses');

    if (ratingCol) {
      await pool.query(
        `
          INSERT INTO duel_ratings (discord_id, ${ratingCol}${winsCol ? `, ${winsCol}` : ''}${lossesCol ? `, ${lossesCol}` : ''})
          VALUES ($1, $2${winsCol ? ', 0' : ''}${lossesCol ? ', 0' : ''})
          ON CONFLICT (discord_id) DO UPDATE
          SET ${ratingCol} = EXCLUDED.${ratingCol}, updated_at = NOW()
        `,
        [statsDiscordId, payload.elo]
      );
    }
  }

  return { portalOnly: !target.row };
}
