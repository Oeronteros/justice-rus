// API Route: /api/discord-proxy/news
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getAuthToken } from '@/lib/auth/request';
import { hasDatabaseUrl } from '@/lib/neon';
import { fetchNewsDirect, getNewsReadModel } from '@/lib/server/read-models/news';

export async function GET(request: NextRequest) {
  try {
    const token = getAuthToken(request);

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (hasDatabaseUrl()) {
      const news = await getNewsReadModel();
      if (news.length > 0) {
        return NextResponse.json(news);
      }
    }

    const news = await fetchNewsDirect(token);
    return NextResponse.json(news);
  } catch (error) {
    console.error('Error proxying news request to Discord bot:', error);
    return NextResponse.json(
      {
        error: 'Failed to connect to Discord bot',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 502 }
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
