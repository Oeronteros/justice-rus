// Утилиты аутентификации

import jwt from 'jsonwebtoken';
import { User, UserRole } from '@/types';
import { JWT_EXPIRES_IN, JWT_SECRET } from './constants';
import { timingSafeEqual } from 'node:crypto';

type JwtPayload = User & {
  iss?: string;
  aud?: string;
  sub?: string;
};

export function generateToken(role: UserRole, discordId?: string | null): string {
  return jwt.sign(
    {
      role,
      discordId: discordId || null,
      iss: 'silent-moonfall-portal',
      aud: 'silent-moonfall-users',
      sub: discordId || role,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
}

export function verifyToken(token: string): User | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'silent-moonfall-portal',
      audience: 'silent-moonfall-users',
    }) as JwtPayload;
    return {
      role: decoded.role,
      discordId: decoded.discordId || null,
      exp: decoded.exp,
    };
  } catch (error) {
    return null;
  }
}

export function getTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.split(' ')[1];
}

export function safeEqual(input: string, expected: string): boolean {
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

