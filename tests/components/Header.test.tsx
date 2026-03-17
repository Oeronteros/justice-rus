import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Header from '@/components/shell/Header';

interface MockLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: MockLinkProps) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('Header navigation accessibility', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('keeps nav links and icon buttons accessible when labels collapse visually', () => {
    render(
      <Header
        currentSection="guides"
        onLogout={vi.fn()}
        onRefresh={vi.fn()}
        language="en"
        onLanguageChange={vi.fn()}
      />
    );

    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Sections' }));

    expect(screen.getByLabelText('Command navigation')).toBeInTheDocument();

    const guidesLink = screen.getByLabelText('Command navigation').querySelector('a[aria-label="Guides"]');

    expect(guidesLink).not.toBeNull();
    expect(guidesLink).toHaveAttribute('href', '/guides');
    expect(guidesLink).toHaveAttribute('aria-current', 'page');
    expect(guidesLink).toHaveAttribute('aria-label', 'Guides');

    expect(screen.getByRole('button', { name: 'Refresh data' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Interface language' })).toBeInTheDocument();
  });

  it('removes the March 8 toggle and does not touch March theme storage', () => {
    render(
      <Header
        currentSection="guides"
        onLogout={vi.fn()}
        onRefresh={vi.fn()}
        language="en"
        onLanguageChange={vi.fn()}
      />
    );

    expect(screen.queryByRole('button', { name: 'March 8' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '8 Марта' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '3月8日' })).not.toBeInTheDocument();
    expect(window.localStorage.getItem).not.toHaveBeenCalled();
    expect(window.localStorage.setItem).not.toHaveBeenCalled();
  });
});
