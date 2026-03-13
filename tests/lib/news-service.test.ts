import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const queryMock = vi.fn();
const ensureNewsSourceSchemaMock = vi.fn();
const refreshNewsReadModelAfterWriteMock = vi.fn();

vi.mock('@/lib/neon', () => ({
  getPool: () => ({
    query: queryMock,
  }),
  hasDatabaseUrl: () => true,
}));

vi.mock('@/lib/server/read-models/news', () => ({
  ensureNewsSourceSchema: ensureNewsSourceSchemaMock,
  fetchNewsDirect: vi.fn(),
  getNewsReadModel: vi.fn(),
  refreshNewsReadModelAfterWrite: refreshNewsReadModelAfterWriteMock,
}));

describe('createNews', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    ensureNewsSourceSchemaMock.mockResolvedValue(undefined);
    refreshNewsReadModelAfterWriteMock.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('stores news in the database and leaves Discord delivery pending for the bot', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    vi.spyOn(console, 'log').mockImplementation(() => {});

    queryMock
      .mockResolvedValueOnce({
        rows: [
          {
            id: 7,
            title: 'Raid update',
            content: 'Gather at 21:00',
            author: 'Moon',
            date: '2026-03-13T10:00:00.000Z',
            pinned: false,
            created_at: '2026-03-13T10:00:00.000Z',
            message_url: null,
            discord_delivery_status: 'pending',
            discord_delivery_error: null,
            published_to_discord_at: null,
          },
        ],
      })
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({
        rows: [
          {
            id: 7,
            title: 'Raid update',
            content: 'Gather at 21:00',
            author: 'Moon',
            date: '2026-03-13T10:00:00.000Z',
            pinned: false,
            created_at: '2026-03-13T10:00:00.000Z',
            message_url: null,
            discord_delivery_status: 'pending',
            discord_delivery_error: null,
            published_to_discord_at: null,
          },
        ],
      });

    const { createNews } = await import('@/lib/server/news/service');

    const result = await createNews(
      {
        title: 'Raid update',
        content: 'Gather at 21:00',
      },
      {
        role: 'officer',
        nickname: 'Moon',
        isActive: true,
      }
    );

    expect(fetchMock).not.toHaveBeenCalled();
    expect(queryMock).toHaveBeenCalledTimes(3);
    expect(queryMock).toHaveBeenNthCalledWith(2, 'UPDATE news SET publish_key = $2 WHERE id = $1', ['7', 'site-news-7']);
    expect(result.messageUrl).toBeUndefined();
    expect(result.discordDeliveryStatus).toBe('pending');
    expect(result.discordDeliveryError).toBeUndefined();
  });
});
