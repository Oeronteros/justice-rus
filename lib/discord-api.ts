// API клиент для взаимодействия с Discord ботом
// Веб-сайт получает данные через Discord бота, а не напрямую из БД

import { Registration, Schedule, News, Guide, Absence, ApiResponse } from '@/types';

const DISCORD_BOT_API_URL = process.env.DISCORD_BOT_API_URL || 'http://localhost:3001';

class DiscordBotApiService {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheTTL = 5 * 60 * 1000; // 5 минут

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${DISCORD_BOT_API_URL}${endpoint}`;
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
      
      const data: ApiResponse<T> | T = await response.json();
      
      // Если ответ обернут в ApiResponse, извлекаем data
      const result = (data as ApiResponse<T>).data || (data as T);
      
      // Сохраняем в кэш
      this.cache.set(cacheKey, {
        data: result,
        timestamp: Date.now()
      });
      
      return result as T;
      
    } catch (error) {
      console.error(`Discord Bot API Error (${endpoint}):`, error);
      throw error;
    }
  }

  async getRegistrations(): Promise<Registration[]> {
    return await this.request<Registration[]>('/api/registrations');
  }

  async getSchedule(): Promise<Schedule[]> {
    return await this.request<Schedule[]>('/api/schedule');
  }

  async getNews(): Promise<News[]> {
    return await this.request<News[]>('/api/news');
  }

  async getGuides(): Promise<Guide[]> {
    return await this.request<Guide[]>('/api/guides');
  }

  async getAbsences(): Promise<Absence[]> {
    return await this.request<Absence[]>('/api/absences');
  }

  clearCache() {
    this.cache.clear();
  }

  // Deprecated methods
  async getMembers(): Promise<Registration[]> {
    return this.getRegistrations();
  }

  async getActivity(): Promise<Schedule[]> {
    return this.getSchedule();
  }
}

export const discordBotApi = new DiscordBotApiService();

