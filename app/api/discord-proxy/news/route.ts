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
    title: String(item.title ?? item.headline ?? item.content ?? 'Untitled'),
    content: String(item.content ?? item.body ?? item.text ?? ''),
    author: String(item.author ?? item.author_name ?? item.username ?? 'Discord'),
    date: String(item.date ?? item.created_at ?? item.published_at ?? new Date().toISOString()),
    pinned: Boolean(item.pinned),
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

    const response = await fetch(`${DISCORD_BOT_API_URL}/api/news`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...(BOT_API_KEY ? { 'X-API-KEY': BOT_API_KEY } : {}),
        ...bypassHeader,
      },
      cache: 'no-store',
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      return NextResponse.json(
        {
          error: 'Failed to fetch news from Discord bot',
          message: (payload as any).error || (payload as any).message || `HTTP ${response.status}`,
        },
        { status: response.status }
      );
    }

    const raw = Array.isArray(payload) ? payload : Array.isArray((payload as any).data) ? (payload as any).data : [];
    return NextResponse.json(normalizeNews(raw));
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
