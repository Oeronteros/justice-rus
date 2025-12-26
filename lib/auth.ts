// Утилиты аутентификации

import jwt from 'jsonwebtoken';
import { User, UserRole } from '@/types';
import { JWT_SECRET } from './constants';

export function generateToken(role: UserRole, discordId?: string | null): string {
  return jwt.sign(
    {
      role,
      discordId: discordId || null,
    },
    JWT_SECRET,
    {
      expiresIn: '24h',
    }
  );
}

export function verifyToken(token: string): User | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as User;
    return decoded;
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

