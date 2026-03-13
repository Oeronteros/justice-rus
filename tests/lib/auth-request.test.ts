import { describe, expect, it } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { clearAuthCookie, isSameOrigin } from '@/lib/auth/request';

describe('lib/auth/request', () => {
  it('accepts same-origin requests when origin host matches the request host', () => {
    const request = new NextRequest('http://localhost/api/pvp', {
      headers: {
        origin: 'http://localhost',
        host: 'localhost',
      },
    });

    expect(isSameOrigin(request)).toBe(true);
  });

  it('rejects cross-origin requests when origin host differs from request host', () => {
    const request = new NextRequest('http://localhost/api/pvp', {
      headers: {
        origin: 'https://evil.example.com',
        host: 'localhost',
      },
    });

    expect(isSameOrigin(request)).toBe(false);
  });

  it('rejects malformed origin headers and allows same-site requests without an origin header', () => {
    const malformedOrigin = new NextRequest('http://localhost/api/pvp', {
      headers: {
        origin: 'not a valid origin',
        host: 'localhost',
      },
    });
    const sameSiteRequest = new NextRequest('http://localhost/api/pvp');

    expect(isSameOrigin(malformedOrigin)).toBe(false);
    expect(isSameOrigin(sameSiteRequest)).toBe(true);
  });

  it('clears the auth cookie using strict, httpOnly settings', () => {
    const response = NextResponse.json({ ok: true });

    clearAuthCookie(response);

    const cookie = response.cookies.get('auth_token');
    expect(cookie?.value).toBe('');
    expect(cookie?.httpOnly).toBe(true);
    expect(cookie?.sameSite).toBe('strict');
    expect(cookie?.path).toBe('/');
    expect(cookie?.maxAge).toBe(0);
  });
});
