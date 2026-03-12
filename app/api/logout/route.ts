// API Route: /api/logout
import { NextRequest, NextResponse } from 'next/server';
import { clearAuthCookie } from '@/lib/auth/request';
import { requireSameOrigin } from '@/lib/server/route-helpers';

export async function POST(request: NextRequest) {
  const sameOrigin = requireSameOrigin(request);
  if (!sameOrigin.ok) {
    return sameOrigin.response;
  }

  const response = NextResponse.json({ success: true });
  clearAuthCookie(response);
  response.headers.set('Cache-Control', 'no-store');
  return response;
}
