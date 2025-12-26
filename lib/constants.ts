// Константы приложения

const requireEnv = (name: string): string => {
  const value = process.env[name];
  if (!value || !value.trim()) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value.trim();
};


// Отладка: выводим значения переменных окружения при запуске (только для отладки)

export const PASSWORDS = {
  member: requireEnv('MEMBER_PASSWORD'),
  officer: requireEnv('OFFICER_PASSWORD'),
  gm: requireEnv('GM_PASSWORD'),
} as const;


export const JWT_SECRET = requireEnv('JWT_SECRET');

export const JWT_EXPIRES_IN = '24h';

// Удалено: больше не используем Google Sheets
// export const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID || '1-ay4I-83j1mSMsU9Y5Txt_vdnEH6IVZTLnHpJbwIbJk';
// export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export const CACHE_TTL = 5 * 60 * 1000; // 5 минут

export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',') || ['*'];

// Discord Bot API URL
export const DISCORD_BOT_API_URL = process.env.DISCORD_BOT_API_URL || 'http://localhost:3001';
