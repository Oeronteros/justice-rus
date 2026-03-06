// API Route: /api/verify-auth
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';
import { VerifyAuthResponse } from '@/types';
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

    let user = {
      id: decoded.id,
      nickname: decoded.nickname,
      role: decoded.role,
      isActive: decoded.isActive ?? true,
      authMethod: decoded.authMethod ?? 'account',
      discordId: decoded.discordId,
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
        SELECT id, nickname, role, is_active
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
      };
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

