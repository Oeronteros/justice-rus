'use client';

import { useEffect, useState } from 'react';
import MainLayout from '@/components/MainLayout';
import PinScreen from '@/components/PinScreen';
import { authApi } from '@/lib/api/auth';
import { AuthProvider } from '@/lib/auth/context';
import { User } from '@/types';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    try {
      const data = await authApi.verify();
      setUser(data.user as User);
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-20 bg-[#080e13]/96">
        <div className="card px-8 py-7 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl border border-[#365268] bg-[#0f1a24]">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#8fb9cc]"></div>
          </div>
          <div className="mt-4 text-sm text-[#bdd5e4] tracking-wide">Checking secure session...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <PinScreen onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <AuthProvider user={user}>
      <MainLayout user={user} onLogout={handleLogout}>
        {children}
      </MainLayout>
    </AuthProvider>
  );
}
