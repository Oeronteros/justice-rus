import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { ensureAccountsSchema, toPublicAccount } from '@/lib/auth/accounts';
import { canAssignRoles, canManageAccounts } from '@/lib/authz';
import {
  handleRouteError,
  parseJsonBody,
  requireAuth,
  requireDatabase,
  requirePermission,
} from '@/lib/server/route-helpers';

const updateSchema = z.object({
  id: z.union([z.string(), z.number()]),
  isActive: z.boolean(),
  role: z.enum(['guest', 'member', 'officer', 'head', 'sysadmin']).optional(),
});

function ensureAdmin(request: NextRequest) {
  const auth = requireAuth(request);
  if (!auth.ok) {
    return auth;
  }

  return requirePermission(auth.value, (user) => canManageAccounts(user.role));
}

export async function GET(request: NextRequest) {
  const guard = ensureAdmin(request);
  if (!guard.ok) {
    return guard.response;
  }

  try {
    const db = requireDatabase('Database is not configured');
    if (!db.ok) {
      return db.response;
    }

    await ensureAccountsSchema();
    const pool = getPool();
    const result = await pool.query(
      `
      SELECT id, nickname, role, is_active, password_hash, created_at, updated_at, last_login_at
      FROM portal_account
      ORDER BY created_at DESC
      LIMIT 500
      `
    );

    return NextResponse.json(result.rows.map(toPublicAccount));
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error loading accounts:',
      fallbackMessage: 'Failed to load accounts',
    });
  }
}

export async function PATCH(request: NextRequest) {
  const guard = ensureAdmin(request);
  if (!guard.ok) {
    return guard.response;
  }

  try {
    const db = requireDatabase('Database is not configured');
    if (!db.ok) {
      return db.response;
    }

    const parsed = await parseJsonBody<z.infer<typeof updateSchema>>(request, updateSchema);
    if (!parsed.ok) {
      return parsed.response;
    }

    const payload = parsed.value;
    const accountId = Number(payload.id);
    if (!Number.isFinite(accountId)) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    if (guard.value.id && Number(guard.value.id) === accountId && payload.isActive === false) {
      return NextResponse.json({ error: 'You cannot deactivate your own account' }, { status: 400 });
    }

    if (payload.role && !canAssignRoles(guard.value.role)) {
      return NextResponse.json({ error: 'Only head/sysadmin can assign roles' }, { status: 403 });
    }

    await ensureAccountsSchema();
    const pool = getPool();
    const updated = await pool.query(
      `
      UPDATE portal_account
      SET is_active = $2,
          role = COALESCE($3, role),
          updated_at = NOW()
      WHERE id = $1
      RETURNING id, nickname, role, is_active, password_hash, created_at, updated_at, last_login_at
      `,
      [accountId, payload.isActive, payload.role ?? null]
    );

    const row = updated.rows[0];
    if (!row) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(toPublicAccount(row));
  } catch (error) {
    return handleRouteError(error, {
      logLabel: 'Error updating account:',
      fallbackMessage: 'Failed to update account',
    });
  }
}
