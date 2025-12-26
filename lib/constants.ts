// Константы приложения

// Отладка: выводим значения переменных окружения при запуске (только для отладки)
console.log('[CONSTANTS] MEMBER_PIN from env:', process.env.MEMBER_PIN);
console.log('[CONSTANTS] OFFICER_PIN from env:', process.env.OFFICER_PIN);
console.log('[CONSTANTS] GM_PIN from env:', process.env.GM_PIN);

export const PIN_CODES = {
  member: (process.env.MEMBER_PIN || '1111').trim(),
  officer: (process.env.OFFICER_PIN || '2222').trim(),
  gm: (process.env.GM_PIN || '3333').trim(),
} as const;

console.log('[CONSTANTS] PIN_CODES after processing:', PIN_CODES);

export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export const JWT_EXPIRES_IN = '24h';

// Удалено: больше не используем Google Sheets
// export const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID || '1-ay4I-83j1mSMsU9Y5Txt_vdnEH6IVZTLnHpJbwIbJk';
// export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export const CACHE_TTL = 5 * 60 * 1000; // 5 минут

export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',') || ['*'];

// Discord Bot API URL
export const DISCORD_BOT_API_URL = process.env.DISCORD_BOT_API_URL || 'http://localhost:3001';
