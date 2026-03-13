import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getReadModelFetchErrorMessage,
  getReadModelTunnelBypassHeaders,
  refreshReadModelAfterWrite,
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
});
