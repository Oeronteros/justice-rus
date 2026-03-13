import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { scheduleApi } from '@/lib/api/schedule';
import { scheduleKeys, useCreateSchedule, useUpdateSchedule } from '@/lib/schedule/hooks';
import type { Schedule } from '@/lib/schemas/schedule';

vi.mock('@/lib/api/schedule', () => ({
  scheduleApi: {
    list: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
}));

const mockScheduleApi = scheduleApi as unknown as {
  create: ReturnType<typeof vi.fn>;
  update: ReturnType<typeof vi.fn>;
};

function createDeferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

function createWrapper(queryClient: QueryClient) {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  Wrapper.displayName = 'ScheduleQueryClientWrapper';
  return Wrapper;
}

describe('useSchedule hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('optimistically updates matching schedule items across language caches and invalidates the schedule namespace', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false, gcTime: Infinity } },
    });
    const wrapper = createWrapper(queryClient);
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');
    const deferred = createDeferred<Schedule>();

    queryClient.setQueryData<Schedule[]>(scheduleKeys.list('ru'), [
      {
        id: '1',
        date: '2026-03-14T00:00:00.000Z',
        registration: 'Старый рейд',
        type: 'raid',
        description: '21:00',
        group: 'raid',
        dayType: 'raid',
        time: '21:00',
        titleRu: 'Старый рейд',
        titleEn: 'Old raid',
        titleZh: '旧副本',
        orderIndex: 0,
        active: true,
      },
    ]);
    queryClient.setQueryData<Schedule[]>(scheduleKeys.list('en'), [
      {
        id: '1',
        date: '2026-03-14T00:00:00.000Z',
        registration: 'Old raid',
        type: 'raid',
        description: '21:00',
        group: 'raid',
        dayType: 'raid',
        time: '21:00',
        titleRu: 'Старый рейд',
        titleEn: 'Old raid',
        titleZh: '旧副本',
        orderIndex: 0,
        active: true,
      },
    ]);
    mockScheduleApi.update.mockReturnValue(deferred.promise);

    const { result } = renderHook(() => useUpdateSchedule(), { wrapper });

    act(() => {
      void result.current.mutate({
        id: '1',
        dayType: 'raid',
        time: '22:00',
        titleRu: 'Новый рейд',
        titleEn: 'New raid',
        titleZh: '新副本',
        orderIndex: 1,
        active: true,
      });
    });

    await waitFor(() => {
      expect(queryClient.getQueryData<Schedule[]>(scheduleKeys.list('ru'))?.[0].registration).toBe('Новый рейд');
      expect(queryClient.getQueryData<Schedule[]>(scheduleKeys.list('en'))?.[0].registration).toBe('New raid');
      expect(queryClient.getQueryData<Schedule[]>(scheduleKeys.list('ru'))?.[0].time).toBe('22:00');
    });

    deferred.resolve({
      id: '1',
      date: '2026-03-14T00:00:00.000Z',
      registration: 'Новый рейд',
      type: 'raid',
      description: '22:00',
      group: 'raid',
      dayType: 'raid',
      time: '22:00',
      titleRu: 'Новый рейд',
      titleEn: 'New raid',
      titleZh: '新副本',
      orderIndex: 1,
      active: true,
    });

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: scheduleKeys.all });
    });

    invalidateSpy.mockRestore();
    queryClient.clear();
  });

  it('adds optimistic schedule items to each cached language list and restores caches on failure', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false, gcTime: Infinity } },
    });
    const wrapper = createWrapper(queryClient);
    const deferred = createDeferred<Schedule>();

    queryClient.setQueryData<Schedule[]>(scheduleKeys.list('ru'), []);
    queryClient.setQueryData<Schedule[]>(scheduleKeys.list('zh'), []);
    mockScheduleApi.create.mockReturnValue(deferred.promise);

    const { result } = renderHook(() => useCreateSchedule(), { wrapper });

    act(() => {
      void result.current.mutate({
        dayType: 'raid',
        time: '23:00',
        titleRu: 'Поздний рейд',
        titleEn: 'Late raid',
        titleZh: '晚间副本',
        orderIndex: 2,
        active: true,
      });
    });

    await waitFor(() => {
      expect(queryClient.getQueryData<Schedule[]>(scheduleKeys.list('ru'))?.[0].registration).toBe('Поздний рейд');
      expect(queryClient.getQueryData<Schedule[]>(scheduleKeys.list('zh'))?.[0].registration).toBe('晚间副本');
      expect(queryClient.getQueryData<Schedule[]>(scheduleKeys.list('ru'))?.[0].id).toContain('temp-schedule-');
    });

    deferred.reject(new Error('create failed'));

    await waitFor(() => {
      expect(queryClient.getQueryData<Schedule[]>(scheduleKeys.list('ru'))).toEqual([]);
      expect(queryClient.getQueryData<Schedule[]>(scheduleKeys.list('zh'))).toEqual([]);
    });

    queryClient.clear();
  });
});
