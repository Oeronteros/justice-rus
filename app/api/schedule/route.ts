import { NextRequest, NextResponse } from 'next/server';
import { optionsResponse } from '@/lib/server/cors';
import { createScheduleSchema, updateScheduleSchema } from '@/lib/schemas/schedule';
import {
  handleRouteError,
  parseJsonBody,
  requireActiveSession,
  requireSameOrigin,
} from '@/lib/server/route-helpers';
import {
  createScheduleEntry,
  listSchedule,
  updateScheduleEntry,
} from '@/lib/server/schedule/source';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'ru';
    return NextResponse.json(await listSchedule(language));
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Unhandled error in schedule route:',
      fallbackMessage: 'Failed to load schedule',
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

    const parsed = await parseJsonBody(request, createScheduleSchema);
    if (!parsed.ok) {
      return parsed.response;
    }

    return NextResponse.json(await createScheduleEntry(parsed.value, session.value), { status: 201 });
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error creating schedule entry:',
      fallbackMessage: 'Failed to create schedule entry',
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

    const parsed = await parseJsonBody(request, updateScheduleSchema);
    if (!parsed.ok) {
      return parsed.response;
    }

    return NextResponse.json(await updateScheduleEntry(parsed.value, session.value));
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error updating schedule:',
      fallbackMessage: 'Failed to update schedule',
    });
  }
}

export async function OPTIONS() {
  return optionsResponse({ methods: ['GET', 'POST', 'PATCH'], headers: ['Content-Type', 'X-API-KEY', 'Authorization'] });
}
