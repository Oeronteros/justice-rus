'use client';

import { useNotifications } from '@/lib/notifications/context';
import { Toast } from './Toast';

export function ToastContainer() {
  const { toasts, dismissToast } = useNotifications();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onDismiss={dismissToast} />
      ))}
    </div>
  );
}
