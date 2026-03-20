'use client';

import { useEffect, useMemo, useState } from 'react';
import BackgroundEffects from '@/components/effects/BackgroundEffects';
import MainLayout from '@/components/shell/MainLayout';
import PinScreen from '@/components/shell/PinScreen';
import PortalVisualEffects from '@/components/effects/PortalVisualEffects';
import { ToastContainer } from '@/components/notifications/ToastContainer';
import { NotificationsProvider } from '@/lib/notifications/context';
import { authApi } from '@/lib/api/auth';
import { AuthProvider } from '@/lib/auth/context';
import type { User } from '@/lib/schemas/auth';

interface PortalShellProps {
  initialUser: User | null;
  runtime?: 'next' | 'vinext';
  children: React.ReactNode;
}

export default function PortalShell({ initialUser, runtime = 'next', children }: PortalShellProps) {
  const [user, setUser] = useState<User | null>(initialUser);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  const authState = user ? 'authenticated' : 'unauthenticated';
  const authStateLabel = useMemo(() => {
    if (user) {
      return `${runtime}:authenticated`;
    }

    return `${runtime}:unauthenticated`;
  }, [runtime, user]);

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
    }
  };

  return (
    <div data-testid="portal-shell" data-runtime={runtime} data-auth-state={authState} data-auth-user-id={user?.id ?? ''}>
      <span data-testid="runtime-badge" data-runtime={runtime} data-auth-state={authState} aria-hidden="true">
        {authStateLabel}
      </span>
      {!user ? (
        <>
          <BackgroundEffects variant="auth" />
          <PinScreen onAuthSuccess={handleAuthSuccess} />
        </>
      ) : (
        <AuthProvider user={user}>
          <NotificationsProvider>
            <PortalVisualEffects />
            <ToastContainer />
            <MainLayout user={user} onLogout={handleLogout}>
              {children}
            </MainLayout>
          </NotificationsProvider>
        </AuthProvider>
      )}
    </div>
  );
}
