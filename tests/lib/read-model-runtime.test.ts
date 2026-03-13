import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getReadModelFetchErrorMessage,
  getReadModelTunnelBypassHeaders,
  refreshReadModelAfterWrite,
  resolveReadModelSnapshot,
} from '@/lib/server/read-models/runtime';

describe('read-model runtime helpers', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('adds localtunnel bypass header only for supported tunnel origins', () => {
    expect(getReadModelTunnelBypassHeaders('https://guild-preview.loca.lt')).toEqual({
      'bypass-tunnel-reminder': '1',
    });
    expect(getReadModelTunnelBypassHeaders('https://guild-preview.localtunnel.me')).toEqual({
      'bypass-tunnel-reminder': '1',
    });
    expect(getReadModelTunnelBypassHeaders('https://bot.example.com')).toEqual({});
  });

  it('reuses shared error payload parsing for bot fetch failures', () => {
    expect(getReadModelFetchErrorMessage({ error: 'Bot offline', message: 'ignored' }, 503)).toBe('Bot offline');
    expect(getReadModelFetchErrorMessage({ message: 'Bad gateway' }, 502)).toBe('Bad gateway');
    expect(getReadModelFetchErrorMessage({ code: 'E_BAD' }, 500)).toBe('HTTP 500');
  });

  it('logs and swallows refresh failures after writes', async () => {
    const error = new Error('sync failed');
    const syncReadModel = vi.fn().mockRejectedValue(error);
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(
      refreshReadModelAfterWrite(syncReadModel, 'Failed to refresh read model after write:')
    ).resolves.toBeUndefined();

    expect(syncReadModel).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to refresh read model after write:', error);
  });

  it('returns the cached snapshot immediately when it is still fresh', async () => {
    const snapshot = [{ id: 'cached' }];
    const sync = vi.fn().mockResolvedValue([{ id: 'fresh' }]);

    await expect(
      resolveReadModelSnapshot({
        snapshot,
        state: {
          key: 'news-feed',
          status: 'ready',
          source: 'database',
          rowCount: 1,
          refreshedAt: new Date().toISOString(),
          lastError: null,
        },
        ttlMs: 60_000,
        sync,
        staleLogLabel: 'stale snapshot',
      })
    ).resolves.toEqual(snapshot);

    expect(sync).not.toHaveBeenCalled();
  });

  it('returns fresh sync data when the snapshot is stale', async () => {
    const sync = vi.fn().mockResolvedValue([{ id: 'fresh' }]);

    await expect(
      resolveReadModelSnapshot({
        snapshot: [{ id: 'stale' }],
        state: {
          key: 'news-feed',
          status: 'ready',
          source: 'database',
          rowCount: 1,
          refreshedAt: new Date(Date.now() - 120_000).toISOString(),
          lastError: null,
        },
        ttlMs: 60_000,
        sync,
        staleLogLabel: 'stale snapshot',
      })
    ).resolves.toEqual([{ id: 'fresh' }]);

    expect(sync).toHaveBeenCalledTimes(1);
  });

  it('serves a stale snapshot and logs when sync fails but cached data exists', async () => {
    const snapshot = [{ id: 'stale' }];
    const error = new Error('sync exploded');
    const sync = vi.fn().mockRejectedValue(error);
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(
      resolveReadModelSnapshot({
        snapshot,
        state: {
          key: 'schedule-feed',
          status: 'ready',
          source: 'database',
          rowCount: 1,
          refreshedAt: new Date(Date.now() - 120_000).toISOString(),
          lastError: null,
        },
        ttlMs: 60_000,
        sync,
        staleLogLabel: 'Serving stale snapshot after sync failure:',
      })
    ).resolves.toEqual(snapshot);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Serving stale snapshot after sync failure:', error);
  });
});
