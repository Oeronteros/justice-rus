'use client';

import { useMemo, useRef, useState, type ChangeEvent, type DragEvent } from 'react';
import { useCreateGuide, useGuides } from '@/lib/hooks/useGuides';
import { buildGuideDraftFromMarkdownFile, isMarkdownFile } from '@/lib/guides/obsidian';
import { GuideCard } from './GuideCard';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { SectionHero } from '@/components/shared/SectionHero';
import WuxiaIcon from '@/components/WuxiaIcons';

interface GuidesListProps {
  onGuideClick: (guideId: string) => void;
  onCreateClick: () => void;
}

export function GuidesList({ onGuideClick, onCreateClick }: GuidesListProps) {
  const { data: guides = [], isLoading, error, refetch } = useGuides();
  const createGuide = useCreateGuide();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const markdownInputRef = useRef<HTMLInputElement | null>(null);
  const markdownFolderInputRef = useRef<HTMLInputElement | null>(null);

  const processMarkdownFiles = async (files: File[]) => {
    if (files.length === 0) return;

    setIsImporting(true);
    setNotice(null);

    let imported = 0;
    let skipped = 0;
    let failed = 0;

    const markdownFiles = files.filter((file) => isMarkdownFile(file));
    if (markdownFiles.length === 0) {
      setIsImporting(false);
      setNotice('Markdown files not found. Pick .md notes or an exported Obsidian folder.');
      return;
    }

    skipped = Math.max(0, files.length - markdownFiles.length);

    for (const file of markdownFiles) {
      try {
        const draft = await buildGuideDraftFromMarkdownFile(file, files);
        if (!draft.content) {
          skipped += 1;
          continue;
        }

        await createGuide.mutateAsync({
          title: draft.title,
          content: draft.content,
          category: draft.category,
          author: draft.author,
        });

        imported += 1;
      } catch (err) {
        failed += 1;
        console.error('Failed to import markdown guide:', file.name, err);
      }
    }

    await refetch();

    const parts: string[] = [];
    if (imported > 0) parts.push(`Импортировано: ${imported}`);
    if (skipped > 0) parts.push(`Пропущено: ${skipped}`);
    if (failed > 0) parts.push(`С ошибкой: ${failed}`);
    if (parts.length > 0) setNotice(parts.join(' · '));

    setIsImporting(false);
  };

  const handleMarkdownInput = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    await processMarkdownFiles(files);
    if (markdownInputRef.current) {
      markdownInputRef.current.value = '';
    }
    if (markdownFolderInputRef.current) {
      markdownFolderInputRef.current.value = '';
    }
  };

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    const files = Array.from(event.dataTransfer.files || []);
    await processMarkdownFiles(files);
  };

  const categories = useMemo(
    () => Array.from(new Set(guides.map((g) => g.category))),
    [guides]
  );

  const filteredGuides = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return guides.filter((guide) => {
      const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
      const matchesSearch =
        !normalizedSearch ||
        guide.title.toLowerCase().includes(normalizedSearch) ||
        guide.author.toLowerCase().includes(normalizedSearch);
      return matchesCategory && matchesSearch;
    });
  }, [guides, search, selectedCategory]);

  if (isLoading) {
    return (
      <LoadingState
        title="Гайды гильдии"
        subtitle="Загружаем свитки знаний..."
        icon={<WuxiaIcon name="guides" className="w-6 h-6 text-red-400" />}
        skeletonCount={3}
      />
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={<WuxiaIcon name="alertTriangle" className="w-7 h-7 text-red-400" />}
        title="Гайды недоступны"
        description={error instanceof Error ? error.message : 'Не удалось загрузить гайды'}
        action={
          <button onClick={() => refetch()} className="btn-primary">
            <WuxiaIcon name="redo" className="inline-block w-5 h-5 mr-2 align-text-bottom" />
            Попробовать снова
          </button>
        }
        variant="error"
      />
    );
  }

  return (
    <>
      <SectionHero
        icon={<WuxiaIcon name="guides" className="w-5 h-5" />}
        title="Гайды гильдии"
        subtitle="Единая база знаний с импортом Obsidian .md, вложениями, wikilinks и быстрым поиском по авторам/темам."
        chips={['Obsidian Import', 'Milkdown Writing', 'Comments']}
        actions={
          <>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по названию/автору..."
              className="input-field min-w-[220px]"
            />
            <input
              ref={markdownInputRef}
              type="file"
              accept=".md,.markdown,text/markdown,text/plain,image/*,.webp,.avif,.gif,.svg,.pdf"
              multiple
              onChange={handleMarkdownInput}
              className="hidden"
            />
            <input
              ref={markdownFolderInputRef}
              type="file"
              onChange={handleMarkdownInput}
              className="hidden"
              {...({ webkitdirectory: 'true', directory: 'true' } as Record<string, string>)}
            />
            <button
              type="button"
              className="btn-secondary"
              onClick={() => markdownInputRef.current?.click()}
              disabled={isImporting}
            >
              <WuxiaIcon name="upload" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
              {isImporting ? 'Импорт...' : 'Импорт .md'}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => markdownFolderInputRef.current?.click()}
              disabled={isImporting}
            >
              <WuxiaIcon name="guides" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
              Папка vault
            </button>
            <button
              type="button"
              className="dc-icon-btn p-2.5 rounded-xl"
              onClick={() => refetch()}
              title="Обновить"
            >
              <WuxiaIcon name="refresh" className="w-5 h-5" />
            </button>
            <button type="button" className="btn-primary px-5 py-3" onClick={onCreateClick}>
              <WuxiaIcon name="edit" className="inline-block w-5 h-5 mr-2 align-text-bottom" />
              Написать гайд
            </button>
          </>
        }
      />

      <div
        className="portal-dropzone mb-6"
        data-over={isDragOver ? 'true' : 'false'}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        <div className="text-sm text-[#bdd5e4]">
          <WuxiaIcon name="upload" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
          Перетащи `.md` вместе с вложениями или выбери целую папку из Obsidian.
        </div>
      </div>

      {notice && (
        <div className="mb-6 text-sm text-[#bcd6e5] p-4 bg-[#16202b]/65 rounded-xl border border-[#2f6e8d]/40">
          <WuxiaIcon name="checkCircle" className="w-4 h-4 mr-2 inline-block align-text-bottom" />
          {notice}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
          <span className="text-sm text-gray-400">Категория:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="select-field max-w-xs"
          >
            <option value="all">Все</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="text-sm text-gray-500 text-center sm:text-right">
          Всего: <span className="text-gray-300 font-medium">{guides.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGuides.length === 0 ? (
          <div className="col-span-full">
            <EmptyState
              icon={<WuxiaIcon name="guides" className="w-10 h-10 text-gray-500" />}
              title="Ничего не найдено"
              description="Измени фильтр или напиши новый гайд."
            />
          </div>
        ) : (
          filteredGuides.map((guide) => (
            <GuideCard
              key={guide.id}
              guide={guide}
              onClick={() => onGuideClick(guide.id)}
            />
          ))
        )}
      </div>
    </>
  );
}
