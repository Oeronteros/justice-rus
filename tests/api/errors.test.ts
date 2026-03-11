import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { ApiError, handleApiError } from '@/lib/api/errors';

describe('api errors', () => {
  it('maps known ApiError status codes to user-friendly messages', () => {
    expect(handleApiError(new ApiError('Auth', 401))).toBe('Требуется авторизация');
    expect(handleApiError(new ApiError('Forbidden', 403))).toBe('Доступ запрещён');
    expect(handleApiError(new ApiError('Missing', 404))).toBe('Не найдено');
    expect(handleApiError(new ApiError('Oops', 500))).toBe('Ошибка сервера');
  });

  it('keeps unknown ApiError messages intact', () => {
    expect(handleApiError(new ApiError('Teapot', 418))).toBe('Teapot');
  });

  it('handles zod and generic errors', () => {
    const schema = z.object({ id: z.number() });
    const zodError = schema.safeParse({ id: 'bad' }).error;

    expect(handleApiError(zodError)).toBe('Некорректные данные от сервера');
    expect(handleApiError(new Error('Boom'))).toBe('Boom');
    expect(handleApiError('x')).toBe('Неизвестная ошибка');
  });
});
