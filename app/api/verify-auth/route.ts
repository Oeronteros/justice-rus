// API Route: /api/verify-auth
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';
import { User, VerifyAuthResponse } from '@/types';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { ensureAccountsSchema } from '@/lib/auth/accounts';

export const runtime = 'nodejs';

function clearAuthCookie(response: NextResponse) {
  response.cookies.set({
    name: 'auth_token',
    value: '',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
    priority: 'high',
  });
}

async function resolveClassName(nickname: string | undefined): Promise<string | null> {
  if (!nickname || !hasDatabaseUrl()) return null;

  const pool = getPool();
  const columns = await pool.query(
    `
    SELECT column_name
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'registrations'
    `
  );

  const names = new Set(columns.rows.map((row) => String(row.column_name).toLowerCase()));
  const nickCol = names.has('nick') ? 'nick' : names.has('nickname') ? 'nickname' : null;
  const classCol = names.has('class_name') ? 'class_name' : names.has('class') ? 'class' : null;
  if (!nickCol || !classCol) return null;

  const result = await pool.query(
    `SELECT ${classCol} AS class_name FROM registrations WHERE LOWER(${nickCol}) = LOWER($1) LIMIT 1`,
    [nickname]
  );

  return result.rows[0]?.class_name || null;
}

export async function GET(request: NextRequest) {
  try {
    const cookieToken = request.cookies.get('auth_token')?.value;
    const headerToken = getTokenFromRequest(request);
    const token = cookieToken || headerToken;
    
    if (!token) {
      const response = NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
      response.headers.set('Cache-Control', 'no-store');
      return response;
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      const response = NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
      clearAuthCookie(response);
      response.headers.set('Cache-Control', 'no-store');
      return response;
    }

    let user: User = {
      id: decoded.id,
      nickname: decoded.nickname,
      role: decoded.role,
      isActive: decoded.isActive ?? true,
      authMethod: decoded.authMethod ?? 'account',
      discordId: decoded.discordId,
      className: null,
    };

    if (decoded.authMethod !== 'pin') {
      if (!decoded.id || !hasDatabaseUrl()) {
        const response = NextResponse.json({ error: 'Account state unavailable' }, { status: 401 });
        clearAuthCookie(response);
        response.headers.set('Cache-Control', 'no-store');
        return response;
      }

      await ensureAccountsSchema();
      const pool = getPool();
      const result = await pool.query(
        `
        SELECT id, nickname, class_name, role, is_active
        FROM portal_account
        WHERE id = $1
        LIMIT 1
        `,
        [decoded.id]
      );

      const row = result.rows[0];
      if (!row || !row.is_active) {
        const response = NextResponse.json({ error: 'Account is inactive' }, { status: 401 });
        clearAuthCookie(response);
        response.headers.set('Cache-Control', 'no-store');
        return response;
      }

        user = {
          id: String(row.id),
          nickname: row.nickname,
          role: row.role,
          isActive: true,
          authMethod: 'account',
          discordId: decoded.discordId,
          className: (await resolveClassName(row.nickname)) || row.class_name || null,
        };
    } else {
      user.className = await resolveClassName(decoded.nickname);
    }

    const response: VerifyAuthResponse = {
      valid: true,
      user,
    };

    const json = NextResponse.json(response);
    json.headers.set('Cache-Control', 'no-store');
    return json;
  } catch (error) {
    console.error('Verify auth error:', error);
    const response = NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
    response.headers.set('Cache-Control', 'no-store');
    return response;
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

