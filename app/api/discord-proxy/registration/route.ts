// API Route: /api/discord-proxy/registration
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { ensureAccountsSchema } from '@/lib/auth/accounts';
import { hasRoleAtLeast } from '@/lib/authz';
import { z } from 'zod';

export const runtime = 'nodejs';

const DISCORD_BOT_API_URL = process.env.DISCORD_BOT_API_URL || 'http://localhost:3001';
const bypassHeader: Record<string, string> =
  DISCORD_BOT_API_URL.includes('.loca.lt') || DISCORD_BOT_API_URL.includes('.localtunnel.me')
    ? { 'bypass-tunnel-reminder': '1' }
    : {};

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

function pick(columns: Set<string>, ...candidates: string[]): string | null {
  return candidates.find((name) => columns.has(name.toLowerCase())) || null;
}

function numericValue(value: unknown): number {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

const updateStatsSchema = z.object({
  nickname: z.string().trim().min(1),
  kpi: z.number().optional(),
  elo: z.number().optional(),
  mmr20: z.number().optional(),
  bounty: z.number().optional(),
  marks: z.number().optional(),
});

async function getRegistrationsFromDb() {
  const pool = getPool();
  const registrationColumns = await getTableColumns('registrations');
  await ensureAccountsSchema();

  const discordCol = pick(registrationColumns, 'discord_login', 'discord', 'discord_id');
  const nickCol = pick(registrationColumns, 'nick', 'nickname');
  const classCol = pick(registrationColumns, 'class_name', 'class');
  const guildCol = pick(registrationColumns, 'guild_name', 'guild');
  const joinCol = pick(registrationColumns, 'created_at', 'join_date', 'joined_at');
  const kpiCol = pick(registrationColumns, 'kpi');
  const eloCol = pick(registrationColumns, 'elo_duels', 'elo', 'duel_elo');
  const mmrCol = pick(registrationColumns, 'mmr20', 'best_mmr_pvp', 'pvp_mmr20');
  const bountyCol = pick(registrationColumns, 'bounty', 'bounty_done', 'bounty_count');
  const marksCol = pick(registrationColumns, 'marks', 'mark_count', 'points');

  if (!nickCol) {
    throw new Error('registrations table missing nickname column');
  }

  const result = await pool.query(`
    SELECT
      ${discordCol ? `r.${discordCol} AS discord,` : `'' AS discord,`}
      r.${nickCol} AS nickname,
      ${classCol ? `r.${classCol} AS class_name,` : `'' AS class_name,`}
      ${guildCol ? `r.${guildCol} AS guild_name,` : `'' AS guild_name,`}
      ${joinCol ? `r.${joinCol} AS join_date,` : `NOW() AS join_date,`}
      ${kpiCol ? `r.${kpiCol} AS kpi,` : `0 AS kpi,`}
      ${eloCol ? `r.${eloCol} AS elo,` : `0 AS elo,`}
      ${mmrCol ? `r.${mmrCol} AS mmr20,` : `0 AS mmr20,`}
      ${bountyCol ? `r.${bountyCol} AS bounty,` : `0 AS bounty,`}
      ${marksCol ? `r.${marksCol} AS marks,` : `0 AS marks,`}
      COALESCE(a.role, 'guest') AS role,
      CASE WHEN a.is_active IS FALSE THEN 'inactive' ELSE 'active' END AS account_status
    FROM registrations r
    LEFT JOIN portal_account a ON LOWER(a.nickname) = LOWER(r.${nickCol})
    ORDER BY r.${joinCol || nickCol} DESC
  `);

  return result.rows.map((row) => ({
    discord: row.discord || '',
    nickname: row.nickname || '',
    rank: row.role || 'guest',
    class: row.class_name || '',
    guild: row.guild_name || '',
    joinDate: row.join_date?.toISOString?.() || row.join_date || '',
    kpi: numericValue(row.kpi),
    elo: numericValue(row.elo),
    mmr20: numericValue(row.mmr20),
    bounty: numericValue(row.bounty),
    marks: numericValue(row.marks),
    status: row.account_status === 'inactive' ? 'inactive' : 'active',
  }));
}

export async function GET(request: NextRequest) {
  try {
    const headerToken = request.headers.get('authorization');
    const cookieToken = request.cookies.get('auth_token')?.value;
    const token = cookieToken || (headerToken && headerToken.startsWith('Bearer ') ? headerToken.slice(7) : null);

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
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          error: 'Failed to fetch users from Discord bot',
          message: (errorData as any).error || (errorData as any).message || `HTTP ${response.status}`,
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
    const headerToken = request.headers.get('authorization');
    const cookieToken = request.cookies.get('auth_token')?.value;
    const token = cookieToken || (headerToken && headerToken.startsWith('Bearer ') ? headerToken.slice(7) : null);
    const decoded = token ? verifyToken(token) : null;

    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!hasRoleAtLeast(decoded.role, 'officer')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (!hasDatabaseUrl()) {
      return NextResponse.json({ error: 'Database is not configured' }, { status: 503 });
    }

    const payload = updateStatsSchema.parse(await request.json());
    const pool = getPool();
    const columns = await getTableColumns('registrations');
    const nickCol = pick(columns, 'nick', 'nickname');
    if (!nickCol) {
      return NextResponse.json({ error: 'Nickname column not found' }, { status: 500 });
    }

    const sets: string[] = [];
    const values: unknown[] = [payload.nickname];

    const assignIfExists = (preferred: string[], value: number | undefined) => {
      if (value === undefined) return;
      const column = pick(columns, ...preferred);
      if (!column) return;
      values.push(value);
      sets.push(`${column} = $${values.length}`);
    };

    assignIfExists(['kpi'], payload.kpi);
    assignIfExists(['elo_duels', 'elo', 'duel_elo'], payload.elo);
    assignIfExists(['mmr20', 'best_mmr_pvp', 'pvp_mmr20'], payload.mmr20);
    assignIfExists(['bounty', 'bounty_done', 'bounty_count'], payload.bounty);
    assignIfExists(['marks', 'mark_count', 'points'], payload.marks);

    if (sets.length === 0) {
      return NextResponse.json({ error: 'No editable registration stat columns found' }, { status: 400 });
    }

    values.push(payload.nickname);
    const result = await pool.query(
      `UPDATE registrations SET ${sets.join(', ')} WHERE LOWER(${nickCol}) = LOWER($${values.length}) RETURNING ${nickCol} AS nickname`,
      values
    );

    if (!result.rows[0]) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 });
    }

    console.error('Error updating registration stats:', error);
    return NextResponse.json({ error: 'Failed to update registration stats' }, { status: 500 });
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
