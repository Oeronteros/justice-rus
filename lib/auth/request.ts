import type { NextRequest, NextResponse } from 'next/server';

function getBearerToken(headerValue: string | null): string | null {
  if (!headerValue || !headerValue.startsWith('Bearer ')) {
    return null;
  }

  return headerValue.slice(7) || null;
}

export function getAuthToken(request: Request | NextRequest): string | null {
  const headerToken = getBearerToken(request.headers.get('authorization'));

  if ('cookies' in request) {
    const cookieToken = request.cookies.get('auth_token')?.value;
    return cookieToken || headerToken || null;
  }

  return headerToken;
}

export function clearAuthCookie(response: NextResponse): void {
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

export function isSameOrigin(request: NextRequest): boolean {
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
