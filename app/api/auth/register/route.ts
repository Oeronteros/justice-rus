import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { ensureAccountsSchema, hashPassword, normalizeNickname } from '@/lib/auth/accounts';
import { isKnownClassName } from '@/lib/classes';

export const runtime = 'nodejs';

const registerSchema = z.object({
  nickname: z.string().trim().min(3).max(32),
  className: z.string().trim().min(1).max(100),
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
    const className = payload.className.trim();
    if (!(await isKnownClassName(className))) {
      return NextResponse.json({ error: 'Unknown class selected' }, { status: 400 });
    }
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
      INSERT INTO portal_account (nickname, class_name, password_hash, role, is_active)
      VALUES ($1, $2, $3, 'guest', FALSE)
      RETURNING id, nickname, class_name, role, is_active, created_at
      `,
      [nickname, className, passwordHash]
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
          className: row.class_name || className,
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
