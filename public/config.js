// CONFIG.js - Настройки приложения
window.CONFIG = {
  // === ПИН-КОДЫ (для теста) ===
  PINS: {
    member: '1234',
    officer: '5678',
    gm: '9999'
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
  
  // === DISCORD (отключим временно) ===
  DISCORD: {
    USE_PROXY: false,
    BOT_TOKEN: '',
    GUILD_ID: '',
    NEWS_CHANNEL_ID: '',
    AVATAR_BASE_URL: 'https://cdn.discordapp.com/embed/avatars'
  },
  
  // === API ENDPOINTS ===
  API: {
    DISCORD_PROXY: '/api/discord-proxy',
    GOOGLE_SHEETS_PROXY: '/api/google-proxy'
  },
  
  // === НАСТРОЙКИ ===
  CACHE_DURATION: 5 * 60 * 1000, // 5 минут
  STATS_KEY: 'demonic_cult_stats',
  VERSION: '1.0.0'
};

// Проверка загрузки
console.log('CONFIG loaded:', window.CONFIG ? 'YES' : 'NO');
console.log('SHEETS:', window.CONFIG.SHEETS);