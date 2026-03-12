// API Route: /api/discord-proxy/registration
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getAuthToken } from '@/lib/auth/request';
import { optionsResponse } from '@/lib/server/cors';
import { hasDatabaseUrl } from '@/lib/neon';
import { isKnownClassName } from '@/lib/classes';
import { updateRegistrationStatsSchema } from '@/lib/server/registration/contracts';
import { getRegistrationsFromDb } from '@/lib/server/registration/read';
import { getRegistrationReadModel, refreshRegistrationReadModelAfterWrite } from '@/lib/server/registration/sync';
import { RegistrationUpdateError, updateRegistrationStats } from '@/lib/server/registration/write';
import {
  handleRouteError,
  parseJsonBody,
  requireActiveSession,
} from '@/lib/server/route-helpers';

const DISCORD_BOT_API_URL = process.env.DISCORD_BOT_API_URL || 'http://localhost:3001';
const bypassHeader: Record<string, string> =
  DISCORD_BOT_API_URL.includes('.loca.lt') || DISCORD_BOT_API_URL.includes('.localtunnel.me')
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
    return handleRouteError(error, {
      logLabel: 'Error proxying registration request to Discord bot:',
      fallbackMessage: 'Failed to connect to Discord bot',
    });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await requireActiveSession(request);
    if (!session.ok) {
      return session.response;
    }

    if (!hasDatabaseUrl()) {
      return NextResponse.json({ error: 'Database is not configured' }, { status: 503 });
    }

    const parsed = await parseJsonBody(request, updateRegistrationStatsSchema);
    if (!parsed.ok) {
      return parsed.response;
    }

    const result = await updateRegistrationStats(parsed.value, session.value, isKnownClassName);
    await refreshRegistrationReadModelAfterWrite();

    return NextResponse.json({ success: true, portalOnly: result.portalOnly });
  } catch (error) {
    if (error instanceof RegistrationUpdateError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return handleRouteError(error, {
      logLabel: 'Error updating registration stats:',
      fallbackMessage: 'Failed to update registration stats',
    });
  }
}

export async function OPTIONS() {
  return optionsResponse({ methods: ['GET', 'PATCH'] });
}
