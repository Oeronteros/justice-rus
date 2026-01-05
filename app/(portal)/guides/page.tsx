'use client';

import GuidesSection from '@/components/sections/GuidesSection';
import { useUser } from '@/lib/auth/context';

export default function GuidesPage() {
  const user = useUser();
  return <GuidesSection user={user} />;
}
