import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import NewsSection from '@/components/sections/news';
import { I18nProvider } from '@/lib/i18n/context';
import type { User } from '@/lib/schemas/auth';
import type { News } from '@/lib/schemas/news';

const useNewsMock = vi.fn();
const createNewsMutateAsyncMock = vi.fn();
const deleteNewsMutateAsyncMock = vi.fn();
const prefetchNewsMock = vi.fn();

vi.mock('@/lib/news/hooks', async () => {
  const actual = await vi.importActual<typeof import('@/lib/news/hooks')>('@/lib/news/hooks');

  return {
    ...actual,
  useNews: () => useNewsMock(),
  useCreateNews: () => ({
    mutateAsync: createNewsMutateAsyncMock,
    isPending: false,
  }),
  useDeleteNews: () => ({
    mutateAsync: deleteNewsMutateAsyncMock,
    isPending: false,
  }),
    usePrefetchNews: () => prefetchNewsMock,
  };
});

function renderWithI18n(node: ReactNode) {
  return render(<I18nProvider defaultLanguage="en">{node}</I18nProvider>);
}

describe('NewsSection link rendering', () => {
  const user: User = {
    role: 'member',
    nickname: 'Tester',
    isActive: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    createNewsMutateAsyncMock.mockReset();
    deleteNewsMutateAsyncMock.mockReset();
    prefetchNewsMock.mockReset();
    useNewsMock.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('renders inline URLs as clickable links and preserves the Discord CTA', () => {
    const news: News[] = [
      {
        id: 'featured-news',
        title: 'Raid update',
        content: 'Read https://example.com/path?a=1. Mirror: https://example.com/other',
        author: 'Officer',
        date: '2026-03-11T08:00:00.000Z',
        pinned: true,
        messageUrl: 'https://discord.com/channels/1/2/3',
      },
    ];

    useNewsMock.mockReturnValue({
      data: news,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    renderWithI18n(<NewsSection user={user} />);

    expect(screen.getByRole('link', { name: 'https://example.com/path?a=1' })).toHaveAttribute(
      'href',
      'https://example.com/path?a=1'
    );
    expect(screen.getByRole('link', { name: 'https://example.com/path?a=1' })).toHaveAttribute(
      'rel',
      'noopener noreferrer'
    );
    expect(screen.getByRole('link', { name: 'https://example.com/other' })).toHaveAttribute(
      'href',
      'https://example.com/other'
    );
    expect(screen.getByRole('link', { name: 'Open in Discord' })).toHaveAttribute(
      'href',
      'https://discord.com/channels/1/2/3'
    );
    expect(screen.getByRole('link', { name: 'Open in Discord' })).toHaveAttribute(
      'rel',
      'noopener noreferrer'
    );

    const featuredArticle = screen.getByText('Raid update').closest('article');
    expect(featuredArticle).toHaveTextContent('Read https://example.com/path?a=1. Mirror: https://example.com/other');
  });

  it('renders guide links with readable labels and keeps multiple inline links separate', () => {
    const news: News[] = [
      {
        id: 'featured-news',
        title: 'Guide drop',
        content: 'Guides: https://guild.example/guides?slug=raid-plan-alpha and https://example.com/patch-notes,',
        author: 'Officer',
        date: '2026-03-11T08:00:00.000Z',
        pinned: true,
      },
    ];

    useNewsMock.mockReturnValue({
      data: news,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    renderWithI18n(<NewsSection user={user} />);

    expect(screen.getByRole('link', { name: 'Raid plan alpha' })).toHaveAttribute(
      'href',
      'https://guild.example/guides?slug=raid-plan-alpha'
    );
    expect(screen.getByRole('link', { name: 'https://example.com/patch-notes' })).toHaveAttribute(
      'href',
      'https://example.com/patch-notes'
    );

    const inlineLinks = screen.getAllByRole('link').filter((link) => {
      const href = link.getAttribute('href') ?? '';
      return href.startsWith('https://example.com') || href.startsWith('https://guild.example');
    });
    expect(inlineLinks).toHaveLength(2);
  });

  it('does not render a broken partial URL when featured preview truncates mid-link', () => {
    const news: News[] = [
      {
        id: 'featured-news',
        title: 'Long dispatch',
        content: `${'A'.repeat(750)} https://example.com/very-long-link-that-should-not-be-partially-rendered`,
        author: 'Officer',
        date: '2026-03-11T08:00:00.000Z',
        pinned: true,
      },
    ];

    useNewsMock.mockReturnValue({
      data: news,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    renderWithI18n(<NewsSection user={user} />);

    expect(screen.queryByRole('link', { name: /very-long-link/ })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Read full news' })).toBeInTheDocument();
  });
});
