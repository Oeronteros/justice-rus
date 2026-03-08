import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cleanup, renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { pvpApi } from '@/lib/api/pvp';
import { pvpKeys, useJoinPvpQueue, useLeavePvpQueue, usePvpState, useReportPvpResult } from '@/lib/pvp/hooks';

vi.mock('@/lib/api/pvp', () => ({
  pvpApi: {
    getState: vi.fn(),
    joinQueue: vi.fn(),
    leaveQueue: vi.fn(),
    reportResult: vi.fn(),
  },
}));

const mockPvpApi = pvpApi as unknown as {
  getState: ReturnType<typeof vi.fn>;
  joinQueue: ReturnType<typeof vi.fn>;
  leaveQueue: ReturnType<typeof vi.fn>;
  reportResult: ReturnType<typeof vi.fn>;
};

const baseState = {
  queue: [],
  leaderboard: [],
  recentMatches: [],
  activeMatch: null,
  userInQueue: false,
  userRating: null,
};

function createWrapper(queryClient: QueryClient) {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('usePvp hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPvpApi.getState.mockResolvedValue(baseState);
    mockPvpApi.joinQueue.mockResolvedValue(baseState);
    mockPvpApi.leaveQueue.mockResolvedValue(baseState);
    mockPvpApi.reportResult.mockResolvedValue(baseState);
  });

  afterEach(() => {
    cleanup();
  });

  it('loads PvP state with the expected query key', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false, gcTime: 0 },
      },
    });

    const { result } = renderHook(() => usePvpState(), {
      wrapper: createWrapper(queryClient),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockPvpApi.getState).toHaveBeenCalledTimes(1);
    expect(queryClient.getQueryData(pvpKeys.state())).toEqual(baseState);

    queryClient.clear();
  });

  it('invalidates PvP state after joining queue', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false, gcTime: 0 },
      },
    });
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useJoinPvpQueue(), {
      wrapper: createWrapper(queryClient),
    });

    await result.current.mutateAsync();

    expect(mockPvpApi.joinQueue).toHaveBeenCalledTimes(1);
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: pvpKeys.state() });

    invalidateSpy.mockRestore();
    queryClient.clear();
  });

  it('invalidates PvP state after leaving queue', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false, gcTime: 0 },
      },
    });
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useLeavePvpQueue(), {
      wrapper: createWrapper(queryClient),
    });

    await result.current.mutateAsync();

    expect(mockPvpApi.leaveQueue).toHaveBeenCalledTimes(1);
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: pvpKeys.state() });

    invalidateSpy.mockRestore();
    queryClient.clear();
  });

  it('invalidates PvP state after reporting match result', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false, gcTime: 0 },
      },
    });
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useReportPvpResult(), {
      wrapper: createWrapper(queryClient),
    });

    await result.current.mutateAsync({ matchId: '42', result: 'win' });

    expect(mockPvpApi.reportResult).toHaveBeenCalledWith({ matchId: '42', result: 'win' });
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: pvpKeys.state() });

    invalidateSpy.mockRestore();
    queryClient.clear();
  });
});
