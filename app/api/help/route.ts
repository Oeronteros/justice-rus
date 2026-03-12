import { NextRequest, NextResponse } from 'next/server';
import { createHelpRequestSchema, mutateHelpRequestSchema } from '@/lib/schemas/help';
import {
  handleRouteError,
  parseJsonBody,
  requireActiveSession,
  requireDatabase,
  requireSameOrigin,
} from '@/lib/server/route-helpers';
import {
  createHelpRequest,
  deleteHelpRequest,
  listHelpRequests,
  updateHelpRequest,
} from '@/lib/server/help/service';

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

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'open';
    return NextResponse.json(await listHelpRequests(status));
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error loading help requests:',
      fallbackMessage: 'Failed to load help requests',
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

    const parsed = await parseJsonBody(request, createHelpRequestSchema);
    if (!parsed.ok) {
      return parsed.response;
    }

    return NextResponse.json(await createHelpRequest(parsed.value, session.value), { status: 201 });
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error creating help request:',
      fallbackMessage: 'Failed to create help request',
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

    const parsed = await parseJsonBody(request, mutateHelpRequestSchema);
    if (!parsed.ok) {
      return parsed.response;
    }

    return NextResponse.json(await updateHelpRequest(parsed.value, session.value));
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error updating help request:',
      fallbackMessage: 'Failed to update help request',
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
    const id = Number(searchParams.get('id'));
    if (!Number.isFinite(id)) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    return NextResponse.json(await deleteHelpRequest(id, session.value));
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error deleting help request:',
      fallbackMessage: 'Failed to delete help request',
    });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
