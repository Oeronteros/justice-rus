'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCommentSchema, type CreateCommentDto } from '@/lib/schemas/guide';
import WuxiaIcon from '@/components/WuxiaIcons';

interface CommentFormProps {
  onSubmit: (data: CreateCommentDto) => Promise<void>;
  isSubmitting?: boolean;
  defaultAuthor?: string;
}

export function CommentForm({ onSubmit, isSubmitting = false, defaultAuthor = '' }: CommentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCommentDto>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      author: defaultAuthor,
      comment: '',
    },
  });

  const handleFormSubmit = async (data: CreateCommentDto) => {
    await onSubmit(data);
    reset({ author: data.author, comment: '' });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="card p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input
            {...register('author')}
            placeholder="Твой ник"
            className="input-field w-full"
          />
          {errors.author && (
            <span className="text-red-400 text-sm mt-1">{errors.author.message}</span>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary py-3"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center justify-center">
              <WuxiaIcon name="spinner" className="w-4 h-4 mr-3 animate-spin" />
              Отправляем...
            </span>
          ) : (
            <span className="inline-flex items-center justify-center">
              <WuxiaIcon name="plus" className="w-4 h-4 mr-3" />
              Комментировать
            </span>
          )}
        </button>
      </div>

      <textarea
        {...register('comment')}
        placeholder="Твой комментарий..."
        className="input-field min-h-[120px] mt-4 w-full"
        maxLength={3000}
      />
      {errors.comment && (
        <span className="text-red-400 text-sm mt-1 block">{errors.comment.message}</span>
      )}
    </form>
  );
}
