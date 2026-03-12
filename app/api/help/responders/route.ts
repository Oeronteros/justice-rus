import { NextRequest, NextResponse } from 'next/server';
import { optionsResponse } from '@/lib/server/cors';
import { helpRsvpSchema } from '@/lib/schemas/help';
import {
  handleRouteError,
  parseJsonBody,
  requireActiveSession,
  requireDatabase,
  requireSameOrigin,
} from '@/lib/server/route-helpers';
import { addHelpResponder, removeHelpResponder } from '@/lib/server/help/service';

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

    const parsed = await parseJsonBody(request, helpRsvpSchema);
    if (!parsed.ok) {
      return parsed.response;
    }

    return NextResponse.json(await addHelpResponder(parsed.value, session.value));
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error RSVP help request:',
      fallbackMessage: 'Failed to RSVP help request',
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

    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get('id');
    if (!requestId) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    return NextResponse.json(await removeHelpResponder(requestId, session.value));
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error withdrawing RSVP:',
      fallbackMessage: 'Failed to withdraw RSVP',
    });
  }
}

export async function OPTIONS() {
  return optionsResponse({ methods: ['POST', 'DELETE'] });
}
