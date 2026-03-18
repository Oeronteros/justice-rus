// API Route: /api/auth
import { NextRequest, NextResponse } from 'next/server';
import { generateToken, getClientIp } from '@/lib/auth';
import { AUTH_TOKEN_MAX_AGE_SECONDS } from '@/lib/constants';
import type { AuthResponse } from '@/lib/schemas/auth';
import { z } from 'zod';
import { getPool, hasDatabaseUrl } from '@/lib/neon';
import { ensureAccountsSchema, normalizeNickname, verifyPassword } from '@/lib/auth/accounts';
import { optionsResponse } from '@/lib/server/cors';
import { jsonError, parseJsonBody, requireDatabase, requireSameOrigin } from '@/lib/server/route-helpers';
import { buildLegacyUser, canUseDevNicknameFallback, legacyPinRole, resolveClassName } from '@/lib/server/auth/legacy-pin';
import { AuthRateLimitError, createAuthRateLimiter } from '@/lib/server/auth/rate-limit';

const AUTH_WINDOW_MS = 15 * 60 * 1000;
const AUTH_MAX_ATTEMPTS = 8;
const AUTH_BLOCK_MS = 20 * 60 * 1000;

const rateLimiter = createAuthRateLimiter({
  windowMs: AUTH_WINDOW_MS,
  maxAttempts: AUTH_MAX_ATTEMPTS,
  blockMs: AUTH_BLOCK_MS,
});

const authSchema = z.object({
  nickname: z.string().trim().min(3).max(32).optional(),
  password: z.string().min(1).max(128),
});

export async function POST(request: NextRequest) {
  const now = Date.now();
  const ip = getClientIp(request);

  try {
    const sameOrigin = requireSameOrigin(request);
    if (!sameOrigin.ok) {
      return sameOrigin.response;
    }

    const rate = rateLimiter.checkRateLimit(ip, now);
    if (!rate.allowed) {
      throw new AuthRateLimitError(rate.retryAfter || 60);
    }

    const parsed = await parseJsonBody<z.infer<typeof authSchema>>(request, authSchema, 'Invalid request data');
    if (!parsed.ok) {
      rateLimiter.registerFailure(ip, now);
      return parsed.response;
    }

    const payload = parsed.value;
    const password = payload.password.trim();
    const nickname = payload.nickname ? normalizeNickname(payload.nickname) : '';
    const legacyRole = legacyPinRole(password);

    let user: AuthResponse['user'] | null = null;

    if (nickname) {
      if (hasDatabaseUrl()) {
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
        if (row) {
          const validPassword = verifyPassword(password, row.password_hash);
          if (!validPassword) {
            if (legacyRole && canUseDevNicknameFallback(request)) {
              user = await buildLegacyUser(legacyRole, nickname);
            } else {
              rateLimiter.registerFailure(ip, now);
              return jsonError('Invalid credentials', 401);
            }
          }

          if (!user && !row.is_active) {
            if (legacyRole && canUseDevNicknameFallback(request)) {
              user = await buildLegacyUser(legacyRole, nickname);
            } else {
              return jsonError('Account exists but is not active yet. Ask officer/GM to activate it.', 403);
            }
          }

          if (!user) {
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
          }
        } else if (legacyRole && canUseDevNicknameFallback(request)) {
          user = await buildLegacyUser(legacyRole, nickname);
        } else {
          rateLimiter.registerFailure(ip, now);
          return jsonError('Invalid credentials', 401);
        }
      } else if (legacyRole && canUseDevNicknameFallback(request)) {
        user = await buildLegacyUser(legacyRole, nickname);
      } else {
        const db = requireDatabase('Database is not configured');
        if (!db.ok) {
          return db.response;
        }
      }

      if (user?.authMethod === 'account') {
        // already resolved from DB-backed account path above
      } else if (!user) {
        rateLimiter.registerFailure(ip, now);
        return jsonError('Invalid credentials', 401);
      }
    } else {
      if (!legacyRole) {
        rateLimiter.registerFailure(ip, now);
        return jsonError('Invalid credentials', 401);
      }

      user = await buildLegacyUser(legacyRole);
    }

    if (!user) {
      rateLimiter.registerFailure(ip, now);
      return jsonError('Invalid credentials', 401);
    }

    rateLimiter.clearFailures(ip);

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
    rateLimiter.registerFailure(ip, now);
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
