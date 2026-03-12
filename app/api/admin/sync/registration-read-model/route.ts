import { NextRequest, NextResponse } from 'next/server';
import { canManageAccounts } from '@/lib/authz';
import { optionsResponse } from '@/lib/server/cors';
import { getReadModelState } from '@/lib/server/read-models/shared';
import { REGISTRATION_READ_MODEL_KEY } from '@/lib/server/registration/read-model';
import { syncRegistrationReadModel } from '@/lib/server/registration/sync';
import {
  requireActiveSession,
  requireDatabase,
  requirePermission,
  requireSameOrigin,
} from '@/lib/server/route-helpers';

export async function GET(request: NextRequest) {
  const session = await requireActiveSession(request);
  if (!session.ok) {
    return session.response;
  }

  const permission = requirePermission(session.value, (user) => canManageAccounts(user.role));
  if (!permission.ok) {
    return permission.response;
  }

  const db = requireDatabase('Database is not configured');
  if (!db.ok) {
    return db.response;
  }

  const rows = await syncRegistrationReadModel();
  const state = await getReadModelState(REGISTRATION_READ_MODEL_KEY);

  return NextResponse.json({
    success: true,
    count: rows.length,
    state,
  });
}

export async function POST(request: NextRequest) {
  const sameOrigin = requireSameOrigin(request);
  if (!sameOrigin.ok) {
    return sameOrigin.response;
  }

  return GET(request);
}

export async function OPTIONS() {
  return optionsResponse({ methods: ['GET', 'POST'] });
}
