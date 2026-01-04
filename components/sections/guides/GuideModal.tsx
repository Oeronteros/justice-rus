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
      className="fixed inset-0 z-[9999] bg-black/80 flex flex-col"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Шапка модалки - компактная */}
      <div className="flex-shrink-0 bg-[#0a0e12] border-b border-[#1a2a38] px-4 py-2">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-medium text-white truncate">
              {guideDetail?.guide.title || 'Загрузка...'}
            </h3>
            <div className="text-xs text-gray-500">
              {guideDetail && `${guideDetail.guide.author} • ${guideDetail.guide.category}`}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {guideDetail && (
              <button
                type="button"
                className={`text-xs px-2 py-1 rounded ${guideDetail.voted ? 'text-[#8fb9cc]' : 'text-gray-500'}`}
                onClick={handleVote}
                disabled={voteGuide.isPending}
              >
                ♥ {guideDetail.votes}
              </button>
            )}
            <button
              type="button"
              className="text-gray-500 hover:text-white p-1"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      {/* Контент - занимает всё оставшееся место */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-4">
          {isLoading && (
            <div className="text-gray-500 text-sm">Загрузка...</div>
          )}

          {error && (
            <div className="text-red-400 text-sm">
              {error instanceof Error ? error.message : 'Ошибка'}
            </div>
          )}

          {guideDetail && (
            <>
              <div className="dc-md text-sm">
                <div dangerouslySetInnerHTML={{ __html: markdownToHtml(guideDetail.guide.content) }} />
              </div>

              <div className="mt-6 pt-4 border-t border-[#1a2a38]">
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
