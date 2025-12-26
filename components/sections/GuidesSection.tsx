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
      setError('Failed to load guides');
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
            <h3 className="text-xl font-semibold mb-2">Error Loading Guides</h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <button
              onClick={loadGuides}
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">
            <i className="fas fa-graduation-cap mr-3 text-red-500"></i>
            Guides
          </h2>
          {categories.length > 0 && (
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGuides.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-400">
              <i className="fas fa-graduation-cap text-4xl mb-4"></i>
              <p>No guides available</p>
            </div>
          ) : (
            filteredGuides.map((guide) => (
              <div
                key={guide.id}
                className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 hover:border-red-500/50 transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 bg-purple-900/30 text-purple-400 rounded text-xs">
                    {guide.category}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatDate(guide.date)}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
                <div
                  className="text-gray-300 text-sm mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: guide.content }}
                />
                <div className="text-xs text-gray-400">
                  <i className="fas fa-user mr-1"></i>
                  {guide.author}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

