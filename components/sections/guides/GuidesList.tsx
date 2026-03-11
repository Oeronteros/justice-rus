'use client';

import { useMemo, useRef, useState, type ChangeEvent, type DragEvent } from 'react';
import { useCreateGuide, useGuides } from '@/lib/guides/hooks';
import { buildGuideDraftFromMarkdownFile, isMarkdownFile } from '@/lib/guides/obsidian';
import { GuideCard } from './GuideCard';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { SectionHero } from '@/components/shared/SectionHero';
import WuxiaIcon from '@/components/WuxiaIcons';
import { useTranslation } from '@/lib/i18n/context';

interface GuidesListProps {
  onGuideClick: (guideId: string) => void;
  onCreateClick: () => void;
}

export function GuidesList({ onGuideClick, onCreateClick }: GuidesListProps) {
  const { t } = useTranslation();
  const { data: guides = [], isLoading, error, refetch } = useGuides();
  const createGuide = useCreateGuide();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAuthor, setSelectedAuthor] = useState('all');
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

  const categoryStats = useMemo(
    () => categories.map((category) => ({ category, count: guides.filter((guide) => guide.category === category).length })),
    [categories, guides]
  );

  const authorStats = useMemo(() => {
    const counts = new Map<string, number>();
    for (const guide of guides) {
      counts.set(guide.author, (counts.get(guide.author) || 0) + 1);
    }
    return [...counts.entries()]
      .map(([author, count]) => ({ author, count }))
      .sort((left, right) => right.count - left.count || left.author.localeCompare(right.author, 'ru'))
      .slice(0, 8);
  }, [guides]);

  const filteredGuides = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return guides.filter((guide) => {
      const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
      const matchesAuthor = selectedAuthor === 'all' || guide.author === selectedAuthor;
      const matchesSearch =
        !normalizedSearch ||
        guide.title.toLowerCase().includes(normalizedSearch) ||
        guide.author.toLowerCase().includes(normalizedSearch);
      return matchesCategory && matchesAuthor && matchesSearch;
    });
  }, [guides, search, selectedAuthor, selectedCategory]);

  if (isLoading) {
    return (
      <LoadingState
        title={t.guides.title}
        subtitle={t.guides.loading}
        icon={<WuxiaIcon name="guides" className="w-6 h-6 text-red-400" />}
        skeletonCount={3}
      />
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={<WuxiaIcon name="alertTriangle" className="w-7 h-7 text-red-400" />}
        title={t.guides.error}
        description={error instanceof Error ? error.message : t.errors.server}
        action={
          <button onClick={() => refetch()} className="btn-primary">
            <WuxiaIcon name="redo" className="inline-block w-5 h-5 mr-2 align-text-bottom" />
            {t.errors.tryAgain}
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
        title={t.guides.title}
        subtitle={t.guides.subtitle}
        chips={['Obsidian Import', 'Milkdown Writing', 'Comments']}
        actions={
          <>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.guides.search}
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
              {t.guides.create}
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

      <div className="space-y-4 mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={`px-3 py-2 rounded-full text-sm transition ${selectedCategory === 'all' ? 'bg-[#204154] text-[#e6eff5] border border-[#4d7a90]/60' : 'bg-[#101a23]/80 text-[#9ec5d8] border border-[#223544]/60'}`}
            onClick={() => setSelectedCategory('all')}
          >
            Все категории · {guides.length}
          </button>
          {categoryStats.map(({ category, count }) => (
            <button
              key={category}
              type="button"
              className={`px-3 py-2 rounded-full text-sm transition ${selectedCategory === category ? 'bg-[#204154] text-[#e6eff5] border border-[#4d7a90]/60' : 'bg-[#101a23]/80 text-[#9ec5d8] border border-[#223544]/60'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category} · {count}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <button
            type="button"
            className={`px-3 py-2 rounded-full text-sm transition ${selectedAuthor === 'all' ? 'bg-[#173041]/80 text-[#e6eff5] border border-[#4d7a90]/50' : 'bg-[#101a23]/80 text-[#9ec5d8] border border-[#223544]/60'}`}
            onClick={() => setSelectedAuthor('all')}
          >
            Все авторы
          </button>
          {authorStats.map(({ author, count }) => (
            <button
              key={author}
              type="button"
              className={`px-3 py-2 rounded-full text-sm transition ${selectedAuthor === author ? 'bg-[#173041]/80 text-[#e6eff5] border border-[#4d7a90]/50' : 'bg-[#101a23]/80 text-[#9ec5d8] border border-[#223544]/60'}`}
              onClick={() => setSelectedAuthor(author)}
            >
              {author} · {count}
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-500 text-center sm:text-left">
          Показано: <span className="text-gray-300 font-medium">{filteredGuides.length}</span> из <span className="text-gray-300 font-medium">{guides.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
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
