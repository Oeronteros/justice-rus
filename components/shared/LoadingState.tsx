'use client';

import { ReactNode } from 'react';
import WuxiaIcon, { type IconName } from '@/components/WuxiaIcons';

interface LoadingStateProps {
  title?: string;
  subtitle?: string;
  icon?: ReactNode | IconName;
  skeletonCount?: number;
  /** @deprecated Use skeletonCount instead */
  cardCount?: number;
}

export function LoadingState({ 
  title = 'Загрузка...', 
  subtitle = 'Призываем данные...',
  icon = 'spinner',
  skeletonCount,
  cardCount = 3 
}: LoadingStateProps) {
  const count = skeletonCount ?? cardCount;
  
  const renderIcon = () => {
    if (typeof icon === 'string') {
      return <WuxiaIcon name={icon as IconName} className="inline-block w-6 h-6 mr-3 text-red-400 align-text-bottom animate-spin" />;
    }
    return icon;
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-400 mb-2">
            {renderIcon()}
            {title}
          </h2>
          <p className="text-gray-400">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: count }).map((_, i) => (
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

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`animate-spin rounded-full border-t-2 border-b-2 border-red-600 ${sizeClasses[size]} ${className}`} />
  );
}
