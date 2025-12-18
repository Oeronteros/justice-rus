// CONFIG.js - Настройки приложения
window.CONFIG = {
  // === PIN КОДЫ ===
  PINS: {
    member: '1234',
    officer: '6933',
    gm: '5934'
  },
  
  // === РОЛИ ===
  ROLE_NAMES: {
    member: { ru: 'Участник', en: 'Member' },
    officer: { ru: 'Офицер', en: 'Officer' },
    gm: { ru: 'ГМ', en: 'GM' }
  },
  
  // === УРОВНИ ===
  LEVELS: {
    novice: { min: 0, max: 99, name: { ru: 'Новичок', en: 'Novice' }, color: 'level-novice' },
    member: { min: 100, max: 499, name: { ru: 'Участник', en: 'Member' }, color: 'level-member' },
    veteran: { min: 500, max: 999, name: { ru: 'Ветеран', en: 'Veteran' }, color: 'level-veteran' },
    elite: { min: 1000, max: 1999, name: { ru: 'Элита', en: 'Elite' }, color: 'level-elite' },
    legend: { min: 2000, max: 4999, name: { ru: 'Легенда', en: 'Legend' }, color: 'level-legend' },
    gm: { min: 5000, max: 9999, name: { ru: 'ГМ', en: 'GM' }, color: 'level-gm' }
  },
  
  // === GOOGLE SHEETS ===
  SHEET_ID: '1-ay4I-83j1mSMsU9Y5Txt_vdnEH6IVZTLnHpJbwIbJk',
  SHEETS: {
    members: 'Заявки',
    technical: 'Техническая Таблица',
    activity: 'Activity',
    help: 'HelpRequests',
    news: 'News',
    guides: 'Guides'
  },
  
  // === DISCORD (опционально) ===
DISCORD: {
  BOT_TOKEN: process.env.DISCORD_BOT_TOKEN || '', // Теперь берём из Netlify
  GUILD_ID: process.env.DISCORD_GUILD_ID || '',
  NEWS_CHANNEL_ID: process.env.DISCORD_NEWS_CHANNEL_ID || '',
  AVATAR_BASE_URL: 'https://cdn.discordapp.com/avatars',
  USE_PROXY: true // Используем Netlify Functions
 },
  
  // === API ENDPOINTS ===
  API: {
  DISCORD_PROXY: '/.netlify/functions/discord-proxy',
  GOOGLE_SHEETS_PROXY: '/.netlify/functions/google-proxy'
 }
  
  // === НАСТРОЙКИ ===
  CACHE_DURATION: 5 * 60 * 1000, // 5 минут
  STATS_KEY: 'demonic_cult_stats',
  VERSION: '1.0.0'
};