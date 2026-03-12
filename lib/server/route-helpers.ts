import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyToken } from '@/lib/auth';
import { hasRoleAtLeast } from '@/lib/authz';
import { clearAuthCookie, getAuthToken, isSameOrigin } from '@/lib/auth/request';
import { hasDatabaseUrl } from '@/lib/neon';
import type { User, UserRole } from '@/lib/schemas/auth';
import { resolveSessionFromToken, type SessionFailureReason } from '@/lib/server/auth-session';

export type RouteGuard<T> =
  | { ok: true; value: T }
  | { ok: false; response: NextResponse };

type JsonErrorOptions = {
  details?: unknown;
  headers?: HeadersInit;
};

type ActiveSessionMessages = Partial<Record<SessionFailureReason, string>>;

type RouteErrorOptions = {
  logLabel: string;
  fallbackMessage: string;
  invalidMessage?: string;
};

type StatusError = Error & {
  status: number;
  details?: unknown;
  headers?: HeadersInit;
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

function activeSessionMessage(reason: SessionFailureReason, messages: ActiveSessionMessages): string {
  const defaults: Record<SessionFailureReason, string> = {
    'missing-token': 'Unauthorized',
    'invalid-token': 'Invalid or expired token',
    'account-state-unavailable': 'Account state unavailable',
    'inactive-account': 'Account is inactive',
  };

  return messages[reason] ?? defaults[reason];
}

export async function requireActiveSession(
  request: Request | NextRequest,
  messages: ActiveSessionMessages = {}
): Promise<RouteGuard<User>> {
  const token = getAuthToken(request);
  const session = await resolveSessionFromToken(token);

  if (!session.valid) {
    const response = jsonError(activeSessionMessage(session.reason, messages), 401);
    if (session.reason !== 'missing-token') {
      clearAuthCookie(response);
    }
    response.headers.set('Cache-Control', 'no-store');
    return { ok: false, response };
  }

  return { ok: true, value: session.user };
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

function isStatusError(error: unknown): error is StatusError {
  return error instanceof Error && 'status' in error && typeof (error as { status?: unknown }).status === 'number';
}

export function handleRouteError(error: unknown, options: RouteErrorOptions): NextResponse {
  if (error instanceof z.ZodError) {
    return jsonError(options.invalidMessage ?? 'Invalid payload', 400, { details: error.errors });
  }

  if (isStatusError(error)) {
    return jsonError(error.message || options.fallbackMessage, error.status, {
      details: error.details,
      headers: error.headers,
    });
  }

  console.error(options.logLabel, error);
  return jsonError(options.fallbackMessage, 500);
}
