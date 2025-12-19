import { showError, showSuccess, showWarning } from './notifications.js';

class ApiService {
  constructor() {
    this.baseUrl = '/api';
    this.cache = new Map();
    this.useDemoData = false; // Флаг для использования демо-данных
  }

  async request(endpoint, options = {}) {
    // Если включен демо-режим, используем тестовые данные
    if (this.useDemoData && endpoint.includes('google-proxy')) {
      return this.getDemoData(endpoint);
    }

    const url = `${this.baseUrl}/${endpoint}`;
    const cacheKey = `${url}_${JSON.stringify(options)}`;
    
    // Проверка кэша (5 минут)
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < 300000) {
      return cached.data;
    }
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // Если ошибка 404, предлагаем использовать демо-данные
        if (response.status === 404 && endpoint.includes('google-proxy')) {
          showWarning('Google Sheet not found. Using demo data. Check your spreadsheet ID.');
          this.useDemoData = true;
          return this.getDemoData(endpoint);
        }
        
        throw new Error(data.error || data.message || `HTTP ${response.status}`);
      }
      
      // Сохраняем в кэш
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });
      
      return data;
      
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      
      // При сетевой ошибке пробуем демо-данные
      if (endpoint.includes('google-proxy')) {
        showWarning('Network error. Using demo data.');
        this.useDemoData = true;
        return this.getDemoData(endpoint);
      }
      
      showError(`API Error: ${error.message}`);
      throw error;
    }
  }

  // Получение демо-данных
  async getDemoData(endpoint) {
    const params = new URLSearchParams(endpoint.split('?')[1] || '');
    const sheet = params.get('sheet') || 'members';
    
    const response = await fetch(`/api/demo-data?sheet=${sheet}`);
    return await response.json();
  }

  // Получение участников
  async getMembers() {
    try {
      // Пробуем получить из Google Sheets
      const sheetId = '1-ay4I-83j1mSMsU9Y5Txt_vdnEH6IVZTLnHpJbwIbJk'
      return await this.request(`google-proxy?sheet=Members&id=${sheetId}`);
    } catch (error) {
      // Если не получилось, используем демо-данные
      return this.getDemoData('?sheet=members');
    }
  }

  // Получение активности
  async getActivity() {
    try {
      const sheetId = process.env.GOOGLE_SHEET_ID || 'YOUR_SPREADSHEET_ID';
      return await this.request(`google-proxy?sheet=Activity&id=${sheetId}`);
    } catch (error) {
      return this.getDemoData('?sheet=activity');
    }
  }

  // Получение гайдов
  async getGuides() {
    try {
      const sheetId = process.env.GOOGLE_SHEET_ID || 'YOUR_SPREADSHEET_ID';
      const data = await this.request(`google-proxy?sheet=Guides&id=${sheetId}`);
      
      // Преобразуем CSV в объекты
      return this.transformGuidesData(data);
    } catch (error) {
      const demoData = await this.getDemoData('?sheet=guides');
      return this.transformGuidesData(demoData);
    }
  }

  // Преобразование данных гайдов
  transformGuidesData(data) {
    if (!data || data.length < 2) return [];
    
    const headers = data[0];
    const rows = data.slice(1);
    
    return rows.map(row => {
      const guide = {};
      headers.forEach((header, index) => {
        guide[header.toLowerCase()] = row[index] || '';
      });
      return guide;
    });
  }

  // Очистка кэша
  clearCache() {
    this.cache.clear();
    showSuccess('Cache cleared');
  }

  // Включение/выключение демо-режима
  toggleDemoMode(enabled) {
    this.useDemoData = enabled;
    if (enabled) {
      showWarning('Demo mode enabled. Using test data.');
    } else {
      showSuccess('Demo mode disabled. Using real data.');
    }
  }
}

// Глобальный экземпляр
window.api = new ApiService();

// Экспорт утилит
export function formatDate(dateStr) {
  if (!dateStr) return 'N/A';
  
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

export function getLevelClass(level) {
  const levelMap = {
    'novice': 'level-novice',
    'member': 'level-member',
    'veteran': 'level-veteran',
    'elite': 'level-elite',
    'legend': 'level-legend',
    'gm': 'level-gm'
  };
  
  const lowerLevel = level?.toLowerCase();
  return levelMap[lowerLevel] || 'bg-gray-700';
}

export function getStatusClass(status) {
  const statusMap = {
    'active': 'status-active',
    'inactive': 'status-inactive',
    'pending': 'status-pending',
    'leave': 'status-leave'
  };
  
  const lowerStatus = status?.toLowerCase();
  return statusMap[lowerStatus] || 'bg-gray-700';
}