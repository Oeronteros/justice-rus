import { type Schedule } from '@/lib/schemas/schedule';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import {
  getCachedTableColumns,
  getPreferredTableName,
  getExpiringValue,
} from '@/lib/server/db-cache';
import { getReadModelFetchErrorMessage, getReadModelTunnelBypassHeaders } from './runtime';

const BOT_SCHEDULE_CACHE_TTL_MS = 30_000;
const BOT_API_URL = process.env.BOT_API_URL || process.env.DISCORD_BOT_API_URL || 'http://localhost:3001';
const BOT_API_KEY = process.env.BOT_API_KEY || process.env.DISCORD_BOT_API_KEY;
const bypassHeader = getReadModelTunnelBypassHeaders(BOT_API_URL);

function getLanguageScheduleTitle(item: Schedule, language: string) {
  if (language === 'zh') return item.titleZh || item.titleEn || item.titleRu || item.registration || '';
  if (language === 'en') return item.titleEn || item.titleRu || item.titleZh || item.registration || '';
  return item.titleRu || item.titleEn || item.titleZh || item.registration || '';
}

export function formatScheduleForLanguage(item: Schedule, language: string): Schedule {
  return {
    ...item,
    registration: getLanguageScheduleTitle(item, language),
  };
}

function toScheduleActive(value: unknown): boolean {
  if (typeof value === 'boolean') {
    return value;
  }

  if (value == null) {
    return true;
  }

  const normalized = String(value).trim().toLowerCase();
  return !['0', 'false', 'f', 'no'].includes(normalized);
}

export function buildScheduleKey(item: Schedule, index: number): string {
  if (item.id) {
    return `db:${item.id}`;
  }

  return [
    item.dayType || item.type || item.group || 'general',
    item.time || item.description || '',
    item.titleRu || item.titleEn || item.titleZh || item.registration || '',
    item.orderIndex ?? index,
    index,
  ].join('|');
}

function normalizeScheduleArray(rows: unknown[], language: string): Schedule[] {
  return rows
    .filter((row): row is Record<string, unknown> => typeof row === 'object' && row !== null)
    .map((row, index) => ({
      id: row.id == null ? undefined : String(row.id),
      date: String(row.date ?? new Date().toISOString()),
      registration: String(row.registration ?? row.title_ru ?? row.title_en ?? row.title_zh ?? row.title ?? ''),
      type: String(row.type ?? row.day_type ?? ''),
      description: String(row.description ?? row.time ?? ''),
      group: String(row.group ?? row.group_name ?? row.day_type ?? row.type ?? ''),
      dayType: row.day_type ? String(row.day_type) : undefined,
      time: row.time ? String(row.time) : undefined,
      titleRu: row.title_ru ? String(row.title_ru) : undefined,
      titleEn: row.title_en ? String(row.title_en) : undefined,
      titleZh: row.title_zh ? String(row.title_zh) : undefined,
      orderIndex: row.order_index == null ? index : Number(row.order_index),
      active: toScheduleActive(row.active),
    }))
    .filter((item) => item.active !== false)
    .map((item) => formatScheduleForLanguage(item, language));
}

export async function fetchScheduleFromBot(language: string): Promise<Schedule[]> {
  const load = async () => {
    if (!BOT_API_KEY) {
      return [];
    }

    const url = new URL('/api/schedule/today', BOT_API_URL);
    url.searchParams.set('language', language);

    const response = await fetch(url, {
      headers: {
        'X-API-KEY': BOT_API_KEY,
        ...bypassHeader,
      },
      cache: 'no-store',
    });

    const payload: unknown = await response.json().catch(() => ({}));
    if (!response.ok) {
      const message = getReadModelFetchErrorMessage(payload, response.status);
      throw new Error(message);
    }

    if (Array.isArray(payload)) {
      return normalizeScheduleArray(payload, language);
    }

    if (!payload || typeof payload !== 'object') {
      return [];
    }

    const today = String((payload as Record<string, unknown>).date || new Date().toISOString());
    const categories = [
      { key: 'daily_activities', ru: 'Ежедневные', en: 'Daily', zh: '每日' },
      { key: 'weekly_activities', ru: 'Еженедельные', en: 'Weekly', zh: '每周' },
      { key: 'day_activities', ru: 'Сегодня', en: 'Today', zh: '今日' },
    ] as const;

    const flattened: Schedule[] = [];
    for (const category of categories) {
      const bucket = (payload as Record<string, unknown>)[category.key];
      if (!Array.isArray(bucket)) {
        continue;
      }

      for (const item of bucket) {
        if (!item || typeof item !== 'object') {
          continue;
        }

        const row = item as Record<string, unknown>;
        const group = language === 'zh' ? category.zh : language === 'en' ? category.en : category.ru;
        flattened.push({
          date: today,
          registration: String(row.title_ru ?? row.title_en ?? row.title_zh ?? row.title ?? ''),
          type: String(row.day_type ?? group),
          description: String(row.time ?? ''),
          group: String(row.day_type ?? group),
          dayType: row.day_type ? String(row.day_type) : undefined,
          time: row.time ? String(row.time) : undefined,
          titleRu: row.title_ru ? String(row.title_ru) : undefined,
          titleEn: row.title_en ? String(row.title_en) : undefined,
          titleZh: row.title_zh ? String(row.title_zh) : undefined,
          orderIndex: row.order_index == null ? flattened.length : Number(row.order_index),
          active: true,
        });
      }
    }

    return flattened.map((item) => formatScheduleForLanguage(item, language));
  };

  return BOT_API_KEY
    ? getExpiringValue(`bot-schedule:${language}`, BOT_SCHEDULE_CACHE_TTL_MS, load)
    : load();
}

async function loadScheduleFromDatabase(): Promise<Schedule[]> {
  const pool = getPool();
  const tableName = await getPreferredTableName('schedule', ['shedule']);
  const columns = await getCachedTableColumns(tableName);
  const groupNameSelect = columns.has('group_name')
    ? 'group_name,'
    : columns.has('day_type')
      ? "COALESCE(day_type, '') AS group_name,"
      : "COALESCE(type, '') AS group_name,";

  try {
    const result = await pool.query(
      `
        SELECT
          ${columns.has('id') ? 'id,' : 'NULL::text AS id,'}
          ${columns.has('day_type') ? 'day_type,' : "COALESCE(type, '') AS day_type,"}
          ${columns.has('time') ? 'time,' : "COALESCE(description, '') AS time,"}
          ${columns.has('title_ru') ? 'title_ru,' : "COALESCE(registration, '') AS title_ru,"}
          ${columns.has('title_en') ? 'title_en,' : "COALESCE(registration, '') AS title_en,"}
          ${columns.has('title_zh') ? 'title_zh,' : "'' AS title_zh,"}
          ${groupNameSelect}
          ${columns.has('order_index') ? 'order_index,' : '0 AS order_index,'}
          ${columns.has('active') ? 'active' : 'TRUE AS active'}
        FROM ${tableName}
        ORDER BY day_type ASC, order_index ASC, time ASC
      `
    );

    return result.rows
      .map((row, index) => ({
        id: row.id == null ? undefined : String(row.id),
        date: new Date().toISOString(),
        registration: String(row.title_ru || row.title_en || row.title_zh || ''),
        type: String(row.day_type || ''),
        description: String(row.time || ''),
        group: String(row.group_name || row.day_type || ''),
        dayType: row.day_type ? String(row.day_type) : undefined,
        time: row.time ? String(row.time) : undefined,
        titleRu: row.title_ru ? String(row.title_ru) : undefined,
        titleEn: row.title_en ? String(row.title_en) : undefined,
        titleZh: row.title_zh ? String(row.title_zh) : undefined,
        orderIndex: row.order_index == null ? index : Number(row.order_index),
        active: toScheduleActive(row.active),
      }))
      .filter((item) => item.active !== false);
  } catch (error) {
    console.error('Error querying structured schedule source, falling back to legacy table shape:', error);
    const result = await pool.query(
      `
        SELECT date, registration, type, description
        FROM ${tableName}
        ORDER BY date ASC, registration ASC
      `
    );

    return result.rows.map((row, index) => ({
      id: undefined,
      date: row.date ? String(row.date) : new Date().toISOString(),
      registration: String(row.registration || ''),
      type: String(row.type || ''),
      description: String(row.description || ''),
      group: '',
      dayType: String(row.type || ''),
      time: String(row.description || ''),
      titleRu: String(row.registration || ''),
      titleEn: String(row.registration || ''),
      titleZh: '',
      orderIndex: index,
      active: true,
    }));
  }
}

export async function resolveScheduleSyncSource(): Promise<{ source: string; rows: Schedule[] }> {
  if (hasDatabaseUrl()) {
    try {
      const rows = await loadScheduleFromDatabase();
      return { source: 'database', rows };
    } catch (error) {
      console.error('Failed to load schedule source rows from database:', error);
    }
  }

  if (BOT_API_KEY) {
    return { source: 'discord-bot', rows: await fetchScheduleFromBot('ru') };
  }

  return { source: 'database', rows: [] };
}
