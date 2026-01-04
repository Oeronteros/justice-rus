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
      className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-md flex items-center justify-center px-4 py-10"
      style={{ perspective: 'none', transform: 'none' }}
    >
      <div className="card w-full max-w-4xl p-6 md:p-8 relative max-h-[85vh] overflow-auto">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-gradient-to-r from-[#142636]/60 to-[#1d3b52]/60 text-[#8fb9cc] rounded-full text-sm font-medium">
                <WuxiaIcon name="tag" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
                {guideDetail?.guide.category || '...'}
              </span>
              {guideDetail && (
                <span className="text-sm text-gray-400">
                  {formatDate(guideDetail.guide.updatedAt)}
                </span>
              )}
            </div>
            <h3 className="text-2xl font-bold font-orbitron text-[#e6eff5] break-words">
              {guideDetail?.guide.title || 'Загрузка...'}
            </h3>
            {guideDetail && (
              <div className="text-sm text-gray-400 mt-2 inline-flex items-center gap-2">
                <WuxiaIcon name="user" className="w-4 h-4" />
                {guideDetail.guide.author}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {guideDetail && (
              <button
                type="button"
                className={`dc-icon-btn p-2.5 rounded-xl ${guideDetail.voted ? 'dc-icon-btn-active' : ''}`}
                onClick={handleVote}
                disabled={voteGuide.isPending}
                title="Печать одобрения"
              >
                <span className="inline-flex items-center gap-2">
                  <WuxiaIcon name="seal" className="w-5 h-5" />
                  <span className="text-sm font-semibold">{guideDetail.votes}</span>
                </span>
              </button>
            )}
            <button
              type="button"
              className="dc-icon-btn p-2.5 rounded-xl"
              onClick={onClose}
              title="Закрыть"
            >
              <WuxiaIcon name="x" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="card p-6">
            <div className="h-5 bg-gray-800 rounded w-2/3 animate-pulse mb-3"></div>
            <div className="h-4 bg-gray-800 rounded w-full animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-800 rounded w-5/6 animate-pulse"></div>
          </div>
        )}

        {error && (
          <div className="text-[#bcd6e5] text-sm mt-2 p-4 bg-[#16202b]/65 rounded-xl border border-[#2f6e8d]/40">
            <WuxiaIcon name="alertTriangle" className="w-4 h-4 mr-2 inline-block align-text-bottom" />
            {error instanceof Error ? error.message : 'Не удалось загрузить гайд'}
          </div>
        )}

        {guideDetail && (
          <>
            <div
              className="card p-6 dc-md"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(guideDetail.guide.content) }}
            />

            <GuideComments
              guideId={guideId}
              comments={guideDetail.comments}
              defaultAuthor={defaultAuthor}
              canModerate={canModerate}
              userRole={userRole}
            />
          </>
        )}
      </div>
    </div>
  );
}
