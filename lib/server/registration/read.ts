import { getPool } from '@/lib/neon';
import type { Registration } from '@/lib/schemas/registration';
import {
  getRegistrationAvatarUrl,
  syncPortalMemberAvatarSeeds,
} from './avatar';
import {
  buildComputedRows,
  type PortalOnlyRow,
  type RegistrationRow,
  isoDate,
  numericValue,
  pick,
  portalStatsDiscordId,
} from './shared';
import { ensureRegistrationStatsSchema, getTableColumns } from './schema';

function pvpRatingValue(value: unknown): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1000;
}

async function withAvatars(rows: RegistrationRow[]): Promise<Registration[]> {
  const avatarMap = await syncPortalMemberAvatarSeeds(
    rows.map((row) => ({
      nickname: row.nickname,
      discordId: row.discord,
      discordHandle: row.discordHandle || null,
      avatarUrl: row.avatarUrl || null,
    }))
  );

  return buildComputedRows(
    rows.map((row) => ({
      ...row,
      avatarUrl: getRegistrationAvatarUrl(row.nickname, avatarMap),
    }))
  );
}

async function getPortalOnlyRows(
  activityColumns: Set<string>,
  duelColumns: Set<string>
): Promise<RegistrationRow[]> {
  const pool = getPool();
  const outerHeroicCol = pick(activityColumns, 'outer_city_heroic');
  const innerHeroicCol = pick(activityColumns, 'inner_city');
  const crimsonSandsCol = pick(activityColumns, 'chronicles');
  const abyssCol = pick(activityColumns, 'abyss');
  const bountyCol = pick(activityColumns, 'bounty');
  const gvgCol = pick(activityColumns, 'gvg');
  const mmrCol = pick(activityColumns, 'mvp_20', 'mmr20', 'best_mmr_pvp', 'pvp_mmr20');
  const secretRealmCol = pick(activityColumns, 'secret_realm');
  const duelRatingCol = pick(duelColumns, 'rating');
  const duelWinsCol = pick(duelColumns, 'wins');
  const duelLossesCol = pick(duelColumns, 'losses');

  const portalActivityJoin = activityColumns.size > 0
    ? `
      LEFT JOIN LATERAL (
        SELECT
          ${outerHeroicCol ? `${outerHeroicCol} AS outer_heroic,` : '0 AS outer_heroic,'}
          ${innerHeroicCol ? `${innerHeroicCol} AS inner_heroic,` : '0 AS inner_heroic,'}
          ${crimsonSandsCol ? `${crimsonSandsCol} AS crimson_sands,` : '0 AS crimson_sands,'}
          ${abyssCol ? `${abyssCol} AS abyss_score,` : '0 AS abyss_score,'}
          ${bountyCol ? `${bountyCol} AS bounty_score,` : '0 AS bounty_score,'}
          ${gvgCol ? `${gvgCol} AS gvg_score,` : '0 AS gvg_score,'}
          ${mmrCol ? `${mmrCol} AS best_mmr,` : '0 AS best_mmr,'}
          ${secretRealmCol ? `${secretRealmCol} AS secret_realm_score` : '0 AS secret_realm_score'}
        FROM activity_kpi
        WHERE discord_id = CONCAT('portal:', pa.id::text)
        ORDER BY activity_date DESC NULLS LAST, updated_at DESC NULLS LAST
        LIMIT 1
      ) pak ON TRUE
    `
    : '';

  const portalDuelJoin = duelColumns.size > 0
    ? `
      LEFT JOIN LATERAL (
        SELECT
          rating,
          wins,
          losses
        FROM duel_ratings
        WHERE discord_id = CONCAT('portal:', pa.id::text)
          OR LOWER(username) = LOWER(pa.nickname)
        ORDER BY
          CASE WHEN discord_id = CONCAT('portal:', pa.id::text) THEN 0 ELSE 1 END,
          updated_at DESC NULLS LAST
        LIMIT 1
      ) pdr ON TRUE
    `
    : '';

  const result = await pool.query(
    `
      SELECT
        pa.id,
        pa.nickname,
        pa.class_name,
        pa.guild_name,
        pa.discord_handle,
        pa.role,
        pa.is_active,
        pa.created_at,
        ${portalActivityJoin ? 'COALESCE(pak.outer_heroic, 0) AS outer_heroic,' : '0 AS outer_heroic,'}
        ${portalActivityJoin ? 'COALESCE(pak.inner_heroic, 0) AS inner_heroic,' : '0 AS inner_heroic,'}
        ${portalActivityJoin ? 'COALESCE(pak.crimson_sands, 0) AS crimson_sands,' : '0 AS crimson_sands,'}
        ${portalActivityJoin ? 'COALESCE(pak.abyss_score, 0) AS abyss_score,' : '0 AS abyss_score,'}
        ${portalActivityJoin ? 'COALESCE(pak.bounty_score, 0) AS bounty_score,' : '0 AS bounty_score,'}
        ${portalActivityJoin ? 'COALESCE(pak.gvg_score, 0) AS gvg_score,' : '0 AS gvg_score,'}
        ${portalActivityJoin ? 'COALESCE(pak.best_mmr, 0) AS best_mmr,' : '0 AS best_mmr,'}
        ${portalActivityJoin ? 'COALESCE(pak.secret_realm_score, 0) AS secret_realm_score,' : '0 AS secret_realm_score,'}
        ${duelRatingCol ? `COALESCE(pdr.${duelRatingCol}, 0) AS duel_rating,` : '0 AS duel_rating,'}
        ${duelWinsCol ? `COALESCE(pdr.${duelWinsCol}, 0) AS duel_wins,` : '0 AS duel_wins,'}
        ${duelLossesCol ? `COALESCE(pdr.${duelLossesCol}, 0) AS duel_losses` : '0 AS duel_losses'}
      FROM portal_account pa
      ${portalActivityJoin}
      ${portalDuelJoin}
      ORDER BY pa.created_at DESC
    `
  ).catch(() => ({ rows: [] as PortalOnlyRow[] }));

  return result.rows.map((row) => ({
    discord: portalStatsDiscordId(row.id),
    discordHandle: String(row.discord_handle || '') || null,
    avatarUrl: null,
    nickname: String(row.nickname || ''),
    rank: String(row.role || 'guest') as Registration['rank'],
    class: String(row.class_name || ''),
    guild: String(row.guild_name || ''),
    joinDate: isoDate(row.created_at),
    elo: pvpRatingValue(row.duel_rating),
    mmr20: numericValue(row.best_mmr),
    bounty: numericValue(row.bounty_score),
    marks: 0,
    outerHeroic: numericValue(row.outer_heroic),
    innerHeroic: numericValue(row.inner_heroic),
    crimsonSands: numericValue(row.crimson_sands),
    abyss: numericValue(row.abyss_score),
    gvg: numericValue(row.gvg_score),
    secretRealm: numericValue(row.secret_realm_score),
    duelWins: numericValue(row.duel_wins),
    duelLosses: numericValue(row.duel_losses),
    status: row.is_active ? 'active' : 'inactive',
  } satisfies RegistrationRow));
}

export async function getRegistrationsFromDb(): Promise<Registration[]> {
  const pool = getPool();
  await ensureRegistrationStatsSchema();

  const registrationColumns = await getTableColumns('registrations');
  const activityColumns = await getTableColumns('activity_kpi');
  const duelColumns = await getTableColumns('duel_ratings');
  const portalOnlyRows = await getPortalOnlyRows(activityColumns, duelColumns);

  if (registrationColumns.size === 0) {
    return withAvatars(portalOnlyRows);
  }

  const discordCol = pick(registrationColumns, 'discord_login', 'discord', 'discord_id');
  const nickCol = pick(registrationColumns, 'nick', 'nickname');
  const classCol = pick(registrationColumns, 'class_name', 'class');
  const guildCol = pick(registrationColumns, 'guild_name', 'guild');
  const avatarCol = pick(registrationColumns, 'avatar_url', 'profile_image', 'image_url');
  const joinCol = pick(registrationColumns, 'created_at', 'join_date', 'joined_at');

  if (!nickCol) {
    return buildComputedRows(portalOnlyRows);
  }

  const outerHeroicCol = pick(activityColumns, 'outer_city_heroic');
  const innerHeroicCol = pick(activityColumns, 'inner_city');
  const crimsonSandsCol = pick(activityColumns, 'chronicles');
  const abyssCol = pick(activityColumns, 'abyss');
  const bountyCol = pick(activityColumns, 'bounty');
  const gvgCol = pick(activityColumns, 'gvg');
  const mmrCol = pick(activityColumns, 'mvp_20', 'mmr20', 'best_mmr_pvp', 'pvp_mmr20');
  const secretRealmCol = pick(activityColumns, 'secret_realm');
  const activityUsernameCol = pick(activityColumns, 'username', 'user_name', 'nickname');

  const duelRatingCol = pick(duelColumns, 'rating');
  const duelWinsCol = pick(duelColumns, 'wins');
  const duelLossesCol = pick(duelColumns, 'losses');

  const activityJoin = discordCol && activityColumns.size > 0
    ? `
      LEFT JOIN LATERAL (
        SELECT
          ${outerHeroicCol ? `${outerHeroicCol} AS outer_heroic,` : '0 AS outer_heroic,'}
          ${innerHeroicCol ? `${innerHeroicCol} AS inner_heroic,` : '0 AS inner_heroic,'}
          ${crimsonSandsCol ? `${crimsonSandsCol} AS crimson_sands,` : '0 AS crimson_sands,'}
          ${abyssCol ? `${abyssCol} AS abyss_score,` : '0 AS abyss_score,'}
          ${bountyCol ? `${bountyCol} AS bounty_score,` : '0 AS bounty_score,'}
          ${gvgCol ? `${gvgCol} AS gvg_score,` : '0 AS gvg_score,'}
          ${mmrCol ? `${mmrCol} AS best_mmr,` : '0 AS best_mmr,'}
          ${secretRealmCol ? `${secretRealmCol} AS secret_realm_score` : '0 AS secret_realm_score'}
        FROM activity_kpi
        WHERE discord_id = r.${discordCol}${activityUsernameCol ? ` OR LOWER(${activityUsernameCol}) = LOWER(r.${nickCol})` : ''}
        ORDER BY activity_date DESC NULLS LAST, updated_at DESC NULLS LAST
        LIMIT 1
      ) ak ON TRUE
    `
    : '';

  const duelJoin = duelColumns.size > 0
    ? `
      LEFT JOIN LATERAL (
        SELECT
          rating,
          wins,
          losses
        FROM duel_ratings
        WHERE ${discordCol ? `discord_id = r.${discordCol} OR ` : ''}LOWER(username) = LOWER(r.${nickCol})
        ORDER BY
          ${discordCol ? `CASE WHEN discord_id = r.${discordCol} THEN 0 ELSE 1 END,` : ''}
          updated_at DESC NULLS LAST
        LIMIT 1
      ) dr ON TRUE
    `
    : '';

  const query = `
    SELECT
      ${discordCol ? `COALESCE(r.${discordCol}, '') AS discord,` : `'' AS discord,`}
      ${avatarCol ? `NULLIF(r.${avatarCol}, '') AS avatar_url,` : `NULL AS avatar_url,`}
      r.${nickCol} AS nickname,
      NULLIF(a.discord_handle, '') AS discord_handle,
      ${classCol ? `COALESCE(NULLIF(r.${classCol}, ''), a.class_name, '') AS class_name,` : `COALESCE(a.class_name, '') AS class_name,`}
      ${guildCol ? `COALESCE(NULLIF(r.${guildCol}, ''), a.guild_name, '') AS guild_name,` : `COALESCE(a.guild_name, '') AS guild_name,`}
      ${joinCol ? `r.${joinCol} AS join_date,` : `NOW() AS join_date,`}
      COALESCE(a.role, 'guest') AS role,
      CASE WHEN a.is_active IS FALSE THEN 'inactive' ELSE 'active' END AS account_status,
      ${activityJoin ? 'COALESCE(ak.outer_heroic, 0) AS outer_heroic,' : '0 AS outer_heroic,'}
      ${activityJoin ? 'COALESCE(ak.inner_heroic, 0) AS inner_heroic,' : '0 AS inner_heroic,'}
      ${activityJoin ? 'COALESCE(ak.crimson_sands, 0) AS crimson_sands,' : '0 AS crimson_sands,'}
      ${activityJoin ? 'COALESCE(ak.abyss_score, 0) AS abyss_score,' : '0 AS abyss_score,'}
      ${activityJoin ? 'COALESCE(ak.bounty_score, 0) AS bounty_score,' : '0 AS bounty_score,'}
      ${activityJoin ? 'COALESCE(ak.gvg_score, 0) AS gvg_score,' : '0 AS gvg_score,'}
      ${activityJoin ? 'COALESCE(ak.best_mmr, 0) AS best_mmr,' : '0 AS best_mmr,'}
      ${activityJoin ? 'COALESCE(ak.secret_realm_score, 0) AS secret_realm_score,' : '0 AS secret_realm_score,'}
      ${duelRatingCol ? `COALESCE(dr.${duelRatingCol}, 0) AS duel_rating,` : '0 AS duel_rating,'}
      ${duelWinsCol ? `COALESCE(dr.${duelWinsCol}, 0) AS duel_wins,` : '0 AS duel_wins,'}
      ${duelLossesCol ? `COALESCE(dr.${duelLossesCol}, 0) AS duel_losses` : '0 AS duel_losses'}
    FROM registrations r
    LEFT JOIN portal_account a ON LOWER(a.nickname) = LOWER(r.${nickCol})
    ${activityJoin}
    ${duelJoin}
    ORDER BY r.${joinCol || nickCol} DESC
  `;

  const result = await pool.query(query);

  const baseRows: RegistrationRow[] = result.rows.map((row) => ({
    discord: String(row.discord || ''),
    discordHandle: typeof row.discord_handle === 'string' && row.discord_handle.trim() ? String(row.discord_handle) : null,
    avatarUrl: typeof row.avatar_url === 'string' && row.avatar_url.trim() ? String(row.avatar_url) : null,
    nickname: String(row.nickname || ''),
    rank: String(row.role || 'guest') as Registration['rank'],
    class: String(row.class_name || ''),
    guild: String(row.guild_name || ''),
    joinDate: isoDate(row.join_date),
    elo: pvpRatingValue(row.duel_rating),
    mmr20: numericValue(row.best_mmr),
    bounty: numericValue(row.bounty_score),
    marks: 0,
    outerHeroic: numericValue(row.outer_heroic),
    innerHeroic: numericValue(row.inner_heroic),
    crimsonSands: numericValue(row.crimson_sands),
    abyss: numericValue(row.abyss_score),
    gvg: numericValue(row.gvg_score),
    secretRealm: numericValue(row.secret_realm_score),
    duelWins: numericValue(row.duel_wins),
    duelLosses: numericValue(row.duel_losses),
    status: row.account_status === 'inactive' ? 'inactive' : 'active',
  }));

  const activeBaseRows = baseRows.filter((row) => row.status !== 'inactive');
  const activePortalOnlyRows = portalOnlyRows.filter((row) => row.status !== 'inactive');
  const seenNicknames = new Set(activeBaseRows.map((row) => row.nickname.toLowerCase()));
  const orphanPortalRows = activePortalOnlyRows.filter(
    (row) => !seenNicknames.has(row.nickname.toLowerCase())
  );

  return withAvatars([...activeBaseRows, ...orphanPortalRows]);
}
