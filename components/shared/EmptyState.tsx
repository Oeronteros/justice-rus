'use client';

import { ReactNode } from 'react';
import * as stylex from '@stylexjs/stylex';
import WuxiaIcon, { type IconName } from '@/components/WuxiaIcons';
import { asyncStateStyles } from '@/components/shared/AsyncState.stylex';
import { mergeStylexProps } from '@/lib/stylex/utils';
import { uiStyles } from '@/components/shared/Ui.stylex';

interface ActionButton {
  label: string;
  onClick: () => void;
}

interface EmptyStateProps {
  icon?: ReactNode | IconName;
  title: string;
  description?: string;
  action?: ReactNode | ActionButton;
  variant?: 'default' | 'error';
}

export function EmptyState({ 
  icon = 'inbox', 
  title, 
  description, 
  action,
  variant = 'default'
}: EmptyStateProps) {
  const renderIcon = () => {
    if (typeof icon === 'string') {
      return <WuxiaIcon name={icon as IconName} className="w-10 h-10 text-gray-500" />;
    }
    return icon;
  };

  const renderAction = () => {
    if (!action) return null;
    
    if (typeof action === 'object' && action !== null && 'label' in action && 'onClick' in action) {
      const btn = action as ActionButton;
      return (
        <button onClick={btn.onClick} {...stylex.props(uiStyles.buttonBase, uiStyles.buttonPrimary)}>
          {btn.label}
        </button>
      );
    }
    
    return action as ReactNode;
  };

  const rootProps = mergeStylexProps(stylex.props(asyncStateStyles.emptyRoot), 'card section-card');

  return (
    <div {...rootProps}>
      <div {...stylex.props(asyncStateStyles.iconWrap)}>
        <div {...stylex.props(asyncStateStyles.iconSurface, variant === 'error' && asyncStateStyles.iconSurfaceError)}>
          {renderIcon()}
        </div>
      </div>
      <div {...stylex.props(asyncStateStyles.badgeWrap)}>
        <span {...stylex.props(asyncStateStyles.badge, variant === 'error' && asyncStateStyles.badgeError)}>{variant === 'error' ? 'Need attention' : 'No data yet'}</span>
      </div>
      <h3 {...stylex.props(asyncStateStyles.title, variant === 'error' && asyncStateStyles.titleError)}>
        {title}
      </h3>
      {description && (
        <p {...stylex.props(asyncStateStyles.description)}>{description}</p>
      )}
      {renderAction()}
    </div>
  );
}
