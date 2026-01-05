'use client';

import NewsSection from '@/components/sections/NewsSection';
import { useUser } from '@/lib/auth/context';

export default function NewsPage() {
  const user = useUser();
  return <NewsSection user={user} />;
}
