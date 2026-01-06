'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface HeaderContextType {
  isHeaderHidden: boolean;
  hideHeader: () => void;
  showHeader: () => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  const hideHeader = () => setIsHeaderHidden(true);
  const showHeader = () => setIsHeaderHidden(false);

  return (
    <HeaderContext.Provider value={{ isHeaderHidden, hideHeader, showHeader }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
}
