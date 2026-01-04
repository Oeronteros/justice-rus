'use client';

import { useEffect, useState } from 'react';
import { markdownToHtml } from '@/lib/markdown';
import { useGuide, useVoteGuide } from '@/lib/hooks/useGuides';
import { GuideComments } from './GuideComments';
import WuxiaIcon from '@/components/WuxiaIcons';

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
  
  const { data: guideDetail, isLoading, error } = useGuide(guideId, voterKey);
  const voteGuide = useVoteGuide();

  useEffect(() => {
    setDefaultAuthor(getStoredAuthor());
  }, []);

  // Блокируем скролл body при открытии
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleVote = () => {
    voteGuide.mutate({ id: guideId, voterKey });
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/85"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Контейнер с фиксированной шапкой */}
      <div className="fixed inset-0 flex flex-col">
        {/* Шапка - фиксированная */}
        <div className="flex-shrink-0 bg-[#0a0f14] border-b border-[#2a3f4f]/50 px-4 py-3 mt-16">
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold text-[#e6eff5] truncate">
                {guideDetail?.guide.title || 'Загрузка...'}
              </h3>
              <div className="flex items-center gap-3 text-sm text-gray-500 mt-0.5">
                {guideDetail && (
                  <>
                    <span>{guideDetail.guide.author}</span>
                    <span>•</span>
                    <span>{guideDetail.guide.category}</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {guideDetail && (
                <button
                  type="button"
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${guideDetail.voted ? 'bg-[#2a4a5a] text-[#8fb9cc]' : 'bg-[#1a2a38] text-gray-400 hover:text-[#8fb9cc]'}`}
                  onClick={handleVote}
                  disabled={voteGuide.isPending}
                >
                  ♥ {guideDetail.votes}
                </button>
              )}
              <button
                type="button"
                className="p-2 rounded-lg bg-[#1a2a38] text-gray-400 hover:text-white transition-colors"
                onClick={onClose}
              >
                <WuxiaIcon name="x" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Контент - скроллится */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-6">
            {isLoading && (
              <div className="space-y-3">
                <div className="h-5 bg-gray-800 rounded w-2/3 animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded w-5/6 animate-pulse"></div>
              </div>
            )}

            {error && (
              <div className="text-red-400 text-sm p-4 bg-red-900/20 rounded-xl border border-red-800/40">
                {error instanceof Error ? error.message : 'Не удалось загрузить гайд'}
              </div>
            )}

            {guideDetail && (
              <>
                <div className="dc-md">
                  <div dangerouslySetInnerHTML={{ __html: markdownToHtml(guideDetail.guide.content) }} />
                </div>

                <div className="mt-8 pt-6 border-t border-[#2a3f4f]/40">
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
    </div>
  );
}
