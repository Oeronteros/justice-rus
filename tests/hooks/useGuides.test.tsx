import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fc from 'fast-check';
import { cleanup, renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGuides, useCreateGuide, guideKeys } from '@/lib/hooks/useGuides';
import { guidesApi } from '@/lib/api/guides';
import type { GuideSummary } from '@/lib/schemas/guide';
import type { ReactNode } from 'react';

// Mock the API
vi.mock('@/lib/api/guides', () => ({
  guidesApi: {
    list: vi.fn(),
    get: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    vote: vi.fn(),
    addComment: vi.fn(),
  },
}));

const mockGuidesApi = guidesApi as unknown as {
  list: ReturnType<typeof vi.fn>;
  get: ReturnType<typeof vi.fn>;
  create: ReturnType<typeof vi.fn>;
  update: ReturnType<typeof vi.fn>;
  vote: ReturnType<typeof vi.fn>;
  addComment: ReturnType<typeof vi.fn>;
};

const isoDateArb = fc
  .integer({
    min: Date.parse('2000-01-01T00:00:00.000Z'),
    max: Date.parse('2100-12-31T23:59:59.999Z'),
  })
  .map((timestamp) => new Date(timestamp).toISOString());

// Generator for valid GuideSummary
const guideSummaryArb = fc.record({
  id: fc.uuid(),
  title: fc.string({ minLength: 1, maxLength: 200 }),
  category: fc.constantFrom('general', 'pve', 'pvp', 'build', 'farm', 'craft', 'training'),
  author: fc.string({ minLength: 1, maxLength: 100 }),
  createdAt: isoDateArb,
  updatedAt: isoDateArb,
  votes: fc.nat({ max: 1000 }),
  commentsCount: fc.nat({ max: 100 }),
});

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useGuides hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  /**
   * Property 1: Query Cache Deduplication
   * For any query key requested by N components simultaneously, THE Query_Cache SHALL make exactly 1 network request.
   * Validates: Requirements 1.2, 1.4
   */
  describe('Property 1: Query Cache Deduplication', () => {
    it('should deduplicate simultaneous requests for the same query key', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.array(guideSummaryArb, { minLength: 0, maxLength: 10 }),
          fc.integer({ min: 2, max: 5 }),
          async (guides, numHooks) => {
            mockGuidesApi.list.mockReset();
            mockGuidesApi.list.mockResolvedValue(guides);

            const queryClient = new QueryClient({
              defaultOptions: {
                queries: { retry: false, gcTime: 0 },
              },
            });

            const wrapper = ({ children }: { children: ReactNode }) => (
              <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            );

            // Render multiple hooks simultaneously
            const hooks = Array.from({ length: numHooks }, () =>
              renderHook(() => useGuides(), { wrapper })
            );

            // Wait for all to complete
            await Promise.all(
              hooks.map(({ result }) =>
                waitFor(() => expect(result.current.isLoading).toBe(false))
              )
            );

            // Should only make 1 API call despite multiple hooks
            expect(mockGuidesApi.list).toHaveBeenCalledTimes(1);

            // All hooks should have the same data
            const firstData = hooks[0].result.current.data;
            hooks.forEach(({ result }) => {
              expect(result.current.data).toEqual(firstData);
            });

            // Cleanup
            hooks.forEach(({ unmount }) => unmount());
            queryClient.clear();
          }
        ),
        { numRuns: 20 } // Reduced for performance
      );
    });
  });

  /**
   * Property 2: Cache Invalidation on Mutation
   * For any mutation that modifies data, THE Query_Cache SHALL mark all related queries as stale.
   * Validates: Requirements 1.6
   */
  describe('Property 2: Cache Invalidation on Mutation', () => {
    it('should invalidate guides list after creating a guide', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.array(guideSummaryArb, { minLength: 1, maxLength: 5 }),
          guideSummaryArb,
          async (initialGuides, newGuide) => {
            mockGuidesApi.list.mockReset();
            mockGuidesApi.create.mockReset();
            let callCount = 0;
            mockGuidesApi.list.mockImplementation(() => {
              callCount++;
              return Promise.resolve(callCount === 1 ? initialGuides : [...initialGuides, newGuide]);
            });
            mockGuidesApi.create.mockResolvedValue(newGuide);

            const queryClient = new QueryClient({
              defaultOptions: {
                queries: { retry: false, gcTime: Infinity, staleTime: Infinity },
              },
            });
            const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

            const wrapper = ({ children }: { children: ReactNode }) => (
              <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            );

            // First, load the guides
            const { result: guidesResult, unmount: unmountGuides } = renderHook(() => useGuides(), { wrapper });
            await waitFor(() => expect(guidesResult.current.isSuccess).toBe(true));
            expect(mockGuidesApi.list).toHaveBeenCalledTimes(1);

            // Now create a guide
            const { result: createResult, unmount: unmountCreate } = renderHook(() => useCreateGuide(), { wrapper });
            
            await createResult.current.mutateAsync({
              title: newGuide.title,
              content: 'Test content',
              category: newGuide.category as any,
              author: newGuide.author,
            });

            // The mutation should invalidate the guides list query.
            expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: guideKeys.lists() });

            // Cleanup
            unmountGuides();
            unmountCreate();
            invalidateSpy.mockRestore();
            queryClient.clear();
          }
        ),
        { numRuns: 20 }
      );
    });
  });
});
