// API клиент
// Использует прокси через Discord бота вместо прямого подключения к БД

import { Registration, Schedule, Guide, News, Absence, ApiResponse } from '@/types';

const API_BASE = '/api/discord-proxy';

class ApiService {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheTTL = 5 * 60 * 1000; // 5 минут

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE}/${endpoint}`;
    const cacheKey = `${url}_${JSON.stringify(options)}`;
    
    // Проверка кэша
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
      return cached.data;
    }
    
    try {
      const token = typeof window !== 'undefined' 
        ? localStorage.getItem('auth_token') 
        : null;

      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || `HTTP ${response.status}`);
      }
      
      const data: T = await response.json();
      
      // Сохраняем в кэш
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });
      
      return data;
      
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  async getRegistrations(): Promise<Registration[]> {
    return await this.request<Registration[]>('registration');
  }

  async getSchedule(): Promise<Schedule[]> {
    return await this.request<Schedule[]>('schedule');
  }

  // Deprecated: используйте getRegistrations
  async getMembers(): Promise<Registration[]> {
    return this.getRegistrations();
  }

  // Deprecated: используйте getSchedule
  async getActivity(): Promise<Schedule[]> {
    return this.getSchedule();
  }

  async getGuides(): Promise<Guide[]> {
    return await this.request<Guide[]>('guides');
  }

  async getNews(): Promise<News[]> {
    return await this.request<News[]>('news');
  }

  async getAbsences(): Promise<Absence[]> {
    return await this.request<Absence[]>('absences');
  }

  clearCache() {
    this.cache.clear();
  }
}

export const apiService = new ApiService();

