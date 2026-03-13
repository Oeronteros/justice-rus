'use client';

import NewsSection from '@/components/sections/news';
import { useUser } from '@/lib/auth/context';

export default function NewsPage() {
  const user = useUser();

  return <NewsSection user={user} />;
}
