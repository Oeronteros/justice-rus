'use client';

import { formatDate } from '@/lib/utils';
import { CommentForm } from '@/components/forms/CommentForm';
import { useAddComment } from '@/lib/guides/hooks';
import WuxiaIcon from '@/components/WuxiaIcons';
import type { GuideComment, CreateCommentDto } from '@/lib/schemas/guide';
import * as stylex from '@stylexjs/stylex';
import { uiStyles } from '@/components/shared/Ui.stylex';
import { guidesStyles } from './Guides.stylex';

interface GuideCommentsProps {
  guideId: string;
  comments: GuideComment[];
  canModerate?: boolean;
  userRole?: string;
}

export function GuideComments({
  guideId,
  comments,
  canModerate = false,
  userRole,
}: GuideCommentsProps) {
  const addComment = useAddComment();

  const handleSubmit = async (data: CreateCommentDto) => {
    await addComment.mutateAsync({ id: guideId, data });
  };

  return (
    <div {...stylex.props(guidesStyles.commentsRoot)}>
      <div {...stylex.props(guidesStyles.commentsHeader)}>
        <h4 {...stylex.props(guidesStyles.commentsTitle)}>
          <WuxiaIcon name="comment" {...stylex.props(uiStyles.iconMd, uiStyles.iconAccent)} />
          Комментарии
        </h4>
        <span {...stylex.props(uiStyles.badge, uiStyles.badgeMuted)}>{comments.length}</span>
      </div>

      <div {...stylex.props(guidesStyles.commentsList)}>
        {comments.length === 0 ? (
          <div {...stylex.props(uiStyles.card, uiStyles.sectionCard, guidesStyles.commentCard)}>
            Пока тишина. Оставь первый комментарий.
          </div>
        ) : (
          comments.map((c) => (
            <div key={c.id} {...stylex.props(uiStyles.card, uiStyles.sectionCard, guidesStyles.commentCard)}>
              <div {...stylex.props(guidesStyles.commentTop)}>
                <span {...stylex.props(guidesStyles.commentAuthor)}>
                  <WuxiaIcon name="user" {...stylex.props(uiStyles.iconSm, uiStyles.iconMuted)} />
                  {c.author}
                </span>
                <span {...stylex.props(guidesStyles.commentAuthor)}>
                  <WuxiaIcon name="calendar" {...stylex.props(uiStyles.iconSm, uiStyles.iconMuted)} />
                  {formatDate(c.createdAt)}
                </span>
              </div>
              <div {...stylex.props(guidesStyles.commentBody)}>
                {c.comment}
              </div>
            </div>
          ))
        )}
      </div>

      <div>
        <CommentForm
          onSubmit={handleSubmit}
          isSubmitting={addComment.isPending}
        />
        
        {canModerate && userRole && (
          <div {...stylex.props(guidesStyles.moderatorHint)}>
            Роль: <span style={{ color: '#d1d5db' }}>{userRole}</span> (можно будет добавить модерацию/редактирование).
          </div>
        )}
      </div>
    </div>
  );
}
