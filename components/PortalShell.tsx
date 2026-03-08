'use client';

import { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import PinScreen from '@/components/PinScreen';
import PortalVisualEffects from '@/components/PortalVisualEffects';
import { authApi } from '@/lib/api/auth';
import { AuthProvider } from '@/lib/auth/context';
import { User } from '@/types';

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
