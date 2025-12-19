import { showError, showSuccess } from './notifications.js';

// Базовый URL для API
const API_BASE = '/api';

// Класс для работы с API
class ApiService {
  constructor() {
    this.cache = new Map();
    this.cacheDuration = 5 * 60 * 1000; // 5 минут
  }

  // Получение токена
  getAuthToken() {
    return localStorage.getItem('auth_token');
  }

  // Базовый метод запроса
  async request(endpoint, options = {}) {
    const url = `${API_BASE}/${endpoint}`;
    const cacheKey = `${url}_${JSON.stringify(options)}`;
    
    // Проверка кэша
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
      return cached.data;
    }
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };
    
    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    try {
      const response = await fetch(url, {
        ...options,
        headers
      });
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `HTTP ${response.status}`);
      }
      
      const data = await response.json();
      
      // Сохраняем в кэш
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });
      
      return data;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      showError(`API Error: ${error.message}`);
      throw error;
    }
  }

  // Получение участников
  async getMembers() {
    return this.request('google-proxy?sheet=Members&id=YOUR_SHEET_ID');
  }

  // Получение активности
  async getActivity() {
    return this.request('google-proxy?sheet=Activity&id=YOUR_SHEET_ID');
  }

  // Получение новостей Discord
  async getDiscordNews() {
    return this.request('discord-news');
  }

  // Получение данных пользователя Discord
  async getDiscordUser(userId) {
    return this.request(`discord-proxy?endpoint=user&id=${userId}`);
  }

  // Получение сообщений канала
  async getChannelMessages(channelId, limit = 10) {
    return this.request(`discord-proxy?endpoint=messages&id=${channelId}&limit=${limit}`);
  }

  // Работа с гайдами через GAS
  async getGuides() {
    return this.request('gas-proxy', {
      method: 'POST',
      body: JSON.stringify({
        action: 'getGuides'
      })
    });
  }

  async createGuide(guideData) {
    return this.request('gas-proxy', {
      method: 'POST',
      body: JSON.stringify({
        action: 'createGuide',
        ...guideData
      })
    });
  }

  async updateGuide(guideId, guideData) {
    return this.request('gas-proxy', {
      method: 'POST',
      body: JSON.stringify({
        action: 'updateGuide',
        id: guideId,
        ...guideData
      })
    });
  }

  async deleteGuide(guideId) {
    return this.request('gas-proxy', {
      method: 'POST',
      body: JSON.stringify({
        action: 'deleteGuide',
        id: guideId
      })
    });
  }

  // Работа с отсутствиями
  async getAbsences() {
    return this.request('gas-proxy', {
      method: 'POST',
      body: JSON.stringify({
        action: 'getAbsences'
      })
    });
  }

  async createAbsence(absenceData) {
    return this.request('gas-proxy', {
      method: 'POST',
      body: JSON.stringify({
        action: 'createAbsence',
        ...absenceData
      })
    });
  }

  async updateAbsenceStatus(absenceId, status) {
    return this.request('gas-proxy', {
      method: 'POST',
      body: JSON.stringify({
        action: 'updateAbsence',
        id: absenceId,
        status
      })
    });
  }

  // Очистка кэша
  clearCache() {
    this.cache.clear();
    showSuccess('Cache cleared');
  }

  // Очистка кэша для конкретного endpoint
  clearCacheFor(endpoint) {
    for (const key of this.cache.keys()) {
      if (key.startsWith(`${API_BASE}/${endpoint}`)) {
        this.cache.delete(key);
      }
    }
  }
}

// Глобальный экземпляр
window.api = new ApiService();

// Утилитарные функции
export async function fetchWithRetry(endpoint, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await window.api.request(endpoint);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
}

export function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export function formatDate(date, lang = 'ru') {
  const d = new Date(date);
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return d.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', options);
}

export function formatNumber(num) {
  if (typeof num !== 'number') return '0';
  return new Intl.NumberFormat().format(num);
}