'use client';

import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCommentSchema, type CreateCommentDto } from '@/lib/schemas/guide';
import WuxiaIcon from '@/components/WuxiaIcons';
import { useTranslation } from '@/lib/i18n/context';

interface CommentFormProps {
  onSubmit: (data: CreateCommentDto) => Promise<void>;
  isSubmitting?: boolean;
}

export function CommentForm({ onSubmit, isSubmitting = false }: CommentFormProps) {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCommentDto>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      comment: '',
    },
  });

  const handleFormSubmit = async (data: CreateCommentDto) => {
    await onSubmit(data);
    reset({ comment: '' });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(handleFormSubmit)} className="card section-card p-5 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="text-sm text-gray-400 flex items-center">{t.guides.yourNick}</div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary py-3"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center justify-center">
              <WuxiaIcon name="spinner" className="spinner-icon w-4 h-4 mr-3" />
              {t.guides.sending}
            </span>
          ) : (
            <span className="inline-flex items-center justify-center">
              <WuxiaIcon name="plus" className="w-4 h-4 mr-3" />
              {t.guides.addComment}
            </span>
          )}
        </button>
      </div>

      <textarea
        {...register('comment')}
        placeholder={t.guides.yourComment}
        className="input-field min-h-[120px] mt-4 w-full"
        maxLength={3000}
        enterKeyHint="send"
        onKeyDown={(event) => {
          if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
            event.preventDefault();
            formRef.current?.requestSubmit();
          }
        }}
      />
      {errors.comment && (
        <span className="text-red-400 text-sm mt-1 block">{errors.comment.message}</span>
      )}
      <div className="mt-3 text-xs text-[#8ea6b8]">`Ctrl+Enter` / `Cmd+Enter` — отправить быстрее.</div>
    </form>
  );
}
