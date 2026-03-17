'use client';

import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from 'react';

export interface HeaderContextType {
  isHeaderHidden: boolean;
  setHeaderHidden: (hidden: boolean) => void;
  hideHeader: () => void;
  showHeader: () => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  const setHeaderHidden = useCallback((hidden: boolean) => {
    setIsHeaderHidden(hidden);
  }, []);

  const hideHeader = useCallback(() => {
    setHeaderHidden(true);
  }, [setHeaderHidden]);

  const showHeader = useCallback(() => {
    setHeaderHidden(false);
  }, [setHeaderHidden]);

  const contextValue = useMemo<HeaderContextType>(
    () => ({ isHeaderHidden, setHeaderHidden, hideHeader, showHeader }),
    [hideHeader, isHeaderHidden, setHeaderHidden, showHeader]
  );

  return (
    <HeaderContext.Provider value={contextValue}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeaderVisibility() {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error('useHeaderVisibility must be used within a HeaderProvider');
  }
  return context;
}

export function useHeader() {
  return useHeaderVisibility();
}
