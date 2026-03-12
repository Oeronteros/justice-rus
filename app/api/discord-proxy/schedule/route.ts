// API Route: /api/discord-proxy/schedule
// Прокси для получения расписания через Discord бота
import { NextRequest, NextResponse } from 'next/server';
import { getAuthToken } from '@/lib/auth/request';
import { hasDatabaseUrl } from '@/lib/neon';
import { getScheduleReadModel } from '@/lib/server/read-models/schedule';
import { handleRouteError, requireActiveSession } from '@/lib/server/route-helpers';

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
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (hasDatabaseUrl()) {
      const data = await getScheduleReadModel('ru');
      if (data.length > 0) {
        return NextResponse.json(data);
      }
    }

    const response = await fetch(`${DISCORD_BOT_API_URL}/api/schedule`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...bypassHeader,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          error: 'Failed to fetch schedule from Discord bot',
          message: errorData.error || errorData.message || `HTTP ${response.status}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error proxying schedule request to Discord bot:',
      fallbackMessage: 'Failed to connect to Discord bot',
    });
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

