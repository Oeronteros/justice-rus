'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { createGuideSchema, guideCategories, type CreateGuideDto } from '@/lib/schemas/guide';
import { markdownToHtml } from '@/lib/markdown';
import WuxiaIcon from '@/components/WuxiaIcons';

interface GuideFormProps {
  onSubmit: (data: CreateGuideDto) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
  defaultAuthor?: string;
}

export function GuideForm({ onSubmit, onCancel, isSubmitting = false, defaultAuthor = '' }: GuideFormProps) {
  const [tab, setTab] = useState<'write' | 'preview'>('write');
  const editorRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<CreateGuideDto>({
    resolver: zodResolver(createGuideSchema),
    defaultValues: {
      title: '',
      content: '',
      category: 'general',
      author: defaultAuthor,
    },
  });

  const content = watch('content');
  const { ref: contentRef, ...contentRegister } = register('content');

  const handleFormSubmit = async (data: CreateGuideDto) => {
    await onSubmit(data);
    reset();
  };

  const applyWrap = (before: string, after: string = before) => {
    const textarea = editorRef.current;
    if (!textarea) return;
    textarea.focus();

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const value = textarea.value;
    const selected = value.slice(start, end);
    const next = value.slice(0, start) + before + selected + after + value.slice(end);
    setValue('content', next);

    requestAnimationFrame(() => {
      const cursorStart = start + before.length;
      const cursorEnd = start + before.length + selected.length;
      textarea.setSelectionRange(cursorStart, cursorEnd);
    });
  };

  const applyLinePrefix = (prefix: string) => {
    const textarea = editorRef.current;
    if (!textarea) return;
    textarea.focus();

    const start = textarea.selectionStart ?? 0;
    const value = textarea.value;
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const next = value.slice(0, lineStart) + prefix + value.slice(lineStart);
    setValue('content', next);

    requestAnimationFrame(() => {
      const cursor = start + prefix.length;
      textarea.setSelectionRange(cursor, cursor);
    });
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Размер изображения не должен превышать 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      const textarea = editorRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart ?? 0;
      const value = textarea.value;
      const imageMarkdown = `\n![Изображение](${base64})\n`;
      const next = value.slice(0, start) + imageMarkdown + value.slice(start);
      setValue('content', next);
    };
    reader.readAsDataURL(file);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const insertImageUrl = () => {
    const url = prompt('Введите URL изображения:');
    if (!url) return;

    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart ?? 0;
    const value = textarea.value;
    const imageMarkdown = `\n![Изображение](${url})\n`;
    const next = value.slice(0, start) + imageMarkdown + value.slice(start);
    setValue('content', next);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <input
            {...register('author')}
            placeholder="Автор (ник)"
            className="input-field w-full"
          />
          {errors.author && (
            <span className="text-red-400 text-sm mt-1">{errors.author.message}</span>
          )}
        </div>
        <div className="md:col-span-2">
          <input
            {...register('title')}
            placeholder="Название гайда"
            className="input-field w-full"
          />
          {errors.title && (
            <span className="text-red-400 text-sm mt-1">{errors.title.message}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <select {...register('category')} className="select-field">
          {guideCategories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <div className="inline-flex rounded-2xl p-1 bg-[#0b141d]/70 border border-[#223140]/70">
          <button
            type="button"
            onClick={() => setTab('write')}
            className={`px-3 py-2 text-sm rounded-2xl transition-colors ${
              tab === 'write' ? 'bg-[#183244]/80 text-[#e6eff5]' : 'text-gray-400 hover:text-[#bcd6e5]'
            }`}
          >
            Писать
          </button>
          <button
            type="button"
            onClick={() => setTab('preview')}
            className={`px-3 py-2 text-sm rounded-2xl transition-colors ${
              tab === 'preview' ? 'bg-[#183244]/80 text-[#e6eff5]' : 'text-gray-400 hover:text-[#bcd6e5]'
            }`}
          >
            Предпросмотр
          </button>
        </div>
      </div>

      {tab === 'write' ? (
        <>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <button type="button" className="dc-icon-btn p-2 rounded-xl" onClick={() => applyLinePrefix('# ')} title="H1">H1</button>
            <button type="button" className="dc-icon-btn p-2 rounded-xl" onClick={() => applyLinePrefix('## ')} title="H2">H2</button>
            <button type="button" className="dc-icon-btn p-2 rounded-xl" onClick={() => applyLinePrefix('### ')} title="H3">H3</button>
            <span className="w-px h-6 bg-gray-700"></span>
            <button type="button" className="dc-icon-btn p-2 rounded-xl" onClick={() => applyWrap('**')} title="Жирный"><strong>B</strong></button>
            <button type="button" className="dc-icon-btn p-2 rounded-xl" onClick={() => applyWrap('*')} title="Курсив"><em>I</em></button>
            <button type="button" className="dc-icon-btn p-2 rounded-xl" onClick={() => applyWrap('~~')} title="Зачеркнутый"><s>S</s></button>
            <span className="w-px h-6 bg-gray-700"></span>
            <button type="button" className="dc-icon-btn p-2 rounded-xl" onClick={() => applyLinePrefix('- ')} title="Список">
              <WuxiaIcon name="list" className="w-4 h-4" />
            </button>
            <button type="button" className="dc-icon-btn p-2 rounded-xl" onClick={() => applyLinePrefix('1. ')} title="Нумерованный">1.</button>
            <button type="button" className="dc-icon-btn p-2 rounded-xl" onClick={() => applyLinePrefix('> ')} title="Цитата">
              <WuxiaIcon name="quote" className="w-4 h-4" />
            </button>
            <span className="w-px h-6 bg-gray-700"></span>
            <button type="button" className="dc-icon-btn p-2 rounded-xl" onClick={() => applyWrap('`')} title="Код">
              <span className="font-mono text-xs">{'<>'}</span>
            </button>
            <button type="button" className="dc-icon-btn p-2 rounded-xl" onClick={() => applyWrap('```\n', '\n```')} title="Блок кода">
              <span className="font-mono text-xs">{'{}'}</span>
            </button>
            <span className="w-px h-6 bg-gray-700"></span>
            <button type="button" className="dc-icon-btn p-2 rounded-xl" onClick={() => applyWrap('[текст](', ')')} title="Ссылка">
              <WuxiaIcon name="link" className="w-4 h-4" />
            </button>
            <button type="button" className="dc-icon-btn p-2 rounded-xl" onClick={insertImageUrl} title="URL изображения">
              <WuxiaIcon name="image" className="w-4 h-4" />
            </button>
            <button type="button" className="dc-icon-btn dc-icon-btn-accent p-2 rounded-xl" onClick={handleImageUpload} title="Загрузить">
              <WuxiaIcon name="upload" className="w-4 h-4" />
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <textarea
            {...contentRegister}
            ref={(e) => {
              contentRef(e);
              editorRef.current = e;
            }}
            className="input-field min-h-[320px] font-mono text-sm leading-relaxed w-full"
            placeholder="Пиши здесь... Используй кнопки выше для форматирования."
            maxLength={500000}
          />
          {errors.content && (
            <span className="text-red-400 text-sm mt-1 block">{errors.content.message}</span>
          )}
        </>
      ) : (
        <div
          className="card p-6 max-h-[420px] overflow-auto dc-md"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(content || '') }}
        />
      )}

      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
        <button type="button" className="btn-secondary px-5 py-3" onClick={onCancel} disabled={isSubmitting}>
          Отмена
        </button>
        <button type="submit" className="btn-primary px-5 py-3" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="inline-flex items-center justify-center">
              <WuxiaIcon name="spinner" className="w-4 h-4 mr-3 animate-spin" />
              Сохраняем...
            </span>
          ) : (
            <span className="inline-flex items-center justify-center">
              <WuxiaIcon name="seal" className="w-4 h-4 mr-3" />
              Опубликовать
            </span>
          )}
        </button>
      </div>
    </form>
  );
}
