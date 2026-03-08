// API Route: /api/verify-auth
import { NextRequest, NextResponse } from 'next/server';
import { clearAuthCookie, getAuthToken } from '@/lib/auth/request';
import type { VerifyAuthResponse } from '@/lib/schemas/auth';
import { resolveSessionFromToken } from '@/lib/server/auth-session';

export async function GET(request: NextRequest) {
  try {
    const token = getAuthToken(request);
    
    if (!token) {
      const response = NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
      response.headers.set('Cache-Control', 'no-store');
      return response;
    }

    const session = await resolveSessionFromToken(token);
    if (!session.valid) {
      const errorByReason: Record<string, string> = {
        'invalid-token': 'Invalid or expired token',
        'account-state-unavailable': 'Account state unavailable',
        'inactive-account': 'Account is inactive',
      };
      const response = NextResponse.json(
        { error: errorByReason[session.reason] || 'Invalid or expired token' },
        { status: 401 }
      );
      if (session.reason !== 'missing-token') {
        clearAuthCookie(response);
      }
      response.headers.set('Cache-Control', 'no-store');
      return response;
    }

    const response: VerifyAuthResponse = {
      valid: true,
      user: session.user,
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

