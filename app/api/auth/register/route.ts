import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { ensureAccountsSchema, hashPassword, normalizeNickname } from '@/lib/auth/accounts';

export const runtime = 'nodejs';

const registerSchema = z.object({
  nickname: z.string().trim().min(3).max(32),
  password: z.string().min(8).max(128),
});

function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true;

  const host = request.headers.get('host');
  if (!host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isSameOrigin(request)) {
      return NextResponse.json({ error: 'Forbidden origin' }, { status: 403 });
    }

    if (!hasDatabaseUrl()) {
      return NextResponse.json({ error: 'Database is not configured' }, { status: 503 });
    }

    const payload = registerSchema.parse(await request.json());
    const nickname = normalizeNickname(payload.nickname);
    const passwordHash = hashPassword(payload.password);

    await ensureAccountsSchema();
    const pool = getPool();

    const exists = await pool.query(
      `SELECT 1 FROM portal_account WHERE LOWER(nickname) = LOWER($1) LIMIT 1`,
      [nickname]
    );

    if ((exists.rowCount || 0) > 0) {
      return NextResponse.json({ error: 'Nickname is already taken' }, { status: 409 });
    }

    const created = await pool.query(
      `
      INSERT INTO portal_account (nickname, password_hash, role, is_active)
      VALUES ($1, $2, 'guest', FALSE)
      RETURNING id, nickname, role, is_active, created_at
      `,
      [nickname, passwordHash]
    );

    const row = created.rows[0];
    return NextResponse.json(
      {
        success: true,
        pendingApproval: true,
        message: 'Account created. Ask officer/head/sysadmin to activate it.',
        user: {
          id: String(row.id),
          nickname: row.nickname,
          role: row.role,
          isActive: Boolean(row.is_active),
          createdAt: (row.created_at || new Date()).toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid payload', details: error.errors }, { status: 400 });
    }

    console.error('Register error:', error);
    return NextResponse.json({ error: 'Failed to register account' }, { status: 500 });
  }
}
