import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyToken } from '@/lib/auth';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { ensureAccountsSchema, toPublicAccount } from '@/lib/auth/accounts';
import { canAssignRoles, canManageAccounts } from '@/lib/authz';

export const runtime = 'nodejs';

const updateSchema = z.object({
  id: z.union([z.string(), z.number()]),
  isActive: z.boolean(),
  role: z.enum(['guest', 'member', 'officer', 'head', 'sysadmin']).optional(),
});

function getAuthToken(request: NextRequest): string | null {
  const headerToken = request.headers.get('authorization');
  const cookieToken = request.cookies.get('auth_token')?.value;
  const token = cookieToken || (headerToken && headerToken.startsWith('Bearer ') ? headerToken.slice(7) : null);
  return token || null;
}

function ensureAdmin(request: NextRequest) {
  const token = getAuthToken(request);
  const decoded = token ? verifyToken(token) : null;
  if (!decoded) {
    return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }

  if (!canManageAccounts(decoded.role)) {
    return { error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) };
  }

  return { decoded };
}

export async function GET(request: NextRequest) {
  const guard = ensureAdmin(request);
  if ('error' in guard) {
    return guard.error;
  }

  try {
    if (!hasDatabaseUrl()) {
      return NextResponse.json({ error: 'Database is not configured' }, { status: 503 });
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
    console.error('Error loading accounts:', error);
    return NextResponse.json({ error: 'Failed to load accounts' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const guard = ensureAdmin(request);
  if ('error' in guard) {
    return guard.error;
  }

  try {
    if (!hasDatabaseUrl()) {
      return NextResponse.json({ error: 'Database is not configured' }, { status: 503 });
    }

    const payload = updateSchema.parse(await request.json());
    const accountId = Number(payload.id);
    if (!Number.isFinite(accountId)) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    if (guard.decoded.id && Number(guard.decoded.id) === accountId && payload.isActive === false) {
      return NextResponse.json({ error: 'You cannot deactivate your own account' }, { status: 400 });
    }

    if (payload.role && !canAssignRoles(guard.decoded.role)) {
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
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 });
    }

    console.error('Error updating account:', error);
    return NextResponse.json({ error: 'Failed to update account' }, { status: 500 });
  }
}
