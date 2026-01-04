'use client';

import { useEffect, useState } from 'react';
import { formatDate } from '@/lib/utils';
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

  useEffect(() => {
    document.documentElement.style.setProperty('--tilt-x', '0deg');
    document.documentElement.style.setProperty('--tilt-y', '0deg');
  }, []);

  const handleVote = () => {
    voteGuide.mutate({ id: guideId, voterKey });
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-start justify-center px-4 pt-24 pb-10 overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{ perspective: 'none', transform: 'none' }}
    >
      <div className="w-full max-w-3xl bg-[#0d1419] border border-[#2a3f4f]/60 rounded-2xl shadow-2xl">
        {/* Шапка */}
        <div className="sticky top-0 z-10 bg-[#0d1419]/95 backdrop-blur-sm border-b border-[#2a3f4f]/40 p-5 rounded-t-2xl">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-[#1a2a38] text-[#8fb9cc] rounded-full text-sm">
                  {guideDetail?.guide.category || '...'}
                </span>
                {guideDetail && (
                  <span className="text-sm text-gray-500">
                    {formatDate(guideDetail.guide.updatedAt)}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-[#e6eff5] break-words">
                {guideDetail?.guide.title || 'Загрузка...'}
              </h3>
              {guideDetail && (
                <div className="text-sm text-gray-500 mt-1">
                  {guideDetail.guide.author}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {guideDetail && (
                <button
                  type="button"
                  className={`p-2 rounded-lg transition-colors ${guideDetail.voted ? 'bg-[#2a4a5a] text-[#8fb9cc]' : 'bg-[#1a2a38] text-gray-400 hover:text-[#8fb9cc]'}`}
                  onClick={handleVote}
                  disabled={voteGuide.isPending}
                  title="Нравится"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <WuxiaIcon name="seal" className="w-4 h-4" />
                    <span className="text-sm">{guideDetail.votes}</span>
                  </span>
                </button>
              )}
              <button
                type="button"
                className="p-2 rounded-lg bg-[#1a2a38] text-gray-400 hover:text-white transition-colors"
                onClick={onClose}
                title="Закрыть"
              >
                <WuxiaIcon name="x" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Контент */}
        <div className="p-6">
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
              <div
                className="dc-md"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(guideDetail.guide.content) }}
              />

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
  );
}
