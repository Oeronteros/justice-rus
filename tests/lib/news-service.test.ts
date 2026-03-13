import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const {
  queryMock,
  hasDatabaseUrlMock,
  ensureNewsSourceSchemaMock,
  refreshNewsReadModelAfterWriteMock,
  fetchNewsDirectMock,
  getNewsReadModelMock,
} = vi.hoisted(() => ({
  queryMock: vi.fn(),
  hasDatabaseUrlMock: vi.fn(),
  ensureNewsSourceSchemaMock: vi.fn(),
  refreshNewsReadModelAfterWriteMock: vi.fn(),
  fetchNewsDirectMock: vi.fn(),
  getNewsReadModelMock: vi.fn(),
}));

vi.mock('@/lib/neon', () => ({
  getPool: () => ({
    query: queryMock,
  }),
  hasDatabaseUrl: hasDatabaseUrlMock,
}));

vi.mock('@/lib/server/read-models/news', () => ({
  ensureNewsSourceSchema: ensureNewsSourceSchemaMock,
  fetchNewsDirect: fetchNewsDirectMock,
  getNewsReadModel: getNewsReadModelMock,
  refreshNewsReadModelAfterWrite: refreshNewsReadModelAfterWriteMock,
}));

describe('lib/server/news/service', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    hasDatabaseUrlMock.mockReturnValue(true);
    ensureNewsSourceSchemaMock.mockResolvedValue(undefined);
    refreshNewsReadModelAfterWriteMock.mockResolvedValue(undefined);
    fetchNewsDirectMock.mockResolvedValue([]);
    getNewsReadModelMock.mockResolvedValue([]);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('stores news in the database and refreshes the read model after write', async () => {
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
    expect(refreshNewsReadModelAfterWriteMock).toHaveBeenCalledTimes(1);
    expect(result.messageUrl).toBeUndefined();
    expect(result.discordDeliveryStatus).toBe('pending');
    expect(result.discordDeliveryError).toBeUndefined();
  });

  it('returns the read model when database-backed news is available', async () => {
    const readModelRows = [{ id: '1', title: 'Ready' }];
    getNewsReadModelMock.mockResolvedValue(readModelRows);

    const { listNews } = await import('@/lib/server/news/service');

    await expect(listNews('bot-token')).resolves.toEqual(readModelRows);
    expect(getNewsReadModelMock).toHaveBeenCalledTimes(1);
    expect(fetchNewsDirectMock).not.toHaveBeenCalled();
  });

  it('falls back to the direct bot source when the read model is empty', async () => {
    const directRows = [{ id: '2', title: 'Fallback' }];
    getNewsReadModelMock.mockResolvedValue([]);
    fetchNewsDirectMock.mockResolvedValue(directRows);

    const { listNews } = await import('@/lib/server/news/service');

    await expect(listNews('bot-token')).resolves.toEqual(directRows);
    expect(getNewsReadModelMock).toHaveBeenCalledTimes(1);
    expect(fetchNewsDirectMock).toHaveBeenCalledWith('bot-token');
  });

  it('falls back directly to the bot source when the database path is unavailable', async () => {
    const directRows = [{ id: '3', title: 'No DB fallback' }];
    hasDatabaseUrlMock.mockReturnValue(false);
    fetchNewsDirectMock.mockResolvedValue(directRows);

    const { listNews } = await import('@/lib/server/news/service');

    await expect(listNews('bot-token')).resolves.toEqual(directRows);
    expect(getNewsReadModelMock).not.toHaveBeenCalled();
    expect(fetchNewsDirectMock).toHaveBeenCalledWith('bot-token');
  });
});
