import { NextRequest, NextResponse } from 'next/server';
import { canManageAccounts } from '@/lib/authz';
import { optionsResponse } from '@/lib/server/cors';
import { getRosterAnalytics } from '@/lib/server/analytics/roster';
import {
  handleRouteError,
  requireActiveSession,
  requirePermission,
} from '@/lib/server/route-helpers';

export async function GET(request: NextRequest) {
  try {
    const session = await requireActiveSession(request);
    if (!session.ok) {
      return session.response;
    }

    const permission = requirePermission(session.value, (user) => canManageAccounts(user.role));
    if (!permission.ok) {
      return permission.response;
    }

    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30', 10);
    return NextResponse.json(await getRosterAnalytics(days));
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error fetching roster analytics:',
      fallbackMessage: 'Failed to fetch analytics',
    });
  }
}

export async function OPTIONS() {
  return optionsResponse({ methods: ['GET'], headers: ['Content-Type', 'X-API-KEY', 'Authorization'] });
}
