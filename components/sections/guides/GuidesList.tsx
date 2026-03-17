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
import * as stylex from '@stylexjs/stylex';
import { uiStyles } from '@/components/shared/Ui.stylex';
import { guidesStyles } from './Guides.stylex';

interface GuidesListProps {
  onGuideClick: (guideId: string) => void;
  onCreateClick: () => void;
}

export function GuidesList({ onGuideClick, onCreateClick }: GuidesListProps) {
  const { t, language } = useTranslation();
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
        icon={<WuxiaIcon name="guides" {...stylex.props(uiStyles.iconLg, uiStyles.iconDanger)} />}
        skeletonCount={3}
        layout="cards"
      />
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={<WuxiaIcon name="alertTriangle" {...stylex.props(uiStyles.iconXl, uiStyles.iconDanger)} />}
        title={t.guides.error}
        description={error instanceof Error ? error.message : t.errors.server}
        action={
          <button onClick={() => refetch()} {...stylex.props(uiStyles.buttonBase, uiStyles.buttonPrimary)}>
            <WuxiaIcon name="redo" {...stylex.props(uiStyles.iconMd, uiStyles.inlineIcon)} />
            {t.errors.tryAgain}
          </button>
        }
        variant="error"
      />
    );
  }

  return (
    <div {...stylex.props(uiStyles.stackLg)}>
      <SectionHero
        icon={<WuxiaIcon name="guides" {...stylex.props(uiStyles.iconMd)} />}
        title={t.guides.title}
        subtitle={t.guides.subtitle}
        chips={['Obsidian Import', 'Milkdown Writing', 'Comments']}
        actions={
          <>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.guides.search}
              {...stylex.props(uiStyles.input)}
              style={{ minWidth: 220 }}
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
              {...stylex.props(uiStyles.buttonBase, uiStyles.buttonSecondary)}
              onClick={() => markdownInputRef.current?.click()}
              disabled={isImporting}
            >
              <WuxiaIcon name="upload" {...stylex.props(uiStyles.iconSm, uiStyles.inlineIcon)} />
              {isImporting ? 'Импорт...' : 'Импорт .md'}
            </button>
            <button
              type="button"
              {...stylex.props(uiStyles.buttonBase, uiStyles.buttonSecondary)}
              onClick={() => markdownFolderInputRef.current?.click()}
              disabled={isImporting}
            >
              <WuxiaIcon name="guides" {...stylex.props(uiStyles.iconSm, uiStyles.inlineIcon)} />
              Папка vault
            </button>
            <button
              type="button"
              {...stylex.props(uiStyles.iconButton)}
              onClick={() => refetch()}
              title="Обновить"
            >
              <WuxiaIcon name="refresh" {...stylex.props(uiStyles.iconMd)} />
            </button>
            <button type="button" {...stylex.props(uiStyles.buttonBase, uiStyles.buttonPrimary)} onClick={onCreateClick}>
              <WuxiaIcon name="edit" {...stylex.props(uiStyles.iconMd, uiStyles.inlineIcon)} />
              {t.guides.create}
            </button>
          </>
          }
        />

      <div {...stylex.props(guidesStyles.overviewRail)}>
        <article {...stylex.props(uiStyles.card, uiStyles.sectionCard, guidesStyles.overviewCard)}>
          <span {...stylex.props(guidesStyles.overviewKicker)}>{language === 'ru' ? 'База знаний' : language === 'zh' ? '知识库' : 'Knowledge base'}</span>
          <strong {...stylex.props(guidesStyles.overviewValue)}>{guides.length}</strong>
          <span {...stylex.props(guidesStyles.overviewLabel)}>{language === 'ru' ? 'Опубликованные гайды для рейдов, PvP и онбординга.' : language === 'zh' ? '适用于团本、PvP 与新人引导的已发布攻略。' : 'Published guides ready for raid, PvP, and onboarding flows.'}</span>
        </article>
        <article {...stylex.props(uiStyles.card, uiStyles.sectionCard, guidesStyles.overviewCard)}>
          <span {...stylex.props(guidesStyles.overviewKicker)}>{language === 'ru' ? 'Категории' : language === 'zh' ? '分类' : 'Categories'}</span>
          <strong {...stylex.props(guidesStyles.overviewValue)}>{categoryStats.length}</strong>
          <span {...stylex.props(guidesStyles.overviewLabel)}>{language === 'ru' ? 'Структурированные треки для поиска и точной фильтрации.' : language === 'zh' ? '为浏览式发现与精细筛选准备的结构化路径。' : 'Structured paths for browse-first discovery and focused filtering.'}</span>
        </article>
        <article {...stylex.props(uiStyles.card, uiStyles.sectionCard, guidesStyles.overviewCard)}>
          <span {...stylex.props(guidesStyles.overviewKicker)}>{language === 'ru' ? 'Авторы' : language === 'zh' ? '贡献者' : 'Contributors'}</span>
          <strong {...stylex.props(guidesStyles.overviewValue)}>{authorStats.length}</strong>
          <span {...stylex.props(guidesStyles.overviewLabel)}>{language === 'ru' ? 'Видимый авторский сигнал помогает быстро узнавать надежные гайды.' : language === 'zh' ? '明确作者信号让可信攻略更容易被快速识别。' : 'Visible author signal keeps trusted guides easy to recognize at a glance.'}</span>
        </article>
      </div>

      <div {...stylex.props(guidesStyles.commandDeck)}>
        <div
          {...stylex.props(guidesStyles.dropzone, isDragOver && guidesStyles.dropzoneActive)}
          data-over={isDragOver ? 'true' : 'false'}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
        >
          <div {...stylex.props(guidesStyles.dropzoneText)}>
            <WuxiaIcon name="upload" {...stylex.props(uiStyles.iconSm, uiStyles.inlineIcon)} />
            {language === 'ru' ? 'Перетащи `.md` вместе с вложениями или выбери целую папку из Obsidian.' : language === 'zh' ? '拖入带附件的 `.md` 文件，或直接选择整个 Obsidian 文件夹。' : 'Drop `.md` files with attachments or choose an entire Obsidian folder.'}
          </div>
        </div>

        <div {...stylex.props(guidesStyles.filterDeck)}>
          <div {...stylex.props(guidesStyles.filterDeckHeader)}>
            <span {...stylex.props(guidesStyles.overviewKicker)}>{language === 'ru' ? 'Фильтры навигации' : language === 'zh' ? '筛选导航' : 'Discovery filters'}</span>
            <span {...stylex.props(guidesStyles.statsText)}>
              {language === 'ru' ? 'Показано:' : language === 'zh' ? '当前显示：' : 'Showing:'} <span className="text-gray-300 font-medium">{filteredGuides.length}</span> {language === 'ru' ? 'из' : language === 'zh' ? '/' : 'of'} <span className="text-gray-300 font-medium">{guides.length}</span>
            </span>
          </div>

          <div {...stylex.props(uiStyles.inlineTags)}>
            <button
              type="button"
              {...stylex.props(uiStyles.chip, selectedCategory === 'all' && uiStyles.chipActive)}
              onClick={() => setSelectedCategory('all')}
            >
              {language === 'ru' ? 'Все категории' : language === 'zh' ? '全部分类' : 'All categories'} · {guides.length}
            </button>
            {categoryStats.map(({ category, count }) => (
              <button
                key={category}
                type="button"
                {...stylex.props(uiStyles.chip, selectedCategory === category && uiStyles.chipActive)}
                onClick={() => setSelectedCategory(category)}
              >
                {category} · {count}
              </button>
            ))}
          </div>

          <div {...stylex.props(uiStyles.inlineTags)}>
            <button
              type="button"
              {...stylex.props(uiStyles.chip, selectedAuthor === 'all' && uiStyles.chipActive)}
              onClick={() => setSelectedAuthor('all')}
            >
              {language === 'ru' ? 'Все авторы' : language === 'zh' ? '全部作者' : 'All authors'}
            </button>
            {authorStats.map(({ author, count }) => (
              <button
                key={author}
                type="button"
                {...stylex.props(uiStyles.chip, selectedAuthor === author && uiStyles.chipActive)}
                onClick={() => setSelectedAuthor(author)}
              >
                {author} · {count}
              </button>
            ))}
          </div>
        </div>
      </div>

      {notice && (
        <div {...stylex.props(uiStyles.notice, uiStyles.noticeSuccess)}>
          <WuxiaIcon name="checkCircle" {...stylex.props(uiStyles.iconSm, uiStyles.inlineIcon)} />
          {notice}
        </div>
      )}
      <div {...stylex.props(guidesStyles.cardGrid)}>
        {filteredGuides.length === 0 ? (
          <div className="col-span-full">
            <EmptyState
              icon={<WuxiaIcon name="guides" {...stylex.props(uiStyles.icon2xl, uiStyles.iconMuted)} />}
              title={t.guides.empty}
              description={t.guides.emptyDescription}
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
    </div>
  );
}
