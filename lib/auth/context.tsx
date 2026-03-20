'use client';

import { createContext, useContext, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  user: User | null;
  children: ReactNode;
}

export function AuthProvider({ user, children }: AuthProviderProps) {
  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useUser() {
  const { user } = useAuth();
  if (!user) {
    return { id: '', nickname: '', role: 'guest' as const, isActive: false };
  }
  return user;
}

export function useAuthState() {
  const { user } = useAuth();

  return {
    isAuthenticated: Boolean(user),
    authState: user ? ('authenticated' as const) : ('unauthenticated' as const),
    user,
  };
}
