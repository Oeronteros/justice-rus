'use client';

import { useState } from 'react';
import MainLayout from '@/components/shell/MainLayout';
import PinScreen from '@/components/shell/PinScreen';
import PortalVisualEffects from '@/components/effects/PortalVisualEffects';
import { authApi } from '@/lib/api/auth';
import { AuthProvider } from '@/lib/auth/context';
import type { User } from '@/lib/schemas/auth';

interface PortalShellProps {
  initialUser: User | null;
  children: React.ReactNode;
}

export default function PortalShell({ initialUser, children }: PortalShellProps) {
  const [user, setUser] = useState<User | null>(initialUser);

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

  if (!user) {
    return <PinScreen onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <AuthProvider user={user}>
      <PortalVisualEffects />
      <MainLayout user={user} onLogout={handleLogout}>
        {children}
      </MainLayout>
    </AuthProvider>
  );
}
