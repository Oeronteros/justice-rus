import { getPool, hasDatabaseUrl } from '@/lib/neon';
import type { User } from '@/lib/schemas/auth';
import type { Schedule } from '@/lib/schemas/schedule';
import { canManageAccounts } from '@/lib/authz';
import { getCachedTableColumns, getPreferredTableName } from '@/lib/server/db-cache';
import {
  fetchScheduleDirect,
  getScheduleReadModel,
  refreshScheduleReadModelAfterWrite,
} from '@/lib/server/read-models/schedule';

class ScheduleError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
    this.name = 'ScheduleError';
  }
}

const BOT_API_KEY = process.env.BOT_API_KEY || process.env.DISCORD_BOT_API_KEY;

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

function toScheduleItem(row: Record<string, unknown>, language: string): Schedule {
  const activeValue = row.active;
  const active =
    typeof activeValue === 'boolean'
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

function ensureScheduleWriter(user: User) {
  if (!canManageAccounts(user.role)) {
    throw new ScheduleError('Forbidden', 403);
  }
}

export async function listSchedule(language: string): Promise<Schedule[]> {
  if (hasDatabaseUrl()) {
    try {
      const data = await getScheduleReadModel(language);
      if (data.length > 0) {
        return data;
      }
    } catch (error) {
      console.error('Schedule read model failed, falling back to direct source:', error);
    }
  }

  if (!BOT_API_KEY) {
    return [];
  }

  return fetchScheduleDirect(language);
}

type ScheduleWritePayload = {
  dayType: string;
  time: string;
  titleRu: string;
  titleEn: string;
  titleZh?: string;
  orderIndex?: number;
  active?: boolean;
};

type ScheduleUpdatePayload = ScheduleWritePayload & {
  id: string;
};

export async function createScheduleEntry(payload: ScheduleWritePayload, user: User): Promise<Schedule> {
  ensureScheduleWriter(user);

  if (!hasDatabaseUrl()) {
    throw new ScheduleError('Database is not configured', 503);
  }

  const pool = getPool();
  const tableName = await getScheduleTableName();
  const columns = await getScheduleColumns(tableName);

  if (!columns.has('day_type') || !columns.has('title_ru') || !columns.has('title_en')) {
    throw new ScheduleError('Schedule table does not support creating entries', 409);
  }

  const insertColumns = ['day_type', 'time', 'title_ru', 'title_en'];
  const values: unknown[] = [payload.dayType, payload.time, payload.titleRu, payload.titleEn];

  if (columns.has('title_zh')) {
    insertColumns.push('title_zh');
    values.push(payload.titleZh || '');
  }

  if (columns.has('order_index')) {
    insertColumns.push('order_index');
    values.push(payload.orderIndex ?? 0);
  }

  if (columns.has('active')) {
    insertColumns.push('active');
    values.push((payload.active ?? true) ? 1 : 0);
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
    throw new ScheduleError('Failed to create schedule entry', 500);
  }

  await refreshScheduleReadModelAfterWrite();
  return toScheduleItem(row, 'ru');
}

export async function updateScheduleEntry(payload: ScheduleUpdatePayload, user: User): Promise<Schedule> {
  ensureScheduleWriter(user);

  if (!hasDatabaseUrl()) {
    throw new ScheduleError('Database is not configured', 503);
  }

  const pool = getPool();
  const tableName = await getScheduleTableName();
  const columns = await getScheduleColumns(tableName);

  if (!columns.has('id') || !columns.has('day_type') || !columns.has('title_ru') || !columns.has('title_en')) {
    throw new ScheduleError('Schedule table does not support editing', 409);
  }

  const updates = ['day_type = $1', 'time = $2', 'title_ru = $3', 'title_en = $4'];
  const values: unknown[] = [payload.dayType, payload.time, payload.titleRu, payload.titleEn];

  if (columns.has('title_zh')) {
    values.push(payload.titleZh || '');
    updates.push(`title_zh = $${values.length}`);
  }

  if (columns.has('order_index')) {
    values.push(payload.orderIndex ?? 0);
    updates.push(`order_index = $${values.length}`);
  }

  if (columns.has('active')) {
    values.push((payload.active ?? true) ? 1 : 0);
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
    throw new ScheduleError('Not found', 404);
  }

  await refreshScheduleReadModelAfterWrite();
  return toScheduleItem(row, 'ru');
}
