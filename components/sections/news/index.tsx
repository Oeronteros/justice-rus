'use client';

import { Fragment, useMemo, useState, type ReactNode } from 'react';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { useCreateNews, useNews } from '@/lib/news/hooks';
import { formatDate } from '@/lib/utils';
import WuxiaIcon from '@/components/WuxiaIcons';
import type { User } from '@/lib/schemas/auth';
import { SectionHero } from '@/components/shared/SectionHero';
import { useTranslation } from '@/lib/i18n/context';
import { hasRoleAtLeast } from '@/lib/authz';
import { handleApiError } from '@/lib/api/errors';

interface NewsSectionProps {
  user: User;
}

const ROLE_MENTION_RE = /<@&\d+>/g;
const USER_MENTION_RE = /<@!?\d+>/g;
const CHANNEL_MENTION_RE = /<#\d+>/g;
const URL_RE = /https?:\/\/[^\s<>"'\])]+/gi;
const TRAILING_URL_PUNCTUATION_RE = /[.,;!?]+$/;

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

function splitUrlFromTrailingPunctuation(value: string): { href: string; trailingPunctuation: string } {
  const trailingPunctuation = value.match(TRAILING_URL_PUNCTUATION_RE)?.[0] ?? '';
  if (!trailingPunctuation) {
    return { href: value, trailingPunctuation: '' };
  }

  return {
    href: value.slice(0, -trailingPunctuation.length),
    trailingPunctuation,
  };
}

function normalizeNewsLine(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    return '';
  }

  return trimmed;
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

function trimPreviewAtSafeBoundary(value: string, limit: number): string {
  if (value.length <= limit) {
    return value;
  }

  const trimmedValue = value.slice(0, limit).trimEnd();
  const urlMatches = Array.from(trimmedValue.matchAll(URL_RE));
  const lastMatch = urlMatches[urlMatches.length - 1];

  if (!lastMatch) {
    return trimmedValue;
  }

  const matchIndex = lastMatch.index ?? 0;
  const matchEnd = matchIndex + lastMatch[0].length;
  const nextCharacter = value.charAt(matchEnd);
  if (matchEnd === trimmedValue.length && nextCharacter && /[^\s),.;!?]/.test(nextCharacter)) {
    return trimmedValue.slice(0, matchIndex).trimEnd();
  }

  return trimmedValue;
}

function renderNewsLineWithLinks(value: string, keyPrefix: string): ReactNode {
  const urlMatches = Array.from(value.matchAll(URL_RE));
  if (urlMatches.length === 0) {
    return value;
  }

  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  urlMatches.forEach((match, index) => {
    const matchIndex = match.index ?? 0;
    const rawUrl = match[0];
    const { href, trailingPunctuation } = splitUrlFromTrailingPunctuation(rawUrl);

    if (matchIndex > lastIndex) {
      nodes.push(value.slice(lastIndex, matchIndex));
    }

    if (href) {
      nodes.push(
        <a
          key={`${keyPrefix}-link-${index}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="news-inline-link"
        >
          {formatKnownNewsUrl(href) ?? decodeUriComponentSafe(href)}
        </a>
      );
    }

    if (trailingPunctuation) {
      nodes.push(trailingPunctuation);
    }

    lastIndex = matchIndex + rawUrl.length;
  });

  if (lastIndex < value.length) {
    nodes.push(value.slice(lastIndex));
  }

  return nodes;
}

function renderNewsTextWithLinks(value: string, keyPrefix: string): ReactNode {
  return value.split('\n').map((line, index, lines) => (
    <Fragment key={`${keyPrefix}-line-${index}`}>
      {renderNewsLineWithLinks(line, `${keyPrefix}-${index}`)}
      {index < lines.length - 1 ? <br /> : null}
    </Fragment>
  ));
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

function DeliveryBadge({ status }: { status?: 'pending' | 'sent' | 'failed' }) {
  if (!status) {
    return null;
  }

  const tone = status === 'sent'
    ? 'bg-emerald-500/12 text-emerald-200 border-emerald-400/30'
    : status === 'failed'
      ? 'bg-rose-500/12 text-rose-200 border-rose-400/30'
      : 'bg-amber-500/12 text-amber-100 border-amber-400/30';
  const label = status === 'sent' ? 'Sent to Discord' : status === 'failed' ? 'Discord failed' : 'Publishing';

  return <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${tone}`}>{label}</span>;
}

function NewsSectionContent({ user }: NewsSectionProps) {
  const { t } = useTranslation();
  const { data: news = [], isLoading, error, refetch } = useNews();
  const createNewsMutation = useCreateNews();
  const { featured, list } = splitFeaturedNews(news);
  const [expandedNewsIds, setExpandedNewsIds] = useState<string[]>([]);
  const [isFeaturedExpanded, setIsFeaturedExpanded] = useState(false);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftContent, setDraftContent] = useState('');
  const [draftPinned, setDraftPinned] = useState(false);
  const [composerNotice, setComposerNotice] = useState<string | null>(null);
  const canPublish = hasRoleAtLeast(user.role, 'officer');

  const composerPreview = useMemo(() => {
    const normalizedContent = normalizeDiscordText(draftContent);
    if (!normalizedContent) {
      return null;
    }

    const displayTitle = resolveDisplayTitle(draftTitle, normalizedContent);
    return {
      title: displayTitle,
      body: buildPreview(normalizedContent, displayTitle),
    };
  }, [draftContent, draftTitle]);

  const toggleExpandedNews = (id: string) => {
    setExpandedNewsIds((current) =>
      current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]
    );
  };

  const submitNews = async () => {
    const title = draftTitle.trim();
    const content = draftContent.trim();
    if (title.length < 3 || content.length < 3) {
      setComposerNotice('Заполни заголовок и текст новости.');
      return;
    }

    try {
      setComposerNotice(null);
      await createNewsMutation.mutateAsync({
        title,
        content,
        pinned: draftPinned,
        author: user.nickname || undefined,
      });
      setDraftTitle('');
      setDraftContent('');
      setDraftPinned(false);
      setComposerNotice('Новость опубликована и отправлена в Discord.');
    } catch (submitError) {
      setComposerNotice(handleApiError(submitError));
    }
  };

  if (isLoading) {
    return (
      <LoadingState
        title={t.news.title}
        subtitle={t.news.loading}
        icon={<WuxiaIcon name="news" className="w-6 h-6 text-red-400" />}
        skeletonCount={6}
        layout="cards"
      />
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={<WuxiaIcon name="alertTriangle" className="w-7 h-7 text-red-400" />}
        title={t.news.error}
        description={error instanceof Error ? error.message : t.news.error}
        action={
          <button onClick={() => refetch()} className="btn-primary">
            <WuxiaIcon name="redo" className="inline-block w-5 h-5 mr-2 align-text-bottom" />
            {t.errors.tryAgain}
          </button>
        }
        variant="error"
      />
    );
  }

  return (
    <section className="section-shell py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-stack-lg">
          <SectionHero
            icon={<WuxiaIcon name="news" className="w-5 h-5" />}
            title={t.news.title}
            subtitle={t.news.subtitle}
            chips={['Announcements', 'Raid Plans', 'Updates']}
          />

        {canPublish ? (
          <div className="grid gap-4 sm:gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <article className="card section-card ds-section-panel p-5 sm:p-6 md:p-7">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs sm:text-sm uppercase tracking-[0.18em] text-[#9ec5d8]">News console</div>
                  <h3 className="mt-2 text-2xl font-bold font-orbitron text-cyan-100">Публикация в портал и Discord</h3>
                </div>
                <DeliveryBadge status={createNewsMutation.isPending ? 'pending' : undefined} />
              </div>

              <div className="grid gap-4">
                <label className="space-y-2">
                  <span className="text-sm text-gray-400">Заголовок</span>
                  <input
                    type="text"
                    value={draftTitle}
                    onChange={(event) => setDraftTitle(event.target.value)}
                    className="input-field w-full"
                    placeholder="Например: Подготовка к GVG"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm text-gray-400">Текст новости</span>
                  <textarea
                    value={draftContent}
                    onChange={(event) => setDraftContent(event.target.value)}
                    className="input-field min-h-[220px] w-full resize-y"
                    placeholder="Пиши как в гайдах: заголовки, ссылки, списки. Бот адаптирует сообщение для Discord."
                  />
                </label>

                <label className="inline-flex items-center gap-3 rounded-2xl ds-section-panel-soft px-4 py-3 text-sm text-cyan-50">
                  <input
                    type="checkbox"
                    checked={draftPinned}
                    onChange={(event) => setDraftPinned(event.target.checked)}
                    className="h-4 w-4 accent-cyan-300"
                  />
                  Закрепить как featured-новость
                </label>

                {composerNotice ? (
                  <div className="ds-notice border-cyan-400/20 bg-[#11202a]/75 text-[#d9edf7]">
                    {composerNotice}
                  </div>
                ) : null}

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    className="btn-primary px-5 py-3"
                    onClick={submitNews}
                    disabled={createNewsMutation.isPending}
                  >
                    {createNewsMutation.isPending ? 'Публикуем...' : 'Опубликовать новость'}
                  </button>
                  <span className="text-sm text-[#c7dbe7]">Публикация создает запись на сайте и сразу отправляет сообщение через бота.</span>
                </div>
              </div>
            </article>

            <article className="card section-card ds-section-panel p-5 sm:p-6 md:p-7">
              <div className="text-xs sm:text-sm uppercase tracking-[0.18em] text-[#9ec5d8]">Discord preview</div>
              <h3 className="mt-2 text-xl font-bold font-orbitron text-cyan-100">Как это будет выглядеть</h3>

              {composerPreview ? (
                <div className="ds-section-panel mt-5 rounded-[28px] border-cyan-400/15 bg-[#0b131b]/88 p-5 shadow-[0_24px_60px_rgba(2,8,14,0.45)]">
                  <div className="mb-3 flex items-center gap-2 text-xs text-cyan-100/70">
                    <DeliveryBadge status="sent" />
                    {draftPinned ? <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-2.5 py-1 text-amber-200">Pinned</span> : null}
                  </div>
                  <div className="rounded-3xl ds-section-panel-soft border-cyan-400/12 bg-[#111b24] p-5">
                    <h4 className="text-xl font-bold text-cyan-100">{composerPreview.title}</h4>
                    <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-gray-200/90">
                      {renderNewsTextWithLinks(composerPreview.body, 'composer-preview')}
                    </p>
                    <div className="mt-4 text-xs uppercase tracking-[0.22em] text-gray-500">Автор: {user.nickname || 'Guild Staff'}</div>
                  </div>
                </div>
              ) : (
                <div className="ds-section-panel mt-5 rounded-[28px] border-dashed border-cyan-400/20 bg-[#0b131b]/78 p-6 text-sm text-gray-400">
                  Заполни новость слева, и здесь появится Discord-safe превью.
                </div>
              )}
            </article>
          </div>
        ) : null}

        <div className="section-stack-lg">
          {news.length === 0 ? (
            <EmptyState
              icon={<WuxiaIcon name="news" className="w-10 h-10 text-gray-500" />}
              title={t.news.empty}
              description={t.news.emptyDescription}
              action={
                <button onClick={() => refetch()} className="btn-secondary">
                  <WuxiaIcon name="redo" className="inline-block w-5 h-5 mr-2 align-text-bottom" />
                  {t.common.refresh}
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
                  const featuredPreview = canExpandFeatured && !isFeaturedExpanded ? `${trimPreviewAtSafeBoundary(preview, 757)}...` : preview;

                  return (
                    <article className="card news-hero section-card ds-section-panel p-5 sm:p-6 md:p-8">
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
                        <DeliveryBadge status={featured.discordDeliveryStatus} />
                      </div>

                      <h3 className="text-[1.45rem] sm:text-3xl font-bold font-orbitron mb-2 text-cyan-100 tracking-[0.01em]">
                        {displayTitle}
                      </h3>
                      <p className="news-meta mb-4">{formatDate(featured.date)}</p>

                      <p className="text-gray-200/95 mb-6 text-base sm:text-lg leading-relaxed break-words">
                        {renderNewsTextWithLinks(featuredPreview, `featured-${featured.id}`)}
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
                              rel="noopener noreferrer"
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
                <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3 items-stretch">
                  {list.map((item) => {
                    const normalizedContent = normalizeDiscordText(item.content);
                    const displayTitle = resolveDisplayTitle(item.title, normalizedContent);
                    const preview = buildPreview(normalizedContent, displayTitle);
                    const isExpanded = expandedNewsIds.includes(item.id);
                    const canExpand = preview.length > 320;

                    return (
                      <article key={item.id} className="card news-card section-card ds-section-panel p-5 sm:p-6 md:p-7">
                        <div className="flex items-center gap-2 text-xs sm:text-sm mb-3">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-400/20">
                            <WuxiaIcon name="news" className="w-3.5 h-3.5" />
                            Guild Update
                          </span>
                          <DeliveryBadge status={item.discordDeliveryStatus} />
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold font-orbitron mb-2 text-cyan-200 tracking-[0.01em]">
                          {displayTitle}
                        </h3>
                        <p className="news-meta mb-4">{formatDate(item.date)}</p>

                        <p className={`news-card-preview text-gray-200/95 mb-4 text-sm sm:text-base leading-relaxed break-words${isExpanded ? ' is-expanded' : ''}`}>
                          {renderNewsTextWithLinks(preview, `news-${item.id}`)}
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
                              rel="noopener noreferrer"
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
