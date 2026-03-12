import { NextRequest, NextResponse } from 'next/server';
import { getAuthToken } from '@/lib/auth/request';
import { optionsResponse } from '@/lib/server/cors';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { handleRouteError, jsonError, requireActiveSession } from '@/lib/server/route-helpers';

const DISCORD_BOT_API_URL = process.env.DISCORD_BOT_API_URL || 'http://localhost:3001';
const bypassHeader: Record<string, string> = (DISCORD_BOT_API_URL.includes('.loca.lt') || DISCORD_BOT_API_URL.includes('.localtunnel.me'))
  ? { 'bypass-tunnel-reminder': '1' }
  : {};

export async function GET(request: NextRequest) {
  try {
    const session = await requireActiveSession(request);
    if (!session.ok) {
      return session.response;
    }

    const token = getAuthToken(request);
    if (!token) {
      return jsonError('Unauthorized', 401);
    }

    if (hasDatabaseUrl()) {
      const pool = getPool();
      const result = await pool.query(
        `
        SELECT id, title_ru, title_en, content_ru, content_en, category, created_at, updated_at
        FROM guides
        WHERE active = 1
        ORDER BY order_index ASC, updated_at DESC
        `
      );

      const data = result.rows.map((row) => ({
        id: String(row.id),
        title: row.title_ru || row.title_en || '',
        content: row.content_ru || row.content_en || '',
        category: row.category || 'general',
        author: 'bot',
        date: (row.updated_at || row.created_at || new Date()).toISOString(),
      }));

      return NextResponse.json(data);
    }

    const response = await fetch(`${DISCORD_BOT_API_URL}/api/guides`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...bypassHeader,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return jsonError('Failed to fetch guides from Discord bot', response.status, {
        details: {
          message: errorData.error || errorData.message || `HTTP ${response.status}`,
        },
      });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error proxying guides request to Discord bot:',
      fallbackMessage: 'Failed to connect to Discord bot',
    });
  }
}

export async function OPTIONS() {
  return optionsResponse({ methods: ['GET'] });
}

