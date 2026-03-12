import { NextRequest, NextResponse } from 'next/server';
import { optionsResponse } from '@/lib/server/cors';
import { pvpReportSchema } from '@/lib/schemas/pvp';
import {
  handleRouteError,
  parseJsonBody,
  requireActiveSession,
  requireDatabase,
  requireSameOrigin,
} from '@/lib/server/route-helpers';
import { getPvpState, joinPvpQueue, leavePvpQueue, reportPvpResult } from '@/lib/server/pvp/service';

export async function GET(request: NextRequest) {
  try {
    const session = await requireActiveSession(request);
    if (!session.ok) {
      return session.response;
    }

    const db = requireDatabase();
    if (!db.ok) {
      return db.response;
    }

    return NextResponse.json(await getPvpState(session.value));
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error loading PvP state:',
      fallbackMessage: 'Failed to load PvP state',
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

    const db = requireDatabase();
    if (!db.ok) {
      return db.response;
    }

    return NextResponse.json(await joinPvpQueue(session.value));
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error joining PvP queue:',
      fallbackMessage: 'Failed to join PvP queue',
    });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const sameOrigin = requireSameOrigin(request);
    if (!sameOrigin.ok) {
      return sameOrigin.response;
    }

    const session = await requireActiveSession(request);
    if (!session.ok) {
      return session.response;
    }

    const db = requireDatabase();
    if (!db.ok) {
      return db.response;
    }

    return NextResponse.json(await leavePvpQueue(session.value));
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error leaving PvP queue:',
      fallbackMessage: 'Failed to leave PvP queue',
    });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const sameOrigin = requireSameOrigin(request);
    if (!sameOrigin.ok) {
      return sameOrigin.response;
    }

    const session = await requireActiveSession(request);
    if (!session.ok) {
      return session.response;
    }

    const db = requireDatabase();
    if (!db.ok) {
      return db.response;
    }

    const parsed = await parseJsonBody(request, pvpReportSchema);
    if (!parsed.ok) {
      return parsed.response;
    }

    return NextResponse.json(await reportPvpResult(session.value, parsed.value));
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error reporting PvP result:',
      fallbackMessage: 'Failed to report PvP result',
    });
  }
}

export async function OPTIONS() {
  return optionsResponse({ methods: ['GET', 'POST', 'PATCH', 'DELETE'] });
}
