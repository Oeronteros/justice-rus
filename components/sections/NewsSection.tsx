'use client';

import { useEffect, useState } from 'react';
import { News, User } from '@/types';
import { apiService } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import WuxiaIcon from '../WuxiaIcons';

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
      
      const response = await fetch('/api/news', { credentials: 'include' });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      setNews(data);
    } catch (err) {
      setError('Failed to load news');
      console.error('Failed to load news:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-400 mb-2">
              <WuxiaIcon name="news" className="inline-block w-6 h-6 mr-3 text-red-400 align-text-bottom" />
              News
            </h2>
            <p className="text-gray-400">Loading latest guild news and updates...</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <WuxiaIcon name="alertTriangle" className="w-7 h-7 text-red-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-red-400 mb-2">Error Loading News</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">{error}</p>
            <button
              onClick={loadNews}
              className="btn-primary"
            >
              <WuxiaIcon name="redo" className="inline-block w-5 h-5 mr-2 align-text-bottom" />Try Again
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
            <WuxiaIcon name="news" className="inline-block w-7 h-7 mr-3 text-red-400 align-text-bottom" />
            News
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Stay updated with the latest guild news, announcements, and updates</p>
        </div>

        <div className="space-y-8">
          {news.length === 0 ? (
            <div className="text-center py-16">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center">
                  <WuxiaIcon name="news" className="w-10 h-10 text-gray-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-400 mb-2">No News Available</h3>
              <p className="text-gray-500">No news or announcements have been posted yet</p>
            </div>
          ) : (
            news.map((item) => (
              <div key={item.id} className="card p-8 hover:transform hover:-translate-y-1 transition-all duration-300">
                {item.pinned && (
                  <div className="flex items-center mb-4 text-yellow-400">
                    <WuxiaIcon name="thumbtack" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
                    <span className="text-sm font-bold uppercase tracking-wider">Pinned</span>
                  </div>
                )}

                <h3 className="text-2xl font-bold font-orbitron mb-4 text-red-400">{item.title}</h3>

                <div
                  className="text-gray-300 mb-6 text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />

                <div className="flex flex-wrap justify-between items-center pt-6 border-t border-gray-700/50">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <WuxiaIcon name="user" className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400">{item.author}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <WuxiaIcon name="calendar" className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400">{formatDate(item.date)}</span>
                    </div>
                  </div>

                  <button className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors">
                    <WuxiaIcon name="comment" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
                    Comment
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
