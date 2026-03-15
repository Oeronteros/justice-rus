'use client';

import { ReactNode } from 'react';
import * as stylex from '@stylexjs/stylex';
import WuxiaIcon, { type IconName } from '@/components/WuxiaIcons';
import { asyncStateStyles } from '@/components/shared/AsyncState.stylex';
import { useTranslation } from '@/lib/i18n/context';
import { mergeStylexProps } from '@/lib/stylex/utils';

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
    <section {...stylex.props(asyncStateStyles.section)}>
      <div {...stylex.props(asyncStateStyles.container)}>
        <div {...stylex.props(asyncStateStyles.heroStack)}>
          <div {...stylex.props(asyncStateStyles.heroHeader)}>
            <div {...stylex.props(asyncStateStyles.heroKicker)}>Silent Moonfall</div>
            <h2 {...stylex.props(asyncStateStyles.heroTitle)}>
              <span {...stylex.props(asyncStateStyles.heroIcon)}>{renderIcon()}</span>
              <span>{resolvedTitle}</span>
            </h2>
            <p {...stylex.props(asyncStateStyles.heroSubtitle)}>{resolvedSubtitle}</p>
          </div>

          <div {...stylex.props(asyncStateStyles.chipRow)} aria-hidden="true">
            <span {...stylex.props(asyncStateStyles.skeletonChip)} />
            <span {...stylex.props(asyncStateStyles.skeletonChip, asyncStateStyles.skeletonChipWide)} />
            <span {...stylex.props(asyncStateStyles.skeletonChip)} />
          </div>
        </div>

        <div {...stylex.props(asyncStateStyles.grid, layout === 'list' ? asyncStateStyles.listGrid : asyncStateStyles.cardsGrid)}>
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} {...mergeStylexProps(stylex.props(asyncStateStyles.card), 'card')}>
              <div {...stylex.props(asyncStateStyles.cardTop)}>
                <span {...stylex.props(asyncStateStyles.pill)} />
                <span {...stylex.props(asyncStateStyles.line, asyncStateStyles.lineShort)} />
              </div>
              <div {...stylex.props(asyncStateStyles.line, asyncStateStyles.lineTitle)} />
              <div {...stylex.props(asyncStateStyles.line)} />
              <div {...stylex.props(asyncStateStyles.line, asyncStateStyles.lineBodyShort)} />
              <div {...stylex.props(asyncStateStyles.block)} />
              <div {...stylex.props(asyncStateStyles.cardFooter)}>
                <span {...stylex.props(asyncStateStyles.pill, asyncStateStyles.pillWide)} />
                <span {...stylex.props(asyncStateStyles.pill)} />
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
  const sizeStyles = {
    sm: asyncStateStyles.spinnerSm,
    md: asyncStateStyles.spinnerMd,
    lg: asyncStateStyles.spinnerLg,
  };

  const spinnerProps = stylex.props(asyncStateStyles.spinner, sizeStyles[size]);

  return (
    <div {...spinnerProps} className={[spinnerProps.className, className].filter(Boolean).join(' ')} />
  );
}
