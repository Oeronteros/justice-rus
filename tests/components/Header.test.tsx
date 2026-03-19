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

  it('forwards nav prefetch interactions for primary and grouped sections', () => {
    const onNavPrefetch = vi.fn();

    render(
      <Header
        currentSection="about"
        onLogout={vi.fn()}
        onRefresh={vi.fn()}
        language="en"
        onLanguageChange={vi.fn()}
        onNavPrefetch={onNavPrefetch}
      />
    );

    const newsLink = document.querySelector('a[href="/news"]');
    const scheduleLink = document.querySelector('a[href="/schedule"]');
    expect(newsLink).not.toBeNull();
    expect(scheduleLink).not.toBeNull();

    fireEvent.mouseEnter(newsLink as Element);
    fireEvent.focus(scheduleLink as Element);

    fireEvent.click(screen.getByRole('button', { name: 'Sections' }));

    const registrationLink = document.querySelector('a[href="/members"]');
    const guidesLink = document.querySelector('a[href="/guides"]');
    const absencesLink = document.querySelector('a[href="/absences"]');
    expect(registrationLink).not.toBeNull();
    expect(guidesLink).not.toBeNull();
    expect(absencesLink).not.toBeNull();

    fireEvent.touchStart(registrationLink as Element);
    fireEvent.mouseEnter(guidesLink as Element);
    fireEvent.focus(absencesLink as Element);

    expect(onNavPrefetch).toHaveBeenNthCalledWith(1, 'news');
    expect(onNavPrefetch).toHaveBeenNthCalledWith(2, 'schedule');
    expect(onNavPrefetch).toHaveBeenNthCalledWith(3, 'registration');
    expect(onNavPrefetch).toHaveBeenNthCalledWith(4, 'guides');
    expect(onNavPrefetch).toHaveBeenNthCalledWith(5, 'absences');
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
