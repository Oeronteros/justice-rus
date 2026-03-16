'use client';

import { useEffect, useMemo, useState, useCallback, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { extractMarkdownHeadings, MarkdownRenderer } from '@/components/guides/MarkdownRenderer';
import { handleApiError } from '@/lib/api/errors';
import { useDeleteGuide, useGuide, useGuides, useVoteGuide } from '@/lib/guides/hooks';
import type { GuideCategory } from '@/lib/schemas/guide';
import WuxiaIcon from '@/components/WuxiaIcons';
import { GuideComments } from './GuideComments';
import { GuideEditor } from './GuideEditor';
import * as stylex from '@stylexjs/stylex';
import { uiStyles } from '@/components/shared/Ui.stylex';
import { guidesStyles } from './Guides.stylex';

interface GuideModalProps {
  guideId: string;
  onClose: () => void;
  onGuideSelect?: (guideId: string) => void;
  canModerate?: boolean;
  userRole?: string;
  userId?: string;
}

type ShareCapableNavigator = Navigator & {
  share: (data?: ShareData) => Promise<void>;
};

function hasShareApi(navigator: Navigator): navigator is ShareCapableNavigator {
  return typeof navigator.share === 'function';
}

function getVoterKey(): string {
  if (typeof window === 'undefined') return 'server';
  const existing = localStorage.getItem('dc_guide_voter');
  if (existing) return existing;
  const generated =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `v_${Math.random().toString(16).slice(2)}_${Date.now()}`;
  localStorage.setItem('dc_guide_voter', generated);
  return generated;
}

export function GuideModal({
  guideId,
  onClose,
  onGuideSelect,
  canModerate = false,
  userRole,
  userId,
}: GuideModalProps) {
  const [voterKey] = useState(getVoterKey);
  const [editOpen, setEditOpen] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  
  const { data: guideDetail, isLoading, error } = useGuide(guideId, voterKey);
  const { data: guides = [] } = useGuides();
  const voteGuide = useVoteGuide();
  const deleteGuide = useDeleteGuide();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Закрытие по Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleVote = () => {
    voteGuide.mutate({ id: guideId, voterKey });
  };

  const canEdit = useMemo(() => {
    if (canModerate) return true;
    const owner = guideDetail?.guide.ownerAccountId;
    if (!owner || !userId) return false;
    const ownerNum = Number(owner);
    const userNum = Number(userId);
    if (!Number.isFinite(ownerNum) || !Number.isFinite(userNum)) return false;
    return ownerNum === userNum;
  }, [canModerate, guideDetail?.guide.ownerAccountId, userId]);

  const outline = useMemo(
    () => extractMarkdownHeadings(guideDetail?.guide.content || ''),
    [guideDetail?.guide.content]
  );

  const backlinks = useMemo(() => {
    const currentSlug = guideDetail?.guide.slug;
    if (!currentSlug) return [];

    return guides.filter((guide) => {
      if (guide.id === guideId) return false;
      return (guide.linkTargets || []).includes(currentSlug);
    });
  }, [guideDetail?.guide.slug, guideId, guides]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleDelete = useCallback(async () => {
    try {
      await deleteGuide.mutateAsync(guideId);
      onClose();
    } catch (deleteError) {
      setActionNotice(handleApiError(deleteError));
    }
  }, [deleteGuide, guideId, onClose]);

  const stableGuideUrl = useMemo(() => {
    if (typeof window === 'undefined') return `/`;
    const url = new URL(window.location.origin);
    url.pathname = '/guides';
    url.searchParams.set('guide', String(guideId));
    if (guideDetail?.guide.slug) {
      url.searchParams.set('slug', guideDetail.guide.slug);
    }
    return url.toString();
  }, [guideDetail, guideId]);

  const copyText = useCallback(async (text: string) => {
    if (typeof window === 'undefined') return;

    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 40);

    return () => window.clearTimeout(timer);
  }, []);

  const handleShare = useCallback(async () => {
    if (!guideDetail) return;
    const url = stableGuideUrl;

    try {
      if (typeof navigator !== 'undefined' && hasShareApi(navigator)) {
        await navigator.share({
          title: guideDetail.guide.title,
          text: `${guideDetail.guide.title} • ${guideDetail.guide.category}`,
          url,
        });
        setActionNotice('Поделились');
        return;
      }
    } catch {
      // ignore
    }

    try {
      await copyText(url);
      setActionNotice('Ссылка скопирована');
    } catch {
      window.prompt('Скопируй ссылку', url);
    }
  }, [copyText, guideDetail, stableGuideUrl]);

  const handleDownload = useCallback(() => {
    if (!guideDetail || typeof window === 'undefined') return;

    const g = guideDetail.guide;
    const frontMatter = [
      '---',
      `title: "${String(g.title).replace(/"/g, '\\"')}"`,
      `category: "${String(g.category).replace(/"/g, '\\"')}"`,
      `author: "${String(g.author).replace(/"/g, '\\"')}"`,
      `id: "${String(g.id).replace(/"/g, '\\"')}"`,
      `updatedAt: "${String(g.updatedAt).replace(/"/g, '\\"')}"`,
      'source: "Silent Moonfall Portal"',
      '---',
      '',
    ].join('\n');

    const markdown = `${frontMatter}${g.content || ''}`;
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const safeTitle = String(g.title || 'guide')
      .toLowerCase()
      .replace(/[^a-z0-9\-\s_]/gi, '')
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, 60);
    const filename = `${safeTitle || 'guide'}-${g.id}.md`;

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, [guideDetail]);

  const handleTranslate = useCallback(() => {
    if (!guideDetail || typeof window === 'undefined') return;

    const storedLang = localStorage.getItem('guild_portal_lang');
    const targetLang = storedLang === 'en' || storedLang === 'zh' || storedLang === 'ru' ? storedLang : 'ru';
    const googleTarget = targetLang === 'zh' ? 'zh-CN' : targetLang;
    const text = guideDetail.guide.content?.trim();

    if (!text) {
      setActionNotice('Нет текста для перевода');
      return;
    }

    const translateUrl = `https://translate.google.com/?sl=auto&tl=${encodeURIComponent(googleTarget)}&text=${encodeURIComponent(text)}&op=translate`;
    window.open(translateUrl, '_blank', 'noopener,noreferrer');
    setActionNotice('Открыли перевод');
  }, [guideDetail]);

  const handleScrollToHeading = useCallback((headingId: string) => {
    const container = contentRef.current;
    const target = container?.querySelector<HTMLElement>(`[data-guide-anchor="${headingId}"]`);
    if (!target) return;

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  if (!mounted) return null;

  const modalContent = (
    <div
      {...stylex.props(guidesStyles.modalRoot)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-modal-title"
    >
      {/* Шапка */}
      <div {...stylex.props(guidesStyles.modalHeaderBar)}>
        <div {...stylex.props(guidesStyles.modalHeaderInner)}>
          <div className="min-w-0 flex-1">
            <h3 id="guide-modal-title" {...stylex.props(guidesStyles.modalTitle)}>
              {guideDetail?.guide.title || 'Загрузка...'}
            </h3>
            <div {...stylex.props(guidesStyles.modalSubtle)}>
              {guideDetail && `${guideDetail.guide.author} • ${guideDetail.guide.category}`}
            </div>
          </div>
          <div {...stylex.props(guidesStyles.modalActionRow)}>
            {actionNotice && (
              <span {...stylex.props(uiStyles.badge, uiStyles.badgeMuted)} className="hidden sm:inline-flex">
                {actionNotice}
              </span>
            )}
            {guideDetail && (
              <button
                type="button"
                {...stylex.props(uiStyles.chip, guideDetail.voted && uiStyles.chipActive)}
                onClick={handleVote}
                disabled={voteGuide.isPending}
              >
                ♥ {guideDetail.votes}
              </button>
            )}
            {guideDetail && (
              <button
                type="button"
                {...stylex.props(uiStyles.chip)}
                onClick={handleDownload}
              >
                Скачать
              </button>
            )}
            {guideDetail && (
              <button
                type="button"
                {...stylex.props(uiStyles.chip)}
                onClick={handleShare}
              >
                Поделиться
              </button>
            )}
            {guideDetail && (
              <button
                type="button"
                {...stylex.props(uiStyles.chip)}
                onClick={handleTranslate}
              >
                Перевести
              </button>
            )}
            {guideDetail && canEdit && (
              <button
                type="button"
                {...stylex.props(uiStyles.chip)}
                onClick={() => {
                  setActionNotice(null);
                  setEditOpen(true);
                }}
              >
                Редактировать
              </button>
            )}
            {canModerate && (
              <button
                type="button"
                {...stylex.props(uiStyles.chip, uiStyles.badgeDanger)}
                onClick={handleDelete}
                disabled={deleteGuide.isPending}
              >
                Удалить
              </button>
            )}
            <button
              ref={closeButtonRef}
              type="button"
              {...stylex.props(uiStyles.iconButton)}
              onClick={handleClose}
            >
              <WuxiaIcon name="x" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Контент */}
      <div ref={contentRef} {...stylex.props(guidesStyles.modalContentScroll)}>
        <div {...stylex.props(guidesStyles.modalContentWrap)}>
          {isLoading && (
            <div className="loading-inline" aria-live="polite">
              <div className="loading-inline-card">
                <div className="loading-line loading-line-title" />
                <div className="mt-4 space-y-3">
                  <div className="loading-line loading-line-body" />
                  <div className="loading-line loading-line-body loading-line-body-short" />
                  <div className="loading-block" />
                </div>
              </div>
              <div className="loading-inline-card">
                <div className="loading-line loading-line-short" />
                <div className="mt-4 space-y-3">
                  <div className="loading-line loading-line-body" />
                  <div className="loading-line loading-line-body" />
                  <div className="loading-line loading-line-body loading-line-body-short" />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="text-red-400">
              {error instanceof Error ? error.message : 'Ошибка загрузки'}
            </div>
          )}

          {guideDetail && (
            <>
              <div className="grid gap-8 xl:grid-cols-[260px_minmax(0,1fr)]">
                {outline.length > 0 && (
                  <aside {...stylex.props(guidesStyles.outlineAside)}>
                    <div {...stylex.props(guidesStyles.outlineTitle)}>
                      <WuxiaIcon name="list" className="w-4 h-4 text-[#8fb9cc]" />
                      Навигация
                    </div>
                    <div {...stylex.props(guidesStyles.outlineList)}>
                      {outline.map((heading) => (
                        <button
                          key={heading.id}
                          type="button"
                          {...stylex.props(guidesStyles.outlineLink)}
                          data-level={heading.level}
                          onClick={() => handleScrollToHeading(heading.id)}
                          title={heading.text}
                        >
                          <span {...stylex.props(guidesStyles.outlineDot)} />
                          <span>{heading.text}</span>
                        </button>
                      ))}
                    </div>
                  </aside>
                )}

                <div className="section-stack-md">
                  <MarkdownRenderer
                    content={guideDetail.guide.content}
                    guidesIndex={guides}
                    onGuideLinkClick={onGuideSelect}
                    onHeadingLinkClick={handleScrollToHeading}
                  />

                  {backlinks.length > 0 && (
                    <div className="rounded-3xl border border-[#1f3344] bg-[#0b141d]/82 p-5 shadow-[0_18px_34px_rgba(4,8,12,0.35)]">
                      <div className="flex items-center gap-2 text-sm font-medium text-[#dceaf4] mb-4">
                        <WuxiaIcon name="link" className="w-4 h-4 text-[#8fb9cc]" />
                        Упоминается в гайдах
                      </div>
                      <div className="grid gap-3 md:grid-cols-2">
                        {backlinks.map((guide) => (
                          <button
                            key={guide.id}
                            type="button"
                            {...stylex.props(guidesStyles.backlinkCard)}
                            onClick={() => onGuideSelect?.(guide.id)}
                          >
                            <span {...stylex.props(guidesStyles.backlinkCategory)}>{guide.category}</span>
                            <span {...stylex.props(guidesStyles.backlinkTitle)}>{guide.title}</span>
                            <span {...stylex.props(guidesStyles.backlinkMeta)}>by {guide.author}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#1a2a38]">
                <GuideComments
                  guideId={guideId}
                  comments={guideDetail.comments}
                  canModerate={canModerate}
                  userRole={userRole}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {editOpen && guideDetail && (
        <GuideEditor
          mode="edit"
          guideId={guideId}
          initialValues={{
            title: guideDetail.guide.title,
            content: guideDetail.guide.content,
            category: guideDetail.guide.category as GuideCategory,
            author: guideDetail.guide.author,
          }}
          onClose={() => setEditOpen(false)}
          onSuccess={() => {
            setEditOpen(false);
            setActionNotice('Сохранено');
          }}
        />
      )}
    </div>
  );

  return createPortal(modalContent, document.body);
}
