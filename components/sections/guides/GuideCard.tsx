'use client';

import { formatDate } from '@/lib/utils';
import WuxiaIcon from '@/components/WuxiaIcons';
import type { GuideSummary } from '@/lib/schemas/guide';
import * as stylex from '@stylexjs/stylex';
import { uiStyles } from '@/components/shared/Ui.stylex';
import { guidesStyles } from './Guides.stylex';

interface GuideCardProps {
  guide: GuideSummary;
  onClick: () => void;
}

export function GuideCard({ guide, onClick }: GuideCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      {...stylex.props(uiStyles.card, uiStyles.sectionCard, guidesStyles.guideCard)}
    >
      <div {...stylex.props(guidesStyles.cardTop)}>
        <span {...stylex.props(uiStyles.badge, uiStyles.badgeMuted)}>
          <WuxiaIcon name="tag" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
          {guide.category}
        </span>
        <span style={{ fontSize: 12, color: 'rgba(156,163,175,0.95)' }}>{formatDate(guide.updatedAt)}</span>
      </div>

      <h3 {...stylex.props(guidesStyles.cardTitle)}>
        {guide.title}
      </h3>

      <div {...stylex.props(guidesStyles.cardMeta)}>
        <span {...stylex.props(guidesStyles.authorPill)}>
          <WuxiaIcon name="user" className="w-4 h-4" />
          {guide.author}
        </span>

        <span {...stylex.props(guidesStyles.statPills)}>
          <span {...stylex.props(guidesStyles.statPill)}>
            <WuxiaIcon name="seal" className="w-4 h-4 text-[#8fb9cc]" />
            {guide.votes}
          </span>
          <span {...stylex.props(guidesStyles.statPill)}>
            <WuxiaIcon name="comment" className="w-4 h-4" />
            {guide.commentsCount}
          </span>
        </span>
      </div>
    </button>
  );
}
