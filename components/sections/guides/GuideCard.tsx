'use client';

import { formatDate } from '@/lib/utils';
import WuxiaIcon from '@/components/WuxiaIcons';
import type { GuideSummary } from '@/lib/schemas/guide';

interface GuideCardProps {
  guide: GuideSummary;
  onClick: () => void;
}

export function GuideCard({ guide, onClick }: GuideCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="card p-6 text-left hover:transform hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="px-3 py-1 bg-gradient-to-r from-[#142636]/60 to-[#1d3b52]/60 text-[#8fb9cc] rounded-full text-sm font-medium">
          <WuxiaIcon name="tag" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
          {guide.category}
        </span>
        <span className="text-sm text-gray-400">{formatDate(guide.updatedAt)}</span>
      </div>

      <h3 className="text-xl font-bold font-orbitron mb-3 text-[#e6eff5] leading-snug">
        {guide.title}
      </h3>

      <div className="flex items-center justify-between pt-4 border-t border-gray-700/50 text-sm text-gray-400">
        <span className="inline-flex items-center gap-2">
          <WuxiaIcon name="user" className="w-4 h-4" />
          {guide.author}
        </span>

        <span className="inline-flex items-center gap-3">
          <span className="inline-flex items-center gap-1">
            <WuxiaIcon name="seal" className="w-4 h-4 text-[#8fb9cc]" />
            {guide.votes}
          </span>
          <span className="inline-flex items-center gap-1">
            <WuxiaIcon name="comment" className="w-4 h-4" />
            {guide.commentsCount}
          </span>
        </span>
      </div>
    </button>
  );
}
