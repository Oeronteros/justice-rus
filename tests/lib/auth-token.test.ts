import { beforeEach, describe, expect, it } from 'vitest';
import jwt from 'jsonwebtoken';
import { generateToken, verifyToken } from '@/lib/auth';

describe('auth token id contract', () => {
  beforeEach(() => {
    process.env.JWT_SECRET = 'test-secret';
  });

  it('round-trips account auth with numeric portal account ids', () => {
    const token = generateToken({
      id: '42',
      nickname: 'Moon',
      role: 'member',
      authMethod: 'account',
      isActive: true,
      discordHandle: null,
    });

    expect(verifyToken(token)).toEqual(
      expect.objectContaining({
        id: '42',
        role: 'member',
        authMethod: 'account',
      })
    );
  });

  it('rejects malformed account ids at token generation time', () => {
    expect(() =>
      generateToken({
        id: 'member-1',
        nickname: 'Moon',
        role: 'member',
        authMethod: 'account',
        isActive: true,
        discordHandle: null,
      })
    ).toThrow('Invalid account auth token id');
  });

  it('rejects malformed account ids during token verification', () => {
    const malformedToken = jwt.sign(
      {
        id: 'member-1',
        nickname: 'Moon',
        role: 'member',
        isActive: true,
        authMethod: 'account',
        iss: 'silent-moonfall-portal',
        aud: 'silent-moonfall-users',
        sub: 'member-1',
      },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    expect(verifyToken(malformedToken)).toBeNull();
  });

  it('allows pin auth ids with pin-prefixed values', () => {
    const token = generateToken({
      id: 'pin-officer',
      nickname: 'Officer PIN',
      role: 'officer',
      authMethod: 'pin',
      isActive: true,
      discordHandle: null,
    });

    expect(verifyToken(token)).toEqual(
      expect.objectContaining({
        id: 'pin-officer',
        role: 'officer',
        authMethod: 'pin',
      })
    );
  });
});
