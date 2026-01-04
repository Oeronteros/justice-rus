'use client';

import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { markdownToHtml } from '@/lib/markdown';
import { useGuide, useVoteGuide } from '@/lib/hooks/useGuides';
import { GuideComments } from './GuideComments';

interface GuideModalProps {
  guideId: string;
  onClose: () => void;
  canModerate?: boolean;
  userRole?: string;
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

function getStoredAuthor(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('dc_guide_author') || '';
}

export function GuideModal({ guideId, onClose, canModerate = false, userRole }: GuideModalProps) {
  const [voterKey] = useState(getVoterKey);
  const [defaultAuthor, setDefaultAuthor] = useState('');
  const [mounted, setMounted] = useState(false);
  
  const { data: guideDetail, isLoading, error } = useGuide(guideId, voterKey);
  const voteGuide = useVoteGuide();

  useEffect(() => {
    setMounted(true);
    setDefaultAuthor(getStoredAuthor());
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

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

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
              <div className="dc-md">
                <div dangerouslySetInnerHTML={{ __html: markdownToHtml(guideDetail.guide.content) }} />
              </div>

              <div className="mt-8 pt-6 border-t border-[#1a2a38]">
                <GuideComments
                  guideId={guideId}
                  comments={guideDetail.comments}
                  defaultAuthor={defaultAuthor}
                  canModerate={canModerate}
                  userRole={userRole}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
