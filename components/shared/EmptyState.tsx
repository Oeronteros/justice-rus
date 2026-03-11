'use client';

import { ReactNode } from 'react';
import WuxiaIcon, { type IconName } from '@/components/WuxiaIcons';

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
        <button onClick={btn.onClick} className="btn-primary">
          {btn.label}
        </button>
      );
    }
    
    return action as ReactNode;
  };

  const badgeTone = variant === 'error' ? 'ui-badge ui-badge-danger' : 'ui-badge ui-badge-muted';

  return (
    <div className="card section-card px-6 py-10 sm:px-8 sm:py-12 text-center">
      <div className="flex justify-center mb-6">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center ${variant === 'error' ? 'bg-red-900/30' : 'bg-gray-800/50'}`}>
          {renderIcon()}
        </div>
      </div>
      <div className="mb-3 flex justify-center">
        <span className={badgeTone}>{variant === 'error' ? 'Need attention' : 'No data yet'}</span>
      </div>
      <h3 className={`text-xl font-bold mb-2 ${variant === 'error' ? 'text-red-300' : 'text-[#d9e9f2]'}`}>
        {title}
      </h3>
      {description && (
        <p className="text-[#9fb5c3] max-w-md mx-auto mb-6 leading-7">{description}</p>
      )}
      {renderAction()}
    </div>
  );
}
