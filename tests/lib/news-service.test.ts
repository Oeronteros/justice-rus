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
    vi.stubEnv('DISCORD_BOT_API_URL', 'https://late-pillows-watch.loca.lt');

    ensureNewsSourceSchemaMock.mockResolvedValue(undefined);
    refreshNewsReadModelAfterWriteMock.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('adds the localtunnel bypass header when publishing site news to Discord', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        status: 'sent',
        message_url: 'https://discord.com/channels/1/2/3',
        published_at: '2026-03-13T10:00:00.000Z',
      }),
    });
    vi.stubGlobal('fetch', fetchMock);

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
            message_url: 'https://discord.com/channels/1/2/3',
            discord_delivery_status: 'sent',
            discord_delivery_error: null,
            published_to_discord_at: '2026-03-13T10:00:00.000Z',
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

    expect(fetchMock).toHaveBeenCalledWith(
      'https://late-pillows-watch.loca.lt/api/internal/news/publish',
      expect.objectContaining({
        method: 'POST',
        cache: 'no-store',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          'bypass-tunnel-reminder': '1',
        }),
      })
    );
    expect(result.messageUrl).toBe('https://discord.com/channels/1/2/3');
    expect(result.discordDeliveryStatus).toBe('sent');
  });
});
