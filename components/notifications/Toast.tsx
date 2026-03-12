'use client';

import { useEffect, useState } from 'react';
import WuxiaIcon, { type IconName } from '@/components/WuxiaIcons';
import { cn } from '@/lib/utils';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastProps extends Toast {
  onDismiss: (id: string) => void;
}

const toastIcons: Record<ToastType, IconName> = {
  info: 'eye',
  success: 'checkCircle',
  warning: 'alertTriangle',
  error: 'alertTriangle',
};

const toastStyles: Record<ToastType, string> = {
  info: 'toast--info',
  success: 'toast--success',
  warning: 'toast--warning',
  error: 'toast--error',
};

export function Toast({ id, type, title, message, duration = 5000, action, onDismiss }: ToastProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => onDismiss(id), 300);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, id, onDismiss]);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => onDismiss(id), 300);
  };

  const icon = toastIcons[type];

  return (
    <div
      className={cn('toast', toastStyles[type], isExiting && 'toast--exiting')}
      role="alert"
      aria-live="assertive"
    >
      <div className="toast__icon">
        <WuxiaIcon name={icon} className="h-5 w-5" />
      </div>
      <div className="toast__content">
        <div className="toast__title">{title}</div>
        {message && <div className="toast__message">{message}</div>}
      </div>
      {action && (
        <button className="toast__action" onClick={action.onClick} type="button">
          {action.label}
        </button>
      )}
      <button className="toast__dismiss" onClick={handleDismiss} type="button" aria-label="Dismiss notification">
        <WuxiaIcon name="x" className="h-4 w-4" />
      </button>
    </div>
  );
}
