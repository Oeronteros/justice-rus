import { readFileSync } from 'node:fs';
import path from 'node:path';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';
import type { BrowserContext } from '@playwright/test';

export type VinextFixtureUser = {
  id: string;
  nickname: string;
  role: 'guest' | 'member' | 'officer' | 'head' | 'sysadmin';
  isActive: boolean;
  authMethod: 'account' | 'pin';
  discordHandle: string | null;
  className: string | null;
  prefix?: string | null;
};

const seededAccountIds = new Set<string>();

function getEnvValue(name: string): string | null {
  const fromProcess = process.env[name];
  if (fromProcess) {
    return fromProcess;
  }

  const envPath = path.join(process.cwd(), '.env.local');
  const envSource = readFileSync(envPath, 'utf8');
  const envLine = envSource
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line.startsWith(`${name}=`));

  if (!envLine) {
    return null;
  }

  const value = envLine.slice(name.length + 1).trim();
  return value || null;
}

function getJwtSecret() {
  const secret = getEnvValue('JWT_SECRET');
  if (!secret) {
    throw new Error('JWT_SECRET is missing in .env.local');
  }

  return secret;
}

async function ensurePortalAccount(user: VinextFixtureUser) {
  if (user.authMethod !== 'account') {
    return;
  }

  if (!/^\d+$/.test(user.id)) {
    throw new Error(`vinext account fixture requires numeric id, got "${user.id}"`);
  }

  if (seededAccountIds.has(user.id)) {
    return;
  }

  const databaseUrl = getEnvValue('DATABASE_URL');
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required for account-backed vinext auth fixtures');
  }

  const pool = new Pool({ connectionString: databaseUrl });
  try {
    await pool.query(
      `
      INSERT INTO portal_account (id, nickname, class_name, discord_handle, prefix, password_hash, role, is_active, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, TRUE, NOW())
      ON CONFLICT (id)
      DO UPDATE SET
        nickname = EXCLUDED.nickname,
        class_name = EXCLUDED.class_name,
        discord_handle = EXCLUDED.discord_handle,
        prefix = EXCLUDED.prefix,
        role = EXCLUDED.role,
        is_active = TRUE,
        updated_at = NOW()
      `,
      [user.id, user.nickname, user.className, user.discordHandle, user.prefix ?? null, 'e2e-fixture', user.role]
    );
    seededAccountIds.add(user.id);
  } finally {
    await pool.end();
  }
}

function createAuthToken(user: VinextFixtureUser) {
  return jwt.sign(
    {
      id: user.id,
      nickname: user.nickname,
      role: user.role,
      isActive: user.isActive,
      authMethod: user.authMethod,
      discordHandle: user.discordHandle,
      className: user.className,
      prefix: user.prefix ?? null,
      iss: 'silent-moonfall-portal',
      aud: 'silent-moonfall-users',
      sub: user.id || user.nickname || user.role,
    },
    getJwtSecret(),
    { expiresIn: '24h' }
  );
}

export async function addVinextAuthCookie(context: BrowserContext, user: VinextFixtureUser) {
  await ensurePortalAccount(user);

  await context.addCookies([
    {
      name: 'auth_token',
      value: createAuthToken(user),
      domain: '127.0.0.1',
      path: '/',
      httpOnly: false,
      secure: false,
      sameSite: 'Lax',
    },
  ]);
}
