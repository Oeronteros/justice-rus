// API Route: /api/auth
import { NextRequest, NextResponse } from 'next/server';
import { generateToken, getClientIp, safeEqual } from '@/lib/auth';
import { AUTH_TOKEN_MAX_AGE_SECONDS, PASSWORDS } from '@/lib/constants';
import { AuthResponse } from '@/types';
import { z } from 'zod';

const AUTH_WINDOW_MS = 15 * 60 * 1000;
const AUTH_MAX_ATTEMPTS = 8;
const AUTH_BLOCK_MS = 20 * 60 * 1000;

type AttemptState = {
  count: number;
  windowStartedAt: number;
  blockedUntil?: number;
};

const loginAttempts = new Map<string, AttemptState>();

function cleanupAttempts(now: number) {
  for (const [ip, state] of loginAttempts.entries()) {
    const expiredWindow = now - state.windowStartedAt > AUTH_WINDOW_MS;
    const unblocked = !state.blockedUntil || state.blockedUntil <= now;
    if (expiredWindow && unblocked) {
      loginAttempts.delete(ip);
    }
  }
}

function checkRateLimit(ip: string, now: number): { allowed: boolean; retryAfter?: number } {
  cleanupAttempts(now);
  const state = loginAttempts.get(ip);
  if (!state) return { allowed: true };

  if (state.blockedUntil && state.blockedUntil > now) {
    const retryAfter = Math.max(1, Math.ceil((state.blockedUntil - now) / 1000));
    return { allowed: false, retryAfter };
  }

  if (now - state.windowStartedAt > AUTH_WINDOW_MS) {
    loginAttempts.set(ip, { count: 0, windowStartedAt: now });
    return { allowed: true };
  }

  return { allowed: true };
}

function registerFailure(ip: string, now: number) {
  const state = loginAttempts.get(ip);
  if (!state || now - state.windowStartedAt > AUTH_WINDOW_MS) {
    loginAttempts.set(ip, { count: 1, windowStartedAt: now });
    return;
  }

  const nextCount = state.count + 1;
  const blockedUntil = nextCount >= AUTH_MAX_ATTEMPTS ? now + AUTH_BLOCK_MS : undefined;

  loginAttempts.set(ip, {
    count: nextCount,
    windowStartedAt: state.windowStartedAt,
    blockedUntil,
  });
}

function clearFailures(ip: string) {
  loginAttempts.delete(ip);
}

function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true;

  const host = request.headers.get('host');
  if (!host) return false;

  try {
    const originHost = new URL(origin).host;
    return originHost === host;
  } catch {
    return false;
  }
}

const authSchema = z.object({
  password: z.string().min(1),
  discordId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const now = Date.now();
  const ip = getClientIp(request);

  try {
    if (!isSameOrigin(request)) {
      return NextResponse.json({ error: 'Forbidden origin' }, { status: 403 });
    }

    const rate = checkRateLimit(ip, now);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: 'Too many login attempts. Try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(rate.retryAfter || 60),
          },
        }
      );
    }

    const body = await request.json();
    const { password, discordId } = authSchema.parse(body);

    // Проверяем пароль
    let role: 'member' | 'officer' | 'gm' | null = null;
    const normalizedPassword = String(password).trim();

    if (safeEqual(normalizedPassword, PASSWORDS.member)) {
      role = 'member';
    } else if (safeEqual(normalizedPassword, PASSWORDS.officer)) {
      role = 'officer';
    } else if (safeEqual(normalizedPassword, PASSWORDS.gm)) {
      role = 'gm';
    }

    if (!role) {
      registerFailure(ip, now);
      console.warn('[auth] failed login', { ip });
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    clearFailures(ip);

    const token = generateToken(role, discordId);

    const responseBody: AuthResponse = {
      success: true,
      role,
    };

    const response = NextResponse.json(responseBody);
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: AUTH_TOKEN_MAX_AGE_SECONDS,
      priority: 'high',
    });
    console.info('[auth] login success', { ip, role });
    return response;
  } catch (error) {
    registerFailure(ip, now);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Auth error:', error);
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
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

