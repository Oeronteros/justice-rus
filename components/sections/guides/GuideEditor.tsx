'use client';

import { useEffect, useState } from 'react';
import { GuideForm } from '@/components/forms/GuideForm';
import { useCreateGuide } from '@/lib/hooks/useGuides';
import WuxiaIcon from '@/components/WuxiaIcons';
import type { CreateGuideDto } from '@/lib/schemas/guide';

interface GuideEditorProps {
  onClose: () => void;
  onSuccess?: (guideId: string) => void;
}

function getStoredAuthor(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('dc_guide_author') || '';
}

export function GuideEditor({ onClose, onSuccess }: GuideEditorProps) {
  const [defaultAuthor, setDefaultAuthor] = useState('');
  const createGuide = useCreateGuide();

  useEffect(() => {
    setDefaultAuthor(getStoredAuthor());
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--tilt-x', '0deg');
    document.documentElement.style.setProperty('--tilt-y', '0deg');
  }, []);

  const handleSubmit = async (data: CreateGuideDto) => {
    if (typeof window !== 'undefined' && data.author) {
      localStorage.setItem('dc_guide_author', data.author.trim());
    }
    
    const result = await createGuide.mutateAsync(data);
    onClose();
    
    if (onSuccess && result?.id) {
      onSuccess(String(result.id));
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-md flex items-center justify-center px-4 py-10"
      style={{ perspective: 'none', transform: 'none' }}
    >
      <div className="card w-full max-w-4xl p-6 md:p-8 relative max-h-[85vh] overflow-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-bold font-orbitron text-[#e6eff5]">
              Новый гайд
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Пиши в Markdown. Предпросмотр покажет итог.
            </p>
          </div>
          <button
            type="button"
            className="dc-icon-btn p-2.5 rounded-xl self-start md:self-auto"
            onClick={onClose}
          >
            <WuxiaIcon name="x" className="w-5 h-5" />
          </button>
        </div>

        <GuideForm
          onSubmit={handleSubmit}
          onCancel={onClose}
          isSubmitting={createGuide.isPending}
          defaultAuthor={defaultAuthor}
        />

        {createGuide.error && (
          <div className="text-red-400 text-sm mt-4 p-4 bg-red-900/20 rounded-xl border border-red-900/40">
            <WuxiaIcon name="alertTriangle" className="w-4 h-4 mr-2 inline-block align-text-bottom" />
            {createGuide.error instanceof Error ? createGuide.error.message : 'Не удалось создать гайд'}
          </div>
        )}
      </div>
    </div>
  );
}
