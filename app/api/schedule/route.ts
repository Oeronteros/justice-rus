import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { verifyToken } from '@/lib/auth';
import { getAuthToken } from '@/lib/auth/request';
import { canManageAccounts } from '@/lib/authz';
import { createScheduleSchema, updateScheduleSchema } from '@/lib/schemas/schedule';
import { getCachedTableColumns, getPreferredTableName } from '@/lib/server/db-cache';
import {
  fetchScheduleDirect,
  getScheduleReadModel,
  refreshScheduleReadModelAfterWrite,
} from '@/lib/server/read-models/schedule';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const BOT_API_URL =
  process.env.BOT_API_URL || process.env.DISCORD_BOT_API_URL || 'http://localhost:3001';
const BOT_API_KEY = process.env.BOT_API_KEY || process.env.DISCORD_BOT_API_KEY;

const bypassHeader: Record<string, string> =
  BOT_API_URL.includes('.loca.lt') || BOT_API_URL.includes('.localtunnel.me')
    ? { 'bypass-tunnel-reminder': '1' }
    : {};

async function getScheduleTableName() {
  return getPreferredTableName('schedule', ['shedule']);
}

async function getScheduleColumns(tableName: string) {
  return getCachedTableColumns(tableName);
}

function getLanguageScheduleTitle(row: Record<string, unknown>, language: string) {
  if (language === 'zh') return String(row.title_zh || row.title_en || row.title_ru || row.title || '');
  if (language === 'ru') return String(row.title_ru || row.title_en || row.title_zh || row.title || '');
  return String(row.title_en || row.title_ru || row.title_zh || row.title || '');
}

function toScheduleItem(row: Record<string, unknown>, language: string) {
  const activeValue = row.active;
  const active = typeof activeValue === 'boolean'
    ? activeValue
    : activeValue === undefined || activeValue === null
      ? true
      : Number(activeValue) !== 0;

  return {
    id: row.id == null ? undefined : String(row.id),
    date: new Date().toISOString(),
    registration: getLanguageScheduleTitle(row, language),
    type: String(row.day_type || row.type || ''),
    description: row.time ? String(row.time) : String(row.description || ''),
    group: String(row.day_type || row.group_name || row.type || ''),
    dayType: row.day_type ? String(row.day_type) : undefined,
    time: row.time ? String(row.time) : undefined,
    titleRu: row.title_ru ? String(row.title_ru) : undefined,
    titleEn: row.title_en ? String(row.title_en) : undefined,
    titleZh: row.title_zh ? String(row.title_zh) : undefined,
    orderIndex: row.order_index == null ? undefined : Number(row.order_index),
    active,
  };
}

async function queryScheduleFromDb(language: string) {
  const pool = getPool();
  const tableName = await getScheduleTableName();
  const columns = await getScheduleColumns(tableName);
  try {
    const result = await pool.query(
      `
      SELECT
        id,
        day_type,
        time,
        title_ru,
        title_en,
        ${columns.has('title_zh') ? 'title_zh,' : `'' AS title_zh,`}
        ${columns.has('order_index') ? 'order_index,' : '0 AS order_index,'}
        ${columns.has('active') ? 'active' : '1 AS active'}
      FROM ${tableName}
      ${columns.has('active') ? 'WHERE COALESCE(active, 1) = 1' : ''}
      ORDER BY day_type ASC, order_index ASC, time ASC
      `
    );
    return result.rows.map((row) => toScheduleItem(row, language));
  } catch (err) {
    console.error('Error querying schedule table, falling back:', err);
    const result = await pool.query(
      `
      SELECT date, registration, type, description
      FROM ${tableName}
      ORDER BY date ASC, registration ASC
      `
    );
    return result.rows.map((row) => ({
      date: row.date ? String(row.date) : new Date().toISOString(),
      registration: String(row.registration || ''),
      type: String(row.type || ''),
      description: String(row.description || ''),
      group: '',
      active: true,
    }));
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'ru';

    if (hasDatabaseUrl()) {
      try {
        const data = await getScheduleReadModel(language);
        if (data.length > 0) {
          return NextResponse.json(data);
        }
      } catch (readModelError) {
        console.error('Schedule read model failed, falling back to direct source:', readModelError);
      }
    }

    if (!BOT_API_KEY) {
      console.warn('No BOT_API_KEY configured, returning empty schedule');
      return NextResponse.json([]);
    }

    const data = await fetchScheduleDirect(language);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Unhandled error in schedule route:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
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

    const payload = createScheduleSchema.parse(await request.json());
    const pool = getPool();
    const tableName = await getScheduleTableName();
    const columns = await getScheduleColumns(tableName);

    if (!columns.has('day_type') || !columns.has('title_ru') || !columns.has('title_en')) {
      return NextResponse.json({ error: 'Schedule table does not support creating entries' }, { status: 409 });
    }

    const insertColumns = ['day_type', 'time', 'title_ru', 'title_en'];
    const values: unknown[] = [payload.dayType, payload.time, payload.titleRu, payload.titleEn];

    if (columns.has('title_zh')) {
      insertColumns.push('title_zh');
      values.push(payload.titleZh || '');
    }

    if (columns.has('order_index')) {
      insertColumns.push('order_index');
      values.push(payload.orderIndex);
    }

    if (columns.has('active')) {
      insertColumns.push('active');
      values.push(payload.active ? 1 : 0);
    }

    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');
    const created = await pool.query(
      `
      INSERT INTO ${tableName} (${insertColumns.join(', ')})
      VALUES (${placeholders})
      RETURNING id, day_type, time, title_ru, title_en, ${columns.has('title_zh') ? 'title_zh,' : `'' AS title_zh,`} ${columns.has('order_index') ? 'order_index,' : '0 AS order_index,'} ${columns.has('active') ? 'active' : '1 AS active'}
      `,
      values
    );

    const row = created.rows[0];
    if (!row) {
      return NextResponse.json({ error: 'Failed to create schedule entry' }, { status: 500 });
    }

    await refreshScheduleReadModelAfterWrite();

    return NextResponse.json(toScheduleItem(row, 'ru'), { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 });
    }

    console.error('Error creating schedule entry:', error);
    return NextResponse.json({ error: 'Failed to create schedule entry' }, { status: 500 });
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

    const payload = updateScheduleSchema.parse(await request.json());
    const pool = getPool();
    const tableName = await getScheduleTableName();
    const columns = await getScheduleColumns(tableName);

    if (!columns.has('id') || !columns.has('day_type') || !columns.has('title_ru') || !columns.has('title_en')) {
      return NextResponse.json({ error: 'Schedule table does not support editing' }, { status: 409 });
    }

    const updates = [
      'day_type = $1',
      'time = $2',
      'title_ru = $3',
      'title_en = $4',
    ];
    const values: unknown[] = [payload.dayType, payload.time, payload.titleRu, payload.titleEn];

    if (columns.has('title_zh')) {
      values.push(payload.titleZh || '');
      updates.push(`title_zh = $${values.length}`);
    }

    if (columns.has('order_index')) {
      values.push(payload.orderIndex);
      updates.push(`order_index = $${values.length}`);
    }

    if (columns.has('active')) {
      values.push(payload.active ? 1 : 0);
      updates.push(`active = $${values.length}`);
    }

    values.push(payload.id);
    const whereIdIndex = values.length;

    const updated = await pool.query(
      `
      UPDATE ${tableName}
      SET ${updates.join(', ')}
      WHERE id = $${whereIdIndex}
      RETURNING id, day_type, time, title_ru, title_en, ${columns.has('title_zh') ? 'title_zh,' : `'' AS title_zh,`} ${columns.has('order_index') ? 'order_index,' : '0 AS order_index,'} ${columns.has('active') ? 'active' : '1 AS active'}
      `,
      values
    );

    const row = updated.rows[0];
    if (!row) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    await refreshScheduleReadModelAfterWrite();

    return NextResponse.json(toScheduleItem(row, 'ru'));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 });
    }

    console.error('Error updating schedule:', error);
    return NextResponse.json({ error: 'Failed to update schedule' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-API-KEY, Authorization',
    },
  });
}
