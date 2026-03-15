'use client';

import { useEffect, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import WuxiaIcon, { type IconName } from '@/components/WuxiaIcons';
import { toastStyles } from '@/components/notifications/Toast.stylex';

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

const toastToneStyles: Record<ToastType, { root: stylex.StyleXStyles; icon: stylex.StyleXStyles[] }> = {
  info: {
    root: toastStyles.info,
    icon: [toastStyles.iconWrap, toastStyles.iconInfo],
  },
  success: {
    root: toastStyles.success,
    icon: [toastStyles.iconWrap, toastStyles.iconSuccess],
  },
  warning: {
    root: toastStyles.warning,
    icon: [toastStyles.iconWrap, toastStyles.iconWarning],
  },
  error: {
    root: toastStyles.error,
    icon: [toastStyles.iconWrap, toastStyles.iconError],
  },
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
  const rootProps = stylex.props(toastStyles.root, toastToneStyles[type].root, isExiting && toastStyles.exiting);
  const iconProps = stylex.props(...toastToneStyles[type].icon);

  return (
    <div
      {...rootProps}
      role="alert"
      aria-live="assertive"
    >
      <div {...iconProps}>
        <WuxiaIcon name={icon} className="h-5 w-5" />
      </div>
      <div {...stylex.props(toastStyles.content)}>
        <div {...stylex.props(toastStyles.title)}>{title}</div>
        {message && <div {...stylex.props(toastStyles.message)}>{message}</div>}
      </div>
      {action && (
        <button {...stylex.props(toastStyles.action)} onClick={action.onClick} type="button">
          {action.label}
        </button>
      )}
      <button {...stylex.props(toastStyles.dismiss)} onClick={handleDismiss} type="button" aria-label="Dismiss notification">
        <WuxiaIcon name="x" className="h-4 w-4" />
      </button>
    </div>
  );
}
