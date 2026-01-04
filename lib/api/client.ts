import { z } from 'zod';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
  schema?: z.ZodType<T>
): Promise<T> {
  const { body, ...restOptions } = options;
  
  const response = await fetch(`/api/${endpoint}`, {
    ...restOptions,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...restOptions.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(
      error.message || error.error || `HTTP ${response.status}`,
      response.status,
      error.code
    );
  }

  const data = await response.json();
  
  if (schema) {
    return schema.parse(data);
  }
  
  return data as T;
}

export const api = {
  get: <T>(endpoint: string, schema?: z.ZodType<T>) => 
    request<T>(endpoint, { method: 'GET' }, schema),
    
  post: <T>(endpoint: string, body: unknown, schema?: z.ZodType<T>) =>
    request<T>(endpoint, { method: 'POST', body }, schema),
    
  put: <T>(endpoint: string, body: unknown, schema?: z.ZodType<T>) =>
    request<T>(endpoint, { method: 'PUT', body }, schema),
    
  patch: <T>(endpoint: string, body: unknown, schema?: z.ZodType<T>) =>
    request<T>(endpoint, { method: 'PATCH', body }, schema),
    
  delete: <T>(endpoint: string, schema?: z.ZodType<T>) =>
    request<T>(endpoint, { method: 'DELETE' }, schema),
};

export function handleApiError(error: unknown): string {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 401: return 'Требуется авторизация';
      case 403: return 'Доступ запрещён';
      case 404: return 'Не найдено';
      case 500: return 'Ошибка сервера';
      default: return error.message;
    }
  }
  if (error instanceof z.ZodError) {
    return 'Некорректные данные от сервера';
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Неизвестная ошибка';
}
