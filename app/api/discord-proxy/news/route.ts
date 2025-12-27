// API Route: /api/discord-proxy/news
// Прокси для получения новостей через Discord бота
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

const DISCORD_BOT_API_URL = process.env.DISCORD_BOT_API_URL || 'http://localhost:3001';
const bypassHeader = (DISCORD_BOT_API_URL.includes('.loca.lt') || DISCORD_BOT_API_URL.includes('.localtunnel.me'))
  ? { 'bypass-tunnel-reminder': '1' }
  : {};

export async function GET(request: NextRequest) {
  try {
    const headerToken = request.headers.get('authorization');
    const cookieToken = request.cookies.get('auth_token')?.value;
    const token = cookieToken || (headerToken && headerToken.startsWith('Bearer ') ? headerToken.slice(7) : null);

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Discord bot does not expose a news endpoint; return empty list to keep UI stable.
    return NextResponse.json([]);
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

