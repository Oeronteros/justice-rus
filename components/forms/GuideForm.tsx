'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { MarkdownRenderer } from '@/components/guides/MarkdownRenderer';
import {
  MilkdownMarkdownEditor,
  type MilkdownMarkdownEditorHandle,
} from '@/components/guides/MilkdownMarkdownEditor';
import {
  buildGuideDraftFromMarkdownFile,
  isMarkdownFile,
} from '@/lib/guides/obsidian';
import {
  createGuideSchema,
  guideCategories,
  type CreateGuideDto,
} from '@/lib/schemas/guide';
import WuxiaIcon from '@/components/WuxiaIcons';

interface GuideFormProps {
  onSubmit: (data: CreateGuideDto) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
  initialValues?: Partial<CreateGuideDto>;
  disableAuthor?: boolean;
  submitLabel?: string;
  resetAfterSubmit?: boolean;
}

type EditorMode = 'write' | 'split' | 'preview';

const DEFAULT_VALUES: CreateGuideDto = {
  title: '',
  content: '',
  category: 'general',
  author: '',
};

const GUIDE_TEMPLATES = [
  {
    label: 'PvE Build',
    snippet: [
      '\n## Role in the squad',
      '- Main job:',
      '- When this build shines:',
      '- Weak spots:',
      '',
      '## Core setup',
      '| Slot | Choice | Why |',
      '| --- | --- | --- |',
      '| Weapon |  |  |',
      '| Gear set |  |  |',
      '| Trait |  |  |',
      '',
      '## Rotation',
      '1. Prep buffs.',
      '2. Open with control or armor break.',
      '3. Spend burst window.',
      '4. Reset and repeat.',
      '',
      '## Raid notes',
      '- Phase 1:',
      '- Phase 2:',
      '- Emergency buttons:',
    ].join('\n'),
  },
  {
    label: 'PvP Matchup',
    snippet: [
      '\n## Matchup plan',
      '> [!tip] Win condition',
      '> Force the enemy to spend mobility first, then commit burst.',
      '',
      '## Opener',
      '- Safe poke:',
      '- Main bait:',
      '- Burst confirm:',
      '',
      '## What to respect',
      '- Enemy iframe:',
      '- Dangerous CC chain:',
      '- When to disengage:',
    ].join('\n'),
  },
  {
    label: 'Raid Mechanics',
    snippet: [
      '\n## Boss timeline',
      '| Time | Mechanic | Team response |',
      '| --- | --- | --- |',
      '| 00:30 |  |  |',
      '| 01:10 |  |  |',
      '| 02:00 |  |  |',
      '',
      '## Assignments',
      '- Tank:',
      '- Support:',
      '- DPS 1:',
      '- DPS 2:',
      '',
      '> [!warning] Wipe trigger',
      '> If this mechanic is missed, immediately reset positions and save defensives.',
    ].join('\n'),
  },
  {
    label: 'Farm Route',
    snippet: [
      '\n## Route snapshot',
      '- Region:',
      '- Best time:',
      '- Required consumables:',
      '',
      '## Loop',
      '1. Start at waypoint A.',
      '2. Sweep elites clockwise.',
      '3. Skip low-value packs.',
      '4. Reset at vendor or camp.',
      '',
      '## Profit checklist',
      '- [ ] Inventory cleanup',
      '- [ ] Buff food active',
      '- [ ] Daily cap tracked',
    ].join('\n'),
  },
];

function joinClasses(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}

export function GuideForm({
  onSubmit,
  onCancel,
  isSubmitting = false,
  initialValues,
  disableAuthor = false,
  submitLabel,
  resetAfterSubmit = true,
}: GuideFormProps) {
  const [editorMode, setEditorMode] = useState<EditorMode>('split');
  const [notice, setNotice] = useState<string | null>(null);
  const editorRef = useRef<MilkdownMarkdownEditorHandle | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const markdownInputRef = useRef<HTMLInputElement | null>(null);

  const mergedDefaults = useMemo((): CreateGuideDto => {
    return {
      ...DEFAULT_VALUES,
      ...(initialValues || {}),
      title: initialValues?.title ?? DEFAULT_VALUES.title,
      content: initialValues?.content ?? DEFAULT_VALUES.content,
      category: (initialValues?.category ?? DEFAULT_VALUES.category) as CreateGuideDto['category'],
      author: initialValues?.author ?? DEFAULT_VALUES.author,
    };
  }, [initialValues?.author, initialValues?.category, initialValues?.content, initialValues?.title]);

  const hasInitialValues = Boolean(initialValues);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<CreateGuideDto>({
    resolver: zodResolver(createGuideSchema),
    defaultValues: mergedDefaults,
  });

  const content = watch('content') || '';

  useEffect(() => {
    register('content');
  }, [register]);

  useEffect(() => {
    if (!hasInitialValues) return;
    reset(mergedDefaults);
    editorRef.current?.setMarkdown(mergedDefaults.content || '');
    setNotice(null);
  }, [hasInitialValues, mergedDefaults, reset]);

  const handleEditorChange = (markdown: string) => {
    setValue('content', markdown, {
      shouldDirty: true,
      shouldValidate: Boolean(errors.content),
    });
  };

  const handleFormSubmit = async (data: CreateGuideDto) => {
    await onSubmit({
      ...data,
      title: data.title.trim(),
      author: data.author?.trim() || undefined,
      content: data.content.trim(),
    });
    if (resetAfterSubmit) {
      reset(DEFAULT_VALUES);
      editorRef.current?.setMarkdown('');
      setNotice(null);
    }
  };

  const insertMarkdown = (snippet: string, inline = false) => {
    editorRef.current?.insertMarkdown(snippet, inline);
  };

  const handleImageUpload = () => {
    imageInputRef.current?.click();
  };

  const handleImageFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setNotice('Choose an image file for inline embeds.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setNotice('Image is too large. Keep it under 5 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || '');
      insertMarkdown(`\n![${file.name.replace(/\.[a-z0-9]+$/i, '') || 'Image'}](${dataUrl})\n`);
      setNotice(`Embedded image: ${file.name}`);
    };
    reader.readAsDataURL(file);

    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const handleImageUrlInsert = () => {
    const url = window.prompt('Image URL');
    if (!url) return;
    insertMarkdown(`\n![Reference image](${url.trim()})\n`);
  };

  const handleMarkdownImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const markdownFile = files.find((file) => isMarkdownFile(file));
    if (!markdownFile) {
      setNotice('No markdown file found in the selected package.');
      return;
    }

    try {
      const draft = await buildGuideDraftFromMarkdownFile(markdownFile, files);
      setValue('title', draft.title, { shouldDirty: true });
      setValue('category', draft.category, { shouldDirty: true });
      setValue('author', draft.author || '', { shouldDirty: true });
      setValue('content', draft.content, { shouldDirty: true, shouldValidate: true });
      editorRef.current?.setMarkdown(draft.content);

      const assetCount = Math.max(0, files.length - 1);
      setNotice(
        assetCount > 0
          ? `Imported ${markdownFile.name} with ${assetCount} attachment${assetCount === 1 ? '' : 's'}.`
          : `Imported ${markdownFile.name}.`
      );
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Failed to import markdown draft.');
    } finally {
      if (markdownInputRef.current) {
        markdownInputRef.current.value = '';
      }
    }
  };

  const showEditor = editorMode !== 'preview';
  const showPreview = editorMode !== 'write';

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <input type="hidden" {...register('content')} />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_280px]">
        <div>
          <input
            {...register('title')}
            placeholder="Название гайда"
            className="input-field w-full text-lg"
          />
          {errors.title && (
            <span className="text-red-400 text-sm mt-1 block">{errors.title.message}</span>
          )}
        </div>

        <input
          {...register('author')}
          placeholder="Автор / никнейм"
          className={joinClasses('input-field w-full', disableAuthor && 'opacity-60 cursor-not-allowed')}
          disabled={disableAuthor}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div>
          <select {...register('category')} className="select-field w-full">
            {guideCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="text-red-400 text-sm mt-1 block">{errors.category.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="inline-flex rounded-2xl p-1 bg-[#0b141d]/70 border border-[#223140]/70 w-fit">
            {[
              ['write', 'Editor'],
              ['split', 'Split'],
              ['preview', 'Reader'],
            ].map(([mode, label]) => (
              <button
                key={mode}
                type="button"
                onClick={() => setEditorMode(mode as EditorMode)}
                className={joinClasses(
                  'px-3 py-2 text-sm rounded-2xl transition-colors',
                  editorMode === mode
                    ? 'bg-[#183244]/80 text-[#e6eff5]'
                    : 'text-gray-400 hover:text-[#bcd6e5]'
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={markdownInputRef}
              type="file"
              accept=".md,.markdown,text/markdown,text/plain,image/*,.webp,.avif,.gif,.svg,.pdf"
              multiple
              onChange={handleMarkdownImport}
              className="hidden"
            />
            <button
              type="button"
              className="btn-secondary px-4 py-2.5"
              onClick={() => markdownInputRef.current?.click()}
            >
              <WuxiaIcon name="upload" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
              Import Obsidian .md
            </button>
            <button type="button" className="dc-icon-btn p-2.5 rounded-xl" onClick={handleImageUrlInsert} title="Image URL">
              <WuxiaIcon name="image" className="w-4 h-4" />
            </button>
            <button type="button" className="dc-icon-btn dc-icon-btn-accent p-2.5 rounded-xl" onClick={handleImageUpload} title="Upload image">
              <WuxiaIcon name="upload" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-[#223140]/70 bg-[#091019]/70 p-4 md:p-5 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {GUIDE_TEMPLATES.map((template) => (
            <button
              key={template.label}
              type="button"
              className="rounded-full border border-[#2d4253] bg-[#12202c] px-3 py-1.5 text-sm text-[#cfe6f5] transition hover:border-[#4e6f87] hover:bg-[#162838]"
              onClick={() => insertMarkdown(template.snippet)}
            >
              {template.label}
            </button>
          ))}
          <button
            type="button"
            className="rounded-full border border-[#2d4253] bg-[#0e1922] px-3 py-1.5 text-sm text-[#b7c9d6] transition hover:border-[#4e6f87] hover:bg-[#162838]"
            onClick={() => insertMarkdown('\n> [!tip] Key takeaway\n> \n')}
          >
            Callout
          </button>
          <button
            type="button"
            className="rounded-full border border-[#2d4253] bg-[#0e1922] px-3 py-1.5 text-sm text-[#b7c9d6] transition hover:border-[#4e6f87] hover:bg-[#162838]"
            onClick={() => insertMarkdown('\n| Item | Value | Notes |\n| --- | --- | --- |\n|  |  |  |\n')}
          >
            Table
          </button>
          <button
            type="button"
            className="rounded-full border border-[#2d4253] bg-[#0e1922] px-3 py-1.5 text-sm text-[#b7c9d6] transition hover:border-[#4e6f87] hover:bg-[#162838]"
            onClick={() => insertMarkdown('\n- [ ] Step one\n- [ ] Step two\n- [ ] Step three\n')}
          >
            Checklist
          </button>
          <button
            type="button"
            className="rounded-full border border-[#2d4253] bg-[#0e1922] px-3 py-1.5 text-sm text-[#b7c9d6] transition hover:border-[#4e6f87] hover:bg-[#162838]"
            onClick={() => insertMarkdown('[[Related Guide]]', true)}
          >
            Wikilink
          </button>
        </div>

        <div className={joinClasses('grid gap-5', editorMode === 'split' && 'xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]')}>
          {showEditor && (
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3 px-1">
                <div>
                  <p className="text-sm font-medium text-[#e6eff5]">Milkdown editor</p>
                  <p className="text-xs text-[#8ea6b8]">Live writing for complex raid, PvP, and farming guides.</p>
                </div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#6f8799]">Markdown first</div>
              </div>

              <MilkdownMarkdownEditor
                ref={editorRef}
                value={content}
                onChange={handleEditorChange}
                placeholder="Пиши здесь... Поддерживаются таблицы, чек-листы, callouts и [[wikilinks]]."
              />

              {errors.content && (
                <span className="text-red-400 text-sm block">{errors.content.message}</span>
              )}
            </div>
          )}

          {showPreview && (
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3 px-1">
                <div>
                  <p className="text-sm font-medium text-[#e6eff5]">Reading view</p>
                  <p className="text-xs text-[#8ea6b8]">Matches the guide reader players will actually see.</p>
                </div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#6f8799]">Obsidian-friendly</div>
              </div>

              <div className="card min-h-[420px] p-6 overflow-auto">
                {content.trim() ? (
                  <MarkdownRenderer content={content} />
                ) : (
                  <div className="rounded-2xl border border-dashed border-[#2c4154] bg-[#0b141d]/65 px-5 py-10 text-sm text-[#89a2b5]">
                    Start writing or import a markdown note from Obsidian to preview the final guide layout.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageFileChange}
        className="hidden"
      />

      {notice && (
        <div className="text-sm text-[#bcd6e5] p-4 bg-[#16202b]/65 rounded-2xl border border-[#2f6e8d]/40">
          <WuxiaIcon name="checkCircle" className="w-4 h-4 mr-2 inline-block align-text-bottom" />
          {notice}
        </div>
      )}

      <div className="mt-2 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
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
              {submitLabel || 'Опубликовать'}
            </span>
          )}
        </button>
      </div>
    </form>
  );
}
