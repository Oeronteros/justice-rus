import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyToken } from '@/lib/auth';
import { hasRoleAtLeast } from '@/lib/authz';
import { getAuthToken, isSameOrigin } from '@/lib/auth/request';
import { hasDatabaseUrl } from '@/lib/neon';
import type { User, UserRole } from '@/lib/schemas/auth';

export type RouteGuard<T> =
  | { ok: true; value: T }
  | { ok: false; response: NextResponse };

type JsonErrorOptions = {
  details?: unknown;
  headers?: HeadersInit;
};

type RouteErrorOptions = {
  logLabel: string;
  fallbackMessage: string;
  invalidMessage?: string;
};

export function jsonError(message: string, status: number, options: JsonErrorOptions = {}): NextResponse {
  const body = options.details === undefined ? { error: message } : { error: message, details: options.details };
  return NextResponse.json(body, { status, headers: options.headers });
}

export function requireSameOrigin(request: NextRequest, message = 'Forbidden origin'): RouteGuard<true> {
  if (!isSameOrigin(request)) {
    return { ok: false, response: jsonError(message, 403) };
  }

  return { ok: true, value: true };
}

export function requireAuth(request: Request | NextRequest, message = 'Unauthorized'): RouteGuard<User> {
  const token = getAuthToken(request);
  const user = token ? verifyToken(token) : null;

  if (!user) {
    return { ok: false, response: jsonError(message, 401) };
  }

  return { ok: true, value: user };
}

export function requireMinimumRole(
  user: User,
  minimumRole: UserRole,
  message = 'Forbidden'
): RouteGuard<User> {
  if (!hasRoleAtLeast(user.role, minimumRole)) {
    return { ok: false, response: jsonError(message, 403) };
  }

  return { ok: true, value: user };
}

export function requirePermission(user: User, predicate: (user: User) => boolean, message = 'Forbidden'): RouteGuard<User> {
  if (!predicate(user)) {
    return { ok: false, response: jsonError(message, 403) };
  }

  return { ok: true, value: user };
}

export function requireDatabase(message = 'Database is not configured (missing DATABASE_URL)'): RouteGuard<true> {
  if (!hasDatabaseUrl()) {
    return { ok: false, response: jsonError(message, 503) };
  }

  return { ok: true, value: true };
}

export async function parseJsonBody<T>(
  request: Request,
  schema: z.ZodType<T>,
  invalidMessage = 'Invalid payload'
): Promise<RouteGuard<T>> {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return { ok: false, response: jsonError(invalidMessage, 400) };
  }

  const parsed = schema.safeParse(payload);

  if (!parsed.success) {
    return { ok: false, response: jsonError(invalidMessage, 400, { details: parsed.error.errors }) };
  }

  return { ok: true, value: parsed.data };
}

export function handleRouteError(error: unknown, options: RouteErrorOptions): NextResponse {
  if (error instanceof z.ZodError) {
    return jsonError(options.invalidMessage ?? 'Invalid payload', 400, { details: error.errors });
  }

  console.error(options.logLabel, error);
  return jsonError(options.fallbackMessage, 500);
}
