'use client';

import { useEffect, useState } from 'react';
import { News, User } from '@/types';
import { apiService } from '@/lib/api';
import { formatDate } from '@/lib/utils';

interface NewsSectionProps {
  user: User;
}

export default function NewsSection({ user }: NewsSectionProps) {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getNews();
      // Сортируем: сначала закрепленные
      const sorted = data.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return 0;
      });
      setNews(sorted);
    } catch (err) {
      setError('Failed to load news');
      console.error('Failed to load news:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-1/3 mb-6"></div>
            <div className="h-64 bg-gray-800 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-12">
            <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">Error Loading News</h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <button
              onClick={loadNews}
              className="mt-3 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg transition"
            >
              <i className="fas fa-redo mr-2"></i>Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          <i className="fas fa-newspaper mr-3 text-red-500"></i>
          News
        </h2>

        <div className="space-y-4">
          {news.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <i className="fas fa-newspaper text-4xl mb-4"></i>
              <p>No news available</p>
            </div>
          ) : (
            news.map((item) => (
              <div
                key={item.id}
                className={`bg-gray-800/50 rounded-lg p-6 border ${
                  item.pinned
                    ? 'border-yellow-500/50 bg-yellow-900/10'
                    : 'border-gray-700/50'
                }`}
              >
                {item.pinned && (
                  <div className="flex items-center mb-2 text-yellow-400">
                    <i className="fas fa-thumbtack mr-2"></i>
                    <span className="text-sm font-semibold">Pinned</span>
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <div
                  className="text-gray-300 mb-4"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>
                    <i className="fas fa-user mr-1"></i>
                    {item.author}
                  </span>
                  <span>
                    <i className="fas fa-calendar mr-1"></i>
                    {formatDate(item.date)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

