'use client';

import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { useNews } from '@/lib/hooks/useNews';
import { formatDate } from '@/lib/utils';
import WuxiaIcon from '@/components/WuxiaIcons';
import type { User } from '@/types';
import { SectionHero } from '@/components/shared/SectionHero';

interface NewsSectionProps {
  user: User;
}

const ROLE_MENTION_RE = /<@&\d+>/g;
const USER_MENTION_RE = /<@!?\d+>/g;
const CHANNEL_MENTION_RE = /<#\d+>/g;
const URL_RE = /https?:\/\/[^\s)]+/gi;

function decodeUriComponentSafe(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function toReadableLabel(value: string): string {
  const normalized = decodeUriComponentSafe(value)
    .replace(/[\-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!normalized) {
    return '';
  }

  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

function formatKnownNewsUrl(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.pathname !== '/guides') {
      return null;
    }

    const slug = url.searchParams.get('slug');
    if (!slug) {
      return null;
    }

    return toReadableLabel(slug);
  } catch {
    return null;
  }
}

function normalizeNewsLine(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    return '';
  }

  const directUrlLabel = formatKnownNewsUrl(trimmed);
  if (directUrlLabel) {
    return directUrlLabel;
  }

  return trimmed.replace(URL_RE, (url) => formatKnownNewsUrl(url) ?? url);
}

function normalizeDiscordText(value: string): string {
  return value
    .replace(ROLE_MENTION_RE, '@role')
    .replace(USER_MENTION_RE, '@member')
    .replace(CHANNEL_MENTION_RE, '#channel')
    .replace(/\r\n?/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .split('\n')
    .map((line) => normalizeNewsLine(line))
    .join('\n')
    .trim();
}

function isTechnicalTitle(value: string): boolean {
  const normalized = value.trim().toLowerCase();
  return (
    !normalized ||
    normalized === 'untitled' ||
    normalized === '@role' ||
    normalized === '@member' ||
    /^<[@#].*>$/.test(value.trim()) ||
    /^https?:\/\//.test(normalized)
  );
}

function resolveDisplayTitle(rawTitle: string, normalizedContent: string): string {
  const normalizedTitle = normalizeDiscordText(rawTitle).replace(/^#+\s*/, '').trim();
  if (!isTechnicalTitle(normalizedTitle) && normalizedTitle.length >= 4) {
    return normalizedTitle;
  }

  const lines = normalizedContent
    .split('\n')
    .map((line) => line.replace(/^#+\s*/, '').trim())
    .filter(Boolean);

  const fallbackLine = lines.find((line) => !isTechnicalTitle(line) && line.length >= 4);
  return fallbackLine || 'Guild Announcement';
}

function buildPreview(normalizedContent: string, displayTitle: string): string {
  const lines = normalizedContent
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const withoutTitle = lines[0] === displayTitle ? lines.slice(1) : lines;
  const body = withoutTitle.join('\n').trim();
  if (!body) {
    return 'Подробности обновления опубликованы в Discord-канале гильдии.';
  }

  if (body.length <= 540) {
    return body;
  }

  return `${body.slice(0, 537).trimEnd()}...`;
}

function NewsSectionContent({ user }: NewsSectionProps) {
  const { data: news = [], isLoading, error, refetch } = useNews();

  if (isLoading) {
    return (
      <LoadingState
        title="News"
        subtitle="Loading latest guild news and updates..."
        icon={<WuxiaIcon name="news" className="w-6 h-6 text-red-400" />}
        skeletonCount={3}
      />
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={<WuxiaIcon name="alertTriangle" className="w-7 h-7 text-red-400" />}
        title="Error Loading News"
        description={error instanceof Error ? error.message : 'Failed to load news'}
        action={
          <button onClick={() => refetch()} className="btn-primary">
            <WuxiaIcon name="redo" className="inline-block w-5 h-5 mr-2 align-text-bottom" />
            Try Again
          </button>
        }
        variant="error"
      />
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <SectionHero
            icon={<WuxiaIcon name="news" className="w-5 h-5" />}
            title="Guild News"
            subtitle="Оперативные анонсы, решения по рейдам и важные обновления по составу."
            chips={['Announcements', 'Raid Plans', 'Updates']}
          />
        </div>

        <div className="space-y-8">
          {news.length === 0 ? (
            <EmptyState
              icon={<WuxiaIcon name="news" className="w-10 h-10 text-gray-500" />}
              title="No News Available"
              description="No news or announcements have been posted yet"
            />
          ) : (
            news.map((item) => {
                const normalizedContent = normalizeDiscordText(item.content);
                const displayTitle = resolveDisplayTitle(item.title, normalizedContent);
                const preview = buildPreview(normalizedContent, displayTitle);

                return (
                  <article
                    key={item.id}
                    className="card p-7 md:p-8 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        {item.pinned ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-300 border border-yellow-400/30">
                            <WuxiaIcon name="thumbtack" className="w-3.5 h-3.5" />
                            Pinned
                          </span>
                        ) : null}
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-400/20">
                          <WuxiaIcon name="news" className="w-3.5 h-3.5" />
                          Guild Update
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap">{formatDate(item.date)}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold font-orbitron mb-3 text-cyan-200 tracking-wide">
                      {displayTitle}
                    </h3>

                    <p className="text-gray-200/95 mb-6 text-base sm:text-lg leading-relaxed whitespace-pre-line break-words">
                      {preview}
                    </p>

                    <div className="flex flex-wrap justify-between items-center gap-3 pt-5 border-t border-cyan-400/15">
                      <div className="flex items-center space-x-2 text-gray-300">
                        <WuxiaIcon name="user" className="w-4 h-4 text-gray-400" />
                        <span>{item.author}</span>
                      </div>

                      {item.messageUrl ? (
                        <a
                          href={item.messageUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 hover:text-cyan-200 transition-colors"
                        >
                          <WuxiaIcon name="link" className="w-4 h-4" />
                          Open in Discord
                        </a>
                      ) : null}
                    </div>
                  </article>
                );
              })
          )}
        </div>
      </div>
    </section>
  );
}

export default function NewsSection(props: NewsSectionProps) {
  return (
    <ErrorBoundary>
      <NewsSectionContent {...props} />
    </ErrorBoundary>
  );
}
