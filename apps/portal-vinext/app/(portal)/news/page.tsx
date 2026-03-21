'use client';

import NewsSection from '@/components/sections/news';
import { useUser } from '@/lib/auth/context';
import { vinextNewsFeatureAdapter } from './data-adapter';

export default function NewsPage() {
  const user = useUser();

  return <NewsSection user={user} adapter={vinextNewsFeatureAdapter} />;
}
