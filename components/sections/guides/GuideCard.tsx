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
      className="card section-card ds-section-panel p-4 sm:p-5 text-left hover:transform hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <span className="ds-kicker">
          <WuxiaIcon name="tag" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
          {guide.category}
        </span>
        <span className="text-xs text-gray-400">{formatDate(guide.updatedAt)}</span>
      </div>

      <h3 className="text-lg font-bold font-orbitron mb-3 text-[#e6eff5] leading-snug min-h-[3.1rem] sm:min-h-[3.5rem] tracking-[0.01em]">
        {guide.title}
      </h3>

      <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-700/50 text-sm text-gray-400">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#0f1720]/70 px-3 py-1 text-xs text-[#c5d9e5]">
          <WuxiaIcon name="user" className="w-4 h-4" />
          {guide.author}
        </span>

        <span className="inline-flex items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#0f1720]/70 px-2.5 py-1">
            <WuxiaIcon name="seal" className="w-4 h-4 text-[#8fb9cc]" />
            {guide.votes}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#0f1720]/70 px-2.5 py-1">
            <WuxiaIcon name="comment" className="w-4 h-4" />
            {guide.commentsCount}
          </span>
        </span>
      </div>
    </button>
  );
}
