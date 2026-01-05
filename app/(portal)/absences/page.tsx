'use client';

import AbsencesSection from '@/components/sections/AbsencesSection';
import { useUser } from '@/lib/auth/context';

export default function AbsencesPage() {
  const user = useUser();
  return <AbsencesSection user={user} />;
}
