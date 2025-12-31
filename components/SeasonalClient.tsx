'use client';

import { useEffect, memo } from 'react';
import { NEWYEAR_STORAGE_KEY, resolveNewYearEnabled } from '@/lib/seasonal';

function SeasonalClient() {
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(NEWYEAR_STORAGE_KEY) : null;
    const enabled = resolveNewYearEnabled(new Date(), stored);

    document.body.classList.toggle('dc-season-newyear', enabled);
  }, []);

  return null;
}

export default memo(SeasonalClient);

