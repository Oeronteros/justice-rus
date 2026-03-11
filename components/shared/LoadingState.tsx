'use client';

import { ReactNode } from 'react';
import WuxiaIcon, { type IconName } from '@/components/WuxiaIcons';
import { useTranslation } from '@/lib/i18n/context';

interface LoadingStateProps {
  title?: string;
  subtitle?: string;
  icon?: ReactNode | IconName;
  skeletonCount?: number;
  layout?: 'cards' | 'list';
  /** @deprecated Use skeletonCount instead */
  cardCount?: number;
}

export function LoadingState({ 
  title,
  subtitle,
  icon = 'spinner',
  skeletonCount,
  layout = 'cards',
  cardCount = 3 
}: LoadingStateProps) {
  const { t } = useTranslation();
  const resolvedTitle = title ?? t.common.loading;
  const resolvedSubtitle = subtitle ?? t.common.loadingDetails;
  const count = skeletonCount ?? cardCount;
  
  const renderIcon = () => {
    if (typeof icon === 'string') {
      return <WuxiaIcon name={icon as IconName} className="inline-block w-6 h-6 mr-3 text-red-400 align-text-bottom animate-spin" />;
    }
    return icon;
  };

  return (
    <section className="py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="loading-shell mb-8 sm:mb-10">
          <div className="loading-shell-header">
            <div className="loading-shell-kicker">Silent Moonfall</div>
            <h2 className="loading-shell-title">
              <span className="loading-shell-icon">{renderIcon()}</span>
              <span>{resolvedTitle}</span>
            </h2>
            <p className="loading-shell-subtitle">{resolvedSubtitle}</p>
          </div>

          <div className="loading-shell-chips" aria-hidden="true">
            <span className="loading-chip" />
            <span className="loading-chip loading-chip-wide" />
            <span className="loading-chip" />
          </div>
        </div>

        <div className={`loading-grid ${layout === 'list' ? 'loading-grid-list' : 'loading-grid-cards'}`}>
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="loading-card card p-5 sm:p-6">
              <div className="loading-card-top">
                <span className="loading-pill" />
                <span className="loading-line loading-line-short" />
              </div>
              <div className="loading-line loading-line-title" />
              <div className="loading-line loading-line-body" />
              <div className="loading-line loading-line-body loading-line-body-short" />
              <div className="loading-block" />
              <div className="loading-card-footer">
                <span className="loading-pill loading-pill-wide" />
                <span className="loading-pill" />
              </div>
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
