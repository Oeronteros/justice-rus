'use client';

import Link from 'next/link';
import { Fragment, useMemo, useState, type ReactNode } from 'react';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { useCreateNews, useDeleteNews, useNews } from '@/lib/news/hooks';
import { formatDate } from '@/lib/utils';
import WuxiaIcon from '@/components/WuxiaIcons';
import type { User } from '@/lib/schemas/auth';
import { SectionHero } from '@/components/shared/SectionHero';
import { useTranslation } from '@/lib/i18n/context';
import { sectionLabels } from '@/lib/i18n';
import { hasRoleAtLeast } from '@/lib/authz';
import { handleApiError } from '@/lib/api/errors';
import * as stylex from '@stylexjs/stylex';
import { uiStyles } from '@/components/shared/Ui.stylex';
import { newsStyles } from './News.stylex';

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
          {...stylex.props(newsStyles.inlineLink)}
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
    ? newsStyles.deliverySent
    : status === 'failed'
      ? newsStyles.deliveryFailed
      : newsStyles.deliveryPending;
  const label = status === 'sent' ? 'Sent to Discord' : status === 'failed' ? 'Discord failed' : 'Publishing';

  return <span {...stylex.props(newsStyles.deliveryBadge, tone)}>{label}</span>;
}

function NewsSectionContent({ user }: NewsSectionProps) {
  const { t, language } = useTranslation();
  const { data: news = [], isLoading, error, refetch } = useNews();
  const createNewsMutation = useCreateNews();
  const deleteNewsMutation = useDeleteNews();
  const { featured, list } = splitFeaturedNews(news);
  const [expandedNewsIds, setExpandedNewsIds] = useState<string[]>([]);
  const [isFeaturedExpanded, setIsFeaturedExpanded] = useState(false);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftContent, setDraftContent] = useState('');
  const [draftPinned, setDraftPinned] = useState(false);
  const [composerNotice, setComposerNotice] = useState<string | null>(null);
  const canPublish = hasRoleAtLeast(user.role, 'officer');

  const handleDeleteNews = async (id: string) => {
    const confirmed = window.confirm('Удалить эту новость?');
    if (!confirmed) {
      return;
    }

    try {
      await deleteNewsMutation.mutateAsync(id);
      setComposerNotice('Новость удалена с сайта.');
    } catch (deleteError) {
      setComposerNotice(handleApiError(deleteError));
    }
  };

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
        icon={<WuxiaIcon name="news" {...stylex.props(newsStyles.iconStateMd)} />}
        skeletonCount={6}
        layout="cards"
      />
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={<WuxiaIcon name="alertTriangle" {...stylex.props(newsStyles.iconStateLg)} />}
        title={t.news.error}
        description={error instanceof Error ? error.message : t.news.error}
        action={
          <button onClick={() => refetch()} {...stylex.props(uiStyles.buttonBase, uiStyles.buttonPrimary)}>
            <WuxiaIcon name="redo" {...stylex.props(newsStyles.inlineButtonIconMd)} />
            {t.errors.tryAgain}
          </button>
        }
        variant="error"
      />
    );
  }

  return (
    <section {...stylex.props(uiStyles.sectionShell)}>
      <div {...stylex.props(uiStyles.sectionContainer)}>
        <div {...stylex.props(uiStyles.stackLg)}>
          <SectionHero
            icon={<WuxiaIcon name="news" {...stylex.props(newsStyles.iconMd)} />}
            title={t.news.title}
            subtitle={t.news.subtitle}
            chips={['Announcements', 'Raid Plans', 'Updates']}
            actions={
              <div {...stylex.props(newsStyles.heroActionRow)}>
                <button type="button" {...stylex.props(uiStyles.buttonBase, uiStyles.buttonSecondary)} onClick={() => refetch()}>
                  <WuxiaIcon name="redo" {...stylex.props(newsStyles.inlineButtonIconSm)} />
                  {t.common.refresh}
                </button>
                <Link href="/guides" {...stylex.props(uiStyles.buttonBase, uiStyles.buttonSecondary)}>
                  <WuxiaIcon name="guides" {...stylex.props(newsStyles.inlineButtonIconSm)} />
                  {sectionLabels[language].guides}
                </Link>
              </div>
            }
          />

        <div {...stylex.props(newsStyles.overviewRail)}>
          <article {...stylex.props(uiStyles.card, uiStyles.sectionCard, newsStyles.overviewCard)}>
            <span {...stylex.props(newsStyles.kicker)}>{language === 'ru' ? 'Редакционный ритм' : language === 'zh' ? '内容脉冲' : 'Editorial pulse'}</span>
            <strong {...stylex.props(newsStyles.overviewValue)}>{news.length}</strong>
            <span {...stylex.props(newsStyles.overviewLabel)}>{language === 'ru' ? 'Опубликованные материалы' : language === 'zh' ? '已发布条目' : 'Published entries'}</span>
          </article>
          <article {...stylex.props(uiStyles.card, uiStyles.sectionCard, newsStyles.overviewCard)}>
            <span {...stylex.props(newsStyles.kicker)}>{language === 'ru' ? 'Фокус редакции' : language === 'zh' ? '精选焦点' : 'Featured desk'}</span>
            <strong {...stylex.props(newsStyles.overviewValue)}>{featured ? 1 : 0}</strong>
            <span {...stylex.props(newsStyles.overviewLabel)}>{featured ? (language === 'ru' ? 'Закрепленный акцент активен' : language === 'zh' ? '精选焦点已激活' : 'Pinned spotlight active') : (language === 'ru' ? 'Закрепленная новость не выбрана' : language === 'zh' ? '暂无置顶精选' : 'No featured item pinned')}</span>
          </article>
          <article {...stylex.props(uiStyles.card, uiStyles.sectionCard, newsStyles.overviewCard)}>
            <span {...stylex.props(newsStyles.kicker)}>{language === 'ru' ? 'Синхрон с Discord' : language === 'zh' ? 'Discord 同步' : 'Discord sync'}</span>
            <strong {...stylex.props(newsStyles.overviewValue)}>{news.filter((item) => item.messageUrl).length}</strong>
            <span {...stylex.props(newsStyles.overviewLabel)}>{language === 'ru' ? 'Материалы со ссылкой на Discord' : language === 'zh' ? '已回链到 Discord 的条目' : 'Entries linked back to Discord'}</span>
          </article>
        </div>

        {canPublish ? (
          <div {...stylex.props(newsStyles.sectionGrid)}>
            <article {...stylex.props(uiStyles.card, uiStyles.sectionCard, newsStyles.composerCard)}>
              <div {...stylex.props(newsStyles.headerRow)}>
                <div>
                  <div {...stylex.props(newsStyles.kicker)}>{language === 'ru' ? 'Новостной пульт' : language === 'zh' ? '公告控制台' : 'News console'}</div>
                  <h3 {...stylex.props(newsStyles.panelTitleLg)}>{language === 'ru' ? 'Публикация в портал и Discord' : language === 'zh' ? '同步发布到门户与 Discord' : 'Publish to portal and Discord'}</h3>
                </div>
                <DeliveryBadge status={createNewsMutation.isPending ? 'pending' : undefined} />
              </div>

              <div {...stylex.props(newsStyles.composerGrid)}>
                <label {...stylex.props(newsStyles.labelStack)}>
                  <span {...stylex.props(newsStyles.label)}>Заголовок</span>
                  <input
                    type="text"
                    value={draftTitle}
                    onChange={(event) => setDraftTitle(event.target.value)}
                    {...stylex.props(uiStyles.input)}
                    placeholder="Например: Подготовка к GVG"
                  />
                </label>

                <label {...stylex.props(newsStyles.labelStack)}>
                  <span {...stylex.props(newsStyles.label)}>Текст новости</span>
                  <textarea
                    value={draftContent}
                    onChange={(event) => setDraftContent(event.target.value)}
                    {...stylex.props(uiStyles.input, newsStyles.textarea)}
                    placeholder="Пиши как в гайдах: заголовки, ссылки, списки. Бот адаптирует сообщение для Discord."
                  />
                </label>

                <label {...stylex.props(newsStyles.checkboxWrap)}>
                  <input
                    type="checkbox"
                    checked={draftPinned}
                    onChange={(event) => setDraftPinned(event.target.checked)}
                    {...stylex.props(newsStyles.checkbox)}
                  />
                  {language === 'ru' ? 'Закрепить как featured-новость' : language === 'zh' ? '设为精选置顶' : 'Pin as featured news'}
                </label>

                {composerNotice ? (
                  <div {...stylex.props(uiStyles.notice, newsStyles.noticeInfo)}>
                    {composerNotice}
                  </div>
                ) : null}

                <div {...stylex.props(newsStyles.actionRow)}>
                  <button
                    type="button"
                    {...stylex.props(uiStyles.buttonBase, uiStyles.buttonPrimary)}
                    onClick={submitNews}
                    disabled={createNewsMutation.isPending}
                  >
                    {createNewsMutation.isPending ? (language === 'ru' ? 'Публикуем...' : language === 'zh' ? '发布中...' : 'Publishing...') : (language === 'ru' ? 'Опубликовать новость' : language === 'zh' ? '发布公告' : 'Publish news')}
                  </button>
                  <span {...stylex.props(newsStyles.actionHint)}>{language === 'ru' ? 'Публикация создает запись на сайте и сразу отправляет сообщение через бота.' : language === 'zh' ? '发布会同步生成站内记录，并立即通过机器人发送到 Discord。' : 'Publishing creates a site entry and immediately sends it through the bot.'}</span>
                </div>
              </div>
            </article>

            <article {...stylex.props(uiStyles.card, uiStyles.sectionCard, newsStyles.composerCard)}>
              <div {...stylex.props(newsStyles.kicker)}>Discord preview</div>
              <h3 {...stylex.props(newsStyles.panelTitleMd)}>{language === 'ru' ? 'Как это будет выглядеть' : language === 'zh' ? '发布后的呈现方式' : 'How it will look'}</h3>

              {composerPreview ? (
                <div {...stylex.props(newsStyles.previewShell)}>
                  <div {...stylex.props(newsStyles.previewTopRow)}>
                    <DeliveryBadge status="sent" />
                    {draftPinned ? <span {...stylex.props(newsStyles.pinnedPill)}>{language === 'ru' ? 'Закреплено' : language === 'zh' ? '置顶' : 'Pinned'}</span> : null}
                  </div>
                  <div {...stylex.props(newsStyles.previewInner)}>
                    <h4 {...stylex.props(newsStyles.previewTitle)}>{composerPreview.title}</h4>
                    <p {...stylex.props(newsStyles.previewBody)}>
                      {renderNewsTextWithLinks(composerPreview.body, 'composer-preview')}
                    </p>
                    <div {...stylex.props(newsStyles.previewAuthor)}>{language === 'ru' ? 'Автор' : language === 'zh' ? '作者' : 'Author'}: {user.nickname || (language === 'ru' ? 'Штаб гильдии' : language === 'zh' ? '公会指挥部' : 'Guild Staff')}</div>
                  </div>
                </div>
              ) : (
                <div {...stylex.props(newsStyles.previewShell, newsStyles.previewShellEmpty)}>
                  {language === 'ru' ? 'Заполни новость слева, и здесь появится Discord-safe превью.' : language === 'zh' ? '先在左侧填写公告，这里会显示适合 Discord 的预览。' : 'Fill in the news draft on the left and a Discord-safe preview will appear here.'}
                </div>
              )}
            </article>
          </div>
        ) : null}

        <div {...stylex.props(uiStyles.stackLg)}>
          {news.length === 0 ? (
            <EmptyState
              icon={<WuxiaIcon name="news" {...stylex.props(newsStyles.iconEmpty)} />}
              title={t.news.empty}
              description={t.news.emptyDescription}
              action={
                <button onClick={() => refetch()} {...stylex.props(uiStyles.buttonBase, uiStyles.buttonSecondary)}>
                  <WuxiaIcon name="redo" {...stylex.props(newsStyles.inlineButtonIconMd)} />
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
                    <article {...stylex.props(uiStyles.card, uiStyles.sectionCard, newsStyles.featuredCard)}>
                      <div {...stylex.props(newsStyles.tagRow)}>
                        {featured.pinned ? (
                          <span {...stylex.props(newsStyles.featuredPinned)}>
                            <WuxiaIcon name="thumbtack" {...stylex.props(newsStyles.iconXs)} />
                            Featured
                          </span>
                        ) : null}
                        <span {...stylex.props(newsStyles.guildUpdatePill)}>
                          <WuxiaIcon name="news" {...stylex.props(newsStyles.iconXs)} />
                          Guild Update
                        </span>
                        <DeliveryBadge status={featured.discordDeliveryStatus} />
                      </div>

                      <h3 {...stylex.props(newsStyles.featuredTitle)}>
                        {displayTitle}
                      </h3>
                      <p {...stylex.props(newsStyles.meta)}>{formatDate(featured.date)}</p>

                      <p {...stylex.props(newsStyles.featuredBody)}>
                        {renderNewsTextWithLinks(featuredPreview, `featured-${featured.id}`)}
                      </p>

                      {canExpandFeatured ? (
                        <button
                          type="button"
                          {...stylex.props(newsStyles.expandButton)}
                          onClick={() => setIsFeaturedExpanded((current) => !current)}
                        >
                          {isFeaturedExpanded ? (language === 'ru' ? 'Свернуть' : language === 'zh' ? '收起' : 'Show less') : (language === 'ru' ? 'Читать целиком' : language === 'zh' ? '阅读全文' : 'Read full news')}
                        </button>
                        ) : null}

                        <div {...stylex.props(newsStyles.cardFooter)}>
                          <div {...stylex.props(newsStyles.authorRow)}>
                            <WuxiaIcon name="user" {...stylex.props(newsStyles.iconSm, newsStyles.iconMuted)} />
                            <span>{featured.author || (language === 'ru' ? 'Штаб гильдии' : language === 'zh' ? '公会指挥部' : 'Guild Staff')}</span>
                          </div>

                        <div {...stylex.props(newsStyles.actionButtons)}>
                          {canPublish ? (
                            <button
                              type="button"
                              {...stylex.props(uiStyles.buttonBase, uiStyles.buttonSecondary, uiStyles.buttonXs)}
                              onClick={() => void handleDeleteNews(featured.id)}
                              disabled={deleteNewsMutation.isPending}
                            >
                              {deleteNewsMutation.isPending ? (language === 'ru' ? 'Удаляем...' : language === 'zh' ? '删除中...' : 'Deleting...') : (language === 'ru' ? 'Удалить' : language === 'zh' ? '删除' : 'Delete')}
                            </button>
                          ) : null}

                          {featured.messageUrl ? (
                            <a
                              href={featured.messageUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              {...stylex.props(newsStyles.discordLink)}
                            >
                              <WuxiaIcon name="link" {...stylex.props(newsStyles.iconSm)} />
                              Open in Discord
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </article>
                  );
                })()
              ) : null}

              {list.length > 0 ? (
                <div {...stylex.props(newsStyles.listGrid)}>
                  {list.map((item) => {
                    const normalizedContent = normalizeDiscordText(item.content);
                    const displayTitle = resolveDisplayTitle(item.title, normalizedContent);
                    const preview = buildPreview(normalizedContent, displayTitle);
                    const isExpanded = expandedNewsIds.includes(item.id);
                    const canExpand = preview.length > 320;

                    return (
                      <article key={item.id} {...stylex.props(uiStyles.card, uiStyles.sectionCard, newsStyles.newsCard)}>
                        <div {...stylex.props(newsStyles.cardHeaderRail)}>
                          <div {...stylex.props(newsStyles.tagRow, newsStyles.tagRowCompact)}>
                            <span {...stylex.props(newsStyles.guildUpdatePill)}>
                              <WuxiaIcon name="news" {...stylex.props(newsStyles.iconXs)} />
                              Guild Update
                            </span>
                            <DeliveryBadge status={item.discordDeliveryStatus} />
                          </div>
                          <span {...stylex.props(newsStyles.meta)}>{formatDate(item.date)}</span>
                        </div>

                        <h3 {...stylex.props(newsStyles.newsCardTitle)}>
                          {displayTitle}
                        </h3>

                        <p {...stylex.props(newsStyles.previewText, isExpanded && newsStyles.previewExpanded)}>
                          {renderNewsTextWithLinks(preview, `news-${item.id}`)}
                        </p>

                        {canExpand ? (
                          <button
                            type="button"
                            {...stylex.props(newsStyles.expandButton)}
                            onClick={() => toggleExpandedNews(item.id)}
                          >
                            {isExpanded ? 'Show less' : 'Read full news'}
                          </button>
                        ) : null}

                        <div {...stylex.props(newsStyles.cardFooter)}>
                          <div {...stylex.props(newsStyles.authorRow)}>
                            <WuxiaIcon name="user" {...stylex.props(newsStyles.iconSm, newsStyles.iconMuted)} />
                            <span>{item.author || 'Guild Staff'}</span>
                          </div>

                          <div {...stylex.props(newsStyles.actionButtons)}>
                            {canPublish ? (
                              <button
                                type="button"
                                {...stylex.props(uiStyles.buttonBase, uiStyles.buttonSecondary, uiStyles.buttonXs)}
                                onClick={() => void handleDeleteNews(item.id)}
                                disabled={deleteNewsMutation.isPending}
                              >
                                {deleteNewsMutation.isPending ? (language === 'ru' ? 'Удаляем...' : language === 'zh' ? '删除中...' : 'Deleting...') : (language === 'ru' ? 'Удалить' : language === 'zh' ? '删除' : 'Delete')}
                              </button>
                            ) : null}

                            {item.messageUrl ? (
                              <a
                                href={item.messageUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                {...stylex.props(newsStyles.discordLink)}
                              >
                                <WuxiaIcon name="link" {...stylex.props(newsStyles.iconSm)} />
                                Open in Discord
                              </a>
                            ) : null}
                          </div>
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
