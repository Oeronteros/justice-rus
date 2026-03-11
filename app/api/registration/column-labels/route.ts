import { NextRequest, NextResponse } from 'next/server';
import { canManageAccounts } from '@/lib/authz';
import { registrationColumnLabelsPatchSchema } from '@/lib/registration/column-labels';
import {
  getSharedRegistrationColumnLabels,
  saveSharedRegistrationColumnLabels,
} from '@/lib/server/registration/column-labels';
import {
  handleRouteError,
  parseJsonBody,
  requireAuth,
  requireDatabase,
  requirePermission,
} from '@/lib/server/route-helpers';

export async function GET(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.ok) {
    return auth.response;
  }

  try {
    const labels = await getSharedRegistrationColumnLabels();
    return NextResponse.json(labels);
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Failed to read shared registration column labels:',
      fallbackMessage: 'Failed to load registration column labels',
    });
  }
}

export async function PATCH(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.ok) {
    return auth.response;
  }

  const permission = requirePermission(
    auth.value,
    (user) => canManageAccounts(user.role),
    'Only officers and above can edit registration column labels'
  );
  if (!permission.ok) {
    return permission.response;
  }

  const database = requireDatabase();
  if (!database.ok) {
    return database.response;
  }

  const parsed = await parseJsonBody(request, registrationColumnLabelsPatchSchema);
  if (!parsed.ok) {
    return parsed.response;
  }

  try {
    const currentLabels = await getSharedRegistrationColumnLabels();
    const labels = await saveSharedRegistrationColumnLabels(
      {
        ...currentLabels,
        ...parsed.value,
      },
      auth.value.nickname || auth.value.id || 'unknown'
    );

    return NextResponse.json(labels);
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Failed to update shared registration column labels:',
      fallbackMessage: 'Failed to update registration column labels',
      invalidMessage: 'Invalid registration column labels payload',
    });
  }
}
