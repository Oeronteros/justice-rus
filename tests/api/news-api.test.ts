import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { newsApi } from '@/lib/api/news';

const { getApiNewsMock, postApiNewsMock } = vi.hoisted(() => ({
  getApiNewsMock: vi.fn(),
  postApiNewsMock: vi.fn(),
}));

vi.mock('@/lib/api/generated', () => ({
  getApiNews: getApiNewsMock,
  postApiNews: postApiNewsMock,
}));

describe('lib/api/news', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('normalizes route envelope errors from list() into ApiError', async () => {
    getApiNewsMock.mockResolvedValueOnce({
      data: undefined,
      error: { error: 'Forbidden' },
      response: new Response(null, { status: 403 }),
    });

    await expect(newsApi.list()).rejects.toMatchObject({
      name: 'ApiError',
      message: 'Forbidden',
      status: 403,
    });
  });

  it('normalizes route envelope errors from create() into ApiError', async () => {
    postApiNewsMock.mockResolvedValueOnce({
      data: undefined,
      error: { error: 'Unauthorized' },
      response: new Response(null, { status: 401 }),
    });

    await expect(newsApi.create({ title: 'Valid title', content: 'Valid content body' })).rejects.toMatchObject({
      name: 'ApiError',
      message: 'Unauthorized',
      status: 401,
    });
  });

  it('keeps delete() status and envelope message when route returns non-ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValueOnce(
        new Response(JSON.stringify({ error: 'Only officers can delete news' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        })
      )
    );

    await expect(newsApi.remove('news-1')).rejects.toMatchObject({
      name: 'ApiError',
      message: 'Only officers can delete news',
      status: 403,
    });
  });
});
