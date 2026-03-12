// API Route: /api/auth
import { NextRequest, NextResponse } from 'next/server';
import { generateToken, getClientIp, safeEqual } from '@/lib/auth';
import { AUTH_TOKEN_MAX_AGE_SECONDS, PASSWORDS } from '@/lib/constants';
import type { AuthResponse, UserRole } from '@/lib/schemas/auth';
import { z } from 'zod';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { ensureAccountsSchema, normalizeNickname, verifyPassword } from '@/lib/auth/accounts';
import { getCachedTableColumns } from '@/lib/server/db-cache';
import { optionsResponse } from '@/lib/server/cors';
import { jsonError, parseJsonBody, requireDatabase, requireSameOrigin } from '@/lib/server/route-helpers';

const AUTH_WINDOW_MS = 15 * 60 * 1000;
const AUTH_MAX_ATTEMPTS = 8;
const AUTH_BLOCK_MS = 20 * 60 * 1000;

type AttemptState = {
  count: number;
  windowStartedAt: number;
  blockedUntil?: number;
};

class AuthRateLimitError extends Error {
  readonly status = 429;
  readonly headers: HeadersInit;

  constructor(retryAfter: number) {
    super('Too many login attempts. Try again later.');
    this.name = 'AuthRateLimitError';
    this.headers = { 'Retry-After': String(retryAfter || 60) };
  }
}

const loginAttempts = new Map<string, AttemptState>();

const authSchema = z.object({
  nickname: z.string().trim().min(3).max(32).optional(),
  password: z.string().min(1).max(128),
});

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

function legacyPinRole(password: string): UserRole | null {
  if (safeEqual(password, PASSWORDS.officer)) return 'officer';
  if (safeEqual(password, PASSWORDS.head)) return 'head';
  if (safeEqual(password, PASSWORDS.sysadmin)) return 'sysadmin';
  return null;
}

async function resolveClassName(nickname: string | undefined): Promise<string | null> {
  if (!nickname || !hasDatabaseUrl()) return null;

  const pool = getPool();
  const names = await getCachedTableColumns('registrations');
  const nickCol = names.has('nick') ? 'nick' : names.has('nickname') ? 'nickname' : null;
  const classCol = names.has('class_name') ? 'class_name' : names.has('class') ? 'class' : null;
  if (!nickCol || !classCol) return null;

  const result = await pool.query(
    `SELECT ${classCol} AS class_name FROM registrations WHERE LOWER(${nickCol}) = LOWER($1) LIMIT 1`,
    [nickname]
  );
  return result.rows[0]?.class_name || null;
}

export async function POST(request: NextRequest) {
  const now = Date.now();
  const ip = getClientIp(request);

  try {
    const sameOrigin = requireSameOrigin(request);
    if (!sameOrigin.ok) {
      return sameOrigin.response;
    }

    const rate = checkRateLimit(ip, now);
    if (!rate.allowed) {
      throw new AuthRateLimitError(rate.retryAfter || 60);
    }

    const parsed = await parseJsonBody<z.infer<typeof authSchema>>(request, authSchema, 'Invalid request data');
    if (!parsed.ok) {
      registerFailure(ip, now);
      return parsed.response;
    }

    const payload = parsed.value;
    const password = payload.password.trim();
    const nickname = payload.nickname ? normalizeNickname(payload.nickname) : '';

    let user: AuthResponse['user'] | null = null;

    if (nickname) {
      const db = requireDatabase('Database is not configured');
      if (!db.ok) {
        return db.response;
      }

      await ensureAccountsSchema();
      const pool = getPool();
      const result = await pool.query(
        `
        SELECT id, nickname, class_name, discord_handle, prefix, role, is_active, password_hash
        FROM portal_account
        WHERE LOWER(nickname) = LOWER($1)
        LIMIT 1
        `,
        [nickname]
      );

      const row = result.rows[0];
      const validPassword = row ? verifyPassword(password, row.password_hash) : false;
      if (!row || !validPassword) {
        registerFailure(ip, now);
        return jsonError('Invalid credentials', 401);
      }

      if (!row.is_active) {
        return jsonError('Account exists but is not active yet. Ask officer/GM to activate it.', 403);
      }

      await pool.query(
        `UPDATE portal_account SET last_login_at = NOW(), updated_at = NOW() WHERE id = $1`,
        [row.id]
      );

        user = {
          id: String(row.id),
          nickname: row.nickname,
          role: row.role,
          isActive: true,
          authMethod: 'account',
          discordHandle: row.discord_handle || null,
          className: (await resolveClassName(row.nickname)) || row.class_name || null,
          prefix: row.prefix || null,
        };
    } else {
      const role = legacyPinRole(password);
      if (!role) {
        registerFailure(ip, now);
        return jsonError('Invalid credentials', 401);
      }

      user = {
        id: `pin-${role}`,
        nickname: `${role.toUpperCase()} PIN`,
        role,
        isActive: true,
        authMethod: 'pin',
        discordHandle: null,
        className: null,
        prefix: null,
      };
    }

    clearFailures(ip);

    const token = generateToken(user);
    const responseBody: AuthResponse = {
      success: true,
      user,
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
    response.headers.set('Cache-Control', 'no-store');
    console.info('[auth] login success', { ip, role: user.role, nickname: user.nickname });
    return response;
  } catch (error) {
    registerFailure(ip, now);
    if (error instanceof AuthRateLimitError) {
      return jsonError(error.message, error.status, { headers: error.headers });
    }

    console.error('Auth error:', error);
    return jsonError('Internal server error', 500);
  }
}

export async function OPTIONS() {
  return optionsResponse({ methods: ['POST'], headers: ['Content-Type'] });
}
