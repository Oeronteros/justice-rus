import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getAuthToken } from '@/lib/auth/request';
import { canManageAccounts } from '@/lib/authz';
import { hasDatabaseUrl } from '@/lib/neon';
import { getReadModelState } from '@/lib/server/read-models/shared';
import { REGISTRATION_READ_MODEL_KEY } from '@/lib/server/registration/read-model';
import { syncRegistrationReadModel } from '@/lib/server/registration/sync';

export const runtime = 'nodejs';

function requireManager(request: NextRequest) {
  const token = getAuthToken(request);
  const decoded = token ? verifyToken(token) : null;

  if (!decoded) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!canManageAccounts(decoded.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return null;
}

export async function GET(request: NextRequest) {
  const authError = requireManager(request);
  if (authError) {
    return authError;
  }

  if (!hasDatabaseUrl()) {
    return NextResponse.json({ error: 'Database is not configured' }, { status: 503 });
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
  return GET(request);
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
