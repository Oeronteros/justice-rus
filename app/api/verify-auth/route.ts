// API Route: /api/verify-auth
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';
import { VerifyAuthResponse } from '@/types';

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
      response.headers.set('Cache-Control', 'no-store');
      return response;
    }

    const response: VerifyAuthResponse = {
      valid: true,
      role: decoded.role,
      discordId: decoded.discordId,
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

