// API Route: /api/discord-proxy/absences
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getAuthToken } from '@/lib/auth/request';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { createAbsenceSchema, updateAbsenceStatusSchema } from '@/lib/schemas/absence';
import { canManageAccounts } from '@/lib/authz';
import { z } from 'zod';

export const runtime = 'nodejs';

const DISCORD_BOT_API_URL = process.env.DISCORD_BOT_API_URL || 'http://localhost:3001';
const bypassHeader: Record<string, string> =
  DISCORD_BOT_API_URL.includes('.loca.lt') || DISCORD_BOT_API_URL.includes('.localtunnel.me')
    ? { 'bypass-tunnel-reminder': '1' }
    : {};

function normalizeStatus(status: string | null | undefined): 'pending' | 'approved' | 'rejected' {
  if (status === 'approved') return 'approved';
  if (status === 'rejected') return 'rejected';
  return 'pending';
}

async function getAbsencesFromDb() {
  const pool = getPool();

  try {
    const result = await pool.query(
      `
      SELECT id, member, start_date, end_date, reason, status, created_at
      FROM absences
      ORDER BY created_at DESC
      `
    );

    return result.rows.map((row) => ({
      id: String(row.id),
      member: row.member || '',
      startDate: row.start_date ? String(row.start_date) : '',
      endDate: row.end_date ? String(row.end_date) : '',
      reason: row.reason || '',
      status: normalizeStatus(row.status),
    }));
  } catch {
    const legacy = await pool.query(
      `
      SELECT a.id, a.user_id, a.reason, a.absence_date, a.absence_period, a.created_at,
             r.nick
      FROM absences a
      LEFT JOIN registrations r ON r.discord_login = a.user_id
      ORDER BY a.created_at DESC
      `
    );

    return legacy.rows.map((row) => ({
      id: String(row.id),
      member: row.nick || row.user_id || '',
      startDate: row.absence_date ? String(row.absence_date) : '',
      endDate: row.absence_date ? String(row.absence_date) : '',
      reason: row.reason || '',
      status: 'approved' as const,
    }));
  }
}

async function ensureAbsenceStatusColumn() {
  const pool = getPool();
  await pool.query(`ALTER TABLE absences ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'pending';`).catch(() => undefined);
}

export async function GET(request: NextRequest) {
  try {
    const token = getAuthToken(request);
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (hasDatabaseUrl()) {
      await ensureAbsenceStatusColumn();
      const data = await getAbsencesFromDb();
      return NextResponse.json(data);
    }

    const response = await fetch(`${DISCORD_BOT_API_URL}/api/absences`, {
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
          error: 'Failed to fetch absences from Discord bot',
          message: (errorData as any).error || (errorData as any).message || `HTTP ${response.status}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying absences request to Discord bot:', error);
    return NextResponse.json(
      {
        error: 'Failed to connect to Discord bot',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = getAuthToken(request);
    const decoded = token ? verifyToken(token) : null;
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = createAbsenceSchema.parse(await request.json());
    const member = payload.member?.trim() || decoded.nickname || decoded.discordId || decoded.role;

    if (hasDatabaseUrl()) {
      const pool = getPool();
      await ensureAbsenceStatusColumn();

      try {
        const inserted = await pool.query(
          `
          INSERT INTO absences (member, start_date, end_date, reason, status, created_at)
          VALUES ($1, $2, $3, $4, 'pending', NOW())
          RETURNING id, member, start_date, end_date, reason, status
          `,
          [member, payload.startDate, payload.endDate, payload.reason]
        );

        const row = inserted.rows[0];
        return NextResponse.json(
          {
            id: String(row.id),
            member: row.member || member,
            startDate: row.start_date ? String(row.start_date) : payload.startDate,
            endDate: row.end_date ? String(row.end_date) : payload.endDate,
            reason: row.reason || payload.reason,
            status: normalizeStatus(row.status),
          },
          { status: 201 }
        );
      } catch {
        const insertedLegacy = await pool.query(
          `
          INSERT INTO absences (user_id, reason, absence_date, absence_period, created_at)
          VALUES ($1, $2, $3, $4, NOW())
          RETURNING id, user_id, reason, absence_date
          `,
          [member, payload.reason, payload.startDate, `${payload.startDate} - ${payload.endDate}`]
        );

        const row = insertedLegacy.rows[0];
        return NextResponse.json(
          {
            id: String(row.id),
            member,
            startDate: row.absence_date ? String(row.absence_date) : payload.startDate,
            endDate: payload.endDate,
            reason: row.reason || payload.reason,
            status: 'pending',
          },
          { status: 201 }
        );
      }
    }

    const response = await fetch(`${DISCORD_BOT_API_URL}/api/absences`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...bypassHeader,
      },
      body: JSON.stringify({
        member,
        startDate: payload.startDate,
        endDate: payload.endDate,
        reason: payload.reason,
      }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return NextResponse.json(
        {
          error: 'Failed to create absence in Discord bot',
          message: (data as any).error || (data as any).message || `HTTP ${response.status}`,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 });
    }

    console.error('Error creating absence:', error);
    return NextResponse.json(
      {
        error: 'Failed to create absence',
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

    if (!canManageAccounts(decoded.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (!hasDatabaseUrl()) {
      return NextResponse.json({ error: 'Database is not configured' }, { status: 503 });
    }

    const payload = updateAbsenceStatusSchema.parse(await request.json());
    const pool = getPool();
    await ensureAbsenceStatusColumn();

    const updated = await pool.query(
      `
      UPDATE absences
      SET status = $2
      WHERE id = $1
      RETURNING id
      `,
      [payload.id, payload.status]
    );

    if ((updated.rowCount || 0) === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const data = await getAbsencesFromDb();
    const item = data.find((absence) => absence.id === payload.id);
    if (!item) {
      return NextResponse.json({ error: 'Updated absence not found' }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 });
    }

    console.error('Error updating absence:', error);
    return NextResponse.json(
      {
        error: 'Failed to update absence',
        message: error instanceof Error ? error.message : 'Unknown error',
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
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
