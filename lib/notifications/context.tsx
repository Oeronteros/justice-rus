'use client';

import { createContext, useContext, useCallback, useState, useMemo, type ReactNode } from 'react';
import type { Toast, ToastType } from '@/components/notifications/Toast';


interface NotificationSettings {
  enabled: boolean;
  helpRequests: boolean;
  absenceApprovals: boolean;
  pvpMatches: boolean;
  eventReminders: boolean;
  officerAlerts: boolean;
  soundEnabled: boolean;
  desktopEnabled: boolean;
}

interface NotificationsContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  dismissToast: (id: string) => void;
  clearAllToasts: () => void;
  settings: NotificationSettings;
  updateSettings: (settings: Partial<NotificationSettings>) => void;
  requestPermission: () => Promise<NotificationPermission>;
}

const defaultSettings: NotificationSettings = {
  enabled: true,
  helpRequests: true,
  absenceApprovals: true,
  pvpMatches: true,
  eventReminders: true,
  officerAlerts: true,
  soundEnabled: false,
  desktopEnabled: false,
};

const SETTINGS_KEY = 'guild_notification_settings';

function shouldMirrorToDesktop(settings: NotificationSettings, toast: Omit<Toast, 'id'>) {
  if (!settings.enabled || !settings.desktopEnabled) return false;
  if (typeof window === 'undefined' || typeof Notification === 'undefined') return false;
  if (Notification.permission !== 'granted') return false;

  if (toast.type === 'error' || toast.type === 'warning' || toast.type === 'success') {
    return settings.officerAlerts;
  }

  return settings.eventReminders;
}

function mirrorToastToDesktop(toast: Omit<Toast, 'id'>) {
  try {
    const notification = new Notification(toast.title, {
      body: toast.message,
      tag: toast.title,
      silent: true,
    });

    if (toast.action) {
      notification.onclick = () => {
        window.focus();
        toast.action?.onClick();
        notification.close();
      };
    }
  } catch {
    // ignore Notification construction failures
  }
}

function getStoredSettings(): NotificationSettings {
  if (typeof window === 'undefined') return defaultSettings;

  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultSettings, ...parsed };
    }
  } catch {
    // ignore
  }

  return defaultSettings;
}

const NotificationsContext = createContext<NotificationsContextType | null>(null);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>(getStoredSettings);

  const addToast = useCallback((toast: Omit<Toast, 'id'>): string => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const newToast: Toast = { id, ...toast };

    setToasts((prev) => [...prev, newToast]);

    if (toast.type === 'error' || toast.type === 'warning') {
      console.warn(`[${toast.type.toUpperCase()}] ${toast.title}: ${toast.message || ''}`);
    }

    if (shouldMirrorToDesktop(settings, toast)) {
      mirrorToastToDesktop(toast);
    }

    return id;
  }, [settings]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const updateSettings = useCallback((newSettings: Partial<NotificationSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      if (typeof window !== 'undefined') {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  const requestPermission = useCallback(async (): Promise<NotificationPermission> => {
    if (!('Notification' in window)) {
      return 'denied';
    }

    if (Notification.permission === 'granted') {
      return 'granted';
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        updateSettings({ desktopEnabled: true });
      }
      return permission;
    } catch {
      return 'denied';
    }
  }, [updateSettings]);

  const value = useMemo<NotificationsContextType>(
    () => ({
      toasts,
      addToast,
      dismissToast,
      clearAllToasts,
      settings,
      updateSettings,
      requestPermission,
    }),
    [toasts, addToast, dismissToast, clearAllToasts, settings, updateSettings, requestPermission]
  );

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
}

export function useOptionalNotifications() {
  return useContext(NotificationsContext);
}

export function useToast() {
  const { addToast } = useNotifications();

  return useCallback(
    (type: ToastType, title: string, message?: string, duration?: number) => {
      return addToast({ type, title, message, duration });
    },
    [addToast]
  );
}
