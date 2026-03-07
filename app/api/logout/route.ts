// API Route: /api/logout
import { NextRequest, NextResponse } from 'next/server';
import { clearAuthCookie, isSameOrigin } from '@/lib/auth/request';

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: 'Forbidden origin' }, { status: 403 });
  }

  const response = NextResponse.json({ success: true });
  clearAuthCookie(response);
  response.headers.set('Cache-Control', 'no-store');
  return response;
}
