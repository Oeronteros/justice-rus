import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const {
  queryMock,
  hasDatabaseUrlMock,
  getPreferredTableNameMock,
  getCachedTableColumnsMock,
  fetchScheduleDirectMock,
  getScheduleReadModelMock,
  refreshScheduleReadModelAfterWriteMock,
} = vi.hoisted(() => ({
  queryMock: vi.fn(),
  hasDatabaseUrlMock: vi.fn(),
  getPreferredTableNameMock: vi.fn(),
  getCachedTableColumnsMock: vi.fn(),
  fetchScheduleDirectMock: vi.fn(),
  getScheduleReadModelMock: vi.fn(),
  refreshScheduleReadModelAfterWriteMock: vi.fn(),
}));

vi.mock('@/lib/neon', () => ({
  getPool: () => ({
    query: queryMock,
  }),
  hasDatabaseUrl: hasDatabaseUrlMock,
}));

vi.mock('@/lib/server/db-cache', () => ({
  getPreferredTableName: getPreferredTableNameMock,
  getCachedTableColumns: getCachedTableColumnsMock,
}));

vi.mock('@/lib/server/read-models/schedule', () => ({
  fetchScheduleDirect: fetchScheduleDirectMock,
  getScheduleReadModel: getScheduleReadModelMock,
  refreshScheduleReadModelAfterWrite: refreshScheduleReadModelAfterWriteMock,
}));

describe('lib/server/schedule/source', () => {
  const originalBotApiKey = process.env.BOT_API_KEY;
  const originalDiscordBotApiKey = process.env.DISCORD_BOT_API_KEY;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();

    delete process.env.BOT_API_KEY;
    delete process.env.DISCORD_BOT_API_KEY;

    hasDatabaseUrlMock.mockReturnValue(true);
    getPreferredTableNameMock.mockResolvedValue('schedule');
    getCachedTableColumnsMock.mockResolvedValue(new Set(['id', 'day_type', 'time', 'title_ru', 'title_en', 'title_zh', 'order_index', 'active']));
    refreshScheduleReadModelAfterWriteMock.mockResolvedValue(undefined);
    getScheduleReadModelMock.mockResolvedValue([]);
    fetchScheduleDirectMock.mockResolvedValue([]);
  });

  afterEach(() => {
    if (originalBotApiKey === undefined) {
      delete process.env.BOT_API_KEY;
    } else {
      process.env.BOT_API_KEY = originalBotApiKey;
    }

    if (originalDiscordBotApiKey === undefined) {
      delete process.env.DISCORD_BOT_API_KEY;
    } else {
      process.env.DISCORD_BOT_API_KEY = originalDiscordBotApiKey;
    }

    vi.restoreAllMocks();
  });

  it('returns the schedule read model when cached data is available', async () => {
    const cachedRows = [{ id: '1', registration: 'Raid', date: '', type: 'raid', description: '21:00', group: 'raid' }];
    getScheduleReadModelMock.mockResolvedValue(cachedRows);

    const { listSchedule } = await import('@/lib/server/schedule/source');

    await expect(listSchedule('ru')).resolves.toEqual(cachedRows);
    expect(getScheduleReadModelMock).toHaveBeenCalledWith('ru');
    expect(fetchScheduleDirectMock).not.toHaveBeenCalled();
  });

  it('falls back to direct schedule fetch when the read model errors and bot access is configured', async () => {
    process.env.BOT_API_KEY = 'test-bot-key';
    const directRows = [{ id: '2', registration: 'Fallback raid', date: '', type: 'raid', description: '22:00', group: 'raid' }];
    getScheduleReadModelMock.mockRejectedValue(new Error('read model failed'));
    fetchScheduleDirectMock.mockResolvedValue(directRows);
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { listSchedule } = await import('@/lib/server/schedule/source');

    await expect(listSchedule('en')).resolves.toEqual(directRows);
    expect(getScheduleReadModelMock).toHaveBeenCalledWith('en');
    expect(fetchScheduleDirectMock).toHaveBeenCalledWith('en');
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('falls back to direct schedule fetch when the read model is empty and bot access is configured', async () => {
    process.env.BOT_API_KEY = 'test-bot-key';
    const directRows = [{ id: '3', registration: 'Bot fallback', date: '', type: 'raid', description: '23:00', group: 'raid' }];
    getScheduleReadModelMock.mockResolvedValue([]);
    fetchScheduleDirectMock.mockResolvedValue(directRows);

    const { listSchedule } = await import('@/lib/server/schedule/source');

    await expect(listSchedule('zh')).resolves.toEqual(directRows);
    expect(getScheduleReadModelMock).toHaveBeenCalledWith('zh');
    expect(fetchScheduleDirectMock).toHaveBeenCalledWith('zh');
  });

  it('returns an empty list when both read model and bot fallback are unavailable', async () => {
    getScheduleReadModelMock.mockResolvedValue([]);
    fetchScheduleDirectMock.mockResolvedValue([{ id: 'should-not-be-used' }]);

    const { listSchedule } = await import('@/lib/server/schedule/source');

    await expect(listSchedule('ru')).resolves.toEqual([]);
    expect(getScheduleReadModelMock).toHaveBeenCalledWith('ru');
    expect(fetchScheduleDirectMock).not.toHaveBeenCalled();
  });

  it('refreshes the schedule read model after creating an entry', async () => {
    queryMock.mockResolvedValueOnce({
      rows: [
        {
          id: 7,
          day_type: 'raid',
          time: '21:00',
          title_ru: 'Рейд',
          title_en: 'Raid',
          title_zh: '副本',
          order_index: 3,
          active: 1,
        },
      ],
    });

    const { createScheduleEntry } = await import('@/lib/server/schedule/source');

    const result = await createScheduleEntry(
      { dayType: 'raid', time: '21:00', titleRu: 'Рейд', titleEn: 'Raid', titleZh: '副本', orderIndex: 3, active: true },
      { id: '42', nickname: 'Moon', role: 'officer', isActive: true, authMethod: 'account' }
    );

    expect(result.registration).toBe('Рейд');
    expect(refreshScheduleReadModelAfterWriteMock).toHaveBeenCalledTimes(1);
  });

  it('refreshes the schedule read model after updating an entry', async () => {
    queryMock.mockResolvedValueOnce({
      rows: [
        {
          id: 8,
          day_type: 'raid',
          time: '22:00',
          title_ru: 'Поздний рейд',
          title_en: 'Late raid',
          title_zh: '晚间副本',
          order_index: 4,
          active: 1,
        },
      ],
    });

    const { updateScheduleEntry } = await import('@/lib/server/schedule/source');

    const result = await updateScheduleEntry(
      { id: '8', dayType: 'raid', time: '22:00', titleRu: 'Поздний рейд', titleEn: 'Late raid', titleZh: '晚间副本', orderIndex: 4, active: true },
      { id: '42', nickname: 'Moon', role: 'officer', isActive: true, authMethod: 'account' }
    );

    expect(result.registration).toBe('Поздний рейд');
    expect(refreshScheduleReadModelAfterWriteMock).toHaveBeenCalledTimes(1);
  });
});
