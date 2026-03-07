'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { MarkdownRenderer } from '@/components/guides/MarkdownRenderer';
import { handleApiError } from '@/lib/api/client';
import { useDeleteGuide, useGuide, useGuides, useVoteGuide } from '@/lib/hooks/useGuides';
import { GuideComments } from './GuideComments';
import { GuideEditor } from './GuideEditor';

interface GuideModalProps {
  guideId: string;
  onClose: () => void;
  onGuideSelect?: (guideId: string) => void;
  canModerate?: boolean;
  userRole?: string;
  userId?: string;
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
  const [mounted, setMounted] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  
  const { data: guideDetail, isLoading, error } = useGuide(guideId, voterKey);
  const { data: guides = [] } = useGuides();
  const voteGuide = useVoteGuide();
  const deleteGuide = useDeleteGuide();

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const buildStableGuideUrl = useCallback(() => {
    if (typeof window === 'undefined') return `/`;
    const url = new URL(window.location.origin);
    url.pathname = '/';
    url.searchParams.set('guide', String(guideId));
    return url.toString();
  }, [guideId]);

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

  const handleShare = useCallback(async () => {
    if (!guideDetail) return;
    const url = buildStableGuideUrl();

    try {
      if (typeof navigator !== 'undefined' && 'share' in navigator && typeof (navigator as any).share === 'function') {
        await (navigator as any).share({
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
  }, [buildStableGuideUrl, copyText, guideDetail]);

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

  if (!mounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 bg-[#080c10] flex flex-col"
      style={{ zIndex: 99999 }}
    >
      {/* Шапка */}
      <div className="flex-shrink-0 bg-[#0a0e12] border-b border-[#1a2a38] px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-medium text-white truncate">
              {guideDetail?.guide.title || 'Загрузка...'}
            </h3>
            <div className="text-xs text-gray-500 mt-0.5">
              {guideDetail && `${guideDetail.guide.author} • ${guideDetail.guide.category}`}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {actionNotice && (
              <span className="text-[11px] uppercase tracking-[0.18em] text-[#6f8799] hidden sm:inline">
                {actionNotice}
              </span>
            )}
            {guideDetail && (
              <button
                type="button"
                className={`text-sm px-3 py-1 rounded ${guideDetail.voted ? 'bg-[#1a2a38] text-[#8fb9cc]' : 'text-gray-500 hover:text-[#8fb9cc]'}`}
                onClick={handleVote}
                disabled={voteGuide.isPending}
              >
                ♥ {guideDetail.votes}
              </button>
            )}
            {guideDetail && (
              <button
                type="button"
                className="text-sm px-3 py-1 rounded text-gray-500 hover:text-[#8fb9cc] hover:bg-[#1a2a38]"
                onClick={handleDownload}
              >
                Скачать
              </button>
            )}
            {guideDetail && (
              <button
                type="button"
                className="text-sm px-3 py-1 rounded text-gray-500 hover:text-[#8fb9cc] hover:bg-[#1a2a38]"
                onClick={handleShare}
              >
                Поделиться
              </button>
            )}
            {guideDetail && (
              <button
                type="button"
                className="text-sm px-3 py-1 rounded text-gray-500 hover:text-[#8fb9cc] hover:bg-[#1a2a38]"
                onClick={handleTranslate}
              >
                Перевести
              </button>
            )}
            {guideDetail && canEdit && (
              <button
                type="button"
                className="text-sm px-3 py-1 rounded text-gray-500 hover:text-[#8fb9cc] hover:bg-[#1a2a38]"
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
                className="text-sm px-3 py-1 rounded text-red-400 hover:text-red-300 hover:bg-[#1a2a38]"
                onClick={handleDelete}
                disabled={deleteGuide.isPending}
              >
                Удалить
              </button>
            )}
            <button
              type="button"
              className="text-gray-400 hover:text-white text-xl px-2 py-1 rounded hover:bg-[#1a2a38]"
              onClick={handleClose}
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      {/* Контент */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6">
          {isLoading && (
            <div className="text-gray-500">Загрузка гайда...</div>
          )}

          {error && (
            <div className="text-red-400">
              {error instanceof Error ? error.message : 'Ошибка загрузки'}
            </div>
          )}

          {guideDetail && (
            <>
              <MarkdownRenderer
                content={guideDetail.guide.content}
                guidesIndex={guides}
                onGuideLinkClick={onGuideSelect}
              />

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
            category: guideDetail.guide.category as any,
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
