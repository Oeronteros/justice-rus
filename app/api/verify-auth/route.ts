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
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const response: VerifyAuthResponse = {
      valid: true,
      role: decoded.role,
      discordId: decoded.discordId,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Verify auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
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

