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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'ru';

    if (hasDatabaseUrl()) {
      try {
        const pool = getPool();
        const titleField = language === 'en' ? 'title_en' : 'title_ru';
        const result = await pool.query(
          `
          SELECT day_type, time, ${titleField} AS title, group_name
          FROM schedule
          WHERE active = 1
          ORDER BY group_name ASC, order_index ASC, time ASC
          `
        );

        const today = new Date().toISOString();
        const data = result.rows.map((row) => ({
          date: today,
          registration: row.title || '',
          type: row.day_type || '',
          description: row.time ? String(row.time) : '',
          group: row.group_name || '',
        }));

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

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(
        {
          error: 'Failed to fetch schedule from bot',
          message: (data as any)?.error || (data as any)?.message || `HTTP ${res.status}`,
        },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying schedule request to bot:', error);
    // Возвращаем пустой массив вместо ошибки чтобы UI не ломался
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
