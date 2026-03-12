import { NextRequest, NextResponse } from 'next/server';
import { getAuthToken } from '@/lib/auth/request';
import { createNewsSchema } from '@/lib/schemas/news';
import {
  handleRouteError,
  parseJsonBody,
  requireActiveSession,
  requireSameOrigin,
} from '@/lib/server/route-helpers';
import { createNews, listNews } from '@/lib/server/news/service';

export async function GET(request: NextRequest) {
  try {
    const session = await requireActiveSession(request);
    if (!session.ok) {
      return session.response;
    }

    const token = getAuthToken(request);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(await listNews(token));
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error fetching news:',
      fallbackMessage: 'Failed to fetch news',
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const sameOrigin = requireSameOrigin(request);
    if (!sameOrigin.ok) {
      return sameOrigin.response;
    }

    const session = await requireActiveSession(request);
    if (!session.ok) {
      return session.response;
    }

    const parsed = await parseJsonBody(request, createNewsSchema);
    if (!parsed.ok) {
      return parsed.response;
    }

    return NextResponse.json(await createNews(parsed.value, session.value), { status: 201 });
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error creating news:',
      fallbackMessage: 'Failed to create news',
    });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
