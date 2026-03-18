'use client';

import { useEffect, useState } from 'react';
import { GuideForm } from '@/components/forms/GuideForm';
import { useCreateGuide, useUpdateGuide } from '@/lib/guides/hooks';
import WuxiaIcon from '@/components/WuxiaIcons';
import type { CreateGuideDto } from '@/lib/schemas/guide';
import * as stylex from '@stylexjs/stylex';
import { uiStyles } from '@/components/shared/Ui.stylex';
import { guidesStyles } from './Guides.stylex';

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
      {...stylex.props(uiStyles.modalBackdrop, guidesStyles.editorBackdrop)}
    >
      <div {...stylex.props(uiStyles.modalShell, guidesStyles.editorModalShell, isFocusMode && guidesStyles.editorFocusCard)}>
        <div {...stylex.props(uiStyles.modalHeader)}>
          <div>
            <h3 {...stylex.props(uiStyles.modalTitle)}>
              {isEdit ? 'Редактировать гайд' : 'Новый гайд'}
            </h3>
            <p {...stylex.props(uiStyles.modalSubtitle)}>
              {isEdit
                ? 'Обнови текст, категория сохранится. Автор остаётся как в публикации.'
                : 'Пиши как в Obsidian: Milkdown editor, живой reader и импорт .md с вложениями.'}
            </p>
          </div>
          <div {...stylex.props(guidesStyles.editorHeaderActions)}>
            <button
              type="button"
              {...stylex.props(uiStyles.buttonBase, uiStyles.buttonSecondary)}
              onClick={() => setIsFocusMode((value) => !value)}
            >
              <WuxiaIcon name="eye" {...stylex.props(uiStyles.iconSm, uiStyles.inlineIcon)} />
              {isFocusMode ? 'Обычный режим' : 'Фокус-режим'}
            </button>
            <button
              type="button"
              {...stylex.props(uiStyles.iconButton)}
              onClick={onClose}
            >
              <WuxiaIcon name="x" {...stylex.props(uiStyles.iconMd)} />
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
          <div {...stylex.props(uiStyles.notice, uiStyles.noticeError)}>
            <WuxiaIcon name="alertTriangle" {...stylex.props(uiStyles.iconSm, uiStyles.inlineIcon)} />
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
