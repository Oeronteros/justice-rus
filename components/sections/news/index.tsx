'use client';

import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { useNews } from '@/lib/hooks/useNews';
import { formatDate } from '@/lib/utils';
import WuxiaIcon from '@/components/WuxiaIcons';
import type { User } from '@/types';

interface NewsSectionProps {
  user: User;
}

function NewsSectionContent({ user }: NewsSectionProps) {
  const { data: news = [], isLoading, error, refetch } = useNews();

  if (isLoading) {
    return (
      <LoadingState
        title="News"
        subtitle="Loading latest guild news and updates..."
        icon={<WuxiaIcon name="news" className="w-6 h-6 text-red-400" />}
        skeletonCount={3}
      />
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={<WuxiaIcon name="alertTriangle" className="w-7 h-7 text-red-400" />}
        title="Error Loading News"
        description={error instanceof Error ? error.message : 'Failed to load news'}
        action={
          <button onClick={() => refetch()} className="btn-primary">
            <WuxiaIcon name="redo" className="inline-block w-5 h-5 mr-2 align-text-bottom" />
            Try Again
          </button>
        }
        variant="error"
      />
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
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stay updated with the latest guild news, announcements, and updates
          </p>
        </div>

        <div className="space-y-8">
          {news.length === 0 ? (
            <EmptyState
              icon={<WuxiaIcon name="news" className="w-10 h-10 text-gray-500" />}
              title="No News Available"
              description="No news or announcements have been posted yet"
            />
          ) : (
            news.map((item) => (
              <div
                key={item.id}
                className="card p-8 hover:transform hover:-translate-y-1 transition-all duration-300"
              >
                {item.pinned && (
                  <div className="flex items-center mb-4 text-yellow-400">
                    <WuxiaIcon name="thumbtack" className="inline-block w-4 h-4 mr-2 align-text-bottom" />
                    <span className="text-sm font-bold uppercase tracking-wider">Pinned</span>
                  </div>
                )}

                <h3 className="text-2xl font-bold font-orbitron mb-4 text-red-400">
                  {item.title}
                </h3>

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

export default function NewsSection(props: NewsSectionProps) {
  return (
    <ErrorBoundary>
      <NewsSectionContent {...props} />
    </ErrorBoundary>
  );
}
