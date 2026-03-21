import { describe, expect, it } from 'vitest';
import { ApiError } from '@/lib/api/errors';
import { createNewsFeatureAdapter } from '@/lib/news/adapter';
import type { User } from '@/lib/schemas/auth';

describe('lib/news/adapter', () => {
  it('uses shared permission policy for officer-only news mutations', () => {
    const adapter = createNewsFeatureAdapter();
    const member = { role: 'member' } as User;
    const officer = { role: 'officer' } as User;

    expect(adapter.canManage(member)).toBe(false);
    expect(adapter.canManage(officer)).toBe(true);
  });

  it('maps ApiError through the shared user-facing envelope', () => {
    const adapter = createNewsFeatureAdapter();

    expect(adapter.toErrorMessage(new ApiError('Forbidden', 403))).toBe('Доступ запрещён');
    expect(adapter.toErrorMessage(new ApiError('Unauthorized', 401))).toBe('Требуется авторизация');
  });
});
