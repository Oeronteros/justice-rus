import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { GuidesList } from '@/components/sections/guides/GuidesList';
import { I18nProvider } from '@/lib/i18n/context';

const useGuidesMock = vi.fn();
const createGuideMutateAsyncMock = vi.fn();

vi.mock('@/lib/guides/hooks', () => ({
  useGuides: () => useGuidesMock(),
  useCreateGuide: () => ({
    mutateAsync: createGuideMutateAsyncMock,
    isPending: false,
  }),
}));

describe('GuidesList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useGuidesMock.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('renders localized discovery filters and empty state in english', () => {
    render(
      <I18nProvider defaultLanguage="en">
        <GuidesList onGuideClick={vi.fn()} onCreateClick={vi.fn()} />
      </I18nProvider>
    );

    expect(screen.getByText('Discovery filters')).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('Showing:'))).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /All categories/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'All authors' })).toBeInTheDocument();
    expect(screen.getByText('Nothing found')).toBeInTheDocument();
  });
});
