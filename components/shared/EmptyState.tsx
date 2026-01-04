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

  const bgClass = variant === 'error' ? 'bg-red-900/30' : 'bg-gray-800/50';

  return (
    <div className="text-center py-16">
      <div className="flex justify-center mb-6">
        <div className={`w-20 h-20 ${bgClass} rounded-full flex items-center justify-center`}>
          {renderIcon()}
        </div>
      </div>
      <h3 className={`text-xl font-bold mb-2 ${variant === 'error' ? 'text-red-400' : 'text-gray-400'}`}>
        {title}
      </h3>
      {description && (
        <p className="text-gray-500 max-w-md mx-auto mb-6">{description}</p>
      )}
      {renderAction()}
    </div>
  );
}
