// API Route: /api/discord-proxy/schedule
// Прокси для получения расписания через Discord бота
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getAuthToken } from '@/lib/auth/request';
import { getPool, hasDatabaseUrl } from '@/lib/neon';

export const runtime = 'nodejs';

const DISCORD_BOT_API_URL = process.env.DISCORD_BOT_API_URL || 'http://localhost:3001';
const bypassHeader: Record<string, string> = (DISCORD_BOT_API_URL.includes('.loca.lt') || DISCORD_BOT_API_URL.includes('.localtunnel.me'))
  ? { 'bypass-tunnel-reminder': '1' }
  : {};

async function queryScheduleFromDb() {
  const pool = getPool();
  const tableCheck = await pool.query(
    `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('schedule', 'shedule') ORDER BY table_name = 'schedule' DESC LIMIT 1`
  );
  const tableName = tableCheck.rows[0]?.table_name || 'schedule';

  try {
    const result = await pool.query(
      `
      SELECT day_type, time, title_ru, title_en, group_name
      FROM ${tableName}
      WHERE active = 1
      ORDER BY order_index ASC, time ASC
      `
    );

    const today = new Date().toISOString();
    return result.rows.map((row) => ({
      date: today,
      registration: row.title_ru || row.title_en || '',
      type: row.day_type || '',
      description: row.time ? String(row.time) : '',
      group: row.group_name || '',
    }));
  } catch {
    const legacy = await pool.query(
      `
      SELECT date, registration, type, description
      FROM ${tableName}
      ORDER BY date ASC, registration ASC
      `
    );

    return legacy.rows.map((row) => ({
      date: row.date ? String(row.date) : new Date().toISOString(),
      registration: row.registration || '',
      type: row.type || '',
      description: row.description || '',
      group: '',
    }));
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = getAuthToken(request);

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (hasDatabaseUrl()) {
      const data = await queryScheduleFromDb();

      return NextResponse.json(data);
    }

    const response = await fetch(`${DISCORD_BOT_API_URL}/api/schedule`, {
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
          error: 'Failed to fetch schedule from Discord bot',
          message: errorData.error || errorData.message || `HTTP ${response.status}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying schedule request to Discord bot:', error);
    return NextResponse.json(
      {
        error: 'Failed to connect to Discord bot',
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
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

