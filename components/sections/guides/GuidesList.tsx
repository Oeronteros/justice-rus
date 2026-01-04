'use client';

import { useMemo, useState } from 'react';
import { useGuides } from '@/lib/hooks/useGuides';
import { GuideCard } from './GuideCard';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import WuxiaIcon from '@/components/WuxiaIcons';

interface GuidesListProps {
  onGuideClick: (guideId: string) => void;
  onCreateClick: () => void;
}

export function GuidesList({ onGuideClick, onCreateClick }: GuidesListProps) {
  const { data: guides = [], isLoading, error, refetch } = useGuides();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');

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
        title="Гайды ордена"
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
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
        <div className="text-center lg:text-left">
          <h2 className="text-4xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-400 mb-3">
            <WuxiaIcon name="guides" className="inline-block w-7 h-7 mr-3 text-red-400 align-text-bottom" />
            Гайды ордена
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Пиши свитки. Оценивай печатью. Обсуждай — и делай культ сильнее.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-center lg:justify-end">
          <div className="flex gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по названию/автору..."
              className="input-field"
            />
            <button
              type="button"
              className="dc-icon-btn p-2.5 rounded-xl"
              onClick={() => refetch()}
              title="Обновить"
            >
              <WuxiaIcon name="refresh" className="w-5 h-5" />
            </button>
          </div>

          <button type="button" className="btn-primary px-5 py-3" onClick={onCreateClick}>
            <WuxiaIcon name="edit" className="inline-block w-5 h-5 mr-2 align-text-bottom" />
            Написать гайд
          </button>
        </div>
      </div>

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
