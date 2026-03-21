// Утилиты аутентификации

import jwt from 'jsonwebtoken';
import {
  pinAuthUserIdSchema,
  portalAccountIdSchema,
  type User,
  type UserRole,
} from '@/lib/schemas/auth';
import type {
  NotificationDefaults,
  ProfileInterest,
  ProfileTitle,
} from '@/lib/schemas/registration';
import { JWT_EXPIRES_IN, getJwtSecret } from './constants';
import { timingSafeEqual } from 'node:crypto';

type JwtPayload = {
  id?: string;
  nickname?: string;
  role: UserRole;
  isActive?: boolean;
  authMethod?: 'account' | 'pin';
  discordId?: string | null;
  discordHandle?: string | null;
  profileTitle?: ProfileTitle | null;
  preferredClasses?: string[];
  interests?: ProfileInterest[];
  notificationDefaults?: NotificationDefaults | null;
  exp?: number;
  iss?: string;
  aud?: string;
  sub?: string;
};

function hasValidAuthId(authMethod: 'account' | 'pin', id: string | undefined): boolean {
  if (authMethod === 'pin') {
    return !id || pinAuthUserIdSchema.safeParse(id).success;
  }

  return portalAccountIdSchema.safeParse(id).success;
}

export function generateToken(user: {
  id?: string;
  nickname?: string;
  role: UserRole;
  isActive?: boolean;
  authMethod?: 'account' | 'pin';
  discordId?: string | null;
  discordHandle?: string | null;
  profileTitle?: ProfileTitle | null;
  preferredClasses?: string[];
  interests?: ProfileInterest[];
  notificationDefaults?: NotificationDefaults | null;
}): string {
  const authMethod = user.authMethod ?? 'account';
  if (!hasValidAuthId(authMethod, user.id)) {
    throw new Error(`Invalid ${authMethod} auth token id`);
  }

  return jwt.sign(
    {
      id: user.id,
      nickname: user.nickname,
      role: user.role,
      isActive: user.isActive ?? true,
      authMethod,
      discordId: user.discordId || null,
      discordHandle: user.discordHandle || null,
      profileTitle: user.profileTitle || null,
      preferredClasses: user.preferredClasses || [],
      interests: user.interests || [],
      notificationDefaults: user.notificationDefaults || null,
      iss: 'silent-moonfall-portal',
      aud: 'silent-moonfall-users',
      sub: user.id || user.nickname || user.role,
    },
    getJwtSecret(),
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
}

export function verifyToken(token: string): User | null {
  try {
    const decoded = jwt.verify(token, getJwtSecret(), {
      issuer: 'silent-moonfall-portal',
      audience: 'silent-moonfall-users',
    }) as JwtPayload;

    if (!decoded.role) {
      return null;
    }

    const authMethod = decoded.authMethod ?? 'account';
    if (!hasValidAuthId(authMethod, decoded.id)) {
      return null;
    }

    return {
      id: decoded.id,
      nickname: decoded.nickname,
      role: decoded.role,
      isActive: decoded.isActive ?? true,
      authMethod,
      discordId: decoded.discordId || null,
      discordHandle: decoded.discordHandle || null,
      profileTitle: decoded.profileTitle || null,
      preferredClasses: decoded.preferredClasses || [],
      interests: decoded.interests || [],
      notificationDefaults: decoded.notificationDefaults || undefined,
      exp: decoded.exp,
    };
  } catch (error) {
    return null;
  }
}

export function safeEqual(input: string, expected: string | null | undefined): boolean {
  if (!expected) {
    return false;
  }

  const left = Buffer.from(String(input), 'utf8');
  const right = Buffer.from(String(expected), 'utf8');
  if (left.length !== right.length) {
    return false;
  }
  return timingSafeEqual(left, right);
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  return 'unknown';
}

