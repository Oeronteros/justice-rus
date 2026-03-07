// API Route: /api/discord-proxy/news
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

const DISCORD_BOT_API_URL = process.env.BOT_API_URL || process.env.DISCORD_BOT_API_URL || 'http://localhost:3001';
const BOT_API_KEY = process.env.BOT_API_KEY || process.env.DISCORD_BOT_API_KEY;
const bypassHeader: Record<string, string> =
  DISCORD_BOT_API_URL.includes('.loca.lt') || DISCORD_BOT_API_URL.includes('.localtunnel.me')
    ? { 'bypass-tunnel-reminder': '1' }
    : {};

function normalizeNews(data: any[]): Array<{ id: string; title: string; content: string; author: string; date: string; pinned: boolean }> {
  return data.map((item, index) => ({
    id: String(item.id ?? item.news_id ?? item.message_id ?? index + 1),
    title: String(item.title ?? item.headline ?? item.name ?? item.content ?? item.description ?? 'Untitled'),
    content: String(item.content ?? item.body ?? item.text ?? item.description ?? ''),
    author: String(item.author ?? item.author_name ?? item.username ?? item.created_by ?? item.event_type ?? 'DiscordBot2'),
    date: String(item.date ?? item.created_at ?? item.published_at ?? item.start_time ?? new Date().toISOString()),
    pinned: Boolean(item.pinned),
  }));
}

function buildBotHeaders(token: string) {
  return {
    'Content-Type': 'application/json',
    ...(BOT_API_KEY ? { 'X-API-KEY': BOT_API_KEY, Authorization: `Bearer ${BOT_API_KEY}` } : { Authorization: `Bearer ${token}` }),
    ...bypassHeader,
  };
}

export async function GET(request: NextRequest) {
  try {
    const headerToken = request.headers.get('authorization');
    const cookieToken = request.cookies.get('auth_token')?.value;
    const token = cookieToken || (headerToken && headerToken.startsWith('Bearer ') ? headerToken.slice(7) : null);

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const attempts = [
      {
        url: `${DISCORD_BOT_API_URL}/api/news`,
        extract: (payload: any) => (Array.isArray(payload) ? payload : Array.isArray(payload?.data) ? payload.data : []),
      },
      {
        url: `${DISCORD_BOT_API_URL}/api/events?page=1&page_size=20`,
        extract: (payload: any) => (Array.isArray(payload?.items) ? payload.items : Array.isArray(payload?.data) ? payload.data : []),
      },
    ];

    const errors: string[] = [];
    for (const attempt of attempts) {
      const response = await fetch(attempt.url, {
        headers: buildBotHeaders(token),
        cache: 'no-store',
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        errors.push((payload as any).error || (payload as any).message || `${attempt.url} -> HTTP ${response.status}`);
        continue;
      }

      const raw = attempt.extract(payload);
      if (raw.length > 0) {
        return NextResponse.json(normalizeNews(raw));
      }
    }

    return NextResponse.json(
      {
        error: 'Failed to fetch news from Discord bot',
        message: errors.join(' | ') || 'No supported news endpoints returned data',
      },
      { status: 502 }
    );
  } catch (error) {
    console.error('Error proxying news request to Discord bot:', error);
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
