import { NextRequest, NextResponse } from 'next/server';
import { getPool, hasDatabaseUrl } from '@/lib/neon';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const BOT_API_URL =
  process.env.BOT_API_URL || process.env.DISCORD_BOT_API_URL || 'http://localhost:3001';
const BOT_API_KEY = process.env.BOT_API_KEY || process.env.DISCORD_BOT_API_KEY;

const bypassHeader: Record<string, string> =
  BOT_API_URL.includes('.loca.lt') || BOT_API_URL.includes('.localtunnel.me')
    ? { 'bypass-tunnel-reminder': '1' }
    : {};

async function queryScheduleFromDb(language: string) {
  const pool = getPool();
  const tableCheck = await pool.query(
    `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('schedule', 'shedule') ORDER BY table_name = 'schedule' DESC LIMIT 1`
  );
  const tableName = tableCheck.rows[0]?.table_name || 'schedule';
  try {
    const result = await pool.query(
      `
      SELECT day_type, time, title_ru, title_en, title_zh, order_index
      FROM ${tableName}
      WHERE active = 1
      ORDER BY day_type ASC, order_index ASC, time ASC
      `
    );
    const today = new Date().toISOString();
    return result.rows.map((row) => ({
      date: today,
      registration:
        language === 'zh'
          ? row.title_zh || row.title_en || row.title_ru || ''
          : language === 'ru'
          ? row.title_ru || row.title_en || row.title_zh || ''
          : row.title_en || row.title_ru || row.title_zh || '',
      type: row.day_type || '',
      description: row.time ? String(row.time) : '',
      group: row.day_type || '',
    }));
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
      registration: row.registration || '',
      type: row.type || '',
      description: row.description || '',
      group: '',
    }));
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'ru';

    if (hasDatabaseUrl()) {
      try {
        const data = await queryScheduleFromDb(language);
        return NextResponse.json(data);
      } catch (dbError) {
        console.error('Database error fetching schedule:', dbError);
        // Продолжаем к bot API если БД недоступна
      }
    }

    if (!BOT_API_KEY) {
      // Возвращаем пустой массив вместо ошибки если нет ключа
      console.warn('No BOT_API_KEY configured, returning empty schedule');
      return NextResponse.json([]);
    }

    const url = new URL('/api/schedule/today', BOT_API_URL);
    url.searchParams.set('language', language);

    const res = await fetch(url, {
      headers: {
        'X-API-KEY': BOT_API_KEY,
        ...bypassHeader,
      },
      cache: 'no-store',
    });

    const botData = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(
        {
          error: 'Failed to fetch schedule from bot',
          message: (botData as any)?.error || (botData as any)?.message || `HTTP ${res.status}`,
        },
        { status: res.status }
      );
    }

    // If it's already an array, return as is (backward compatibility)
    if (Array.isArray(botData)) {
      return NextResponse.json(botData);
    }

    // Map DiscordBot2 /api/schedule/today response to frontend array shape
    const flattened: any[] = [];
    const today = botData.date || new Date().toISOString();

    const languageSafeTitle = (a: any) => {
      if (language === 'zh') return a.title_zh || a.title_en || a.title_ru || a.title || '';
      if (language === 'ru') return a.title_ru || a.title_en || a.title_zh || a.title || '';
      return a.title_en || a.title_ru || a.title_zh || a.title || '';
    };

    const mapActivity = (activity: any, defaultGroup: string) => ({
      date: today,
      registration: languageSafeTitle(activity),
      type: activity.day_type || defaultGroup,
      description: activity.time || '',
      group: activity.day_type || defaultGroup,
    });

    const categories = [
      { key: 'daily_activities', ru: 'Ежедневные', en: 'Daily', zh: '每日' },
      { key: 'weekly_activities', ru: 'Еженедельные', en: 'Weekly', zh: '每周' },
      { key: 'day_activities', ru: 'Сегодня', en: 'Today', zh: '今日' },
    ];

    for (const cat of categories) {
      const activities = (botData as any)[cat.key];
      if (Array.isArray(activities)) {
        const groupLabel = language === 'zh' ? cat.zh : language === 'ru' ? cat.ru : cat.en;
        flattened.push(...activities.map((a: any) => mapActivity(a, groupLabel)));
      }
    }

    return NextResponse.json(flattened);
  } catch (error) {
    console.error('Unhandled error in schedule route:', error);
    return NextResponse.json([]);
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-API-KEY',
    },
  });
}
