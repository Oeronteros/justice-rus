'use client';

import { useEffect, useState } from 'react';
import { GuideForm } from '@/components/forms/GuideForm';
import { useCreateGuide, useUpdateGuide } from '@/lib/guides/hooks';
import WuxiaIcon from '@/components/WuxiaIcons';
import type { CreateGuideDto } from '@/lib/schemas/guide';

interface GuideEditorProps {
  onClose: () => void;
  onSuccess?: (guideId: string) => void;
  mode?: 'create' | 'edit';
  guideId?: string;
  initialValues?: Partial<CreateGuideDto>;
}

export function GuideEditor({ onClose, onSuccess, mode = 'create', guideId, initialValues }: GuideEditorProps) {
  const createGuide = useCreateGuide();
  const updateGuide = useUpdateGuide();
  const isEdit = mode === 'edit';
  const [isFocusMode, setIsFocusMode] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty('--tilt-x', '0deg');
    document.documentElement.style.setProperty('--tilt-y', '0deg');
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const handleSubmit = async (data: CreateGuideDto) => {
    if (isEdit) {
      if (!guideId) {
        throw new Error('Missing guide id');
      }
      await updateGuide.mutateAsync({
        id: guideId,
        data: {
          title: data.title,
          content: data.content,
          category: data.category,
        },
      });
      onClose();
      onSuccess?.(String(guideId));
      return;
    }

    const result = await createGuide.mutateAsync(data);
    onClose();

    if (onSuccess && result?.id) {
      onSuccess(String(result.id));
    }
  };

  const isSubmitting = isEdit ? updateGuide.isPending : createGuide.isPending;
  const submitError = isEdit ? updateGuide.error : createGuide.error;

  return (
    <div
      className="fixed inset-0 z-[100001] bg-black/75 backdrop-blur-md flex items-center justify-center px-4 py-10"
      style={{ perspective: 'none', transform: 'none' }}
    >
      <div className={`card w-full relative overflow-auto ${isFocusMode ? 'guide-editor-focus-card p-4 md:p-6' : 'max-w-7xl p-6 md:p-8 max-h-[92vh]'}`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-bold font-orbitron text-[#e6eff5]">
              {isEdit ? 'Редактировать гайд' : 'Новый гайд'}
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              {isEdit
                ? 'Обнови текст, категория сохранится. Автор остаётся как в публикации.'
                : 'Пиши как в Obsidian: Milkdown editor, живой reader и импорт .md с вложениями.'}
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              className="btn-secondary px-4 py-2.5"
              onClick={() => setIsFocusMode((value) => !value)}
            >
              <WuxiaIcon name="eye" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
              {isFocusMode ? 'Обычный режим' : 'Фокус-режим'}
            </button>
            <button
              type="button"
              className="dc-icon-btn p-2.5 rounded-xl"
              onClick={onClose}
            >
              <WuxiaIcon name="x" className="w-5 h-5" />
            </button>
          </div>
        </div>

        <GuideForm
          onSubmit={handleSubmit}
          onCancel={onClose}
          isSubmitting={isSubmitting}
          initialValues={isEdit ? initialValues : undefined}
          disableAuthor={isEdit}
          submitLabel={isEdit ? 'Сохранить' : undefined}
          resetAfterSubmit={!isEdit}
          focusMode={isFocusMode}
        />

        {submitError && (
          <div className="text-red-400 text-sm mt-4 p-4 bg-red-900/20 rounded-xl border border-red-900/40">
            <WuxiaIcon name="alertTriangle" className="w-4 h-4 mr-2 inline-block align-text-bottom" />
            {submitError instanceof Error
              ? submitError.message
              : isEdit
                ? 'Не удалось обновить гайд'
                : 'Не удалось создать гайд'}
          </div>
        )}
      </div>
    </div>
  );
}
