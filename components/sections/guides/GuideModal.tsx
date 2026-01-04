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
      className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-2xl max-h-[80vh] bg-[#0c1218] border border-[#2a3f4f]/60 rounded-xl shadow-2xl flex flex-col">
        {/* Шапка */}
        <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-[#2a3f4f]/40">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
              <span className="px-2 py-0.5 bg-[#1a2a38] text-[#8fb9cc] rounded">
                {guideDetail?.guide.category || '...'}
              </span>
              {guideDetail && <span>{guideDetail.guide.author}</span>}
            </div>
            <h3 className="text-base font-semibold text-[#e6eff5] truncate">
              {guideDetail?.guide.title || 'Загрузка...'}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {guideDetail && (
              <button
                type="button"
                className={`px-2 py-1 rounded text-xs transition-colors ${guideDetail.voted ? 'bg-[#2a4a5a] text-[#8fb9cc]' : 'text-gray-500 hover:text-[#8fb9cc]'}`}
                onClick={handleVote}
                disabled={voteGuide.isPending}
              >
                ♥ {guideDetail.votes}
              </button>
            )}
            <button
              type="button"
              className="p-1.5 rounded text-gray-500 hover:text-white transition-colors"
              onClick={onClose}
            >
              <WuxiaIcon name="x" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Контент */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {isLoading && (
            <div className="space-y-2">
              <div className="h-4 bg-gray-800 rounded w-2/3 animate-pulse"></div>
              <div className="h-3 bg-gray-800 rounded w-full animate-pulse"></div>
              <div className="h-3 bg-gray-800 rounded w-5/6 animate-pulse"></div>
            </div>
          )}

          {error && (
            <div className="text-red-400 text-sm">
              {error instanceof Error ? error.message : 'Ошибка загрузки'}
            </div>
          )}

          {guideDetail && (
            <>
              <div className="dc-md text-sm">
                <div dangerouslySetInnerHTML={{ __html: markdownToHtml(guideDetail.guide.content) }} />
              </div>

              <div className="mt-6 pt-4 border-t border-[#2a3f4f]/40">
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
