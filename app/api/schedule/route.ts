import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const BOT_API_URL =
  process.env.BOT_API_URL || process.env.DISCORD_BOT_API_URL || 'http://localhost:3001';
const BOT_API_KEY = process.env.BOT_API_KEY || process.env.DISCORD_BOT_API_KEY;

const bypassHeader: Record<string, string> =
  BOT_API_URL.includes('.loca.lt') || BOT_API_URL.includes('.localtunnel.me')
    ? { 'bypass-tunnel-reminder': '1' }
    : {};

export async function GET(request: NextRequest) {
  try {
    if (!BOT_API_KEY) {
      return NextResponse.json({ error: 'Missing BOT_API_KEY' }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'ru';

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
    return NextResponse.json(
      {
        error: 'Failed to connect to bot',
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
      'Access-Control-Allow-Headers': 'Content-Type, X-API-KEY',
    },
  });
}

