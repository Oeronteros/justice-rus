// API Route: /api/discord-proxy/registration
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyToken } from '@/lib/auth';
import { getAuthToken } from '@/lib/auth/request';
import { hasDatabaseUrl } from '@/lib/neon';
import { isKnownClassName } from '@/lib/classes';
import { updateRegistrationStatsSchema } from '@/lib/server/registration/contracts';
import { getRegistrationsFromDb } from '@/lib/server/registration/read';
import { getRegistrationReadModel, refreshRegistrationReadModelAfterWrite } from '@/lib/server/registration/sync';
import { RegistrationUpdateError, updateRegistrationStats } from '@/lib/server/registration/write';

export const runtime = 'nodejs';

const DISCORD_BOT_API_URL = process.env.DISCORD_BOT_API_URL || 'http://localhost:3001';
const bypassHeader: Record<string, string> =
  DISCORD_BOT_API_URL.includes('.loca.lt') || DISCORD_BOT_API_URL.includes('.localtunnel.me')
    ? { 'bypass-tunnel-reminder': '1' }
    : {};

export async function GET(request: NextRequest) {
  try {
    const token = getAuthToken(request);
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (hasDatabaseUrl()) {
      try {
        const data = await getRegistrationReadModel();
        if (data.length > 0) {
          return NextResponse.json(data);
        }
      } catch (readModelError) {
        console.error('Registration read model failed, falling back to live query:', readModelError);
      }

      const data = await getRegistrationsFromDb();
      return NextResponse.json(data);
    }

    const response = await fetch(`${DISCORD_BOT_API_URL}/api/users`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...bypassHeader,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})) as Record<string, unknown>;
      return NextResponse.json(
        {
          error: 'Failed to fetch users from Discord bot',
          message: String(errorData.error || errorData.message || `HTTP ${response.status}`),
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying registration request to Discord bot:', error);
    return NextResponse.json(
      {
        error: 'Failed to connect to Discord bot',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const token = getAuthToken(request);
    const decoded = token ? verifyToken(token) : null;
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!hasDatabaseUrl()) {
      return NextResponse.json({ error: 'Database is not configured' }, { status: 503 });
    }

    const payload = updateRegistrationStatsSchema.parse(await request.json());
    const result = await updateRegistrationStats(payload, decoded, isKnownClassName);
    await refreshRegistrationReadModelAfterWrite();

    return NextResponse.json({ success: true, portalOnly: result.portalOnly });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 });
    }

    if (error instanceof RegistrationUpdateError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    console.error('Error updating registration stats:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        error: message || 'Failed to update registration stats',
        code: 'REGISTRATION_STATS_UPDATE_FAILED',
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
      'Access-Control-Allow-Methods': 'GET, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
