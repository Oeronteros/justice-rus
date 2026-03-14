// Константы приложения

const requireEnv = (name: string): string => {
  const value = process.env[name];
  if (!value || !value.trim()) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value.trim();
};

const requireAnyEnv = (...names: string[]): string => {
  for (const name of names) {
    const value = process.env[name];
    if (value && value.trim()) {
      return value.trim();
    }
  }
  throw new Error(`Missing required env vars: ${names.join(' or ')}`);
};

const optionalAnyEnv = (...names: string[]): string | null => {
  for (const name of names) {
    const value = process.env[name];
    if (value && value.trim()) {
      return value.trim();
    }
  }
  return null;
};

// Отладка: выводим значения переменных окружения при запуске (только для отладки)

export const PASSWORDS = {
  member: optionalAnyEnv('MEMBER_PASSWORD', 'MEMBER_PIN'),
  officer: optionalAnyEnv('OFFICER_PASSWORD', 'OFFICER_PIN'),
  head: optionalAnyEnv('HEAD_PASSWORD', 'HEAD_PIN', 'GM_PASSWORD', 'GM_PIN'),
  sysadmin: optionalAnyEnv('SYSADMIN_PASSWORD', 'SYSADMIN_PIN'),
} as const;


let jwtSecretCache: string | null = null;

export function getJwtSecret(): string {
  if (!jwtSecretCache) {
    jwtSecretCache = requireEnv('JWT_SECRET');
  }

  return jwtSecretCache;
}

export const JWT_EXPIRES_IN = '24h';
export const AUTH_TOKEN_MAX_AGE_SECONDS = 60 * 60 * 12;

// Удалено: больше не используем Google Sheets
// export const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID || '1-ay4I-83j1mSMsU9Y5Txt_vdnEH6IVZTLnHpJbwIbJk';
// export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export const CACHE_TTL = 5 * 60 * 1000; // 5 минут

export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',') || ['*'];

// Discord Bot API URL
export const DISCORD_BOT_API_URL = process.env.DISCORD_BOT_API_URL || 'http://localhost:3001';
