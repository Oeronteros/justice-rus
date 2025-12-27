'use client';

import { useEffect, useState } from 'react';
import { Guide, User } from '@/types';
import { apiService } from '@/lib/api';
import { formatDate } from '@/lib/utils';

interface GuidesSectionProps {
  user: User;
}

export default function GuidesSection({ user }: GuidesSectionProps) {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadGuides();
  }, []);

  const loadGuides = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getGuides();
      setGuides(data);
    } catch (err) {
      setError('Не удалось загрузить свитки');
      console.error('Failed to load guides:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = Array.from(new Set(guides.map((g) => g.category)));

  const filteredGuides =
    selectedCategory === 'all'
      ? guides
      : guides.filter((g) => g.category === selectedCategory);

  if (loading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-400 mb-2">
              <i className="fas fa-graduation-cap mr-3"></i>
              Свитки Ордена
            </h2>
            <p className="text-gray-400">Собираем священные наставления...</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card p-6">
                <div className="h-6 bg-gray-800 rounded mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded w-full animate-pulse mb-3"></div>
                <div className="h-4 bg-gray-800 rounded w-3/4 animate-pulse mb-4"></div>
                <div className="h-20 bg-gray-800 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center">
                <i className="fas fa-exclamation-triangle text-2xl text-red-400"></i>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-red-400 mb-2">Свитки недоступны</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">{error}</p>
            <button
              onClick={loadGuides}
              className="btn-primary"
            >
              <i className="fas fa-redo mr-2"></i>Повторить ритуал
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-400 mb-3">
            <i className="fas fa-graduation-cap mr-3"></i>
            Свитки Ордена
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Знание — оружие. Используй наставления, чтобы усилить билд и дисциплину.</p>
        </div>

        {categories.length > 0 && (
          <div className="flex justify-center mb-8">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select-field max-w-xs"
            >
              <option value="all">Все школы</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGuides.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center">
                  <i className="fas fa-graduation-cap text-3xl text-gray-500"></i>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-400 mb-2">Свитки не найдены</h3>
              <p className="text-gray-500">Пока нет опубликованных наставлений</p>
            </div>
          ) : (
            filteredGuides.map((guide) => (
              <div key={guide.id} className="card p-6 hover:transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-[#142636]/60 to-[#1d3b52]/60 text-[#8fb9cc] rounded-full text-sm font-medium">
                    <i className="fas fa-tag mr-2"></i>
                    {guide.category}
                  </span>
                  <span className="text-sm text-gray-400">
                    {formatDate(guide.date)}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-orbitron mb-3 text-red-400">{guide.title}</h3>

                <div
                  className="text-gray-300 mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: guide.content }}
                />

                <div className="flex justify-between items-center pt-4 border-t border-gray-700/50">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-user text-gray-400"></i>
                    <span className="text-sm text-gray-400">{guide.author}</span>
                  </div>

                  <button className="text-sm font-medium text-[#8fb9cc] hover:text-[#bcd6e5] transition-colors">
                    <i className="fas fa-book-open mr-2"></i>
                    Читать свиток
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
