import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
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
    expect(screen.queryByRole('button', { name: 'Sections' })).not.toBeInTheDocument();

    const sectionsGroup = screen.getByRole('group', { name: 'Sections' });
    expect(within(sectionsGroup).getByRole('button', { name: 'Core' })).toBeInTheDocument();
    expect(within(sectionsGroup).getByRole('button', { name: 'Guild' })).toBeInTheDocument();
    expect(within(sectionsGroup).getByRole('button', { name: 'Command' })).toBeInTheDocument();
    expect(within(sectionsGroup).getByRole('button', { name: 'Tools' })).toBeInTheDocument();

    const guildTrigger = within(sectionsGroup).getByRole('button', { name: 'Guild' });
    fireEvent.focus(guildTrigger);
    expect(guildTrigger).toHaveAttribute('aria-expanded', 'true');

    const guildPanel = screen.getByLabelText('Command navigation: Guild');
    const guidesLink = within(guildPanel).getByRole('link', { name: 'Guides' });

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

    const sectionsGroup = screen.getByRole('group', { name: 'Sections' });
    const coreTrigger = within(sectionsGroup).getByRole('button', { name: 'Core' });
    fireEvent.focus(coreTrigger);

    const corePanel = screen.getByLabelText('Command navigation: Core');
    const registrationLink = within(corePanel).getByRole('link', { name: 'Members' });

    const guildTrigger = within(sectionsGroup).getByRole('button', { name: 'Guild' });
    fireEvent.focus(guildTrigger);

    const guildPanel = screen.getByLabelText('Command navigation: Guild');
    const guidesLink = within(guildPanel).getByRole('link', { name: 'Guides' });
    const absencesLink = within(guildPanel).getByRole('link', { name: 'Absences' });

    expect(coreTrigger).toHaveAttribute('aria-expanded', 'false');
    expect(guildTrigger).toHaveAttribute('aria-expanded', 'true');

    fireEvent.touchStart(registrationLink);
    fireEvent.mouseEnter(guidesLink);
    fireEvent.focus(absencesLink);

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
