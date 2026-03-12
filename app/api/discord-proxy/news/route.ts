// API Route: /api/discord-proxy/news
import { NextRequest, NextResponse } from 'next/server';
import { getAuthToken } from '@/lib/auth/request';
import { optionsResponse } from '@/lib/server/cors';
import { hasDatabaseUrl } from '@/lib/neon';
import { fetchNewsDirect, getNewsReadModel } from '@/lib/server/read-models/news';
import { handleRouteError, jsonError, requireActiveSession } from '@/lib/server/route-helpers';

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
      const news = await getNewsReadModel();
      if (news.length > 0) {
        return NextResponse.json(news);
      }
    }

    const news = await fetchNewsDirect(token);
    return NextResponse.json(news);
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error proxying news request to Discord bot:',
      fallbackMessage: 'Failed to connect to Discord bot',
    });
  }
}

export async function OPTIONS() {
  return optionsResponse({ methods: ['GET'] });
}
