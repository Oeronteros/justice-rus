// API Route: /api/discord-proxy/registration
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyToken } from '@/lib/auth';
import { ensureAccountsSchema } from '@/lib/auth/accounts';
import { hasRoleAtLeast } from '@/lib/authz';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { isKnownClassName } from '@/lib/classes';

export const runtime = 'nodejs';

const DISCORD_BOT_API_URL = process.env.DISCORD_BOT_API_URL || 'http://localhost:3001';
const bypassHeader: Record<string, string> =
  DISCORD_BOT_API_URL.includes('.loca.lt') || DISCORD_BOT_API_URL.includes('.localtunnel.me')
    ? { 'bypass-tunnel-reminder': '1' }
    : {};

const updateStatsSchema = z.object({
  nickname: z.string().trim().min(1),
  className: z.string().trim().min(1).max(100).optional(),
  elo: z.number().optional(),
  mmr20: z.number().optional(),
  bounty: z.number().optional(),
  outerHeroic: z.number().optional(),
  innerHeroic: z.number().optional(),
  crimsonSands: z.number().optional(),
  abyss: z.number().optional(),
  gvg: z.number().optional(),
  secretRealm: z.number().optional(),
});

type RegistrationRow = {
  discord: string;
  nickname: string;
  rank: string;
  class: string;
  guild: string;
  joinDate: string;
  elo: number;
  mmr20: number;
  bounty: number;
  marks: number;
  outerHeroic: number;
  innerHeroic: number;
  crimsonSands: number;
  abyss: number;
  gvg: number;
  secretRealm: number;
  duelWins: number;
  duelLosses: number;
  status: 'active' | 'inactive';
};

type PortalOnlyRow = {
  id: number | string;
  nickname: string;
  class_name: string | null;
  role: string;
  is_active: boolean;
  created_at: Date | string;
};

function getAuthToken(request: NextRequest): string | null {
  const headerToken = request.headers.get('authorization');
  const cookieToken = request.cookies.get('auth_token')?.value;
  return cookieToken || (headerToken && headerToken.startsWith('Bearer ') ? headerToken.slice(7) : null) || null;
}

async function getTableColumns(tableName: string): Promise<Set<string>> {
  const pool = getPool();
  const result = await pool.query(
    `
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = $1
    `,
    [tableName]
  );

  return new Set(result.rows.map((row) => String(row.column_name).toLowerCase()));
}

async function tableExists(tableName: string): Promise<boolean> {
  const pool = getPool();
  const result = await pool.query(
    `
      SELECT 1
      FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = $1
      LIMIT 1
    `,
    [tableName]
  );

  return Boolean(result.rowCount);
}

function pick(columns: Set<string>, ...candidates: string[]): string | null {
  return candidates.find((candidate) => columns.has(candidate.toLowerCase())) || null;
}

function numericValue(value: unknown): number {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : 0;
}

function isoDate(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (typeof value === 'string' && value.trim()) {
    return value;
  }
  return new Date().toISOString();
}

function buildComputedRows(rows: RegistrationRow[]) {
  const averageMmr = rows.length > 0 ? rows.reduce((sum, row) => sum + row.mmr20, 0) / rows.length : 0;

  return rows.map((row) => {
    const marks =
      row.outerHeroic +
      row.innerHeroic +
      row.crimsonSands +
      row.abyss +
      row.gvg +
      row.secretRealm;
    const modifier = averageMmr > 0 && row.mmr20 < averageMmr * 0.7 ? -2 : 1;

    return {
      ...row,
      marks,
      kpi: marks + row.bounty + modifier,
    };
  });
}

async function ensurePortalActivityColumns() {
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
}

async function ensureDuelRatingsSchema() {
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
}

async function ensureRegistrationStatsSchema() {
  await ensureAccountsSchema();
  await ensurePortalActivityColumns();
  await ensureDuelRatingsSchema();
}

async function getRegistrationsFromDb() {
  const pool = getPool();
  await ensureRegistrationStatsSchema();

  const registrationColumns = await getTableColumns('registrations');
  if (registrationColumns.size === 0) {
    return [];
  }

  const activityColumns = await getTableColumns('activity_kpi');
  const duelColumns = await getTableColumns('duel_ratings');

  const discordCol = pick(registrationColumns, 'discord_login', 'discord', 'discord_id');
  const nickCol = pick(registrationColumns, 'nick', 'nickname');
  const classCol = pick(registrationColumns, 'class_name', 'class');
  const guildCol = pick(registrationColumns, 'guild_name', 'guild');
  const joinCol = pick(registrationColumns, 'created_at', 'join_date', 'joined_at');

  if (!nickCol) {
    throw new Error('registrations table missing nickname column');
  }

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
        WHERE discord_id = r.${discordCol}
        ORDER BY activity_date DESC NULLS LAST, updated_at DESC NULLS LAST, id DESC NULLS LAST
        LIMIT 1
      ) ak ON TRUE
    `
    : '';

  const duelJoin = discordCol && duelColumns.size > 0
    ? `
      LEFT JOIN duel_ratings dr ON dr.discord_id = r.${discordCol}
    `
    : '';

  const query = `
    SELECT
      ${discordCol ? `COALESCE(r.${discordCol}, '') AS discord,` : `'' AS discord,`}
      r.${nickCol} AS nickname,
      ${classCol ? `COALESCE(NULLIF(r.${classCol}, ''), a.class_name, '') AS class_name,` : `COALESCE(a.class_name, '') AS class_name,`}
      ${guildCol ? `COALESCE(r.${guildCol}, '') AS guild_name,` : `'' AS guild_name,`}
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

  const [result, portalAccounts] = await Promise.all([
    pool.query(query),
    pool.query(
      `
      SELECT id, nickname, class_name, role, is_active, created_at
      FROM portal_account
      ORDER BY created_at DESC
      `
    ).catch(() => ({ rows: [] as PortalOnlyRow[] })),
  ]);

  const baseRows: RegistrationRow[] = result.rows.map((row) => ({
    discord: String(row.discord || ''),
    nickname: String(row.nickname || ''),
    rank: String(row.role || 'guest'),
    class: String(row.class_name || ''),
    guild: String(row.guild_name || ''),
    joinDate: isoDate(row.join_date),
    elo: numericValue(row.duel_rating),
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

  const seenNicknames = new Set(baseRows.map((row) => row.nickname.toLowerCase()));
  const portalOnlyRows = portalAccounts.rows
    .filter((row) => !seenNicknames.has(String(row.nickname || '').toLowerCase()))
    .map((row) => ({
      discord: `portal:${row.id}`,
      nickname: String(row.nickname || ''),
      rank: String(row.role || 'guest'),
      class: String(row.class_name || ''),
      guild: '',
      joinDate: isoDate(row.created_at),
      elo: 0,
      mmr20: 0,
      bounty: 0,
      marks: 0,
      outerHeroic: 0,
      innerHeroic: 0,
      crimsonSands: 0,
      abyss: 0,
      gvg: 0,
      secretRealm: 0,
      duelWins: 0,
      duelLosses: 0,
      status: row.is_active ? 'active' : 'inactive',
    } satisfies RegistrationRow));

  return buildComputedRows([...baseRows, ...portalOnlyRows]);
}

async function resolveRegistrationTarget(nickname: string) {
  const pool = getPool();
  const registrationColumns = await getTableColumns('registrations');
  const nickCol = pick(registrationColumns, 'nick', 'nickname');
  const classCol = pick(registrationColumns, 'class_name', 'class');
  const discordCol = pick(registrationColumns, 'discord_login', 'discord', 'discord_id');

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
  };
}

async function updatePortalAccountClass(nickname: string, className: string) {
  const pool = getPool();
  await ensureAccountsSchema();
  await pool.query(
    `UPDATE portal_account SET class_name = $2, updated_at = NOW() WHERE LOWER(nickname) = LOWER($1)`,
    [nickname, className]
  );
}

async function ensureActivityRow(discordId: string, nickname: string) {
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

export async function GET(request: NextRequest) {
  try {
    const token = getAuthToken(request);
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (hasDatabaseUrl()) {
      const data = await getRegistrationsFromDb();
      return NextResponse.json(data);
    }

    const response = await fetch(`${DISCORD_BOT_API_URL}/api/users`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...bypassHeader,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})) as Record<string, unknown>;
      return NextResponse.json(
        {
          error: 'Failed to fetch users from Discord bot',
          message: String(errorData.error || errorData.message || `HTTP ${response.status}`),
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying registration request to Discord bot:', error);
    return NextResponse.json(
      {
        error: 'Failed to connect to Discord bot',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const token = getAuthToken(request);
    const decoded = token ? verifyToken(token) : null;
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!hasDatabaseUrl()) {
      return NextResponse.json({ error: 'Database is not configured' }, { status: 503 });
    }

    await ensureRegistrationStatsSchema();

    const payload = updateStatsSchema.parse(await request.json());
    if (payload.className !== undefined && !(await isKnownClassName(payload.className))) {
      return NextResponse.json({ error: 'Unknown class selected' }, { status: 400 });
    }
    const isOfficer = hasRoleAtLeast(decoded.role, 'officer');
    const isSelf = payload.nickname.toLowerCase() === String(decoded.nickname || '').toLowerCase();

    if (!isOfficer && !isSelf) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (!isOfficer && (payload.bounty !== undefined || payload.elo !== undefined)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const pool = getPool();
    const target = await resolveRegistrationTarget(payload.nickname);
    if (!target.row) {
      if (payload.className !== undefined) {
        await updatePortalAccountClass(payload.nickname, payload.className);
      }

      const unsupportedPortalOnlyFields = [
        payload.outerHeroic,
        payload.innerHeroic,
        payload.crimsonSands,
        payload.abyss,
        payload.gvg,
        payload.secretRealm,
        payload.mmr20,
        payload.elo,
        payload.bounty,
      ].some((value) => value !== undefined && value !== 0);

      if (unsupportedPortalOnlyFields) {
        return NextResponse.json(
          { error: 'Portal account exists, but Neon registration row is not linked yet for PvP/activity stats' },
          { status: 409 }
        );
      }

      return NextResponse.json({ success: true, portalOnly: true });
    }

    if (payload.className !== undefined && target.classCol) {
      await updatePortalAccountClass(payload.nickname, payload.className);
      await pool.query(
        `UPDATE registrations SET ${target.classCol} = $2 WHERE LOWER(${target.nickCol}) = LOWER($1)`,
        [payload.nickname, payload.className]
      );
    }

    const activityColumns = await getTableColumns('activity_kpi');
    const duelColumns = await getTableColumns('duel_ratings');

    if (activityColumns.size > 0 && target.discordCol) {
      const discordId = String(target.row.discord_id || '');
      if (discordId) {
        const today = await ensureActivityRow(discordId, payload.nickname);
        const updates: string[] = [];
        const values: unknown[] = [discordId, today, payload.nickname];

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
    }

    if (payload.elo !== undefined && isOfficer && duelColumns.size > 0 && target.discordCol) {
      const discordId = String(target.row.discord_id || '');
      if (discordId) {
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
            [discordId, payload.elo]
          );
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 });
    }

    console.error('Error updating registration stats:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        error: message || 'Failed to update registration stats',
        code: 'REGISTRATION_STATS_UPDATE_FAILED',
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
