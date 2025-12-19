window.CONFIG = {
  // PIN коды для разных ролей
  PINS: {
    member: "1111",
    officer: "2222", 
    gm: "3333"
  },
  
  // Названия ролей на разных языках
  ROLE_NAMES: {
    member: { ru: "Участник", en: "Member" },
    officer: { ru: "Офицер", en: "Officer" },
    gm: { ru: "ГМ", en: "GM" }
  },
  
  // Уровни участников
  LEVELS: {
    novice: { 
      name: { ru: "Новичок", en: "Novice" }, 
      color: "level-novice",
      min: 0, max: 499
    },
    member: { 
      name: { ru: "Участник", en: "Member" }, 
      color: "level-member",
      min: 500, max: 1999
    },
    veteran: { 
      name: { ru: "Ветеран", en: "Veteran" }, 
      color: "level-veteran",
      min: 2000, max: 4999
    },
    elite: { 
      name: { ru: "Элита", en: "Elite" }, 
      color: "level-elite",
      min: 5000, max: 9999
    },
    legend: { 
      name: { ru: "Легенда", en: "Legend" }, 
      color: "level-legend",
      min: 10000, max: 19999
    },
    gm: { 
      name: { ru: "ГМ", en: "GM" }, 
      color: "level-gm",
      min: 20000, max: 999999
    }
  },
  
  // URL Google Apps Script (Web App)
  API: {
    GAS_URL: "https://script.google.com/macros/s/AKfycbzJIYEE3ffqOWdrbVf-kiNOVUVxeKknMf1qOs9Kw3AHiajlkwgjgRswsyrwZWuYy7cXBw/exec"
  },
  
  // Настройки кэша
  CACHE_DURATION: 300000, // 5 минут
  
  // Ключ для статистики в localStorage
  STATS_KEY: "guild_portal_stats"
};