'use client';

import { formatDate } from '@/lib/utils';
import { CommentForm } from '@/components/forms/CommentForm';
import { useAddComment } from '@/lib/hooks/useGuides';
import WuxiaIcon from '@/components/WuxiaIcons';
import type { GuideComment, CreateCommentDto } from '@/lib/schemas/guide';

interface GuideCommentsProps {
  guideId: string;
  comments: GuideComment[];
  defaultAuthor?: string;
  canModerate?: boolean;
  userRole?: string;
}

export function GuideComments({
  guideId,
  comments,
  defaultAuthor = '',
  canModerate = false,
  userRole,
}: GuideCommentsProps) {
  const addComment = useAddComment();

  const handleSubmit = async (data: CreateCommentDto) => {
    if (typeof window !== 'undefined' && data.author) {
      localStorage.setItem('dc_guide_author', data.author.trim());
    }
    await addComment.mutateAsync({ id: guideId, data });
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold text-[#e6eff5] inline-flex items-center gap-2">
          <WuxiaIcon name="comment" className="w-5 h-5 text-[#8fb9cc]" />
          Комментарии
        </h4>
        <span className="text-sm text-gray-400">{comments.length}</span>
      </div>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-gray-400 text-sm">
            Пока тишина. Оставь первый комментарий.
          </div>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="card p-5">
              <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                <span className="inline-flex items-center gap-2">
                  <WuxiaIcon name="user" className="w-4 h-4" />
                  {c.author}
                </span>
                <span className="inline-flex items-center gap-2">
                  <WuxiaIcon name="calendar" className="w-4 h-4" />
                  {formatDate(c.createdAt)}
                </span>
              </div>
              <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                {c.comment}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6">
        <CommentForm
          onSubmit={handleSubmit}
          isSubmitting={addComment.isPending}
          defaultAuthor={defaultAuthor}
        />
        
        {canModerate && userRole && (
          <div className="mt-4 text-xs text-gray-500">
            Роль: <span className="text-gray-300">{userRole}</span> (можно будет добавить модерацию/редактирование).
          </div>
        )}
      </div>
    </div>
  );
}
