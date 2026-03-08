'use client';

import { useState } from 'react';
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
  let decoded = value;

  for (let i = 0; i < 3; i += 1) {
    try {
      const next = decodeURIComponent(decoded);
      if (next === decoded) {
        break;
      }
      decoded = next;
    } catch {
      break;
    }
  }

  return decoded;
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
    const cleanedValue = value.replace(/[),.;!?]+$/, '');
    const url = new URL(cleanedValue);
    const guidePath = url.pathname.replace(/\/+$/, '');

    if (!guidePath.startsWith('/guides')) {
      return decodeUriComponentSafe(value);
    }

    const slug = url.searchParams.get('slug');
    if (!slug) {
      const parts = guidePath.split('/').filter(Boolean);
      const pathSlug = parts[1];
      return pathSlug ? toReadableLabel(pathSlug) : 'Guides';
    }

    return toReadableLabel(slug);
  } catch {
    return /^https?:\/\//i.test(value) ? decodeUriComponentSafe(value) : null;
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

  return body;
}

function buildFeaturedPreview(normalizedContent: string, displayTitle: string): string {
  return buildPreview(normalizedContent, displayTitle);
}

function splitFeaturedNews<T extends { id: string; pinned?: boolean }>(items: T[]): {
  featured: T | null;
  list: T[];
} {
  if (items.length === 0) {
    return { featured: null, list: [] };
  }

  const featured = items.find((item) => item.pinned) ?? items[0];
  return {
    featured,
    list: items.filter((item) => item.id !== featured.id),
  };
}

function NewsSectionContent({ user }: NewsSectionProps) {
  const { data: news = [], isLoading, error, refetch } = useNews();
  const { featured, list } = splitFeaturedNews(news);
  const [expandedNewsIds, setExpandedNewsIds] = useState<string[]>([]);
  const [isFeaturedExpanded, setIsFeaturedExpanded] = useState(false);

  const toggleExpandedNews = (id: string) => {
    setExpandedNewsIds((current) =>
      current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]
    );
  };

  if (isLoading) {
    return (
      <LoadingState
        title="News"
        subtitle="Loading latest guild news and updates..."
        icon={<WuxiaIcon name="news" className="w-6 h-6 text-red-400" />}
        skeletonCount={6}
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
              description="Пока нет опубликованных анонсов. Проверьте Discord или обновите ленту."
              action={
                <button onClick={() => refetch()} className="btn-secondary">
                  <WuxiaIcon name="redo" className="inline-block w-5 h-5 mr-2 align-text-bottom" />
                  Refresh Feed
                </button>
              }
            />
          ) : (
            <>
              {featured ? (
                (() => {
                  const normalizedContent = normalizeDiscordText(featured.content);
                  const displayTitle = resolveDisplayTitle(featured.title, normalizedContent);
                  const preview = buildFeaturedPreview(normalizedContent, displayTitle);
                  const canExpandFeatured = preview.length > 760;
                  const featuredPreview = canExpandFeatured && !isFeaturedExpanded ? `${preview.slice(0, 757).trimEnd()}...` : preview;

                  return (
                    <article className="card news-hero p-7 md:p-8">
                      <div className="flex items-center gap-2 text-xs sm:text-sm mb-4">
                        {featured.pinned ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-300 border border-yellow-400/30">
                            <WuxiaIcon name="thumbtack" className="w-3.5 h-3.5" />
                            Featured
                          </span>
                        ) : null}
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-400/20">
                          <WuxiaIcon name="news" className="w-3.5 h-3.5" />
                          Guild Update
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold font-orbitron mb-2 text-cyan-100 tracking-wide">
                        {displayTitle}
                      </h3>
                      <p className="news-meta mb-4">{formatDate(featured.date)}</p>

                      <p className="text-gray-200/95 mb-6 text-base sm:text-lg leading-relaxed whitespace-pre-line break-words">
                        {featuredPreview}
                      </p>

                      {canExpandFeatured ? (
                        <button
                          type="button"
                          className="news-expand-button mb-6"
                          onClick={() => setIsFeaturedExpanded((current) => !current)}
                        >
                          {isFeaturedExpanded ? 'Show less' : 'Read full news'}
                        </button>
                      ) : null}

                      <div className="news-card-footer mt-auto pt-5 border-t border-cyan-400/15">
                        <div className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
                          <WuxiaIcon name="user" className="w-4 h-4 text-gray-400" />
                          <span>{featured.author || 'Guild Staff'}</span>
                        </div>

                        {featured.messageUrl ? (
                          <a
                            href={featured.messageUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="news-discord-link"
                          >
                            <WuxiaIcon name="link" className="w-4 h-4" />
                            Open in Discord
                          </a>
                        ) : null}
                      </div>
                    </article>
                  );
                })()
              ) : null}

              {list.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 items-stretch">
                  {list.map((item) => {
                    const normalizedContent = normalizeDiscordText(item.content);
                    const displayTitle = resolveDisplayTitle(item.title, normalizedContent);
                    const preview = buildPreview(normalizedContent, displayTitle);
                    const isExpanded = expandedNewsIds.includes(item.id);
                    const canExpand = preview.length > 320;

                    return (
                      <article key={item.id} className="card news-card p-6 md:p-7">
                        <div className="flex items-center gap-2 text-xs sm:text-sm mb-3">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-400/20">
                            <WuxiaIcon name="news" className="w-3.5 h-3.5" />
                            Guild Update
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold font-orbitron mb-2 text-cyan-200 tracking-wide">
                          {displayTitle}
                        </h3>
                        <p className="news-meta mb-4">{formatDate(item.date)}</p>

                        <p className={`news-card-preview text-gray-200/95 mb-4 text-sm sm:text-base leading-relaxed whitespace-pre-line break-words${isExpanded ? ' is-expanded' : ''}`}>
                          {preview}
                        </p>

                        {canExpand ? (
                          <button
                            type="button"
                            className="news-expand-button mb-6"
                            onClick={() => toggleExpandedNews(item.id)}
                          >
                            {isExpanded ? 'Show less' : 'Read full news'}
                          </button>
                        ) : null}

                        <div className="news-card-footer mt-auto pt-4 border-t border-cyan-400/15">
                          <div className="flex items-center gap-2 text-gray-300 text-sm">
                            <WuxiaIcon name="user" className="w-4 h-4 text-gray-400" />
                            <span>{item.author || 'Guild Staff'}</span>
                          </div>

                          {item.messageUrl ? (
                            <a
                              href={item.messageUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="news-discord-link"
                            >
                              <WuxiaIcon name="link" className="w-4 h-4" />
                              Open in Discord
                            </a>
                          ) : null}
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : null}
            </>
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
