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

export function handleApiError(error: unknown): string {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 401:
        return 'Требуется авторизация';
      case 403:
        return 'Доступ запрещён';
      case 404:
        return 'Не найдено';
      case 500:
        return 'Ошибка сервера';
      default:
        return error.message;
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
