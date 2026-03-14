import { NextRequest, NextResponse } from 'next/server';
import { optionsResponse } from '@/lib/server/cors';
import {
  handleRouteError,
  requireActiveSession,
  requireMinimumRole,
  requireSameOrigin,
} from '@/lib/server/route-helpers';
import { deleteNews } from '@/lib/server/news/service';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const sameOrigin = requireSameOrigin(request);
    if (!sameOrigin.ok) {
      return sameOrigin.response;
    }

    const session = await requireActiveSession(request);
    if (!session.ok) {
      return session.response;
    }

    const roleGuard = requireMinimumRole(session.value, 'officer');
    if (!roleGuard.ok) {
      return roleGuard.response;
    }

    const { id } = await context.params;
    return NextResponse.json(await deleteNews(id));
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error deleting news:',
      fallbackMessage: 'Failed to delete news',
    });
  }
}

export async function OPTIONS() {
  return optionsResponse({ methods: ['DELETE'] });
}
