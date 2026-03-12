import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useCreateNews, newsKeys } from '@/lib/news/hooks';
import { useCreateHelpRequest, useUpdateHelpStatus, helpKeys } from '@/lib/help/hooks';
import { useAddComment, guideKeys } from '@/lib/guides/hooks';
import { newsApi } from '@/lib/api/news';
import { helpApi } from '@/lib/api/help';
import { guidesApi } from '@/lib/api/guides';
import type { News } from '@/lib/schemas/news';
import type { HelpRequest } from '@/lib/schemas/help';
import type { GuideDetail, GuideSummary } from '@/lib/schemas/guide';

vi.mock('@/lib/api/news', () => ({
  newsApi: {
    list: vi.fn(),
    create: vi.fn(),
  },
}));

vi.mock('@/lib/api/help', () => ({
  helpApi: {
    list: vi.fn(),
    create: vi.fn(),
    updateStatus: vi.fn(),
    updateTimeRange: vi.fn(),
    rsvp: vi.fn(),
    withdrawRsvp: vi.fn(),
    remove: vi.fn(),
  },
}));

vi.mock('@/lib/api/guides', () => ({
  guidesApi: {
    list: vi.fn(),
    get: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    vote: vi.fn(),
    addComment: vi.fn(),
    remove: vi.fn(),
  },
}));

const mockNewsApi = newsApi as unknown as {
  create: ReturnType<typeof vi.fn>;
};

const mockHelpApi = helpApi as unknown as {
  updateStatus: ReturnType<typeof vi.fn>;
};

const mockGuidesApi = guidesApi as unknown as {
  addComment: ReturnType<typeof vi.fn>;
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
  Wrapper.displayName = 'OptimisticQueryClientWrapper';
  return Wrapper;
}

describe('optimistic update hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('adds optimistic news item before create request resolves', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false, gcTime: Infinity } },
    });
    const wrapper = createWrapper(queryClient);
    const deferred = createDeferred<News>();
    const initialNews: News[] = [
      {
        id: 'news-1',
        title: 'Старый пост',
        content: 'Контент',
        author: 'Officer',
        date: '2026-03-11T18:00:00.000Z',
        pinned: false,
      },
    ];

    queryClient.setQueryData(newsKeys.lists(), initialNews);
    mockNewsApi.create.mockReturnValue(deferred.promise);

    const { result } = renderHook(() => useCreateNews(), { wrapper });

    act(() => {
      void result.current.mutate({
        title: 'Новая новость',
        content: 'Содержимое новой новости',
        pinned: true,
        author: 'Smoke Member',
      });
    });

    await waitFor(() => {
      const cached = queryClient.getQueryData<News[]>(newsKeys.lists());
      expect(cached).toHaveLength(2);
      expect(cached?.[0].id).toContain('temp-news-');
      expect(cached?.[0].discordDeliveryStatus).toBe('pending');
    });

    deferred.resolve({
      id: 'news-2',
      title: 'Новая новость',
      content: 'Содержимое новой новости',
      author: 'Smoke Member',
      date: '2026-03-12T00:00:00.000Z',
      pinned: true,
      discordDeliveryStatus: 'sent',
    });

    await waitFor(() => {
      const cached = queryClient.getQueryData<News[]>(newsKeys.lists());
      expect(cached?.some((item) => item.id === 'news-2')).toBe(true);
    });

    queryClient.clear();
  });

  it('moves help request between status caches optimistically', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false, gcTime: Infinity } },
    });
    const wrapper = createWrapper(queryClient);
    const deferred = createDeferred<HelpRequest>();
    const request: HelpRequest = {
      id: 'help-1',
      title: 'Нужен танк',
      details: 'Ищем танка на вечер',
      category: 'raid',
      author: 'Smoke Member',
      authorUserId: 'user-1',
      status: 'open',
      createdAt: '2026-03-11T16:00:00.000Z',
      gatheringStart: '2026-03-11T18:00:00.000Z',
      gatheringEnd: '2026-03-11T19:00:00.000Z',
      responders: [],
    };

    queryClient.setQueryData(helpKeys.list('open'), [request]);
    queryClient.setQueryData(helpKeys.list('closed'), []);
    queryClient.setQueryData(helpKeys.list('all'), [request]);
    mockHelpApi.updateStatus.mockReturnValue(deferred.promise);

    const { result } = renderHook(() => useUpdateHelpStatus(), { wrapper });

    act(() => {
      void result.current.mutate({ id: 'help-1', status: 'closed' });
    });

    await waitFor(() => {
      expect(queryClient.getQueryData<HelpRequest[]>(helpKeys.list('open'))).toEqual([]);
      expect(queryClient.getQueryData<HelpRequest[]>(helpKeys.list('all'))?.[0].status).toBe('closed');
    });

    deferred.resolve({ ...request, status: 'closed' });

    await waitFor(() => {
      expect(queryClient.getQueryData<HelpRequest[]>(helpKeys.list('closed'))?.[0].id).toBe('help-1');
    });

    queryClient.clear();
  });

  it('adds optimistic guide comment and increments list count immediately', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false, gcTime: Infinity } },
    });
    const wrapper = createWrapper(queryClient);
    const deferred = createDeferred<GuideDetail['comments'][number]>();
    const guideSummary: GuideSummary = {
      id: 'guide-1',
      slug: 'guide-1',
      ownerAccountId: 'owner-1',
      title: 'PvP Guide',
      category: 'pvp',
      author: 'Smoke Member',
      createdAt: '2026-03-10T10:00:00.000Z',
      updatedAt: '2026-03-10T10:00:00.000Z',
      votes: 5,
      commentsCount: 0,
      linkTargets: [],
    };
    const guideDetail: GuideDetail = {
      guide: {
        id: 'guide-1',
        slug: 'guide-1',
        ownerAccountId: 'owner-1',
        title: 'PvP Guide',
        content: 'Long guide content',
        category: 'pvp',
        author: 'Smoke Member',
        createdAt: '2026-03-10T10:00:00.000Z',
        updatedAt: '2026-03-10T10:00:00.000Z',
      },
      votes: 5,
      voted: false,
      comments: [],
    };

    queryClient.setQueryData(guideKeys.lists(), [guideSummary]);
    queryClient.setQueryData(guideKeys.detail('guide-1'), guideDetail);
    mockGuidesApi.addComment.mockReturnValue(deferred.promise);

    const { result } = renderHook(() => useAddComment(), { wrapper });

    act(() => {
      void result.current.mutate({
        id: 'guide-1',
        data: {
          author: 'Officer',
          comment: 'Отличный гайд',
        },
      });
    });

    await waitFor(() => {
      const cachedDetail = queryClient.getQueryData<GuideDetail>(guideKeys.detail('guide-1'));
      const cachedList = queryClient.getQueryData<GuideSummary[]>(guideKeys.lists());
      expect(cachedDetail?.comments).toHaveLength(1);
      expect(cachedDetail?.comments[0].id).toContain('temp-comment-');
      expect(cachedList?.[0].commentsCount).toBe(1);
    });

    deferred.resolve({
      id: 'comment-1',
      author: 'Officer',
      comment: 'Отличный гайд',
      createdAt: '2026-03-12T00:00:00.000Z',
    });

    await waitFor(() => {
      const cachedDetail = queryClient.getQueryData<GuideDetail>(guideKeys.detail('guide-1'));
      expect(cachedDetail?.comments[0].id).toBe('comment-1');
    });

    queryClient.clear();
  });
});
